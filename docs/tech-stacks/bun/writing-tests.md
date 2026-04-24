---
title: Writing Tests
source: https://bun.sh/docs/test/writing-tests
description: Learn how to write tests using Bun's Jest-compatible API with support for async tests, timeouts, and various test modifiers
---

# Writing Tests

> Learn how to write tests using Bun's Jest-compatible API

## Basic test

```ts
import { expect, test } from "bun:test";

test("2 + 2", () => {
  expect(2 + 2).toBe(4);
});
```

## Async tests

```ts
test("async operation", async () => {
  const result = await Promise.resolve(2 * 2);
  expect(result).toEqual(4);
});
```

## Grouping with describe

```ts
import { describe, test } from "bun:test";

describe("arithmetic", () => {
  test("2 + 2", () => expect(2 + 2).toBe(4));
  test("2 * 2", () => expect(2 * 2).toBe(4));
});
```

## Test modifiers

| Modifier | Description |
|----------|-------------|
| `test.skip` | Skip a test |
| `test.only` | Run only this test |
| `test.todo` | Mark as todo |
| `test.if(condition)` | Run conditionally |
| `test.failing` | Expect failure |

## Parametrized tests

```ts
test.each([
  [1, 2, 3],
  [3, 4, 7],
])("%i + %i should be %i", (a, b, expected) => {
  expect(a + b).toBe(expected);
});
```

## Matchers

| Category | Matchers |
|----------|---------|
| Basic | `toBe`, `toEqual`, `toBeNull`, `toBeUndefined` |
| Strings | `toContain`, `toMatch` |
| Numbers | `toBeGreaterThan`, `toBeLessThan`, `toBeCloseTo` |
| Objects | `toHaveProperty`, `toMatchObject` |
| Promises | `resolves`, `rejects` |
| Mocks | `toHaveBeenCalled`, `toHaveBeenCalledWith` |
