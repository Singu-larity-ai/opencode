---
title: Plugins
source: https://opencode.ai/docs/plugins
description: Write plugins to extend OpenCode functionality
---

# Plugins

Write plugins to extend OpenCode.

## Use a Plugin

### From Local Files

Place in:
- `.opencode/plugins/` (project)
- `~/.config/opencode/plugins/` (global)

### From npm

```json
{
  "plugin": ["opencode-helicone-session", "@my-org/custom-plugin"]
}
```

## Create a Plugin

Basic structure:

```javascript
export const MyPlugin = async ({ project, client, $, directory, worktree }) => {
  console.log("Plugin initialized!")

  return {
    // Hooks go here
  }
}
```

Context:
- `project` - Current project info
- `directory` - Working directory
- `worktree` - Git worktree path
- `client` - SDK client
- `$` - Bun shell API

## Hooks

### Command Events
- `command.executed`

### File Events
- `file.edited`
- `file.watcher.updated`

### Session Events
- `session.created`
- `session.compacted`
- `session.deleted`
- `session.diff`
- `session.idle`

### Tool Events
- `tool.execute.before`
- `tool.execute.after`

### Shell Events
- `shell.env`

## Examples

### Send Notifications

```javascript
export const NotificationPlugin = async ({ client }) => {
  return {
    event: async ({ event }) => {
      if (event.type === "session.idle") {
        await $`osascript -e 'display notification "Done!"'`
      }
    }
  }
}
```

### .env Protection

```javascript
export const EnvProtection = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool === "read" && output.args.filePath.includes(".env")) {
        throw new Error("Do not read .env files")
      }
    }
  }
}
```

### Custom Tools

```javascript
import { tool } from "@opencode-ai/plugin"

export const CustomToolsPlugin = async () => {
  return {
    tool: {
      mytool: tool({
        description: "Custom tool",
        args: { foo: tool.schema.string() },
        async execute(args, context) {
          return `Hello ${args.foo}`
        }
      })
    }
  }
}
```

### Compaction Hooks

```javascript
export const CompactionPlugin = async () => {
  return {
    "experimental.session.compacting": async (input, output) => {
      output.context.push(`## Custom Context`)
    }
  }
}
```
