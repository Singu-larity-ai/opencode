---
title: Node.js Compatibility
source: https://bun.sh/docs/runtime/nodejs-compat
description: Bun's compatibility status with Node.js APIs, modules, and globals
---

# Node.js Compatibility

> Bun's compatibility status with Node.js APIs, modules, and globals

Every day, Bun gets closer to 100% Node.js API compatibility. Today, popular frameworks like Next.js, Express, and millions of `npm` packages intended for Node work with Bun. To ensure compatibility, we run thousands of tests from Node.js' test suite before every release of Bun.

**If a package works in Node.js but doesn't work in Bun, we consider it a bug in Bun.** Please [open an issue](https://bun.com/issues) and we'll fix it.

This page is updated regularly to reflect compatibility status of the latest version of Bun. The information below reflects Bun's compatibility with *Node.js v23*.

## Built-in Node.js modules

### Status Overview

| Module | Status |
|--------|--------|
| `node:assert` | 🟢 Fully implemented |
| `node:buffer` | 🟢 Fully implemented |
| `node:console` | 🟢 Fully implemented |
| `node:dgram` | 🟢 Fully implemented |
| `node:dns` | 🟢 Fully implemented |
| `node:events` | 🟢 Fully implemented |
| `node:fs` | 🟢 Fully implemented (92% of Node.js tests pass) |
| `node:http` | 🟢 Fully implemented |
| `node:https` | 🟢 APIs implemented |
| `node:os` | 🟢 Fully implemented |
| `node:path` | 🟢 Fully implemented |
| `node:stream` | 🟢 Fully implemented |
| `node:net` | 🟢 Fully implemented |
| `node:http2` | 🟡 Client & server implemented (95% of gRPC tests pass) |
| `node:module` | 🟡 Most features implemented |
| `node:crypto` | 🟡 Missing `secureHeapUsed`, `setEngine`, `setFips` |
| `node:worker_threads` | 🟡 Most features implemented |
| `node:repl` | 🔴 Not implemented |
| `node:sqlite` | 🔴 Not implemented |
| `node:test` | 🟡 Partly implemented (use `bun:test` instead) |

## Node.js Globals

Most Node.js globals are fully implemented in Bun, including:
- `Buffer`, `process`, `require`, `module`, `exports`
- `__dirname`, `__filename`, `global`, `globalThis`
- `setTimeout`, `setInterval`, `setImmediate`, `clearTimeout`, etc.
- `fetch`, `Response`, `Request`, `Headers`, `FormData` (Web APIs)
- `crypto`, `SubtleCrypto`, `Crypto`
- And many more Web APIs

(See full documentation for complete status of all globals and modules)
