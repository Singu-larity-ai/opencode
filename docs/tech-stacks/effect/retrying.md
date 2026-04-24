---
title: "Retrying"
source: "https://effect.website/docs/retrying/"
description: "Effect documentation - Retrying"
---

# Retrying

[Docs](/docs/) [Blog](/blog/) [Podcast](/podcast/) [Play](/play/)
On this page
## On this page
-   [Overview](#_top)
-   [retry](#retry)
-   [retryOrElse](#retryorelse)
# Retrying
In software development, it’s common to encounter situations where an operation may fail temporarily due to various factors such as network issues, resource unavailability, or external dependencies. In such cases, it’s often desirable to retry the operation automatically, allowing it to succeed eventually.
Retrying is a powerful mechanism to handle transient failures and ensure the successful execution of critical operations. In Effect retrying is made simple and flexible with built-in functions and scheduling strategies.
In this guide, we will explore the concept of retrying in Effect and learn how to use the `retry` and `retryOrElse` functions to handle failure scenarios. We’ll see how to define retry policies using schedules, which dictate when and how many times the operation should be retried.
Whether you’re working on network requests, database interactions, or any other potentially error-prone operations, mastering the retrying capabilities of effect can significantly enhance the resilience and reliability of your applications.
## retry
[](#retry)
The `Effect.retry` function takes an effect and a [Schedule](/docs/scheduling/introduction/) policy, and will automatically retry the effect if it fails, following the rules of the policy.
If the effect ultimately succeeds, the result will be returned.
If the maximum retries are exhausted and the effect still fails, the failure is propagated.
This can be useful when dealing with intermittent failures, such as network issues or temporary resource unavailability. By defining a retry policy, you can control the number of retries, the delay between them, and when to stop retrying.
**Example** (Retrying with a Fixed Delay)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ScheduleSchedule } from "effect"2
3let let count: numbercount = 04
5// Simulates an effect with possible failures6const const task: Effect.Effect<string, Error, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const async: <string, Error, never>(resume: (callback: (_: Effect.Effect<string, Error, never>) => void, signal: AbortSignal) => void | Effect.Effect<void, never, never>, blockingOn?: FiberId) => Effect.Effect<string, Error, never>Creates an Effect from a callback-based asynchronous function.
Details
The resume function:
Must be called exactly once. Any additional calls will be ignored.
Can return an optional Effect that will be run if the Fiber executing
this Effect is interrupted. This can be useful in scenarios where you
need to handle resource cleanup if the operation is interrupted.
Can receive an AbortSignal to handle interruption if needed.
The FiberId of the fiber that may complete the async callback may also be
specified using the blockingOn argument. This is called the "blocking
fiber" because it suspends the fiber executing the async effect (i.e.
semantically blocks the fiber from making progress). Specifying this fiber id
in cases where it is known will improve diagnostics, but not affect the
behavior of the returned effect.
When to Use
Use Effect.async when dealing with APIs that use callback-style instead of
async/await or Promise.
Example (Wrapping a Callback API)
import { Effect } from "effect"import * as NodeFS from "node:fs"
const readFile = (filename: string) =>  Effect.async<Buffer, Error>((resume) => {    NodeFS.readFile(filename, (error, data) => {      if (error) {        // Resume with a failed Effect if an error occurs        resume(Effect.fail(error))      } else {        // Resume with a succeeded Effect if successful        resume(Effect.succeed(data))      }    })  })
//      ┌─── Effect<Buffer, Error, never>//      ▼const program = readFile("example.txt")
Example (Handling Interruption with Cleanup)
import { Effect, Fiber } from "effect"import * as NodeFS from "node:fs"
// Simulates a long-running operation to write to a fileconst writeFileWithCleanup = (filename: string, data: string) =>  Effect.async<void, Error>((resume) => {    const writeStream = NodeFS.createWriteStream(filename)
    // Start writing data to the file    writeStream.write(data)
    // When the stream is finished, resume with success    writeStream.on("finish", () => resume(Effect.void))
    // In case of an error during writing, resume with failure    writeStream.on("error", (err) => resume(Effect.fail(err)))
    // Handle interruption by returning a cleanup effect    return Effect.sync(() => {      console.log(`Cleaning up ${filename}`)      NodeFS.unlinkSync(filename)    })  })
const program = Effect.gen(function* () {  const fiber = yield* Effect.fork(    writeFileWithCleanup("example.txt", "Some long data...")  )  // Simulate interrupting the fiber after 1 second  yield* Effect.sleep("1 second")  yield* Fiber.interrupt(fiber) // This will trigger the cleanup})
// Run the programEffect.runPromise(program)// Output:// Cleaning up example.txt
Example (Handling Interruption with AbortSignal)
import { Effect, Fiber } from "effect"
// A task that supports interruption using AbortSignalconst interruptibleTask = Effect.async<void, Error>((resume, signal) => {  // Handle interruption  signal.addEventListener("abort", () => {    console.log("Abort signal received")    clearTimeout(timeoutId)  })
  // Simulate a long-running task  const timeoutId = setTimeout(() => {    console.log("Operation completed")    resume(Effect.void)  }, 2000)})
const program = Effect.gen(function* () {  const fiber = yield* Effect.fork(interruptibleTask)  // Simulate interrupting the fiber after 1 second  yield* Effect.sleep("1 second")  yield* Fiber.interrupt(fiber)})
// Run the programEffect.runPromise(program)// Output:// Abort signal received@since ― 2.0.0async<string, interface ErrorError>((resume: (_: Effect.Effect<string, Error, never>) => voidresume) => {7  if (let count: numbercount <= 2) {8    let count: numbercount++9    var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("failure")10    resume: (_: Effect.Effect<string, Error, never>) => voidresume(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <Error>(error: Error) => Effect.Effect<never, Error, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(new var Error: ErrorConstructornew (message?: string) => ErrorError()))11  } else {12    var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("success")13    resume: (_: Effect.Effect<string, Error, never>) => voidresume(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("yay!"))14  }15})16
17// Define a repetition policy using a fixed delay between retries18const const policy: Schedule.Schedule<number, unknown, never>policy = import ScheduleSchedule.const fixed: (interval: DurationInput) => Schedule.Schedule<number>Creates a schedule that recurs at a fixed interval.
Details
This schedule executes at regular, evenly spaced intervals, returning the
number of times it has run so far. If the action being executed takes longer
than the interval, the next execution will happen immediately to prevent
"pile-ups," ensuring that the schedule remains consistent without overlapping
executions.
|-----interval-----|-----interval-----|-----interval-----||---------action--------||action|-----|action|-----------|@see ― spaced If you need to run from the end of the last execution.@since ― 2.0.0fixed("100 millis")19
20const const repeated: Effect.Effect<string, Error, never>repeated = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const retry: <string, Error, never, number, never>(self: Effect.Effect<string, Error, never>, policy: Schedule.Schedule<number, Error, never>) => Effect.Effect<string, Error, never> (+3 overloads)Retries a failing effect based on a defined retry policy.
Details
The Effect.retry function takes an effect and a
Schedule
policy,
and will automatically retry the effect if it fails, following the rules of
the policy.
If the effect ultimately succeeds, the result will be returned.
If the maximum retries are exhausted and the effect still fails, the failure
is propagated.
When to Use
This can be useful when dealing with intermittent failures, such as network
issues or temporary resource unavailability. By defining a retry policy, you
can control the number of retries, the delay between them, and when to stop
retrying.
Example (Retrying with a Fixed Delay)
import { Effect, Schedule } from "effect"
let count = 0
// Simulates an effect with possible failuresconst task = Effect.async<string, Error>((resume) => {  if (count <= 2) {    count++    console.log("failure")    resume(Effect.fail(new Error()))  } else {    console.log("success")    resume(Effect.succeed("yay!"))  }})
// Define a repetition policy using a fixed delay between retriesconst policy = Schedule.fixed("100 millis")
const repeated = Effect.retry(task, policy)
Effect.runPromise(repeated).then(console.log)// Output:// failure// failure// failure// success// yay!
Example (Retrying a Task up to 5 times)
import { Effect } from "effect"
let count = 0
// Simulates an effect with possible failuresconst task = Effect.async<string, Error>((resume) => {  if (count <= 2) {    count++    console.log("failure")    resume(Effect.fail(new Error()))  } else {    console.log("success")    resume(Effect.succeed("yay!"))  }})
// Retry the task up to 5 timesEffect.runPromise(Effect.retry(task, { times: 5 })).then(console.log)// Output:// failure// failure// failure// success
Example (Retrying Until a Specific Condition is Met)
import { Effect } from "effect"
let count = 0
// Define an effect that simulates varying error on each invocationconst action = Effect.failSync(() => {  console.log(`Action called ${++count} time(s)`)  return `Error ${count}`})
// Retry the action until a specific condition is metconst program = Effect.retry(action, {  until: (err) => err === "Error 3"})
Effect.runPromiseExit(program).then(console.log)// Output:// Action called 1 time(s)// Action called 2 time(s)// Action called 3 time(s)// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: { _id: 'Cause', _tag: 'Fail', failure: 'Error 3' }// }@see ― retryOrElse for a version that allows you to run a fallback.@see ― repeat if your retry condition is based on successful outcomes rather than errors.@since ― 2.0.0retry(const task: Effect.Effect<string, Error, never>task, const policy: Schedule.Schedule<number, unknown, never>policy)21
22import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <string, Error>(effect: Effect.Effect<string, Error, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<string>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const repeated: Effect.Effect<string, Error, never>repeated).Promise<string>.then<void, never>(onfulfilled?: ((value: string) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)23/*24Output:25failure26failure27failure28success29yay!30*/
```
### Retrying n Times Immediately
[](#retrying-n-times-immediately)
You can also retry a failing effect a set number of times with a simpler policy that retries immediately:
**Example** (Retrying a Task up to 5 times)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3let let count: numbercount = 04
5// Simulates an effect with possible failures6const const task: Effect.Effect<string, Error, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const async: <string, Error, never>(resume: (callback: (_: Effect.Effect<string, Error, never>) => void, signal: AbortSignal) => void | Effect.Effect<void, never, never>, blockingOn?: FiberId) => Effect.Effect<string, Error, never>Creates an Effect from a callback-based asynchronous function.
Details
The resume function:
Must be called exactly once. Any additional calls will be ignored.
Can return an optional Effect that will be run if the Fiber executing
this Effect is interrupted. This can be useful in scenarios where you
need to handle resource cleanup if the operation is interrupted.
Can receive an AbortSignal to handle interruption if needed.
The FiberId of the fiber that may complete the async callback may also be
specified using the blockingOn argument. This is called the "blocking
fiber" because it suspends the fiber executing the async effect (i.e.
semantically blocks the fiber from making progress). Specifying this fiber id
in cases where it is known will improve diagnostics, but not affect the
behavior of the returned effect.
When to Use
Use Effect.async when dealing with APIs that use callback-style instead of
async/await or Promise.
Example (Wrapping a Callback API)
import { Effect } from "effect"import * as NodeFS from "node:fs"
const readFile = (filename: string) =>  Effect.async<Buffer, Error>((resume) => {    NodeFS.readFile(filename, (error, data) => {      if (error) {        // Resume with a failed Effect if an error occurs        resume(Effect.fail(error))      } else {        // Resume with a succeeded Effect if successful        resume(Effect.succeed(data))      }    })  })
//      ┌─── Effect<Buffer, Error, never>//      ▼const program = readFile("example.txt")
Example (Handling Interruption with Cleanup)
import { Effect, Fiber } from "effect"import * as NodeFS from "node:fs"
// Simulates a long-running operation to write to a fileconst writeFileWithCleanup = (filename: string, data: string) =>  Effect.async<void, Error>((resume) => {    const writeStream = NodeFS.createWriteStream(filename)
    // Start writing data to the file    writeStream.write(data)
    // When the stream is finished, resume with success    writeStream.on("finish", () => resume(Effect.void))
    // In case of an error during writing, resume with failure    writeStream.on("error", (err) => resume(Effect.fail(err)))
    // Handle interruption by returning a cleanup effect    return Effect.sync(() => {      console.log(`Cleaning up ${filename}`)      NodeFS.unlinkSync(filename)    })  })
const program = Effect.gen(function* () {  const fiber = yield* Effect.fork(    writeFileWithCleanup("example.txt", "Some long data...")  )  // Simulate interrupting the fiber after 1 second  yield* Effect.sleep("1 second")  yield* Fiber.interrupt(fiber) // This will trigger the cleanup})
// Run the programEffect.runPromise(program)// Output:// Cleaning up example.txt
Example (Handling Interruption with AbortSignal)
import { Effect, Fiber } from "effect"
// A task that supports interruption using AbortSignalconst interruptibleTask = Effect.async<void, Error>((resume, signal) => {  // Handle interruption  signal.addEventListener("abort", () => {    console.log("Abort signal received")    clearTimeout(timeoutId)  })
  // Simulate a long-running task  const timeoutId = setTimeout(() => {    console.log("Operation completed")    resume(Effect.void)  }, 2000)})
const program = Effect.gen(function* () {  const fiber = yield* Effect.fork(interruptibleTask)  // Simulate interrupting the fiber after 1 second  yield* Effect.sleep("1 second")  yield* Fiber.interrupt(fiber)})
// Run the programEffect.runPromise(program)// Output:// Abort signal received@since ― 2.0.0async<string, interface ErrorError>((resume: (_: Effect.Effect<string, Error, never>) => voidresume) => {7  if (let count: numbercount <= 2) {8    let count: numbercount++9    var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("failure")10    resume: (_: Effect.Effect<string, Error, never>) => voidresume(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <Error>(error: Error) => Effect.Effect<never, Error, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(new var Error: ErrorConstructornew (message?: string) => ErrorError()))11  } else {12    var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("success")13    resume: (_: Effect.Effect<string, Error, never>) => voidresume(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("yay!"))14  }15})16
17// Retry the task up to 5 times18import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <string, Error>(effect: Effect.Effect<string, Error, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<string>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const retry: <string, Error, never, {    times: number;}>(self: Effect.Effect<string, Error, never>, options: {    times: number;}) => Effect.Effect<string, Error, never> (+3 overloads)Retries a failing effect based on a defined retry policy.
Details
The Effect.retry function takes an effect and a
Schedule
policy,
and will automatically retry the effect if it fails, following the rules of
the policy.
If the effect ultimately succeeds, the result will be returned.
If the maximum retries are exhausted and the effect still fails, the failure
is propagated.
When to Use
This can be useful when dealing with intermittent failures, such as network
issues or temporary resource unavailability. By defining a retry policy, you
can control the number of retries, the delay between them, and when to stop
retrying.
Example (Retrying with a Fixed Delay)
import { Effect, Schedule } from "effect"
let count = 0
// Simulates an effect with possible failuresconst task = Effect.async<string, Error>((resume) => {  if (count <= 2) {    count++    console.log("failure")    resume(Effect.fail(new Error()))  } else {    console.log("success")    resume(Effect.succeed("yay!"))  }})
// Define a repetition policy using a fixed delay between retriesconst policy = Schedule.fixed("100 millis")
const repeated = Effect.retry(task, policy)
Effect.runPromise(repeated).then(console.log)// Output:// failure// failure// failure// success// yay!
Example (Retrying a Task up to 5 times)
import { Effect } from "effect"
let count = 0
// Simulates an effect with possible failuresconst task = Effect.async<string, Error>((resume) => {  if (count <= 2) {    count++    console.log("failure")    resume(Effect.fail(new Error()))  } else {    console.log("success")    resume(Effect.succeed("yay!"))  }})
// Retry the task up to 5 timesEffect.runPromise(Effect.retry(task, { times: 5 })).then(console.log)// Output:// failure// failure// failure// success
Example (Retrying Until a Specific Condition is Met)
import { Effect } from "effect"
let count = 0
// Define an effect that simulates varying error on each invocationconst action = Effect.failSync(() => {  console.log(`Action called ${++count} time(s)`)  return `Error ${count}`})
// Retry the action until a specific condition is metconst program = Effect.retry(action, {  until: (err) => err === "Error 3"})
Effect.runPromiseExit(program).then(console.log)// Output:// Action called 1 time(s)// Action called 2 time(s)// Action called 3 time(s)// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: { _id: 'Cause', _tag: 'Fail', failure: 'Error 3' }// }@see ― retryOrElse for a version that allows you to run a fallback.@see ― repeat if your retry condition is based on successful outcomes rather than errors.@since ― 2.0.0retry(const task: Effect.Effect<string, Error, never>task, { times: numbertimes: 5 }))19/*20Output:21failure22failure23failure24success25*/
```
### Retrying Based on a Condition
[](#retrying-based-on-a-condition)
You can customize how retries are managed by specifying conditions. Use the `until` or `while` options to control when retries stop.
**Example** (Retrying Until a Specific Condition is Met)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3let let count: numbercount = 04
5// Define an effect that simulates varying error on each invocation6const const action: Effect.Effect<never, string, never>action = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const failSync: <string>(evaluate: LazyArg<string>) => Effect.Effect<never, string, never>Creates an Effect that fails with the specified error, evaluated lazily.@since ― 2.0.0failSync(() => {7  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log(`Action called ${++let count: numbercount} time(s)`)8  return `Error ${let count: numbercount}`9})10
11// Retry the action until a specific condition is met12const const program: Effect.Effect<never, "Error 3", never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const retry: <never, string, never, {    until: (err: string) => err is "Error 3";}>(self: Effect.Effect<never, string, never>, options: {    until: (err: string) => err is "Error 3";}) => Effect.Effect<never, "Error 3", never> (+3 overloads)Retries a failing effect based on a defined retry policy.
Details
The Effect.retry function takes an effect and a
Schedule
policy,
and will automatically retry the effect if it fails, following the rules of
the policy.
If the effect ultimately succeeds, the result will be returned.
If the maximum retries are exhausted and the effect still fails, the failure
is propagated.
When to Use
This can be useful when dealing with intermittent failures, such as network
issues or temporary resource unavailability. By defining a retry policy, you
can control the number of retries, the delay between them, and when to stop
retrying.
Example (Retrying with a Fixed Delay)
import { Effect, Schedule } from "effect"
let count = 0
// Simulates an effect with possible failuresconst task = Effect.async<string, Error>((resume) => {  if (count <= 2) {    count++    console.log("failure")    resume(Effect.fail(new Error()))  } else {    console.log("success")    resume(Effect.succeed("yay!"))  }})
// Define a repetition policy using a fixed delay between retriesconst policy = Schedule.fixed("100 millis")
const repeated = Effect.retry(task, policy)
Effect.runPromise(repeated).then(console.log)// Output:// failure// failure// failure// success// yay!
Example (Retrying a Task up to 5 times)
import { Effect } from "effect"
let count = 0
// Simulates an effect with possible failuresconst task = Effect.async<string, Error>((resume) => {  if (count <= 2) {    count++    console.log("failure")    resume(Effect.fail(new Error()))  } else {    console.log("success")    resume(Effect.succeed("yay!"))  }})
// Retry the task up to 5 timesEffect.runPromise(Effect.retry(task, { times: 5 })).then(console.log)// Output:// failure// failure// failure// success
Example (Retrying Until a Specific Condition is Met)
import { Effect } from "effect"
let count = 0
// Define an effect that simulates varying error on each invocationconst action = Effect.failSync(() => {  console.log(`Action called ${++count} time(s)`)  return `Error ${count}`})
// Retry the action until a specific condition is metconst program = Effect.retry(action, {  until: (err) => err === "Error 3"})
Effect.runPromiseExit(program).then(console.log)// Output:// Action called 1 time(s)// Action called 2 time(s)// Action called 3 time(s)// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: { _id: 'Cause', _tag: 'Fail', failure: 'Error 3' }// }@see ― retryOrElse for a version that allows you to run a fallback.@see ― repeat if your retry condition is based on successful outcomes rather than errors.@since ― 2.0.0retry(const action: Effect.Effect<never, string, never>action, {13  until: (err: string) => err is "Error 3"until: (err: stringerr) => err: stringerr === "Error 3"14})15
16import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <never, "Error 3">(effect: Effect.Effect<never, "Error 3", never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<never, "Error 3">>Runs an effect and returns a Promise that resolves to an Exit,
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
// Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const program: Effect.Effect<never, "Error 3", never>program).Promise<Exit<never, "Error 3">>.then<void, never>(onfulfilled?: ((value: Exit<never, "Error 3">) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)17/*18Output:19Action called 1 time(s)20Action called 2 time(s)21Action called 3 time(s)22{23  _id: 'Exit',24  _tag: 'Failure',25  cause: { _id: 'Cause', _tag: 'Fail', failure: 'Error 3' }26}27*/
```
Alternative
You can also use [Effect.repeat](/docs/scheduling/repetition/#repeating-based-on-a-condition) if your retry condition is based on successful outcomes rather than errors.
## retryOrElse
[](#retryorelse)
The `Effect.retryOrElse` function attempts to retry a failing effect multiple times according to a defined [Schedule](/docs/scheduling/introduction/) policy.
If the retries are exhausted and the effect still fails, it runs a fallback effect instead.
This function is useful when you want to handle failures gracefully by specifying an alternative action after repeated failures.
**Example** (Retrying with Fallback)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ScheduleSchedule, import ConsoleConsole } from "effect"2
3let let count: numbercount = 04
5// Simulates an effect with possible failures6const const task: Effect.Effect<string, Error, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const async: <string, Error, never>(resume: (callback: (_: Effect.Effect<string, Error, never>) => void, signal: AbortSignal) => void | Effect.Effect<void, never, never>, blockingOn?: FiberId) => Effect.Effect<string, Error, never>Creates an Effect from a callback-based asynchronous function.
Details
The resume function:
Must be called exactly once. Any additional calls will be ignored.
Can return an optional Effect that will be run if the Fiber executing
this Effect is interrupted. This can be useful in scenarios where you
need to handle resource cleanup if the operation is interrupted.
Can receive an AbortSignal to handle interruption if needed.
The FiberId of the fiber that may complete the async callback may also be
specified using the blockingOn argument. This is called the "blocking
fiber" because it suspends the fiber executing the async effect (i.e.
semantically blocks the fiber from making progress). Specifying this fiber id
in cases where it is known will improve diagnostics, but not affect the
behavior of the returned effect.
When to Use
Use Effect.async when dealing with APIs that use callback-style instead of
async/await or Promise.
Example (Wrapping a Callback API)
import { Effect } from "effect"import * as NodeFS from "node:fs"
const readFile = (filename: string) =>  Effect.async<Buffer, Error>((resume) => {    NodeFS.readFile(filename, (error, data) => {      if (error) {        // Resume with a failed Effect if an error occurs        resume(Effect.fail(error))      } else {        // Resume with a succeeded Effect if successful        resume(Effect.succeed(data))      }    })  })
//      ┌─── Effect<Buffer, Error, never>//      ▼const program = readFile("example.txt")
Example (Handling Interruption with Cleanup)
import { Effect, Fiber } from "effect"import * as NodeFS from "node:fs"
// Simulates a long-running operation to write to a fileconst writeFileWithCleanup = (filename: string, data: string) =>  Effect.async<void, Error>((resume) => {    const writeStream = NodeFS.createWriteStream(filename)
    // Start writing data to the file    writeStream.write(data)
    // When the stream is finished, resume with success    writeStream.on("finish", () => resume(Effect.void))
    // In case of an error during writing, resume with failure    writeStream.on("error", (err) => resume(Effect.fail(err)))
    // Handle interruption by returning a cleanup effect    return Effect.sync(() => {      console.log(`Cleaning up ${filename}`)      NodeFS.unlinkSync(filename)    })  })
const program = Effect.gen(function* () {  const fiber = yield* Effect.fork(    writeFileWithCleanup("example.txt", "Some long data...")  )  // Simulate interrupting the fiber after 1 second  yield* Effect.sleep("1 second")  yield* Fiber.interrupt(fiber) // This will trigger the cleanup})
// Run the programEffect.runPromise(program)// Output:// Cleaning up example.txt
Example (Handling Interruption with AbortSignal)
import { Effect, Fiber } from "effect"
// A task that supports interruption using AbortSignalconst interruptibleTask = Effect.async<void, Error>((resume, signal) => {  // Handle interruption  signal.addEventListener("abort", () => {    console.log("Abort signal received")    clearTimeout(timeoutId)  })
  // Simulate a long-running task  const timeoutId = setTimeout(() => {    console.log("Operation completed")    resume(Effect.void)  }, 2000)})
const program = Effect.gen(function* () {  const fiber = yield* Effect.fork(interruptibleTask)  // Simulate interrupting the fiber after 1 second  yield* Effect.sleep("1 second")  yield* Fiber.interrupt(fiber)})
// Run the programEffect.runPromise(program)// Output:// Abort signal received@since ― 2.0.0async<string, interface ErrorError>((resume: (_: Effect.Effect<string, Error, never>) => voidresume) => {7  if (let count: numbercount <= 2) {8    let count: numbercount++9    var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("failure")10    resume: (_: Effect.Effect<string, Error, never>) => voidresume(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <Error>(error: Error) => Effect.Effect<never, Error, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(new var Error: ErrorConstructornew (message?: string) => ErrorError()))11  } else {12    var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("success")13    resume: (_: Effect.Effect<string, Error, never>) => voidresume(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("yay!"))14  }15})16
17// Retry the task with a delay between retries and a maximum of 2 retries18const const policy: Schedule.Schedule<number, unknown, never>policy = import ScheduleSchedule.const addDelay: <number, unknown, never>(self: Schedule.Schedule<number, unknown, never>, f: (out: number) => DurationInput) => Schedule.Schedule<number, unknown, never> (+1 overload)Adds a delay to every interval in a schedule.
Details
This function modifies a given schedule by applying an additional delay to
every interval it defines. The delay is determined by the provided function,
which takes the schedule's output and returns a delay duration.@see ― addDelayEffect If you need to compute the delay using an effectful function.@since ― 2.0.0addDelay(import ScheduleSchedule.const recurs: (n: number) => Schedule.Schedule<number>A schedule that recurs a fixed number of times before terminating.
Details
This schedule will continue executing until it has been stepped n times,
after which it will stop. The output of the schedule is the current count of
recurrences.@since ― 2.0.0recurs(2), () => "100 millis")19
20// If all retries fail, run the fallback effect21const const repeated: Effect.Effect<string, never, never>repeated = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const retryOrElse: <string, Error, never, number, never, string, never, never>(self: Effect.Effect<string, Error, never>, policy: Schedule.Schedule<number, Error, never>, orElse: (e: Error, out: number) => Effect.Effect<string, never, never>) => Effect.Effect<string, never, never> (+1 overload)Retries a failing effect and runs a fallback effect if retries are exhausted.
Details
The Effect.retryOrElse function attempts to retry a failing effect multiple
times according to a defined
Schedule
policy.
If the retries are exhausted and the effect still fails, it runs a fallback
effect instead.
When to Use
This function is useful when you want to handle failures gracefully by
specifying an alternative action after repeated failures.
Example (Retrying with Fallback)
import { Effect, Schedule, Console } from "effect"
let count = 0
// Simulates an effect with possible failuresconst task = Effect.async<string, Error>((resume) => {  if (count <= 2) {    count++    console.log("failure")    resume(Effect.fail(new Error()))  } else {    console.log("success")    resume(Effect.succeed("yay!"))  }})
// Retry the task with a delay between retries and a maximum of 2 retriesconst policy = Schedule.addDelay(Schedule.recurs(2), () => "100 millis")
// If all retries fail, run the fallback effectconst repeated = Effect.retryOrElse(  task,  policy,  // fallback  () => Console.log("orElse").pipe(Effect.as("default value")))
Effect.runPromise(repeated).then(console.log)// Output:// failure// failure// failure// orElse// default value@see ― retry for a version that does not run a fallback effect.@since ― 2.0.0retryOrElse(22  const task: Effect.Effect<string, Error, never>task,23  const policy: Schedule.Schedule<number, unknown, never>policy,24  // fallback25  () => import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("orElse").Pipeable.pipe<Effect.Effect<void, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<void, never, never>, ab: (_: Effect.Effect<void, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <string>(value: string) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<string, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
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
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as("default value"))26)27
28import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <string, never>(effect: Effect.Effect<string, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<string>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const repeated: Effect.Effect<string, never, never>repeated).Promise<string>.then<void, never>(onfulfilled?: ((value: string) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)29/*30Output:31failure32failure33failure34orElse35default value36*/
```
[Edit page](https://github.com/Effect-TS/website/edit/main/content/src/content/docs/docs/error-management/retrying.mdx)
[Previous  
Matching](/docs/error-management/matching/) [Next  
Timing Out](/docs/error-management/timing-out/)
