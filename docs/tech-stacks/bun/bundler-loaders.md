---
title: Bun Bundler Loaders
source: https://bun.com/docs/bundler/loaders
description: Built-in loaders for the Bun bundler and runtime.
---

# Loaders

> Built-in loaders for the Bun bundler and runtime

The Bun bundler implements a set of default loaders out of the box.

**The bundler and the runtime both support the same set of file types out of the box.**

Supported extensions: `.js` `.cjs` `.mjs` `.mts` `.cts` `.ts` `.tsx` `.jsx` `.css` `.json` `.jsonc` `.toml` `.yaml` `.yml` `.txt` `.wasm` `.node` `.html` `.sh`

## Built-in loaders

### `js` - JavaScript loader

Default for `.cjs` and `.mjs`. Parses code and applies transforms like dead-code elimination and tree shaking.

### `jsx` - JavaScript + JSX loader

Default for `.js` and `.jsx`. Same as `js` but with JSX syntax support.

### `ts` - TypeScript loader

Default for `.ts`, `.mts`, and `.cts`. Strips TypeScript syntax.

### `tsx` - TypeScript + JSX loader

Default for `.tsx`. Transpiles both TypeScript and JSX.

### `json` - JSON loader

Default for `.json`. JSON files can be directly imported and are inlined during bundling.

```js
import pkg from "./package.json";
pkg.name; // => "my-package"
```

### `jsonc` - JSON with Comments loader

Default for `.jsonc`. Handles JSON with comments and trailing commas.

### `toml` - TOML loader

Default for `.toml`. Parses TOML files.

```js
import config from "./bunfig.toml";
config.logLevel; // => "debug"
```

### `yaml` - YAML loader

Default for `.yaml` and `.yml`. Parses YAML files.

```js
import config from "./config.yaml";
console.log(config);
```

### `text` - Text loader

Default for `.txt`. Inlines file contents as strings.

```js
import contents from "./file.txt";
console.log(contents); // => "Hello, world!"
```

### `napi` - Native addon loader

Default for `.node`. For runtime native addon imports.

### `sqlite` - SQLite loader

Requires `with { "type": "sqlite" }` import attribute.

```js
import db from "./my.db" with { type: "sqlite" };
```

### `html` - HTML loader

Default for `.html`. Processes HTML files and bundles referenced assets.

### `css` - CSS loader

Default for `.css`. Handles CSS imports and bundling.

### `sh` - Bun Shell loader

Default for `.sh` files. Parses Bun Shell scripts.

### `file` - File loader

Default for unrecognized file types. Resolves imports as path/URL to the file.

## Import attributes

Use `with { type: "toml" }` to explicitly specify loader:

```ts
import my_toml from "./my_file" with { type: "toml" };
```
