---
title: Creating Effects
source: https://effect.website/docs/getting-started/creating-effects
description: Methods for creating effects - succeed, fail, sync, try, promise, tryPromise, and async
---

## Why Not Throw Errors?

In traditional programming, throwing errors is problematic because function type signatures don't indicate possible exceptions.

Effect introduces dedicated constructors: `Effect.succeed` and `Effect.fail`.

### succeed

Creates an `Effect` that always succeeds:

```ts
import { Effect } from "effect"

const success = Effect.succeed(42)
// Effect<number, never, never>
```

### fail

Creates an `Effect` that represents a recoverable error:

```ts
import { Effect, Data } from "effect"

class HttpError extends Data.TaggedError("HttpError")<{}> {}

const program = Effect.fail(new HttpError())
// Effect<never, HttpError, never>
```

## Error Tracking

With Effect, errors are tracked at the type level:

```ts
const divide = (a: number, b: number): Effect<number, Error> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b)
```

## Modeling Synchronous Effects

### sync

Creates an Effect from a synchronous side-effect:

```ts
const log = (message: string) =>
  Effect.sync(() => {
    console.log(message)
  })
```

### try

For synchronous operations that might fail:

```ts
const parse = (input: string) =>
  Effect.try(() => JSON.parse(input))
```

Custom error handling:

```ts
const parse = (input: string) =>
  Effect.try({
    try: () => JSON.parse(input),
    catch: (error) => new Error(`parse error: ${error}`)
  })
```

## Modeling Asynchronous Effects

### promise

For async operations guaranteed to succeed:

```ts
const delay = (message: string) =>
  Effect.promise<string>(() =>
    new Promise((resolve) => {
      setTimeout(() => resolve(message), 2000)
    })
  )
```

### tryPromise

For async operations that might fail:

```ts
const getTodo = (id: number) =>
  Effect.tryPromise(() =>
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  )
```

## From a Callback

Use `Effect.async` for callback-based APIs:

```ts
import { Effect } from "effect"
import * as NodeFS from "node:fs"

const readFile = (filename: string) =>
  Effect.async<Buffer, Error>((resume) => {
    NodeFS.readFile(filename, (error, data) => {
      if (error) {
        resume(Effect.fail(error))
      } else {
        resume(Effect.succeed(data))
      }
    })
  })
```
