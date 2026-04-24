# Singularity-OpenCode Developer Onboarding

This document helps AI agents understand the codebase in 5-10 minutes.

## Comprehensive Documentation

For detailed file-by-file documentation, see `docs/dev/`:
- `docs/dev/00_OVERVIEW.md` - Architecture overview
- `docs/dev/01_backend.md` - All backend files (~375 files)
- `docs/dev/02_frontend.md` - All frontend files (~230 files)
- `docs/dev/03_ui_components.md` - UI components catalog
- `docs/dev/04_sdk.md` - SDK client reference
- `docs/dev/05_patterns.md` - Common code patterns
- `docs/dev/06_decision_tree.md` - "Where do I look?" guide

---

## Quick Mental Model

**What is OpenCode?** An AI coding agent platform with three main components:

```
┌─────────────────────────────────────────────────────────────────┐
│                         OpenCode                                 │
│                                                                  │
│  ┌──────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  CLI / Server │  │   Web UI (SolidJS) │  │  Desktop (Tauri) │  │
│  │  (Hono + API) │  │  (Browser Client)  │  │   (Native App)   │  │
│  └──────┬───────┘  └────────┬─────────┘  └────────┬─────────┘  │
│         │                    │                      │            │
│         └────────────────────┼──────────────────────┘            │
│                              │                                   │
│                    ┌─────────▼─────────┐                         │
│                    │   SDK Client     │ (Auto-generated API)     │
│                    │  packages/sdk/   │                         │
│                    └─────────┬─────────┘                         │
│                              │                                   │
│         ┌────────────────────┼────────────────────┐            │
│         │                    │                    │            │
│  ┌──────▼───────┐  ┌────────▼───────┐  ┌───────▼──────┐      │
│  │   Sessions   │  │   Projects     │  │   Providers   │      │
│  │   & Chat    │  │  & Worktrees   │  │  (AI APIs)   │      │
│  └─────────────┘  └────────────────┘  └──────────────┘      │
│                                                                  │
│         ┌─────────────────────────────────────┐                 │
│         │   Sync System (Event Sourcing)      │                 │
│         │   Real-time updates via SSE + Bus    │                 │
│         └─────────────────────────────────────┘                 │
└─────────────────────────────────────────────────────────────────┘
```

**Core Insight:** OpenCode runs a per-directory agent runtime. Each workspace has sessions (conversations with the AI), and all state syncs across devices via event sourcing.

---

## Directory Structure

| Package | Path | Responsibility |
|---------|------|----------------|
| **opencode** | `packages/opencode/src/` | Backend server, CLI, agent runtime, Effect services |
| **app** | `packages/app/src/` | SolidJS web frontend (browser) |
| **ui** | `packages/ui/src/` | Shared UI component library |
| **sdk** | `packages/sdk/js/src/` | Auto-generated TypeScript API client |
| **desktop** | `packages/desktop/src/` | Tauri desktop wrapper |
| **shared** | `packages/shared/src/` | Cross-package utilities |

---

## Decision Tree: "I want to..."

```
┣━ Fix something in the web UI
┃   → Frontend section below
┃   → Key files: packages/app/src/context/, packages/app/src/pages/
┣━ Fix something in the backend/server
┃   → Backend section below
┃   → Key files: packages/opencode/src/server/, packages/opencode/src/session/
┣━ Understand how data flows
┃   → Data Flow Diagrams section
┣━ Add a new API endpoint
┃   → Backend → Adding Routes
┣━ Add a new frontend context provider
┃   → Frontend → Provider Hierarchy
┣━ Understand the sync system
┃   → Sync System section
┗━ Work with sessions/messages
    → Session Model section
```

---

## Part 1: Effect Framework Primer

OpenCode uses Effect for dependency injection and functional error handling. Here's what you need to know:

### Service Pattern (Most Common)

