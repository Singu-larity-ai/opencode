---
title: Config
source: https://opencode.ai/docs/config
description: OpenCode JSON config file configuration
---

# Config

Using the OpenCode JSON config.

## Format

Supports JSON and JSONC (JSON with Comments):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "autoupdate": true,
  "server": { "port": 4096 }
}
```

## Locations (Precedence Order)

1. **Remote config** (`.well-known/opencode`) - organizational defaults
2. **Global config** (`~/.config/opencode/opencode.json`)
3. **Custom config** (`OPENCODE_CONFIG` env var)
4. **Project config** (`opencode.json` in project)
5. **`.opencode` directories** - agents, commands, plugins
6. **Inline config** (`OPENCODE_CONFIG_CONTENT` env var)
7. **Managed config** (macOS: `/Library/Application Support/opencode/`)
8. **macOS MDM** - highest priority, not user-overridable

Config files are **merged**, not replaced.

## Schema Options

### TUI

Use `tui.json` for TUI-specific settings:

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "scroll_speed": 3,
  "diff_style": "auto",
  "mouse": true
}
```

### Server

```json
{
  "server": {
    "port": 4096,
    "hostname": "0.0.0.0",
    "mdns": true,
    "mdnsDomain": "myproject.local",
    "cors": ["http://localhost:5173"]
  }
}
```

### Tools

```json
{
  "tools": {
    "write": false,
    "bash": false
  }
}
```

### Models

```json
{
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5"
}
```

Provider options:
```json
{
  "provider": {
    "anthropic": {
      "options": {
        "timeout": 600000,
        "chunkTimeout": 30000,
        "setCacheKey": true
      }
    }
  }
}
```

### Agents

```json
{
  "agent": {
    "code-reviewer": {
      "description": "Reviews code for best practices",
      "model": "anthropic/claude-sonnet-4-5",
      "prompt": "You are a code reviewer...",
      "tools": { "write": false, "edit": false }
    }
  }
}
```

### Default Agent

```json
{
  "default_agent": "plan"
}
```

### Sharing

```json
{
  "share": "manual"  // "manual", "auto", or "disabled"
}
```

### Commands

```json
{
  "command": {
    "test": {
      "template": "Run the full test suite...",
      "description": "Run tests with coverage",
      "agent": "build",
      "model": "anthropic/claude-haiku-4-5"
    }
  }
}
```

### Snapshot

```json
{
  "snapshot": false  // Disable for large repos
}
```

### Autoupdate

```json
{
  "autoupdate": false  // Or "notify"
}
```

### Formatters

```json
{
  "formatter": {
    "prettier": { "disabled": true }
  }
}
```

### Permissions

```json
{
  "permission": {
    "edit": "ask",
    "bash": "ask"
  }
}
```

### Compaction

```json
{
  "compaction": {
    "auto": true,
    "prune": true,
    "reserved": 10000
  }
}
```

### Watcher

```json
{
  "watcher": {
    "ignore": ["node_modules/**", "dist/**"]
  }
}
```

### MCP Servers

```json
{
  "mcp": {}
}
```

### Plugins

```json
{
  "plugin": ["opencode-helicone-session", "@my-org/custom-plugin"]
}
```

### Instructions

```json
{
  "instructions": ["CONTRIBUTING.md", "docs/guidelines.md"]
}
```

### Disabled/Enabled Providers

```json
{
  "disabled_providers": ["openai", "gemini"],
  "enabled_providers": ["anthropic", "openai"]
}
```

## Variables

### Env vars

```json
{
  "model": "{env:OPENCODE_MODEL}",
  "apiKey": "{env:ANTHROPIC_API_KEY}"
}
```

### Files

```json
{
  "instructions": ["./custom-instructions.md"],
  "apiKey": "{file:~/.secrets/openai-key}"
}
```
