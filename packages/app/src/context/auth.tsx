import { createContext, useContext, type ParentProps } from "solid-js"
import { createResource, Show, onMount } from "solid-js"
import { usePlatform } from "./platform"

export type AuthUser = {
  id: string
  email?: string
  name?: string
  avatar_url?: string
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
  try {
    const res = await fetch("/auth/me", { credentials: "include" })
    if (!res.ok) return { authenticated: false }
    const data = await res.json()
    return data
  } catch {
    return { authenticated: false }
  }
}

export function AuthProvider(props: ParentProps) {
  const [authData, { refetch }] = createResource(fetchUser, {
    initialValue: { authenticated: false },
  })

  const user = () => authData()?.user
  const isAuthenticated = () => authData()?.authenticated === true
  const loading = () => authData.loading

  const logout = () => {
    window.location.href = "/auth/logout"
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