```typescript
// 1. Define interface (what the service does)
interface MyService {
  readonly doSomething: (input: string) => Effect.Effect<string, MyError>
}

// 2. Define Service class (attaches interface to context)
export class MyService extends Context.Service<MyService, MyService>()("@opencode/MyService") {}

// 3. Create layer (how it's implemented)
export const myServiceLayer = Layer.effect(
  MyService,
  Effect.gen(function* () {
    const dep = yield* DependencyService
    return MyService.of({
      doSomething: (input) => Effect.succeed(input.toUpperCase())
    })
  })
)

// 4. Use it
const result = yield* (MyService)
```

### Common Effect Combinators

```typescript
// Success path
Effect.succeed(value)
Effect.gen(function* () { yield* someEffect; return value })

// Error path
Effect.fail(error)
Effect.try({ try: () => risky(), catch: (e) => new MyError(e) })

// Conditional
Effect.flatMap(result, (v) => v > 0 ? success : fail)
Effect.map(result, (v) => v * 2)

// Running effects
Effect.runPromise(effect)
Effect.runSync(effect)  // Only for synchronous effects!
```

### Runtime Creation (How OpenCode Runs Effects)

```typescript
// packages/opencode/src/effect/run-service.ts
const runtime = makeRuntime(Service, layer)
runtime.runPromise(effect)
```

---

## Part 2: Backend (packages/opencode)

### Entry Points

| Command | File | What It Does |
|---------|------|--------------|
| `opencode serve` | `src/cli/cmd/serve.ts` | Starts Hono server |
| `opencode run <prompt>` | `src/cli/cmd/run.ts` | Runs agent once |
| `opencode web` | `src/cli/cmd/web.ts` | Opens web UI |

### Server Architecture (`src/server/server.ts`)

```
Request → Middleware Chain → Route Handler → Response

Middleware Chain (in order):
1. SessionMiddleware    - Extracts session context
2. AuthMiddleware       - Basic auth validation
3. LoggerMiddleware     - Request logging
4. CompressionMiddleware - Gzip compression
5. CorsMiddleware       - CORS headers
```

### Route Structure

```
/auth/*        → AuthRoutes()     - OIDC login/callback
/global/*       → GlobalRoutes()   - Health, config, global events
/session/*      → SessionRoutes()  - Message CRUD + streaming
/project/*      → ProjectRoutes()  - Project discovery
/provider/*     → ProviderRoutes()  - AI provider credentials
/pty/*          → PtyRoutes()      - WebSocket terminal
/sync/*         → SyncRoutes()     - Event sync
```

### Key Backend Files

| File | Purpose |
|------|---------|
| `src/server/server.ts` | Hono app creation, middleware chain |
| `src/server/routes/instance/index.ts` | All per-workspace routes |
| `src/session/session.ts` | Session data model |
| `src/session/message-v2.ts` | Message + Parts model |
| `src/sync/index.ts` | Event sourcing system |
| `src/bus/index.ts` | Pub/sub event system |
| `src/storage/db.ts` | SQLite connection via Drizzle |
| `src/auth/` | Authentication (Basic + Casdoor OIDC) |
| `src/config/config.ts` | Configuration system |

### Session Model (`src/session/session.ts`)

```typescript
// Session = a conversation with the AI agent
interface Session {
  id: string
  directory: string           // Which workspace this belongs to
  title: string
  parentID?: string          // For sub-sessions
  summary?: { additions, deletions, files, diffs }
  time: { created, updated, compacting, archived }
}

// Message = one message in a session
interface Message {
  id: string
  sessionID: string
  role: "user" | "assistant"
  parts: Part[]              // Incremental streaming chunks
  time: { created }
}

// Part = streamed content chunk
interface Part {
  id: string
  messageID: string
  type: "text" | "tool_use" | "tool_result" | "error"
  content: string            // Text or JSON for tools
}
```

### Sync System (`src/sync/index.ts`)

OpenCode uses event sourcing for replayable state.

