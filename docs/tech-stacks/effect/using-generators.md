---
title: "Using Generators"
source: "https://effect.website/docs/using-generators/"
description: "Effect documentation - Using Generators"
---

# Using Generators

[Docs](/docs/) [Blog](/blog/) [Podcast](/podcast/) [Play](/play/)
On this page
## On this page
-   [Overview](#_top)
-   [Understanding Effect.gen](#understanding-effectgen)
-   [Comparing Effect.gen with async/await](#comparing-effectgen-with-asyncawait)
-   [Embracing Control Flow](#embracing-control-flow)
-   [How to Raise Errors](#how-to-raise-errors)
-   [The Role of Short-Circuiting](#the-role-of-short-circuiting)
-   [Passing this](#passing-this)
-   [Adapter](#adapter)
# Using Generators
Effect offers a convenient syntax, similar to `async`/`await`, to write effectful code using [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator).
Optional Feature
The use of generators is an optional feature in Effect. If you find generators unfamiliar or prefer a different coding style, you can explore the documentation about [Building Pipelines](/docs/getting-started/building-pipelines/) in Effect.
## Understanding Effect.gen
[](#understanding-effectgen)
The `Effect.gen` utility simplifies the task of writing effectful code by utilizing JavaScript’s generator functions. This method helps your code appear and behave more like traditional synchronous code, which enhances both readability and error management.
**Example** (Performing Transactions with Discounts)
Let’s explore a practical program that performs a series of data transformations commonly found in application logic:
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3// Function to add a small service charge to a transaction amount4const const addServiceCharge: (amount: number) => numberaddServiceCharge = (amount: numberamount: number) => amount: numberamount + 15
6// Function to apply a discount safely to a transaction amount7const const applyDiscount: (total: number, discountRate: number) => Effect.Effect<number, Error>applyDiscount = (8  total: numbertotal: number,9  discountRate: numberdiscountRate: number10): import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, interface ErrorError> =>11  discountRate: numberdiscountRate === 012    ? import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <Error>(error: Error) => Effect.Effect<never, Error, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(new var Error: ErrorConstructornew (message?: string) => ErrorError("Discount rate cannot be zero"))13    : import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(total: numbertotal - (total: numbertotal * discountRate: numberdiscountRate) / 100)14
15// Simulated asynchronous task to fetch a transaction amount from a16// database17const const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const promise: <number>(evaluate: (signal: AbortSignal) => PromiseLike<number>) => Effect.Effect<number, never, never>Creates an Effect that represents an asynchronous computation guaranteed to
succeed.
Details
The provided function (thunk) returns a Promise that should never reject; if it does, the error
will be treated as a "defect".
This defect is not a standard error but indicates a flaw in the logic that
was expected to be error-free. You can think of it similar to an unexpected
crash in the program, which can be further managed or logged using tools like
catchAllDefect
.
Interruptions
An optional AbortSignal can be provided to allow for interruption of the
wrapped Promise API.
When to Use
Use this function when you are sure the operation will not reject.
Example (Delayed Message)
import { Effect } from "effect"
const delay = (message: string) =>  Effect.promise<string>(    () =>      new Promise((resolve) => {        setTimeout(() => {          resolve(message)        }, 2000)      })  )
//      ┌─── Effect<string, never, never>//      ▼const program = delay("Async operation completed successfully!")@see ― tryPromise for a version that can handle failures.@since ― 2.0.0promise(() => var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<number>(value: number): Promise<number> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve(100))18
19// Simulated asynchronous task to fetch a discount rate from a20// configuration file21const const fetchDiscountRate: Effect.Effect<number, never, never>fetchDiscountRate = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const promise: <number>(evaluate: (signal: AbortSignal) => PromiseLike<number>) => Effect.Effect<number, never, never>Creates an Effect that represents an asynchronous computation guaranteed to
succeed.
Details
The provided function (thunk) returns a Promise that should never reject; if it does, the error
will be treated as a "defect".
This defect is not a standard error but indicates a flaw in the logic that
was expected to be error-free. You can think of it similar to an unexpected
crash in the program, which can be further managed or logged using tools like
catchAllDefect
.
Interruptions
An optional AbortSignal can be provided to allow for interruption of the
wrapped Promise API.
When to Use
Use this function when you are sure the operation will not reject.
Example (Delayed Message)
import { Effect } from "effect"
const delay = (message: string) =>  Effect.promise<string>(    () =>      new Promise((resolve) => {        setTimeout(() => {          resolve(message)        }, 2000)      })  )
//      ┌─── Effect<string, never, never>//      ▼const program = delay("Async operation completed successfully!")@see ― tryPromise for a version that can handle failures.@since ― 2.0.0promise(() => var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<number>(value: number): Promise<number> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve(5))22
23// Assembling the program using a generator function24const const program: Effect.Effect<string, Error, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<number, Error, never>>, string>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<number, Error, never>>, string, never>) => Effect.Effect<string, Error, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {25  // Retrieve the transaction amount26  const const transactionAmount: numbertransactionAmount = yield* const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount27
28  // Retrieve the discount rate29  const const discountRate: numberdiscountRate = yield* const fetchDiscountRate: Effect.Effect<number, never, never>fetchDiscountRate30
31  // Calculate discounted amount32  const const discountedAmount: numberdiscountedAmount = yield* const applyDiscount: (total: number, discountRate: number) => Effect.Effect<number, Error>applyDiscount(33    const transactionAmount: numbertransactionAmount,34    const discountRate: numberdiscountRate35  )36
37  // Apply service charge38  const const finalAmount: numberfinalAmount = const addServiceCharge: (amount: number) => numberaddServiceCharge(const discountedAmount: numberdiscountedAmount)39
40  // Return the total amount after applying the charge41  return `Final amount to charge: ${const finalAmount: numberfinalAmount}`42})43
44// Execute the program and log the result45import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <string, Error>(effect: Effect.Effect<string, Error, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<string>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<string, Error, never>program).Promise<string>.then<void, never>(onfulfilled?: ((value: string) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)46// Output: Final amount to charge: 96
```
Key steps to follow when using `Effect.gen`:
-   Wrap your logic in `Effect.gen`
-   Use `yield*` to handle effects
-   Return the final result
If any of the effects that you handle inside of the generator with `yield*` fail, then the generator will stop and exit with that failure.
Required TypeScript Configuration
The generator API is only available when using the `downlevelIteration` flag or with a `target` of `"es2015"` or higher in your `tsconfig.json` file.
## Comparing Effect.gen with async/await
[](#comparing-effectgen-with-asyncawait)
If you are familiar with `async`/`await`, you may notice that the flow of writing code is similar.
Let’s compare the two approaches:
-   [Using Effect.gen](#tab-panel-128)
-   [Using Async / Await](#tab-panel-129)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const addServiceCharge: (amount: number) => numberaddServiceCharge = (amount: numberamount: number) => amount: numberamount + 14
5const const applyDiscount: (total: number, discountRate: number) => Effect.Effect<number, Error>applyDiscount = (6  total: numbertotal: number,7  discountRate: numberdiscountRate: number8): import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, interface ErrorError> =>9  discountRate: numberdiscountRate === 010    ? import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <Error>(error: Error) => Effect.Effect<never, Error, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(new var Error: ErrorConstructornew (message?: string) => ErrorError("Discount rate cannot be zero"))11    : import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(total: numbertotal - (total: numbertotal * discountRate: numberdiscountRate) / 100)12
13const const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const promise: <number>(evaluate: (signal: AbortSignal) => PromiseLike<number>) => Effect.Effect<number, never, never>Creates an Effect that represents an asynchronous computation guaranteed to
succeed.
Details
The provided function (thunk) returns a Promise that should never reject; if it does, the error
will be treated as a "defect".
This defect is not a standard error but indicates a flaw in the logic that
was expected to be error-free. You can think of it similar to an unexpected
crash in the program, which can be further managed or logged using tools like
catchAllDefect
.
Interruptions
An optional AbortSignal can be provided to allow for interruption of the
wrapped Promise API.
When to Use
Use this function when you are sure the operation will not reject.
Example (Delayed Message)
import { Effect } from "effect"
const delay = (message: string) =>  Effect.promise<string>(    () =>      new Promise((resolve) => {        setTimeout(() => {          resolve(message)        }, 2000)      })  )
//      ┌─── Effect<string, never, never>//      ▼const program = delay("Async operation completed successfully!")@see ― tryPromise for a version that can handle failures.@since ― 2.0.0promise(() => var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<number>(value: number): Promise<number> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve(100))14
15const const fetchDiscountRate: Effect.Effect<number, never, never>fetchDiscountRate = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const promise: <number>(evaluate: (signal: AbortSignal) => PromiseLike<number>) => Effect.Effect<number, never, never>Creates an Effect that represents an asynchronous computation guaranteed to
succeed.
Details
The provided function (thunk) returns a Promise that should never reject; if it does, the error
will be treated as a "defect".
This defect is not a standard error but indicates a flaw in the logic that
was expected to be error-free. You can think of it similar to an unexpected
crash in the program, which can be further managed or logged using tools like
catchAllDefect
.
Interruptions
An optional AbortSignal can be provided to allow for interruption of the
wrapped Promise API.
When to Use
Use this function when you are sure the operation will not reject.
Example (Delayed Message)
import { Effect } from "effect"
const delay = (message: string) =>  Effect.promise<string>(    () =>      new Promise((resolve) => {        setTimeout(() => {          resolve(message)        }, 2000)      })  )
//      ┌─── Effect<string, never, never>//      ▼const program = delay("Async operation completed successfully!")@see ― tryPromise for a version that can handle failures.@since ― 2.0.0promise(() => var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<number>(value: number): Promise<number> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve(5))16
17export const const program: Effect.Effect<string, Error, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<number, Error, never>>, string>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<number, Error, never>>, string, never>) => Effect.Effect<string, Error, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {18  const const transactionAmount: numbertransactionAmount = yield* const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount19  const const discountRate: numberdiscountRate = yield* const fetchDiscountRate: Effect.Effect<number, never, never>fetchDiscountRate20  const const discountedAmount: numberdiscountedAmount = yield* const applyDiscount: (total: number, discountRate: number) => Effect.Effect<number, Error>applyDiscount(21    const transactionAmount: numbertransactionAmount,22    const discountRate: numberdiscountRate23  )24  const const finalAmount: numberfinalAmount = const addServiceCharge: (amount: number) => numberaddServiceCharge(const discountedAmount: numberdiscountedAmount)25  return `Final amount to charge: ${const finalAmount: numberfinalAmount}`26})
```
```
1const const addServiceCharge: (amount: number) => numberaddServiceCharge = (amount: numberamount: number) => amount: numberamount + 12
3const const applyDiscount: (total: number, discountRate: number) => Promise<number>applyDiscount = (4  total: numbertotal: number,5  discountRate: numberdiscountRate: number6): interface Promise<T>Represents the completion of an asynchronous operationPromise<number> =>7  discountRate: numberdiscountRate === 08    ? var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.reject<number>(reason?: any): Promise<number>Creates a new rejected promise for the provided reason.@param ― reason The reason the promise was rejected.@returns ― A new rejected Promise.reject(new var Error: ErrorConstructornew (message?: string) => ErrorError("Discount rate cannot be zero"))9    : var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<number>(value: number): Promise<number> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve(total: numbertotal - (total: numbertotal * discountRate: numberdiscountRate) / 100)10
11const const fetchTransactionAmount: Promise<number>fetchTransactionAmount = var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<number>(value: number): Promise<number> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve(100)12
13const const fetchDiscountRate: Promise<number>fetchDiscountRate = var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<number>(value: number): Promise<number> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve(5)14
15export const const program: () => Promise<string>program = async function () {16  const const transactionAmount: numbertransactionAmount = await const fetchTransactionAmount: Promise<number>fetchTransactionAmount17  const const discountRate: numberdiscountRate = await const fetchDiscountRate: Promise<number>fetchDiscountRate18  const const discountedAmount: numberdiscountedAmount = await const applyDiscount: (total: number, discountRate: number) => Promise<number>applyDiscount(19    const transactionAmount: numbertransactionAmount,20    const discountRate: numberdiscountRate21  )22  const const finalAmount: numberfinalAmount = const addServiceCharge: (amount: number) => numberaddServiceCharge(const discountedAmount: numberdiscountedAmount)23  return `Final amount to charge: ${const finalAmount: numberfinalAmount}`24}
```
It’s important to note that although the code appears similar, the two programs are not identical. The purpose of comparing them side by side is just to highlight the resemblance in how they are written.
## Embracing Control Flow
[](#embracing-control-flow)
One significant advantage of using `Effect.gen` in conjunction with generators is its capability to employ standard control flow constructs within the generator function. These constructs include `if`/`else`, `for`, `while`, and other branching and looping mechanisms, enhancing your ability to express complex control flow logic in your code.
**Example** (Using Control Flow)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const calculateTax: (amount: number, taxRate: number) => Effect.Effect<number, Error>calculateTax = (4  amount: numberamount: number,5  taxRate: numbertaxRate: number6): import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, interface ErrorError> =>7  taxRate: numbertaxRate > 08    ? import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed((amount: numberamount * taxRate: numbertaxRate) / 100)9    : import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <Error>(error: Error) => Effect.Effect<never, Error, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(new var Error: ErrorConstructornew (message?: string) => ErrorError("Invalid tax rate"))10
11const const program: Effect.Effect<void, Error, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<number, Error, never>>, void>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<number, Error, never>>, void, never>) => Effect.Effect<void, Error, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {12  let let i: numberi = 113
14  while (true) {15    if (let i: numberi === 10) {16      break // Break the loop when counter reaches 1017    } else {18      if (let i: numberi % 2 === 0) {19        // Calculate tax for even numbers20        var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log(yield* const calculateTax: (amount: number, taxRate: number) => Effect.Effect<number, Error>calculateTax(100, let i: numberi))21      }22      let i: numberi++23      continue24    }25  }26})27
28import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <void, Error>(effect: Effect.Effect<void, Error, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<void>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<void, Error, never>program)29/*30Output:31232433634835*/
```
## How to Raise Errors
[](#how-to-raise-errors)
The `Effect.gen` API lets you integrate error handling directly into your workflow by yielding failed effects. You can introduce errors with `Effect.fail`, as shown in the example below.
**Example** (Introducing an Error into the Flow)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const task1: Effect.Effect<void, never, never>task1 = import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("task1...")4const const task2: Effect.Effect<void, never, never>task2 = import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("task2...")5
6const const program: Effect.Effect<void, string, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<void, never, never>> | YieldWrap<Effect.Effect<never, string, never>>, void>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>> | YieldWrap<Effect.Effect<never, string, never>>, void, never>) => Effect.Effect<void, string, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {7  // Perform some tasks8  yield* const task1: Effect.Effect<void, never, never>task19  yield* const task2: Effect.Effect<void, never, never>task210  // Introduce an error11  yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("Something went wrong!")12})13
14import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <void, string>(effect: Effect.Effect<void, string, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<void>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<void, string, never>program).Promise<void>.then<void, void>(onfulfilled?: ((value: void) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
for more information.@since ― v0.1.100error)15/*16Output:17task1...18task2...19(FiberFailure) Error: Something went wrong!20*/
```
## The Role of Short-Circuiting
[](#the-role-of-short-circuiting)
When working with `Effect.gen`, it is important to understand how it handles errors. This API will stop execution at the **first error** it encounters and return that error.
How does this affect your code? If you have several operations in sequence, once any one of them fails, the remaining operations will not run, and the error will be returned.
In simpler terms, if something fails at any point, the program will stop right there and deliver the error to you.
If you don’t want to stop on an error, you can use the `Effect.either` method to encapsulate the error in the [Either](/docs/data-types/either/) data type: see the [examples of managing expected errors](/docs/error-management/expected-errors/#either).
**Example** (Halting Execution at the First Error)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const task1: Effect.Effect<void, never, never>task1 = import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("task1...")4const const task2: Effect.Effect<void, never, never>task2 = import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("task2...")5const const failure: Effect.Effect<never, string, never>failure = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("Something went wrong!")6const const task4: Effect.Effect<void, never, never>task4 = import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("task4...")7
8const const program: Effect.Effect<string, string, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<void, never, never>> | YieldWrap<Effect.Effect<never, string, never>>, string>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>> | YieldWrap<Effect.Effect<never, string, never>>, string, never>) => Effect.Effect<string, string, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {9  yield* const task1: Effect.Effect<void, never, never>task110  yield* const task2: Effect.Effect<void, never, never>task211  // The program stops here due to the error12  yield* const failure: Effect.Effect<never, string, never>failure13  // The following lines never run14  yield* const task4: Effect.Effect<void, never, never>task415  return "some result"16})17
18import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <string, string>(effect: Effect.Effect<string, string, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<string>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<string, string, never>program).Promise<string>.then<void, void>(onfulfilled?: ((value: string) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
for more information.@since ― v0.1.100error)19/*20Output:21task1...22task2...23(FiberFailure) Error: Something went wrong!24*/
```
Even though execution never reaches code after a failure, TypeScript may still assume that the code below the error is reachable unless you explicitly return after the failure.
For example, consider the following scenario where you want to narrow the type of a variable:
**Example** (Type Narrowing without Explicit Return)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3type type User = {    readonly name: string;}User = {4  readonly name: stringname: string5}6
7// Imagine this function checks a database or an external service8declare function function getUserById(id: string): Effect.Effect<User | undefined>getUserById(id: stringid: string): import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<type User = {    readonly name: string;}User | undefined>9
10function function greetUser(id: string): Effect.Effect<string, string, never>greetUser(id: stringid: string) {11  return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<User | undefined, never, never>> | YieldWrap<Effect.Effect<never, string, never>>, string>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<User | undefined, never, never>> | YieldWrap<Effect.Effect<never, string, never>>, string, never>) => Effect.Effect<string, string, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {12    const const user: User | undefineduser = yield* function getUserById(id: string): Effect.Effect<User | undefined>getUserById(id: stringid)13
14    if (const user: User | undefineduser === var undefinedundefined) {15      // Even though we fail here, TypeScript still thinks16      // 'user' might be undefined later17      yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(`User with id ${id: stringid} not found`)18    }19
20    return `Hello, ${user.name: stringname}!`Error ts(18048)  ― 'user' is possibly 'undefined'.21  })22}
```
In this example, TypeScript still considers `user` possibly `undefined` because there is no explicit return after the failure.
To fix this, explicitly return right after calling `Effect.fail`:
**Example** (Type Narrowing with Explicit Return)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3type type User = {    readonly name: string;}User = {4  readonly name: stringname: string5}6
7declare function function getUserById(id: string): Effect.Effect<User | undefined>getUserById(id: stringid: string): import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<type User = {    readonly name: string;}User | undefined>8
9function function greetUser(id: string): Effect.Effect<string, string, never>greetUser(id: stringid: string) {10  return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<never, string, never>> | YieldWrap<Effect.Effect<User | undefined, never, never>>, string>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<never, string, never>> | YieldWrap<Effect.Effect<User | undefined, never, never>>, string, never>) => Effect.Effect<string, string, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {11    const const user: User | undefineduser = yield* function getUserById(id: string): Effect.Effect<User | undefined>getUserById(id: stringid)12
13    if (const user: User | undefineduser === var undefinedundefined) {14      // Explicitly return after failing15      return yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(`User with id ${id: stringid} not found`)16    }17
18    // Now TypeScript knows that 'user' is not undefined19    return `Hello, ${const user: Useruser.name: stringname}!`20  })21}
```
Further Learning
To learn more about error handling in Effect, refer to the [Error Management](/docs/error-management/two-error-types/) section.
## Passing `this`
[](#passing-this)
In some cases, you might need to pass a reference to the current object (`this`) into the body of your generator function. You can achieve this by utilizing an overload that accepts the reference as the first argument:
**Example** (Passing `this` to Generator)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3class class MyClassMyClass {4  readonly MyClass.local: 1local = 15  MyClass.compute: Effect.Effect<number, never, never>compute = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <this, YieldWrap<Effect.Effect<void, never, never>>, number>(self: this, f: (this: this, resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>>, number, never>) => Effect.Effect<number, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(this, function* () {6    const const n: numbern = this.MyClass.local: 1local + 17
8    yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const log: (...message: ReadonlyArray<any>) => Effect.Effect<void, never, never>Logs one or more messages or error causes at the current log level.
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
Effect.runFork(program)// Output:// timestamp=... level=INFO fiber=#0 message=message1 message=message2 cause="Error: Oh no!// Error: Oh uh!"@since ― 2.0.0log(`Computed value: ${const n: numbern}`)9
10    return const n: numbern11  })12}13
14import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number, never>(effect: Effect.Effect<number, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(new constructor MyClass(): MyClassMyClass().MyClass.compute: Effect.Effect<number, never, never>compute).Promise<number>.then<void, never>(onfulfilled?: ((value: number) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)15/*16Output:17timestamp=... level=INFO fiber=#0 message="Computed value: 2"18219*/
```
## Adapter Deprecated
[](#adapter)
You may still come across some code snippets that use an adapter, typically indicated by `_` or `$` symbols.
In earlier versions of TypeScript, the generator “adapter” function was necessary to ensure correct type inference within generators. This adapter was used to facilitate the interaction between TypeScript’s type system and generator functions.
**Example** (Adapter in Older Code)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const promise: <number>(evaluate: (signal: AbortSignal) => PromiseLike<number>) => Effect.Effect<number, never, never>Creates an Effect that represents an asynchronous computation guaranteed to
succeed.
Details
The provided function (thunk) returns a Promise that should never reject; if it does, the error
will be treated as a "defect".
This defect is not a standard error but indicates a flaw in the logic that
was expected to be error-free. You can think of it similar to an unexpected
crash in the program, which can be further managed or logged using tools like
catchAllDefect
.
Interruptions
An optional AbortSignal can be provided to allow for interruption of the
wrapped Promise API.
When to Use
Use this function when you are sure the operation will not reject.
Example (Delayed Message)
import { Effect } from "effect"
const delay = (message: string) =>  Effect.promise<string>(    () =>      new Promise((resolve) => {        setTimeout(() => {          resolve(message)        }, 2000)      })  )
//      ┌─── Effect<string, never, never>//      ▼const program = delay("Async operation completed successfully!")@see ― tryPromise for a version that can handle failures.@since ― 2.0.0promise(() => var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<number>(value: number): Promise<number> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve(100))4
5// Older usage with an adapter for proper type inference6const const programWithAdapter: Effect.Effect<void, never, never>programWithAdapter = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<number, never, never>>, void>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<number, never, never>>, void, never>) => Effect.Effect<void, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* ($: Effect.Adapter$) {7  const const transactionAmount: numbertransactionAmount = yield* $: Effect.Adapter<number, never, never>(self: Effect.Effect<number, never, never>) => Effect.Effect<number, never, never> (+20 overloads)$(const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount)8})9
10// Current usage without an adapter11const const program: Effect.Effect<void, never, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<number, never, never>>, void>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<number, never, never>>, void, never>) => Effect.Effect<void, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {12  const const transactionAmount: numbertransactionAmount = yield* const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount13})
```
With advances in TypeScript (v5.5+), the adapter is no longer necessary for type inference. While it remains in the codebase for backward compatibility, it is anticipated to be removed in the upcoming major release of Effect.
[Edit page](https://github.com/Effect-TS/website/edit/main/content/src/content/docs/docs/getting-started/using-generators.mdx)
[Previous  
Running Effects](/docs/getting-started/running-effects/) [Next  
Building Pipelines](/docs/getting-started/building-pipelines/)
