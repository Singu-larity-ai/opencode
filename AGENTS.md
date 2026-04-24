- To regenerate the JavaScript SDK, run `./packages/sdk/js/script/build.ts`.
- ALWAYS USE PARALLEL TOOLS WHEN APPLICABLE.
- The default branch in this repo is `dev`.
- Local `main` ref may not exist; use `dev` or `origin/dev` for diffs.
- Prefer automation: execute requested actions without confirmation unless blocked by missing info or safety/irreversibility.

## Docs-First Problem Solving

When you encounter a problem you cannot solve quickly (API not behaving as expected, configuration issues, unfamiliar framework behavior), **do NOT brute-force it with trial and error**. Instead:

1. Check `docs/tech-stacks/<stack>/` for reference documentation
2. Read the relevant section before attempting any fix
3. If the docs folder is empty or missing the information, fetch the official documentation online first

This saves time and prevents cascading failures from wrong assumptions. The 30-minute Casdoor debugging session (where reading the Public API docs would have solved it in 2 minutes) is the canonical example of what NOT to do.

## Browser-First Verification

When the user describes a UI bug or behavior, **always use the gstack browser (`$B`) to reproduce it yourself** before making changes. Don't rely solely on the user's description. Steps:

1. `cookie-import-browser chrome --domain localhost` to get auth cookies
2. `goto http://localhost:3000` and navigate to the relevant page
3. `snapshot -i` to inspect interactive elements
4. Reproduce the exact user action described
5. Fix the issue, then verify the fix in the browser again

This ensures you understand the problem correctly before writing code.

## Explore Docs First

Before exploring the codebase with search tools, check `docs/dev/` for comprehensive documentation:

- `docs/dev/00_OVERVIEW.md` — Architecture overview, tech stack, key concepts
- `docs/dev/01_backend.md` — All backend files (~375 files) with descriptions
- `docs/dev/02_frontend.md` — All frontend files (~230 files) with descriptions
- `docs/dev/03_ui_components.md` — UI component catalog
- `docs/dev/04_sdk.md` — SDK client reference
- `docs/dev/05_patterns.md` — Common code patterns with templates
- `docs/dev/06_decision_tree.md` — "Where do I look?" navigation guide

**Quick start:** Read `docs/dev/06_decision_tree.md` first — it tells you exactly where to look for what you're trying to do.

For architecture details:
- `docs/architecture/backend-auth-and-server.md` — Server setup, middleware chain, auth
- `docs/architecture/frontend-architecture.md` — Entry point, routing, provider hierarchy

## Style Guide

### General Principles

- Keep things in one function unless composable or reusable
- Avoid `try`/`catch` where possible
- Avoid using the `any` type
- Use Bun APIs when possible, like `Bun.file()`
- Rely on type inference when possible; avoid explicit type annotations or interfaces unless necessary for exports or clarity
- Prefer functional array methods (flatMap, filter, map) over for loops; use type guards on filter to maintain type inference downstream
- In `src/config`, follow the existing self-export pattern at the top of the file (for example `export * as ConfigAgent from "./agent"`) when adding a new config module.

Reduce total variable count by inlining when a value is only used once.

```ts
// Good
const journal = await Bun.file(path.join(dir, "journal.json")).json()

// Bad
const journalPath = path.join(dir, "journal.json")
const journal = await Bun.file(journalPath).json()
```

### Destructuring

Avoid unnecessary destructuring. Use dot notation to preserve context.

```ts
// Good
obj.a
obj.b

// Bad
const { a, b } = obj
```

### Variables

Prefer `const` over `let`. Use ternaries or early returns instead of reassignment.

```ts
// Good
const foo = condition ? 1 : 2

// Bad
let foo
if (condition) foo = 1
else foo = 2
```

### Control Flow

Avoid `else` statements. Prefer early returns.

```ts
// Good
function foo() {
  if (condition) return 1
  return 2
}

// Bad
function foo() {
  if (condition) return 1
  else return 2
}
```

### Schema Definitions (Drizzle)

Use snake_case for field names so column names don't need to be redefined as strings.

```ts
// Good
const table = sqliteTable("session", {
  id: text().primaryKey(),
  project_id: text().notNull(),
  created_at: integer().notNull(),
})

// Bad
const table = sqliteTable("session", {
  id: text("id").primaryKey(),
  projectID: text("project_id").notNull(),
  createdAt: integer("created_at").notNull(),
})
```

## Testing

- Avoid mocks as much as possible
- Test actual implementation, do not duplicate logic into tests
- Tests cannot run from repo root (guard: `do-not-run-tests-from-root`); run from package dirs like `packages/opencode`.

## Type Checking

- Always run `bun typecheck` from package directories (e.g., `packages/opencode`), never `tsc` directly.

## iTerm2 Terminal Management

The user runs in iTerm2 on macOS. When you need to open a long-running process (dev server, backend, etc.) in a separate terminal, use AppleScript to create a **background tab** so focus stays on the current tab.

### Background Tab Pattern

```bash
osascript -e '
tell application "iTerm2"
  tell current window
    set origTab to current tab
    set newTab to (create tab with default profile)
    tell current session of newTab
      write text "cd /path/to/project && YOUR_COMMAND"
    end tell
    select origTab
  end tell
end tell
'
```

Key points:
- Always save `current tab` as `origTab` *before* creating the new tab
- Always `select origTab` after writing the command to return focus to the user's tab
- The new tab runs in the background — the user can check on it anytime
- Use `write text` to send the command (include `cd` if needed)
- For env vars, inline them in the command: `write text "export VAR=val && command"`
