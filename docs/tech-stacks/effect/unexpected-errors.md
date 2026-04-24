---
title: "Unexpected Errors"
source: "https://effect.website/docs/unexpected-errors/"
description: "Effect documentation - Unexpected Errors"
---

# Unexpected Errors

[Docs](/docs/) [Blog](/blog/) [Podcast](/podcast/) [Play](/play/)
On this page
## On this page
-   [Overview](#_top)
-   [Creating Unrecoverable Errors](#creating-unrecoverable-errors)
-   [Converting Failures to Defects](#converting-failures-to-defects)
-   [Catching All Defects](#catching-all-defects)
-   [Catching Some Defects](#catching-some-defects)
# Unexpected Errors
There are situations where you may encounter unexpected errors, and you need to decide how to handle them. Effect provides functions to help you deal with such scenarios, allowing you to take appropriate actions when errors occur during the execution of your effects.
## Creating Unrecoverable Errors
[](#creating-unrecoverable-errors)
In the same way it is possible to leverage combinators such as [Effect.fail](/docs/getting-started/creating-effects/#fail) to create values of type `Effect<never, E, never>` the Effect library provides tools to create defects.
Creating defects is a common necessity when dealing with errors from which it is not possible to recover from a business logic perspective, such as attempting to establish a connection that is refused after multiple retries.
In those cases terminating the execution of the effect and moving into reporting, through an output such as stdout or some external monitoring service, might be the best solution.
The following functions and combinators allow for termination of the effect and are often used to convert values of type `Effect<A, E, R>` into values of type `Effect<A, never, R>` allowing the programmer an escape hatch from having to handle and recover from errors for which there is no sensible way to recover.
### die
[](#die)
Creates an effect that terminates a fiber with a specified error.
Use `Effect.die` when encountering unexpected conditions in your code that should not be handled as regular errors but instead represent unrecoverable defects.
The `Effect.die` function is used to signal a defect, which represents a critical and unexpected error in the code. When invoked, it produces an effect that does not handle the error and instead terminates the fiber.
The error channel of the resulting effect is of type `never`, indicating that it cannot recover from this failure.
**Example** (Terminating on Division by Zero with a Specified Error)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const divide: (a: number, b: number) => Effect.Effect<number, never, never>divide = (a: numbera: number, b: numberb: number) =>4  b: numberb === 05    ? import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const die: (defect: unknown) => Effect.Effect<never>Creates an effect that terminates a fiber with a specified error.
Details
This function is used to signal a defect, which represents a critical and
unexpected error in the code. When invoked, it produces an effect that does
not handle the error and instead terminates the fiber.
The error channel of the resulting effect is of type never, indicating that
it cannot recover from this failure.
When to Use
Use this function when encountering unexpected conditions in your code that
should not be handled as regular errors but instead represent unrecoverable
defects.
Example (Terminating on Division by Zero with a Specified Error)
import { Effect } from "effect"
const divide = (a: number, b: number) =>  b === 0    ? Effect.die(new Error("Cannot divide by zero"))    : Effect.succeed(a / b)
//      ┌─── Effect<number, never, never>//      ▼const program = divide(1, 0)
Effect.runPromise(program).catch(console.error)// Output:// (FiberFailure) Error: Cannot divide by zero//   ...stack trace...@see ― dieSync for a variant that throws a specified error, evaluated
lazily.@see ― dieMessage for a variant that throws a RuntimeException with a
message.@since ― 2.0.0die(new var Error: ErrorConstructornew (message?: string) => ErrorError("Cannot divide by zero"))6    : import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(a: numbera / b: numberb)7
8//      ┌─── Effect<number, never, never>9//      ▼10const const program: Effect.Effect<number, never, never>program = const divide: (a: number, b: number) => Effect.Effect<number, never, never>divide(1, 0)11
12import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number, never>(effect: Effect.Effect<number, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<number, never, never>program).Promise<number>.catch<void>(onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined): Promise<number | void>Attaches a callback for only the rejection of the Promise.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of the callback.catch(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
for more information.@since ― v0.1.100error)13/*14Output:15(FiberFailure) Error: Cannot divide by zero16  ...stack trace...17*/
```
### dieMessage
[](#diemessage)
Creates an effect that terminates a fiber with a `RuntimeException` containing the specified message.
Use `Effect.dieMessage` when you want to terminate a fiber due to an unrecoverable defect and include a clear explanation in the message.
The `Effect.dieMessage` function is used to signal a defect, representing a critical and unexpected error in the code. When invoked, it produces an effect that terminates the fiber with a `RuntimeException` carrying the given message.
The resulting effect has an error channel of type `never`, indicating it does not handle or recover from the error.
**Example** (Terminating on Division by Zero with a Specified Message)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const divide: (a: number, b: number) => Effect.Effect<number, never, never>divide = (a: numbera: number, b: numberb: number) =>4  b: numberb === 05    ? import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const dieMessage: (message: string) => Effect.Effect<never>Creates an effect that terminates a fiber with a RuntimeException
containing the specified message.
Details
This function is used to signal a defect, representing a critical and
unexpected error in the code. When invoked, it produces an effect that
terminates the fiber with a RuntimeException carrying the given message.
The resulting effect has an error channel of type never, indicating it does
not handle or recover from the error.
When to Use
Use this function when you want to terminate a fiber due to an unrecoverable
defect and include a clear explanation in the message.
Example (Terminating on Division by Zero with a Specified Message)
import { Effect } from "effect"
const divide = (a: number, b: number) =>  b === 0    ? Effect.dieMessage("Cannot divide by zero")    : Effect.succeed(a / b)
//      ┌─── Effect<number, never, never>//      ▼const program = divide(1, 0)
Effect.runPromise(program).catch(console.error)// Output:// (FiberFailure) RuntimeException: Cannot divide by zero//   ...stack trace...@see ― die for a variant that throws a specified error.@see ― dieSync for a variant that throws a specified error, evaluated
lazily.@since ― 2.0.0dieMessage("Cannot divide by zero")6    : import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(a: numbera / b: numberb)7
8//      ┌─── Effect<number, never, never>9//      ▼10const const program: Effect.Effect<number, never, never>program = const divide: (a: number, b: number) => Effect.Effect<number, never, never>divide(1, 0)11
12import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number, never>(effect: Effect.Effect<number, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<number, never, never>program).Promise<number>.catch<void>(onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined): Promise<number | void>Attaches a callback for only the rejection of the Promise.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of the callback.catch(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
for more information.@since ― v0.1.100error)13/*14Output:15(FiberFailure) RuntimeException: Cannot divide by zero16  ...stack trace...17*/
```
## Converting Failures to Defects
[](#converting-failures-to-defects)
### orDie
[](#ordie)
Converts an effect’s failure into a fiber termination, removing the error from the effect’s type.
Use `Effect.orDie` when failures should be treated as unrecoverable defects and no error handling is required.
The `Effect.orDie` function is used when you encounter errors that you do not want to handle or recover from. It removes the error type from the effect and ensures that any failure will terminate the fiber. This is useful for propagating failures as defects, signaling that they should not be handled within the effect.
**Example** (Propagating an Error as a Defect)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const divide: (a: number, b: number) => Effect.Effect<never, Error, never> | Effect.Effect<number, never, never>divide = (a: numbera: number, b: numberb: number) =>4  b: numberb === 05    ? import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <Error>(error: Error) => Effect.Effect<never, Error, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(new var Error: ErrorConstructornew (message?: string) => ErrorError("Cannot divide by zero"))6    : import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(a: numbera / b: numberb)7
8//      ┌─── Effect<number, never, never>9//      ▼10const const program: Effect.Effect<number, never, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const orDie: <number, Error, never>(self: Effect.Effect<number, Error, never>) => Effect.Effect<number, never, never>Converts an effect's failure into a fiber termination, removing the error
from the effect's type.
Details
The orDie function is used when you encounter errors that you do not want
to handle or recover from. It removes the error type from the effect and
ensures that any failure will terminate the fiber. This is useful for
propagating failures as defects, signaling that they should not be handled
within the effect.
*When to Use
Use orDie when failures should be treated as unrecoverable defects and no
error handling is required.
Example (Propagating an Error as a Defect)
import { Effect } from "effect"
const divide = (a: number, b: number) =>  b === 0    ? Effect.fail(new Error("Cannot divide by zero"))    : Effect.succeed(a / b)
//      ┌─── Effect<number, never, never>//      ▼const program = Effect.orDie(divide(1, 0))
Effect.runPromise(program).catch(console.error)// Output:// (FiberFailure) Error: Cannot divide by zero//   ...stack trace...@see ― orDieWith if you need to customize the error.@since ― 2.0.0orDie(const divide: (a: number, b: number) => Effect.Effect<never, Error, never> | Effect.Effect<number, never, never>divide(1, 0))11
12import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number, never>(effect: Effect.Effect<number, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<number, never, never>program).Promise<number>.catch<void>(onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined): Promise<number | void>Attaches a callback for only the rejection of the Promise.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of the callback.catch(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
for more information.@since ― v0.1.100error)13/*14Output:15(FiberFailure) Error: Cannot divide by zero16  ...stack trace...17*/
```
### orDieWith
[](#ordiewith)
Converts an effect’s failure into a fiber termination with a custom error.
Use `Effect.orDieWith` when failures should terminate the fiber as defects, and you want to customize the error for clarity or debugging purposes.
The `Effect.orDieWith` function behaves like [Effect.orDie](#ordie), but it allows you to provide a mapping function to transform the error before terminating the fiber. This is useful for cases where you want to include a more detailed or user-friendly error when the failure is propagated as a defect.
**Example** (Customizing Defect)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const divide: (a: number, b: number) => Effect.Effect<never, Error, never> | Effect.Effect<number, never, never>divide = (a: numbera: number, b: numberb: number) =>4  b: numberb === 05    ? import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <Error>(error: Error) => Effect.Effect<never, Error, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(new var Error: ErrorConstructornew (message?: string) => ErrorError("Cannot divide by zero"))6    : import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(a: numbera / b: numberb)7
8//      ┌─── Effect<number, never, never>9//      ▼10const const program: Effect.Effect<number, never, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const orDieWith: <number, Error, never>(self: Effect.Effect<number, Error, never>, f: (error: Error) => unknown) => Effect.Effect<number, never, never> (+1 overload)Converts an effect's failure into a fiber termination with a custom error.
Details
The orDieWith function behaves like
orDie
, but it allows you to provide a mapping
function to transform the error before terminating the fiber. This is useful for cases where
you want to include a more detailed or user-friendly error when the failure is propagated
as a defect.
When to Use
Use orDieWith when failures should terminate the fiber as defects, and you want to customize
the error for clarity or debugging purposes.
Example (Customizing Defect)
import { Effect } from "effect"
const divide = (a: number, b: number) =>  b === 0    ? Effect.fail(new Error("Cannot divide by zero"))    : Effect.succeed(a / b)
//      ┌─── Effect<number, never, never>//      ▼const program = Effect.orDieWith(  divide(1, 0),  (error) => new Error(`defect: ${error.message}`))
Effect.runPromise(program).catch(console.error)// Output:// (FiberFailure) Error: defect: Cannot divide by zero//   ...stack trace...@see ― orDie if you don't need to customize the error.@since ― 2.0.0orDieWith(11  const divide: (a: number, b: number) => Effect.Effect<never, Error, never> | Effect.Effect<number, never, never>divide(1, 0),12  (error: Errorerror) => new var Error: ErrorConstructornew (message?: string) => ErrorError(`defect: ${error: Errorerror.Error.message: stringmessage}`)13)14
15import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number, never>(effect: Effect.Effect<number, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<number, never, never>program).Promise<number>.catch<void>(onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined): Promise<number | void>Attaches a callback for only the rejection of the Promise.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of the callback.catch(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
for more information.@since ― v0.1.100error)16/*17Output:18(FiberFailure) Error: defect: Cannot divide by zero19  ...stack trace...20*/
```
## Catching All Defects
[](#catching-all-defects)
There is no sensible way to recover from defects. The functions we’re about to discuss should be used only at the boundary between Effect and an external system, to transmit information on a defect for diagnostic or explanatory purposes.
### exit
[](#exit)
The `Effect.exit` function transforms an `Effect<A, E, R>` into an effect that encapsulates both potential failure and success within an [Exit](/docs/data-types/exit/) data type:
```
Effect<A, E, R> -> Effect<Exit<A, E>, never, R>
```
This means if you have an effect with the following type:
```
Effect<string, HttpError, never>
```
and you call `Effect.exit` on it, the type becomes:
```
Effect<Exit<string, HttpError>, never, never>
```
The resulting effect cannot fail because the potential failure is now represented within the `Exit`’s `Failure` type. The error type of the returned effect is specified as `never`, confirming that the effect is structured to not fail.
By yielding an `Exit`, we gain the ability to “pattern match” on this type to handle both failure and success cases within the generator function.
**Example** (Catching Defects with `Effect.exit`)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import CauseCause, import ConsoleConsole, import ExitExit } from "effect"2
3// Simulating a runtime error4const const task: Effect.Effect<never, never, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const dieMessage: (message: string) => Effect.Effect<never>Creates an effect that terminates a fiber with a RuntimeException
containing the specified message.
Details
This function is used to signal a defect, representing a critical and
unexpected error in the code. When invoked, it produces an effect that
terminates the fiber with a RuntimeException carrying the given message.
The resulting effect has an error channel of type never, indicating it does
not handle or recover from the error.
When to Use
Use this function when you want to terminate a fiber due to an unrecoverable
defect and include a clear explanation in the message.
Example (Terminating on Division by Zero with a Specified Message)
import { Effect } from "effect"
const divide = (a: number, b: number) =>  b === 0    ? Effect.dieMessage("Cannot divide by zero")    : Effect.succeed(a / b)
//      ┌─── Effect<number, never, never>//      ▼const program = divide(1, 0)
Effect.runPromise(program).catch(console.error)// Output:// (FiberFailure) RuntimeException: Cannot divide by zero//   ...stack trace...@see ― die for a variant that throws a specified error.@see ― dieSync for a variant that throws a specified error, evaluated
lazily.@since ― 2.0.0dieMessage("Boom!")5
6const const program: Effect.Effect<void, never, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<void, never, never>>, void>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>>, void, never>) => Effect.Effect<void, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {7  const const exit: Exit.Exit<never, never>exit = yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const exit: <never, never, never>(self: Effect.Effect<never, never, never>) => Effect.Effect<Exit.Exit<never, never>, never, never>Encapsulates both success and failure of an Effect using the Exit type.
Details
This function converts an effect into one that always succeeds, wrapping its
outcome in the Exit type. The Exit type provides explicit handling of
both success (Exit.Success) and failure (Exit.Failure) cases, including
defects (unrecoverable errors).
Unlike
either
or
option
, this function also encapsulates
defects, which are typically unrecoverable and would otherwise terminate the
effect. With the Exit type, defects are represented in Exit.Failure,
allowing for detailed introspection and structured error handling.
This makes the resulting effect robust and incapable of direct failure (its
error type is never). It is particularly useful for workflows where all
outcomes, including unexpected defects, must be managed and analyzed.
Example
import { Effect, Cause, Console, Exit } from "effect"
// Simulating a runtime errorconst task = Effect.dieMessage("Boom!")
const program = Effect.gen(function* () {  const exit = yield* Effect.exit(task)  if (Exit.isFailure(exit)) {    const cause = exit.cause    if (      Cause.isDieType(cause) &&      Cause.isRuntimeException(cause.defect)    ) {      yield* Console.log(        `RuntimeException defect caught: ${cause.defect.message}`      )    } else {      yield* Console.log("Unknown failure caught.")    }  }})
// We get an Exit.Success because we caught all failuresEffect.runPromiseExit(program).then(console.log)// Output:// RuntimeException defect caught: Boom!// {//   _id: "Exit",//   _tag: "Success",//   value: undefined// }@see ― option for a version that uses Option instead.@see ― either for a version that uses Either instead.@since ― 2.0.0exit(const task: Effect.Effect<never, never, never>task)8  if (import ExitExit.const isFailure: <never, never>(self: Exit.Exit<never, never>) => self is Exit.Failure<never, never>Returns true if the specified Exit is a Failure, false otherwise.@since ― 2.0.0isFailure(const exit: Exit.Exit<never, never>exit)) {9    const const cause: Cause.Cause<never>cause = const exit: Exit.Failure<never, never>exit.Failure<never, never>.cause: Cause.Cause<never>cause10    if (11      import CauseCause.const isDieType: <never>(self: Cause.Cause<never>) => self is Cause.DieChecks if a Cause is a Die type.@see ― die Create a new Die cause@since ― 2.0.0isDieType(const cause: Cause.Cause<never>cause) &&12      import CauseCause.const isRuntimeException: (u: unknown) => u is Cause.RuntimeExceptionChecks if a given unknown value is a RuntimeException.@since ― 2.0.0isRuntimeException(const cause: Cause.Diecause.Die.defect: unknowndefect)13    ) {14      yield* import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(15        `RuntimeException defect caught: ${const cause: Cause.Diecause.Die.defect: Cause.RuntimeExceptiondefect.Error.message: stringmessage}`16      )17    } else {18      yield* import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("Unknown failure caught.")19    }20  }21})22
23// We get an Exit.Success because we caught all failures24import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <void, never>(effect: Effect.Effect<void, never, never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit.Exit<void, never>>Runs an effect and returns a Promise that resolves to an Exit,
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
// Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const program: Effect.Effect<void, never, never>program).Promise<Exit<void, never>>.then<void, never>(onfulfilled?: ((value: Exit.Exit<void, never>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)25/*26Output:27RuntimeException defect caught: Boom!28{29  _id: "Exit",30  _tag: "Success",31  value: undefined32}33*/
```
### catchAllDefect
[](#catchalldefect)
Recovers from all defects using a provided recovery function.
`Effect.catchAllDefect` allows you to handle defects, which are unexpected errors that usually cause the program to terminate. This function lets you recover from these defects by providing a function that handles the error.
However, it does not handle expected errors (like those from [Effect.fail](/docs/getting-started/creating-effects/#fail)) or execution interruptions (like those from [Effect.interrupt](/docs/concurrency/basic-concurrency/#interrupt)).
**Example** (Handling All Defects)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import CauseCause, import ConsoleConsole } from "effect"2
3// Simulating a runtime error4const const task: Effect.Effect<never, never, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const dieMessage: (message: string) => Effect.Effect<never>Creates an effect that terminates a fiber with a RuntimeException
containing the specified message.
Details
This function is used to signal a defect, representing a critical and
unexpected error in the code. When invoked, it produces an effect that
terminates the fiber with a RuntimeException carrying the given message.
The resulting effect has an error channel of type never, indicating it does
not handle or recover from the error.
When to Use
Use this function when you want to terminate a fiber due to an unrecoverable
defect and include a clear explanation in the message.
Example (Terminating on Division by Zero with a Specified Message)
import { Effect } from "effect"
const divide = (a: number, b: number) =>  b === 0    ? Effect.dieMessage("Cannot divide by zero")    : Effect.succeed(a / b)
//      ┌─── Effect<number, never, never>//      ▼const program = divide(1, 0)
Effect.runPromise(program).catch(console.error)// Output:// (FiberFailure) RuntimeException: Cannot divide by zero//   ...stack trace...@see ― die for a variant that throws a specified error.@see ― dieSync for a variant that throws a specified error, evaluated
lazily.@since ― 2.0.0dieMessage("Boom!")5
6const const program: Effect.Effect<void, never, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const catchAllDefect: <never, never, never, void, never, never>(self: Effect.Effect<never, never, never>, f: (defect: unknown) => Effect.Effect<void, never, never>) => Effect.Effect<void, never, never> (+1 overload)Recovers from all defects using a provided recovery function.
When to Use
There is no sensible way to recover from defects. This method should be used
only at the boundary between Effect and an external system, to transmit
information on a defect for diagnostic or explanatory purposes.
Details
catchAllDefect allows you to handle defects, which are unexpected errors
that usually cause the program to terminate. This function lets you recover
from these defects by providing a function that handles the error. However,
it does not handle expected errors (like those from
fail
) or
execution interruptions (like those from
interrupt
).
When to Recover from Defects
Defects are unexpected errors that typically shouldn't be recovered from, as
they often indicate serious issues. However, in some cases, such as
dynamically loaded plugins, controlled recovery might be needed.
Example (Handling All Defects)
import { Effect, Cause, Console } from "effect"
// Simulating a runtime errorconst task = Effect.dieMessage("Boom!")
const program = Effect.catchAllDefect(task, (defect) => {  if (Cause.isRuntimeException(defect)) {    return Console.log(      `RuntimeException defect caught: ${defect.message}`    )  }  return Console.log("Unknown defect caught.")})
// We get an Exit.Success because we caught all defectsEffect.runPromiseExit(program).then(console.log)// Output:// RuntimeException defect caught: Boom!// {//   _id: "Exit",//   _tag: "Success",//   value: undefined// }@since ― 2.0.0catchAllDefect(const task: Effect.Effect<never, never, never>task, (defect: unknowndefect) => {7  if (import CauseCause.const isRuntimeException: (u: unknown) => u is Cause.RuntimeExceptionChecks if a given unknown value is a RuntimeException.@since ― 2.0.0isRuntimeException(defect: unknowndefect)) {8    return import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(9      `RuntimeException defect caught: ${defect: Cause.RuntimeExceptiondefect.Error.message: stringmessage}`10    )11  }12  return import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("Unknown defect caught.")13})14
15// We get an Exit.Success because we caught all defects16import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <void, never>(effect: Effect.Effect<void, never, never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<void, never>>Runs an effect and returns a Promise that resolves to an Exit,
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
// Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const program: Effect.Effect<void, never, never>program).Promise<Exit<void, never>>.then<void, never>(onfulfilled?: ((value: Exit<void, never>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)17/*18Output:19RuntimeException defect caught: Boom!20{21  _id: "Exit",22  _tag: "Success",23  value: undefined24}25*/
```
When to Recover from Defects
Defects are unexpected errors that typically shouldn’t be recovered from, as they often indicate serious issues. However, in some cases, such as dynamically loaded plugins, controlled recovery might be needed.
## Catching Some Defects
[](#catching-some-defects)
### catchSomeDefect
[](#catchsomedefect)
Recovers from specific defects using a provided partial function.
`Effect.catchSomeDefect` allows you to handle specific defects, which are unexpected errors that can cause the program to stop. It uses a partial function to catch only certain defects and ignores others.
However, it does not handle expected errors (like those from [Effect.fail](/docs/getting-started/creating-effects/#fail)) or execution interruptions (like those from [Effect.interrupt](/docs/concurrency/basic-concurrency/#interrupt)).
The function provided to `Effect.catchSomeDefect` acts as a filter and a handler for defects:
-   It receives the defect as an input.
-   If the defect matches a specific condition (e.g., a certain error type), the function returns an `Option.some` containing the recovery logic.
-   If the defect does not match, the function returns `Option.none`, allowing the defect to propagate.
**Example** (Handling Specific Defects)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import CauseCause, import Option@since ― 2.0.0@since ― 2.0.0Option, import ConsoleConsole } from "effect"2
3// Simulating a runtime error4const const task: Effect.Effect<never, never, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const dieMessage: (message: string) => Effect.Effect<never>Creates an effect that terminates a fiber with a RuntimeException
containing the specified message.
Details
This function is used to signal a defect, representing a critical and
unexpected error in the code. When invoked, it produces an effect that
terminates the fiber with a RuntimeException carrying the given message.
The resulting effect has an error channel of type never, indicating it does
not handle or recover from the error.
When to Use
Use this function when you want to terminate a fiber due to an unrecoverable
defect and include a clear explanation in the message.
Example (Terminating on Division by Zero with a Specified Message)
import { Effect } from "effect"
const divide = (a: number, b: number) =>  b === 0    ? Effect.dieMessage("Cannot divide by zero")    : Effect.succeed(a / b)
//      ┌─── Effect<number, never, never>//      ▼const program = divide(1, 0)
Effect.runPromise(program).catch(console.error)// Output:// (FiberFailure) RuntimeException: Cannot divide by zero//   ...stack trace...@see ― die for a variant that throws a specified error.@see ― dieSync for a variant that throws a specified error, evaluated
lazily.@since ― 2.0.0dieMessage("Boom!")5
6const const program: Effect.Effect<void, never, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const catchSomeDefect: <never, never, never, void, never, never>(self: Effect.Effect<never, never, never>, pf: (defect: unknown) => Option.Option<Effect.Effect<void, never, never>>) => Effect.Effect<void, never, never> (+1 overload)Recovers from specific defects using a provided partial function.
Details
catchSomeDefect allows you to handle specific defects, which are
unexpected errors that can cause the program to stop. It uses a partial
function to catch only certain defects and ignores others. The function does
not handle expected errors (such as those caused by
fail
) or
interruptions in execution (like those caused by
interrupt
).
This function provides a way to handle certain types of defects while
allowing others to propagate and cause failure in the program.
Note: There is no sensible way to recover from defects. This method
should be used only at the boundary between Effect and an external system, to
transmit information on a defect for diagnostic or explanatory purposes.
How the Partial Function Works
The function provided to catchSomeDefect acts as a filter and a handler for defects:
It receives the defect as an input.
If the defect matches a specific condition (e.g., a certain error type), the function returns
an Option.some containing the recovery logic.
If the defect does not match, the function returns Option.none, allowing the defect to propagate.
Example (Handling Specific Defects)
import { Effect, Cause, Option, Console } from "effect"
// Simulating a runtime errorconst task = Effect.dieMessage("Boom!")
const program = Effect.catchSomeDefect(task, (defect) => {  if (Cause.isIllegalArgumentException(defect)) {    return Option.some(      Console.log(        `Caught an IllegalArgumentException defect: ${defect.message}`      )    )  }  return Option.none()})
// Since we are only catching IllegalArgumentException// we will get an Exit.Failure because we simulated a runtime error.Effect.runPromiseExit(program).then(console.log)// Output:// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Die',//     defect: { _tag: 'RuntimeException' }//   }// }@since ― 2.0.0catchSomeDefect(const task: Effect.Effect<never, never, never>task, (defect: unknowndefect) => {7  if (import CauseCause.const isIllegalArgumentException: (u: unknown) => u is Cause.IllegalArgumentExceptionChecks if a given unknown value is an IllegalArgumentException.@since ― 2.0.0isIllegalArgumentException(defect: unknowndefect)) {8    return import Option@since ― 2.0.0@since ― 2.0.0Option.const some: <Effect.Effect<void, never, never>>(value: Effect.Effect<void, never, never>) => Option.Option<Effect.Effect<void, never, never>>Wraps the given value into an Option to represent its presence.
Example (Creating an Option with a Value)
import { Option } from "effect"
// An Option holding the number 1////      ┌─── Option<number>//      ▼const value = Option.some(1)
console.log(value)// Output: { _id: 'Option', _tag: 'Some', value: 1 }@see ― none for the opposite operation.@since ― 2.0.0some(9      import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(10        `Caught an IllegalArgumentException defect: ${defect: Cause.IllegalArgumentExceptiondefect.Error.message: stringmessage}`11      )12    )13  }14  return import Option@since ― 2.0.0@since ― 2.0.0Option.const none: <never>() => Option.Option<never>Represents the absence of a value by creating an empty Option.
Option.none returns an Option<never>, which is a subtype of Option<A>.
This means you can use it in place of any Option<A> regardless of the type
A.
Example (Creating an Option with No Value)
import { Option } from "effect"
// An Option holding no value////      ┌─── Option<never>//      ▼const noValue = Option.none()
console.log(noValue)// Output: { _id: 'Option', _tag: 'None' }@see ― some for the opposite operation.@since ― 2.0.0none()15})16
17// Since we are only catching IllegalArgumentException18// we will get an Exit.Failure because we simulated a runtime error.19import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <void, never>(effect: Effect.Effect<void, never, never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<void, never>>Runs an effect and returns a Promise that resolves to an Exit,
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
// Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const program: Effect.Effect<void, never, never>program).Promise<Exit<void, never>>.then<void, never>(onfulfilled?: ((value: Exit<void, never>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)20/*21Output:22{23  _id: 'Exit',24  _tag: 'Failure',25  cause: {26    _id: 'Cause',27    _tag: 'Die',28    defect: { _tag: 'RuntimeException' }29  }30}31*/
```
When to Recover from Defects
Defects are unexpected errors that typically shouldn’t be recovered from, as they often indicate serious issues. However, in some cases, such as dynamically loaded plugins, controlled recovery might be needed.
[Edit page](https://github.com/Effect-TS/website/edit/main/content/src/content/docs/docs/error-management/unexpected-errors.mdx)
[Previous  
Expected Errors](/docs/error-management/expected-errors/) [Next  
Fallback](/docs/error-management/fallback/)
