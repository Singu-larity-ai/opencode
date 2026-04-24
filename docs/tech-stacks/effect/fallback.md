---
title: "Fallback"
source: "https://effect.website/docs/fallback/"
description: "Effect documentation - Fallback"
---

# Fallback

[Docs](/docs/) [Blog](/blog/) [Podcast](/podcast/) [Play](/play/)
On this page
## On this page
-   [Overview](#_top)
-   [orElse](#orelse)
-   [orElseFail](#orelsefail)
-   [orElseSucceed](#orelsesucceed)
-   [firstSuccessOf](#firstsuccessof)
# Fallback
This page explains various techniques for handling failures and creating fallback mechanisms in the Effect library.
## orElse
[](#orelse)
`Effect.orElse` allows you to attempt to run an effect, and if it fails, you can provide a fallback effect to run instead.
This is useful for handling failures gracefully by defining an alternative effect to execute if the first one encounters an error.
**Example** (Handling Fallback with `Effect.orElse`)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const success: Effect.Effect<string, never, never>success = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("success")4const const failure: Effect.Effect<never, string, never>failure = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("failure")5const const fallback: Effect.Effect<string, never, never>fallback = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("fallback")6
7// Try the success effect first, fallback is not used8const const program1: Effect.Effect<string, never, never>program1 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const orElse: <string, never, never, string, never, never>(self: Effect.Effect<string, never, never>, that: LazyArg<Effect.Effect<string, never, never>>) => Effect.Effect<string, never, never> (+1 overload)Attempts one effect, and if it fails, falls back to another effect.
Details
This function allows you to try executing an effect, and if it fails
(produces an error), a fallback effect is executed instead. The fallback
effect is defined as a lazy argument, meaning it will only be evaluated if
the first effect fails. This provides a way to recover from errors by
specifying an alternative path of execution.
The error type of the resulting effect will be that of the fallback effect,
as the first effect's error is replaced when the fallback is executed.
Example
import { Effect } from "effect"
const success = Effect.succeed("success")const failure = Effect.fail("failure")const fallback = Effect.succeed("fallback")
// Try the success effect first, fallback is not usedconst program1 = Effect.orElse(success, () => fallback)console.log(Effect.runSync(program1))// Output: "success"
// Try the failure effect first, fallback is usedconst program2 = Effect.orElse(failure, () => fallback)console.log(Effect.runSync(program2))// Output: "fallback"@see ― catchAll if you need to access the error in the fallback effect.@since ― 2.0.0orElse(const success: Effect.Effect<string, never, never>success, () => const fallback: Effect.Effect<string, never, never>fallback)9var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runSync: <string, never>(effect: Effect.Effect<string, never, never>) => stringExecutes an effect synchronously, running it immediately and returning the
result.
Details
This function evaluates the provided effect synchronously, returning its
result directly. It is ideal for effects that do not fail or include
asynchronous operations. If the effect does fail or involves async tasks, it
will throw an error. Execution stops at the point of failure or asynchronous
operation, making it unsuitable for effects that require asynchronous
handling.
Important: Attempting to run effects that involve asynchronous operations
or failures will result in exceptions being thrown, so use this function with
care for purely synchronous and error-free effects.
When to Use
Use this function when:
You are sure that the effect will not fail or involve asynchronous
operations.
You need a direct, synchronous result from the effect.
You are working within a context where asynchronous effects are not
allowed.
Avoid using this function for effects that can fail or require asynchronous
handling. For such cases, consider using
runPromise
or
runSyncExit
.
Example (Synchronous Logging)
import { Effect } from "effect"
const program = Effect.sync(() => {  console.log("Hello, World!")  return 1})
const result = Effect.runSync(program)// Output: Hello, World!
console.log(result)// Output: 1
Example (Incorrect Usage with Failing or Async Effects)
import { Effect } from "effect"
try {  // Attempt to run an effect that fails  Effect.runSync(Effect.fail("my error"))} catch (e) {  console.error(e)}// Output:// (FiberFailure) Error: my error
try {  // Attempt to run an effect that involves async work  Effect.runSync(Effect.promise(() => Promise.resolve(1)))} catch (e) {  console.error(e)}// Output:// (FiberFailure) AsyncFiberException: Fiber #0 cannot be resolved synchronously. This is caused by using runSync on an effect that performs async work@see ― runSyncExit for a version that returns an Exit type instead of
throwing an error.@since ― 2.0.0runSync(const program1: Effect.Effect<string, never, never>program1))10// Output: "success"11
12// Try the failure effect first, fallback is used13const const program2: Effect.Effect<string, never, never>program2 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const orElse: <never, string, never, string, never, never>(self: Effect.Effect<never, string, never>, that: LazyArg<Effect.Effect<string, never, never>>) => Effect.Effect<string, never, never> (+1 overload)Attempts one effect, and if it fails, falls back to another effect.
Details
This function allows you to try executing an effect, and if it fails
(produces an error), a fallback effect is executed instead. The fallback
effect is defined as a lazy argument, meaning it will only be evaluated if
the first effect fails. This provides a way to recover from errors by
specifying an alternative path of execution.
The error type of the resulting effect will be that of the fallback effect,
as the first effect's error is replaced when the fallback is executed.
Example
import { Effect } from "effect"
const success = Effect.succeed("success")const failure = Effect.fail("failure")const fallback = Effect.succeed("fallback")
// Try the success effect first, fallback is not usedconst program1 = Effect.orElse(success, () => fallback)console.log(Effect.runSync(program1))// Output: "success"
// Try the failure effect first, fallback is usedconst program2 = Effect.orElse(failure, () => fallback)console.log(Effect.runSync(program2))// Output: "fallback"@see ― catchAll if you need to access the error in the fallback effect.@since ― 2.0.0orElse(const failure: Effect.Effect<never, string, never>failure, () => const fallback: Effect.Effect<string, never, never>fallback)14var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runSync: <string, never>(effect: Effect.Effect<string, never, never>) => stringExecutes an effect synchronously, running it immediately and returning the
result.
Details
This function evaluates the provided effect synchronously, returning its
result directly. It is ideal for effects that do not fail or include
asynchronous operations. If the effect does fail or involves async tasks, it
will throw an error. Execution stops at the point of failure or asynchronous
operation, making it unsuitable for effects that require asynchronous
handling.
Important: Attempting to run effects that involve asynchronous operations
or failures will result in exceptions being thrown, so use this function with
care for purely synchronous and error-free effects.
When to Use
Use this function when:
You are sure that the effect will not fail or involve asynchronous
operations.
You need a direct, synchronous result from the effect.
You are working within a context where asynchronous effects are not
allowed.
Avoid using this function for effects that can fail or require asynchronous
handling. For such cases, consider using
runPromise
or
runSyncExit
.
Example (Synchronous Logging)
import { Effect } from "effect"
const program = Effect.sync(() => {  console.log("Hello, World!")  return 1})
const result = Effect.runSync(program)// Output: Hello, World!
console.log(result)// Output: 1
Example (Incorrect Usage with Failing or Async Effects)
import { Effect } from "effect"
try {  // Attempt to run an effect that fails  Effect.runSync(Effect.fail("my error"))} catch (e) {  console.error(e)}// Output:// (FiberFailure) Error: my error
try {  // Attempt to run an effect that involves async work  Effect.runSync(Effect.promise(() => Promise.resolve(1)))} catch (e) {  console.error(e)}// Output:// (FiberFailure) AsyncFiberException: Fiber #0 cannot be resolved synchronously. This is caused by using runSync on an effect that performs async work@see ― runSyncExit for a version that returns an Exit type instead of
throwing an error.@since ― 2.0.0runSync(const program2: Effect.Effect<string, never, never>program2))15// Output: "fallback"
```
## orElseFail
[](#orelsefail)
`Effect.orElseFail` allows you to replace the failure from one effect with a custom failure value. If the effect fails, you can provide a new failure to be returned instead of the original one.
This function only applies to failed effects. If the effect succeeds, it will remain unaffected.
**Example** (Replacing Failure with `Effect.orElseFail`)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const validate: (age: number) => Effect.Effect<number, string>validate = (age: numberage: number): import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
which can succeed or fail.
Details
The Effect interface represents a computation that can model a workflow
involving various types of operations, such as synchronous, asynchronous,
concurrent, and parallel interactions. It operates within a context of type
R, and the result can either be a success with a value of type A or a
failure with an error of type E. The Effect is designed to handle complex
interactions with external resources, offering advanced features such as
fiber-based concurrency, scheduling, interruption handling, and scalability.
This makes it suitable for tasks that require fine-grained control over
concurrency and error management.
To execute an Effect value, you need a Runtime, which provides the
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, string> => {4  if (age: numberage < 0) {5    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("NegativeAgeError")6  } else if (age: numberage < 18) {7    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("IllegalAgeError")8  } else {9    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(age: numberage)10  }11}12
13const const program: Effect.Effect<number, string, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const orElseFail: <number, string, never, string>(self: Effect.Effect<number, string, never>, evaluate: LazyArg<string>) => Effect.Effect<number, string, never> (+1 overload)Replaces the failure of an effect with a custom failure value.
Details
This function allows you to handle the failure of an effect by replacing it
with a predefined failure value. If the effect fails, the new failure value
provided by the evaluate function will be returned instead of the original
failure. If the effect succeeds, the original success value is returned
unchanged.
When to Use
This is particularly useful when you want to standardize error handling or
provide a consistent failure value for specific operations. It simplifies
error management by ensuring that all failures are replaced with a controlled
alternative.
Example
import { Effect } from "effect"
const validate = (age: number): Effect.Effect<number, string> => {  if (age < 0) {    return Effect.fail("NegativeAgeError")  } else if (age < 18) {    return Effect.fail("IllegalAgeError")  } else {    return Effect.succeed(age)  }}
const program = Effect.orElseFail(validate(-1), () => "invalid age")
console.log(Effect.runSyncExit(program))// Output:// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: { _id: 'Cause', _tag: 'Fail', failure: 'invalid age' }// }@see ― mapError if you need to access the error to transform it.@since ― 2.0.0orElseFail(const validate: (age: number) => Effect.Effect<number, string>validate(-1), () => "invalid age")14
15var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runSyncExit: <number, string>(effect: Effect.Effect<number, string, never>) => Exit<number, string>Runs an effect synchronously and returns the result as an Exit type.
Details
This function executes the provided effect synchronously and returns an Exit
type that encapsulates the outcome of the effect:
If the effect succeeds, the result is wrapped in a Success.
If the effect fails, it returns a Failure containing a Cause that explains
the failure.
If the effect involves asynchronous operations, this function will return a Failure
with a Die cause, indicating that it cannot resolve the effect synchronously.
This makes the function suitable for use only with effects that are synchronous
in nature.
When to Use
Use this function when:
You want to handle both success and failure outcomes in a structured way using the Exit type.
You are working with effects that are purely synchronous and do not involve asynchronous operations.
You need to debug or inspect failures, including their causes, in a detailed manner.
Avoid using this function for effects that involve asynchronous operations, as it will fail with a Die cause.
Example (Handling Results as Exit)
import { Effect } from "effect"
console.log(Effect.runSyncExit(Effect.succeed(1)))// Output:// {//   _id: "Exit",//   _tag: "Success",//   value: 1// }
console.log(Effect.runSyncExit(Effect.fail("my error")))// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }
Example (Asynchronous Operation Resulting in Die)
import { Effect } from "effect"
console.log(Effect.runSyncExit(Effect.promise(() => Promise.resolve(1))))// Output:// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Die',//     defect: [Fiber #0 cannot be resolved synchronously. This is caused by using runSync on an effect that performs async work] {//       fiber: [FiberRuntime],//       _tag: 'AsyncFiberException',//       name: 'AsyncFiberException'//     }//   }// }@since ― 2.0.0runSyncExit(const program: Effect.Effect<number, string, never>program))16/*17Output:18{19  _id: 'Exit',20  _tag: 'Failure',21  cause: { _id: 'Cause', _tag: 'Fail', failure: 'invalid age' }22}23*/
```
## orElseSucceed
[](#orelsesucceed)
`Effect.orElseSucceed` allows you to replace the failure of an effect with a success value. If the effect fails, it will instead succeed with the provided value, ensuring the effect always completes successfully.
This is useful when you want to guarantee a successful result regardless of whether the original effect failed.
The function ensures that any failure is effectively “swallowed” and replaced by a successful value, which can be helpful for providing default values in case of failure.
This function only applies to failed effects. If the effect already succeeds, it will remain unchanged.
**Example** (Replacing Failure with Success using `Effect.orElseSucceed`)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const validate: (age: number) => Effect.Effect<number, string>validate = (age: numberage: number): import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
which can succeed or fail.
Details
The Effect interface represents a computation that can model a workflow
involving various types of operations, such as synchronous, asynchronous,
concurrent, and parallel interactions. It operates within a context of type
R, and the result can either be a success with a value of type A or a
failure with an error of type E. The Effect is designed to handle complex
interactions with external resources, offering advanced features such as
fiber-based concurrency, scheduling, interruption handling, and scalability.
This makes it suitable for tasks that require fine-grained control over
concurrency and error management.
To execute an Effect value, you need a Runtime, which provides the
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, string> => {4  if (age: numberage < 0) {5    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("NegativeAgeError")6  } else if (age: numberage < 18) {7    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("IllegalAgeError")8  } else {9    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(age: numberage)10  }11}12
13const const program: Effect.Effect<number, never, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const orElseSucceed: <number, string, never, number>(self: Effect.Effect<number, string, never>, evaluate: LazyArg<number>) => Effect.Effect<number, never, never> (+1 overload)Ensures the effect always succeeds by replacing failures with a default
success value.
Details
This function transforms an effect that may fail into one that cannot fail by
replacing any failure with a provided success value. If the original effect
fails, the failure is "swallowed," and the specified success value is
returned instead. If the original effect succeeds, its value remains
unchanged.
When to Use
This is especially useful for providing default values in case of failure,
ensuring that an effect always completes successfully. By using this
function, you can avoid the need for complex error handling and guarantee a
fallback result.
Example
import { Effect } from "effect"
const validate = (age: number): Effect.Effect<number, string> => {  if (age < 0) {    return Effect.fail("NegativeAgeError")  } else if (age < 18) {    return Effect.fail("IllegalAgeError")  } else {    return Effect.succeed(age)  }}
const program = Effect.orElseSucceed(validate(-1), () => 18)
console.log(Effect.runSyncExit(program))// Output:// { _id: 'Exit', _tag: 'Success', value: 18 }@since ― 2.0.0orElseSucceed(const validate: (age: number) => Effect.Effect<number, string>validate(-1), () => 18)14
15var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runSyncExit: <number, never>(effect: Effect.Effect<number, never, never>) => Exit<number, never>Runs an effect synchronously and returns the result as an Exit type.
Details
This function executes the provided effect synchronously and returns an Exit
type that encapsulates the outcome of the effect:
If the effect succeeds, the result is wrapped in a Success.
If the effect fails, it returns a Failure containing a Cause that explains
the failure.
If the effect involves asynchronous operations, this function will return a Failure
with a Die cause, indicating that it cannot resolve the effect synchronously.
This makes the function suitable for use only with effects that are synchronous
in nature.
When to Use
Use this function when:
You want to handle both success and failure outcomes in a structured way using the Exit type.
You are working with effects that are purely synchronous and do not involve asynchronous operations.
You need to debug or inspect failures, including their causes, in a detailed manner.
Avoid using this function for effects that involve asynchronous operations, as it will fail with a Die cause.
Example (Handling Results as Exit)
import { Effect } from "effect"
console.log(Effect.runSyncExit(Effect.succeed(1)))// Output:// {//   _id: "Exit",//   _tag: "Success",//   value: 1// }
console.log(Effect.runSyncExit(Effect.fail("my error")))// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }
Example (Asynchronous Operation Resulting in Die)
import { Effect } from "effect"
console.log(Effect.runSyncExit(Effect.promise(() => Promise.resolve(1))))// Output:// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Die',//     defect: [Fiber #0 cannot be resolved synchronously. This is caused by using runSync on an effect that performs async work] {//       fiber: [FiberRuntime],//       _tag: 'AsyncFiberException',//       name: 'AsyncFiberException'//     }//   }// }@since ― 2.0.0runSyncExit(const program: Effect.Effect<number, never, never>program))16/*17Output:18{ _id: 'Exit', _tag: 'Success', value: 18 }19*/
```
## firstSuccessOf
[](#firstsuccessof)
`Effect.firstSuccessOf` allows you to try multiple effects in sequence, and as soon as one of them succeeds, it returns that result. If all effects fail, it returns the error of the last effect in the list.
This is useful when you have several potential alternatives and want to use the first one that works.
This function is sequential, meaning that the `Effect` values in the iterable will be executed in sequence, and the first one that succeeds will determine the outcome of the resulting `Effect` value.
Empty Collection Error
If the collection provided to the `Effect.firstSuccessOf` function is empty, it will throw an `IllegalArgumentException` error.
**Example** (Finding Configuration with Fallbacks)
In this example, we try to retrieve a configuration from different nodes. If the primary node fails, we fall back to other nodes until we find a successful configuration.
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3interface interface ConfigConfig {4  Config.host: stringhost: string5  Config.port: numberport: number6  Config.apiKey: stringapiKey: string7}8
9// Create a configuration object with sample values10const const makeConfig: (name: string) => ConfigmakeConfig = (name: stringname: string): interface ConfigConfig => ({11  Config.host: stringhost: `${name: stringname}.example.com`,12  Config.port: numberport: 8080,13  Config.apiKey: stringapiKey: "12345-abcde"14})15
16// Simulate retrieving configuration from a remote node17const const remoteConfig: (name: string) => Effect.Effect<Config, Error>remoteConfig = (name: stringname: string): import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
which can succeed or fail.
Details
The Effect interface represents a computation that can model a workflow
involving various types of operations, such as synchronous, asynchronous,
concurrent, and parallel interactions. It operates within a context of type
R, and the result can either be a success with a value of type A or a
failure with an error of type E. The Effect is designed to handle complex
interactions with external resources, offering advanced features such as
fiber-based concurrency, scheduling, interruption handling, and scalability.
This makes it suitable for tasks that require fine-grained control over
concurrency and error management.
To execute an Effect value, you need a Runtime, which provides the
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<interface ConfigConfig, interface ErrorError> =>18  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<never, Error, never>> | YieldWrap<Effect.Effect<void, never, never>>, Config>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<never, Error, never>> | YieldWrap<Effect.Effect<void, never, never>>, Config, never>) => Effect.Effect<Config, Error, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
control flow and error handling.
When to Use
Effect.gen allows you to write code that looks and behaves like synchronous
code, but it can handle asynchronous tasks, errors, and complex control flow
(like loops and conditions). It helps make asynchronous code more readable
and easier to manage.
The generator functions work similarly to async/await but with more
explicit control over the execution of effects. You can yield* values from
effects and return the final result at the end.
Example
import { Effect } from "effect"
const addServiceCharge = (amount: number) => amount + 1
const applyDiscount = (  total: number,  discountRate: number): Effect.Effect<number, Error> =>  discountRate === 0    ? Effect.fail(new Error("Discount rate cannot be zero"))    : Effect.succeed(total - (total * discountRate) / 100)
const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
const fetchDiscountRate = Effect.promise(() => Promise.resolve(5))
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {19    // Simulate node3 being the only one with available config20    if (name: stringname === "node3") {21      yield* import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`Config for ${name: "node3"name} found`)22      return const makeConfig: (name: string) => ConfigmakeConfig(name: "node3"name)23    } else {24      yield* import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`Unavailable config for ${name: stringname}`)25      return yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <Error>(error: Error) => Effect.Effect<never, Error, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(new var Error: ErrorConstructornew (message?: string) => ErrorError(`Config not found for ${name: stringname}`))26    }27  })28
29// Define the master configuration and potential fallback nodes30const const masterConfig: Effect.Effect<Config, Error, never>masterConfig = const remoteConfig: (name: string) => Effect.Effect<Config, Error>remoteConfig("master")31const const nodeConfigs: Effect.Effect<Config, Error, never>[]nodeConfigs = ["node1", "node2", "node3", "node4"].Array<string>.map<Effect.Effect<Config, Error, never>>(callbackfn: (value: string, index: number, array: string[]) => Effect.Effect<Config, Error, never>, thisArg?: any): Effect.Effect<Config, Error, never>[]Calls a defined callback function on each element of an array, and returns an array that contains the results.@param ― callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.@param ― thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.map(const remoteConfig: (name: string) => Effect.Effect<Config, Error>remoteConfig)32
33// Attempt to find a working configuration,34// starting with the master and then falling back to other nodes35const const config: Effect.Effect<Config, Error, never>config = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const firstSuccessOf: <Effect.Effect<Config, Error, never>>(effects: Iterable<Effect.Effect<Config, Error, never>>) => Effect.Effect<Config, Error, never>Runs a sequence of effects and returns the result of the first successful
one.
Details
This function allows you to execute a collection of effects in sequence,
stopping at the first success. If an effect succeeds, its result is
immediately returned, and no further effects in the sequence are executed.
However, if all the effects fail, the function will return the error of the
last effect.
The execution is sequential, meaning that effects are evaluated one at a time
in the order they are provided. This ensures predictable behavior and avoids
unnecessary computations.
If the collection of effects is empty, an IllegalArgumentException is
thrown, indicating that the operation is invalid without any effects to try.
When to Use
This is particularly useful when you have multiple fallback strategies or
alternative sources to obtain a result, such as attempting multiple APIs,
retrieving configurations, or accessing resources in a prioritized manner.
Example
import { Effect, Console } from "effect"
interface Config {  host: string  port: number  apiKey: string}
// Create a configuration object with sample valuesconst makeConfig = (name: string): Config => ({  host: `${name}.example.com`,  port: 8080,  apiKey: "12345-abcde"})
// Simulate retrieving configuration from a remote nodeconst remoteConfig = (name: string): Effect.Effect<Config, Error> =>  Effect.gen(function* () {    // Simulate node3 being the only one with available config    if (name === "node3") {      yield* Console.log(`Config for ${name} found`)      return makeConfig(name)    } else {      yield* Console.log(`Unavailable config for ${name}`)      return yield* Effect.fail(new Error(`Config not found for ${name}`))    }  })
// Define the master configuration and potential fallback nodesconst masterConfig = remoteConfig("master")const nodeConfigs = ["node1", "node2", "node3", "node4"].map(remoteConfig)
// Attempt to find a working configuration,// starting with the master and then falling back to other nodesconst config = Effect.firstSuccessOf([masterConfig, ...nodeConfigs])
// Run the effect to retrieve the configurationconst result = Effect.runSync(config)
console.log(result)// Output:// Unavailable config for master// Unavailable config for node1// Unavailable config for node2// Config for node3 found// { host: 'node3.example.com', port: 8080, apiKey: '12345-abcde' }@since ― 2.0.0firstSuccessOf([const masterConfig: Effect.Effect<Config, Error, never>masterConfig, ...const nodeConfigs: Effect.Effect<Config, Error, never>[]nodeConfigs])36
37// Run the effect to retrieve the configuration38const const result: Configresult = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runSync: <Config, Error>(effect: Effect.Effect<Config, Error, never>) => ConfigExecutes an effect synchronously, running it immediately and returning the
result.
Details
This function evaluates the provided effect synchronously, returning its
result directly. It is ideal for effects that do not fail or include
asynchronous operations. If the effect does fail or involves async tasks, it
will throw an error. Execution stops at the point of failure or asynchronous
operation, making it unsuitable for effects that require asynchronous
handling.
Important: Attempting to run effects that involve asynchronous operations
or failures will result in exceptions being thrown, so use this function with
care for purely synchronous and error-free effects.
When to Use
Use this function when:
You are sure that the effect will not fail or involve asynchronous
operations.
You need a direct, synchronous result from the effect.
You are working within a context where asynchronous effects are not
allowed.
Avoid using this function for effects that can fail or require asynchronous
handling. For such cases, consider using
runPromise
or
runSyncExit
.
Example (Synchronous Logging)
import { Effect } from "effect"
const program = Effect.sync(() => {  console.log("Hello, World!")  return 1})
const result = Effect.runSync(program)// Output: Hello, World!
console.log(result)// Output: 1
Example (Incorrect Usage with Failing or Async Effects)
import { Effect } from "effect"
try {  // Attempt to run an effect that fails  Effect.runSync(Effect.fail("my error"))} catch (e) {  console.error(e)}// Output:// (FiberFailure) Error: my error
try {  // Attempt to run an effect that involves async work  Effect.runSync(Effect.promise(() => Promise.resolve(1)))} catch (e) {  console.error(e)}// Output:// (FiberFailure) AsyncFiberException: Fiber #0 cannot be resolved synchronously. This is caused by using runSync on an effect that performs async work@see ― runSyncExit for a version that returns an Exit type instead of
throwing an error.@since ― 2.0.0runSync(const config: Effect.Effect<Config, Error, never>config)39
40var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log(const result: Configresult)41/*42Output:43Unavailable config for master44Unavailable config for node145Unavailable config for node246Config for node3 found47{ host: 'node3.example.com', port: 8080, apiKey: '12345-abcde' }48*/
```
[Edit page](https://github.com/Effect-TS/website/edit/main/content/src/content/docs/docs/error-management/fallback.mdx)
[Previous  
Unexpected Errors](/docs/error-management/unexpected-errors/) [Next  
Matching](/docs/error-management/matching/)
