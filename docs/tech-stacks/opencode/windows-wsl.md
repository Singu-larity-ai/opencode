---
title: Windows (WSL)
source: https://opencode.ai/docs/windows-wsl
description: Run OpenCode on Windows using WSL
---

# Windows (WSL)

Run OpenCode on Windows using WSL for best experience.

## Setup

1. Install WSL: `wsl --install`
2. Install OpenCode in WSL:
```bash
curl -fsSL https://opencode.ai/install | bash
```
3. Navigate to project and run `opencode`

## Desktop App + WSL Server

1. Start server in WSL:
```bash
opencode serve --hostname 0.0.0.0 --port 4096
```
2. Connect Desktop app to `http://localhost:4096`

Set password:
```bash
OPENCODE_SERVER_PASSWORD=secret opencode serve --hostname 0.0.0.0
```

## Web Client + WSL

```bash
opencode web --hostname 0.0.0.0
```

Access from Windows browser at `http://localhost:<port>`

## Access Windows Files

From WSL:
- `C:` drive at `/mnt/c/`
- `D:` drive at `/mnt/d/`

```bash
cd /mnt/c/Users/YourName/project
```

## Tips

- Clone repos into WSL filesystem (`~/code/`) for best performance
- Use VS Code with WSL extension
- Config stored in `~/.local/share/opencode/`
