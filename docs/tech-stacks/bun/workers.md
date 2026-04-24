---
title: Workers
source: https://bun.com/docs/runtime/workers.md
description: Bun's Workers API for creating and communicating with JavaScript on separate threads
---

## Creating a Worker

```ts index.ts
const worker = new Worker("./worker.ts");

worker.postMessage("hello");
worker.onmessage = event => {
  console.log(event.data);
};
```

```ts worker.ts
declare var self: Worker;

self.onmessage = (event: MessageEvent) => {
  console.log(event.data);
  postMessage("world");
};
```

### preload option

Load modules before worker starts:

```ts index.ts
const worker = new Worker("./worker.ts", {
  preload: ["./load-sentry.js"],
});
```

### blob: URLs

```js
const blob = new Blob([`self.onmessage = (event) => postMessage(event.data)`], {
  type: "application/typescript",
});
const url = URL.createObjectURL(blob);
const worker = new Worker(url);
```

## Messages with postMessage

```js
postMessage({ hello: "world" });

self.addEventListener("message", event => {
  console.log(event.data);
});
```

## Terminating a worker

```ts
worker.terminate();
```

### process.exit()

A worker can terminate itself with `process.exit()`.

### "close" event

```ts
worker.addEventListener("close", event => {
  console.log("worker is being closed");
});
```

## Managing lifetime

### worker.unref()

```ts
const worker = new Worker(new URL("worker.ts", import.meta.url).href);
worker.unref();
```

## Memory usage with smol

```ts
const worker = new Worker("./i-am-smol.ts", {
  smol: true,
});
```

## Environment Data

```ts
import { setEnvironmentData, getEnvironmentData } from "worker_threads";

setEnvironmentData("config", { apiUrl: "https://api.example.com" });

const config = getEnvironmentData("config");
```

## Bun.isMainThread

```ts
if (Bun.isMainThread) {
  console.log("I'm the main thread");
} else {
  console.log("I'm in a worker");
}
```
