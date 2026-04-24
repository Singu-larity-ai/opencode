---
title: Permissions
source: https://opencode.ai/docs/permissions
description: Control which actions require approval to run in OpenCode
---

# Permissions

Control which actions require approval to run.

OpenCode uses `permission` config to decide whether an action should run automatically, prompt, or be blocked.

## Actions

Each permission resolves to:
- `"allow"` — run without approval
- `"ask"` — prompt for approval
- `"deny"` — block the action

## Configuration

```json
{
  "permission": {
    "*": "ask",
    "bash": "allow",
    "edit": "deny"
  }
}
```

## Granular Rules (Object Syntax)

```json
{
  "permission": {
    "bash": {
      "*": "ask",
      "git *": "allow",
      "npm *": "allow",
      "rm *": "deny"
    },
    "edit": {
      "*": "deny",
      "packages/web/src/**/*.mdx": "allow"
    }
  }
}
```

Rules are evaluated with **last matching rule winning**.

### Wildcards
- `*` matches zero or more characters
- `?` matches exactly one character

### Home Directory Expansion
- `~/projects/*` -> `/Users/username/projects/*`
- `$HOME/projects/*` -> same

### External Directories

```json
{
  "permission": {
    "external_directory": {
      "~/projects/personal/**": "allow"
    }
  }
}
```

## Available Permissions

- `read` — reading a file
- `edit` — all file modifications
- `glob` — file globbing
- `grep` — content search
- `bash` — running shell commands
- `task` — launching subagents
- `skill` — loading a skill
- `lsp` — running LSP queries
- `question` — asking user questions
- `webfetch` — fetching a URL
- `websearch` — web search
- `external_directory` — paths outside project
- `doom_loop` — same tool call repeats 3 times

## Defaults

- Most permissions default to `"allow"`
- `doom_loop` and `external_directory` default to `"ask"`
- `.env` files are denied by default

```json
{
  "permission": {
    "read": {
      "*": "allow",
      "*.env": "deny",
      "*.env.*": "deny"
    }
  }
}
```

## What "Ask" Does

When prompting, UI offers:
- `once` — approve just this request
- `always` — approve matching patterns for session
- `reject` — deny the request

## Agents

Override permissions per agent:

```json
{
  "agent": {
    "build": {
      "permission": {
        "bash": {
          "*": "ask",
          "git *": "allow"
        }
      }
    }
  }
}
```
