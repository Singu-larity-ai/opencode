# OpenCode Developer Documentation

> Complete reference for AI agents and developers working on OpenCode

---

## Documentation Index

| Doc | Purpose | Read First |
|-----|---------|------------|
| **[00_OVERVIEW.md](00_OVERVIEW.md)** | Architecture overview, mental model | ✅ Yes |
| **[01_backend.md](01_backend.md)** | All backend files (~375 files) | Reference |
| **[02_frontend.md](02_frontend.md)** | All frontend files (~230 files) | Reference |
| **[03_ui_components.md](03_ui_components.md)** | UI package components | Reference |
| **[04_sdk.md](04_sdk.md)** | SDK client reference | Reference |
| **[05_patterns.md](05_patterns.md)** | Common code patterns | Before coding |
| **[06_decision_tree.md](06_decision_tree.md)** | "Where do I look?" | When lost |

---

## Architecture at a Glance

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
│                              │                                    │
│                    ┌─────────▼─────────┐                        │
│                    │   SDK Client      │                        │
│                    │  packages/sdk/    │                        │
│                    └─────────┬─────────┘                        │
│                              │                                    │
│  ┌──────────────────────────┼────────────────────────────────┐ │
│  │                          │                                 │ │
│  │  ┌──────┐  ┌────────┐  ┌┴───────┐  ┌─────────┐        │ │
│  │  │Session│  │Project │  │Provider│  │ Storage │        │ │
│  │  │& Msg │  │& Worktree│  │(AI APIs)│  │(SQLite)│        │ │
│  │  └──────┘  └────────┘  └────────┘  └─────────┘        │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────┐          │ │
│  │  │   Sync System (Event Sourcing)          │          │ │
│  │  │   Real-time via SSE + Bus              │          │ │
│  │  └─────────────────────────────────────────┘          │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

| Package | Path | Responsibility |
|---------|------|----------------|
| **opencode** | `packages/opencode/src/` | Backend: server, CLI, agent runtime, Effect services |
| **app** | `packages/app/src/` | Frontend: SolidJS web UI |
| **ui** | `packages/ui/src/` | Shared: UI component library |
| **sdk** | `packages/sdk/js/src/` | API: Auto-generated TypeScript SDK |
| **desktop** | `packages/desktop/src/` | Desktop: Tauri wrapper |
| **shared** | `packages/shared/src/` | Utils: Cross-package utilities |

---

## Tech Stack

### Backend
| Component | Technology |
|-----------|------------|
| Framework | Hono |
| Runtime | Bun |
| Database | SQLite + Drizzle ORM |
| State | Effect framework |
| Auth | Casdoor OIDC + Basic Auth |

### Frontend
| Component | Technology |
|-----------|------------|
| Framework | SolidJS |
| Routing | @solidjs/router |
| State | SolidJS Store + Context |
| Persistence | @solid-primitives/storage |
| Styling | Tailwind CSS |
| Components | Kobalte + custom |

### API
| Component | Technology |
|-----------|------------|
| Spec | OpenAPI 3.0 |
| Generation | @hey-api/openapi-ts |
| Transport | REST + SSE + WebSocket |

---

## Key Concepts

### 1. Effect Services
Backend uses Effect for dependency injection and error handling.
- `Context.Service<Service, Interface>()("@opencode/Name")`
- `Layer.effect(Service, Effect.gen(...))`
- See [05_patterns.md](05_patterns.md#1-effect-service-pattern)

### 2. Event Sourcing
Session and project state sync uses event sourcing.
- Events defined with `SyncEvent.define()`
- Run via `SyncEvent.run(Event, payload)`
- Projectors update read models
- See [05_patterns.md](05_patterns.md#2-sync-event-pattern)

### 3. Bus System
Two-level pub/sub for real-time updates.
- `GlobalBus` - SSE for browser clients
- `Bus` - In-process subscribers
- See [01_backend.md](01_backend.md#6-bus)

### 4. Per-Directory State
Each workspace/project has isolated state.
- `Instance.current` - current directory context
- `ScopedCache` - per-directory cached values
- Child stores in frontend for per-project state

### 5. Context Providers
Frontend uses SolidJS context for state management.
- `createSimpleContext()` - creates provider + hook
- Provider hierarchy matters (order of mounting)
- See [02_frontend.md](02_frontend.md#2-context-providers)

---

## Common Tasks

| Task | Guide |
|------|-------|
| Add CLI command | [05_patterns.md](05_patterns.md#adding-a-new-cli-command) |
| Add API route | [05_patterns.md](05_patterns.md#adding-a-new-api-route) |
| Add sync event | [05_patterns.md](05_patterns.md#adding-a-new-sync-event) |
| Add context provider | [05_patterns.md](05_patterns.md#adding-a-new-frontend-context-provider) |
| Debug frontend error | [06_decision_tree.md](06_decision_tree.md#error--fix-mapping) |

---

## File Counts

| Package | Files |
|--------|-------|
| opencode/src | ~375 |
| app/src | ~230 |
| ui/src | ~250 |
| sdk | ~40 |
| **Total** | **~895** |

All documented in:
- [01_backend.md](01_backend.md) - Backend files
- [02_frontend.md](02_frontend.md) - Frontend files
- [03_ui_components.md](03_ui_components.md) - UI components
- [04_sdk.md](04_sdk.md) - SDK client

---

## Start Here

1. **New to codebase?** Read this overview and [06_decision_tree.md](06_decision_tree.md)
2. **Working on backend?** Read [01_backend.md](01_backend.md) + [05_patterns.md](05_patterns.md)
3. **Working on frontend?** Read [02_frontend.md](02_frontend.md) + [05_patterns.md](05_patterns.md)
4. **Adding UI component?** Read [03_ui_components.md](03_ui_components.md)
5. **Using SDK?** Read [04_sdk.md](04_sdk.md)

---

## Quick Commands

```bash
# Development
bun run dev                  # All packages
bun run --filter app dev     # Frontend only
bun run --filter opencode dev # Backend only

# Type check
cd packages/app && bun typecheck
cd packages/opencode && bun typecheck

# Build
bun run build

# SDK regeneration
cd packages/sdk && bun run generate
```
