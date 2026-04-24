---
title: Loaders
source: https://bun.sh/docs/bundler/loaders
description: Built-in loaders for the Bun bundler and runtime
---

# Loaders

> Built-in loaders for the Bun bundler and runtime

Bun implements a set of default loaders for various file types.

## Supported file types

`.js` `.cjs` `.mjs` `.mts` `.cts` `.ts` `.tsx` `.jsx` `.css` `.json` `.jsonc` `.toml` `.yaml` `.yml` `.txt` `.wasm` `.node` `.html` `.sh`

## Loader types

| Loader | Extensions | Description |
|--------|------------|-------------|
| `js` | `.cjs`, `.mjs` | JavaScript |
| `jsx` | `.js`, `.jsx` | JavaScript + JSX |
| `ts` | `.ts`, `.mts`, `.cts` | TypeScript |
| `tsx` | `.tsx` | TypeScript + JSX |
| `json` | `.json` | JSON |
| `jsonc` | `.jsonc` | JSON with comments |
| `toml` | `.toml` | TOML |
| `yaml` | `.yaml`, `.yml` | YAML |
| `text` | `.txt` | Plain text |
| `css` | `.css` | CSS |
| `html` | `.html` | HTML |
| `napi` | `.node` | Native addon |
| `sqlite` | `.sqlite` | SQLite database |
| `sh` | `.sh` | Bun Shell script |
| `file` | * | Fallback for unknown types |

## Custom loader via import attribute

```ts
import myData from "./data" with { type: "toml" };
import db from "./my.db" with { type: "sqlite" };
```
