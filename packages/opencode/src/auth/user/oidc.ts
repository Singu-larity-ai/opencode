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

function endpoint() {
  const val = Flag.OPENCODE_CASDOOR_ENDPOINT
  if (!val) throw new Error("OPENCODE_CASDOOR_ENDPOINT is not configured")
  return val.replace(/\/+$/, "")
}

function clientId() {
  const val = Flag.OPENCODE_CASDOOR_CLIENT_ID
  if (!val) throw new Error("OPENCODE_CASDOOR_CLIENT_ID is not configured")
  return val
}

function clientSecret() {
  const val = Flag.OPENCODE_CASDOOR_CLIENT_SECRET
  if (!val) throw new Error("OPENCODE_CASDOOR_CLIENT_SECRET is not configured")
  return val
}

function organization() {
  return Flag.OPENCODE_CASDOOR_ORGANIZATION || "built-in"
}

export function isConfigured() {
  return !!(
    Flag.OPENCODE_CASDOOR_ENDPOINT &&
    Flag.OPENCODE_CASDOOR_CLIENT_ID &&
    Flag.OPENCODE_CASDOOR_CLIENT_SECRET
  )
}

export function authorizeUrl(params: { redirectUri: string; state: string }) {
  const url = new URL(`${endpoint()}/login/oauth/authorize`)
  url.searchParams.set("client_id", clientId())
  url.searchParams.set("redirect_uri", params.redirectUri)
  url.searchParams.set("response_type", "code")
  url.searchParams.set("scope", "openid profile email")
  url.searchParams.set("state", params.state)
  url.searchParams.set("organization", organization())
  return url.toString()
}

export function logoutUrl(params: { redirectUri: string }) {
  const url = new URL(`${endpoint()}/login/oauth/logout`)
  url.searchParams.set("client_id", clientId())
  url.searchParams.set("redirect_uri", params.redirectUri)
  url.searchParams.set("scope", "openid")
  return url.toString()
}

export async function exchangeCode(params: { code: string; redirectUri: string }): Promise<OIDCTokens> {
  const res = await fetch(`${endpoint()}/api/login/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: params.code,
      redirect_uri: params.redirectUri,
      client_id: clientId(),
      client_secret: clientSecret(),
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
    jwksCache = createRemoteJWKSet(new URL(`${endpoint()}/.well-known/jwks`))
  }
  return jwksCache
}

export async function verifyIdToken(idToken: string): Promise<OIDCUserInfo> {
  const { payload } = await jwtVerify(idToken, jwks(), {
    issuer: endpoint(),
    audience: clientId(),
    clockTolerance: 60,
  })
  return {
    sub: payload.sub!,
    email: payload.email as string | undefined,
    name: payload.name as string | undefined,
    picture: payload.picture as string | undefined,
  }
}

export async function fetchUserInfo(accessToken: string): Promise<OIDCUserInfo> {
  const res = await fetch(`${endpoint()}/api/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`OIDC userinfo fetch failed: ${res.status} ${body}`)
  }
  return res.json()
}
