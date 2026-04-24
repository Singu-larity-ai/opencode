import { createContext, useContext, on, createEffect, type ParentProps } from "solid-js"
import { createResource, Show, onMount } from "solid-js"
import { usePlatform } from "./platform"
import { removePersisted } from "@/utils/persist"
import { useGlobalSDK } from "./global-sdk"

export type AuthUser = {
  id: string
  email?: string
  name?: string
  avatar_url?: string
  bio?: string
}

type AuthState = {
  user: () => AuthUser | undefined
  isAuthenticated: () => boolean
  loading: () => boolean
  logout: () => void
  refetch: () => void
}

const AuthContext = createContext<AuthState>()

async function fetchUser(): Promise<{ authenticated: boolean; user?: AuthUser }> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  try {
    const res = await fetch("/auth/me", { credentials: "include", signal: controller.signal })
    clearTimeout(timeout)
    if (!res.ok) return { authenticated: false }
    const data = await res.json()
    return data
  } catch (err) {
    clearTimeout(timeout)
    if (err instanceof Error && err.name === "AbortError") {
      console.error("[auth] fetchUser timed out")
    }
    return { authenticated: false }
  }
}

const GLOBAL_STORAGE = "opencode.global.dat"

function clearGlobalCaches() {
  const keysToRemove: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key) continue
    if (key.startsWith("opencode.") || key.startsWith("default.")) {
      keysToRemove.push(key)
    }
  }
  for (const key of keysToRemove) {
    localStorage.removeItem(key)
  }
  console.log("[auth] Cleared all caches after user change:", keysToRemove.length, "keys removed")
}

export function AuthProvider(props: ParentProps) {
  const globalSDK = useGlobalSDK()
  const [authData, { refetch }] = createResource(fetchUser, {
    initialValue: { authenticated: false },
  })

  const user = () => authData()?.user
  const isAuthenticated = () => authData()?.authenticated === true
  const loading = () => authData.loading

  createEffect(() => {
    const currentUser = user()
    if (currentUser?.id) {
      const cachedUserId = localStorage.getItem("opencode.auth.userId")
      if (cachedUserId && cachedUserId !== currentUser.id) {
        console.log("[auth] User changed from", cachedUserId, "to", currentUser.id, "- clearing caches")
        clearGlobalCaches()
      }
      localStorage.setItem("opencode.auth.userId", currentUser.id)
    }
  })

  const logout = () => {
    globalSDK.event.stop()
    clearGlobalCaches()
    localStorage.removeItem("opencode.auth.userId")
    window.location.replace("/auth/logout")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, logout, refetch }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}

export function AuthGuard(props: ParentProps) {
  const platform = usePlatform()
  const auth = useContext(AuthContext)

  if (platform.platform !== "web" || !auth) return <>{props.children}</>

  return <AuthGuardInner>{props.children}</AuthGuardInner>
}

function AuthGuardInner(props: ParentProps) {
  const auth = useContext(AuthContext)!

  return (
    <Show
      when={!auth.loading()}
      fallback={
        <div class="h-dvh w-screen flex flex-col items-center justify-center bg-background-base">
          <div class="animate-pulse text-text-weak text-sm">Loading...</div>
        </div>
      }
    >
      <Show
        when={auth.isAuthenticated()}
        fallback={
          <div class="h-dvh w-screen flex flex-col items-center justify-center bg-background-base">
            <RedirectOnMount />
          </div>
        }
      >
        {props.children}
      </Show>
    </Show>
  )
}

function RedirectOnMount() {
  onMount(() => {
    window.location.href = "/auth/login"
  })
  return <div class="animate-pulse text-text-weak text-sm">Redirecting to login...</div>
}
