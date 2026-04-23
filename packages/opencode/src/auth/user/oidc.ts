import { createRemoteJWKSet, jwtVerify } from "jose"
import { Flag } from "../../flag/flag"

export type OIDCTokens = {
  access_token: string
  id_token: string
  token_type: string
  expires_in?: number
}

export type OIDCUserInfo = {
  sub: string
  email?: string
  name?: string
  picture?: string
}

function issuer() {
  const val = Flag.OPENCODE_AUTHING_ISSUER
  if (!val) throw new Error("OPENCODE_AUTHING_ISSUER is not configured")
  return val
}

function appId() {
  const val = Flag.OPENCODE_AUTHING_APP_ID
  if (!val) throw new Error("OPENCODE_AUTHING_APP_ID is not configured")
  return val
}

function appSecret() {
  const val = Flag.OPENCODE_AUTHING_APP_SECRET
  if (!val) throw new Error("OPENCODE_AUTHING_APP_SECRET is not configured")
  return val
}

export function isConfigured() {
  return !!(Flag.OPENCODE_AUTHING_APP_ID && Flag.OPENCODE_AUTHING_APP_SECRET && Flag.OPENCODE_AUTHING_ISSUER)
}

export function authorizeUrl(params: { redirectUri: string; state: string }) {
  const url = new URL(`${issuer()}/auth`)
  url.searchParams.set("client_id", appId())
  url.searchParams.set("redirect_uri", params.redirectUri)
  url.searchParams.set("response_type", "code")
  url.searchParams.set("scope", "openid profile email")
  url.searchParams.set("state", params.state)
  return url.toString()
}

export function logoutUrl(params: { redirectUri: string }) {
  const url = new URL(`${issuer()}/session/end`)
  url.searchParams.set("client_id", appId())
  url.searchParams.set("post_logout_redirect_uri", params.redirectUri)
  return url.toString()
}

export async function exchangeCode(params: { code: string; redirectUri: string }): Promise<OIDCTokens> {
  const res = await fetch(`${issuer()}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: params.code,
      redirect_uri: params.redirectUri,
      client_id: appId(),
      client_secret: appSecret(),
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`OIDC token exchange failed: ${res.status} ${body}`)
  }
  return res.json()
}

let jwksCache: ReturnType<typeof createRemoteJWKSet> | undefined
function jwks() {
  if (!jwksCache) {
    jwksCache = createRemoteJWKSet(new URL(`${issuer()}/.well-known/jwks.json`))
  }
  return jwksCache
}

export async function verifyIdToken(idToken: string): Promise<OIDCUserInfo> {
  const { payload } = await jwtVerify(idToken, jwks(), {
    issuer: issuer(),
    audience: appId(),
  })
  return {
    sub: payload.sub!,
    email: payload.email as string | undefined,
    name: payload.name as string | undefined,
    picture: payload.picture as string | undefined,
  }
}

export async function fetchUserInfo(accessToken: string): Promise<OIDCUserInfo> {
  const res = await fetch(`${issuer()}/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`OIDC userinfo fetch failed: ${res.status} ${body}`)
  }
  return res.json()
}
