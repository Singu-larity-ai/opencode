---
title: Bun TypeScript Support
source: https://bun.com/docs/runtime/typescript/
description: Using TypeScript with Bun, including type definitions and compiler options.
---

# TypeScript

> Using TypeScript with Bun, including type definitions and compiler options

To install the TypeScript definitions for Bun's built-in APIs, install `@types/bun`.

```bash
bun add -d @types/bun # dev dependency
```

## Suggested `compilerOptions`

Bun supports top-level await, JSX, and extensioned `.ts` imports. Below is a recommended `tsconfig.json`:

```json
{
  "compilerOptions": {
    "lib": ["ESNext"],
    "target": "ESNext",
    "module": "Preserve",
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "allowJs": true,
    "types": ["bun"],

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,

    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,

    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noPropertyAccessFromIndexSignature": false
  }
}
```

Run `bun init` to generate this automatically:

```bash
bun init
```

## Type checking

Bun does not perform type checking. Use `tsc` separately for type checking:

```bash
tsc --noEmit
```