```typescript
// 1. Define an event
const Created = SyncEvent.define({
  type: "session.created",
  version: 1,
  aggregate: "sessionID",    // Events belong to this entity
  schema: z.object({
    sessionID: SessionID.zod,
    info: Info,
  }),
})

// 2. Run it (records to DB + runs projector + publishes to Bus)
SyncEvent.run(Created, { sessionID: id, info: { title: "foo" } })

// 3. Projector updates read model
const projectCreated: Projector<typeof Created> = (state, event) => {
  // Add session to in-memory state
}
```

### Bus System (`src/bus/index.ts`)

Two-level pub/sub:

1. **GlobalBus** - For SSE clients (browser sync)
2. **Bus** - In-process subscribers

```typescript
// Publishing
import { publish } from "@opencode-ai/opencode/bus"
await publish(BusEvent.SessionCreated, { sessionID, info })

// Subscribing (in-process)
import { subscribe } from "@opencode-ai/opencode/bus"
const unsub = subscribe(BusEvent.SessionCreated, (payload) => {
  console.log("Session created:", payload.sessionID)
})
```

### Authentication (`src/auth/`)

Two-level auth:

1. **HTTP Basic Auth** (server-level password via `OPENCODE_SERVER_PASSWORD`)
2. **Casdoor OIDC** (user-level OAuth)

```typescript
// Basic auth check in middleware
const hashed = await bcrypt.hash(password)
const valid = await bcrypt.compare(input, hashed)

// OIDC flow
// 1. User → /auth/login → Casdoor
// 2. Casdoor → /auth/callback → JWT
// 3. Session stored in SQLite 'auth_session' table
// 4. Cookie: singularity_session
```

### Storage (`src/storage/`)

```typescript
// SQLite via Drizzle ORM (bun:sqlite driver)
// Path: ~/.local/share/opencode/opencode.db

// Key tables:
// - session: metadata
// - message: messages
// - part: streamed chunks
// - todo: task list
// - event_sequence: sync events
```

---

## Part 3: Frontend (packages/app)

### Entry Point (`src/entry.tsx`)

```typescript
render(() => (
  <PlatformProvider platform="web">
    <AppBaseProviders>
      <AppInterface />
    </AppBaseProviders>
  </PlatformProvider>
))
```

### Provider Hierarchy (Critical!)

Providers must be mounted in the correct order. Children can only use contexts from ancestors.

```
PlatformProvider              → Detects platform (web/desktop)
└── AppBaseProviders
    ├── ServerProvider        → Server connection + health
    ├── ConnectionGate        → Auth state gate
    ├── GlobalSDKProvider     → SDK client for global state
    ├── GlobalSyncProvider   ← CRITICAL: Sync system + child store management
    ├── AuthProvider          → User auth state
    ├── Router                → Page routing
    ├── SDKProvider           → Per-workspace SDK
    ├── SyncProvider          → Per-workspace sync state
    └── DataProvider          → Combined state accessors
```

### Context Provider Pattern

```typescript
// packages/app/src/context/platform.tsx (simple example)
export const PlatformContext = createSimpleContext<ReturnType<typeof createPlatformContext>>()

// packages/app/src/context/layout.tsx (complex example with migrations)
export const { use: useLayout, provider: LayoutProvider } = createSimpleContext({
  name: "Layout",
  init: () => {
    const globalSync = useGlobalSync()
    const globalSdk = useGlobalSDK()
    // ... complex initialization

    return {
      // Return the interface
      ready: isReady(),
      // ... methods and properties
    }
  },
  gate: true  // Wait for ready() before exposing
})
```

### The `createSimpleContext` Pattern (`@opencode-ai/ui/context`)

```typescript
// Creates a context + provider + hook in one
export const { use: useX, provider: XProvider } = createSimpleContext({
  name: "X",              // For error messages
  init: (props) => {      // Returns the context value
    return { ... }
  },
  gate: boolean           // Optional: wait for ready() before showing children
})

// Usage
<XProvider {...props}>
  <Child />
</XProvider>

// In child
const x = useX()
```

### Store Persistence (`src/utils/persist.ts`)

