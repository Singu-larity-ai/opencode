---
title: "Error Accumulation"
source: "https://effect.website/docs/error-accumulation/"
description: "Effect documentation - Error Accumulation"
---

# Error Accumulation

[Docs](/docs/) [Blog](/blog/) [Podcast](/podcast/) [Play](/play/)
On this page
## On this page
-   [Overview](#_top)
-   [validate](#validate)
-   [validateAll](#validateall)
-   [validateFirst](#validatefirst)
-   [partition](#partition)
# Error Accumulation
Sequential combinators such as [Effect.zip](/docs/getting-started/control-flow/#zip), [Effect.all](/docs/getting-started/control-flow/#all) and [Effect.forEach](/docs/getting-started/control-flow/#foreach) have a “fail fast” policy when it comes to error management. This means that they stop and return immediately when they encounter the first error.
Here’s an example using `Effect.zip`, which stops at the first failure and only shows the first error:
**Example** (Fail Fast with `Effect.zip`)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const task1: Effect.Effect<number, never, never>task1 = import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("task1").Pipeable.pipe<Effect.Effect<void, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<void, never, never>, ab: (_: Effect.Effect<void, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <number>(value: number) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<number, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
Details
This function allows you to ignore the original value inside an effect and
replace it with a constant value.
When to Use
It is useful when you no longer need the value produced by an effect but want
to ensure that the effect completes successfully with a specific constant
result instead. For instance, you can replace the value produced by a
computation with a predefined value, ignoring what was calculated before.
Example (Replacing a Value)
import { pipe, Effect } from "effect"
// Replaces the value 5 with the constant "new value"const program = pipe(Effect.succeed(5), Effect.as("new value"))
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(1))4const const task2: Effect.Effect<number, string, never>task2 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
When to Use
Use this function to explicitly signal an error in an Effect. The error
will keep propagating unless it is handled. You can handle the error with
functions like
catchAll
or
catchTag
.
Example (Creating a Failed Effect)
import { Effect } from "effect"
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("Oh uh!").Pipeable.pipe<Effect.Effect<never, string, never>, Effect.Effect<number, string, never>>(this: Effect.Effect<never, string, never>, ab: (_: Effect.Effect<never, string, never>) => Effect.Effect<number, string, never>): Effect.Effect<number, string, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <number>(value: number) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<number, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
Details
This function allows you to ignore the original value inside an effect and
replace it with a constant value.
When to Use
It is useful when you no longer need the value produced by an effect but want
to ensure that the effect completes successfully with a specific constant
result instead. For instance, you can replace the value produced by a
computation with a predefined value, ignoring what was calculated before.
Example (Replacing a Value)
import { pipe, Effect } from "effect"
// Replaces the value 5 with the constant "new value"const program = pipe(Effect.succeed(5), Effect.as("new value"))
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(2))5const const task3: Effect.Effect<number, never, never>task3 = import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("task2").Pipeable.pipe<Effect.Effect<void, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<void, never, never>, ab: (_: Effect.Effect<void, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <number>(value: number) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<number, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
Details
This function allows you to ignore the original value inside an effect and
replace it with a constant value.
When to Use
It is useful when you no longer need the value produced by an effect but want
to ensure that the effect completes successfully with a specific constant
result instead. For instance, you can replace the value produced by a
computation with a predefined value, ignoring what was calculated before.
Example (Replacing a Value)
import { pipe, Effect } from "effect"
// Replaces the value 5 with the constant "new value"const program = pipe(Effect.succeed(5), Effect.as("new value"))
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(3))6const const task4: Effect.Effect<number, string, never>task4 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
When to Use
Use this function to explicitly signal an error in an Effect. The error
will keep propagating unless it is handled. You can handle the error with
functions like
catchAll
or
catchTag
.
Example (Creating a Failed Effect)
import { Effect } from "effect"
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("Oh no!").Pipeable.pipe<Effect.Effect<never, string, never>, Effect.Effect<number, string, never>>(this: Effect.Effect<never, string, never>, ab: (_: Effect.Effect<never, string, never>) => Effect.Effect<number, string, never>): Effect.Effect<number, string, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <number>(value: number) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<number, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
Details
This function allows you to ignore the original value inside an effect and
replace it with a constant value.
When to Use
It is useful when you no longer need the value produced by an effect but want
to ensure that the effect completes successfully with a specific constant
result instead. For instance, you can replace the value produced by a
computation with a predefined value, ignoring what was calculated before.
Example (Replacing a Value)
import { pipe, Effect } from "effect"
// Replaces the value 5 with the constant "new value"const program = pipe(Effect.succeed(5), Effect.as("new value"))
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(4))7
8const const program: Effect.Effect<[[[number, number], number], number], string, never>program = const task1: Effect.Effect<number, never, never>task1.Pipeable.pipe<Effect.Effect<number, never, never>, Effect.Effect<[number, number], string, never>, Effect.Effect<[[number, number], number], string, never>, Effect.Effect<[[[number, number], number], number], string, never>>(this: Effect.Effect<...>, ab: (_: Effect.Effect<number, never, never>) => Effect.Effect<[number, number], string, never>, bc: (_: Effect.Effect<[number, number], string, never>) => Effect.Effect<[[number, number], number], string, never>, cd: (_: Effect.Effect<[[number, number], number], string, never>) => Effect.Effect<...>): Effect.Effect<...> (+21 overloads)pipe(9  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const zip: <number, string, never>(that: Effect.Effect<number, string, never>, options?: {    readonly concurrent?: boolean | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly concurrentFinalizers?: boolean | undefined;} | undefined) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<[A, number], string | E, R> (+1 overload)Combines two effects into a single effect, producing a tuple of their
results.
Details
This function combines two effects, self and that, into one. It executes
the first effect (self) and then the second effect (that), collecting
their results into a tuple. Both effects must succeed for the resulting
effect to succeed. If either effect fails, the entire operation fails.
By default, the effects are executed sequentially. If the concurrent option
is set to true, the effects will run concurrently, potentially improving
performance for independent operations.
Example (Combining Two Effects Sequentially)
import { Effect } from "effect"
const task1 = Effect.succeed(1).pipe(  Effect.delay("200 millis"),  Effect.tap(Effect.log("task1 done")))const task2 = Effect.succeed("hello").pipe(  Effect.delay("100 millis"),  Effect.tap(Effect.log("task2 done")))
// Combine the two effects together////      ┌─── Effect<[number, string], never, never>//      ▼const program = Effect.zip(task1, task2)
Effect.runPromise(program).then(console.log)// Output:// timestamp=... level=INFO fiber=#0 message="task1 done"// timestamp=... level=INFO fiber=#0 message="task2 done"// [ 1, 'hello' ]
Example (Combining Two Effects Concurrently)
import { Effect } from "effect"
const task1 = Effect.succeed(1).pipe(  Effect.delay("200 millis"),  Effect.tap(Effect.log("task1 done")))const task2 = Effect.succeed("hello").pipe(  Effect.delay("100 millis"),  Effect.tap(Effect.log("task2 done")))
// Run both effects concurrently using the concurrent optionconst program = Effect.zip(task1, task2, { concurrent: true })
Effect.runPromise(program).then(console.log)// Output:// timestamp=... level=INFO fiber=#0 message="task2 done"// timestamp=... level=INFO fiber=#0 message="task1 done"// [ 1, 'hello' ]@see ― zipWith for a version that combines the results with a custom
function.@see ― validate for a version that accumulates errors.@since ― 2.0.0zip(const task2: Effect.Effect<number, string, never>task2),10  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const zip: <number, never, never>(that: Effect.Effect<number, never, never>, options?: {    readonly concurrent?: boolean | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly concurrentFinalizers?: boolean | undefined;} | undefined) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<[A, number], E, R> (+1 overload)Combines two effects into a single effect, producing a tuple of their
results.
Details
This function combines two effects, self and that, into one. It executes
the first effect (self) and then the second effect (that), collecting
their results into a tuple. Both effects must succeed for the resulting
effect to succeed. If either effect fails, the entire operation fails.
By default, the effects are executed sequentially. If the concurrent option
is set to true, the effects will run concurrently, potentially improving
performance for independent operations.
Example (Combining Two Effects Sequentially)
import { Effect } from "effect"
const task1 = Effect.succeed(1).pipe(  Effect.delay("200 millis"),  Effect.tap(Effect.log("task1 done")))const task2 = Effect.succeed("hello").pipe(  Effect.delay("100 millis"),  Effect.tap(Effect.log("task2 done")))
// Combine the two effects together////      ┌─── Effect<[number, string], never, never>//      ▼const program = Effect.zip(task1, task2)
Effect.runPromise(program).then(console.log)// Output:// timestamp=... level=INFO fiber=#0 message="task1 done"// timestamp=... level=INFO fiber=#0 message="task2 done"// [ 1, 'hello' ]
Example (Combining Two Effects Concurrently)
import { Effect } from "effect"
const task1 = Effect.succeed(1).pipe(  Effect.delay("200 millis"),  Effect.tap(Effect.log("task1 done")))const task2 = Effect.succeed("hello").pipe(  Effect.delay("100 millis"),  Effect.tap(Effect.log("task2 done")))
// Run both effects concurrently using the concurrent optionconst program = Effect.zip(task1, task2, { concurrent: true })
Effect.runPromise(program).then(console.log)// Output:// timestamp=... level=INFO fiber=#0 message="task2 done"// timestamp=... level=INFO fiber=#0 message="task1 done"// [ 1, 'hello' ]@see ― zipWith for a version that combines the results with a custom
function.@see ― validate for a version that accumulates errors.@since ― 2.0.0zip(const task3: Effect.Effect<number, never, never>task3),11  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const zip: <number, string, never>(that: Effect.Effect<number, string, never>, options?: {    readonly concurrent?: boolean | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly concurrentFinalizers?: boolean | undefined;} | undefined) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<[A, number], string | E, R> (+1 overload)Combines two effects into a single effect, producing a tuple of their
results.
Details
This function combines two effects, self and that, into one. It executes
the first effect (self) and then the second effect (that), collecting
their results into a tuple. Both effects must succeed for the resulting
effect to succeed. If either effect fails, the entire operation fails.
By default, the effects are executed sequentially. If the concurrent option
is set to true, the effects will run concurrently, potentially improving
performance for independent operations.
Example (Combining Two Effects Sequentially)
import { Effect } from "effect"
const task1 = Effect.succeed(1).pipe(  Effect.delay("200 millis"),  Effect.tap(Effect.log("task1 done")))const task2 = Effect.succeed("hello").pipe(  Effect.delay("100 millis"),  Effect.tap(Effect.log("task2 done")))
// Combine the two effects together////      ┌─── Effect<[number, string], never, never>//      ▼const program = Effect.zip(task1, task2)
Effect.runPromise(program).then(console.log)// Output:// timestamp=... level=INFO fiber=#0 message="task1 done"// timestamp=... level=INFO fiber=#0 message="task2 done"// [ 1, 'hello' ]
Example (Combining Two Effects Concurrently)
import { Effect } from "effect"
const task1 = Effect.succeed(1).pipe(  Effect.delay("200 millis"),  Effect.tap(Effect.log("task1 done")))const task2 = Effect.succeed("hello").pipe(  Effect.delay("100 millis"),  Effect.tap(Effect.log("task2 done")))
// Run both effects concurrently using the concurrent optionconst program = Effect.zip(task1, task2, { concurrent: true })
Effect.runPromise(program).then(console.log)// Output:// timestamp=... level=INFO fiber=#0 message="task2 done"// timestamp=... level=INFO fiber=#0 message="task1 done"// [ 1, 'hello' ]@see ― zipWith for a version that combines the results with a custom
function.@see ― validate for a version that accumulates errors.@since ― 2.0.0zip(const task4: Effect.Effect<number, string, never>task4)12)13
14import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <[[[number, number], number], number], string>(effect: Effect.Effect<[[[number, number], number], number], string, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<[[[number, number], number], number]>Executes an effect and returns the result as a Promise.
Details
This function runs an effect and converts its result into a Promise. If the
effect succeeds, the Promise will resolve with the successful result. If
the effect fails, the Promise will reject with an error, which includes the
failure details of the effect.
The optional options parameter allows you to pass an AbortSignal for
cancellation, enabling more fine-grained control over asynchronous tasks.
When to Use
Use this function when you need to execute an effect and work with its result
in a promise-based system, such as when integrating with third-party
libraries that expect Promise results.
Example (Running a Successful Effect as a Promise)
import { Effect } from "effect"
Effect.runPromise(Effect.succeed(1)).then(console.log)// Output: 1
Example (Handling a Failing Effect as a Rejected Promise)
import { Effect } from "effect"
Effect.runPromise(Effect.fail("my error")).catch(console.error)// Output:// (FiberFailure) Error: my error@see ― runPromiseExit for a version that returns an Exit type instead
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<[[[number, number], number], number], string, never>program).Promise<[[[number, number], number], number]>.then<void, void>(onfulfilled?: ((value: [[[number, number], number], number]) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
JavaScript console mechanism provided by web browsers.
The module exports two specific components:
A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.
A global console instance configured to write to process.stdout and
process.stderr. The global console can be used without importing the node:console module.
Warning: The global console object's methods are neither consistently
synchronous like the browser APIs they resemble, nor are they consistently
asynchronous like all other Node.js streams. See the note on process I/O for
more information.
Example using the global console:
console.log('hello world');// Prints: hello world, to stdoutconsole.log('hello %s', 'world');// Prints: hello world, to stdoutconsole.error(new Error('Whoops, something bad happened'));// Prints error message and stack trace to stderr://   Error: Whoops, something bad happened//     at [eval]:5:15//     at Script.runInThisContext (node:vm:132:18)//     at Object.runInThisContext (node:vm:309:38)//     at node:internal/process/execution:77:19//     at [eval]-wrapper:6:22//     at evalScript (node:internal/process/execution:76:60)//     at node:internal/main/eval_string:23:3
const name = 'Will Robinson';console.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to stderr
Example using the Console class:
const out = getStreamSomehow();const err = getStreamSomehow();const myConsole = new console.Console(out, err);
myConsole.log('hello world');// Prints: hello world, to outmyConsole.log('hello %s', 'world');// Prints: hello world, to outmyConsole.error(new Error('Whoops, something bad happened'));// Prints: [Error: Whoops, something bad happened], to err
const name = 'Will Robinson';myConsole.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to err@see ― sourceconsole.globalThis.Console.log(message?: any, ...optionalParams: any[]): voidPrints to stdout with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to printf(3)
(the arguments are all passed to util.format()).
const count = 5;console.log('count: %d', count);// Prints: count: 5, to stdoutconsole.log('count:', count);// Prints: count: 5, to stdout
See util.format() for more information.@since ― v0.1.100log, var console: ConsoleThe console module provides a simple debugging console that is similar to the
JavaScript console mechanism provided by web browsers.
The module exports two specific components:
A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.
A global console instance configured to write to process.stdout and
process.stderr. The global console can be used without importing the node:console module.
Warning: The global console object's methods are neither consistently
synchronous like the browser APIs they resemble, nor are they consistently
asynchronous like all other Node.js streams. See the note on process I/O for
more information.
Example using the global console:
console.log('hello world');// Prints: hello world, to stdoutconsole.log('hello %s', 'world');// Prints: hello world, to stdoutconsole.error(new Error('Whoops, something bad happened'));// Prints error message and stack trace to stderr://   Error: Whoops, something bad happened//     at [eval]:5:15//     at Script.runInThisContext (node:vm:132:18)//     at Object.runInThisContext (node:vm:309:38)//     at node:internal/process/execution:77:19//     at [eval]-wrapper:6:22//     at evalScript (node:internal/process/execution:76:60)//     at node:internal/main/eval_string:23:3
const name = 'Will Robinson';console.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to stderr
Example using the Console class:
const out = getStreamSomehow();const err = getStreamSomehow();const myConsole = new console.Console(out, err);
myConsole.log('hello world');// Prints: hello world, to outmyConsole.log('hello %s', 'world');// Prints: hello world, to outmyConsole.error(new Error('Whoops, something bad happened'));// Prints: [Error: Whoops, something bad happened], to err
const name = 'Will Robinson';myConsole.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to err@see ― sourceconsole.globalThis.Console.error(message?: any, ...optionalParams: any[]): voidPrints to stderr with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to printf(3)
(the arguments are all passed to util.format()).
const code = 5;console.error('error #%d', code);// Prints: error #5, to stderrconsole.error('error', code);// Prints: error 5, to stderr
If formatting elements (e.g. %d) are not found in the first string then
util.inspect() is called on each argument and the
resulting string values are concatenated. See util.format()
for more information.@since ― v0.1.100error)15/*16Output:17task118(FiberFailure) Error: Oh uh!19*/
```
The `Effect.forEach` function behaves similarly. It applies an effectful operation to each element in a collection, but will stop when it hits the first error:
**Example** (Fail Fast with `Effect.forEach`)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const program: Effect.Effect<number[], string, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const forEach: <number, string, never, number[]>(self: number[], f: (a: number, i: number) => Effect.Effect<number, string, never>, options?: {    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard?: false | undefined;    readonly concurrentFinalizers?: boolean | undefined;} | undefined) => Effect.Effect<number[], string, never> (+3 overloads)Executes an effectful operation for each element in an Iterable.
Details
This function applies a provided operation to each element in the iterable,
producing a new effect that returns an array of results.
If any effect fails, the iteration stops immediately (short-circuiting), and
the error is propagated.
Concurrency
The concurrency option controls how many operations are performed
concurrently. By default, the operations are performed sequentially.
Discarding Results
If the discard option is set to true, the intermediate results are not
collected, and the final result of the operation is void.
Example (Applying Effects to Iterable Elements)
import { Effect, Console } from "effect"
const result = Effect.forEach([1, 2, 3, 4, 5], (n, index) =>  Console.log(`Currently at index ${index}`).pipe(Effect.as(n * 2)))
Effect.runPromise(result).then(console.log)// Output:// Currently at index 0// Currently at index 1// Currently at index 2// Currently at index 3// Currently at index 4// [ 2, 4, 6, 8, 10 ]
Example (Discarding Results)
import { Effect, Console } from "effect"
// Apply effects but discard the resultsconst result = Effect.forEach(  [1, 2, 3, 4, 5],  (n, index) =>    Console.log(`Currently at index ${index}`).pipe(Effect.as(n * 2)),  { discard: true })
Effect.runPromise(result).then(console.log)// Output:// Currently at index 0// Currently at index 1// Currently at index 2// Currently at index 3// Currently at index 4// undefined@see ― all for combining multiple effects into one.@since ― 2.0.0forEach([1, 2, 3, 4, 5], (n: numbern) => {4  if (n: numbern < 4) {5    return import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`item ${n: numbern}`).Pipeable.pipe<Effect.Effect<void, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<void, never, never>, ab: (_: Effect.Effect<void, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <number>(value: number) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<number, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
Details
This function allows you to ignore the original value inside an effect and
replace it with a constant value.
When to Use
It is useful when you no longer need the value produced by an effect but want
to ensure that the effect completes successfully with a specific constant
result instead. For instance, you can replace the value produced by a
computation with a predefined value, ignoring what was calculated before.
Example (Replacing a Value)
import { pipe, Effect } from "effect"
// Replaces the value 5 with the constant "new value"const program = pipe(Effect.succeed(5), Effect.as("new value"))
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(n: numbern))6  } else {7    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
When to Use
Use this function to explicitly signal an error in an Effect. The error
will keep propagating unless it is handled. You can handle the error with
functions like
catchAll
or
catchTag
.
Example (Creating a Failed Effect)
import { Effect } from "effect"
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(`${n: numbern} is not less that 4`)8  }9})10
11import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number[], string>(effect: Effect.Effect<number[], string, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number[]>Executes an effect and returns the result as a Promise.
Details
This function runs an effect and converts its result into a Promise. If the
effect succeeds, the Promise will resolve with the successful result. If
the effect fails, the Promise will reject with an error, which includes the
failure details of the effect.
The optional options parameter allows you to pass an AbortSignal for
cancellation, enabling more fine-grained control over asynchronous tasks.
When to Use
Use this function when you need to execute an effect and work with its result
in a promise-based system, such as when integrating with third-party
libraries that expect Promise results.
Example (Running a Successful Effect as a Promise)
import { Effect } from "effect"
Effect.runPromise(Effect.succeed(1)).then(console.log)// Output: 1
Example (Handling a Failing Effect as a Rejected Promise)
import { Effect } from "effect"
Effect.runPromise(Effect.fail("my error")).catch(console.error)// Output:// (FiberFailure) Error: my error@see ― runPromiseExit for a version that returns an Exit type instead
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<number[], string, never>program).Promise<number[]>.then<void, void>(onfulfilled?: ((value: number[]) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
JavaScript console mechanism provided by web browsers.
The module exports two specific components:
A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.
A global console instance configured to write to process.stdout and
process.stderr. The global console can be used without importing the node:console module.
Warning: The global console object's methods are neither consistently
synchronous like the browser APIs they resemble, nor are they consistently
asynchronous like all other Node.js streams. See the note on process I/O for
more information.
Example using the global console:
console.log('hello world');// Prints: hello world, to stdoutconsole.log('hello %s', 'world');// Prints: hello world, to stdoutconsole.error(new Error('Whoops, something bad happened'));// Prints error message and stack trace to stderr://   Error: Whoops, something bad happened//     at [eval]:5:15//     at Script.runInThisContext (node:vm:132:18)//     at Object.runInThisContext (node:vm:309:38)//     at node:internal/process/execution:77:19//     at [eval]-wrapper:6:22//     at evalScript (node:internal/process/execution:76:60)//     at node:internal/main/eval_string:23:3
const name = 'Will Robinson';console.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to stderr
Example using the Console class:
const out = getStreamSomehow();const err = getStreamSomehow();const myConsole = new console.Console(out, err);
myConsole.log('hello world');// Prints: hello world, to outmyConsole.log('hello %s', 'world');// Prints: hello world, to outmyConsole.error(new Error('Whoops, something bad happened'));// Prints: [Error: Whoops, something bad happened], to err
const name = 'Will Robinson';myConsole.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to err@see ― sourceconsole.globalThis.Console.log(message?: any, ...optionalParams: any[]): voidPrints to stdout with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to printf(3)
(the arguments are all passed to util.format()).
const count = 5;console.log('count: %d', count);// Prints: count: 5, to stdoutconsole.log('count:', count);// Prints: count: 5, to stdout
See util.format() for more information.@since ― v0.1.100log, var console: ConsoleThe console module provides a simple debugging console that is similar to the
JavaScript console mechanism provided by web browsers.
The module exports two specific components:
A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.
A global console instance configured to write to process.stdout and
process.stderr. The global console can be used without importing the node:console module.
Warning: The global console object's methods are neither consistently
synchronous like the browser APIs they resemble, nor are they consistently
asynchronous like all other Node.js streams. See the note on process I/O for
more information.
Example using the global console:
console.log('hello world');// Prints: hello world, to stdoutconsole.log('hello %s', 'world');// Prints: hello world, to stdoutconsole.error(new Error('Whoops, something bad happened'));// Prints error message and stack trace to stderr://   Error: Whoops, something bad happened//     at [eval]:5:15//     at Script.runInThisContext (node:vm:132:18)//     at Object.runInThisContext (node:vm:309:38)//     at node:internal/process/execution:77:19//     at [eval]-wrapper:6:22//     at evalScript (node:internal/process/execution:76:60)//     at node:internal/main/eval_string:23:3
const name = 'Will Robinson';console.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to stderr
Example using the Console class:
const out = getStreamSomehow();const err = getStreamSomehow();const myConsole = new console.Console(out, err);
myConsole.log('hello world');// Prints: hello world, to outmyConsole.log('hello %s', 'world');// Prints: hello world, to outmyConsole.error(new Error('Whoops, something bad happened'));// Prints: [Error: Whoops, something bad happened], to err
const name = 'Will Robinson';myConsole.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to err@see ― sourceconsole.globalThis.Console.error(message?: any, ...optionalParams: any[]): voidPrints to stderr with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to printf(3)
(the arguments are all passed to util.format()).
const code = 5;console.error('error #%d', code);// Prints: error #5, to stderrconsole.error('error', code);// Prints: error 5, to stderr
If formatting elements (e.g. %d) are not found in the first string then
util.inspect() is called on each argument and the
resulting string values are concatenated. See util.format()
for more information.@since ― v0.1.100error)12/*13Output:14item 115item 216item 317(FiberFailure) Error: 4 is not less that 418*/
```
However, there are cases where you may want to collect all errors rather than fail fast. In these situations, you can use functions that accumulate both successes and errors.
## validate
[](#validate)
The `Effect.validate` function is similar to `Effect.zip`, but it continues combining effects even after encountering errors, accumulating both successes and failures.
**Example** (Validating and Collecting Errors)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const task1: Effect.Effect<number, never, never>task1 = import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("task1").Pipeable.pipe<Effect.Effect<void, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<void, never, never>, ab: (_: Effect.Effect<void, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <number>(value: number) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<number, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
Details
This function allows you to ignore the original value inside an effect and
replace it with a constant value.
When to Use
It is useful when you no longer need the value produced by an effect but want
to ensure that the effect completes successfully with a specific constant
result instead. For instance, you can replace the value produced by a
computation with a predefined value, ignoring what was calculated before.
Example (Replacing a Value)
import { pipe, Effect } from "effect"
// Replaces the value 5 with the constant "new value"const program = pipe(Effect.succeed(5), Effect.as("new value"))
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(1))4const const task2: Effect.Effect<number, string, never>task2 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
When to Use
Use this function to explicitly signal an error in an Effect. The error
will keep propagating unless it is handled. You can handle the error with
functions like
catchAll
or
catchTag
.
Example (Creating a Failed Effect)
import { Effect } from "effect"
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("Oh uh!").Pipeable.pipe<Effect.Effect<never, string, never>, Effect.Effect<number, string, never>>(this: Effect.Effect<never, string, never>, ab: (_: Effect.Effect<never, string, never>) => Effect.Effect<number, string, never>): Effect.Effect<number, string, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <number>(value: number) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<number, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
Details
This function allows you to ignore the original value inside an effect and
replace it with a constant value.
When to Use
It is useful when you no longer need the value produced by an effect but want
to ensure that the effect completes successfully with a specific constant
result instead. For instance, you can replace the value produced by a
computation with a predefined value, ignoring what was calculated before.
Example (Replacing a Value)
import { pipe, Effect } from "effect"
// Replaces the value 5 with the constant "new value"const program = pipe(Effect.succeed(5), Effect.as("new value"))
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(2))5const const task3: Effect.Effect<number, never, never>task3 = import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("task2").Pipeable.pipe<Effect.Effect<void, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<void, never, never>, ab: (_: Effect.Effect<void, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <number>(value: number) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<number, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
Details
This function allows you to ignore the original value inside an effect and
replace it with a constant value.
When to Use
It is useful when you no longer need the value produced by an effect but want
to ensure that the effect completes successfully with a specific constant
result instead. For instance, you can replace the value produced by a
computation with a predefined value, ignoring what was calculated before.
Example (Replacing a Value)
import { pipe, Effect } from "effect"
// Replaces the value 5 with the constant "new value"const program = pipe(Effect.succeed(5), Effect.as("new value"))
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(3))6const const task4: Effect.Effect<number, string, never>task4 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
When to Use
Use this function to explicitly signal an error in an Effect. The error
will keep propagating unless it is handled. You can handle the error with
functions like
catchAll
or
catchTag
.
Example (Creating a Failed Effect)
import { Effect } from "effect"
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("Oh no!").Pipeable.pipe<Effect.Effect<never, string, never>, Effect.Effect<number, string, never>>(this: Effect.Effect<never, string, never>, ab: (_: Effect.Effect<never, string, never>) => Effect.Effect<number, string, never>): Effect.Effect<number, string, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <number>(value: number) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<number, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
Details
This function allows you to ignore the original value inside an effect and
replace it with a constant value.
When to Use
It is useful when you no longer need the value produced by an effect but want
to ensure that the effect completes successfully with a specific constant
result instead. For instance, you can replace the value produced by a
computation with a predefined value, ignoring what was calculated before.
Example (Replacing a Value)
import { pipe, Effect } from "effect"
// Replaces the value 5 with the constant "new value"const program = pipe(Effect.succeed(5), Effect.as("new value"))
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(4))7
8const const program: Effect.Effect<[[[number, number], number], number], string, never>program = const task1: Effect.Effect<number, never, never>task1.Pipeable.pipe<Effect.Effect<number, never, never>, Effect.Effect<[number, number], string, never>, Effect.Effect<[[number, number], number], string, never>, Effect.Effect<[[[number, number], number], number], string, never>>(this: Effect.Effect<...>, ab: (_: Effect.Effect<number, never, never>) => Effect.Effect<[number, number], string, never>, bc: (_: Effect.Effect<[number, number], string, never>) => Effect.Effect<[[number, number], number], string, never>, cd: (_: Effect.Effect<[[number, number], number], string, never>) => Effect.Effect<...>): Effect.Effect<...> (+21 overloads)pipe(9  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const validate: <number, string, never>(that: Effect.Effect<number, string, never>, options?: {    readonly concurrent?: boolean | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly concurrentFinalizers?: boolean | undefined;} | undefined) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<[A, number], string | E, R> (+1 overload)Combines multiple effects and accumulates both successes and failures.
Details
This function allows you to combine multiple effects, continuing through all
effects even if some of them fail. Unlike other functions that stop execution
upon encountering an error, this function collects all errors into a Cause.
The final result includes all successes and the accumulated failures.
By default, effects are executed sequentially, but you can control
concurrency and batching behavior using the options parameter. This
provides flexibility in scenarios where you want to maximize performance or
ensure specific ordering.
Example
import { Effect, Console } from "effect"
const task1 = Console.log("task1").pipe(Effect.as(1))const task2 = Effect.fail("Oh uh!").pipe(Effect.as(2))const task3 = Console.log("task2").pipe(Effect.as(3))const task4 = Effect.fail("Oh no!").pipe(Effect.as(4))
const program = task1.pipe(  Effect.validate(task2),  Effect.validate(task3),  Effect.validate(task4))
Effect.runPromiseExit(program).then(console.log)// Output:// task1// task2// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Sequential',//     left: { _id: 'Cause', _tag: 'Fail', failure: 'Oh uh!' },//     right: { _id: 'Cause', _tag: 'Fail', failure: 'Oh no!' }//   }// }@see ― zip for a version that stops at the first error.@since ― 2.0.0validate(const task2: Effect.Effect<number, string, never>task2),10  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const validate: <number, never, never>(that: Effect.Effect<number, never, never>, options?: {    readonly concurrent?: boolean | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly concurrentFinalizers?: boolean | undefined;} | undefined) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<[A, number], E, R> (+1 overload)Combines multiple effects and accumulates both successes and failures.
Details
This function allows you to combine multiple effects, continuing through all
effects even if some of them fail. Unlike other functions that stop execution
upon encountering an error, this function collects all errors into a Cause.
The final result includes all successes and the accumulated failures.
By default, effects are executed sequentially, but you can control
concurrency and batching behavior using the options parameter. This
provides flexibility in scenarios where you want to maximize performance or
ensure specific ordering.
Example
import { Effect, Console } from "effect"
const task1 = Console.log("task1").pipe(Effect.as(1))const task2 = Effect.fail("Oh uh!").pipe(Effect.as(2))const task3 = Console.log("task2").pipe(Effect.as(3))const task4 = Effect.fail("Oh no!").pipe(Effect.as(4))
const program = task1.pipe(  Effect.validate(task2),  Effect.validate(task3),  Effect.validate(task4))
Effect.runPromiseExit(program).then(console.log)// Output:// task1// task2// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Sequential',//     left: { _id: 'Cause', _tag: 'Fail', failure: 'Oh uh!' },//     right: { _id: 'Cause', _tag: 'Fail', failure: 'Oh no!' }//   }// }@see ― zip for a version that stops at the first error.@since ― 2.0.0validate(const task3: Effect.Effect<number, never, never>task3),11  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const validate: <number, string, never>(that: Effect.Effect<number, string, never>, options?: {    readonly concurrent?: boolean | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly concurrentFinalizers?: boolean | undefined;} | undefined) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<[A, number], string | E, R> (+1 overload)Combines multiple effects and accumulates both successes and failures.
Details
This function allows you to combine multiple effects, continuing through all
effects even if some of them fail. Unlike other functions that stop execution
upon encountering an error, this function collects all errors into a Cause.
The final result includes all successes and the accumulated failures.
By default, effects are executed sequentially, but you can control
concurrency and batching behavior using the options parameter. This
provides flexibility in scenarios where you want to maximize performance or
ensure specific ordering.
Example
import { Effect, Console } from "effect"
const task1 = Console.log("task1").pipe(Effect.as(1))const task2 = Effect.fail("Oh uh!").pipe(Effect.as(2))const task3 = Console.log("task2").pipe(Effect.as(3))const task4 = Effect.fail("Oh no!").pipe(Effect.as(4))
const program = task1.pipe(  Effect.validate(task2),  Effect.validate(task3),  Effect.validate(task4))
Effect.runPromiseExit(program).then(console.log)// Output:// task1// task2// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Sequential',//     left: { _id: 'Cause', _tag: 'Fail', failure: 'Oh uh!' },//     right: { _id: 'Cause', _tag: 'Fail', failure: 'Oh no!' }//   }// }@see ― zip for a version that stops at the first error.@since ― 2.0.0validate(const task4: Effect.Effect<number, string, never>task4)12)13
14import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <[[[number, number], number], number], string>(effect: Effect.Effect<[[[number, number], number], number], string, never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<[[[number, number], number], number], string>>Runs an effect and returns a Promise that resolves to an Exit,
representing the outcome.
Details
This function executes an effect and resolves to an Exit object. The Exit
type provides detailed information about the result of the effect:
If the effect succeeds, the Exit will be of type Success and include
the value produced by the effect.
If the effect fails, the Exit will be of type Failure and contain a
Cause object, detailing the failure.
Using this function allows you to examine both successful results and failure
cases in a unified way, while still leveraging Promise for handling the
asynchronous behavior of the effect.
When to Use
Use this function when you need to understand the outcome of an effect,
whether it succeeded or failed, and want to work with this result using
Promise syntax. This is particularly useful when integrating with systems
that rely on promises but need more detailed error handling than a simple
rejection.
Example (Handling Results as Exit)
import { Effect } from "effect"
// Execute a successful effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.succeed(1)).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Success",//   value: 1// }
// Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const program: Effect.Effect<[[[number, number], number], number], string, never>program).Promise<Exit<[[[number, number], number], number], string>>.then<void, never>(onfulfilled?: ((value: Exit<[[[number, number], number], number], string>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
JavaScript console mechanism provided by web browsers.
The module exports two specific components:
A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.
A global console instance configured to write to process.stdout and
process.stderr. The global console can be used without importing the node:console module.
Warning: The global console object's methods are neither consistently
synchronous like the browser APIs they resemble, nor are they consistently
asynchronous like all other Node.js streams. See the note on process I/O for
more information.
Example using the global console:
console.log('hello world');// Prints: hello world, to stdoutconsole.log('hello %s', 'world');// Prints: hello world, to stdoutconsole.error(new Error('Whoops, something bad happened'));// Prints error message and stack trace to stderr://   Error: Whoops, something bad happened//     at [eval]:5:15//     at Script.runInThisContext (node:vm:132:18)//     at Object.runInThisContext (node:vm:309:38)//     at node:internal/process/execution:77:19//     at [eval]-wrapper:6:22//     at evalScript (node:internal/process/execution:76:60)//     at node:internal/main/eval_string:23:3
const name = 'Will Robinson';console.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to stderr
Example using the Console class:
const out = getStreamSomehow();const err = getStreamSomehow();const myConsole = new console.Console(out, err);
myConsole.log('hello world');// Prints: hello world, to outmyConsole.log('hello %s', 'world');// Prints: hello world, to outmyConsole.error(new Error('Whoops, something bad happened'));// Prints: [Error: Whoops, something bad happened], to err
const name = 'Will Robinson';myConsole.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to err@see ― sourceconsole.globalThis.Console.log(message?: any, ...optionalParams: any[]): voidPrints to stdout with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to printf(3)
(the arguments are all passed to util.format()).
const count = 5;console.log('count: %d', count);// Prints: count: 5, to stdoutconsole.log('count:', count);// Prints: count: 5, to stdout
See util.format() for more information.@since ― v0.1.100log)15/*16Output:17task118task219{20  _id: 'Exit',21  _tag: 'Failure',22  cause: {23    _id: 'Cause',24    _tag: 'Sequential',25    left: { _id: 'Cause', _tag: 'Fail', failure: 'Oh uh!' },26    right: { _id: 'Cause', _tag: 'Fail', failure: 'Oh no!' }27  }28}29*/
```
## validateAll
[](#validateall)
The `Effect.validateAll` function is similar to the `Effect.forEach` function. It transforms all elements of a collection using the provided effectful operation, but it collects all errors in the error channel, as well as the success values in the success channel.
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3//      ┌─── Effect<number[], string[], never>4//      ▼5const const program: Effect.Effect<number[], [string, ...string[]], never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const validateAll: <number, number, string, never>(elements: Iterable<number>, f: (a: number, i: number) => Effect.Effect<number, string, never>, options?: {    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard?: false | undefined;    readonly concurrentFinalizers?: boolean | undefined;} | undefined) => Effect.Effect<number[], [string, ...string[]], never> (+3 overloads)Applies an effectful operation to each element in a collection while
collecting both successes and failures.
Details
This function allows you to apply an effectful operation to every item in a
collection.
Unlike
forEach
, which would stop at the first error, this function
continues processing all elements, accumulating both successes and failures.
When to Use
Use this function when you want to process every item in a collection, even
if some items fail. This is particularly useful when you need to perform
operations on all elements without halting due to an error.
Keep in mind that if there are any failures, all successes will be lost,
so this function is not suitable when you need to keep the successful results
in case of errors.
Example
import { Effect, Console } from "effect"
//      ┌─── Effect<number[], [string, ...string[]], never>//      ▼const program = Effect.validateAll([1, 2, 3, 4, 5], (n) => {  if (n < 4) {    return Console.log(`item ${n}`).pipe(Effect.as(n))  } else {    return Effect.fail(`${n} is not less that 4`)  }})
Effect.runPromiseExit(program).then(console.log)// Output:// item 1// item 2// item 3// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: [ '4 is not less that 4', '5 is not less that 4' ]//   }// }@see ― forEach for a similar function that stops at the first error.@see ― partition when you need to separate successes and failures
instead of losing successes with errors.@since ― 2.0.0validateAll([1, 2, 3, 4, 5], (n: numbern) => {6  if (n: numbern < 4) {7    return import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`item ${n: numbern}`).Pipeable.pipe<Effect.Effect<void, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<void, never, never>, ab: (_: Effect.Effect<void, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <number>(value: number) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<number, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
Details
This function allows you to ignore the original value inside an effect and
replace it with a constant value.
When to Use
It is useful when you no longer need the value produced by an effect but want
to ensure that the effect completes successfully with a specific constant
result instead. For instance, you can replace the value produced by a
computation with a predefined value, ignoring what was calculated before.
Example (Replacing a Value)
import { pipe, Effect } from "effect"
// Replaces the value 5 with the constant "new value"const program = pipe(Effect.succeed(5), Effect.as("new value"))
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(n: numbern))8  } else {9    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
When to Use
Use this function to explicitly signal an error in an Effect. The error
will keep propagating unless it is handled. You can handle the error with
functions like
catchAll
or
catchTag
.
Example (Creating a Failed Effect)
import { Effect } from "effect"
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(`${n: numbern} is not less that 4`)10  }11})12
13import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <number[], [string, ...string[]]>(effect: Effect.Effect<number[], [string, ...string[]], never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<number[], [string, ...string[]]>>Runs an effect and returns a Promise that resolves to an Exit,
representing the outcome.
Details
This function executes an effect and resolves to an Exit object. The Exit
type provides detailed information about the result of the effect:
If the effect succeeds, the Exit will be of type Success and include
the value produced by the effect.
If the effect fails, the Exit will be of type Failure and contain a
Cause object, detailing the failure.
Using this function allows you to examine both successful results and failure
cases in a unified way, while still leveraging Promise for handling the
asynchronous behavior of the effect.
When to Use
Use this function when you need to understand the outcome of an effect,
whether it succeeded or failed, and want to work with this result using
Promise syntax. This is particularly useful when integrating with systems
that rely on promises but need more detailed error handling than a simple
rejection.
Example (Handling Results as Exit)
import { Effect } from "effect"
// Execute a successful effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.succeed(1)).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Success",//   value: 1// }
// Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const program: Effect.Effect<number[], [string, ...string[]], never>program).Promise<Exit<number[], [string, ...string[]]>>.then<void, never>(onfulfilled?: ((value: Exit<number[], [string, ...string[]]>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
JavaScript console mechanism provided by web browsers.
The module exports two specific components:
A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.
A global console instance configured to write to process.stdout and
process.stderr. The global console can be used without importing the node:console module.
Warning: The global console object's methods are neither consistently
synchronous like the browser APIs they resemble, nor are they consistently
asynchronous like all other Node.js streams. See the note on process I/O for
more information.
Example using the global console:
console.log('hello world');// Prints: hello world, to stdoutconsole.log('hello %s', 'world');// Prints: hello world, to stdoutconsole.error(new Error('Whoops, something bad happened'));// Prints error message and stack trace to stderr://   Error: Whoops, something bad happened//     at [eval]:5:15//     at Script.runInThisContext (node:vm:132:18)//     at Object.runInThisContext (node:vm:309:38)//     at node:internal/process/execution:77:19//     at [eval]-wrapper:6:22//     at evalScript (node:internal/process/execution:76:60)//     at node:internal/main/eval_string:23:3
const name = 'Will Robinson';console.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to stderr
Example using the Console class:
const out = getStreamSomehow();const err = getStreamSomehow();const myConsole = new console.Console(out, err);
myConsole.log('hello world');// Prints: hello world, to outmyConsole.log('hello %s', 'world');// Prints: hello world, to outmyConsole.error(new Error('Whoops, something bad happened'));// Prints: [Error: Whoops, something bad happened], to err
const name = 'Will Robinson';myConsole.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to err@see ― sourceconsole.globalThis.Console.log(message?: any, ...optionalParams: any[]): voidPrints to stdout with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to printf(3)
(the arguments are all passed to util.format()).
const count = 5;console.log('count: %d', count);// Prints: count: 5, to stdoutconsole.log('count:', count);// Prints: count: 5, to stdout
See util.format() for more information.@since ― v0.1.100log)14/*15Output:16item 117item 218item 319{20  _id: 'Exit',21  _tag: 'Failure',22  cause: {23    _id: 'Cause',24    _tag: 'Fail',25    failure: [ '4 is not less that 4', '5 is not less that 4' ]26  }27}28*/
```
Loss of Successes
Note that this function is lossy, which means that if there are any errors, all successes will be lost. If you need to preserve both successes and failures, consider using [Effect.partition](#partition).
## validateFirst
[](#validatefirst)
The `Effect.validateFirst` function is similar to `Effect.validateAll` but it returns the first successful result, or all errors if none succeed.
**Example** (Returning the First Success)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3//      ┌─── Effect<number, string[], never>4//      ▼5const const program: Effect.Effect<number, string[], never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const validateFirst: <number, number, string, never>(elements: Iterable<number>, f: (a: number, i: number) => Effect.Effect<number, string, never>, options?: {    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly concurrentFinalizers?: boolean | undefined;} | undefined) => Effect.Effect<number, string[], never> (+1 overload)This function is similar to
validateAll
but with a key difference: it
returns the first successful result or all errors if none of the operations
succeed.
Details
This function processes a collection of elements and applies an effectful
operation to each. Unlike
validateAll
, which accumulates both
successes and failures, Effect.validateFirst stops and returns the first
success it encounters. If no success occurs, it returns all accumulated
errors. This can be useful when you are interested in the first successful
result and want to avoid processing further once a valid result is found.
Example
import { Effect, Console } from "effect"
//      ┌─── Effect<number, string[], never>//      ▼const program = Effect.validateFirst([1, 2, 3, 4, 5], (n) => {  if (n < 4) {    return Effect.fail(`${n} is not less that 4`)  } else {    return Console.log(`item ${n}`).pipe(Effect.as(n))  }})
Effect.runPromise(program).then(console.log, console.error)// Output:// item 4// 4@see ― validateAll for a similar function that accumulates all results.@see ― firstSuccessOf for a similar function that processes multiple
effects and returns the first successful one or the last error.@since ― 2.0.0validateFirst([1, 2, 3, 4, 5], (n: numbern) => {6  if (n: numbern < 4) {7    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
When to Use
Use this function to explicitly signal an error in an Effect. The error
will keep propagating unless it is handled. You can handle the error with
functions like
catchAll
or
catchTag
.
Example (Creating a Failed Effect)
import { Effect } from "effect"
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(`${n: numbern} is not less that 4`)8  } else {9    return import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`item ${n: numbern}`).Pipeable.pipe<Effect.Effect<void, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<void, never, never>, ab: (_: Effect.Effect<void, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <number>(value: number) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<number, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
Details
This function allows you to ignore the original value inside an effect and
replace it with a constant value.
When to Use
It is useful when you no longer need the value produced by an effect but want
to ensure that the effect completes successfully with a specific constant
result instead. For instance, you can replace the value produced by a
computation with a predefined value, ignoring what was calculated before.
Example (Replacing a Value)
import { pipe, Effect } from "effect"
// Replaces the value 5 with the constant "new value"const program = pipe(Effect.succeed(5), Effect.as("new value"))
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(n: numbern))10  }11})12
13import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number, string[]>(effect: Effect.Effect<number, string[], never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number>Executes an effect and returns the result as a Promise.
Details
This function runs an effect and converts its result into a Promise. If the
effect succeeds, the Promise will resolve with the successful result. If
the effect fails, the Promise will reject with an error, which includes the
failure details of the effect.
The optional options parameter allows you to pass an AbortSignal for
cancellation, enabling more fine-grained control over asynchronous tasks.
When to Use
Use this function when you need to execute an effect and work with its result
in a promise-based system, such as when integrating with third-party
libraries that expect Promise results.
Example (Running a Successful Effect as a Promise)
import { Effect } from "effect"
Effect.runPromise(Effect.succeed(1)).then(console.log)// Output: 1
Example (Handling a Failing Effect as a Rejected Promise)
import { Effect } from "effect"
Effect.runPromise(Effect.fail("my error")).catch(console.error)// Output:// (FiberFailure) Error: my error@see ― runPromiseExit for a version that returns an Exit type instead
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<number, string[], never>program).Promise<number>.then<void, void>(onfulfilled?: ((value: number) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
JavaScript console mechanism provided by web browsers.
The module exports two specific components:
A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.
A global console instance configured to write to process.stdout and
process.stderr. The global console can be used without importing the node:console module.
Warning: The global console object's methods are neither consistently
synchronous like the browser APIs they resemble, nor are they consistently
asynchronous like all other Node.js streams. See the note on process I/O for
more information.
Example using the global console:
console.log('hello world');// Prints: hello world, to stdoutconsole.log('hello %s', 'world');// Prints: hello world, to stdoutconsole.error(new Error('Whoops, something bad happened'));// Prints error message and stack trace to stderr://   Error: Whoops, something bad happened//     at [eval]:5:15//     at Script.runInThisContext (node:vm:132:18)//     at Object.runInThisContext (node:vm:309:38)//     at node:internal/process/execution:77:19//     at [eval]-wrapper:6:22//     at evalScript (node:internal/process/execution:76:60)//     at node:internal/main/eval_string:23:3
const name = 'Will Robinson';console.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to stderr
Example using the Console class:
const out = getStreamSomehow();const err = getStreamSomehow();const myConsole = new console.Console(out, err);
myConsole.log('hello world');// Prints: hello world, to outmyConsole.log('hello %s', 'world');// Prints: hello world, to outmyConsole.error(new Error('Whoops, something bad happened'));// Prints: [Error: Whoops, something bad happened], to err
const name = 'Will Robinson';myConsole.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to err@see ― sourceconsole.globalThis.Console.log(message?: any, ...optionalParams: any[]): voidPrints to stdout with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to printf(3)
(the arguments are all passed to util.format()).
const count = 5;console.log('count: %d', count);// Prints: count: 5, to stdoutconsole.log('count:', count);// Prints: count: 5, to stdout
See util.format() for more information.@since ― v0.1.100log, var console: ConsoleThe console module provides a simple debugging console that is similar to the
JavaScript console mechanism provided by web browsers.
The module exports two specific components:
A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.
A global console instance configured to write to process.stdout and
process.stderr. The global console can be used without importing the node:console module.
Warning: The global console object's methods are neither consistently
synchronous like the browser APIs they resemble, nor are they consistently
asynchronous like all other Node.js streams. See the note on process I/O for
more information.
Example using the global console:
console.log('hello world');// Prints: hello world, to stdoutconsole.log('hello %s', 'world');// Prints: hello world, to stdoutconsole.error(new Error('Whoops, something bad happened'));// Prints error message and stack trace to stderr://   Error: Whoops, something bad happened//     at [eval]:5:15//     at Script.runInThisContext (node:vm:132:18)//     at Object.runInThisContext (node:vm:309:38)//     at node:internal/process/execution:77:19//     at [eval]-wrapper:6:22//     at evalScript (node:internal/process/execution:76:60)//     at node:internal/main/eval_string:23:3
const name = 'Will Robinson';console.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to stderr
Example using the Console class:
const out = getStreamSomehow();const err = getStreamSomehow();const myConsole = new console.Console(out, err);
myConsole.log('hello world');// Prints: hello world, to outmyConsole.log('hello %s', 'world');// Prints: hello world, to outmyConsole.error(new Error('Whoops, something bad happened'));// Prints: [Error: Whoops, something bad happened], to err
const name = 'Will Robinson';myConsole.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to err@see ― sourceconsole.globalThis.Console.error(message?: any, ...optionalParams: any[]): voidPrints to stderr with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to printf(3)
(the arguments are all passed to util.format()).
const code = 5;console.error('error #%d', code);// Prints: error #5, to stderrconsole.error('error', code);// Prints: error 5, to stderr
If formatting elements (e.g. %d) are not found in the first string then
util.inspect() is called on each argument and the
resulting string values are concatenated. See util.format()
for more information.@since ― v0.1.100error)14/*15Output:16item 417418*/
```
Notice that `Effect.validateFirst` returns a single `number` as the success type, rather than an array of results like `Effect.validateAll`.
## partition
[](#partition)
The `Effect.partition` function processes an iterable and applies an effectful function to each element. It returns a tuple, where the first part contains all the failures, and the second part contains all the successes.
**Example** (Partitioning Successes and Failures)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3//      ┌─── Effect<[string[], number[]], never, never>4//      ▼5const const program: Effect.Effect<[excluded: string[], satisfying: number[]], never, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const partition: <number, number, string, never>(elements: Iterable<number>, f: (a: number, i: number) => Effect.Effect<number, string, never>, options?: {    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly concurrentFinalizers?: boolean | undefined;} | undefined) => Effect.Effect<[excluded: string[], satisfying: number[]], never, never> (+1 overload)Processes an iterable and applies an effectful function to each element,
categorizing the results into successes and failures.
Details
This function processes each element in the provided iterable by applying an
effectful function to it. The results are then categorized into two separate
lists: one for failures and another for successes. This separation allows you
to handle the two categories differently. Failures are collected in a list
without interrupting the processing of the remaining elements, so the
operation continues even if some elements fail. This is particularly useful
when you need to handle both successful and failed results separately,
without stopping the entire process on encountering a failure.
When to Use
Use this function when you want to process a collection of items and handle
errors or failures without interrupting the processing of other items. It's
useful when you need to distinguish between successful and failed results and
process them separately, for example, when logging errors while continuing to
work with valid data. The function ensures that failures are captured, while
successes are processed normally.
Example
import { Effect } from "effect"
//      ┌─── Effect<[string[], number[]], never, never>//      ▼const program = Effect.partition([0, 1, 2, 3, 4], (n) => {  if (n % 2 === 0) {    return Effect.succeed(n)  } else {    return Effect.fail(`${n} is not even`)  }})
Effect.runPromise(program).then(console.log, console.error)// Output:// [ [ '1 is not even', '3 is not even' ], [ 0, 2, 4 ] ]@see ― validateAll for a function that either collects all failures or all successes.@see ― validateFirst for a function that stops at the first success.@since ― 2.0.0partition([0, 1, 2, 3, 4], (n: numbern) => {6  if (n: numbern % 2 === 0) {7    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(n: numbern)8  } else {9    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
When to Use
Use this function to explicitly signal an error in an Effect. The error
will keep propagating unless it is handled. You can handle the error with
functions like
catchAll
or
catchTag
.
Example (Creating a Failed Effect)
import { Effect } from "effect"
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(`${n: numbern} is not even`)10  }11})12
13import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <[excluded: string[], satisfying: number[]], never>(effect: Effect.Effect<[excluded: string[], satisfying: number[]], never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<[excluded: string[], satisfying: number[]]>Executes an effect and returns the result as a Promise.
Details
This function runs an effect and converts its result into a Promise. If the
effect succeeds, the Promise will resolve with the successful result. If
the effect fails, the Promise will reject with an error, which includes the
failure details of the effect.
The optional options parameter allows you to pass an AbortSignal for
cancellation, enabling more fine-grained control over asynchronous tasks.
When to Use
Use this function when you need to execute an effect and work with its result
in a promise-based system, such as when integrating with third-party
libraries that expect Promise results.
Example (Running a Successful Effect as a Promise)
import { Effect } from "effect"
Effect.runPromise(Effect.succeed(1)).then(console.log)// Output: 1
Example (Handling a Failing Effect as a Rejected Promise)
import { Effect } from "effect"
Effect.runPromise(Effect.fail("my error")).catch(console.error)// Output:// (FiberFailure) Error: my error@see ― runPromiseExit for a version that returns an Exit type instead
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<[excluded: string[], satisfying: number[]], never, never>program).Promise<[excluded: string[], satisfying: number[]]>.then<void, void>(onfulfilled?: ((value: [excluded: string[], satisfying: number[]]) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
JavaScript console mechanism provided by web browsers.
The module exports two specific components:
A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.
A global console instance configured to write to process.stdout and
process.stderr. The global console can be used without importing the node:console module.
Warning: The global console object's methods are neither consistently
synchronous like the browser APIs they resemble, nor are they consistently
asynchronous like all other Node.js streams. See the note on process I/O for
more information.
Example using the global console:
console.log('hello world');// Prints: hello world, to stdoutconsole.log('hello %s', 'world');// Prints: hello world, to stdoutconsole.error(new Error('Whoops, something bad happened'));// Prints error message and stack trace to stderr://   Error: Whoops, something bad happened//     at [eval]:5:15//     at Script.runInThisContext (node:vm:132:18)//     at Object.runInThisContext (node:vm:309:38)//     at node:internal/process/execution:77:19//     at [eval]-wrapper:6:22//     at evalScript (node:internal/process/execution:76:60)//     at node:internal/main/eval_string:23:3
const name = 'Will Robinson';console.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to stderr
Example using the Console class:
const out = getStreamSomehow();const err = getStreamSomehow();const myConsole = new console.Console(out, err);
myConsole.log('hello world');// Prints: hello world, to outmyConsole.log('hello %s', 'world');// Prints: hello world, to outmyConsole.error(new Error('Whoops, something bad happened'));// Prints: [Error: Whoops, something bad happened], to err
const name = 'Will Robinson';myConsole.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to err@see ― sourceconsole.Console.log(message?: any, ...optionalParams: any[]): voidPrints to stdout with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to printf(3)
(the arguments are all passed to util.format()).
const count = 5;console.log('count: %d', count);// Prints: count: 5, to stdoutconsole.log('count:', count);// Prints: count: 5, to stdout
See util.format() for more information.@since ― v0.1.100log, var console: ConsoleThe console module provides a simple debugging console that is similar to the
JavaScript console mechanism provided by web browsers.
The module exports two specific components:
A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.
A global console instance configured to write to process.stdout and
process.stderr. The global console can be used without importing the node:console module.
Warning: The global console object's methods are neither consistently
synchronous like the browser APIs they resemble, nor are they consistently
asynchronous like all other Node.js streams. See the note on process I/O for
more information.
Example using the global console:
console.log('hello world');// Prints: hello world, to stdoutconsole.log('hello %s', 'world');// Prints: hello world, to stdoutconsole.error(new Error('Whoops, something bad happened'));// Prints error message and stack trace to stderr://   Error: Whoops, something bad happened//     at [eval]:5:15//     at Script.runInThisContext (node:vm:132:18)//     at Object.runInThisContext (node:vm:309:38)//     at node:internal/process/execution:77:19//     at [eval]-wrapper:6:22//     at evalScript (node:internal/process/execution:76:60)//     at node:internal/main/eval_string:23:3
const name = 'Will Robinson';console.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to stderr
Example using the Console class:
const out = getStreamSomehow();const err = getStreamSomehow();const myConsole = new console.Console(out, err);
myConsole.log('hello world');// Prints: hello world, to outmyConsole.log('hello %s', 'world');// Prints: hello world, to outmyConsole.error(new Error('Whoops, something bad happened'));// Prints: [Error: Whoops, something bad happened], to err
const name = 'Will Robinson';myConsole.warn(`Danger ${name}! Danger!`);// Prints: Danger Will Robinson! Danger!, to err@see ― sourceconsole.Console.error(message?: any, ...optionalParams: any[]): voidPrints to stderr with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to printf(3)
(the arguments are all passed to util.format()).
const code = 5;console.error('error #%d', code);// Prints: error #5, to stderrconsole.error('error', code);// Prints: error 5, to stderr
If formatting elements (e.g. %d) are not found in the first string then
util.inspect() is called on each argument and the
resulting string values are concatenated. See util.format()
for more information.@since ― v0.1.100error)14/*15Output:16[ [ '1 is not even', '3 is not even' ], [ 0, 2, 4 ] ]17*/
```
This operator is an unexceptional effect, meaning the error channel type is `never`. Failures are collected without stopping the effect, so the entire operation completes and returns both errors and successes.
[Edit page](https://github.com/Effect-TS/website/edit/main/content/src/content/docs/docs/error-management/error-accumulation.mdx)
[Previous  
Sandboxing](/docs/error-management/sandboxing/) [Next  
Error Channel Operations](/docs/error-management/error-channel-operations/)
