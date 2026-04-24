---
title: Custom Tools
source: https://opencode.ai/docs/custom-tools
description: Create custom tools for OpenCode
---

# Custom Tools

Create tools the LLM can call in OpenCode.

## Location

- Local: `.opencode/tools/` in project
- Global: `~/.config/opencode/tools/`

## Create a Tool

```typescript
import { tool } from "@opencode-ai/plugin"

export default tool({
  description: "Query the project database",
  args: {
    query: tool.schema.string().describe("SQL query to execute"),
  },
  async execute(args, context) {
    // Tool implementation
    return `Result: ${args.query}`
  },
})
```

## Arguments

Use Zod schema for argument validation:

```typescript
args: {
  query: tool.schema.string().describe("SQL query"),
  limit: tool.schema.number().optional(),
}
```

## Context

Tools receive session context:

```typescript
async execute(args, context) {
  const { agent, sessionID, directory, worktree } = context
  return `Session: ${sessionID}`
}
```

## Examples

### Multiple Tools

```typescript
export const add = tool({
  description: "Add two numbers",
  args: { a: tool.schema.number(), b: tool.schema.number() },
  async execute(args) { return args.a + args.b }
})
```

### Python Tool

```python
# .opencode/tools/add.py
import sys
a = int(sys.argv[1])
b = int(sys.argv[2])
print(a + b)
```

```typescript
export default tool({
  description: "Add numbers",
  args: { a: tool.schema.number(), b: tool.schema.number() },
  async execute(args) {
    const result = await Bun.$`python3 add.py ${args.a} ${args.b}`.text()
    return result
  }
})
```
