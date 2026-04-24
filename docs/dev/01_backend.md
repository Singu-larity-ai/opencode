# OpenCode Backend Source Files Reference

> Comprehensive developer reference for all TypeScript files in `packages/opencode/src/`
> Total: ~452 files documented

---

## Table of Contents

1. [Root Entry](#1-root-entry)
2. [account/](#2-account)
3. [acp/](#3-acp)
4. [agent/](#4-agent)
5. [auth/](#5-auth)
6. [bus/](#6-bus)
7. [cli/](#7-cli)
8. [command/](#8-command)
9. [config/](#9-config)
10. [control-plane/](#10-control-plane)
11. [effect/](#11-effect)
12. [env/](#12-env)
13. [file/](#13-file)
14. [flag/](#14-flag)
15. [format/](#15-format)
16. [git/](#16-git)
17. [global/](#17-global)
18. [id/](#18-id)
19. [ide/](#19-ide)
20. [installation/](#20-installation)
21. [lsp/](#21-lsp)
22. [mcp/](#22-mcp)
23. [npm/](#23-npm)
24. [patch/](#24-patch)
25. [permission/](#25-permission)
26. [plugin/](#26-plugin)
27. [project/](#27-project)
28. [provider/](#28-provider)
29. [pty/](#29-pty)
30. [question/](#30-question)
31. [server/](#31-server)
32. [session/](#32-session)
33. [share/](#33-share)
34. [shell/](#34-shell)
35. [skill/](#35-skill)
36. [snapshot/](#36-snapshot)
37. [storage/](#37-storage)
38. [sync/](#38-sync)
39. [tool/](#39-tool)
40. [util/](#40-util)
41. [v2/](#41-v2)
42. [worktree/](#42-worktree)

---

## 1. Root Entry

### index.ts
**Purpose:** Main CLI entry point - orchestrates yargs command parsing, database migration, and process setup
**Key Exports:** CLI commands (RunCommand, GenerateCommand, etc.), error handling, logo display
**Used By:** CLI runtime, package.json bin

### node.ts, temporary.ts, sql.d.ts, audio.d.ts, npmcli-config.d.ts
**Purpose:** Type declarations and temporary module exports
**Key Exports:** Type definitions for Node.js, SQL, audio, npmcli config

---

## 2. account/

### account.ts
**Purpose:** Account service for managing user authentication, token refresh, org switching via OAuth/device flow
**Key Exports:** Service, layer, AccountID, AccessToken, Org, Login, PollResult types
**Used By:** config, server/routes

### repo.ts
**Purpose:** Database repository for account persistence (SQLite)
**Key Exports:** Service, layer, AccountRow type
**Used By:** account.ts

### schema.ts
**Purpose:** Effect Schema definitions for account types (AccountID, OrgID, tokens, errors)
**Key Exports:** All branded schema types, error classes
**Used By:** account.ts, repo.ts

### url.ts
**Purpose:** Normalize server URLs by removing trailing slashes and search/hash
**Key Exports:** normalizeServerUrl function
**Used By:** account.ts

### account.sql.ts
**Purpose:** Drizzle ORM table definitions for account and account_state
**Key Exports:** AccountTable, AccountStateTable, ControlAccountTable
**Used By:** repo.ts

---

## 3. acp/

### agent.ts
**Purpose:** ACP (Agent Client Protocol) agent implementation bridging opencode to ACP clients
**Key Exports:** Agent class implementing ACPAgent interface, init function
**Used By:** acp/main.ts (if exists), MCP server initialization

### session.ts
**Purpose:** ACP session manager for tracking ACP session state
**Key Exports:** ACPSessionManager class
**Used By:** agent.ts

### types.ts
**Purpose:** TypeScript types for ACP configuration and session state
**Key Exports:** ACPSessionState, ACPConfig interfaces
**Used By:** agent.ts, session.ts

---

## 4. agent/

### agent.ts
**Purpose:** Agent service managing AI agent configurations (build, plan, explore, general, etc.)
**Key Exports:** Service, layer, Info type, Agent.Info (zod schema for agent config)
**Used By:** config, session/processor.ts, tool/registry.ts

---

## 5. auth/

### index.ts
**Purpose:** Auth service for managing API keys and OAuth credentials per provider
**Key Exports:** Service, layer, Info union type (Oauth/Api/WellKnown), AuthError
**Used By:** config, provider, server

### user/db.ts
**Purpose:** SQLite database for user authentication (Casdoor OIDC integration)
**Key Exports:** AuthUserTable, AuthSessionTable, db instance
**Used By:** user/session.ts, user/user.ts

### user/oidc.ts
**Purpose:** OIDC utility functions for Casdoor integration (token exchange, JWKS verification)
**Key Exports:** authorizeUrl, logoutUrl, exchangeCode, verifyIdToken, fetchUserInfo
**Used By:** user/routes.ts

### user/routes.ts
**Purpose:** Hono routes for /auth/* endpoints (login, callback, logout, me)
**Key Exports:** AuthRoutes function
**Used By:** server/server.ts

### user/session.ts
**Purpose:** Session management for authenticated users
**Key Exports:** create, findValidWithUser, deleteByUserId, cleanExpired functions
**Used By:** user/routes.ts

### user/user.ts
**Purpose:** User CRUD operations
**Key Exports:** findById, findByCasdoorId, upsert functions
**Used By:** user/routes.ts

### user/schema.sql.ts
**Purpose:** Re-exports database tables for auth users
**Key Exports:** AuthUserTable, AuthSessionTable
**Used By:** (imported by db.ts)

---

## 6. bus/

### index.ts
**Purpose:** Event bus service using Effect PubSub for publish/subscribe patterns
**Key Exports:** Service, layer, InstanceDisposed event, publish/subscribe/subscribeAll functions
**Used By:** Throughout codebase for event-driven communication

### bus-event.ts
**Purpose:** Schema definitions for typed bus events
**Key Exports:** define function, registry, payloads function
**Used By:** bus/index.ts, sync/

### global.ts
**Purpose:** Node.js EventEmitter-based global event bus for cross-instance events
**Key Exports:** GlobalBus, GlobalEvent type
**Used By:** bus/index.ts, config, server

---

## 7. cli/

### bootstrap.ts
**Purpose:** Bootstrap function to run code within an instance context
**Key Exports:** bootstrap function
**Used By:** cli commands (run.ts, serve.ts)

### error.ts
**Purpose:** CLI error formatting for user-friendly error messages
**Key Exports:** FormatError, FormatUnknownError functions
**Used By:** index.ts (main entry)

### heap.ts
**Purpose:** Automatic heap snapshot creation when memory exceeds 2GB
**Key Exports:** start function, Heap namespace
**Used By:** index.ts (main entry)

### logo.ts
**Purpose:** ASCII art logo definitions
**Key Exports:** logo, go, marks objects
**Used By:** cli/ui.ts

### network.ts
**Purpose:** Network options resolution for serve/web commands
**Key Exports:** withNetworkOptions, resolveNetworkOptions, resolveNetworkOptionsNoConfig
**Used By:** cli/cmd/serve.ts, cli/cmd/web.ts

### ui.ts
**Purpose:** CLI UI utilities (logo rendering, styled output, input prompts)
**Key Exports:** UI namespace, Style, println, print, input, error, logo functions
**Used By:** index.ts

### upgrade.ts
**Purpose:** Auto-upgrade logic checking for new versions
**Key Exports:** upgrade function
**Used By:** cli/bootstrap.ts (pre-command)

### cmd/*.ts (Commands)
**Purpose:** Individual CLI commands (run, generate, serve, debug, account, models, mcp, github, pr, session, db, plug, etc.)
**Key Exports:** Each command's yargs command definition
**Used By:** index.ts

### cmd/tui/*.tsx (TUI Components)
**Purpose:** React components for the terminal UI (dialogs, prompts, sidebar, routes)
**Key Exports:** TUI components and hooks
**Used By:** cmd/tui/thread.ts

---

## 8. command/

### index.ts
**Purpose:** Command registry service for /commands (slash commands) and MCP prompts
**Key Exports:** Service, layer, Info type, Event definitions, Default command constants
**Used By:** server/routes/instance, session/prompt.ts

---

## 9. config/

### config.ts
**Purpose:** Central configuration service loading and merging opencode.json files
**Key Exports:** Service, layer, Info type, ConfigDirectoryTypoError
**Used By:** Throughout codebase

### agent.ts
**Purpose:** Agent configuration loading from markdown files in agent/ directories
**Key Exports:** Info zod schema, load, loadMode functions
**Used By:** config.ts

### command.ts
**Purpose:** Command configuration loading from markdown files
**Key Exports:** Info schema, load function
**Used By:** config.ts

### error.ts
**Purpose:** Configuration error types (JsonError, InvalidError)
**Key Exports:** JsonError, InvalidError
**Used By:** config.ts, parse.ts

### formatter.ts
**Purpose:** Formatter configuration schema
**Key Exports:** Info schema
**Used By:** config.ts

### index.ts
**Purpose:** Re-exports all config submodules
**Key Exports:** Config, ConfigAgent, ConfigCommand, etc.
**Used By:** Throughout codebase

### keybinds.ts, layout.ts, markdown.ts, mcp.ts, model-id.ts, parse.ts, paths.ts, permission.ts, plugin.ts, provider.ts, server.ts, skills.ts, variable.ts
**Purpose:** Individual config domain schemas and loaders
**Key Exports:** Respective Info schemas and load functions
**Used By:** config.ts

---

## 10. control-plane/

### adaptors/index.ts, worktree.ts
**Purpose:** Workspace adaptors for multi-tenant control plane
**Key Exports:** WorkspaceAdaptor types
**Used By:** plugin/index.ts, server/routes

### dev/debug-workspace-plugin.ts
**Purpose:** Development workspace plugin
**Key Exports:** Debug workspace plugin
**Used By:** (dev only)

### schema.ts, sse.ts, types.ts, util.ts, workspace-context.ts, workspace.sql.ts, workspace.ts
**Purpose:** Control plane core types and workspace management
**Key Exports:** WorkspaceID, workspace context types
**Used By:** server, project, sync

---

## 11. effect/

### index.ts
**Purpose:** Re-exports effect system utilities
**Key Exports:** InstanceState, EffectBridge, Runner, Observability, EffectLogger
**Used By:** Throughout codebase

### app-runtime.ts, bootstrap-runtime.ts, bridge.ts, cross-spawn-spawner.ts, instance-ref.ts, instance-registry.ts, instance-state.ts, logger.ts, memo-map.ts, observability.ts, run-service.ts, runner.ts, runtime.ts
**Purpose:** Effect framework integration and runtime management
**Key Exports:** Various Effect-based services and utilities
**Used By:** Throughout codebase

---

## 12. env/

### index.ts
**Purpose:** Environment variable service
**Key Exports:** Service, layer
**Used By:** config, provider

---

## 13. file/

### ignore.ts, index.ts, protected.ts, ripgrep.ts, watcher.ts
**Purpose:** File operations (ignore patterns, protected files, ripgrep search, filesystem watching)
**Key Exports:** Various file utility functions
**Used By:** tool implementations, session

---

## 14. flag/

### flag.ts
**Purpose:** Feature flags from environment variables
**Key Exports:** OPENCODE_* flag constants
**Used By:** Throughout codebase

---

## 15. format/

### formatter.ts, index.ts
**Purpose:** Code formatter integration
**Key Exports:** Format service
**Used By:** server/routes/instance

---

## 16. git/

### index.ts
**Purpose:** Git utilities
**Key Exports:** Git functions
**Used By:** project, session

---

## 17. global/

### index.ts
**Purpose:** Global path constants and directories
**Key Exports:** Global namespace with Path object
**Used By:** Throughout codebase

---

## 18. id/

### id.ts
**Purpose:** ID generation utilities
**Key Exports:** ID generation functions
**Used By:** session/schema.ts

---

## 19. ide/

### index.ts
**Purpose:** IDE integration utilities
**Key Exports:** IDE functions
**Used By:** (various)

---

## 20. installation/

### index.ts, version.ts
**Purpose:** Installation detection, upgrade management, version info
**Key Exports:** Service, layer, InstallationVersion, InstallationChannel
**Used By:** index.ts, config, cli

---

## 21. lsp/

### client.ts, diagnostic.ts, index.ts, language.ts, launch.ts, lsp.ts, server.ts
**Purpose:** Language Server Protocol integration for code intelligence
**Key Exports:** LSP service, launch functions
**Used By:** server/routes/instance, tool/lsp.ts

---

## 22. mcp/

### auth.ts, index.ts, oauth-callback.ts, oauth-provider.ts
**Purpose:** Model Context Protocol server implementation
**Key Exports:** MCP service, OAuth providers
**Used By:** server/routes/instance/mcp.ts, config/mcp.ts

---

## 23. npm/

### config.ts, index.ts
**Purpose:** NPM package management utilities
**Key Exports:** Npm service
**Used By:** config.ts, project

---

## 24. patch/

### index.ts
**Purpose:** Patch application utilities
**Key Exports:** Patch functions
**Used By:** tool/apply_patch.ts

---

## 25. permission/

### arity.ts, evaluate.ts, index.ts, schema.ts
**Purpose:** Permission evaluation system for tool access control
**Key Exports:** Permission service, Ruleset types
**Used By:** agent, session, tool

---

## 26. plugin/

### index.ts, install.ts, loader.ts, meta.ts, shared.ts
**Purpose:** Plugin system for extending opencode functionality
**Key Exports:** Service, layer, PluginLoader
**Used By:** config, provider, server

### cloudflare.ts, codex.ts, github-copilot/*.ts
**Purpose:** Built-in plugin implementations
**Key Exports:** Plugin instances
**Used By:** plugin/index.ts

---

## 27. project/

### index.ts, instance.ts, project.ts, schema.ts, vcs.ts
**Purpose:** Project management, instance context, VCS integration
**Key Exports:** Project service, Vcs service, Instance
**Used By:** server, session, config

### bootstrap.ts, project.sql.ts
**Purpose:** Project initialization and database schema
**Key Exports:** Bootstrap functions, ProjectTable
**Used By:** cli/bootstrap.ts, instance.ts

---

## 28. provider/

### index.ts, provider.ts, models.ts, auth.ts, error.ts, schema.ts, transform.ts
**Purpose:** AI provider management (Anthropic, OpenAI, Azure, etc.)
**Key Exports:** Service, layer, Provider types, Model types
**Used By:** session, config, tool

### sdk/copilot/*.ts
**Purpose:** GitHub Copilot SDK integration
**Key Exports:** Copilot provider implementation
**Used By:** provider.ts

---

## 29. pty/

### index.ts, pty.bun.ts, pty.node.ts, pty.ts, schema.ts
**Purpose:** Pseudo-terminal management for interactive shell commands
**Key Exports:** PTY service, pty functions
**Used By:** server/routes/instance/pty.ts, tool/bash.ts

---

## 30. question/

### index.ts, schema.ts
**Purpose:** Question/request permission system
**Key Exports:** Question service
**Used By:** session/processor.ts, permission

---

## 31. server/

### server.ts
**Purpose:** Hono-based HTTP server with WebSocket support
**Key Exports:** listen function, Server namespace
**Used By:** cli/cmd/serve.ts

### adapter.bun.ts, adapter.node.ts, adapter.ts
**Purpose:** Server adapter for Bun and Node.js
**Key Exports:** adapter
**Used By:** server.ts

### error.ts, event.ts, fence.ts, mdns.ts, middleware.ts, projectors.ts, proxy.ts
**Purpose:** Server utilities (error handling, events, CORS, mDNS)
**Key Exports:** Middleware functions, utilities
**Used By:** server.ts

### routes/control/*.ts
**Purpose:** Control plane API routes (workspace management)
**Key Exports:** Hono route handlers
**Used By:** server.ts

### routes/instance/*.ts
**Purpose:** Instance API routes (session, project, config, mcp, etc.)
**Key Exports:** Hono route handlers
**Used By:** server.ts

### routes/global.ts, ui.ts
**Purpose:** Global and UI routes
**Key Exports:** Hono route handlers
**Used By:** server.ts

### workspace.ts
**Purpose:** Workspace routing middleware
**Key Exports:** WorkspaceRouterMiddleware
**Used By:** server.ts

---

## 32. session/

### index.ts, session.ts
**Purpose:** Session management service
**Key Exports:** Service, layer, Info type
**Used By:** server/routes/instance, session/processor.ts

### compaction.ts, instruction.ts, llm.ts, message.ts, message-v2.ts, overflow.ts, processor.ts, prompt.ts, retry.ts, revert.ts, run-state.ts, schema.ts, session.sql.ts, status.ts, summary.ts, system.ts, todo.ts
**Purpose:** Session core functionality (messaging, processing, compaction)
**Key Exports:** Various session components
**Used By:** session.ts, processor.ts

### projectors.ts
**Purpose:** Session projectors for sync events
**Key Exports:** Projector functions
**Used By:** sync/index.ts

---

## 33. share/

### index.ts, session.ts, share-next.ts, share.sql.ts
**Purpose:** Session sharing functionality
**Key Exports:** Share service
**Used By:** server, session

---

## 34. shell/

### shell.ts
**Purpose:** Shell command execution
**Key Exports:** Shell functions
**Used By:** tool/bash.ts

---

## 35. skill/

### discovery.ts, index.ts
**Purpose:** Skill discovery and management
**Key Exports:** Service
**Used By:** config, server/routes/instance

---

## 36. snapshot/

### index.ts
**Purpose:** Filesystem snapshot tracking for undo/revert
**Key Exports:** Snapshot service
**Used By:** session, session/processor.ts

---

## 37. storage/

### db.bun.ts, db.node.ts, db.ts, index.ts, json-migration.ts, schema.sql.ts, schema.ts, storage.ts
**Purpose:** SQLite database management via Drizzle ORM
**Key Exports:** Database, Storage services, NotFoundError
**Used By:** Throughout codebase for persistence

---

## 38. sync/

### index.ts, event.sql.ts, schema.ts
**Purpose:** Event sourcing sync system with projectors
**Key Exports:** SyncEvent service, define, project, run, replay functions
**Used By:** session, server

---

## 39. tool/

### index.ts, tool.ts, registry.ts, schema.ts
**Purpose:** Tool definitions and registry
**Key Exports:** Tool.Def, Tool.Info, registry
**Used By:** session/processor.ts

### apply_patch.ts, bash.ts, codesearch.ts, edit.ts, external-directory.ts, glob.ts, grep.ts, invalid.ts, lsp.ts, mcp-exa.ts, plan.ts, question.ts, read.ts, skill.ts, task.ts, todo.ts, truncate.ts, truncation-dir.ts, webfetch.ts, websearch.ts, write.ts
**Purpose:** Individual tool implementations
**Key Exports:** Tool definitions
**Used By:** tool/registry.ts

---

## 40. util/

### abort.ts, archive.ts, bom.ts, color.ts, data-url.ts, defer.ts, effect-http-client.ts, effect-zod.ts, error.ts, filesystem.ts, fn.ts, format.ts, iife.ts, index.ts, keybind.ts, lazy.ts, local-context.ts, locale.ts, lock.ts, log.ts, media.ts, named-schema-error.ts, network.ts, opencode-process.ts, process.ts, queue.ts, record.ts, rpc.ts, schema.ts, scrap.ts, signal.ts, timeout.ts, token.ts, update-schema.ts, which.ts, wildcard.ts
**Purpose:** General utility functions
**Key Exports:** Various utility functions
**Used By:** Throughout codebase

---

## 41. v2/

### session-entry-stepper.ts, session-entry.ts, session-event.ts, session.ts
**Purpose:** V2 session implementation (evolving session system)
**Key Exports:** V2 session components
**Used By:** (evolving replacement for session/)

---

## 42. worktree/

### index.ts
**Purpose:** Git worktree management
**Key Exports:** Worktree functions
**Used By:** control-plane/adaptors

---

## File Count Summary

| Directory | Approximate Files |
|-----------|------------------|
| cli/cmd/ | ~150+ |
| session/ | ~20 |
| server/routes/ | ~30 |
| provider/ | ~30 |
| tool/ | ~25 |
| util/ | ~40 |
| config/ | ~20 |
| Other directories | ~100 |
| **Total** | **~452** |

---

## Key Architectural Patterns

### Service Layer Pattern
Most modules follow the Effect service pattern:
```typescript
export class Service extends Context.Service<Service, Interface>()("@opencode/Name") {}
export const layer: Layer.Layer<Service> = Layer.effect(Service, Effect.gen(...))
export const defaultLayer = layer.pipe(Layer.provide(Dependency1.layer), Layer.provide(Dependency2.layer))
```

### Event-Driven Architecture
- **Bus** for in-process pub/sub
- **SyncEvent** for event sourcing with persistence
- **GlobalBus** for cross-instance events

### Configuration Hierarchy
1. Global config (`~/.config/opencode/`)
2. Project config (`.opencode/`)
3. Environment variables
4. Account/org remote config

### Session Flow
1. `session.create()` -> creates SessionInfo
2. `session.processor` -> handles LLM streaming
3. Tools execute via `tool/registry.ts`
4. Events published via `bus/` and `sync/`

---

*Generated from source analysis of `packages/opencode/src/`*
