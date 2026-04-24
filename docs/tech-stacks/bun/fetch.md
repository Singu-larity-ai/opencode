---
title: Fetch
source: https://bun.com/docs/runtime/networking/fetch.md
description: Send HTTP requests with Bun's fetch API implementing the WHATWG fetch standard
---

## Sending an HTTP request

```ts
const response = await fetch("http://example.com");
console.log(response.status);
const text = await response.text();
```

### Sending a POST request

```ts
const response = await fetch("http://example.com", {
  method: "POST",
  body: "Hello, world!",
});
```

### Proxying requests

```ts
const response = await fetch("http://example.com", {
  proxy: "http://proxy.com",
});
```

### Custom headers

```ts
const response = await fetch("http://example.com", {
  headers: {
    "X-Custom-Header": "value",
  },
});
```

## Response bodies

```ts
const text = await response.text();
const json = await response.json();
const formData = await response.formData();
const bytes = await response.bytes();
const arrayBuffer = await response.arrayBuffer();
const blob = await response.blob();
```

## Fetching with timeout

```ts
const response = await fetch("http://example.com", {
  signal: AbortSignal.timeout(1000),
});
```

## Unix domain sockets

```ts
const response = await fetch("https://hostname/a/path", {
  unix: "/var/run/path/to/unix.sock",
});
```

## TLS

```ts
await fetch("https://example.com", {
  tls: {
    key: Bun.file("/path/to/key.pem"),
    cert: Bun.file("/path/to/cert.pem"),
  },
});
```

## Protocol support

### S3 URLs

```ts
const response = await fetch("s3://my-bucket/path/to/object");
```

### File URLs

```ts
const response = await fetch("file:///path/to/file.txt");
```

### Data URLs

```ts
const response = await fetch("data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==");
```

## Debugging

```ts
const response = await fetch("http://example.com", {
  verbose: true,
});
```

## Performance

### DNS prefetching

```ts
import { dns } from "bun";
dns.prefetch("bun.com");
```

### Preconnect to a host

```ts
import { fetch } from "bun";
fetch.preconnect("https://bun.com");
```

### Connection pooling

Bun automatically reuses connections. Maximum simultaneous requests is 256 by default.

```bash
BUN_CONFIG_MAX_HTTP_REQUESTS=512 bun ./my-script.ts
```
