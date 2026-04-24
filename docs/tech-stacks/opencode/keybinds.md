---
title: Keybinds
source: https://opencode.ai/docs/keybinds
description: Customize keyboard shortcuts in OpenCode
---

# Keybinds

Customize keyboard shortcuts in `tui.json`.

## Leader Key

OpenCode uses a `leader` key (default: `ctrl+x`) for most keybinds.

To execute an action: press leader, then the shortcut (e.g., `ctrl+x` then `n` for new session).

## Configure

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "keybinds": {
    "leader": "ctrl+x",
    "app_exit": "ctrl+c,ctrl+d,<leader>q",
    "editor_open": "<leader>e",
    "theme_list": "<leader>t",
    "session_new": "<leader>n",
    "session_list": "<leader>l",
    "session_compact": "<leader>c",
    "model_list": "<leader>m",
    "variant_cycle": "ctrl+t",
    "command_list": "ctrl+p",
    "agent_list": "<leader>a",
    "agent_cycle": "tab"
  }
}
```

## Keybind List

| Action | Default |
|--------|---------|
| Leader key | `ctrl+x` |
| New session | `<leader>n` |
| List sessions | `<leader>l` |
| Compact session | `<leader>c` |
| Theme list | `<leader>t` |
| Model list | `<leader>m` |
| Command palette | `ctrl+p` |
| Switch agent | `tab` |
| Variant cycle | `ctrl+t` |
| Exit | `ctrl+c,ctrl+d,<leader>q` |

## Navigation

| Action | Default |
|--------|---------|
| Session child first | `<leader>down` |
| Session child cycle | `right` |
| Session child cycle reverse | `left` |
| Session parent | `up` |

## Input Editing

| Action | Default |
|--------|---------|
| Move left/right | `left/right, ctrl+b/f` |
| Move word | `alt+b/f` |
| Delete char | `ctrl+d` |
| Kill to end | `ctrl+k` |
| Kill to start | `ctrl+u` |
| Kill word | `ctrl+w, alt+d` |

## Disable Keybind

```json
{
  "keybinds": {
    "session_compact": "none"
  }
}
```

## Desktop Prompt Shortcuts

| Shortcut | Action |
|----------|--------|
| `ctrl+a` | Move to start |
| `ctrl+e` | Move to end |
| `ctrl+b/f` | Move back/forward |
| `alt+b/f` | Move word back/forward |
| `ctrl+d` | Delete character |
| `ctrl+k` | Kill to end |
| `ctrl+u` | Kill to start |

## Shift+Enter (Windows Terminal)

Add to `settings.json`:

```json
"actions": [
  {
    "command": { "action": "sendInput", "input": "\u001b[13;2u" },
    "id": "User.sendInput.ShiftEnterCustom"
  }
]
```
