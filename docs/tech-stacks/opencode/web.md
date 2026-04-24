---
title: Web
source: https://opencode.ai/docs/web
description: Using OpenCode in your browser
---

# Web

Using OpenCode in your browser.

## Start

```bash
opencode web
```

Opens browser at `http://localhost:<port>`

## Configuration

### Port

```bash
opencode web --port 4096
```

### Hostname

```bash
opencode web --hostname 0.0.0.0
```

### mDNS Discovery

```bash
opencode web --mdns
```

### CORS

```bash
opencode web --cors https://example.com
```

### Authentication

```bash
OPENCODE_SERVER_PASSWORD=secret opencode web
```

## Config File

```json
{
  "server": {
    "port": 4096,
    "hostname": "0.0.0.0",
    "mdns": true,
    "cors": ["https://example.com"]
  }
}
```

## Attach Terminal

```bash
opencode web --port 4096
# In another terminal
opencode attach http://localhost:4096
```
