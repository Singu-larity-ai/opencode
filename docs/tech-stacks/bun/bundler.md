---
title: Bun Bundler
source: https://bun.com/docs/bundler/
description: Bun's fast native bundler for JavaScript, TypeScript, JSX, and more.
---

# Bundler

> Bun's fast native bundler for JavaScript, TypeScript, JSX, and more

Bun's fast native bundler can be used via the `bun build` CLI command or the `Bun.build()` JavaScript API.

### At a Glance

* JS API: `await Bun.build({ entrypoints, outdir })`
* CLI: `bun build <entry> --outdir ./out`
* Watch: `--watch` for incremental rebuilds
* Targets: `--target browser|bun|node`
* Formats: `--format esm|cjs|iife` (experimental for cjs/iife)

## Why bundle?

* **Reducing HTTP requests** - Bundlers convert our application source code into a smaller number of self-contained "bundles" that can be loaded with a single request.
* **Code transforms** - Modern apps are built with TypeScript, JSX, and CSS modules that must be converted into plain JavaScript and CSS.
* **Framework features** - Frameworks rely on bundler plugins & code transformations for file-system routing, client-server code co-location, and server components.
* **Full-stack Applications** - Bun's bundler can handle both server and client code in a single command.

## Basic example

```ts
await Bun.build({
  entrypoints: ['./index.tsx'],
  outdir: './build',
});
```

## Watch mode

```bash
bun build ./index.tsx --outdir ./out --watch
```

## Content types

The bundler supports:

| Extensions | Details |
| --------- | ------- |
| `.js` `.jsx` `.cjs` `.mjs` `.mts` `.cts` `.ts` `.tsx` | TypeScript & JSX to vanilla JavaScript |
| `.json` | JSON files parsed and inlined |
| `.jsonc` | JSON with comments |
| `.toml` | TOML files parsed and inlined |
| `.yaml` `.yml` | YAML files parsed and inlined |
| `.txt` | Text files inlined as strings |
| `.html` | HTML files processed with asset bundling |
| `.css` | CSS files bundled together |
| `.node` `.wasm` | Treated as assets |

## API

### entrypoints

An array of paths corresponding to the entrypoints of our application.

```ts
const result = await Bun.build({
  entrypoints: ["./index.ts"],
});
```

### files

A map of file paths to their contents for in-memory bundling.

```ts
const result = await Bun.build({
  entrypoints: ["/app/index.ts"],
  files: {
    "/app/index.ts": `import { greet } from "./greet.ts";`,
    "/app/greet.ts": `export function greet(name: string) { return "Hello, " + name + "!"; }`,
  },
});
```

### outdir

The directory where output files will be written.

```ts
await Bun.build({
  entrypoints: ['./index.ts'],
  outdir: './out'
});
```

### target

The intended execution environment for the bundle.

- `browser` - For generating bundles for browser execution
- `bun` - For Bun runtime (with `// @bun` pragma)
- `node` - For Node.js (outputs `.mjs`)

### format

Specifies the module format:

- `esm` - ES Module (default)
- `cjs` - CommonJS
- `iife` - IIFE

### splitting

Whether to enable code splitting.

```ts
await Bun.build({
  entrypoints: ['./entry-a.ts', './entry-b.ts'],
  outdir: './out',
  splitting: true,
});
```

### plugins

A list of plugins to use during bundling.

```ts
await Bun.build({
  entrypoints: ["./index.tsx"],
  outdir: "./out",
  plugins: [/* ... */],
});
```

### env

Controls how environment variables are handled:

- `env: "inline"` - Inlines `process.env.FOO` as string literals
- `env: "PUBLIC_*"` - Inlines env vars matching the prefix
- `env: "disable"` - Disables environment variable injection

### sourcemap

- `"none"` - No sourcemap (default)
- `"linked"` - Separate `*.js.map` file with comment
- `"external"` - Separate sourcemap without comment
- `"inline"` - Appended as base64 payload

### minify

Enable minification:

```ts
await Bun.build({
  entrypoints: ['./index.tsx'],
  outdir: './out',
  minify: true,
});
```

### external

A list of import paths to consider external.

```ts
await Bun.build({
  entrypoints: ['./index.tsx'],
  outdir: './out',
  external: ["lodash", "react"],
});
```

### packages

Control whether package dependencies are included:

- `bundle` - Include dependencies (default)
- `external` - Leave as imports

### naming

Customize generated file names:

```ts
await Bun.build({
  naming: 'files/[dir]/[name]-[hash].[ext]',
});
```

Tokens: `[name]`, `[ext]`, `[hash]`, `[dir]`

### root

The root directory of the project.

### publicPath

A prefix for import paths in bundled code.

```ts
await Bun.build({
  publicPath: 'https://cdn.example.com/',
});
```

### define

Global identifier replacements at build time.

```ts
await Bun.build({
  define: {
    STRING: JSON.stringify("value"),
    "nested.boolean": "true",
  },
});
```

### loader

Map file extensions to loader names.

```ts
await Bun.build({
  loader: { '.svg': 'file', '.png': 'file' },
});
```
