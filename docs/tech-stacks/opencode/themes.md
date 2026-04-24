---
title: Themes
source: https://opencode.ai/docs/themes
description: Select a built-in theme or define your own for OpenCode
---

# Themes

Select a built-in theme or define your own.

## Terminal Requirements

Requires **truecolor** (24-bit color) support. Check with:

```bash
echo $COLORTERM  # should output "truecolor" or "24bit"
```

## Built-in Themes

| Theme | Description |
|-------|-------------|
| `system` | Adapts to terminal background |
| `tokyonight` | Based on Tokyo Night |
| `everforest` | Based on Everforest |
| `ayu` | Based on Ayu dark |
| `catppuccin` | Based on Catppuccin |
| `gruvbox` | Based on Gruvbox |
| `kanagawa` | Based on Kanagawa |
| `nord` | Based on Nord |
| `matrix` | Hacker-style green |
| `one-dark` | Based on Atom One Dark |

## System Theme

`system` theme automatically adapts to terminal colors:
- Generates gray scale from terminal background
- Uses ANSI colors for syntax
- Uses `none` for text/background to preserve terminal defaults

## Using a Theme

```bash
/theme  # Interactive select
```

Or in `tui.json`:

```json
{
  "theme": "tokyonight"
}
```

## Custom Themes

Place themes in:
- `~/.config/opencode/themes/` (user-wide)
- `.opencode/themes/` (project-specific)

### JSON Format

```json
{
  "$schema": "https://opencode.ai/theme.json",
  "defs": {
    "nord0": "#2E3440",
    "primary": "#88C0D0"
  },
  "theme": {
    "primary": { "dark": "nord8", "light": "nord10" },
    "text": { "dark": "nord4", "light": "nord0" },
    "background": { "dark": "nord0", "light": "nord6" }
  }
}
```

Color formats:
- Hex: `"#ffffff"`
- ANSI: `3` (0-255)
- References: `"primary"`
- Dark/light variants: `{"dark": "#000", "light": "#fff"}`
- None: `"none"` (terminal default)
