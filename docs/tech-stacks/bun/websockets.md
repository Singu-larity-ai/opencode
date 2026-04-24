---
title: WebSockets
source: https://bun.com/docs/runtime/http/websockets.md
description: Server-side WebSockets in Bun with on-the-fly compression, TLS support, and pub/sub API
---

## Start a WebSocket server

```ts server.ts
Bun.serve({
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {},
});
```

### WebSocket event handlers

```ts server.ts
Bun.serve({
  fetch(req, server) {},
  websocket: {
    message(ws, message) {},
    open(ws) {},
    close(ws, code, message) {},
    drain(ws) {},
  },
});
```

### Sending messages

```ts
ws.send("Hello world");
ws.send(response.arrayBuffer());
ws.send(new Uint8Array([1, 2, 3]));
```

### Headers

```ts
server.upgrade(req, {
  headers: {
    "Set-Cookie": `SessionId=${sessionId}`,
  },
});
```

### Contextual data

```ts
type WebSocketData = {
  createdAt: number;
  channelId: string;
  authToken: string;
};

Bun.serve({
  fetch(req, server) {
    server.upgrade(req, {
      data: {
        createdAt: Date.now(),
        channelId: new URL(req.url).searchParams.get("channelId"),
        authToken: cookies.get("X-Token"),
      },
    });
  },
  websocket: {
    data: {} as WebSocketData,
    async message(ws, message) {
      const user = getUserFromToken(ws.data.authToken);
    },
  },
});
```

### Pub/Sub

```ts
const server = Bun.serve({
  fetch(req, server) {
    server.upgrade(req, { data: { username } });
  },
  websocket: {
    data: {} as { username: string },
    open(ws) {
      ws.subscribe("the-group-chat");
    },
    message(ws, message) {
      server.publish("the-group-chat", `${ws.data.username}: ${message}`);
    },
    close(ws) {
      ws.unsubscribe("the-group-chat");
    },
  },
});
```

### Compression

```ts
Bun.serve({
  websocket: {
    perMessageDeflate: true,
  },
});
```

## Connect to a WebSocket server

```ts
const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("message", event => {});
socket.addEventListener("open", event => {});
socket.addEventListener("close", event => {});
```

## Reference

```ts
interface Server {
  pendingWebSockets: number;
  publish(topic: string, data: string | ArrayBufferView | ArrayBuffer, compress?: boolean): number;
  upgrade(req: Request, options?: {...}): boolean;
}

interface ServerWebSocket {
  readonly data: any;
  readonly readyState: number;
  readonly remoteAddress: string;
  readonly subscriptions: string[];
  send(message: string | ArrayBuffer | Uint8Array, compress?: boolean): number;
  close(code?: number, reason?: string): void;
  subscribe(topic: string): void;
  unsubscribe(topic: string): void;
  publish(topic: string, message: string | ArrayBuffer | Uint8Array): void;
  isSubscribed(topic: string): boolean;
  cork(cb: (ws: ServerWebSocket) => void): void;
}
```
