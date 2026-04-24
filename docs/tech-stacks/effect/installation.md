---
title: Installation
source: https://effect.website/docs/getting-started/installation
description: Install Effect and set up your development environment with Node.js, Deno, Bun, or Vite + React
---

Requirements: TypeScript 5.4 or newer. Node.js, Deno, and Bun are supported.

## Node.js

```sh
mkdir hello-effect
cd hello-effect
npm init -y
npm install --save-dev typescript
npx tsc --init
```

Set `strict: true` in tsconfig.json, then:

```sh
npm install effect
```

Create `src/index.ts`:

```ts
import { Effect, Console } from "effect"

const program = Console.log("Hello, World!")

Effect.runSync(program)
```

Run with [tsx](https://github.com/privatenumber/tsx):

```sh
npx tsx src/index.ts
```

## Deno

```sh
mkdir hello-effect
cd hello-effect
deno init
deno add npm:effect
```

```ts
import { Effect, Console } from "effect"

const program = Console.log("Hello, World!")

Effect.runSync(program)
```

```sh
deno run main.ts
```

## Bun

```sh
mkdir hello-effect
cd hello-effect
bun init
bun add effect
```

Set `strict: true` in tsconfig.json, then:

```ts
import { Effect, Console } from "effect"

const program = Console.log("Hello, World!")

Effect.runSync(program)
```

```sh
bun index.ts
```

## Vite + React

```sh
npm create vite@latest hello-effect -- --template react-ts
cd hello-effect
npm install
npm install effect
```

Set `strict: true` in tsconfig.json.
