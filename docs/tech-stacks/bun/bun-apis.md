---
title: Bun APIs
source: https://bun.sh/docs/runtime/bun-apis
description: Overview of Bun's native APIs available on the Bun global object and built-in modules
---

# Bun APIs

> Overview of Bun's native APIs available on the Bun global object and built-in modules

Bun implements a set of native APIs on the `Bun` global object and through several built-in modules. These APIs are heavily optimized and represent the canonical "Bun-native" way to implement some common functionality.

Bun strives to implement standard Web APIs wherever possible. Bun introduces new APIs primarily for server-side tasks where no standard exists, such as file I/O and starting an HTTP server. In these cases, Bun's approach still builds atop standard APIs like `Blob`, `URL`, and `Request`.

```ts
Bun.serve({
  fetch(req: Request) {
    return new Response("Success!");
  },
});
```

## API Categories

| Topic | APIs |
|-------|------|
| HTTP Server | `Bun.serve` |
| Shell | `$` |
| Bundler | `Bun.build` |
| File I/O | `Bun.file`, `Bun.write`, `Bun.stdin`, `Bun.stdout`, `Bun.stderr` |
| Child Processes | `Bun.spawn`, `Bun.spawnSync` |
| TCP Sockets | `Bun.listen`, `Bun.connect` |
| UDP Sockets | `Bun.udpSocket` |
| WebSockets | `new WebSocket()` (client), `Bun.serve` (server) |
| Transpiler | `Bun.Transpiler` |
| Routing | `Bun.FileSystemRouter` |
| SQLite | `bun:sqlite` |
| PostgreSQL | `Bun.SQL`, `Bun.sql` |
| Redis | `Bun.RedisClient`, `Bun.redis` |
| FFI | `bun:ffi` |
| DNS | `Bun.dns.lookup`, `Bun.dns.prefetch` |
| Testing | `bun:test` |
| Workers | `new Worker()` |
| Glob | `Bun.Glob` |
| Hashing | `Bun.password`, `Bun.hash`, `Bun.CryptoHasher` |
| Compression | `Bun.gzipSync`, `Bun.deflateSync`, etc. |

(See full documentation for complete API reference)
