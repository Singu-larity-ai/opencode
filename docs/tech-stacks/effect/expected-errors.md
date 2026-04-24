---
title: Expected Errors
source: https://effect.website/docs/error-management/expected-errors
description: Handling expected/recoverable errors in Effect with either, option, catchAll, catchTag, and more
---

## Error Tracking

Expected errors are tracked in the "Error channel":

```ts
Effect<Success, Error, Requirements>
```

## Creating Effects That Can Fail

```ts
import { Effect, Random, Data } from "effect"

class HttpError extends Data.TaggedError("HttpError")<{}> {}

const program = Effect.gen(function* () {
  const n = yield* Random.next
  if (n < 0.5) {
    return yield* Effect.fail(new HttpError())
  }
  return "some result"
})
// Effect<string, HttpError, never>
```

## Short-Circuiting

When an error occurs, subsequent operations are skipped:

```ts
const program = Effect.gen(function* () {
  yield* task1
  yield* task2  // If this fails, task3 won't run
  yield* task3
})
```

## Catching Errors

### either

Transforms to Either type:

```ts
const recovered = Effect.gen(function* () {
  const failureOrSuccess = yield* Effect.either(program)
  return Either.match(failureOrSuccess, {
    onLeft: (error) => `Recovering from ${error._tag}`,
    onRight: (value) => value
  })
})
```

### catchAll

Catches all errors:

```ts
const recovered = Effect.gen(function* () {
  return yield* Effect.catchAll(program, (error) =>
    Effect.succeed(`Got error: ${error}`)
  )
})
```

### catchTag

Catches specific tagged errors:

```ts
class HttpError extends Data.TaggedError("HttpError")<{}> {}
class ValidationError extends Data.TaggedError("ValidationError")<{}> {}

const recovered = Effect.gen(function* () {
  return yield* Effect.catchTag(program, "HttpError", (error) =>
    Effect.succeed(`HTTP error: ${error._tag}`)
  )
})
```

### catchTags

Catches multiple specific errors:

```ts
const recovered = Effect.gen(function* () {
  return yield* Effect.catchTags(program, {
    HttpError: (error) => Effect.succeed(`HTTP error`),
    ValidationError: (error) => Effect.succeed(`Validation error`)
  })
})
```

## Effect.fn

For automatic span creation in tracing:

```ts
import { Effect } from "effect"

const add = Effect.fn(function* (a: number, b: number) {
  return a + b
})
```
