---
title: Server
source: https://bun.com/docs/runtime/http/server.md
description: Use Bun.serve to start a high-performance HTTP server in Bun
---

## Basic Setup

```ts title="index.ts"
const server = Bun.serve({
  routes: {
    "/api/status": new Response("OK"),
    "/users/:id": req => {
      return new Response(`Hello User ${req.params.id}!`);
    },
    "/api/posts": {
      GET: () => new Response("List posts"),
      POST: async req => {
        const body = await req.json();
        return Response.json({ created: true, ...body });
      },
    },
    "/api/*": Response.json({ message: "Not found" }, { status: 404 }),
    "/blog/hello": Response.redirect("/blog/hello/world"),
    "/favicon.ico": Bun.file("./favicon.ico"),
  },
  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at ${server.url}`);
```

## HTML imports

Bun supports importing HTML files directly into your server code, enabling full-stack applications with both server-side and client-side code.

## Configuration

### Changing the port and hostname

```ts
Bun.serve({
  port: 8080,
  hostname: "mydomain.com",
  fetch(req) {
    return new Response("404!");
  },
});
```

### Unix domain sockets

```ts
Bun.serve({
  unix: "/tmp/my-socket.sock",
  fetch(req) {
    return new Response(`404!`);
  },
});
```

### idleTimeout

By default, Bun.serve closes connections after 10 seconds of inactivity. Configure with:

```ts
Bun.serve({
  idleTimeout: 30,
  fetch(req) {
    return new Response("Bun!");
  },
});
```

## Server Lifecycle Methods

### server.stop()

```ts
const server = Bun.serve({
  fetch(req) {
    return new Response("Hello!");
  },
});

await server.stop();
```

### server.reload()

Update routes without server restarts:

```ts
const server = Bun.serve({
  routes: {
    "/api/version": () => Response.json({ version: "1.0.0" }),
  },
});

server.reload({
  routes: {
    "/api/version": () => Response.json({ version: "2.0.0" }),
  },
});
```

## Per-Request Controls

### server.timeout(Request, seconds)

```ts
const server = Bun.serve({
  async fetch(req, server) {
    server.timeout(req, 60);
    await req.text();
    return new Response("Done!");
  },
});
```

### server.requestIP(Request)

```ts
const server = Bun.serve({
  fetch(req, server) {
    const address = server.requestIP(req);
    return new Response(`Client IP: ${address.address}`);
  },
});
```

## Benchmarks

Bun.serve can handle roughly 2.5x more requests per second than Node.js.

## Reference

```ts
interface Server extends Disposable {
  stop(closeActiveConnections?: boolean): Promise<void>;
  reload(options: Serve): void;
  fetch(request: Request | string): Response | Promise<Response>;
  upgrade<T = undefined>(request: Request, options?: {...}): boolean;
  publish(topic: string, data: string | ArrayBufferView | ArrayBuffer | SharedArrayBuffer, compress?: boolean): ServerWebSocketSendStatus;
  subscriberCount(topic: string): number;
  requestIP(request: Request): SocketAddress | null;
  timeout(request: Request, seconds: number): void;
  ref(): void;
  unref(): void;
  readonly pendingRequests: number;
  readonly pendingWebSockets: number;
  readonly url: URL;
  readonly port: number;
  readonly hostname: string;
  readonly development: boolean;
  readonly id: string;
}
```
