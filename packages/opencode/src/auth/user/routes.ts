import { Hono } from "hono"
import type { CookieOptions } from "hono/utils/cookie"
import { getCookie, setCookie, deleteCookie } from "hono/cookie"
import * as OIDC from "./oidc"
import * as User from "./user"
import * as Session from "./session"
import { Flag } from "../../flag/flag"

const COOKIE_NAME = "singularity_session"
const STATE_COOKIE = "singularity_auth_state"

const sessionCookieOpts: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60,
}

async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(token)
  const hash = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("")
}

function buildRedirectUri(c: any): string {
  const req = c.req.raw
  const host = req.headers.get("host") || "localhost:4096"
  const protocol = req.headers.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https")
  return `${protocol}://${host}/auth/callback`
}

function buildBaseUrl(c: any): string {
  const req = c.req.raw
  const host = req.headers.get("host") || "localhost:4096"
  const protocol = req.headers.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https")
  return `${protocol}://${host}`
}

export const AuthRoutes = () => {
  const configured = OIDC.isConfigured()

  return new Hono()
    .get("/me", async (c) => {
      if (!configured) return c.json({ authenticated: false }, 200)
      const sessionToken = getCookie(c, COOKIE_NAME)
      if (!sessionToken) return c.json({ authenticated: false }, 401)

      const tokenHash = await hashToken(sessionToken)
      const result = Session.findValidWithUser(tokenHash)
      if (!result) {
        deleteCookie(c, COOKIE_NAME)
        return c.json({ authenticated: false }, 401)
      }

      return c.json({
        authenticated: true,
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          avatar_url: result.user.avatar_url,
        },
      })
    })
    .get("/login", async (c) => {
      if (!configured) return c.redirect("/")
      const state = crypto.randomUUID()
      setCookie(c, STATE_COOKIE, state, { httpOnly: true, sameSite: "Lax", path: "/", maxAge: 600 })
      const redirectUri = buildRedirectUri(c)
      console.log("[auth] login redirect_uri:", redirectUri, "host:", c.req.raw.headers.get("host"))
      const url = OIDC.authorizeUrl({ redirectUri, state })
      return c.redirect(url)
    })
    .get("/callback", async (c) => {
      if (!configured) return c.redirect("/")
      const code = c.req.query("code")
      const state = c.req.query("state")
      const savedState = getCookie(c, STATE_COOKIE)
      deleteCookie(c, STATE_COOKIE)

      if (!code || !state || state !== savedState) {
        return c.redirect("/auth/login")
      }

      const redirectUri = buildRedirectUri(c)
      let tokens: OIDC.OIDCTokens
      try {
        tokens = await OIDC.exchangeCode({ code, redirectUri })
      } catch (err) {
        console.error("OIDC code exchange failed:", err)
        return c.redirect("/auth/login")
      }

      let userInfo: OIDC.OIDCUserInfo
      try {
        userInfo = await OIDC.verifyIdToken(tokens.id_token)
      } catch (err) {
        console.error("ID token verification failed:", err)
        return c.redirect("/auth/login")
      }

      const user = User.upsert({
        authing_id: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        avatar_url: userInfo.picture,
      })

      Session.cleanExpired()

      const sessionToken = crypto.randomUUID()
      const tokenHash = await hashToken(sessionToken)
      Session.create({ userId: user.id, tokenHash })

      setCookie(c, COOKIE_NAME, `${sessionToken}`, sessionCookieOpts)
      return c.redirect("/")
    })
    .get("/logout", async (c) => {
      if (!configured) return c.redirect("/")
      const sessionToken = getCookie(c, COOKIE_NAME)
      if (sessionToken) {
        const tokenHash = await hashToken(sessionToken)
        const result = Session.findValidWithUser(tokenHash)
        if (result) Session.deleteByUserId(result.user.id)
      }
      deleteCookie(c, COOKIE_NAME)
      const baseUrl = buildBaseUrl(c)
      const logoutUrl = OIDC.logoutUrl({ redirectUri: baseUrl })
      return c.redirect(logoutUrl)
    })
}
