---
title: Tools
source: https://opencode.ai/docs/tools
description: Manage the tools an LLM can use in OpenCode
---

# Tools

Manage the tools an LLM can use.

Tools allow the LLM to perform actions in your codebase.

## Configure Permissions

```json
{
  "permission": {
    "edit": "deny",
    "bash": "ask",
    "webfetch": "allow"
  }
}
```

Permissions: `allow`, `deny`, `ask`

## Built-in Tools

### bash
Execute shell commands. Allows running terminal commands like `npm install`, `git status`.

### edit
Modify existing files using exact string replacements.

### write
Create new files or overwrite existing ones (controlled by `edit` permission).

### read
Read file contents from codebase.

### grep
Search file contents using regular expressions.

### glob
Find files by pattern matching (e.g., `**/*.js`).

### lsp (experimental)
Interact with LSP servers for code intelligence. Requires `OPENCODE_EXPERIMENTAL_LSP_TOOL=true`.

### apply_patch
Apply patches to files (controlled by `edit` permission).

### skill
Load a skill file and return its content.

### todowrite
Manage todo lists during coding sessions.

### webfetch
Fetch web content from URLs.

### websearch
Search the web for information (requires `OPENCODE_ENABLE_EXA=1`).

### question
Ask the user questions during execution.

## Custom Tools

Define custom functions the LLM can call in your config file.

## MCP Servers

Integrate external tools via Model Context Protocol servers.

## Ignore Patterns

Files in `.gitignore` are excluded. Use `.ignore` to override.
