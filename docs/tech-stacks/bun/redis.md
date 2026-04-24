---
title: Redis
source: https://bun.com/docs/runtime/redis.md
description: Use Bun's native Redis client with a Promise-based API
---

## Getting Started

```ts redis.ts
import { redis, RedisClient } from "bun";

await redis.set("greeting", "Hello from Bun!");
const greeting = await redis.get("greeting");
console.log(greeting);
```

By default, reads connection info from `REDIS_URL` or `VALKEY_URL` environment variables.

## Connection Lifecycle

```ts
const client = new RedisClient();

await client.set("key", "value");
await client.get("key");

client.close();
```

## Basic Operations

### String Operations

```ts
await redis.set("user:1:name", "Alice");
const name = await redis.get("user:1:name");
await redis.del("user:1:name");
const exists = await redis.exists("user:1:name");
await redis.expire("session:123", 3600);
const ttl = await redis.ttl("session:123");
```

### Numeric Operations

```ts
await redis.set("counter", "0");
await redis.incr("counter");
await redis.decr("counter");
```

### Hash Operations

```ts
await redis.hmset("user:123", ["name", "Alice", "email", "alice@example.com"]);
const userFields = await redis.hmget("user:123", ["name", "email"]);
await redis.hincrby("user:123", "visits", 1);
```

### Set Operations

```ts
await redis.sadd("tags", "javascript");
await redis.srem("tags", "javascript");
const allTags = await redis.smembers("tags");
```

## Pub/Sub

```typescript publisher.ts
import { RedisClient } from "bun";

const writer = new RedisClient("redis://localhost:6739");
await writer.connect();

writer.publish("general", "Hello everyone!");
writer.close();
```

```typescript subscriber.ts
import { RedisClient } from "bun";

const listener = new RedisClient("redis://localhost:6739");
await listener.connect();

await listener.subscribe("general", (message, channel) => {
  console.log(`Received: ${message}`);
});
```

## Advanced Usage

### Command Execution

```ts
const info = await redis.send("INFO", []);
await redis.send("LPUSH", ["mylist", "value1", "value2"]);
```

### Connection Options

```ts
const client = new RedisClient("redis://localhost:6379", {
  connectionTimeout: 5000,
  idleTimeout: 30000,
  autoReconnect: true,
  maxRetries: 10,
  enableAutoPipelining: true,
  tls: true,
});
```

## Example Use Cases

### Caching

```ts
async function getUserWithCache(userId) {
  const cachedUser = await redis.get(`user:${userId}`);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }

  const user = await database.getUser(userId);
  await redis.set(`user:${userId}`, JSON.stringify(user));
  await redis.expire(`user:${userId}`, 3600);

  return user;
}
```

### Rate Limiting

```ts
async function rateLimit(ip, limit = 100, windowSecs = 3600) {
  const key = `ratelimit:${ip}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, windowSecs);
  }

  return {
    limited: count > limit,
    remaining: Math.max(0, limit - count),
  };
}
```

### Session Storage

```ts
async function createSession(userId, data) {
  const sessionId = crypto.randomUUID();
  const key = `session:${sessionId}`;

  await redis.hmset(key, ["userId", userId.toString(), "data", JSON.stringify(data)]);
  await redis.expire(key, 86400);

  return sessionId;
}
```

## Supported URL Formats

```ts
new RedisClient("redis://localhost:6379");
new RedisClient("redis://username:password@localhost:6379");
new RedisClient("redis://localhost:6379/0");
new RedisClient("rediss://localhost:6379");
new RedisClient("redis+unix:///path/to/socket");
```
