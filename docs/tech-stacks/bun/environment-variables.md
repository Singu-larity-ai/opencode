---
title: Environment Variables
source: https://bun.com/docs/runtime/environment-variables.md
description: Read and configure environment variables in Bun including automatic .env file support
---

## Setting environment variables

Bun reads `.env` files automatically.

```ini
FOO=hello
BAR=world
```

Or via command line:

```sh
FOO=helloworld bun run dev
```

Or programmatically:

```ts
process.env.FOO = "hello";
```

## .env file loading order

1. `.env`
2. `.env.production`, `.env.development`, `.env.test`
3. `.env.local`

## Manually specifying .env files

```sh
bun --env-file=.env.1 src/index.ts
bun --env-file=.env.abc --env-file=.env.def run build
```

## Disabling automatic .env loading

```sh
bun run --no-env-file index.ts
```

## Quotation marks

```ini
FOO='hello'
FOO="hello"
FOO=`hello`
```

### Expansion

```ini
FOO=world
BAR=hello$FOO
```

```ts
process.env.BAR;
```

## Reading environment variables

```ts
process.env.API_TOKEN;
Bun.env.API_TOKEN;
import.meta.env.API_TOKEN;
```

## TypeScript

```ts
declare module "bun" {
  interface Env {
    AWESOME: string;
  }
}

process.env.AWESOME;
```

## Configuring Bun

| Name | Description |
|------|-------------|
| `NODE_TLS_REJECT_UNAUTHORIZED` | Set to 0 to disable SSL validation |
| `BUN_CONFIG_VERBOSE_FETCH` | Log fetch requests |
| `BUN_RUNTIME_TRANSLATOR_CACHE_PATH` | Cache path for transpiled files |
| `BUN_CONFIG_MAX_HTTP_REQUESTS` | Max concurrent HTTP requests (default 256) |
| `DO_NOT_TRACK` | Disable crash reports and telemetry |
| `BUN_OPTIONS` | Prepend CLI arguments |

## Runtime transpiler caching

Files larger than 50KB are cached to improve CLI startup time.

Disable cache:

```sh
BUN_RUNTIME_TRANSLATOR_CACHE_PATH=0 bun run dev
```
