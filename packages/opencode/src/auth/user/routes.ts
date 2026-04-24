import { Hono } from "hono"
import type { CookieOptions } from "hono/utils/cookie"
import { getCookie, setCookie, deleteCookie } from "hono/cookie"
import * as OIDC from "./oidc"
import * as User from "./user"
import * as Session from "./session"
import { Flag } from "../../flag/flag"

const COOKIE_NAME = "singularity_session"

const sessionCookieOpts: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60,
}

const pendingStates = new Map<string, number>()

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

function cleanExpiredStates() {
  const now = Date.now()
  for (const [state, ts] of pendingStates) {
    if (now - ts > 10 * 60 * 1000) pendingStates.delete(state)
  }
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
          bio: result.user.bio,
        },
      })
    })
    .get("/users", async (c) => {
      if (!configured) return c.json({ error: "Auth not configured" }, 400)
      const users = User.list()
      return c.json(
        users.map((u) => ({
          id: u.id,
          name: u.name,
          avatar_url: u.avatar_url,
          bio: u.bio,
        })),
      )
    })
    .get("/profile/:userID", async (c) => {
      if (!configured) return c.json({ error: "Auth not configured" }, 400)
      const userID = c.req.param("userID")
      const user = User.findById(userID)
      if (!user) return c.json({ error: "User not found" }, 404)
      return c.json({
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url,
        bio: user.bio,
        time_created: user.time_created,
      })
    })
    .patch("/profile", async (c) => {
      if (!configured) return c.json({ error: "Auth not configured" }, 400)
      const sessionToken = getCookie(c, COOKIE_NAME)
      if (!sessionToken) return c.json({ error: "Unauthorized" }, 401)
      const tokenHash = await hashToken(sessionToken)
      const result = Session.findValidWithUser(tokenHash)
      if (!result) return c.json({ error: "Unauthorized" }, 401)

      const body = await c.req.json<{ bio?: string }>()
      const updated = User.updateBio(result.user.id, body.bio)
      return c.json({
        id: updated.id,
        name: updated.name,
        avatar_url: updated.avatar_url,
        bio: updated.bio,
      })
    })
    .get("/login", async (c) => {
      if (!configured) return c.redirect("/")
      const state = crypto.randomUUID()
      cleanExpiredStates()
      pendingStates.set(state, Date.now())
      const redirectUri = buildRedirectUri(c)
      const url = OIDC.authorizeUrl({ redirectUri, state })
      return c.redirect(url)
    })
    .get("/callback", async (c) => {
      if (!configured) return c.redirect("/")
      const code = c.req.query("code")
      const state = c.req.query("state")

      if (!code || !state || !pendingStates.has(state)) {
        console.error("[auth] callback validation failed:", { code: !!code, state, known: pendingStates.has(state || "") })
        return c.redirect("/auth/login")
      }

      pendingStates.delete(state)

      const redirectUri = buildRedirectUri(c)
      let tokens: OIDC.OIDCTokens
      try {
        tokens = await OIDC.exchangeCode({ code, redirectUri })
      } catch (err) {
        console.error("[auth] OIDC code exchange failed:", err)
        return c.redirect("/auth/login")
      }

      let userInfo: OIDC.OIDCUserInfo
      try {
        userInfo = await OIDC.verifyIdToken(tokens.id_token)
      } catch (err) {
        console.error("[auth] ID token verification failed:", err)
        return c.redirect("/auth/login")
      }

      const user = User.upsert({
        casdoor_id: userInfo.sub,
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
      return c.redirect("/")
    })
}
