# Backend Auth & Server Architecture

## Server Setup

The server is built on **Hono**, a fast web framework. Main entry: `packages/opencode/src/server/server.ts`.

### Startup Flow

```
bun run --conditions=browser ./src/index.ts serve --port 4096
  → packages/opencode/src/cli/cmd/serve.ts
    → Server.listen(opts)
      → packages/opencode/src/server/server.ts (create app)
        → packages/opencode/src/server/adapter.bun.ts (Bun.serve)
```

Two operating modes:
1. **Workspace/Single-Instance Mode** (`OPENCODE_WORKSPACE_ID` set): Directly mounts instance routes with a fixed workspace.
2. **Control Plane Mode** (default): Mounts control routes, workspace routing middleware, instance routes, and UI routes.

### Middleware Chain (in order)

1. **SessionMiddleware** — Validates `singularity_session` cookie, redirects HTML requests to `/auth/login`, 401s API requests. Bypassed when Casdoor not configured.
2. **AuthMiddleware** — Optional HTTP Basic Auth (`OPENCODE_SERVER_PASSWORD` / `OPENCODE_SERVER_USERNAME`). Bypassed when no password set.
3. **LoggerMiddleware** — Logs requests (skips `/log`).
4. **CompressionMiddleware** — gzip compression (skips SSE and streaming endpoints).
5. **CorsMiddleware** — Allows `localhost`, `127.0.0.1`, `tauri://localhost`, `*.opencode.ai`, and custom origins from config.

### CLI Commands

- `opencode serve` — Headless server (`packages/opencode/src/cli/cmd/serve.ts`)
- `opencode web` — Headless + opens browser (`packages/opencode/src/cli/cmd/web.ts`)

Default port: 4096 (falls back to random if occupied). Default hostname: `127.0.0.1`.

---

## Authentication

### Server-Level: HTTP Basic Auth

File: `packages/opencode/src/server/middleware.ts`

Optional, controlled by env vars:
- `OPENCODE_SERVER_PASSWORD` — if not set, server is completely open
- `OPENCODE_SERVER_USERNAME` — defaults to `"opencode"`

Also accepts `?auth_token=` query param (base64 of `username:password`).

### User-Level: Casdoor OIDC

File: `packages/opencode/src/auth/user/`

Feature-flagged by env vars:
- `OPENCODE_CASDOOR_ENDPOINT` — Casdoor server URL (e.g. `http://localhost:8000`)
- `OPENCODE_CASDOOR_CLIENT_ID` — Application client ID from Casdoor
- `OPENCODE_CASDOOR_CLIENT_SECRET` — Application client secret from Casdoor
- `OPENCODE_CASDOOR_ORGANIZATION` — Casdoor organization name (default: `built-in`)
- `OPENCODE_CASDOOR_APPLICATION` — Casdoor application name (optional)

When configured, `SessionMiddleware` requires a valid session cookie for all requests except whitelisted paths (`/auth/*`, `/global/health`).

**Database tables** (`packages/opencode/src/auth/user/schema.sql.ts`):
- `auth_user` — id, casdoor_id (unique), email, name, avatar_url, timestamps
- `auth_session` — id, user_id (FK → auth_user), token_hash, expires_at, timestamps

**OIDC flow** (`packages/opencode/src/auth/user/oidc.ts`):
- Uses `jose` library for JWT verification via JWKS
- Casdoor OIDC endpoints: `/login/oauth/authorize`, `/api/login/oauth/access_token`, `/api/userinfo`, `/.well-known/jwks`
- Authorize URL → Casdoor hosted login → callback with code → exchange for tokens → verify ID token → upsert user → create session → set cookie

**Routes** (`packages/opencode/src/auth/user/routes.ts`):
| Route | Purpose |
|---|---|
| `GET /auth/login` | Redirects to Casdoor `/login/oauth/authorize` |
| `GET /auth/callback` | Exchanges code, verifies JWT, creates session, sets cookie, redirects to `/` |
| `GET /auth/logout` | Deletes session, clears cookie, redirects to Casdoor logout |
| `GET /auth/me` | Returns `{ authenticated, user }` — always registered, returns false when not configured |

### Provider Auth (AI Provider Credentials)

File: `packages/opencode/src/auth/index.ts`

Stores credentials for AI providers (Anthropic, OpenAI, etc.) in `~/.local/share/opencode/auth.json`:
- OAuth tokens (access + refresh + expiry)
- API key credentials
- Well-known tokens (from remote config endpoints)

### Account System (opencode.ai Console)

File: `packages/opencode/src/account/account.ts`

OAuth 2.0 Device Authorization Grant flow for connecting to opencode.ai cloud console. Stores accounts in SQLite with access_token, refresh_token, token_expiry.

---

## API Routes

