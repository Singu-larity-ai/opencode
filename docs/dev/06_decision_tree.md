# OpenCode Decision Tree

> "I need to modify X, where do I look?"
> Quick navigation guide for common tasks

---

## I Want To...

### Fix Something in the Web UI

```
┣━ Error on page load
┃   → Check browser console
┃   → Check provider mount order in app.tsx
┃   → Check if globalSync.ready is true before accessing data
┃
┣━ Fix session/message display
┃   → packages/app/src/pages/session/message-timeline.tsx
┃   → packages/app/src/context/sync.tsx
┃   → packages/ui/src/components/session-turn.tsx
┃
┣━ Fix sidebar/project list
┃   → packages/app/src/context/layout.tsx
┃   → packages/app/src/pages/layout/conversation-list.tsx
┃
┣━ Fix file viewer/diff
┃   → packages/ui/src/components/file.tsx
┃   → packages/ui/src/pierre/ (diff rendering)
┃
┗━ Fix prompt input
    → packages/app/src/context/prompt.tsx
    → packages/app/src/components/prompt-input.tsx
```

### Fix Something in the Backend

```
┣━ Fix API endpoint not working
┃   → Find route in packages/opencode/src/server/routes/
┃   → Check route handler
┃   → Check Effect service it depends on
┃
┣━ Fix session/messaging
┃   → packages/opencode/src/session/
┃   → packages/opencode/src/sync/ (event sourcing)
┃
┣━ Fix project/worktree issues
┃   → packages/opencode/src/project/
┃   → packages/opencode/src/worktree/
┃
┣━ Fix AI provider errors
┃   → packages/opencode/src/provider/
┃
┗━ Fix terminal/PTY
    → packages/opencode/src/pty/
```

### Add a New Feature

#### New API Endpoint
```
1. Define route: packages/opencode/src/server/routes/instance/newroute.ts
2. Mount route: packages/opencode/src/server/routes/instance/index.ts
3. Add to SDK: packages/sdk/openapi.json → regenerate
4. Add frontend hook: packages/app/src/context/sdk.tsx
```

#### New CLI Command
```
1. Create: packages/opencode/src/cli/cmd/newcmd.ts
2. Register: packages/opencode/src/index.ts
```

#### New Frontend Component
```
1. Create: packages/app/src/components/my-component.tsx
2. Or in UI: packages/ui/src/components/my-component.tsx
3. Add styles: packages/ui/src/components/my-component.css
4. Add to page: packages/app/src/pages/
```

#### New Context Provider
```
1. Create: packages/app/src/context/mycontext.tsx
2. Add to hierarchy: packages/app/src/app.tsx
3. Use in components: useMyContext()
```

#### New Sync Event
```
1. Define event: packages/opencode/src/sync/
2. Create projector: packages/opencode/src/sync/projectors.ts
3. Register: packages/opencode/src/server/projectors.ts
4. Use: SyncEvent.run(MyEvent, {...})
```

---

## File Location Quick Reference

### Critical Backend Files

| What | Where |
|------|-------|
| Server entry | `packages/opencode/src/server/server.ts` |
| CLI entry | `packages/opencode/src/index.ts` |
| Auth middleware | `packages/opencode/src/auth/` |
| Session model | `packages/opencode/src/session/session.ts` |
| Sync events | `packages/opencode/src/sync/index.ts` |
| Bus system | `packages/opencode/src/bus/index.ts` |
| Effect runtime | `packages/opencode/src/effect/run-service.ts` |
| Config system | `packages/opencode/src/config/config.ts` |

### Critical Frontend Files

| What | Where |
|------|-------|
| App entry | `packages/app/src/entry.tsx` |
| Provider hierarchy | `packages/app/src/app.tsx` |
| Global state | `packages/app/src/context/global-sync.tsx` |
| Session page | `packages/app/src/pages/session.tsx` |
| Layout page | `packages/app/src/pages/layout.tsx` |
| Persistence | `packages/app/src/utils/persist.ts` |

### UI Components

| What | Where |
|------|-------|
| All UI components | `packages/ui/src/components/` |
| File/diff viewer | `packages/ui/src/components/file.tsx` |
| Toast notifications | `packages/ui/src/components/toast.tsx` |
| Session turns | `packages/ui/src/components/session-turn.tsx` |
| Markdown rendering | `packages/ui/src/components/markdown.tsx` |

---

## Error → Fix Mapping

| Error Message | Likely Location | Fix |
|---------------|----------------|-----|
| `Cannot read properties of undefined (reading 'map')` | Provider initialization | Check mount order in app.tsx |
| `Failed to create persistent cache` | localStorage | Clear browser storage |
| `Context must be used within provider` | Provider hierarchy | Add provider wrapper |
| `OPENCODE_WORKSPACE_ID not set` | Server mode | Set env var or use serve command |
| `Session not found` | Session route | Check session ID in URL |
| `Provider not configured` | Provider setup | Add provider in settings |

---

## Code Pattern Reference

### Effect Service
**Pattern:** `packages/opencode/src/project/project.ts`
**Usage:** Backend services with dependency injection

### Sync Event
**Pattern:** `packages/opencode/src/sync/index.ts`
**Usage:** Event sourcing for state sync

### Context Provider
**Pattern:** `packages/app/src/context/layout.tsx`
**Usage:** Frontend state management

### Persisted Store
**Pattern:** `packages/app/src/utils/persist.ts`
**Usage:** localStorage/IndexedDB persistence

---

## Route Structure (Backend)

```
/auth/*           → AuthRoutes        (login, logout, OIDC)
/global/*         → GlobalRoutes     (config, global events)
/session/*        → SessionRoutes    (messages, streaming)
/project/*        → ProjectRoutes    (project management)
/provider/*       → ProviderRoutes   (AI provider config)
/pty/*            → PtyRoutes        (terminal WebSocket)
/sync/*           → SyncRoutes       (event sync)
```

---

## Key Imports

```typescript
// Backend Effect
import { Effect, Context, Layer } from "effect"
import { runService } from "@opencode-ai/opencode/effect"

// Frontend Solid
import { createSignal, createMemo, createStore } from "solid-js"
import { useContext } from "solid-js"

// Context
import { createSimpleContext } from "@opencode-ai/ui/context"

// SDK
import { createOpencodeClient } from "@opencode-ai/sdk/v2"
```

---

## Testing

| What | How |
|------|-----|
| Backend unit | `Effect.runPromise(test)` with runtime |
| Backend integration | Direct service calls |
| Frontend unit | `render()` from testing library |
| Frontend component | `@testing-library/solid` |

---

## Build & Run

```bash
# Dev mode
bun run dev

# Type check
cd packages/app && bun typecheck
cd packages/opencode && bun typecheck

# Build
bun run build

# SDK regeneration
cd packages/sdk && bun run generate
```

---

## Common Imports Map

### Backend
```typescript
// Server
import { Hono } from "hono"
import { Effect } from "effect"

// Database
import { db } from "./storage/db"
import { schema } from "./storage/schema"

// Sync
import { SyncEvent } from "./sync"
import { publish, subscribe } from "./bus"

// Config
import { Config } from "./config"
```

### Frontend
```typescript
// React-like Solid imports
import { createSignal, onMount, createEffect } from "solid-js"
import { For, Show, Switch, Match } from "solid-js"

// Context
import { createSimpleContext } from "@opencode-ai/ui/context"

// Components
import { Button, Dialog, Toast } from "@opencode-ai/ui"

// SDK
import { createOpencodeClient } from "@opencode-ai/sdk/v2"
```
