# OpenCode UI Components Reference

> Comprehensive developer reference for `packages/ui/src/`
> Total: ~250 files

---

## Table of Contents

1. [Context Providers](#1-context-providers)
2. [Pierre Module (Diff Rendering)](#2-pierre-module-diff-rendering)
3. [Components](#3-components)
4. [Hooks](#4-hooks)
5. [Styles](#5-styles)
6. [i18n](#6-internationalization)

---

## 1. Context Providers

### `context/helper.tsx`
**Purpose:** Generic context factory - creates typed context providers with optional gating
**Key Exports:** `createSimpleContext()`
**Critical:** Used throughout app to create all context providers

```typescript
// Pattern
export const { use: useX, provider: XProvider } = createSimpleContext({
  name: "X",
  init: (props) => ({ /* context value */ }),
  gate: boolean  // optional - wait for ready()
})
```

### `context/data.tsx`
**Purpose:** Session/message/part data store provider
**Key Exports:** `DataProvider`, `useData()`

### `context/dialog.tsx`
**Purpose:** Dialog stack management - modal dialogs, alerts, confirms
**Key Exports:** `DialogProvider`, `useDialog()`
**Note:** Stack-based system for nested dialogs

### `context/file.tsx`
**Purpose:** Custom file renderer component registry
**Key Exports:** `FileComponentProvider`, `useFileComponent()`

### `context/i18n.tsx`
**Purpose:** Internationalization provider
**Key Exports:** `I18nProvider`, `useI18n()`, `UiI18n`

### `context/worker-pool.tsx`
**Purpose:** Web Worker pool for diff rendering
**Key Exports:** `WorkerPoolProvider`, `useWorkerPool()`

### `context/marked.tsx`
**Purpose:** Configured marked parser with KaTeX math + Shiki highlighting
**Key Exports:** `MarkedProvider`, `useMarked()`, `NativeMarkdownParser`

---

## 2. Pierre Module (Diff Rendering)

Internal module named "Pierre" for file diffing and rendering.

### `pierre/index.ts`
**Purpose:** Main exports + CSS variables
**Key Exports:** `DiffProps`, `createDefaultOptions()`, `styleVariables`

### `pierre/file-runtime.ts`
**Purpose:** File viewer lifecycle and DOM management
**Key Exports:** `applyViewerScheme()`, `createReadyWatcher()`, `getViewerHost()`

### `pierre/file-selection.ts`
**Purpose:** Text/line selection in diffs
**Key Exports:** `findCodeSelectionSide()`, `findDiffLineNumber()`, `readShadowTextSelection()`

### `pierre/file-find.ts`
**Purpose:** In-file search functionality
**Key Exports:** `createFileFind()`

### `pierre/virtualizer.ts`
**Purpose:** Virtual scrolling for large files
**Key Exports:** `acquireVirtualizer()`, `virtualMetrics`

### `pierre/selection-bridge.ts`
**Purpose:** Bridge selections between shadow DOM and main DOM
**Key Exports:** `createLineNumberSelectionBridge()`, `restoreShadowTextSelection()`

### `pierre/commented-lines.ts`
**Purpose:** Mark lines that have comments
**Key Exports:** `markCommentedDiffLines()`, `markCommentedFileLines()`

### `pierre/diff-selection.ts`
**Purpose:** Diff-specific selection logic
**Key Exports:** `fixDiffSelection()`, `findDiffSide()`, `DiffSelectionSide`

### `pierre/comment-hover.ts`
**Purpose:** Comment hover state management
**Key Exports:** Comment hover utilities

### `pierre/media.ts`
**Purpose:** Media file preview support (images, audio, video)
**Key Exports:** Media utilities

### `pierre/worker.ts`
**Purpose:** Worker pool access for rendering
**Key Exports:** `getWorkerPool()`

---

## 3. Components

### Buttons & Inputs

| File | Purpose | Key Exports |
|------|---------|-------------|
| `button.tsx` | Button with variants (primary, secondary, ghost, destructive) | `Button`, `ButtonProps` |
| `icon-button.tsx` | Icon-only button | `IconButton` |
| `icon.tsx` | SVG icon renderer (80+ icons) | `Icon`, `IconProps` |
| `text-field.tsx` | Styled text input | `TextField`, `TextFieldProps` |
| `inline-input.tsx` | Click-to-edit text | `InlineInput` |
| `checkbox.tsx` | Checkbox input | `Checkbox` |
| `switch.tsx` | Toggle switch | `Switch` |
| `radio-group.tsx` | Radio button group | `RadioGroup` |
| `select.tsx` | Dropdown select | `Select` |

### Layout & Structure

| File | Purpose | Key Exports |
|------|---------|-------------|
| `card.tsx` | Card container with title/actions | `Card`, `CardTitle`, `CardDescription`, `CardActions` |
| `dialog.tsx` | Modal dialog | `Dialog`, `DialogProps` |
| `popover.tsx` | Floating popover | `Popover` |
| `dropdown-menu.tsx` | Dropdown menu | `DropdownMenu` |
| `context-menu.tsx` | Right-click context menu | `ContextMenu` |
| `collapsible.tsx` | Expand/collapse | `Collapsible` |
| `accordion.tsx` | Multi-section accordion | `Accordion` |
| `sticky-accordion-header.tsx` | Sticky accordion header | `StickyAccordionHeader` |
| `scroll-view.tsx` | Custom scrollable view | `ScrollView` |
| `resize-handle.tsx` | Draggable panel resizer | `ResizeHandle` |
| `dock-surface.tsx` | Dock panel surface | `DockSurface` |
| `dock-prompt.tsx` | Dock prompt | `DockPrompt` |

### Feedback & Status

| File | Purpose | Key Exports |
|------|---------|-------------|
| `toast.tsx` | Toast notifications with promise support | `Toast`, `toaster`, `showToast()`, `showPromiseToast()` |
| `progress.tsx` | Progress bar | `Progress` |
| `progress-circle.tsx` | Circular spinner | `ProgressCircle` |
| `spinner.tsx` | Loading spinner | `Spinner` |
| `avatar.tsx` | User avatar with fallback | `Avatar`, `AvatarProps` |
| `tag.tsx` | Colored tag/label | `Tag` |

### Text Display

| File | Purpose | Key Exports |
|------|---------|-------------|
| `markdown.tsx` | Markdown renderer with syntax highlighting | `Markdown` |
| `markdown-stream.tsx` | Streaming markdown renderer | `MarkdownStream` |
| `text-reveal.tsx` | Animated text reveal | `TextReveal` |
| `text-shimmer.tsx` | Loading placeholder with shimmer | `TextShimmer` |
| `text-strikethrough.tsx` | Strikethrough animation | `TextStrikethrough` |
| `typewriter.tsx` | Typewriter animation | `Typewriter` |
| `animated-number.tsx` | Animated counter | `AnimatedNumber` |
| `keybind.tsx` | Keyboard shortcut display | `Keybind` |

### File & Diff Display

| File | Purpose | Key Exports |
|------|---------|-------------|
| `file.tsx` | Main file/diff viewer (1100+ lines) | `File`, `TextFileProps`, `DiffPairProps`, `DiffPatchProps` |
| `file-icon.tsx` | File type icon by extension | `FileIcon` |
| `file-media.tsx` | Media preview (images, audio, video) | `FileMedia`, `FileMediaOptions` |
| `file-search.tsx` | In-file search bar | `FileSearchBar` |
| `file-ssr.tsx` | SSR file rendering | SSR utilities |
| `diff-changes.tsx` | Diff summary (+/-/~) | `DiffChanges` |
| `session-diff.ts` | Normalize diff for display | `normalize()` |
| `apply-patch-file.ts` | Apply unified diff patches | `applyPatch()` |
| `line-comment.tsx` | Inline comment on diff line | `LineComment` |
| `line-comment-annotations.tsx` | Comment markers on diff | `LineCommentAnnotations` |

### Session & Messages

| File | Purpose | Key Exports |
|------|---------|-------------|
| `session-turn.tsx` | Single message turn (500+ lines) | `SessionTurn` |
| `message-part.tsx` | Message part renderer | `Message`, `AssistantParts`, `PART_MAPPING` |
| `message-nav.tsx` | Message navigation | `MessageNav` |
| `session-review.tsx` | Session review panel | `SessionReview` |
| `session-retry.tsx` | Retry mechanism | `SessionRetry` |

### Tool Display

| File | Purpose | Key Exports |
|------|---------|-------------|
| `basic-tool.tsx` | Tool card with status animation (280+ lines) | `BasicTool`, `BasicToolProps`, `TriggerTitle` |
| `tool-status-title.tsx` | Tool status display | `ToolStatusTitle` |
| `tool-count-summary.tsx` | Tool usage count badge | `ToolCountSummary` |
| `tool-count-label.tsx` | Tool count label | `ToolCountLabel` |
| `tool-error-card.tsx` | Tool error state | `ToolErrorCard` |

### Other Components

| File | Purpose | Key Exports |
|------|---------|-------------|
| `logo.tsx` | OpenCode logo SVG | `Logo` |
| `favicon.tsx` | Favicon | `Favicon` |
| `image-preview.tsx` | Full image preview | `ImagePreview` |
| `provider-icon.tsx` | AI provider icons | `ProviderIcon` |
| `app-icon.tsx` | App-specific icons | `AppIcon` |
| `font.tsx` | Typography component | `Font` |

---

## 4. Hooks

### `hooks/index.ts`
**Purpose:** Barrel re-export
**Key Exports:** `useFilteredList`, `createAutoScroll`

### `hooks/use-filtered-list.tsx`
**Purpose:** Fuzzy filtered list with grouping and sorting
**Key Exports:** `useFilteredList<T>()`, `FilteredListProps<T>`

### `hooks/create-auto-scroll.tsx`
**Purpose:** Auto-scroll to bottom with user override detection
**Key Exports:** `createAutoScroll()`, `AutoScrollOptions`

---

## 5. Styles

### Main Stylesheets

| File | Purpose |
|------|---------|
| `styles/index.css` | Main entry - imports all CSS with layer ordering |
| `styles/base.css` | CSS reset and base element styles |
| `styles/colors.css` | Color palette as CSS custom properties |
| `styles/theme.css` | Theme-related CSS variables |
| `styles/animations.css` | Animation keyframes |
| `styles/utilities.css` | Utility CSS classes |

### Tailwind Integration

| File | Purpose |
|------|---------|
| `styles/tailwind/index.css` | Tailwind entry point |
| `styles/tailwind/colors.css` | Tailwind color mappings |
| `styles/tailwind/utilities.css` | Tailwind utility overrides |

### Component CSS Files

Each component has a corresponding `.css` file (~50 total):
- `button.css`, `card.css`, `dialog.css`, `dropdown-menu.css`
- `file.css`, `markdown.css`, `session-turn.css`
- And many more...

---

## 6. Internationalization

### `i18n/en.ts`
**Purpose:** English UI translations
**Key Exports:** `dict` object with all UI strings
**Format:** Nested object with keys like `ui.sessionReview.title`

---

## CSS Layer Order

```css
@layer theme, base, components, utilities;
```

Priority (later layers override earlier):
1. `theme` - CSS variables, color palette
2. `base` - Reset, element styles
3. `components` - Component-specific styles
4. `utilities` - Helper classes

---

## Component Variant Pattern

Components use variants for different visual states:

```typescript
// Example from button.tsx
type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive"
type ButtonSize = "sm" | "md" | "lg" | "icon"
```

Apply variants via class composition:
```typescript
<Button class="variant-primary size-md">
```

---

## Icon System

Icons are SVG-based, rendered via `Icon` component:

```typescript
// Built-in icons (80+)
import { Icon } from "@opencode-ai/ui"
<Icon name="code" />

// Icon types defined in components/*/types.ts
```

---

## Toast Notifications

```typescript
import { showToast, showPromiseToast, toaster } from "@opencode-ai/ui"

// Simple toast
showToast({ title: "Saved", description: "Your changes were saved" })

// Promise toast (auto-resolves on promise)
showPromiseToast(promise, { loading: "Saving...", success: "Saved!", error: "Failed" })
```

---

## Markdown Rendering

```typescript
import { Markdown } from "@opencode-ai/ui"

// Basic
<Markdown content={text} />

// Streaming (with incremental render)
<MarkdownStream content={streamingText} />
```

Marked is configured with:
- KaTeX for math (`$...$` and `$$...$$`)
- Shiki for syntax highlighting
- Custom extensions for tool calls, etc.
