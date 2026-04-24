---
title: MCP Servers
source: https://opencode.ai/docs/mcp-servers
description: Add local and remote MCP tools to OpenCode
---

# MCP Servers

Add external tools using Model Context Protocol.

OpenCode supports both local and remote MCP servers.

## Configure

```json
{
  "mcp": {
    "server-name": {
      "type": "local",
      "command": ["npx", "-y", "my-mcp-command"],
      "enabled": true
    }
  }
}
```

## Local MCP

```json
{
  "mcp": {
    "my-local-mcp": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-everything"],
      "environment": { "MY_ENV_VAR": "value" }
    }
  }
}
```

## Remote MCP

```json
{
  "mcp": {
    "my-remote": {
      "type": "remote",
      "url": "https://my-mcp-server.com",
      "headers": { "Authorization": "Bearer MY_KEY" }
    }
  }
}
```

## OAuth

OpenCode auto-handles OAuth for remote servers.

```json
{
  "mcp": {
    "oauth-server": {
      "type": "remote",
      "url": "https://mcp.example.com",
      "oauth": {
        "clientId": "{env:MY_CLIENT_ID}",
        "clientSecret": "{env:MY_SECRET}",
        "scope": "tools:read"
      }
    }
  }
}
```

### Manage OAuth

```bash
opencode mcp auth <server-name>  # Authenticate
opencode mcp list                # List servers
opencode mcp logout <server>     # Remove credentials
opencode mcp debug <server>      # Debug issues
```

## Manage Tools

```json
{
  "tools": {
    "my-mcp-foo": false  # Disable globally
  }
}
```

Per-agent:

```json
{
  "tools": { "my-mcp*": false },
  "agent": {
    "my-agent": { "tools": { "my-mcp*": true } }
  }
}
```

## Examples

### Sentry

```json
{
  "mcp": {
    "sentry": {
      "type": "remote",
      "url": "https://mcp.sentry.dev/mcp",
      "oauth": {}
    }
  }
}
```

### Context7 (docs search)

```json
{
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

### Grep by Vercel

```json
{
  "mcp": {
    "gh_grep": {
      "type": "remote",
      "url": "https://mcp.grep.app"
    }
  }
}
```
