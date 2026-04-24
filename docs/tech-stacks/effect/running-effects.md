---
title: Running Effects
source: https://effect.website/docs/getting-started/running-effects
description: Methods for executing effects - runSync, runSyncExit, runPromise, runPromiseExit, runFork
---

## runSync

Executes an effect synchronously, returning the result directly. Throws if the effect fails or involves async work.

```ts
import { Effect } from "effect"

const program = Effect.sync(() => {
  console.log("Hello!")
  return 1
})

const result = Effect.runSync(program)
// Output: Hello!
// result: 1
```

## runSyncExit

Runs an effect synchronously and returns the result as an `Exit` type:

```ts
import { Effect } from "effect"

console.log(Effect.runSyncExit(Effect.succeed(1)))
// { _id: "Exit", _tag: "Success", value: 1 }

console.log(Effect.runSyncExit(Effect.fail("my error")))
// { _id: "Exit", _tag: "Failure", cause: { _id: "Cause", _tag: "Fail", failure: "my error" } }
```

## runPromise

Executes an effect and returns a Promise:

```ts
import { Effect } from "effect"

Effect.runPromise(Effect.succeed(1)).then(console.log)
// Output: 1

Effect.runPromise(Effect.fail("my error")).catch(console.error)
// Output: (FiberFailure) Error: my error
```

## runPromiseExit

Returns a Promise that resolves to an Exit:

```ts
import { Effect } from "effect"

const exit = await Effect.runPromiseExit(Effect.succeed(1))
// Exit<number, never>
```

## runFork

Runs an effect on a new fiber, returning the fiber:

```ts
import { Effect, Fiber } from "effect"

const fiber = Effect.runFork(Effect.succeed(1))

const result = await Fiber.join(fiber)
// 1
```

## Best Practices

Design your program with the majority of its logic as Effects. Use `run*` functions closer to the "edge" of your program for flexibility.
