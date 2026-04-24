---
title: Share
source: https://opencode.ai/docs/share
description: Share your OpenCode conversations with public links
---

# Share

Share your OpenCode conversations via public links.

## How It Works

1. Creates unique public URL for session
2. Syncs conversation to servers
3. Accessible via `opncd.ai/s/<share-id>`

## Sharing Modes

### Manual (Default)

```bash
/share
```

Config:
```json
{ "share": "manual" }
```

### Auto-share

All new conversations auto-shared:
```json
{ "share": "auto" }
```

### Disabled

```json
{ "share": "disabled" }
```

## Un-sharing

```bash
/unshare
```

Removes public access and deletes data.

## Privacy

- Shared conversations publicly accessible
- Review content before sharing
- Unshare when collaboration complete
- Avoid sharing sensitive/proprietary code

## Enterprise

- Can be disabled entirely
- Restricted to SSO users only
- Self-hosted option available
