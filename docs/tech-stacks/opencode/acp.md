---
title: ACP Support
source: https://opencode.ai/docs/acp
description: Use OpenCode in ACP-compatible editors
---

# ACP Support

Use OpenCode in any ACP-compatible editor.

OpenCode supports Agent Client Protocol (ACP) for use in compatible editors.

## Configure

### Zed

```json
{
  "agent_servers": {
    "OpenCode": {
      "command": "opencode",
      "args": ["acp"]
    }
  }
}
```

### JetBrains IDEs

Add to `acp.json`:

```json
{
  "agent_servers": {
    "OpenCode": {
      "command": "/path/bin/opencode",
      "args": ["acp"]
    }
  }
}
```

### Avante.nvim

```lua
{
  acp_providers = {
    ["opencode"] = {
      command = "opencode",
      args = { "acp" }
    }
  }
}
```

### CodeCompanion.nvim

```lua
require("codecompanion").setup({
  interactions = {
    chat = {
      adapter = {
        name = "opencode",
        model = "claude-sonnet-4",
      },
    },
  },
})
```

## Support

All features work via ACP:
- Built-in tools
- Custom tools and slash commands
- MCP servers
- AGENTS.md rules
- Agents and permissions
