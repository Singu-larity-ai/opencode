---
title: Memos
source: https://docs.solidjs.com/concepts/derived-values/memos
description: Memos are a type of reactive value that can be used to memoize derived state or expensive computations.
---

# Memos

Memos are a type of reactive value that can be used to memoize derived state or expensive computations. They are similar to derived signals in that they are reactive values that automatically re-evaluate when their dependencies change. However, unlike derived signals, memos are optimized to execute only once for each change in their dependencies.

## Using memos

A memo is created using the `createMemo` function:

```javascript
import { createMemo, createSignal } from "solid-js";

const [count, setCount] = createSignal(0);

const isEven = createMemo(() => count() % 2 === 0);
console.log(isEven()); // true
```

## Advantages of using memos

- Memos are optimized to execute only once for each change in their dependencies.
- When working with expensive computations, memos can be used to cache the results.
- A memo will only recompute when its dependencies change.

## Memo vs. effect

Both memos and effects are important when managing reactive computations and side effects. They serve different purposes and each has their own unique behaviors.

## Best practices

### Pure functions

When working with memos, it is recommended that you leave them "pure".

### Keep logic in memos

Memos are optimized to execute only once for each change in their dependencies. This means that you can remove unnecessary effects that are triggered by a memo's dependencies.
