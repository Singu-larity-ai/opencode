# Frontend Architecture

## Entry Point

File: `packages/app/src/entry.tsx`

Web entry sets up platform as `"web"` and renders:

```
PlatformProvider
  AppBaseProviders
    AppInterface
```

### Server URL Resolution

```ts
const getCurrentUrl = () => {
  if (location.hostname.includes("opencode.ai")) return "http://localhost:4096"
  if (import.meta.env.DEV)
    return `http://${VITE_OPENCODE_SERVER_HOST ?? "localhost"}:${VITE_OPENCODE_SERVER_PORT ?? "4096"}`
  return location.origin
}
```

Default server URL persisted in `localStorage` under key `"opencode.settings.dat:defaultServerUrl"`.

---

## Routing

File: `packages/app/src/app.tsx`

Uses `@solidjs/router` (`Router`, `Route`, `Navigate`).

| Path | Component | Purpose |
|---|---|---|
| `/` | `HomeRoute` (lazy) | Recent projects, server selector |
| `/:dir` | `DirectoryLayout` | Project wrapper — decodes base64 dir, sets up SDK/Sync |
| `/:dir/` | `SessionIndexRoute` | Redirects to `session` |
| `/:dir/session/:id?` | `SessionRoute` (lazy) | Session/chat view |

The `:dir` param is a base64-encoded directory path.

---

## Context/Provider Hierarchy

File: `packages/app/src/context/`

```
PlatformProvider              (platform detection: web vs desktop)
  AppBaseProviders:
    MetaProvider
    Font
    ThemeProvider
    LanguageProvider
    UiI18nBridge
    ErrorBoundary > ErrorPage
    DialogProvider
    MarkedProvider
    FileComponentProvider

  ServerProvider              (active server, health polling, project management)
    ConnectionGate            (health check gate — blocks until server healthy)
      ServerKey               (guards on server.key being set)
        QueryProvider         (TanStack Query)
          GlobalSDKProvider   (SDK client, SSE event stream)
            GlobalSyncProvider (global state, bootstraps data)
              AuthProvider     (auth state, /auth/me polling)
                AuthGuard      (redirects to login if unauthenticated on web)
                  Router
                    AppShellProviders:
                      SettingsProvider
                      PermissionProvider
                      LayoutProvider
                      NotificationProvider
                      ModelsProvider
                      CommandProvider
                      HighlightsProvider
                      Layout (sidebar shell)

                      [per-route: DirectoryLayout]
                        SDKProvider
                        SyncProvider
                        LocalProvider
                        DataProvider
                        [SessionProviders:]
                          TerminalProvider
                          FileProvider
                          PromptProvider
                          CommentsProvider
```

### Key Context Files

| File | Purpose |
|---|---|
| `platform.tsx` | Platform detection (web vs desktop) with capabilities |
| `server.tsx` | Server connection management (active server, health, projects) |
| `auth.tsx` | Auth state: `AuthProvider`, `useAuth()`, `AuthGuard` |
| `global-sdk.tsx` | Global SDK client + SSE event stream |
| `global-sync.tsx` | Global state sync (projects, sessions, providers, config) |
| `sdk.tsx` | Per-directory SDK client |
| `sync.tsx` | Per-directory session/message sync |
| `settings.tsx` | User settings (appearance, notifications, sounds, keybinds) |
| `local.tsx` | Per-session agent/model selection |
| `models.tsx` | Model visibility, recent models |
| `layout.tsx` | Layout state (sidebar, active project/workspace) |
| `command.tsx` | Command palette |
| `language.tsx` | i18n language |
| `notification.tsx` | System notifications |
| `terminal.tsx` | Terminal management |
| `file.tsx` | File viewer |
| `prompt.tsx` | Prompt input |
| `comments.tsx` | Session comments |
| `highlights.tsx` | Syntax highlights |
| `permission.tsx` | Permission auto-respond for tool calls |

---

## API Client

### SDK Creation

File: `packages/app/src/utils/server.ts`

```ts
export function createSdkForServer({ server, ...config }) {
  const auth = (() => {
    if (!server.password) return
    return { Authorization: `Basic ${btoa(`${server.username ?? "opencode"}:${server.password}`)}` }
  })()
  return createOpencodeClient({ ...config, headers: { ...auth }, baseUrl: server.url })
}
```

Uses `@hey-api/openapi-ts` generated client from `packages/sdk/js/src/v2/`.

### SSE Event Stream

File: `packages/app/src/context/global-sdk.tsx`

Uses `eventSdk.global.event()` to open SSE connection. Events are batched and coalesced. Heartbeat timeout: 15 seconds.

### Auth Fetch

File: `packages/app/src/context/auth.tsx`

```ts
const res = await fetch("/auth/me", { credentials: "include" })
```

Relative URL — in dev mode, Vite proxy forwards `/auth/*` to backend at `localhost:4096`.

---

## Auth System

### AuthProvider

Provides via context:
- `user()` — current `AuthUser` or undefined
- `isAuthenticated()` — boolean
- `loading()` — fetch in progress
- `logout()` — redirects to `/auth/logout`
- `refetch()` — re-fetch `/auth/me`

### AuthGuard

Wraps the router. On web platform:
- If loading: shows splash
- If not authenticated: redirects to `/auth/login` via `window.location.href`
- If authenticated: renders children

On desktop: passes through (no auth required).

---

## Environment Config

### Vite Config

File: `packages/app/vite.config.ts`

- Plugins: Tailwind CSS, SolidJS, theme preload, `@/` path alias
- Dev server: `host: "0.0.0.0"`, default port 3000
- Proxy: `/auth` → `http://localhost:4096` (for dev mode auth)

### Environment Variables

File: `packages/app/src/env.d.ts`

```ts
interface ImportMetaEnv {
  readonly VITE_OPENCODE_SERVER_HOST: string
  readonly VITE_OPENCODE_SERVER_PORT: string
  readonly VITE_OPENCODE_CHANNEL?: "dev" | "beta" | "prod"
}
```

---

## Platform Differences

### Web (`platform: "web"`)

- Entry: `packages/app/src/entry.tsx`
- Server URL from `location.origin` or env vars
- `window.open` for external links
- Browser Notification API
- Vite proxy for `/auth` in dev

### Desktop (`platform: "desktop"`)

- Entry: `packages/desktop/src/entry.tsx`
- Tauri IPC for native capabilities
- Custom fetch override for proxying
- File picker dialogs, auto-updater, webview zoom
- No auth (local app, no server)

### Platform Capabilities

| Capability | Web | Desktop |
|---|---|---|
| `openDirectoryPickerDialog` | Server-backed | Native |
| `openFilePickerDialog`, `saveFilePickerDialog` | No | Native |
| `checkUpdate`, `update` | No | Native |
| `fetch` override | No | Custom (Tauri proxy) |
| `parseMarkdown` | No | Native |
| `webviewZoom` | No | Native |
| `notify` | Browser Notification API | Browser Notification API |
| Auth (Authing OIDC) | Yes | No |

---

## Connection Flow

1. `ServerProvider` initializes with default server URL
2. `ConnectionGate` performs health check (`/global/health`)
3. If healthy → `ServerKey` checks server key is set
4. `GlobalSDKProvider` creates SDK client + opens SSE stream
5. `GlobalSyncProvider` bootstraps global data (projects, sessions, config)
6. `AuthProvider` fetches `/auth/me` to get current user
7. `AuthGuard` redirects to login if not authenticated (web only)
8. Router renders the appropriate page
