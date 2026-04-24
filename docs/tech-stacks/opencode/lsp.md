---
title: LSP Servers
source: https://opencode.ai/docs/lsp
description: Configure Language Server Protocol servers for OpenCode
---

# LSP Servers

OpenCode integrates with your LSP servers.

## Built-in LSP Servers

Auto-enabled for projects with matching file extensions:

- **astro** - .astro files
- **bash** - .sh, .bash, .zsh
- **clangd** - C/C++ files
- **csharp** - .cs (.NET SDK)
- **dart** - .dart
- **deno** - .ts, .tsx, .js, .jsx
- **elixir-ls** - .ex, .exs
- **eslint** - TypeScript/JavaScript
- **gleam** - .gleam
- **gopls** - .go
- **hls** - Haskell
- **jdtls** - Java (JDK 21+)
- **kotlin-ls** - .kt, .kts
- **lua-ls** - .lua
- **ocaml-lsp** - .ml, .mli
- **php** - .php
- **prisma** - .prisma
- **pyright** - .py, .pyi
- **ruby-lsp** - .rb
- **rust** - .rs (rust-analyzer)
- **sourcekit-lsp** - Swift
- **svelte** - .svelte
- **typescript** - .ts, .tsx
- **vue** - .vue
- **yaml-ls** - .yaml, .yml
- **zls** - .zig

## Configure

```json
{
  "lsp": {
    "typescript": {
      "disabled": false,
      "initialization": {
        "preferences": {
          "importModuleSpecifierPreference": "relative"
        }
      }
    }
  }
}
```

## Disable

```json
{ "lsp": false }
```

Or disable specific:
```json
{
  "lsp": {
    "typescript": { "disabled": true }
  }
}
```

## Custom LSP

```json
{
  "lsp": {
    "custom-lsp": {
      "command": ["custom-lsp-server", "--stdio"],
      "extensions": [".custom"]
    }
  }
}
```
