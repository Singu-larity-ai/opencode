---
title: Bun Bundler Plugins
source: https://bun.com/docs/bundler/plugins/
description: Universal plugin API for extending Bun's runtime and bundler.
---

# Plugins

> Universal plugin API for extending Bun's runtime and bundler

Bun provides a universal plugin API that can be used to extend both the runtime and bundler.

## Lifecycle hooks

Plugins can register callbacks at various points:

* `onStart()` - Run once the bundler has started a bundle
* `onResolve()` - Run before a module is resolved
* `onLoad()` - Run before a module is loaded
* `onBeforeParse()` - Run zero-copy native addons before parsing
* `onEnd()` - Run after the bundle is complete

## Usage

```ts
import type { BunPlugin } from "bun";

const myPlugin: BunPlugin = {
  name: "Custom loader",
  setup(build) {
    // implementation
  },
};
```

Pass plugins to `Bun.build`:

```ts
await Bun.build({
  entrypoints: ["./app.ts"],
  outdir: "./out",
  plugins: [myPlugin],
});
```

## onStart

Register a callback when the bundler starts:

```ts
build.onStart(() => {
  console.log("Bundle started!");
});
```

## onResolve

Configure how modules are resolved:

```ts
build.onResolve({ filter: /.*/ }, args => {
  if (args.path.startsWith("images/")) {
    return {
      path: args.path.replace("images/", "./public/images/"),
    };
  }
});
```

## onLoad

Modify module contents before loading:

```ts
build.onLoad({ filter: /env/ }, args => {
  return {
    contents: `export default ${JSON.stringify(process.env)}`,
    loader: "js",
  };
});
```

### .defer()

Delay execution until all modules are loaded:

```ts
build.onLoad({ filter: /stats\.json/ }, async ({ defer }) => {
  await defer();
  return {
    contents: `export default ${JSON.stringify(trackedImports)}`,
    loader: "json",
  };
});
```

## onBeforeParse

Native plugin hook called before parsing (runs on any thread).

## onEnd

Run after bundle is complete:

```ts
build.onEnd(result => {
  console.log(`Build completed with ${result.outputs.length} files`);
});
```

Callbacks can return Promises:

```ts
build.onEnd(async result => {
  if (!result.success) return;
  for (const output of result.outputs) {
    await uploadToS3(output);
  }
});
```

## Namespaces

Namespaces prefix imports in transpiled code:

* `"file"` - Default namespace
* `"bun"` - Bun-specific modules (e.g., `"bun:test"`, `"bun:sqlite"`)
* `"node"` - Node.js modules (e.g., `"node:fs"`, `"node:path"`)

## Native plugins

Native plugins (NAPI modules) can run on multiple threads for better performance.

### Creating a native plugin in Rust

```rust
use bun_native_plugin::{define_bun_plugin, OnBeforeParse, bun, Result};

define_bun_plugin!("replace-foo-with-bar");

#[bun]
pub fn replace_foo_with_bar(handle: &mut OnBeforeParse) -> Result<()> {
  let input_source_code = handle.input_source_code()?;
  let output_source_code = input_source_code.replace("foo", "bar");
  handle.set_output_source_code(output_source_code, BunLoader::BUN_LOADER_JSX);
  Ok(())
}
```