```typescript
// Persisted store - syncs to localStorage/IndexedDB
const [state, setState, init, ready] = persisted(
  Persist.global("key", ["legacy.v1"]),  // storage key + migrations
  createStore({ value: defaultValue })
)

// Returns: [store, setStore, initPromise, readyAccessor]
```

### Key Frontend Files

| File | Purpose |
|------|---------|
| `src/entry.tsx` | App entry point |
| `src/app.tsx` | Main app shell + routing |
| `src/context/layout.tsx` | Layout state (sidebar, tabs, projects) |
| `src/context/global-sync.tsx` | Global state + project sync |
| `src/context/sync.tsx` | Per-session sync state |
| `src/context/server.tsx` | Server connection management |
| `src/context/sdk.tsx` | SDK client hooks |
| `src/utils/persist.ts` | Persistence utilities |

### GlobalSync Context (`src/context/global-sync.tsx`)

The most important context. Manages all project state:

```typescript
// Key properties
globalSync.data          // Reactive store with: project[], session_todo, provider, config
globalSync.ready         // Boolean - is bootstrap complete?
globalSync.child(dir)    // Get per-directory store
globalSync.project.meta() // Update project metadata (name, icon, commands)
globalSync.bootstrap()    // Trigger initial data load
```

### Child Store System (`src/context/global-sync/child-store.ts`)

Each workspace directory has its own store:

```typescript
// Per-directory state
const [store, setStore] = globalSync.child(directory, { bootstrap: true })

// Store structure
{
  project: string,           // Project ID
  projectMeta: ProjectMeta,  // Local overrides (name, icon, commands)
  icon: string | undefined,  // Workspace icon
  status: "loading" | "ready",
  session: Session[],
  sessionTotal: number,
  message: { [id]: Message[] },
  part: { [id]: Part[] },
  // ... more
}
```

### Error: "Cannot read properties of undefined (reading 'map')"

This usually means a store accessor returned undefined. Check:

1. Is the provider mounted in correct order?
2. Is `server.projects.list()` being called before server is ready?
3. Is `globalSync.data.project` an array before accessing?

### Error: "Failed to create persistent cache"

Usually localStorage issue. Clear in browser DevTools:
```javascript
localStorage.clear()
```

---

## Pattern Catalog

### Adding a New CLI Command

```typescript
// 1. Create file: packages/opencode/src/cli/cmd/newcmd.ts
export const NewCmd = {
  command: "newcmd",
  describe: "Does something",
  handler: async (args) => {
    // Your logic
  },
  builder: (yargs) => yargs.option("flag", { type: "string" })
} as const

// 2. Register in packages/opencode/src/index.ts
yargs.command(NewCmd)
```

### Adding a New API Route

```typescript
// 1. Create: packages/opencode/src/server/routes/instance/newroute.ts
const router = new Hono()
  .get("/resource", async (c) => {
    const result = await Effect.runPromise(myService.get())
    return c.json(result)
  })

// 2. Add to instance route chain in server.ts
.route("/resource", ResourceRoutes())
```

### Adding a New Sync Event

```typescript
// 1. Define in appropriate module
const MyEvent = SyncEvent.define({
  type: "my.event",
  version: 1,
  aggregate: "entityID",
  schema: z.object({ entityID: z.string(), data: z.string() }),
})

// 2. Create projector
const projectMyEvent: Projector<typeof MyEvent> = (state, event) => {
  // Update state
}

// 3. Register in projectors.ts
EventMap.set(MyEvent, projectMyEvent)

// 4. Use it
SyncEvent.run(MyEvent, { entityID: "123", data: "value" })
```

### Adding a New Frontend Context Provider

```typescript
// 1. Create: packages/app/src/context/mycontext.tsx
export const { use: useMyContext, provider: MyContextProvider } = createSimpleContext({
  name: "MyContext",
  init: () => {
    const sdk = useSDK()
    return {
      doSomething: () => sdk.client.someMethod()
    }
  }
})

// 2. Add to provider chain (order matters!)
// In AppBaseProviders or AppShellProviders
<MyContextProvider>
  {props.children}
</MyContextProvider>
```

---

## Data Flow Diagrams

