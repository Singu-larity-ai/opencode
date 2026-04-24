---
title: SDK
source: https://opencode.ai/docs/sdk
description: Type-safe JS client for OpenCode server
---

# SDK

Type-safe JS/TS SDK for OpenCode server.

## Install

```bash
npm install @opencode-ai/sdk
```

## Create Client

```javascript
import { createOpencode } from "@opencode-ai/sdk"

const { client } = await createOpencode()
```

Options:
- `hostname` - Server hostname (default: `127.0.0.1`)
- `port` - Server port (default: `4096`)
- `config` - Configuration object

## Client Only

Connect to existing server:
```javascript
import { createOpencodeClient } from "@opencode-ai/sdk"

const client = createOpencodeClient({
  baseUrl: "http://localhost:4096"
})
```

## APIs

### Sessions

```javascript
client.session.list()
client.session.get({ path: { id } })
client.session.create({ body: { title } })
client.session.prompt({ path: { id }, body: { parts, format } })
client.session.delete({ path: { id } })
```

### Structured Output

```javascript
const result = await client.session.prompt({
  path: { id: sessionId },
  body: {
    parts: [{ type: "text", text: "Research..." }],
    format: {
      type: "json_schema",
      schema: {
        type: "object",
        properties: {
          company: { type: "string" },
          founded: { type: "number" }
        },
        required: ["company"]
      }
    }
  }
})
```

### Files

```javascript
client.find.text({ query: { pattern: "function" } })
client.find.files({ query: { query: "*.ts" } })
client.file.read({ query: { path: "src/index.ts" } })
```

### TUI

```javascript
client.tui.appendPrompt({ body: { text } })
client.tui.submitPrompt()
client.tui.showToast({ body: { message, variant } })
```

### Auth

```javascript
client.auth.set({
  path: { id: "anthropic" },
  body: { type: "api", key: "your-api-key" }
})
```

### Events

```javascript
const events = await client.event.subscribe()
for await (const event of events.stream) {
  console.log(event.type, event.properties)
}
```

## Types

```javascript
import type { Session, Message, Part } from "@opencode-ai/sdk"
```
