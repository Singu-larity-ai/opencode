---
title: "Matching"
source: "https://effect.website/docs/matching/"
description: "Effect documentation - Matching"
---

# Matching

[Docs](/docs/) [Blog](/blog/) [Podcast](/podcast/) [Play](/play/)
On this page
## On this page
-   [Overview](#_top)
-   [match](#match)
-   [ignore](#ignore)
-   [matchEffect](#matcheffect)
-   [matchCause](#matchcause)
-   [matchCauseEffect](#matchcauseeffect)
# Matching
In the Effect module, similar to other modules like [Option](/docs/data-types/option/#pattern-matching) and [Exit](/docs/data-types/exit/#pattern-matching), we have a `Effect.match` function that allows us to handle different cases simultaneously. Additionally, Effect provides various functions to manage both success and failure scenarios in effectful programs.
## match
[](#match)
`Effect.match` lets you define custom handlers for both success and failure scenarios. You provide separate functions to handle each case, allowing you to process the result if the effect succeeds, or handle the error if the effect fails.
This is useful for structuring your code to respond differently to success or failure without triggering side effects.
**Example** (Handling Both Success and Failure Cases)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const success: Effect.Effect<number, Error, never>success: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, interface ErrorError> = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(42)4
5const const program1: Effect.Effect<string, never, never>program1 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const match: <number, Error, never, string, string>(self: Effect.Effect<number, Error, never>, options: {    readonly onFailure: (error: Error) => string;    readonly onSuccess: (value: number) => string;}) => Effect.Effect<string, never, never> (+1 overload)Handles both success and failure cases of an effect without performing side
effects.
Details
match lets you define custom handlers for both success and failure
scenarios. You provide separate functions to handle each case, allowing you
to process the result if the effect succeeds, or handle the error if the
effect fails.
When to Use
This is useful for structuring your code to respond differently to success or
failure without triggering side effects.
Example (Handling Both Success and Failure Cases)
import { Effect } from "effect"
const success: Effect.Effect<number, Error> = Effect.succeed(42)
const program1 = Effect.match(success, {  onFailure: (error) => `failure: ${error.message}`,  onSuccess: (value) => `success: ${value}`})
// Run and log the result of the successful effectEffect.runPromise(program1).then(console.log)// Output: "success: 42"
const failure: Effect.Effect<number, Error> = Effect.fail(  new Error("Uh oh!"))
const program2 = Effect.match(failure, {  onFailure: (error) => `failure: ${error.message}`,  onSuccess: (value) => `success: ${value}`})
// Run and log the result of the failed effectEffect.runPromise(program2).then(console.log)// Output: "failure: Uh oh!"@see ― matchEffect if you need to perform side effects in the handlers.@since ― 2.0.0match(const success: Effect.Effect<number, Error, never>success, {6  onFailure: (error: Error) => stringonFailure: (error: Errorerror) => `failure: ${error: Errorerror.Error.message: stringmessage}`,7  onSuccess: (value: number) => stringonSuccess: (value: numbervalue) => `success: ${value: numbervalue}`8})9
10// Run and log the result of the successful effect11import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <string, never>(effect: Effect.Effect<string, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<string>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const program1: Effect.Effect<string, never, never>program1).Promise<string>.then<void, never>(onfulfilled?: ((value: string) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)12// Output: "success: 42"13
14const const failure: Effect.Effect<number, Error, never>failure: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, interface ErrorError> = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <Error>(error: Error) => Effect.Effect<never, Error, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(15  new var Error: ErrorConstructornew (message?: string) => ErrorError("Uh oh!")16)17
18const const program2: Effect.Effect<string, never, never>program2 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const match: <number, Error, never, string, string>(self: Effect.Effect<number, Error, never>, options: {    readonly onFailure: (error: Error) => string;    readonly onSuccess: (value: number) => string;}) => Effect.Effect<string, never, never> (+1 overload)Handles both success and failure cases of an effect without performing side
effects.
Details
match lets you define custom handlers for both success and failure
scenarios. You provide separate functions to handle each case, allowing you
to process the result if the effect succeeds, or handle the error if the
effect fails.
When to Use
This is useful for structuring your code to respond differently to success or
failure without triggering side effects.
Example (Handling Both Success and Failure Cases)
import { Effect } from "effect"
const success: Effect.Effect<number, Error> = Effect.succeed(42)
const program1 = Effect.match(success, {  onFailure: (error) => `failure: ${error.message}`,  onSuccess: (value) => `success: ${value}`})
// Run and log the result of the successful effectEffect.runPromise(program1).then(console.log)// Output: "success: 42"
const failure: Effect.Effect<number, Error> = Effect.fail(  new Error("Uh oh!"))
const program2 = Effect.match(failure, {  onFailure: (error) => `failure: ${error.message}`,  onSuccess: (value) => `success: ${value}`})
// Run and log the result of the failed effectEffect.runPromise(program2).then(console.log)// Output: "failure: Uh oh!"@see ― matchEffect if you need to perform side effects in the handlers.@since ― 2.0.0match(const failure: Effect.Effect<number, Error, never>failure, {19  onFailure: (error: Error) => stringonFailure: (error: Errorerror) => `failure: ${error: Errorerror.Error.message: stringmessage}`,20  onSuccess: (value: number) => stringonSuccess: (value: numbervalue) => `success: ${value: numbervalue}`21})22
23// Run and log the result of the failed effect24import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <string, never>(effect: Effect.Effect<string, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<string>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const program2: Effect.Effect<string, never, never>program2).Promise<string>.then<void, never>(onfulfilled?: ((value: string) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)25// Output: "failure: Uh oh!"
```
## ignore
[](#ignore)
`Effect.ignore` allows you to run an effect without caring about its result, whether it succeeds or fails.
This is useful when you only care about the side effects of the effect and do not need to handle or process its outcome.
**Example** (Using `Effect.ignore` to Discard Values)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3//      ┌─── Effect<number, string, never>4//      ▼5const const task: Effect.Effect<number, string, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("Uh oh!").Pipeable.pipe<Effect.Effect<never, string, never>, Effect.Effect<number, string, never>>(this: Effect.Effect<never, string, never>, ab: (_: Effect.Effect<never, string, never>) => Effect.Effect<number, string, never>): Effect.Effect<number, string, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <number>(value: number) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<number, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
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
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(5))6
7//      ┌─── Effect<void, never, never>8//      ▼9const const program: Effect.Effect<void, never, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const ignore: <number, string, never>(self: Effect.Effect<number, string, never>) => Effect.Effect<void, never, never>Discards both the success and failure values of an effect.
When to Use
ignore allows you to run an effect without caring about its result, whether
it succeeds or fails. This is useful when you only care about the side
effects of the effect and do not need to handle or process its outcome.
Example (Using Effect.ignore to Discard Values)
import { Effect } from "effect"
//      ┌─── Effect<number, string, never>//      ▼const task = Effect.fail("Uh oh!").pipe(Effect.as(5))
//      ┌─── Effect<void, never, never>//      ▼const program = Effect.ignore(task)@see ― ignoreLogged to log failures while ignoring them.@since ― 2.0.0ignore(const task: Effect.Effect<number, string, never>task)
```
## matchEffect
[](#matcheffect)
The `Effect.matchEffect` function is similar to [Effect.match](#match), but it enables you to perform side effects in the handlers for both success and failure outcomes.
This is useful when you need to execute additional actions, like logging or notifying users, based on whether an effect succeeds or fails.
**Example** (Handling Success and Failure with Side Effects)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const success: Effect.Effect<number, Error, never>success: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, interface ErrorError> = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(42)4const const failure: Effect.Effect<number, Error, never>failure: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, interface ErrorError> = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <Error>(error: Error) => Effect.Effect<never, Error, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(5  new var Error: ErrorConstructornew (message?: string) => ErrorError("Uh oh!")6)7
8const const program1: Effect.Effect<string, never, never>program1 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const matchEffect: <number, Error, never, string, never, never, string, never, never>(self: Effect.Effect<number, Error, never>, options: {    readonly onFailure: (e: Error) => Effect.Effect<string, never, never>;    readonly onSuccess: (a: number) => Effect.Effect<string, never, never>;}) => Effect.Effect<string, never, never> (+1 overload)Handles both success and failure cases of an effect, allowing for additional
side effects.
Details
The matchEffect function is similar to
match
, but it enables you to
perform side effects in the handlers for both success and failure outcomes.
When to Use
This is useful when you need to execute additional actions, like logging or
notifying users, based on whether an effect succeeds or fails.
Example (Handling Both Success and Failure Cases with Side Effects)
import { Effect } from "effect"
const success: Effect.Effect<number, Error> = Effect.succeed(42)const failure: Effect.Effect<number, Error> = Effect.fail(  new Error("Uh oh!"))
const program1 = Effect.matchEffect(success, {  onFailure: (error) =>    Effect.succeed(`failure: ${error.message}`).pipe(      Effect.tap(Effect.log)    ),  onSuccess: (value) =>    Effect.succeed(`success: ${value}`).pipe(Effect.tap(Effect.log))})
console.log(Effect.runSync(program1))// Output:// timestamp=... level=INFO fiber=#0 message="success: 42"// success: 42
const program2 = Effect.matchEffect(failure, {  onFailure: (error) =>    Effect.succeed(`failure: ${error.message}`).pipe(      Effect.tap(Effect.log)    ),  onSuccess: (value) =>    Effect.succeed(`success: ${value}`).pipe(Effect.tap(Effect.log))})
console.log(Effect.runSync(program2))// Output:// timestamp=... level=INFO fiber=#1 message="failure: Uh oh!"// failure: Uh oh!@see ― match if you don't need side effects and only want to handle the
result or failure.@since ― 2.0.0matchEffect(const success: Effect.Effect<number, Error, never>success, {9  onFailure: (e: Error) => Effect.Effect<string, never, never>onFailure: (error: Errorerror) =>10    import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(`failure: ${error: Errorerror.Error.message: stringmessage}`).Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(11      import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <string, Effect.Effect<void, never, never>>(f: (a: string) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<string, E, R>) => Effect.Effect<string, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
value.
Details
This function works similarly to flatMap, but it ignores the result of the
function passed to it. The value from the previous effect remains available
for the next part of the chain. Note that if the side effect fails, the
entire chain will fail too.
When to Use
Use this function when you want to perform a side effect, like logging or
tracking, without modifying the main value. This is useful when you need to
observe or record an action but want the original value to be passed to the
next step.
Example (Logging a step in a pipeline)
import { Console, Effect, pipe } from "effect"
// Function to apply a discount safely to a transaction amountconst applyDiscount = (  total: number,  discountRate: number): Effect.Effect<number, Error> =>  discountRate === 0    ? Effect.fail(new Error("Discount rate cannot be zero"))    : Effect.succeed(total - (total * discountRate) / 100)
// Simulated asynchronous task to fetch a transaction amount from databaseconst fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
const finalAmount = pipe(  fetchTransactionAmount,  // Log the fetched transaction amount  Effect.tap((amount) => Console.log(`Apply a discount to: ${amount}`)),  // `amount` is still available!  Effect.flatMap((amount) => applyDiscount(amount, 5)))
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const log: (...message: ReadonlyArray<any>) => Effect.Effect<void, never, never>Logs one or more messages or error causes at the current log level.
Details
This function provides a simple way to log messages or error causes during
the execution of your effects. By default, logs are recorded at the INFO
level, but this can be adjusted using other logging utilities
(Logger.withMinimumLogLevel). Multiple items, including Cause instances,
can be logged in a single call. When logging Cause instances, detailed
error information is included in the log output.
The log output includes useful metadata like the current timestamp, log
level, and fiber ID, making it suitable for debugging and tracking purposes.
This function does not interrupt or alter the effect's execution flow.
Example
import { Cause, Effect } from "effect"
const program = Effect.log(  "message1",  "message2",  Cause.die("Oh no!"),  Cause.die("Oh uh!"))
Effect.runFork(program)// Output:// timestamp=... level=INFO fiber=#0 message=message1 message=message2 cause="Error: Oh no!// Error: Oh uh!"@since ― 2.0.0log)12    ),13  onSuccess: (a: number) => Effect.Effect<string, never, never>onSuccess: (value: numbervalue) =>14    import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(`success: ${value: numbervalue}`).Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <string, Effect.Effect<void, never, never>>(f: (a: string) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<string, E, R>) => Effect.Effect<string, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
value.
Details
This function works similarly to flatMap, but it ignores the result of the
function passed to it. The value from the previous effect remains available
for the next part of the chain. Note that if the side effect fails, the
entire chain will fail too.
When to Use
Use this function when you want to perform a side effect, like logging or
tracking, without modifying the main value. This is useful when you need to
observe or record an action but want the original value to be passed to the
next step.
Example (Logging a step in a pipeline)
import { Console, Effect, pipe } from "effect"
// Function to apply a discount safely to a transaction amountconst applyDiscount = (  total: number,  discountRate: number): Effect.Effect<number, Error> =>  discountRate === 0    ? Effect.fail(new Error("Discount rate cannot be zero"))    : Effect.succeed(total - (total * discountRate) / 100)
// Simulated asynchronous task to fetch a transaction amount from databaseconst fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
const finalAmount = pipe(  fetchTransactionAmount,  // Log the fetched transaction amount  Effect.tap((amount) => Console.log(`Apply a discount to: ${amount}`)),  // `amount` is still available!  Effect.flatMap((amount) => applyDiscount(amount, 5)))
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const log: (...message: ReadonlyArray<any>) => Effect.Effect<void, never, never>Logs one or more messages or error causes at the current log level.
Details
This function provides a simple way to log messages or error causes during
the execution of your effects. By default, logs are recorded at the INFO
level, but this can be adjusted using other logging utilities
(Logger.withMinimumLogLevel). Multiple items, including Cause instances,
can be logged in a single call. When logging Cause instances, detailed
error information is included in the log output.
The log output includes useful metadata like the current timestamp, log
level, and fiber ID, making it suitable for debugging and tracking purposes.
This function does not interrupt or alter the effect's execution flow.
Example
import { Cause, Effect } from "effect"
const program = Effect.log(  "message1",  "message2",  Cause.die("Oh no!"),  Cause.die("Oh uh!"))
Effect.runFork(program)// Output:// timestamp=... level=INFO fiber=#0 message=message1 message=message2 cause="Error: Oh no!// Error: Oh uh!"@since ― 2.0.0log))15})16
17var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
throwing an error.@since ― 2.0.0runSync(const program1: Effect.Effect<string, never, never>program1))18/*19Output:20timestamp=... level=INFO fiber=#0 message="success: 42"21success: 4222*/23
24const const program2: Effect.Effect<string, never, never>program2 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const matchEffect: <number, Error, never, string, never, never, string, never, never>(self: Effect.Effect<number, Error, never>, options: {    readonly onFailure: (e: Error) => Effect.Effect<string, never, never>;    readonly onSuccess: (a: number) => Effect.Effect<string, never, never>;}) => Effect.Effect<string, never, never> (+1 overload)Handles both success and failure cases of an effect, allowing for additional
side effects.
Details
The matchEffect function is similar to
match
, but it enables you to
perform side effects in the handlers for both success and failure outcomes.
When to Use
This is useful when you need to execute additional actions, like logging or
notifying users, based on whether an effect succeeds or fails.
Example (Handling Both Success and Failure Cases with Side Effects)
import { Effect } from "effect"
const success: Effect.Effect<number, Error> = Effect.succeed(42)const failure: Effect.Effect<number, Error> = Effect.fail(  new Error("Uh oh!"))
const program1 = Effect.matchEffect(success, {  onFailure: (error) =>    Effect.succeed(`failure: ${error.message}`).pipe(      Effect.tap(Effect.log)    ),  onSuccess: (value) =>    Effect.succeed(`success: ${value}`).pipe(Effect.tap(Effect.log))})
console.log(Effect.runSync(program1))// Output:// timestamp=... level=INFO fiber=#0 message="success: 42"// success: 42
const program2 = Effect.matchEffect(failure, {  onFailure: (error) =>    Effect.succeed(`failure: ${error.message}`).pipe(      Effect.tap(Effect.log)    ),  onSuccess: (value) =>    Effect.succeed(`success: ${value}`).pipe(Effect.tap(Effect.log))})
console.log(Effect.runSync(program2))// Output:// timestamp=... level=INFO fiber=#1 message="failure: Uh oh!"// failure: Uh oh!@see ― match if you don't need side effects and only want to handle the
result or failure.@since ― 2.0.0matchEffect(const failure: Effect.Effect<number, Error, never>failure, {25  onFailure: (e: Error) => Effect.Effect<string, never, never>onFailure: (error: Errorerror) =>26    import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(`failure: ${error: Errorerror.Error.message: stringmessage}`).Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(27      import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <string, Effect.Effect<void, never, never>>(f: (a: string) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<string, E, R>) => Effect.Effect<string, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
value.
Details
This function works similarly to flatMap, but it ignores the result of the
function passed to it. The value from the previous effect remains available
for the next part of the chain. Note that if the side effect fails, the
entire chain will fail too.
When to Use
Use this function when you want to perform a side effect, like logging or
tracking, without modifying the main value. This is useful when you need to
observe or record an action but want the original value to be passed to the
next step.
Example (Logging a step in a pipeline)
import { Console, Effect, pipe } from "effect"
// Function to apply a discount safely to a transaction amountconst applyDiscount = (  total: number,  discountRate: number): Effect.Effect<number, Error> =>  discountRate === 0    ? Effect.fail(new Error("Discount rate cannot be zero"))    : Effect.succeed(total - (total * discountRate) / 100)
// Simulated asynchronous task to fetch a transaction amount from databaseconst fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
const finalAmount = pipe(  fetchTransactionAmount,  // Log the fetched transaction amount  Effect.tap((amount) => Console.log(`Apply a discount to: ${amount}`)),  // `amount` is still available!  Effect.flatMap((amount) => applyDiscount(amount, 5)))
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const log: (...message: ReadonlyArray<any>) => Effect.Effect<void, never, never>Logs one or more messages or error causes at the current log level.
Details
This function provides a simple way to log messages or error causes during
the execution of your effects. By default, logs are recorded at the INFO
level, but this can be adjusted using other logging utilities
(Logger.withMinimumLogLevel). Multiple items, including Cause instances,
can be logged in a single call. When logging Cause instances, detailed
error information is included in the log output.
The log output includes useful metadata like the current timestamp, log
level, and fiber ID, making it suitable for debugging and tracking purposes.
This function does not interrupt or alter the effect's execution flow.
Example
import { Cause, Effect } from "effect"
const program = Effect.log(  "message1",  "message2",  Cause.die("Oh no!"),  Cause.die("Oh uh!"))
Effect.runFork(program)// Output:// timestamp=... level=INFO fiber=#0 message=message1 message=message2 cause="Error: Oh no!// Error: Oh uh!"@since ― 2.0.0log)28    ),29  onSuccess: (a: number) => Effect.Effect<string, never, never>onSuccess: (value: numbervalue) =>30    import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(`success: ${value: numbervalue}`).Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <string, Effect.Effect<void, never, never>>(f: (a: string) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<string, E, R>) => Effect.Effect<string, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
value.
Details
This function works similarly to flatMap, but it ignores the result of the
function passed to it. The value from the previous effect remains available
for the next part of the chain. Note that if the side effect fails, the
entire chain will fail too.
When to Use
Use this function when you want to perform a side effect, like logging or
tracking, without modifying the main value. This is useful when you need to
observe or record an action but want the original value to be passed to the
next step.
Example (Logging a step in a pipeline)
import { Console, Effect, pipe } from "effect"
// Function to apply a discount safely to a transaction amountconst applyDiscount = (  total: number,  discountRate: number): Effect.Effect<number, Error> =>  discountRate === 0    ? Effect.fail(new Error("Discount rate cannot be zero"))    : Effect.succeed(total - (total * discountRate) / 100)
// Simulated asynchronous task to fetch a transaction amount from databaseconst fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
const finalAmount = pipe(  fetchTransactionAmount,  // Log the fetched transaction amount  Effect.tap((amount) => Console.log(`Apply a discount to: ${amount}`)),  // `amount` is still available!  Effect.flatMap((amount) => applyDiscount(amount, 5)))
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const log: (...message: ReadonlyArray<any>) => Effect.Effect<void, never, never>Logs one or more messages or error causes at the current log level.
Details
This function provides a simple way to log messages or error causes during
the execution of your effects. By default, logs are recorded at the INFO
level, but this can be adjusted using other logging utilities
(Logger.withMinimumLogLevel). Multiple items, including Cause instances,
can be logged in a single call. When logging Cause instances, detailed
error information is included in the log output.
The log output includes useful metadata like the current timestamp, log
level, and fiber ID, making it suitable for debugging and tracking purposes.
This function does not interrupt or alter the effect's execution flow.
Example
import { Cause, Effect } from "effect"
const program = Effect.log(  "message1",  "message2",  Cause.die("Oh no!"),  Cause.die("Oh uh!"))
Effect.runFork(program)// Output:// timestamp=... level=INFO fiber=#0 message=message1 message=message2 cause="Error: Oh no!// Error: Oh uh!"@since ― 2.0.0log))31})32
33var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
throwing an error.@since ― 2.0.0runSync(const program2: Effect.Effect<string, never, never>program2))34/*35Output:36timestamp=... level=INFO fiber=#1 message="failure: Uh oh!"37failure: Uh oh!38*/
```
## matchCause
[](#matchcause)
The `Effect.matchCause` function allows you to handle failures with access to the full [cause](/docs/data-types/cause/) of the failure within a fiber.
This is useful for differentiating between different types of errors, such as regular failures, defects, or interruptions. You can provide specific handling logic for each failure type based on the cause.
**Example** (Handling Different Failure Causes)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const task: Effect.Effect<number, Error, never>task: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, interface ErrorError> = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const die: (defect: unknown) => Effect.Effect<never>Creates an effect that terminates a fiber with a specified error.
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
message.@since ― 2.0.0die("Uh oh!")4
5const const program: Effect.Effect<string, never, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const matchCause: <number, Error, never, string, string>(self: Effect.Effect<number, Error, never>, options: {    readonly onFailure: (cause: Cause<Error>) => string;    readonly onSuccess: (a: number) => string;}) => Effect.Effect<string, never, never> (+1 overload)Handles failures by matching the cause of failure.
Details
The matchCause function allows you to handle failures with access to the
full cause of the failure within a fiber.
When to Use
This is useful for differentiating between different types of errors, such as
regular failures, defects, or interruptions. You can provide specific
handling logic for each failure type based on the cause.
Example (Handling Different Failure Causes)
import { Effect } from "effect"
const task: Effect.Effect<number, Error> = Effect.die("Uh oh!")
const program = Effect.matchCause(task, {  onFailure: (cause) => {    switch (cause._tag) {      case "Fail":        // Handle standard failure        return `Fail: ${cause.error.message}`      case "Die":        // Handle defects (unexpected errors)        return `Die: ${cause.defect}`      case "Interrupt":        // Handle interruption        return `${cause.fiberId} interrupted!`    }    // Fallback for other causes    return "failed due to other causes"  },  onSuccess: (value) =>    // task completes successfully    `succeeded with ${value} value`})
Effect.runPromise(program).then(console.log)// Output: "Die: Uh oh!"@see ― matchCauseEffect if you need to perform side effects in the
handlers.@see ― match if you don't need to handle the cause of the failure.@since ― 2.0.0matchCause(const task: Effect.Effect<number, Error, never>task, {6  onFailure: (cause: Cause<Error>) => stringonFailure: (cause: Cause<Error>cause) => {7    switch (cause: Cause<Error>cause._tag: "Empty" | "Die" | "Interrupt" | "Fail" | "Sequential" | "Parallel"_tag) {8      case "Fail":9        // Handle standard failure10        return `Fail: ${cause: Fail<Error>cause.Fail<Error>.error: Errorerror.Error.message: stringmessage}`11      case "Die":12        // Handle defects (unexpected errors)13        return `Die: ${cause: Diecause.Die.defect: unknowndefect}`14      case "Interrupt":15        // Handle interruption16        return `${cause: Interruptcause.Interrupt.fiberId: FiberIdfiberId} interrupted!`17    }18    // Fallback for other causes19    return "failed due to other causes"20  },21  onSuccess: (a: number) => stringonSuccess: (value: numbervalue) =>22    // task completes successfully23    `succeeded with ${value: numbervalue} value`24})25
26import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <string, never>(effect: Effect.Effect<string, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<string>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<string, never, never>program).Promise<string>.then<void, never>(onfulfilled?: ((value: string) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)27// Output: "Die: Uh oh!"
```
## matchCauseEffect
[](#matchcauseeffect)
The `Effect.matchCauseEffect` function works similarly to [Effect.matchCause](#matchcause), but it also allows you to perform additional side effects based on the failure cause.
This function provides access to the complete [cause](/docs/data-types/cause/) of the failure, making it possible to differentiate between various failure types, and allows you to respond accordingly while performing side effects (like logging or other operations).
**Example** (Handling Different Failure Causes with Side Effects)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const task: Effect.Effect<number, Error, never>task: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, interface ErrorError> = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const die: (defect: unknown) => Effect.Effect<never>Creates an effect that terminates a fiber with a specified error.
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
message.@since ― 2.0.0die("Uh oh!")4
5const const program: Effect.Effect<void, never, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const matchCauseEffect: <number, Error, never, void, never, never, void, never, never>(self: Effect.Effect<number, Error, never>, options: {    readonly onFailure: (cause: Cause<Error>) => Effect.Effect<void, never, never>;    readonly onSuccess: (a: number) => Effect.Effect<void, never, never>;}) => Effect.Effect<void, never, never> (+1 overload)Handles failures with access to the cause and allows performing side effects.
Details
The matchCauseEffect function works similarly to
matchCause
, but it
also allows you to perform additional side effects based on the failure
cause. This function provides access to the complete cause of the failure,
making it possible to differentiate between various failure types, and allows
you to respond accordingly while performing side effects (like logging or
other operations).
Example (Handling Different Failure Causes with Side Effects)
import { Effect, Console } from "effect"
const task: Effect.Effect<number, Error> = Effect.die("Uh oh!")
const program = Effect.matchCauseEffect(task, {  onFailure: (cause) => {    switch (cause._tag) {      case "Fail":        // Handle standard failure with a logged message        return Console.log(`Fail: ${cause.error.message}`)      case "Die":        // Handle defects (unexpected errors) by logging the defect        return Console.log(`Die: ${cause.defect}`)      case "Interrupt":        // Handle interruption and log the fiberId that was interrupted        return Console.log(`${cause.fiberId} interrupted!`)    }    // Fallback for other causes    return Console.log("failed due to other causes")  },  onSuccess: (value) =>    // Log success if the task completes successfully    Console.log(`succeeded with ${value} value`)})
Effect.runPromise(program)// Output: "Die: Uh oh!"@see ― matchCause if you don't need side effects and only want to handle the result or failure.@see ― matchEffect if you don't need to handle the cause of the failure.@since ― 2.0.0matchCauseEffect(const task: Effect.Effect<number, Error, never>task, {6  onFailure: (cause: Cause<Error>) => Effect.Effect<void, never, never>onFailure: (cause: Cause<Error>cause) => {7    switch (cause: Cause<Error>cause._tag: "Empty" | "Die" | "Interrupt" | "Fail" | "Sequential" | "Parallel"_tag) {8      case "Fail":9        // Handle standard failure with a logged message10        return import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`Fail: ${cause: Fail<Error>cause.Fail<Error>.error: Errorerror.Error.message: stringmessage}`)11      case "Die":12        // Handle defects (unexpected errors) by logging the defect13        return import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`Die: ${cause: Diecause.Die.defect: unknowndefect}`)14      case "Interrupt":15        // Handle interruption and log the fiberId that was interrupted16        return import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`${cause: Interruptcause.Interrupt.fiberId: FiberIdfiberId} interrupted!`)17    }18    // Fallback for other causes19    return import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("failed due to other causes")20  },21  onSuccess: (a: number) => Effect.Effect<void, never, never>onSuccess: (value: numbervalue) =>22    // Log success if the task completes successfully23    import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`succeeded with ${value: numbervalue} value`)24})25
26import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <void, never>(effect: Effect.Effect<void, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<void>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<void, never, never>program)27// Output: "Die: Uh oh!"
```
[Edit page](https://github.com/Effect-TS/website/edit/main/content/src/content/docs/docs/error-management/matching.mdx)
[Previous  
Fallback](/docs/error-management/fallback/) [Next  
Retrying](/docs/error-management/retrying/)