### Backend Request Flow

```
HTTP Request
    ↓
Hono Server (server.ts)
    ↓
Middleware Chain
    ↓
Route Handler
    ↓
Effect Service (Context.Service)
    ↓
SQLite (bun:sqlite) or JSON Storage
    ↓
Response
```

### Frontend Data Loading

```
Page Load
    ↓
PlatformProvider (detect web/desktop)
    ↓
GlobalSyncProvider.bootstrap()
    ↓
Fetch global state via SDK
    ↓
Populate globalStore
    ↓
Render children (now they have data)
```

### Real-time Sync (SSE)

```
Browser                     Server                       Database
  │                           │                             │
  │── GET /global/event ────>│                             │
  │                           │                             │
  │<── SSE Stream ───────────│                             │
  │                           │                             │
  │                           │ User Action                 │
  │                           │    ↓                        │
  │                           │ SyncEvent.run()             │
  │                           │    ↓                        │
  │                           │ Record to event_sequence   │
  │                           │    ↓                        │
  │<── BusEvent payload ─────│── Publish(BusEvent)         │
  │                           │                             │
```

---

## Key Files Reference

### Read First (In Order)

1. **`packages/opencode/src/index.ts`** - All CLI commands, entry point
2. **`packages/opencode/src/server/server.ts`** - Server setup + middleware
3. **`packages/app/src/entry.tsx`** - Frontend entry
4. **`packages/app/src/context/global-sync.tsx`** - Global state management

### Session/Message Work

- `packages/opencode/src/session/session.ts` - Session model
- `packages/opencode/src/session/message-v2.ts` - Message + Part model
- `packages/opencode/src/sync/index.ts` - Event sourcing

### Project/Instance Work

- `packages/opencode/src/project/project.ts` - Project service
- `packages/opencode/src/project/instance.ts` - Per-directory context

### Frontend State

- `packages/app/src/context/layout.tsx` - Layout + project list
- `packages/app/src/context/global-sync.tsx` - Global sync state
- `packages/app/src/context/sync.tsx` - Per-session sync
- `packages/app/src/utils/persist.ts` - Persistence system

---

## Tech Stack Quick Reference

| Component | Technology | Key File |
|-----------|------------|----------|
| Server Framework | Hono | `packages/opencode/src/server/server.ts` |
| Database | SQLite + Drizzle | `packages/opencode/src/storage/db.ts` |
| Frontend | SolidJS | `packages/app/src/` |
| Routing | @solidjs/router | `packages/app/src/app.tsx` |
| State (Frontend) | SolidJS Store + Context | `packages/app/src/context/` |
| Persistence | @solid-primitives/storage | `packages/app/src/utils/persist.ts` |
| AI Integration | Effect-ai | `packages/opencode/src/provider/` |
| API Client (FE) | Auto-generated SDK | `packages/sdk/js/src/v2/client.ts` |
| Styling | Tailwind CSS | `packages/app/src/index.css` |
| UI Components | Kobalte + Custom | `packages/ui/src/` |

---

## Common Errors & Fixes

### Frontend Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot read properties of undefined (reading 'map')` | Provider accessed before ready | Check provider mount order |
| `Failed to create persistent cache` | localStorage full/corrupt | Browser DevTools → Application → Clear storage |
| Context must be used within provider | Wrong provider hierarchy | Ensure provider wraps consumer |

### Backend Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `OPENCODE_WORKSPACE_ID not set` | Running in wrong mode | Set env var or use serve command |
| Auth failed | Invalid credentials | Check OPENCODE_SERVER_PASSWORD |
| Database locked | Multiple writers | Use WAL mode (enabled by default) |

---

## Commands Reference

```bash
# Development
bun run dev                  # Start all packages in watch mode
bun run --filter app dev     # Start only frontend (localhost:3000)
bun run --filter opencode dev # Start only backend

# Build
bun run build               # Build all packages
bun run build --filter sdk  # Build only SDK

# Type check
cd packages/app && bun typecheck
cd packages/opencode && bun typecheck
```
