---
title: Commands
source: https://opencode.ai/docs/commands
description: Create custom commands for repetitive tasks in OpenCode
---

# Commands

Create custom commands for repetitive tasks.

## Create Command Files

Create markdown files in `commands/` directory.

.opencode/commands/test.md

```yaml
---
description: Run tests with coverage
agent: build
model: anthropic/claude-3-5-sonnet-20241022
---
Run the full test suite with coverage report and show any failures.
```

Run with: `/test`

## Configure (JSON)

```json
{
  "command": {
    "test": {
      "template": "Run the full test suite...",
      "description": "Run tests with coverage",
      "agent": "build",
      "model": "anthropic/claude-3-5-sonnet-20241022"
    }
  }
}
```

## Configure (Markdown)

Place in:
- `~/.config/opencode/commands/` (global)
- `.opencode/commands/` (project)

## Prompt Config

### Arguments

```markdown
---
description: Create a component
---
Create a component named $ARGUMENTS
```

Run: `/component Button` -> $ARGUMENTS = "Button"

Positional: `$1`, `$2`, `$3` for individual args.

### Shell Output

Use `!`command`` to inject bash output:

```markdown
---
description: Analyze coverage
---
Test results: !`npm test`
```

### File References

Include files with `@`:

```markdown
Review @src/components/Button.tsx
```

## Options

- `template` — Prompt sent to LLM (required)
- `description` — Shown in TUI
- `agent` — Which agent to use
- `subtask` — Force subagent invocation
- `model` — Override default model

## Built-in

OpenCode has built-in commands: `/init`, `/undo`, `/redo`, `/share`, `/help`.

Note: Custom commands can override built-in commands.
