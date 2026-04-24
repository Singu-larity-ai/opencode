---
title: The Effect Type
source: https://effect.website/docs/getting-started/the-effect-type
description: Understanding the Effect type - a description of a workflow that can succeed, fail, or require context
---

## Overview

The `Effect` type is a description of a workflow or operation that is **lazily** executed. When you create an `Effect`, it doesn't run immediately, but defines a program that can succeed, fail, or require some additional context to complete.

```
Effect<Success, Error, Requirements>
```

This type indicates that an effect:
- **Succeeds** and returns a value of type `Success`
- **Fails** with an error of type `Error`
- **May need** certain contextual dependencies of type `Requirements`

## Type Parameters

The `Effect` type has three type parameters:

| Parameter | Description |
|-----------|-------------|
| **Success** | The type of value that an effect can succeed with. If `void`, it produces no useful information. If `never`, it runs forever. |
| **Error** | The expected errors that can occur. If `never`, the effect cannot fail. |
| **Requirements** | The contextual data required by the effect. If `never`, no requirements. |

Type parameters are abbreviated as `A` (success), `E` (error), and `R` (requirements).

## Extracting Inferred Types

By using utility types `Effect.Success`, `Effect.Error`, and `Effect.Context`, you can extract types from an effect:

```ts
import { Effect, Context } from "effect"

class SomeContext extends Context.Tag("SomeContext")<SomeContext, { readonly myNum: number }>() {}

declare const program: Effect.Effect<number, Error, SomeContext>

type A = Effect.Success<typeof program>  // number
type E = Effect.Error<typeof program>    // Error
type R = Effect.Context<typeof program>    // SomeContext
```
