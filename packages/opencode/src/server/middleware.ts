import { Provider } from "../provider"
import { NamedError } from "@opencode-ai/shared/util/error"
import { NotFoundError } from "../storage"
import { Session } from "../session"
import type { ContentfulStatusCode } from "hono/utils/http-status"
import type { ErrorHandler, MiddlewareHandler } from "hono"
import { HTTPException } from "hono/http-exception"
import { getCookie } from "hono/cookie"
import { Log } from "../util"
import { Flag } from "@/flag/flag"
import { basicAuth } from "hono/basic-auth"
import { cors } from "hono/cors"
import { compress } from "hono/compress"
import { isConfigured as authIsConfigured } from "../auth/user/oidc"
import * as AuthSession from "../auth/user/session"

const log = Log.create({ service: "server" })

export const ErrorMiddleware: ErrorHandler = (err, c) => {
  console.error("🚨 [ErrorMiddleware] FAILED:", err)
  console.error("   err.stack:", err instanceof Error ? err.stack : "N/A")
  console.error("   err.name:", err instanceof Error ? err.name : "N/A")
  console.error("   err.message:", err instanceof Error ? err.message : String(err))
  log.error("failed", {
    error: err,
  })
  if (err instanceof NamedError) {
    let status: ContentfulStatusCode
    if (err instanceof NotFoundError) status = 404
    else if (err instanceof Provider.ModelNotFoundError) status = 400
    else if (err.name === "ProviderAuthValidationFailed") status = 400
    else if (err.name.startsWith("Worktree")) status = 400
    else status = 500
    return c.json(err.toObject(), { status })
  }
  if (err instanceof Session.BusyError) {
    return c.json(new NamedError.Unknown({ message: err.message }).toObject(), { status: 400 })
  }
  if (err instanceof HTTPException) return err.getResponse()
  const message = err instanceof Error && err.stack ? err.stack : err.toString()
  return c.json(new NamedError.Unknown({ message }).toObject(), {
    status: 500,
  })
}

export const AuthMiddleware: MiddlewareHandler = (c, next) => {
  // Allow CORS preflight requests to succeed without auth.
  // Browser clients sending Authorization headers will preflight with OPTIONS.
  if (c.req.method === "OPTIONS") return next()
  const password = Flag.OPENCODE_SERVER_PASSWORD
  if (!password) return next()
  const username = Flag.OPENCODE_SERVER_USERNAME ?? "opencode"

  if (c.req.query("auth_token")) c.req.raw.headers.set("authorization", `Basic ${c.req.query("auth_token")}`)

  return basicAuth({ username, password })(c, next)
}

export const LoggerMiddleware: MiddlewareHandler = async (c, next) => {
  const skip = c.req.path === "/log"
  if (!skip) {
    log.info("request", {
      method: c.req.method,
      path: c.req.path,
    })
  }
  const timer = log.time("request", {
    method: c.req.method,
    path: c.req.path,
  })
  await next()
  if (!skip) timer.stop()
}

export function CorsMiddleware(opts?: { cors?: string[] }): MiddlewareHandler {
  return cors({
    maxAge: 86_400,
    credentials: true,
    origin(input) {
      if (!input) return

      if (input.startsWith("http://localhost:")) return input
      if (input.startsWith("http://127.0.0.1:")) return input
      if (input === "tauri://localhost" || input === "http://tauri.localhost" || input === "https://tauri.localhost")
        return input

      if (/^https:\/\/([a-z0-9-]+\.)*opencode\.ai$/.test(input)) return input
      if (opts?.cors?.includes(input)) return input
    },
  })
}

const zipped = compress()
export const CompressionMiddleware: MiddlewareHandler = (c, next) => {
  const path = c.req.path
  const method = c.req.method
  if (path === "/event" || path === "/global/event") return next()
  if (method === "POST" && /\/session\/[^/]+\/(message|prompt_async)$/.test(path)) return next()
  return zipped(c, next)
}

const AUTH_COOKIE = "singularity_session"
const AUTH_PATHS = new Set(["/auth/login", "/auth/callback", "/auth/logout", "/auth/me", "/global/health", "/global/event"])

async function hashToken(token: string): Promise<string> {
  const data = new TextEncoder().encode(token)
  const hash = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("")
}

export const SessionMiddleware: MiddlewareHandler = async (c, next) => {
  if (!authIsConfigured()) return next()
  if (AUTH_PATHS.has(c.req.path)) return next()
  if (c.req.method === "OPTIONS") return next()

  const sessionToken = getCookie(c, AUTH_COOKIE)
  if (!sessionToken) {
    return respondAuthRequired(c)
  }

  const tokenHash = await hashToken(sessionToken)
  const result = AuthSession.findValidWithUser(tokenHash)
  if (!result) {
    return respondAuthRequired(c)
  }

  c.set("authUser", result.user)
  return next()
}

function respondAuthRequired(c: any) {
  const accepts = c.req.raw.headers.get("accept") || ""
  if (accepts.includes("text/html")) {
    return c.redirect("/auth/login")
  }
  return c.json({ error: "Authentication required" }, 401)
}
