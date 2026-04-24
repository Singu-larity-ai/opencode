---
title: Bun Bundler - Single-file Executables
source: https://bun.com/docs/bundler/executables
description: Generate standalone executables from TypeScript or JavaScript files with Bun.
---

# Single-file executable

> Generate standalone executables from TypeScript or JavaScript files with Bun

Bun's bundler implements a `--compile` flag for generating a standalone binary.

## Basic usage

```bash
bun build ./cli.ts --compile --outfile mycli
```

```ts
console.log("Hello world!");
```

This bundles into an executable:

```bash
./mycli
# Hello world!
```

## Cross-compile to other platforms

Build for Linux x64:

```bash
bun build --compile --target=bun-linux-x64 ./index.ts --outfile myapp
```

Build for Linux ARM64:

```bash
bun build --compile --target=bun-linux-arm64 ./index.ts --outfile myapp
```

Build for Windows x64:

```bash
bun build --compile --target=bun-windows-x64 ./path/to/my/app.ts --outfile myapp
```

Build for macOS ARM64:

```bash
bun build --compile --target=bun-darwin-arm64 ./path/to/my/app.ts --outfile myapp
```

Build for macOS x64:

```bash
bun build --compile --target=bun-darwin-x64 ./path/to/my/app.ts --outfile myapp
```

## Supported targets

| Target | OS | Architecture |
| ------ | --- | --- |
| bun-linux-x64 | Linux | x64 |
| bun-linux-arm64 | Linux | arm64 |
| bun-windows-x64 | Windows | x64 |
| bun-windows-arm64 | Windows | arm64 |
| bun-darwin-x64 | macOS | x64 |
| bun-darwin-arm64 | macOS | arm64 |

Use `-baseline` suffix for older CPUs (pre-2013) without AVX2.

## Build-time constants

```bash
bun build --compile --define BUILD_VERSION='"1.2.3"' ./src/cli.ts --outfile mycli
```

## Deploying to production

```bash
bun build --compile --minify --sourcemap ./path/to/my/app.ts --outfile myapp
```

### Bytecode compilation

```bash
bun build --compile --minify --sourcemap --bytecode ./path/to/my/app.ts --outfile myapp
```

Bytecode compilation moves parsing overhead from runtime to bundle time.

## Embedding runtime arguments

```bash
bun build --compile --compile-exec-argv="--smol --user-agent=MyBot" ./app.ts --outfile myapp
```

## Embed assets & files

Use `with { type: "file" }` to embed files:

```ts
import icon from "./icon.png" with { type: "file" };
console.log(icon);
// During development: "./icon.png"
// After compilation: "$bunfs/icon-a1b2c3d4.png"
```

### Reading embedded files

```ts
import icon from "./icon.png" with { type: "file" };
import { file } from "bun";

const bytes = await file(icon).arrayBuffer();
const text = await file(icon).text();
```

## SQLite databases

```ts
import myEmbeddedDb from "./my.db" with { type: "sqlite", embed: "true" };
```

## Minification

```bash
bun build --compile --minify ./index.ts --outfile myapp
```

## Windows-specific flags

```bash
# Custom icon
bun build --compile --windows-icon=path/to/icon.ico ./app.ts --outfile myapp

# Hide console window
bun build --compile --windows-hide-console ./app.ts --outfile myapp
```

## Code signing on macOS

```bash
codesign --deep --force -vvvv --sign "XXXXXXXXXX" ./myapp
```

## Full-stack executables

Import HTML files to bundle frontend assets:

```ts
import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    "/": index,
    "/api/hello": { GET: () => Response.json({ message: "Hello" }) },
  },
});
```

## Workers

Add worker entrypoints to the build:

```bash
bun build --compile ./index.ts ./my-worker.ts --outfile myapp
```
