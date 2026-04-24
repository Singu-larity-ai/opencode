---
title: TUI
source: https://opencode.ai/docs/tui
description: Using the OpenCode terminal user interface
---

# TUI

Using the OpenCode terminal user interface.

OpenCode provides an interactive terminal interface (TUI) for working on your projects with an LLM.

```bash
opencode
# Or for specific directory
opencode /path/to/project
```

## File references

Reference files using `@` - does fuzzy file search:

```
How is auth handled in @packages/functions/src/api/index.ts?
```

## Bash commands

Start with `!` to run shell commands:

```
!ls -la
```

## Commands

Type `/` followed by command name:

- `/connect` - Add a provider
- `/compact` - Compact session (ctrl+x c)
- `/details` - Toggle tool execution details
- `/editor` - Open external editor (ctrl+x e)
- `/exit` - Exit OpenCode (ctrl+x q)
- `/export` - Export to Markdown (ctrl+x x)
- `/help` - Show help dialog (ctrl+x h)
- `/init` - Guided setup for AGENTS.md (ctrl+x i)
- `/models` - List available models (ctrl+x m)
- `/new` - Start new session (ctrl+x n)
- `/redo` - Redo previously undone (ctrl+x r)
- `/sessions` - List/switch sessions (ctrl+x l)
- `/share` - Share current session (ctrl+x s)
- `/themes` - List themes (ctrl+x t)
- `/thinking` - Toggle thinking visibility
- `/undo` - Undo last message (ctrl+x u)
- `/unshare` - Unshare session

## Editor setup

Set `EDITOR` environment variable:

```bash
export EDITOR=code --wait  # VS Code
export EDITOR=vim           # Vim
export EDITOR=nano          # Nano
```

## Configure (tui.json)

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "opencode",
  "keybinds": { "leader": "ctrl+x" },
  "scroll_speed": 3,
  "diff_style": "auto",
  "mouse": true
}
```

Options:
- `theme` - UI theme
- `keybinds` - Custom keyboard shortcuts
- `scroll_speed` - Scroll speed (min: 0.001)
- `scroll_acceleration.enabled` - macOS-style scroll acceleration
- `diff_style` - "auto" or "stacked"
- `mouse` - Enable/disable mouse capture