```
/global                          → GlobalRoutes()
  GET  /global/health            → Health check
  GET  /global/event             → SSE event stream
  GET  /global/config            → Get global config
  PATCH /global/config           → Update global config
  POST /global/dispose           → Dispose all instances
  POST /global/upgrade           → Upgrade opencode

/auth                            → AuthRoutes()
  GET  /auth/login               → OIDC login redirect
  GET  /auth/callback            → OIDC callback
  GET  /auth/logout              → Logout
  GET  /auth/me                  → Current user info

/                                → InstanceRoutes() (per-directory)
  GET  /path, /vcs, /vcs/diff    → File/VCS info
  GET  /command, /agent, /skill  → Capability lists
  /session/*                     → Session CRUD + messaging
  /config/*                      → Config CRUD
  /provider/*                    → Provider auth (OAuth/API keys)
  /pty/*                         → PTY management (WebSocket)
  /permission/*, /question/*     → Permission/question system
  /mcp/*, /sync/*                → MCP tools, sync
  /event                         → SSE event stream

/experimental/workspace/*        → WorkspaceRoutes() (control plane)

/*                               → UIRoutes() (static file serving)
```

### Instance Middleware

File: `packages/opencode/src/server/routes/instance/middleware.ts`

Resolves working directory from:
1. `?directory=` query param
2. `x-opencode-directory` header
3. `process.cwd()` fallback

---

## Database

**Engine**: SQLite via Drizzle ORM, using `bun:sqlite` driver.

**Path**: `~/.local/share/opencode/opencode.db` (or `OPENCODE_DB` override)

**Config**: WAL mode, `synchronous = NORMAL`, `busy_timeout = 5000`, foreign keys ON.

**Schema files**: `packages/opencode/src/**/*.sql.ts` (Drizzle table definitions)
**Migrations**: `packages/opencode/migration/` (timestamped directories with `migration.sql`)

### Key Tables

| Table | File |
|---|---|
| `project` | `src/project/project.sql.ts` |
| `session`, `message`, `part`, `todo`, `session_entry`, `permission` | `src/session/session.sql.ts` |
| `account`, `account_state`, `control_account` | `src/account/account.sql.ts` |
| `auth_user`, `auth_session` | `src/auth/user/schema.sql.ts` |
| `workspace` | `src/control-plane/workspace.sql.ts` |
| `event_sequence` | `src/sync/event.sql.ts` |

---

## Configuration System

File: `packages/opencode/src/config/config.ts`

Merged in order (later overrides earlier):
1. Well-known remote config (from account URLs)
2. Global config: `~/.config/opencode/config.json`, `opencode.json`, `opencode.jsonc`
3. Custom config: `OPENCODE_CONFIG` env var path
4. Project-level: `<project>/.opencode/opencode.json[c]`
5. `OPENCODE_CONFIG_CONTENT` env var
6. Account/org remote config
7. Managed preferences (MDM)

### Key Environment Variables

File: `packages/opencode/src/flag/flag.ts`

| Variable | Purpose |
|---|---|
| `OPENCODE_SERVER_PASSWORD` | HTTP Basic Auth password |
| `OPENCODE_SERVER_USERNAME` | HTTP Basic Auth username (default: "opencode") |
| `OPENCODE_CASDOOR_ENDPOINT` | Casdoor server URL |
| `OPENCODE_CASDOOR_CLIENT_ID` | Casdoor application client ID |
| `OPENCODE_CASDOOR_CLIENT_SECRET` | Casdoor application client secret |
| `OPENCODE_CASDOOR_ORGANIZATION` | Casdoor organization name (default: built-in) |
| `OPENCODE_DB` | Database path override |
| `OPENCODE_CONFIG` | Custom config file path |
| `OPENCODE_DISABLE_EMBEDDED_WEB_UI` | Proxy to app.opencode.ai instead |
| `OPENCODE_WORKSPACE_ID` | Single-workspace mode |
| `OPENCODE_DISABLE_CHANNEL_DB` | Use single DB across channels |

---

## Frontend-Backend Communication

### Transport

- **REST JSON** — standard CRUD (via generated SDK from OpenAPI spec)
- **SSE (Server-Sent Events)** — real-time events (`/event`, `/global/event`)
- **WebSocket** — PTY terminal connections only (`/:ptyID/connect`)

### SDK Client

File: `packages/sdk/js/src/v2/client.ts`

Generated from OpenAPI spec using `@hey-api/openapi-ts`. Auth via HTTP Basic Auth headers when configured.

### Event Streams

- Instance-level: `GET /event` — streams `BusEvent` payloads
- Global level: `GET /global/event` — streams from `GlobalBus`
- Both use `streamSSE` from Hono with 10-second heartbeats

---

## Web vs Desktop

### Web

- Platform: `"web"` (entry: `packages/app/src/entry.tsx`)
- Server URL from `location.origin` or env vars
- Browser Notification API

### Desktop (Tauri)

- Platform: `"desktop"` (entry: `packages/desktop/src/entry.tsx`)
- Tauri IPC for native capabilities (file picker, updater, zoom)
- Separate entry with loading screen

### UI Serving

File: `packages/opencode/src/server/routes/ui.ts`

1. **Embedded UI** (build-time): Assets imported from `opencode-web-ui.gen.ts`
2. **Proxy mode** (`OPENCODE_DISABLE_EMBEDDED_WEB_UI`): Proxies to `https://app.opencode.ai`
