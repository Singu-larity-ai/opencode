# OpenCode Frontend Source Files Reference

> Comprehensive developer reference for all TypeScript/TSX files in `packages/app/src/`
> Total: ~230 files documented

---

## Table of Contents

1. [Entry Points](#1-entry-points)
2. [Context Providers](#2-context-providers)
3. [Pages](#3-pages)
4. [Components](#4-components)
5. [Utils](#5-utils)
6. [Hooks](#6-hooks)
7. [i18n](#7-internationalization)
8. [Addons](#8-addons)

---

## 1. Entry Points

### `src/entry.tsx`
**Purpose:** Main app entry - renders SolidJS app with platform detection
**Key Exports:** PlatformProvider wrapping AppBaseProviders
**Used By:** index.html

### `src/app.tsx`
**Purpose:** Root app component - provider hierarchy, routing, error boundary, hotkeys
**Key Exports:** AppShellProviders, AppInterface, AppShell
**Used By:** entry.tsx

### `src/index.ts`
**Purpose:** Barrel re-export of app components
**Key Exports:** Re-exports from app.tsx

---

## 2. Context Providers

Context providers manage application state. Critical: must be mounted in correct order.

### Core State Management

#### `context/global-sync.tsx`
**Purpose:** Global state sync - manages all projects, sessions, events across workspaces
**Key Exports:** GlobalSyncProvider, useGlobalSync()
**Used By:** AppBaseProviders
**Important:** This is the most critical context - manages per-directory child stores, project state, session sync

#### `context/global-sync/bootstrap.ts`
**Purpose:** Bootstrap logic for loading initial global state
**Key Exports:** bootstrapGlobal(), bootstrapDirectory()
**Used By:** global-sync.tsx

#### `context/global-sync/child-store.ts`
**Purpose:** Per-directory state stores - each workspace has isolated state
**Key Exports:** createChildStoreManager(), children, ensureChild(), child()
**Used By:** global-sync.tsx

#### `context/global-sync/event-reducer.ts`
**Purpose:** Reduces sync events to update store state
**Key Exports:** applyGlobalEvent(), applyDirectoryEvent()
**Used By:** global-sync.tsx

#### `context/global-sync/eviction.ts`
**Purpose:** LRU eviction for child stores when max stores exceeded
**Key Exports:** canDisposeDirectory(), pickDirectoriesToEvict()
**Used By:** child-store.ts

#### `context/global-sync/queue.ts`
**Purpose:** Refresh queue for bootstrapping directories
**Key Exports:** createRefreshQueue()
**Used By:** global-sync.tsx

#### `context/global-sync/session-cache.ts`
**Purpose:** In-memory cache for session data
**Key Exports:** SessionCache, cacheSession(), getCachedSession()
**Used By:** event-reducer.ts

#### `context/global-sync/session-load.ts`
**Purpose:** Loading sessions with pagination and fallback
**Key Exports:** loadRootSessionsWithFallback(), estimateRootSessionTotal()
**Used By:** global-sync.tsx

#### `context/global-sync/session-prefetch.ts`
**Purpose:** Prefetch sessions for faster navigation
**Key Exports:** prefetchSessionDirectory(), clearSessionPrefetchDirectory()
**Used By:** global-sync.tsx

#### `context/global-sync/session-trim.ts`
**Purpose:** Trim sessions to limit count
**Key Exports:** trimSessions()
**Used By:** session-load.ts, global-sync.tsx

#### `context/global-sync/types.ts`
**Purpose:** TypeScript types for global sync state
**Key Exports:** State, ChildOptions, DirState, ProjectMeta, etc.
**Used By:** All global-sync files

#### `context/global-sync/utils.ts`
**Purpose:** Utility functions for global sync
**Key Exports:** sanitizeProject(), mergeProviderInfo()
**Used By:** global-sync.tsx

### Session State

#### `context/sync.tsx`
**Purpose:** Per-session sync state - messages, parts, permissions
**Key Exports:** SyncProvider, useSync()
**Used By:** AppShellProviders
**Pattern:** Mirrors global-sync but for single session

#### `context/sync-optimistic.test.ts`
**Purpose:** Tests for optimistic update logic
**Key Exports:** N/A (test file)

### Server & Connection

#### `context/server.tsx`
**Purpose:** Server connection management - health checks, server list, active server
**Key Exports:** ServerProvider, useServer()
**Used By:** AppBaseProviders
**Key Methods:** projects.list(), projects.open(), projects.close()

#### `context/sdk.tsx`
**Purpose:** SDK client creation and management
**Key Exports:** SDKProvider, useSDK()
**Used By:** AppShellProviders

#### `context/global-sdk.tsx`
**Purpose:** Global SDK client for global state (projects, config)
**Key Exports:** GlobalSDKProvider, useGlobalSDK()
**Used By:** AppBaseProviders

### UI State

#### `context/layout.tsx`
**Purpose:** Layout state - sidebar, tabs, project list, view settings
**Key Exports:** LayoutProvider, useLayout()
**Used By:** AppShellProviders
**Critical:** Contains migrations for layout schema, project enrichment

#### `context/layout-scroll.ts`
**Purpose:** Scroll position persistence for layout panels
**Key Exports:** createScrollPersistence()
**Used By:** layout.tsx

#### `context/terminal.tsx`
**Purpose:** Terminal state - PTY processes, terminal tabs
**Key Exports:** TerminalProvider, useTerminal()
**Used By:** AppShellProviders

#### `context/terminal-title.ts`
**Purpose:** Terminal title tracking
**Key Exports:** terminalTitle()
**Used By:** terminal.tsx

### File & Editor State

#### `context/file.tsx`
**Purpose:** File tree state, open files, file content caching
**Key Exports:** FileProvider, useFile()
**Used By:** AppShellProviders

#### `context/file/content-cache.ts`
**Purpose:** LRU cache for file content
**Key Exports:** ContentCache, createContentCache()
**Used By:** file.tsx

#### `context/file/path.ts`
**Purpose:** File path utilities, path normalization
**Key Exports:** createPathHelpers()
**Used By:** file.tsx, layout.tsx

#### `context/file/tree-store.ts`
**Purpose:** File tree data structure (expand/collapse state)
**Key Exports:** TreeStore
**Used By:** file.tsx

#### `context/file/types.ts`
**Purpose:** File context types
**Key Exports:** FileTreeItem, FileView, etc.
**Used By:** file.tsx

#### `context/file/view-cache.ts`
**Purpose:** Cache for file viewer state
**Key Exports:** ViewCache
**Used By:** file.tsx

#### `context/file/watcher.ts`
**Purpose:** File system watcher integration
**Key Exports:** createWatcher()
**Used By:** file.tsx

### User Input

#### `context/prompt.tsx`
**Purpose:** Prompt input state - text, attachments, context items
**Key Exports:** PromptProvider, usePrompt()
**Used By:** AppShellProviders

#### `context/command.tsx`
**Purpose:** Command palette state and registry
**Key Exports:** CommandProvider, useCommand(), CommandCatalog
**Used By:** AppShellProviders

### Auth & Settings

#### `context/auth.tsx`
**Purpose:** Authentication state - login, logout, user info
**Key Exports:** AuthProvider, useAuth()
**Used By:** AppShellProviders

#### `context/settings.tsx`
**Purpose:** User settings state - theme, keybinds, preferences
**Key Exports:** SettingsProvider, useSettings()
**Used By:** AppShellProviders

#### `context/permission.tsx`
**Purpose:** Permission ruleset state and auto-respond logic
**Key Exports:** PermissionProvider, usePermission()
**Used By:** AppShellProviders

#### `context/permission-auto-respond.ts`
**Purpose:** Automatic permission response logic
**Key Exports:** autoRespond()
**Used By:** permission.tsx

### Data & Models

#### `context/models.tsx`
**Purpose:** AI model registry and selection
**Key Exports:** ModelsProvider, useModels()
**Used By:** AppShellProviders

#### `context/model-variant.ts`
**Purpose:** Model variant handling (e.g., claude-3-5-sonnet vs claude-3-5-haiku)
**Key Exports:** modelVariantKey(), findModelVariant()
**Used By:** models.tsx

#### `context/highlights.tsx`
**Purpose:** Highlights/annotations state (from code review)
**Key Exports:** HighlightsProvider, useHighlights()
**Used By:** AppShellProviders

### Comments

#### `context/comments.tsx`
**Purpose:** Inline comments on diff lines
**Key Exports:** CommentsProvider, useComments()
**Used By:** AppShellProviders

### Notifications

#### `context/notification.tsx`
**Purpose:** Toast notification state
**Key Exports:** NotificationProvider, useNotification()
**Used By:** AppShellProviders

### Language & i18n

#### `context/language.tsx`
**Purpose:** Current language and translation function
**Key Exports:** LanguageProvider, useLanguage()
**Used By:** AppShellProviders

### Platform

#### `context/platform.tsx`
**Purpose:** Platform detection (web, desktop, cli)
**Key Exports:** PlatformProvider, usePlatform()
**Used By:** AppBaseProviders

### Local Storage

#### `context/local.tsx`
**Purpose:** Local-only state (not synced) - recent models, UI state
**Key Exports:** LocalProvider, useLocal()
**Used By:** AppShellProviders

---

## 3. Pages

### Main Pages

#### `pages/session.tsx`
**Purpose:** Main chat session page - message timeline, composer, file tabs, terminal
**Key Exports:** SessionRoute
**Used By:** app.tsx router
**Critical:** This is where users spend most time - handles message display, streaming, tool execution

#### `pages/layout.tsx`
**Purpose:** Main layout page - sidebar, project list, session tabs
**Key Exports:** LayoutRoute
**Used By:** app.tsx router

#### `pages/home.tsx`
**Purpose:** Home/welcome page when no session is open
**Key Exports:** HomeRoute
**Used By:** app.tsx router

#### `pages/directory-layout.tsx`
**Purpose:** Directory selection/setup page
**Key Exports:** DirectoryLayoutRoute
**Used By:** app.tsx router

#### `pages/error.tsx`
**Purpose:** Error display page for uncaught errors
**Key Exports:** ErrorBoundary
**Used By:** app.tsx

### Session Sub-components

#### `pages/session/message-timeline.tsx`
**Purpose:** Message list with virtualization and scroll management
**Key Exports:** MessageTimeline
**Used By:** session.tsx

#### `pages/session/terminal-panel.tsx`
**Purpose:** Terminal/PTY panel within session
**Key Exports:** TerminalPanel
**Used By:** session.tsx

#### `pages/session/file-tabs.tsx`
**Purpose:** Open file tabs within session
**Key Exports:** FileTabs
**Used By:** session.tsx

#### `pages/session/session-side-panel.tsx`
**Purpose:** Side panel with diffs, comments, etc.
**Key Exports:** SessionSidePanel
**Used By:** session.tsx

#### `pages/session/review-tab.tsx`
**Purpose:** Code review/diff tab content
**Key Exports:** ReviewTab
**Used By:** session.tsx

#### `pages/session/terminal-label.ts`
**Purpose:** Terminal tab label formatting
**Key Exports:** terminalLabel()
**Used By:** session.tsx

#### `pages/session/session-layout.ts`
**Purpose:** Session layout configuration
**Key Exports:** SessionLayout
**Used By:** session.tsx

### Session Composer

#### `pages/session/composer/session-composer-region.tsx`
**Purpose:** Main composer input area
**Key Exports:** SessionComposerRegion
**Used By:** session.tsx

#### `pages/session/composer/session-composer-state.ts`
**Purpose:** Composer state management
**Key Exports:** ComposerState, createComposerStore()
**Used By:** session-composer-region.tsx

#### `pages/session/composer/session-followup-dock.tsx`
**Purpose:** Followup questions dock
**Key Exports:** FollowupDock
**Used By:** session-composer-region.tsx

#### `pages/session/composer/session-permission-dock.tsx`
**Purpose:** Permission request dock
**Key Exports:** PermissionDock
**Used By:** session-composer-region.tsx

#### `pages/session/composer/session-question-dock.tsx`
**Purpose:** Question/clarification dock
**Key Exports:** QuestionDock
**Used By:** session-composer-region.tsx

#### `pages/session/composer/session-revert-dock.tsx`
**Purpose:** Revert confirmation dock
**Key Exports:** RevertDock
**Used By:** session-composer-region.tsx

#### `pages/session/composer/session-todo-dock.tsx`
**Purpose:** Todo list dock
**Key Exports:** TodoDock
**Used By:** session-composer-region.tsx

#### `pages/session/composer/session-request-tree.ts`
**Purpose:** Request context tree building
**Key Exports:** buildRequestTree()
**Used By:** composer files

### Session Helpers

#### `pages/session/helpers.ts`
**Purpose:** Session utility functions
**Key Exports:** Various session helper functions
**Used By:** session.tsx

#### `pages/session/message-gesture.ts`
**Purpose:** Message interaction gestures (click, long-press)
**Key Exports:** messageGesture()
**Used By:** message-timeline.tsx

#### `pages/session/message-id-from-hash.ts`
**Purpose:** Extract message ID from URL hash
**Key Exports:** getMessageIdFromHash()
**Used By:** session.tsx

#### `pages/session/use-session-hash-scroll.ts`
**Purpose:** Scroll to message from URL hash
**Key Exports:** useSessionHashScroll()
**Used By:** session.tsx

#### `pages/session/use-session-commands.tsx`
**Purpose:** Session-specific commands
**Key Exports:** useSessionCommands()
**Used By:** session.tsx

#### `pages/session/file-tab-scroll.ts`
**Purpose:** File tab scroll position management
**Key Exports:** useFileTabScroll()
**Used By:** file-tabs.tsx

#### `pages/session/handoff.ts`
**Purpose:** Session handoff between devices
**Key Exports:** handoffSession()
**Used By:** session.tsx

### Layout Sub-components

#### `pages/layout/conversation-list.tsx`
**Purpose:** List of sessions in sidebar
**Key Exports:** ConversationList
**Used By:** layout.tsx

#### `pages/layout/sidebar-project.tsx`
**Purpose:** Project item in sidebar
**Key Exports:** SidebarProject
**Used By:** layout.tsx

#### `pages/layout/sidebar-workspace.tsx`
**Purpose:** Workspace item in sidebar
**Key Exports:** SidebarWorkspace
**Used By:** layout.tsx

#### `pages/layout/sidebar-shell.tsx`
**Purpose:** Shell/terminal tab in sidebar
**Key Exports:** SidebarShell
**Used By:** layout.tsx

#### `pages/layout/sidebar-items.tsx`
**Purpose:** General sidebar items
**Key Exports:** SidebarItems
**Used By:** layout.tsx

#### `pages/layout/inline-editor.tsx`
**Purpose:** Inline editing for settings
**Key Exports:** InlineEditor
**Used By:** layout.tsx

#### `pages/layout/helpers.ts`
**Purpose:** Layout utility functions
**Key Exports:** Helpers for layout
**Used By:** layout.tsx

#### `pages/layout/deep-links.ts`
**Purpose:** Deep link URL parsing
**Key Exports:** parseDeepLink(), parseNewSessionDeepLink()
**Used By:** layout.tsx

---

## 4. Components

### Dialog Components

#### `components/dialog-settings.tsx`
**Purpose:** Settings dialog
**Key Exports:** SettingsDialog
**Used By:** AppShell

#### `components/dialog-select-server.tsx`
**Purpose:** Server selection dialog
**Key Exports:** SelectServerDialog
**Used By:** settings dialogs

#### `components/dialog-select-provider.tsx`
**Purpose:** AI provider selection dialog
**Key Exports:** SelectProviderDialog
**Used By:** settings

#### `components/dialog-select-model.tsx`
**Purpose:** Model selection dialog
**Key Exports:** SelectModelDialog
**Used By:** settings

#### `components/dialog-select-model-unpaid.tsx`
**Purpose:** Unpaid model warning dialog
**Key Exports:** SelectModelUnpaidDialog
**Used By:** settings

#### `components/dialog-custom-provider.tsx`
**Purpose:** Custom provider form dialog
**Key Exports:** CustomProviderDialog
**Used By:** settings

#### `components/dialog-connect-provider.tsx`
**Purpose:** Connect provider dialog
**Key Exports:** ConnectProviderDialog
**Used By:** settings

#### `components/dialog-select-mcp.tsx`
**Purpose:** MCP server selection dialog
**Key Exports:** SelectMCPDialog
**Used By:** settings

#### `components/dialog-select-directory.tsx`
**Purpose:** Directory selection dialog
**Key Exports:** SelectDirectoryDialog
**Used By:** home page

#### `components/dialog-select-file.tsx`
**Purpose:** File selection dialog
**Key Exports:** SelectFileDialog
**Used By:** various

#### `components/dialog-edit-project.tsx`
**Purpose:** Edit project settings dialog
**Key Exports:** EditProjectDialog
**Used By:** sidebar

#### `components/dialog-fork.tsx`
**Purpose:** Fork session dialog
**Key Exports:** ForkDialog
**Used By:** session

#### `components/dialog-release-notes.tsx`
**Purpose:** Release notes dialog
**Key Exports:** ReleaseNotesDialog
**Used By:** app

#### `components/dialog-manage-models.tsx`
**Purpose:** Model management dialog
**Key Exports:** ManageModelsDialog
**Used By:** settings

### Session Components

#### `components/session/session-header.tsx`
**Purpose:** Session header with title, model info
**Key Exports:** SessionHeader
**Used By:** session.tsx

#### `components/session/session-new-view.tsx`
**Purpose:** New session view
**Key Exports:** SessionNewView
**Used By:** session.tsx

#### `components/session/session-sortable-tab.tsx`
**Purpose:** Draggable session tab
**Key Exports:** SessionSortableTab
**Used By:** layout.tsx

#### `components/session/session-sortable-terminal-tab.tsx`
**Purpose:** Draggable terminal tab
**Key Exports:** SessionSortableTerminalTab
**Used By:** layout.tsx

#### `components/session/session-context-breakdown.ts`
**Purpose:** Context usage breakdown display
**Key Exports:** SessionContextBreakdown
**Used By:** session-header.tsx

#### `components/session/session-context-format.ts`
**Purpose:** Format context metrics
**Key Exports:** formatContextMetrics()
**Used By:** session-context-breakdown.ts

#### `components/session/session-context-metrics.ts`
**Purpose:** Context metrics calculation
**Key Exports:** calculateContextMetrics()
**Used By:** session-context-breakdown.ts

#### `components/session/session-context-tab.tsx`
**Purpose:** Context usage tab
**Key Exports:** SessionContextTab
**Used By:** session-side-panel.tsx

### Settings Components

#### `components/settings-general.tsx`
**Purpose:** General settings panel
**Key Exports:** GeneralSettings
**Used By:** dialog-settings.tsx

#### `components/settings-keybinds.tsx`
**Purpose:** Keybindings settings panel
**Key Exports:** KeybindsSettings
**Used By:** dialog-settings.tsx

#### `components/settings-list.tsx`
**Purpose:** Settings list component
**Key Exports:** SettingsList
**Used By:** settings panels

#### `components/settings-models.tsx`
**Purpose:** Models settings panel
**Key Exports:** ModelsSettings
**Used By:** dialog-settings.tsx

#### `components/settings-providers.tsx`
**Purpose:** Providers settings panel
**Key Exports:** ProvidersSettings
**Used By:** dialog-settings.tsx

### Terminal Components

#### `components/terminal.tsx`
**Purpose:** Terminal emulator component (wrapper)
**Key Exports:** Terminal
**Used By:** various

#### `components/titlebar.tsx`
**Purpose:** Window titlebar
**Key Exports:** Titlebar
**Used By:** app

#### `components/titlebar-history.tsx`
**Purpose:** Back/forward navigation in titlebar
**Key Exports:** TitlebarHistory
**Used By:** titlebar.tsx

### File Components

#### `components/file-tree.tsx`
**Purpose:** File tree component
**Key Exports:** FileTree
**Used By:** layout.tsx

### Status Components

#### `components/status-popover.tsx`
**Purpose:** Status indicator popover
**Key Exports:** StatusPopover
**Used By:** titlebar

#### `components/status-popover-body.tsx`
**Purpose:** Status popover content
**Key Exports:** StatusPopoverBody
**Used By:** status-popover.tsx

### Other Components

#### `components/debug-bar.tsx`
**Purpose:** Debug toolbar (dev mode)
**Key Exports:** DebugBar
**Used By:** app (dev only)

#### `components/link.tsx`
**Purpose:** Styled link component
**Key Exports:** Link
**Used By:** various

#### `components/model-tooltip.tsx`
**Purpose:** Model info tooltip
**Key Exports:** ModelTooltip
**Used By:** various

#### `components/prompt-input.tsx`
**Purpose:** Prompt input component (external)
**Key Exports:** PromptInput
**Used By:** composer

#### `components/server/server-row.tsx`
**Purpose:** Server list item
**Key Exports:** ServerRow
**Used By:** server selection

#### `components/session-context-usage.tsx`
**Purpose:** Context usage display
**Key Exports:** SessionContextUsage
**Used By:** session header

### Prompt Input Sub-components

#### `components/prompt-input/attachments.ts`
**Purpose:** File attachments handling
**Key Exports:** AttachmentManager
**Used By:** prompt-input.tsx

#### `components/prompt-input/build-request-parts.ts`
**Purpose:** Build request parts from prompt
**Key Exports:** buildRequestParts()
**Used By:** prompt-input.tsx

#### `components/prompt-input/context-items.tsx`
**Purpose:** Context items (@mentions)
**Key Exports:** ContextItems
**Used By:** prompt-input.tsx

#### `components/prompt-input/drag-overlay.tsx`
**Purpose:** Drag and drop overlay
**Key Exports:** DragOverlay
**Used By:** prompt-input.tsx

#### `components/prompt-input/editor-dom.ts`
**Purpose:** Editor DOM utilities
**Key Exports:** EditorDOM
**Used By:** prompt-input.tsx

#### `components/prompt-input/files.ts`
**Purpose:** File handling in prompt
**Key Exports:** FileHandler
**Used By:** prompt-input.tsx

#### `components/prompt-input/history.ts`
**Purpose:** Command/history navigation
**Key Exports:** HistoryManager
**Used By:** prompt-input.tsx

#### `components/prompt-input/image-attachments.tsx`
**Purpose:** Image attachment handling
**Key Exports:** ImageAttachments
**Used By:** prompt-input.tsx

#### `components/prompt-input/paste.ts`
**Purpose:** Paste handling
**Key Exports:** PasteHandler
**Used By:** prompt-input.tsx

#### `components/prompt-input/placeholder.ts`
**Purpose:** Placeholder text management
**Key Exports:** PlaceholderManager
**Used By:** prompt-input.tsx

#### `components/prompt-input/slash-popover.tsx`
**Purpose:** Slash command popover
**Key Exports:** SlashPopover
**Used By:** prompt-input.tsx

#### `components/prompt-input/submit.ts`
**Purpose:** Submit handling
**Key Exports:** SubmitHandler
**Used By:** prompt-input.tsx

---

## 5. Utils

### Persistence

#### `utils/persist.ts`
**Purpose:** Persistent state to localStorage/IndexedDB
**Key Exports:** persisted(), Persist, removePersisted()
**Critical:** Used by all context providers for state persistence
**Note:** Handles quota exceeded errors, eviction, legacy migration

### Server Communication

#### `utils/server.ts`
**Purpose:** Server URL and connection utilities
**Key Exports:** isLocalHost(), parseServerUrl()
**Used By:** server.tsx context

#### `utils/server-health.ts`
**Purpose:** Server health check logic
**Key Exports:** checkServerHealth()
**Used By:** server.tsx context

#### `utils/server-errors.ts`
**Purpose:** Server error formatting
**Key Exports:** formatServerError()
**Used By:** global-sync.tsx, session-load.ts

### Diff & File Handling

#### `utils/diffs.ts`
**Purpose:** Unified diff parsing and application
**Key Exports:** parseDiff(), applyDiff()
**Used By:** file viewer, session review

### Prompt Utilities

#### `utils/prompt.ts`
**Purpose:** Prompt text processing
**Key Exports:** parsePrompt(), buildPrompt()
**Used By:** prompt.tsx context

### Session Utilities

#### `utils/session-title.ts`
**Purpose:** Generate session titles from messages
**Key Exports:** generateSessionTitle()
**Used By:** global-sync.tsx

### ID & Hashing

#### `utils/id.ts`
**Purpose:** ID generation utilities
**Key Exports:** generateId()
**Used By:** various

#### `utils/uuid.ts`
**Purpose:** UUID generation
**Key Exports:** generateUUID()
**Used By:** various

### Terminal

#### `utils/terminal-writer.ts`
**Purpose:** Terminal output formatting
**Key Exports:** TerminalWriter
**Used By:** terminal context

### Time

#### `utils/time.ts`
**Purpose:** Time formatting utilities
**Key Exports:** formatTime(), relativeTime()
**Used By:** various

### Base64

#### `utils/base64.ts`
**Purpose:** Base64 encoding/decoding
**Key Exports:** encode64(), decode64()
**Used By:** various

### Sound

#### `utils/sound.ts`
**Purpose:** Audio notification sounds
**Key Exports:** playSound()
**Used By:** notification context

### Comments

#### `utils/comment-note.ts`
**Purpose:** Comment serialization
**Key Exports:** serializeComment(), deserializeComment()
**Used By:** comments.tsx context

### Worktree

#### `utils/worktree.ts`
**Purpose:** Git worktree utilities
**Key Exports:** parseWorktree(), isWorktreePath()
**Used By:** project context

### Agent

#### `utils/agent.ts`
**Purpose:** Agent-related utilities
**Key Exports:** Agent utilities
**Used By:** various

#### `utils/aim.ts`
**Purpose:** AIM (AI Model) utilities
**Key Exports:** AIM utilities
**Used By:** various

### Caching

#### `utils/scoped-cache.ts`
**Purpose:** Scoped in-memory cache
**Key Exports:** createScopedCache()
**Used By:** various contexts

### Runtime

#### `utils/runtime-adapters.ts`
**Purpose:** Runtime environment detection
**Key Exports:** isBun, isNode, isBrowser
**Used By:** persist.ts, various

### Drag and Drop

#### `utils/solid-dnd.tsx`
**Purpose:** SolidJS drag and drop utilities
**Key Exports:** createDraggable(), createDroppable()
**Used By:** sortable tabs

### Notification Click

#### `utils/notification-click.ts`
**Purpose:** Handle notification click routing
**Key Exports:** handleNotificationClick()
**Used By:** notification context

---

## 6. Hooks

### `hooks/use-providers.ts`
**Purpose:** Access all providers in one hook
**Key Exports:** useProviders()
**Used By:** Various components

---

## 7. Internationalization (i18n)

### Translation Files

| File | Language |
|------|----------|
| `i18n/en.ts` | English |
| `i18n/zh.ts` | Chinese (Simplified) |
| `i18n/zht.ts` | Chinese (Traditional) |
| `i18n/ja.ts` | Japanese |
| `i18n/ko.ts` | Korean |
| `i18n/fr.ts` | French |
| `i18n/de.ts` | German |
| `i18n/es.ts` | Spanish |
| `i18n/pt.ts` | Portuguese |
| `i18n/ru.ts` | Russian |
| `i18n/ar.ts` | Arabic |
| `i18n/pl.ts` | Polish |
| `i18n/tr.ts` | Turkish |
| `i18n/th.ts` | Thai |
| `i18n/vi.ts` | Vietnamese |
| `i18n/br.ts` | Breton |
| `i18n/bs.ts` | Bosnian |
| `i18n/da.ts` | Danish |
| `i18n/no.ts` | Norwegian |

### Parity Testing

#### `i18n/parity.test.ts`
**Purpose:** Ensures all languages have same keys
**Key Exports:** N/A (test file)

---

## 8. Addons

### `addons/serialize.ts`
**Purpose:** Terminal buffer serialization (ported from xterm.js)
**Key Exports:** serialize(), deserialize()
**Used By:** Terminal panel for save/restore

---

## Key Patterns Reference

### Provider Mount Order (Critical!)

```
PlatformProvider
└── AppBaseProviders
    ├── ServerProvider
    ├── GlobalSDKProvider
    ├── GlobalSyncProvider ← depends on ServerProvider
    ├── AuthProvider
    ├── Router
    ├── SDKProvider
    ├── SyncProvider
    └── DataProvider
```

### Adding a New Context Provider

1. Create `context/mycontext.tsx`
2. Use `createSimpleContext` from `@opencode-ai/ui/context`
3. Add to appropriate provider chain in `app.tsx`
4. Use `useMyContext()` in child components

### Store Updates

Use SolidJS `createStore` with `produce` for immutable updates:

```typescript
setStore(produce((draft) => {
  draft.items.push(newItem)
}))
```

### Persistence

Wrap store creation with `persisted()`:

```typescript
const [store, setStore, init, ready] = persisted(
  Persist.workspace(directory, "key"),
  createStore({ items: [] })
)
```
