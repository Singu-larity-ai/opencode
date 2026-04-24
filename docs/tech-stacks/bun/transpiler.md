---
title: Transpiler
source: https://bun.sh/docs/runtime/transpiler
description: Use Bun's transpiler to transpile JavaScript and TypeScript code
---

# Transpiler

> Use Bun's transpiler to transpile JavaScript and TypeScript code

Bun exposes its internal transpiler via the `Bun.Transpiler` class.

```ts
const transpiler = new Bun.Transpiler({
  loader: "tsx",
});
```

## .transformSync()

Transpile code synchronously:

```ts
const code = `
import * as whatever from "./whatever.ts"
export function Home(props: {title: string}){
  return <p>{props.title}</p>;
}`;

const result = transpiler.transformSync(code);
```

## .transform()

Async version:

```ts
const result = await transpiler.transform("<div>hi!</div>");
```

## .scan()

Return a list of imports and exports:

```ts
const result = transpiler.scan(code);
// { exports: ["name"], imports: [...] }
```

## .scanImports()

For performance-sensitive code:

```ts
const result = transpiler.scanImports(code);
// Faster than .scan() but marginally less accurate
```

## Reference

```ts
type Loader = "jsx" | "js" | "ts" | "tsx";

interface TranspilerOptions {
  define?: Record<string, string>,
  loader?: Loader,
  target?: "browser" | "bun" | "node",
  tsconfig?: string | TSConfig,
  macro?: MacroMap,
  exports?: {
    eliminate?: string[];
    replace?: Record<string, string>;
  },
  trimUnusedImports?: boolean,
  minifyWhitespace?: boolean,
  inline?: boolean,
}

class Bun.Transpiler {
  constructor(options: TranspilerOptions)
  transform(code: string, loader?: Loader): Promise<string>
  transformSync(code: string, loader?: Loader): string
  scan(code: string): {exports: string[], imports: Import}
  scanImports(code: string): Import[]
}
```

Import kinds:
- `import-statement` - `import foo from 'bar'`
- `require-call` - `require("foo")`
- `require-resolve` - `require.resolve("foo")`
- `dynamic-import` - `import('./loader')`
- `import-rule` - `@import 'foo.css'`
- `url-token` - `url('./foo.png')`
