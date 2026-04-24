---
title: "Timing Out"
source: "https://effect.website/docs/timing-out/"
description: "Effect documentation - Timing Out"
---

# Timing Out

[Docs](/docs/) [Blog](/blog/) [Podcast](/podcast/) [Play](/play/)
On this page
## On this page
-   [Overview](#_top)
-   [Basic Usage](#basic-usage)
-   [Handling Timeouts](#handling-timeouts)
-   [Disconnection on Timeout](#disconnection-on-timeout)
-   [Customizing Timeout Behavior](#customizing-timeout-behavior)
# Timing Out
In programming, it’s common to deal with tasks that may take some time to complete. Often, we want to enforce a limit on how long we’re willing to wait for these tasks. The `Effect.timeout` function helps by placing a time constraint on an operation, ensuring it doesn’t run indefinitely.
## Basic Usage
[](#basic-usage)
### timeout
[](#timeout)
The `Effect.timeout` function employs a [Duration](/docs/data-types/duration/) parameter to establish a time limit on an operation. If the operation exceeds this limit, a `TimeoutException` is triggered, indicating a timeout has occurred.
**Example** (Setting a Timeout)
Here, the task completes within the timeout duration, so the result is returned successfully.
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const task: Effect.Effect<string, never, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<void, never, never>>, string>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>>, string, never>) => Effect.Effect<string, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {4  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("Start processing...")5  yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const sleep: (duration: DurationInput) => Effect.Effect<void>Suspends the execution of an effect for a specified Duration.
Details
This function pauses the execution of an effect for a given duration. It is
asynchronous, meaning that it does not block the fiber executing the effect.
Instead, the fiber is suspended during the delay period and can resume once
the specified time has passed.
The duration can be specified using various formats supported by the
Duration module, such as a string ("2 seconds") or numeric value
representing milliseconds.
Example
import { Effect } from "effect"
const program = Effect.gen(function*() {  console.log("Starting task...")  yield* Effect.sleep("3 seconds") // Waits for 3 seconds  console.log("Task completed!")})
Effect.runFork(program)// Output:// Starting task...// Task completed!@since ― 2.0.0sleep("2 seconds") // Simulates a delay in processing6  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("Processing complete.")7  return "Result"8})9
10// Sets a 3-second timeout for the task11const const timedEffect: Effect.Effect<string, TimeoutException, never>timedEffect = const task: Effect.Effect<string, never, never>task.Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, TimeoutException, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, TimeoutException, never>): Effect.Effect<string, TimeoutException, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const timeout: (duration: DurationInput) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E | TimeoutException, R> (+1 overload)Adds a time limit to an effect, triggering a timeout if the effect exceeds
the duration.
Details
This function allows you to enforce a time limit on the execution of an
effect. If the effect does not complete within the given duration, it fails
with a TimeoutException. This is useful for preventing tasks from hanging
indefinitely, especially in scenarios where responsiveness or resource limits
are critical.
The returned effect will either:
Succeed with the original effect's result if it completes within the
specified duration.
Fail with a TimeoutException if the time limit is exceeded.
Example
import { Effect } from "effect"
const task = Effect.gen(function* () {  console.log("Start processing...")  yield* Effect.sleep("2 seconds") // Simulates a delay in processing  console.log("Processing complete.")  return "Result"})
// Output will show a TimeoutException as the task takes longer// than the specified timeout durationconst timedEffect = task.pipe(Effect.timeout("1 second"))
Effect.runPromiseExit(timedEffect).then(console.log)// Output:// Start processing...// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: { _tag: 'TimeoutException' }//   }// }@see ― timeoutFail for a version that raises a custom error.@see ― timeoutFailCause for a version that raises a custom defect.@see ― timeoutTo for a version that allows specifying both success and
timeout handlers.@since ― 2.0.0timeout("3 seconds"))12
13// Output will show that the task completes successfully14// as it falls within the timeout duration15import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <string, TimeoutException>(effect: Effect.Effect<string, TimeoutException, never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<string, TimeoutException>>Runs an effect and returns a Promise that resolves to an Exit,
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
// Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const timedEffect: Effect.Effect<string, TimeoutException, never>timedEffect).Promise<Exit<string, TimeoutException>>.then<void, never>(onfulfilled?: ((value: Exit<string, TimeoutException>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)16/*17Output:18Start processing...19Processing complete.20{ _id: 'Exit', _tag: 'Success', value: 'Result' }21*/
```
If the operation exceeds the specified duration, a `TimeoutException` is raised:
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const task: Effect.Effect<string, never, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<void, never, never>>, string>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>>, string, never>) => Effect.Effect<string, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {4  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("Start processing...")5  yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const sleep: (duration: DurationInput) => Effect.Effect<void>Suspends the execution of an effect for a specified Duration.
Details
This function pauses the execution of an effect for a given duration. It is
asynchronous, meaning that it does not block the fiber executing the effect.
Instead, the fiber is suspended during the delay period and can resume once
the specified time has passed.
The duration can be specified using various formats supported by the
Duration module, such as a string ("2 seconds") or numeric value
representing milliseconds.
Example
import { Effect } from "effect"
const program = Effect.gen(function*() {  console.log("Starting task...")  yield* Effect.sleep("3 seconds") // Waits for 3 seconds  console.log("Task completed!")})
Effect.runFork(program)// Output:// Starting task...// Task completed!@since ― 2.0.0sleep("2 seconds") // Simulates a delay in processing6  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("Processing complete.")7  return "Result"8})9
10// Output will show a TimeoutException as the task takes longer11// than the specified timeout duration12const const timedEffect: Effect.Effect<string, TimeoutException, never>timedEffect = const task: Effect.Effect<string, never, never>task.Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, TimeoutException, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, TimeoutException, never>): Effect.Effect<string, TimeoutException, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const timeout: (duration: DurationInput) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E | TimeoutException, R> (+1 overload)Adds a time limit to an effect, triggering a timeout if the effect exceeds
the duration.
Details
This function allows you to enforce a time limit on the execution of an
effect. If the effect does not complete within the given duration, it fails
with a TimeoutException. This is useful for preventing tasks from hanging
indefinitely, especially in scenarios where responsiveness or resource limits
are critical.
The returned effect will either:
Succeed with the original effect's result if it completes within the
specified duration.
Fail with a TimeoutException if the time limit is exceeded.
Example
import { Effect } from "effect"
const task = Effect.gen(function* () {  console.log("Start processing...")  yield* Effect.sleep("2 seconds") // Simulates a delay in processing  console.log("Processing complete.")  return "Result"})
// Output will show a TimeoutException as the task takes longer// than the specified timeout durationconst timedEffect = task.pipe(Effect.timeout("1 second"))
Effect.runPromiseExit(timedEffect).then(console.log)// Output:// Start processing...// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: { _tag: 'TimeoutException' }//   }// }@see ― timeoutFail for a version that raises a custom error.@see ― timeoutFailCause for a version that raises a custom defect.@see ― timeoutTo for a version that allows specifying both success and
timeout handlers.@since ― 2.0.0timeout("1 second"))13
14import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <string, TimeoutException>(effect: Effect.Effect<string, TimeoutException, never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<string, TimeoutException>>Runs an effect and returns a Promise that resolves to an Exit,
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
// Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const timedEffect: Effect.Effect<string, TimeoutException, never>timedEffect).Promise<Exit<string, TimeoutException>>.then<void, never>(onfulfilled?: ((value: Exit<string, TimeoutException>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)15/*16Output:17Start processing...18{19  _id: 'Exit',20  _tag: 'Failure',21  cause: {22    _id: 'Cause',23    _tag: 'Fail',24    failure: { _tag: 'TimeoutException' }25  }26}27*/
```
### timeoutOption
[](#timeoutoption)
If you want to handle timeouts more gracefully, consider using `Effect.timeoutOption`. This function treats timeouts as regular results, wrapping the outcome in an [Option](/docs/data-types/option/).
**Example** (Handling Timeout as an Option)
In this example, the first task completes successfully, while the second times out. The result of the timed-out task is represented as `None` in the `Option` type.
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const task: Effect.Effect<string, never, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<void, never, never>>, string>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>>, string, never>) => Effect.Effect<string, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {4  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("Start processing...")5  yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const sleep: (duration: DurationInput) => Effect.Effect<void>Suspends the execution of an effect for a specified Duration.
Details
This function pauses the execution of an effect for a given duration. It is
asynchronous, meaning that it does not block the fiber executing the effect.
Instead, the fiber is suspended during the delay period and can resume once
the specified time has passed.
The duration can be specified using various formats supported by the
Duration module, such as a string ("2 seconds") or numeric value
representing milliseconds.
Example
import { Effect } from "effect"
const program = Effect.gen(function*() {  console.log("Starting task...")  yield* Effect.sleep("3 seconds") // Waits for 3 seconds  console.log("Task completed!")})
Effect.runFork(program)// Output:// Starting task...// Task completed!@since ― 2.0.0sleep("2 seconds") // Simulates a delay in processing6  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("Processing complete.")7  return "Result"8})9
10const const timedOutEffect: Effect.Effect<[Option<string>, Option<string>], never, never>timedOutEffect = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const all: <readonly [Effect.Effect<Option<string>, never, never>, Effect.Effect<Option<string>, never, never>], NoExcessProperties<{    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard?: boolean | undefined;    readonly mode?: "default" | "validate" | "either" | undefined;    readonly concurrentFinalizers?: boolean | undefined;}, unknown>>(arg: readonly [Effect.Effect<Option<string>, never, never>, Effect.Effect<Option<string>, never, never>], options?: NoExcessProperties<...> | undefined) => Effect.Effect<...>Combines multiple effects into one, returning results based on the input
structure.
Details
Use this function when you need to run multiple effects and combine their
results into a single output. It supports tuples, iterables, structs, and
records, making it flexible for different input types.
For instance, if the input is a tuple:
//         ┌─── a tuple of effects//         ▼Effect.all([effect1, effect2, ...])
the effects are executed sequentially, and the result is a new effect
containing the results as a tuple. The results in the tuple match the order
of the effects passed to Effect.all.
Concurrency
You can control the execution order (e.g., sequential vs. concurrent) using
the concurrency option.
Short-Circuiting Behavior
This function stops execution on the first error it encounters, this is
called "short-circuiting". If any effect in the collection fails, the
remaining effects will not run, and the error will be propagated. To change
this behavior, you can use the mode option, which allows all effects to run
and collect results as Either or Option.
The mode option
The { mode: "either" } option changes the behavior of Effect.all to
ensure all effects run, even if some fail. Instead of stopping on the first
failure, this mode collects both successes and failures, returning an array
of Either instances where each result is either a Right (success) or a
Left (failure).
Similarly, the { mode: "validate" } option uses Option to indicate
success or failure. Each effect returns None for success and Some with
the error for failure.
Example (Combining Effects in Tuples)
import { Effect, Console } from "effect"
const tupleOfEffects = [  Effect.succeed(42).pipe(Effect.tap(Console.log)),  Effect.succeed("Hello").pipe(Effect.tap(Console.log))] as const
//      ┌─── Effect<[number, string], never, never>//      ▼const resultsAsTuple = Effect.all(tupleOfEffects)
Effect.runPromise(resultsAsTuple).then(console.log)// Output:// 42// Hello// [ 42, 'Hello' ]
Example (Combining Effects in Iterables)
import { Effect, Console } from "effect"
const iterableOfEffects: Iterable<Effect.Effect<number>> = [1, 2, 3].map(  (n) => Effect.succeed(n).pipe(Effect.tap(Console.log)))
//      ┌─── Effect<number[], never, never>//      ▼const resultsAsArray = Effect.all(iterableOfEffects)
Effect.runPromise(resultsAsArray).then(console.log)// Output:// 1// 2// 3// [ 1, 2, 3 ]
Example (Combining Effects in Structs)
import { Effect, Console } from "effect"
const structOfEffects = {  a: Effect.succeed(42).pipe(Effect.tap(Console.log)),  b: Effect.succeed("Hello").pipe(Effect.tap(Console.log))}
//      ┌─── Effect<{ a: number; b: string; }, never, never>//      ▼const resultsAsStruct = Effect.all(structOfEffects)
Effect.runPromise(resultsAsStruct).then(console.log)// Output:// 42// Hello// { a: 42, b: 'Hello' }
Example (Combining Effects in Records)
import { Effect, Console } from "effect"
const recordOfEffects: Record<string, Effect.Effect<number>> = {  key1: Effect.succeed(1).pipe(Effect.tap(Console.log)),  key2: Effect.succeed(2).pipe(Effect.tap(Console.log))}
//      ┌─── Effect<{ [x: string]: number; }, never, never>//      ▼const resultsAsRecord = Effect.all(recordOfEffects)
Effect.runPromise(resultsAsRecord).then(console.log)// Output:// 1// 2// { key1: 1, key2: 2 }
Example (Short-Circuiting Behavior)
import { Effect, Console } from "effect"
const program = Effect.all([  Effect.succeed("Task1").pipe(Effect.tap(Console.log)),  Effect.fail("Task2: Oh no!").pipe(Effect.tap(Console.log)),  // Won't execute due to earlier failure  Effect.succeed("Task3").pipe(Effect.tap(Console.log))])
Effect.runPromiseExit(program).then(console.log)// Output:// Task1// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: { _id: 'Cause', _tag: 'Fail', failure: 'Task2: Oh no!' }// }
Example (Collecting Results with mode: "either")
import { Effect, Console } from "effect"
const effects = [  Effect.succeed("Task1").pipe(Effect.tap(Console.log)),  Effect.fail("Task2: Oh no!").pipe(Effect.tap(Console.log)),  Effect.succeed("Task3").pipe(Effect.tap(Console.log))]
const program = Effect.all(effects, { mode: "either" })
Effect.runPromiseExit(program).then(console.log)// Output:// Task1// Task3// {//   _id: 'Exit',//   _tag: 'Success',//   value: [//     { _id: 'Either', _tag: 'Right', right: 'Task1' },//     { _id: 'Either', _tag: 'Left', left: 'Task2: Oh no!' },//     { _id: 'Either', _tag: 'Right', right: 'Task3' }//   ]// }
Example (Collecting Results with mode: "validate")
import { Effect, Console } from "effect"
const effects = [  Effect.succeed("Task1").pipe(Effect.tap(Console.log)),  Effect.fail("Task2: Oh no!").pipe(Effect.tap(Console.log)),  Effect.succeed("Task3").pipe(Effect.tap(Console.log))]
const program = Effect.all(effects, { mode: "validate" })
Effect.runPromiseExit(program).then((result) => console.log("%o", result))// Output:// Task1// Task3// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: [//       { _id: 'Option', _tag: 'None' },//       { _id: 'Option', _tag: 'Some', value: 'Task2: Oh no!' },//       { _id: 'Option', _tag: 'None' }//     ]//   }// }@see ― forEach for iterating over elements and applying an effect.@see ― allWith for a data-last version of this function.@since ― 2.0.0all([11  const task: Effect.Effect<string, never, never>task.Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<Option<string>, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<Option<string>, never, never>): Effect.Effect<Option<string>, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const timeoutOption: (duration: DurationInput) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<Option<A>, E, R> (+1 overload)Gracefully handles timeouts by returning an Option that represents either
the result or a timeout.
Details
This function wraps the outcome of an effect in an Option type. If the
effect completes within the specified duration, it returns a Some
containing the result. If the effect times out, it returns a None. Unlike
other timeout methods, this approach does not raise errors or exceptions;
instead, it allows you to treat timeouts as a regular outcome, simplifying
the logic for handling delays.
When to Use
This is useful when you want to handle timeouts without causing the program
to fail, making it easier to manage situations where you expect tasks might
take too long but want to continue executing other tasks.
Example
import { Effect } from "effect"
const task = Effect.gen(function* () {  console.log("Start processing...")  yield* Effect.sleep("2 seconds") // Simulates a delay in processing  console.log("Processing complete.")  return "Result"})
const timedOutEffect = Effect.all([  task.pipe(Effect.timeoutOption("3 seconds")),  task.pipe(Effect.timeoutOption("1 second"))])
Effect.runPromise(timedOutEffect).then(console.log)// Output:// Start processing...// Processing complete.// Start processing...// [//   { _id: 'Option', _tag: 'Some', value: 'Result' },//   { _id: 'Option', _tag: 'None' }// ]@see ― timeout for a version that raises a TimeoutException.@see ― timeoutFail for a version that raises a custom error.@see ― timeoutFailCause for a version that raises a custom defect.@see ― timeoutTo for a version that allows specifying both success and
timeout handlers.@since ― 3.1.0timeoutOption("3 seconds")),12  const task: Effect.Effect<string, never, never>task.Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<Option<string>, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<Option<string>, never, never>): Effect.Effect<Option<string>, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const timeoutOption: (duration: DurationInput) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<Option<A>, E, R> (+1 overload)Gracefully handles timeouts by returning an Option that represents either
the result or a timeout.
Details
This function wraps the outcome of an effect in an Option type. If the
effect completes within the specified duration, it returns a Some
containing the result. If the effect times out, it returns a None. Unlike
other timeout methods, this approach does not raise errors or exceptions;
instead, it allows you to treat timeouts as a regular outcome, simplifying
the logic for handling delays.
When to Use
This is useful when you want to handle timeouts without causing the program
to fail, making it easier to manage situations where you expect tasks might
take too long but want to continue executing other tasks.
Example
import { Effect } from "effect"
const task = Effect.gen(function* () {  console.log("Start processing...")  yield* Effect.sleep("2 seconds") // Simulates a delay in processing  console.log("Processing complete.")  return "Result"})
const timedOutEffect = Effect.all([  task.pipe(Effect.timeoutOption("3 seconds")),  task.pipe(Effect.timeoutOption("1 second"))])
Effect.runPromise(timedOutEffect).then(console.log)// Output:// Start processing...// Processing complete.// Start processing...// [//   { _id: 'Option', _tag: 'Some', value: 'Result' },//   { _id: 'Option', _tag: 'None' }// ]@see ― timeout for a version that raises a TimeoutException.@see ― timeoutFail for a version that raises a custom error.@see ― timeoutFailCause for a version that raises a custom defect.@see ― timeoutTo for a version that allows specifying both success and
timeout handlers.@since ― 3.1.0timeoutOption("1 second"))13])14
15import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <[Option<string>, Option<string>], never>(effect: Effect.Effect<[Option<string>, Option<string>], never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<[Option<string>, Option<string>]>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const timedOutEffect: Effect.Effect<[Option<string>, Option<string>], never, never>timedOutEffect).Promise<[Option<string>, Option<string>]>.then<void, never>(onfulfilled?: ((value: [Option<string>, Option<string>]) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)16/*17Output:18Start processing...19Processing complete.20Start processing...21[22  { _id: 'Option', _tag: 'Some', value: 'Result' },23  { _id: 'Option', _tag: 'None' }24]25*/
```
## Handling Timeouts
[](#handling-timeouts)
When an operation does not finish within the specified duration, the behavior of the `Effect.timeout` depends on whether the operation is “uninterruptible”.
Uninterruptible Effects
An uninterruptible effect is one that, once started, cannot be stopped mid-execution by the timeout mechanism directly. This could be because the operations within the effect need to run to completion to avoid leaving the system in an inconsistent state.
1.  **Interruptible Operation**: If the operation can be interrupted, it is terminated immediately once the timeout threshold is reached, resulting in a `TimeoutException`.
    ```
    1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
    3const const task: Effect.Effect<string, never, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<void, never, never>>, string>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>>, string, never>) => Effect.Effect<string, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
    export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {4  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
    See util.format() for more information.@since ― v0.1.100log("Start processing...")5  yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const sleep: (duration: DurationInput) => Effect.Effect<void>Suspends the execution of an effect for a specified Duration.
    Details
    This function pauses the execution of an effect for a given duration. It is
    asynchronous, meaning that it does not block the fiber executing the effect.
    Instead, the fiber is suspended during the delay period and can resume once
    the specified time has passed.
    The duration can be specified using various formats supported by the
    Duration module, such as a string ("2 seconds") or numeric value
    representing milliseconds.
    Example
    import { Effect } from "effect"
    const program = Effect.gen(function*() {  console.log("Starting task...")  yield* Effect.sleep("3 seconds") // Waits for 3 seconds  console.log("Task completed!")})
    Effect.runFork(program)// Output:// Starting task...// Task completed!@since ― 2.0.0sleep("2 seconds") // Simulates a delay in processing6  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
    See util.format() for more information.@since ― v0.1.100log("Processing complete.")7  return "Result"8})9
    10const const timedEffect: Effect.Effect<string, TimeoutException, never>timedEffect = const task: Effect.Effect<string, never, never>task.Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, TimeoutException, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, TimeoutException, never>): Effect.Effect<string, TimeoutException, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const timeout: (duration: DurationInput) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E | TimeoutException, R> (+1 overload)Adds a time limit to an effect, triggering a timeout if the effect exceeds
    the duration.
    Details
    This function allows you to enforce a time limit on the execution of an
    effect. If the effect does not complete within the given duration, it fails
    with a TimeoutException. This is useful for preventing tasks from hanging
    indefinitely, especially in scenarios where responsiveness or resource limits
    are critical.
    The returned effect will either:
    Succeed with the original effect's result if it completes within the
    specified duration.
    Fail with a TimeoutException if the time limit is exceeded.
    Example
    import { Effect } from "effect"
    const task = Effect.gen(function* () {  console.log("Start processing...")  yield* Effect.sleep("2 seconds") // Simulates a delay in processing  console.log("Processing complete.")  return "Result"})
    // Output will show a TimeoutException as the task takes longer// than the specified timeout durationconst timedEffect = task.pipe(Effect.timeout("1 second"))
    Effect.runPromiseExit(timedEffect).then(console.log)// Output:// Start processing...// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: { _tag: 'TimeoutException' }//   }// }@see ― timeoutFail for a version that raises a custom error.@see ― timeoutFailCause for a version that raises a custom defect.@see ― timeoutTo for a version that allows specifying both success and
    timeout handlers.@since ― 2.0.0timeout("1 second"))11
    12import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <string, TimeoutException>(effect: Effect.Effect<string, TimeoutException, never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<string, TimeoutException>>Runs an effect and returns a Promise that resolves to an Exit,
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
    // Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const timedEffect: Effect.Effect<string, TimeoutException, never>timedEffect).Promise<Exit<string, TimeoutException>>.then<void, never>(onfulfilled?: ((value: Exit<string, TimeoutException>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
    See util.format() for more information.@since ― v0.1.100log)13/*14 Output:15 Start processing...16 {17   _id: 'Exit',18   _tag: 'Failure',19   cause: {20     _id: 'Cause',21     _tag: 'Fail',22     failure: { _tag: 'TimeoutException' }23   }24 }25 */
    ```
2.  **Uninterruptible Operation**: If the operation is uninterruptible, it continues until completion before the `TimeoutException` is assessed.
    ```
    1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
    3const const task: Effect.Effect<string, never, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<void, never, never>>, string>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>>, string, never>) => Effect.Effect<string, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
    export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {4  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
    See util.format() for more information.@since ― v0.1.100log("Start processing...")5  yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const sleep: (duration: DurationInput) => Effect.Effect<void>Suspends the execution of an effect for a specified Duration.
    Details
    This function pauses the execution of an effect for a given duration. It is
    asynchronous, meaning that it does not block the fiber executing the effect.
    Instead, the fiber is suspended during the delay period and can resume once
    the specified time has passed.
    The duration can be specified using various formats supported by the
    Duration module, such as a string ("2 seconds") or numeric value
    representing milliseconds.
    Example
    import { Effect } from "effect"
    const program = Effect.gen(function*() {  console.log("Starting task...")  yield* Effect.sleep("3 seconds") // Waits for 3 seconds  console.log("Task completed!")})
    Effect.runFork(program)// Output:// Starting task...// Task completed!@since ― 2.0.0sleep("2 seconds") // Simulates a delay in processing6  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
    See util.format() for more information.@since ― v0.1.100log("Processing complete.")7  return "Result"8})9
    10const const timedEffect: Effect.Effect<string, TimeoutException, never>timedEffect = const task: Effect.Effect<string, never, never>task.Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>, Effect.Effect<string, TimeoutException, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>, bc: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, TimeoutException, never>): Effect.Effect<string, TimeoutException, never> (+21 overloads)pipe(11  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const uninterruptible: <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>Marks an effect as uninterruptible.@since ― 2.0.0uninterruptible,12  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const timeout: (duration: DurationInput) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E | TimeoutException, R> (+1 overload)Adds a time limit to an effect, triggering a timeout if the effect exceeds
    the duration.
    Details
    This function allows you to enforce a time limit on the execution of an
    effect. If the effect does not complete within the given duration, it fails
    with a TimeoutException. This is useful for preventing tasks from hanging
    indefinitely, especially in scenarios where responsiveness or resource limits
    are critical.
    The returned effect will either:
    Succeed with the original effect's result if it completes within the
    specified duration.
    Fail with a TimeoutException if the time limit is exceeded.
    Example
    import { Effect } from "effect"
    const task = Effect.gen(function* () {  console.log("Start processing...")  yield* Effect.sleep("2 seconds") // Simulates a delay in processing  console.log("Processing complete.")  return "Result"})
    // Output will show a TimeoutException as the task takes longer// than the specified timeout durationconst timedEffect = task.pipe(Effect.timeout("1 second"))
    Effect.runPromiseExit(timedEffect).then(console.log)// Output:// Start processing...// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: { _tag: 'TimeoutException' }//   }// }@see ― timeoutFail for a version that raises a custom error.@see ― timeoutFailCause for a version that raises a custom defect.@see ― timeoutTo for a version that allows specifying both success and
    timeout handlers.@since ― 2.0.0timeout("1 second")13)14
    15// Outputs a TimeoutException after the task completes,16// because the task is uninterruptible17import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <string, TimeoutException>(effect: Effect.Effect<string, TimeoutException, never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<string, TimeoutException>>Runs an effect and returns a Promise that resolves to an Exit,
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
    // Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const timedEffect: Effect.Effect<string, TimeoutException, never>timedEffect).Promise<Exit<string, TimeoutException>>.then<void, never>(onfulfilled?: ((value: Exit<string, TimeoutException>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
    See util.format() for more information.@since ― v0.1.100log)18/*19 Output:20 Start processing...21 Processing complete.22 {23   _id: 'Exit',24   _tag: 'Failure',25   cause: {26     _id: 'Cause',27     _tag: 'Fail',28     failure: { _tag: 'TimeoutException' }29   }30 }31 */
    ```
## Disconnection on Timeout
[](#disconnection-on-timeout)
The `Effect.disconnect` function provides a way to handle timeouts in uninterruptible effects more flexibly. It allows an uninterruptible effect to complete in the background, while the main control flow proceeds as if a timeout had occurred.
Here’s the distinction:
**Without** `Effect.disconnect`:
-   An uninterruptible effect will ignore the timeout and continue executing until it completes, after which the timeout error is assessed.
-   This can lead to delays in recognizing a timeout condition because the system must wait for the effect to complete.
**With** `Effect.disconnect`:
-   The uninterruptible effect is allowed to continue in the background, independent of the main control flow.
-   The main control flow recognizes the timeout immediately and proceeds with the timeout error or alternative logic, without having to wait for the effect to complete.
-   This method is particularly useful when the operations of the effect do not need to block the continuation of the program, despite being marked as uninterruptible.
**Example** (Running Uninterruptible Tasks with Timeout and Background Completion)
Consider a scenario where a long-running data processing task is initiated, and you want to ensure the system remains responsive, even if the data processing takes too long:
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const longRunningTask: Effect.Effect<string, never, never>longRunningTask = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<void, never, never>>, string>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>>, string, never>) => Effect.Effect<string, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {4  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("Start heavy processing...")5  yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const sleep: (duration: DurationInput) => Effect.Effect<void>Suspends the execution of an effect for a specified Duration.
Details
This function pauses the execution of an effect for a given duration. It is
asynchronous, meaning that it does not block the fiber executing the effect.
Instead, the fiber is suspended during the delay period and can resume once
the specified time has passed.
The duration can be specified using various formats supported by the
Duration module, such as a string ("2 seconds") or numeric value
representing milliseconds.
Example
import { Effect } from "effect"
const program = Effect.gen(function*() {  console.log("Starting task...")  yield* Effect.sleep("3 seconds") // Waits for 3 seconds  console.log("Task completed!")})
Effect.runFork(program)// Output:// Starting task...// Task completed!@since ― 2.0.0sleep("5 seconds") // Simulate a long process6  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("Heavy processing done.")7  return "Data processed"8})9
10const const timedEffect: Effect.Effect<string, TimeoutException, never>timedEffect = const longRunningTask: Effect.Effect<string, never, never>longRunningTask.Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>, Effect.Effect<string, never, never>, Effect.Effect<string, TimeoutException, never>>(this: Effect.Effect<...>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>, bc: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>, cd: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, TimeoutException, never>): Effect.Effect<...> (+21 overloads)pipe(11  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const uninterruptible: <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>Marks an effect as uninterruptible.@since ― 2.0.0uninterruptible,12  // Allows the task to finish in the background if it times out13  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const disconnect: <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>Provides a way to handle timeouts in uninterruptible effects, allowing them
to continue in the background while the main control flow proceeds with the
timeout error.
Details
The disconnect function allows an uninterruptible effect to continue
running in the background, while enabling the main control flow to
immediately recognize a timeout condition. This is useful when you want to
avoid blocking the program due to long-running tasks, especially when those
tasks do not need to affect the flow of the rest of the program.
Without disconnect, an uninterruptible effect will ignore the
timeout and continue executing until it completes. The timeout error will
only be assessed after the effect finishes, which can cause delays in
recognizing a timeout.
With disconnect, the uninterruptible effect proceeds in the
background while the main program flow can immediately handle the timeout
error or trigger alternative logic. This enables faster timeout handling
without waiting for the completion of the long-running task.
Example
import { Effect } from "effect"
const longRunningTask = Effect.gen(function* () {  console.log("Start heavy processing...")  yield* Effect.sleep("5 seconds") // Simulate a long process  console.log("Heavy processing done.")  return "Data processed"})
const timedEffect = longRunningTask.pipe(  Effect.uninterruptible,  // Allows the task to finish in the background if it times out  Effect.disconnect,  Effect.timeout("1 second"))
Effect.runPromiseExit(timedEffect).then(console.log)// Output:// Start heavy processing...// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: { _tag: 'TimeoutException' }//   }// }// Heavy processing done.@see ― timeout for a version that interrupts the effect.@see ― uninterruptible for creating an uninterruptible effect.@since ― 2.0.0disconnect,14  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const timeout: (duration: DurationInput) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E | TimeoutException, R> (+1 overload)Adds a time limit to an effect, triggering a timeout if the effect exceeds
the duration.
Details
This function allows you to enforce a time limit on the execution of an
effect. If the effect does not complete within the given duration, it fails
with a TimeoutException. This is useful for preventing tasks from hanging
indefinitely, especially in scenarios where responsiveness or resource limits
are critical.
The returned effect will either:
Succeed with the original effect's result if it completes within the
specified duration.
Fail with a TimeoutException if the time limit is exceeded.
Example
import { Effect } from "effect"
const task = Effect.gen(function* () {  console.log("Start processing...")  yield* Effect.sleep("2 seconds") // Simulates a delay in processing  console.log("Processing complete.")  return "Result"})
// Output will show a TimeoutException as the task takes longer// than the specified timeout durationconst timedEffect = task.pipe(Effect.timeout("1 second"))
Effect.runPromiseExit(timedEffect).then(console.log)// Output:// Start processing...// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: { _tag: 'TimeoutException' }//   }// }@see ― timeoutFail for a version that raises a custom error.@see ― timeoutFailCause for a version that raises a custom defect.@see ― timeoutTo for a version that allows specifying both success and
timeout handlers.@since ― 2.0.0timeout("1 second")15)16
17import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <string, TimeoutException>(effect: Effect.Effect<string, TimeoutException, never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<string, TimeoutException>>Runs an effect and returns a Promise that resolves to an Exit,
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
// Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const timedEffect: Effect.Effect<string, TimeoutException, never>timedEffect).Promise<Exit<string, TimeoutException>>.then<void, never>(onfulfilled?: ((value: Exit<string, TimeoutException>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)18/*19Output:20Start heavy processing...21{22  _id: 'Exit',23  _tag: 'Failure',24  cause: {25    _id: 'Cause',26    _tag: 'Fail',27    failure: { _tag: 'TimeoutException' }28  }29}30Heavy processing done.31*/
```
In this example, the system detects the timeout after one second, but the long-running task continues and completes in the background, without blocking the program’s flow.
## Customizing Timeout Behavior
[](#customizing-timeout-behavior)
In addition to the basic `Effect.timeout` function, there are variations available that allow you to customize the behavior when a timeout occurs.
### timeoutFail
[](#timeoutfail)
The `Effect.timeoutFail` function allows you to produce a specific error when a timeout happens.
**Example** (Custom Timeout Error)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import DataData } from "effect"2
3const const task: Effect.Effect<string, never, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<void, never, never>>, string>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>>, string, never>) => Effect.Effect<string, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {4  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("Start processing...")5  yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const sleep: (duration: DurationInput) => Effect.Effect<void>Suspends the execution of an effect for a specified Duration.
Details
This function pauses the execution of an effect for a given duration. It is
asynchronous, meaning that it does not block the fiber executing the effect.
Instead, the fiber is suspended during the delay period and can resume once
the specified time has passed.
The duration can be specified using various formats supported by the
Duration module, such as a string ("2 seconds") or numeric value
representing milliseconds.
Example
import { Effect } from "effect"
const program = Effect.gen(function*() {  console.log("Starting task...")  yield* Effect.sleep("3 seconds") // Waits for 3 seconds  console.log("Task completed!")})
Effect.runFork(program)// Output:// Starting task...// Task completed!@since ― 2.0.0sleep("2 seconds") // Simulates a delay in processing6  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("Processing complete.")7  return "Result"8})9
10class class MyTimeoutErrorMyTimeoutError extends import DataData.const TaggedError: <"MyTimeoutError">(tag: "MyTimeoutError") => new <A>(args: Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => YieldableError & {    readonly _tag: "MyTimeoutError";} & Readonly<A>@since ― 2.0.0TaggedError("MyTimeoutError")<{}> {}11
12const const program: Effect.Effect<string, MyTimeoutError, never>program = const task: Effect.Effect<string, never, never>task.Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, MyTimeoutError, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, MyTimeoutError, never>): Effect.Effect<string, MyTimeoutError, never> (+21 overloads)pipe(13  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const timeoutFail: <MyTimeoutError>(options: {    readonly onTimeout: LazyArg<MyTimeoutError>;    readonly duration: DurationInput;}) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, MyTimeoutError | E, R> (+1 overload)Specifies a custom error to be produced when a timeout occurs.
Details
This function allows you to handle timeouts in a customized way by defining a
specific error to be raised when an effect exceeds the given duration. Unlike
default timeout behaviors that use generic exceptions, this function gives
you the flexibility to specify a meaningful error type that aligns with your
application's needs.
When you apply this function, you provide:
A duration: The time limit for the effect.
An onTimeout function: A lazy evaluation function that generates the
custom error if the timeout occurs.
If the effect completes within the time limit, its result is returned
normally. Otherwise, the onTimeout function is triggered, and its output is
used as the error for the effect.
Example
import { Effect } from "effect"
const task = Effect.gen(function* () {  console.log("Start processing...")  yield* Effect.sleep("2 seconds") // Simulates a delay in processing  console.log("Processing complete.")  return "Result"})
class MyTimeoutError {  readonly _tag = "MyTimeoutError"}
const program = task.pipe(  Effect.timeoutFail({    duration: "1 second",    onTimeout: () => new MyTimeoutError() // Custom timeout error  }))
Effect.runPromiseExit(program).then(console.log)// Output:// Start processing...// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: MyTimeoutError { _tag: 'MyTimeoutError' }//   }// }@see ― timeout for a version that raises a TimeoutException.@see ― timeoutFailCause for a version that raises a custom defect.@see ― timeoutTo for a version that allows specifying both success and
timeout handlers.@since ― 2.0.0timeoutFail({14    duration: DurationInputduration: "1 second",15    onTimeout: LazyArg<MyTimeoutError>onTimeout: () => new constructor MyTimeoutError<{}>(args: void): MyTimeoutErrorMyTimeoutError() // Custom timeout error16  })17)18
19import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <string, MyTimeoutError>(effect: Effect.Effect<string, MyTimeoutError, never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<string, MyTimeoutError>>Runs an effect and returns a Promise that resolves to an Exit,
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
// Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const program: Effect.Effect<string, MyTimeoutError, never>program).Promise<Exit<string, MyTimeoutError>>.then<void, never>(onfulfilled?: ((value: Exit<string, MyTimeoutError>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)20/*21Output:22Start processing...23{24  _id: 'Exit',25  _tag: 'Failure',26  cause: {27    _id: 'Cause',28    _tag: 'Fail',29    failure: MyTimeoutError { _tag: 'MyTimeoutError' }30  }31}32*/
```
### timeoutFailCause
[](#timeoutfailcause)
`Effect.timeoutFailCause` lets you define a specific defect to throw when a timeout occurs. This is helpful for treating timeouts as exceptional cases in your code.
**Example** (Custom Defect on Timeout)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import CauseCause } from "effect"2
3const const task: Effect.Effect<string, never, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<void, never, never>>, string>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>>, string, never>) => Effect.Effect<string, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {4  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("Start processing...")5  yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const sleep: (duration: DurationInput) => Effect.Effect<void>Suspends the execution of an effect for a specified Duration.
Details
This function pauses the execution of an effect for a given duration. It is
asynchronous, meaning that it does not block the fiber executing the effect.
Instead, the fiber is suspended during the delay period and can resume once
the specified time has passed.
The duration can be specified using various formats supported by the
Duration module, such as a string ("2 seconds") or numeric value
representing milliseconds.
Example
import { Effect } from "effect"
const program = Effect.gen(function*() {  console.log("Starting task...")  yield* Effect.sleep("3 seconds") // Waits for 3 seconds  console.log("Task completed!")})
Effect.runFork(program)// Output:// Starting task...// Task completed!@since ― 2.0.0sleep("2 seconds") // Simulates a delay in processing6  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("Processing complete.")7  return "Result"8})9
10const const program: Effect.Effect<string, never, never>program = const task: Effect.Effect<string, never, never>task.Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(11  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const timeoutFailCause: <never>(options: {    readonly onTimeout: LazyArg<Cause.Cause<never>>;    readonly duration: DurationInput;}) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R> (+1 overload)Specifies a custom defect to be thrown when a timeout occurs.
Details
This function allows you to handle timeouts as exceptional cases by
generating a custom defect when an effect exceeds the specified duration. You
provide:
A duration: The time limit for the effect.
An onTimeout function: A lazy evaluation function that generates the
custom defect (typically created using Cause.die).
If the effect completes within the time limit, its result is returned
normally. Otherwise, the custom defect is triggered, and the effect fails
with that defect.
When to Use
This is especially useful when you need to treat timeouts as critical
failures in your application and wish to include meaningful information in
the defect.
Example
import { Effect, Cause } from "effect"
const task = Effect.gen(function* () {  console.log("Start processing...")  yield* Effect.sleep("2 seconds") // Simulates a delay in processing  console.log("Processing complete.")  return "Result"})
const program = task.pipe(  Effect.timeoutFailCause({    duration: "1 second",    onTimeout: () => Cause.die("Timed out!") // Custom defect for timeout  }))
Effect.runPromiseExit(program).then(console.log)// Output:// Start processing...// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: { _id: 'Cause', _tag: 'Die', defect: 'Timed out!' }// }@see ― timeout for a version that raises a TimeoutException.@see ― timeoutFail for a version that raises a custom error.@see ― timeoutTo for a version that allows specifying both success and
timeout handlers.@since ― 2.0.0timeoutFailCause({12    duration: DurationInputduration: "1 second",13    onTimeout: LazyArg<Cause.Cause<never>>onTimeout: () => import CauseCause.const die: (defect: unknown) => Cause.Cause<never>Creates a Die cause from an unexpected error.
Details
This function wraps an unhandled or unknown defect (like a runtime crash)
into a Cause. It's useful for capturing unforeseen issues in a structured
way.@see ― isDie Check if a Cause contains a defect@since ― 2.0.0die("Timed out!") // Custom defect for timeout14  })15)16
17import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <string, never>(effect: Effect.Effect<string, never, never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<string, never>>Runs an effect and returns a Promise that resolves to an Exit,
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
// Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const program: Effect.Effect<string, never, never>program).Promise<Exit<string, never>>.then<void, never>(onfulfilled?: ((value: Exit<string, never>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)18/*19Output:20Start processing...21{22  _id: 'Exit',23  _tag: 'Failure',24  cause: { _id: 'Cause', _tag: 'Die', defect: 'Timed out!' }25}26*/
```
### timeoutTo
[](#timeoutto)
`Effect.timeoutTo` provides more flexibility compared to `Effect.timeout`, allowing you to define different outcomes for both successful and timed-out operations. This can be useful when you want to customize the result based on whether the operation completes in time or not.
**Example** (Handling Success and Timeout with [Either](/docs/data-types/either/))
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import Either@since ― 2.0.0@since ― 2.0.0Either } from "effect"2
3const const task: Effect.Effect<string, never, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<void, never, never>>, string>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>>, string, never>) => Effect.Effect<string, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {4  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("Start processing...")5  yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const sleep: (duration: DurationInput) => Effect.Effect<void>Suspends the execution of an effect for a specified Duration.
Details
This function pauses the execution of an effect for a given duration. It is
asynchronous, meaning that it does not block the fiber executing the effect.
Instead, the fiber is suspended during the delay period and can resume once
the specified time has passed.
The duration can be specified using various formats supported by the
Duration module, such as a string ("2 seconds") or numeric value
representing milliseconds.
Example
import { Effect } from "effect"
const program = Effect.gen(function*() {  console.log("Starting task...")  yield* Effect.sleep("3 seconds") // Waits for 3 seconds  console.log("Task completed!")})
Effect.runFork(program)// Output:// Starting task...// Task completed!@since ― 2.0.0sleep("2 seconds") // Simulates a delay in processing6  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("Processing complete.")7  return "Result"8})9
10const const program: Effect.Effect<Either.Either<string, string>, never, never>program = const task: Effect.Effect<string, never, never>task.Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<Either.Either<string, string>, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<Either.Either<string, string>, never, never>): Effect.Effect<Either.Either<string, string>, never, never> (+21 overloads)pipe(11  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const timeoutTo: <string, Either.Either<string, string>, Either.Either<string, string>>(options: {    readonly onTimeout: LazyArg<Either.Either<string, string>>;    readonly onSuccess: (a: string) => Either.Either<string, string>;    readonly duration: DurationInput;}) => <E, R>(self: Effect.Effect<string, E, R>) => Effect.Effect<Either.Either<string, string>, E, R> (+1 overload)Provides custom behavior for successful and timed-out operations.
Details
This function allows you to define distinct outcomes for an effect depending
on whether it completes within a specified time frame or exceeds the timeout
duration. You can provide:
onSuccess: A handler for processing the result of the effect if it
completes successfully within the time limit.
onTimeout: A handler for generating a result when the effect times out.
duration: The maximum allowed time for the effect to complete.
When to Use
Unlike
timeout
, which raises an exception for timeouts, this function
gives you full control over the behavior for both success and timeout
scenarios. It is particularly useful when you want to encapsulate timeouts
and successes into a specific data structure, like an Either type, to
represent these outcomes in a meaningful way.
Example
import { Effect, Either } from "effect"
const task = Effect.gen(function* () {  console.log("Start processing...")  yield* Effect.sleep("2 seconds") // Simulates a delay in processing  console.log("Processing complete.")  return "Result"})
const program = task.pipe(  Effect.timeoutTo({    duration: "1 second",    onSuccess: (result): Either.Either<string, string> =>      Either.right(result),    onTimeout: (): Either.Either<string, string> =>      Either.left("Timed out!")  }))
Effect.runPromise(program).then(console.log)// Output:// Start processing...// {//   _id: "Either",//   _tag: "Left",//   left: "Timed out!"// }@see ― timeout for a version that raises a TimeoutException.@see ― timeoutFail for a version that raises a custom error.@see ― timeoutFailCause for a version that raises a custom defect.@since ― 2.0.0timeoutTo({12    duration: DurationInputduration: "1 second",13    onSuccess: (a: string) => Either.Either<string, string>onSuccess: (result: stringresult): import Either@since ― 2.0.0@since ― 2.0.0Either.type Either<A, E = never> = Either.Left<E, A> | Either.Right<E, A>@since ― 2.0.0@since ― 2.0.0Either<string, string> =>14      import Either@since ― 2.0.0@since ― 2.0.0Either.const right: <string>(a: string) => Either.Either<string, never>Constructs a new Either holding a Right value. This usually represents a successful value due to the right bias
of this structure.@since ― 2.0.0right(result: stringresult),15    onTimeout: LazyArg<Either.Either<string, string>>onTimeout: (): import Either@since ― 2.0.0@since ― 2.0.0Either.type Either<A, E = never> = Either.Left<E, A> | Either.Right<E, A>@since ― 2.0.0@since ― 2.0.0Either<string, string> =>16      import Either@since ― 2.0.0@since ― 2.0.0Either.const left: <string>(e: string) => Either.Either<never, string>Constructs a new Either holding a Left value. This usually represents a failure, due to the right-bias of this
structure.@since ― 2.0.0left("Timed out!")17  })18)19
20import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <Either.Either<string, string>, never>(effect: Effect.Effect<Either.Either<string, string>, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<Either.Either<string, string>>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<Either.Either<string, string>, never, never>program).Promise<Either<string, string>>.then<void, never>(onfulfilled?: ((value: Either.Either<string, string>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)21/*22Output:23Start processing...24{25  _id: "Either",26  _tag: "Left",27  left: "Timed out!"28}29*/
```
[Edit page](https://github.com/Effect-TS/website/edit/main/content/src/content/docs/docs/error-management/timing-out.mdx)
[Previous  
Retrying](/docs/error-management/retrying/) [Next  
Sandboxing](/docs/error-management/sandboxing/)
