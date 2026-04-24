---
title: CLI
source: https://opencode.ai/docs/cli
description: OpenCode CLI options and commands
---

# CLI

OpenCode CLI options and commands.

Default starts the TUI:

```bash
opencode
```

## Commands

### opencode tui

Start the TUI:

```bash
opencode [project]
```

Flags: `--continue`, `--session`, `--fork`, `--prompt`, `--model`, `--agent`, `--port`, `--hostname`

### opencode agent

Manage agents:

```bash
opencode agent [command]
```

- `create` - Create new agent with custom configuration
- `list` - List all available agents

### opencode attach

Attach terminal to running OpenCode backend:

```bash
opencode attach [url]
```

### opencode auth

Manage credentials:

```bash
opencode auth [command]
```

- `login` - Configure API keys for providers
- `list` / `ls` - List authenticated providers
- `logout` - Clear provider credentials

### opencode github

Manage GitHub agent:

```bash
opencode github [command]
```

- `install` - Install GitHub agent in repository
- `run` - Run the GitHub agent (for GitHub Actions)

### opencode mcp

Manage MCP servers:

```bash
opencode mcp [command]
```

- `add` - Add MCP server
- `list` / `ls` - List configured servers
- `auth` - Authenticate with OAuth server
- `logout` - Remove OAuth credentials
- `debug` - Debug OAuth issues

### opencode models

List available models:

```bash
opencode models [provider]
```

Flags: `--refresh`, `--verbose`

### opencode run

Run in non-interactive mode:

```bash
opencode run [message..]
```

Flags: `--continue`, `--session`, `--fork`, `--share`, `--model`, `--agent`, `--file`, `--format`, `--title`, `--attach`, `--port`, `--dangerously-skip-permissions`

### opencode serve

Start headless server:

```bash
opencode serve
```

Flags: `--port`, `--hostname`, `--mdns`, `--cors`

### opencode session

Manage sessions:

```bash
opencode session [command]
```

- `list` - List sessions (flags: `--max-count`, `--format`)

### opencode stats

Show token usage and cost:

```bash
opencode stats
```

Flags: `--days`, `--tools`, `--models`, `--project`

### opencode web

Start server with web interface:

```bash
opencode web
```

Flags: `--port`, `--hostname`, `--mdns`, `--cors`

### opencode acp

Start ACP server:

```bash
opencode acp
```

Flags: `--cwd`, `--port`, `--hostname`

### opencode upgrade

Update OpenCode:

```bash
opencode upgrade [target]
```

### opencode uninstall

Uninstall OpenCode:

```bash
opencode uninstall
```

Flags: `--keep-config`, `--keep-data`, `--dry-run`, `--force`

## Global Flags

- `--help` / `-h` - Display help
- `--version` / `-v` - Print version
- `--print-logs` - Print logs to stderr
- `--log-level` - DEBUG, INFO, WARN, ERROR

## Environment Variables

- `OPENCODE_AUTO_SHARE` - Auto share sessions
- `OPENCODE_CONFIG` - Config file path
- `OPENCODE_TUI_CONFIG` - TUI config path
- `OPENCODE_CONFIG_DIR` - Config directory
- `OPENCODE_CONFIG_CONTENT` - Inline JSON config
- `OPENCODE_DISABLE_AUTOUPDATE` - Disable auto update
- `OPENCODE_PERMISSION` - Inline permissions config
- `OPENCODE_SERVER_PASSWORD` - Basic auth password
- And many more experimental options...
