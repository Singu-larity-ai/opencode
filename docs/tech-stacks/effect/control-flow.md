---
title: "Control Flow Operators"
source: "https://effect.website/docs/control-flow/"
description: "Effect documentation - Control Flow Operators"
---

# Control Flow Operators

[Docs](/docs/) [Blog](/blog/) [Podcast](/podcast/) [Play](/play/)
On this page
## On this page
-   [Overview](#_top)
-   [if Expression](#if-expression)
-   [Conditional Operators](#conditional-operators)
-   [Zipping](#zipping)
-   [Looping](#looping)
-   [Collecting](#collecting)
# Control Flow Operators
Even though JavaScript provides built-in control flow structures, Effect offers additional control flow functions that are useful in Effect applications. In this section, we will introduce different ways to control the flow of execution.
## if Expression
[](#if-expression)
When working with Effect values, we can use standard JavaScript if-then-else statements:
**Example** (Returning None for Invalid Weight)
Here we are using the [Option](/docs/data-types/option/) data type to represent the absence of a valid value.
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import Option@since ― 2.0.0@since ― 2.0.0Option } from "effect"2
3// Function to validate weight and return an Option4const const validateWeightOption: (weight: number) => Effect.Effect<Option.Option<number>>validateWeightOption = (5  weight: numberweight: number6): import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<import Option@since ― 2.0.0@since ― 2.0.0Option.type Option<A> = Option.None<A> | Option.Some<A>The Option data type represents optional values. An Option<A> can either
be Some<A>, containing a value of type A, or None, representing the
absence of a value.
When to Use
You can use Option in scenarios like:
Using it for initial values
Returning values from functions that are not defined for all possible
inputs (referred to as “partial functions”)
Managing optional fields in data structures
Handling optional function arguments
@since ― 2.0.0@since ― 2.0.0Option<number>> => {7  if (weight: numberweight >= 0) {8    // Return Some if the weight is valid9    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <Option.Option<number>>(value: Option.Option<number>) => Effect.Effect<Option.Option<number>, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(import Option@since ― 2.0.0@since ― 2.0.0Option.const some: <number>(value: number) => Option.Option<number>Wraps the given value into an Option to represent its presence.
Example (Creating an Option with a Value)
import { Option } from "effect"
// An Option holding the number 1////      ┌─── Option<number>//      ▼const value = Option.some(1)
console.log(value)// Output: { _id: 'Option', _tag: 'Some', value: 1 }@see ― none for the opposite operation.@since ― 2.0.0some(weight: numberweight))10  } else {11    // Return None if the weight is invalid12    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <Option.Option<number>>(value: Option.Option<number>) => Effect.Effect<Option.Option<number>, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(import Option@since ― 2.0.0@since ― 2.0.0Option.const none: <number>() => Option.Option<number>Represents the absence of a value by creating an empty Option.
Option.none returns an Option<never>, which is a subtype of Option<A>.
This means you can use it in place of any Option<A> regardless of the type
A.
Example (Creating an Option with No Value)
import { Option } from "effect"
// An Option holding no value////      ┌─── Option<never>//      ▼const noValue = Option.none()
console.log(noValue)// Output: { _id: 'Option', _tag: 'None' }@see ― some for the opposite operation.@since ― 2.0.0none())13  }14}
```
**Example** (Returning Error for Invalid Weight)
You can also handle invalid inputs by using the error channel, which allows you to return an error when the input is invalid:
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3// Function to validate weight or fail with an error4const const validateWeightOrFail: (weight: number) => Effect.Effect<number, string>validateWeightOrFail = (5  weight: numberweight: number6): import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, string> => {7  if (weight: numberweight >= 0) {8    // Return the weight if valid9    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(weight: numberweight)10  } else {11    // Fail with an error if invalid12    return import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(`negative input: ${weight: numberweight}`)13  }14}
```
## Conditional Operators
[](#conditional-operators)
### if
[](#if)
Executes one of two effects based on a condition evaluated by an effectful predicate.
Use `Effect.if` to run one of two effects depending on whether the predicate effect evaluates to `true` or `false`. If the predicate is `true`, the `onTrue` effect is executed. If it is `false`, the `onFalse` effect is executed instead.
**Example** (Simulating a Coin Flip)
In this example, we simulate a virtual coin flip using `Random.nextBoolean` to generate a random boolean value. If the value is `true`, the `onTrue` effect logs “Head”. If the value is `false`, the `onFalse` effect logs “Tail”.
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import RandomRandom, import ConsoleConsole } from "effect"2
3const const flipTheCoin: Effect.Effect<void, never, never>flipTheCoin = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.if<void, never, never, void, never, never, never, never>(self: boolean | Effect.Effect<boolean, never, never>, options: {    readonly onTrue: LazyArg<Effect.Effect<void, never, never>>;    readonly onFalse: LazyArg<Effect.Effect<void, never, never>>;}): Effect.Effect<void, never, never> (+1 overload)export ifif(import RandomRandom.const nextBoolean: Effect.Effect<boolean, never, never>Returns the next boolean value from the pseudo-random number generator.@since ― 2.0.0nextBoolean, {4  onTrue: LazyArg<Effect.Effect<void, never, never>>onTrue: () => import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("Head"), // Runs if the predicate is true5  onFalse: LazyArg<Effect.Effect<void, never, never>>onFalse: () => import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log("Tail") // Runs if the predicate is false6})7
8import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runFork: <void, never>(effect: Effect.Effect<void, never, never>, options?: RunForkOptions) => RuntimeFiber<void, never>Runs an effect in the background, returning a fiber that can be observed or
interrupted.
Unless you specifically need a Promise or synchronous operation, runFork
is a good default choice.
Details
This function is the foundational way to execute an effect in the background.
It creates a "fiber," a lightweight, cooperative thread of execution that can
be observed (to access its result), interrupted, or joined. Fibers are useful
for concurrent programming and allow effects to run independently of the main
program flow.
Once the effect is running in a fiber, you can monitor its progress, cancel
it if necessary, or retrieve its result when it completes. If the effect
fails, the fiber will propagate the failure, which you can observe and
handle.
When to Use
Use this function when you need to run an effect in the background,
especially if the effect is long-running or performs periodic tasks. It's
suitable for tasks that need to run independently but might still need
observation or management, like logging, monitoring, or scheduled tasks.
This function is ideal if you don't need the result immediately or if the
effect is part of a larger concurrent workflow.
Example (Running an Effect in the Background)
import { Effect, Console, Schedule, Fiber } from "effect"
//      ┌─── Effect<number, never, never>//      ▼const program = Effect.repeat(  Console.log("running..."),  Schedule.spaced("200 millis"))
//      ┌─── RuntimeFiber<number, never>//      ▼const fiber = Effect.runFork(program)
setTimeout(() => {  Effect.runFork(Fiber.interrupt(fiber))}, 500)@since ― 2.0.0runFork(const flipTheCoin: Effect.Effect<void, never, never>flipTheCoin)
```
### when
[](#when)
Conditionally executes an effect based on a boolean condition.
`Effect.when` allows you to conditionally execute an effect, similar to using an `if (condition)` expression, but with the added benefit of handling effects. If the condition is `true`, the effect is executed; otherwise, it does nothing.
The result of the effect is wrapped in an `Option<A>` to indicate whether the effect was executed. If the condition is `true`, the result of the effect is wrapped in a `Some`. If the condition is `false`, the result is `None`, representing that the effect was skipped.
**Example** (Conditional Effect Execution)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import Option@since ― 2.0.0@since ― 2.0.0Option } from "effect"2
3const const validateWeightOption: (weight: number) => Effect.Effect<Option.Option<number>>validateWeightOption = (4  weight: numberweight: number5): import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<import Option@since ― 2.0.0@since ― 2.0.0Option.type Option<A> = Option.None<A> | Option.Some<A>The Option data type represents optional values. An Option<A> can either
be Some<A>, containing a value of type A, or None, representing the
absence of a value.
When to Use
You can use Option in scenarios like:
Using it for initial values
Returning values from functions that are not defined for all possible
inputs (referred to as “partial functions”)
Managing optional fields in data structures
Handling optional function arguments
@since ― 2.0.0@since ― 2.0.0Option<number>> =>6  // Conditionally execute the effect if the weight is non-negative7  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(weight: numberweight).Pipeable.pipe<Effect.Effect<number, never, never>, Effect.Effect<Option.Option<number>, never, never>>(this: Effect.Effect<number, never, never>, ab: (_: Effect.Effect<number, never, never>) => Effect.Effect<Option.Option<number>, never, never>): Effect.Effect<Option.Option<number>, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const when: (condition: LazyArg<boolean>) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<Option.Option<A>, E, R> (+1 overload)Conditionally executes an effect based on a boolean condition.
Details
This function allows you to run an effect only if a given condition evaluates
to true. If the condition is true, the effect is executed, and its result
is wrapped in an Option.some. If the condition is false, the effect is
skipped, and the result is Option.none.
When to Use
This function is useful for scenarios where you need to dynamically decide
whether to execute an effect based on runtime logic, while also representing
the skipped case explicitly.
Example (Conditional Effect Execution)
import { Effect, Option } from "effect"
const validateWeightOption = (  weight: number): Effect.Effect<Option.Option<number>> =>  // Conditionally execute the effect if the weight is non-negative  Effect.succeed(weight).pipe(Effect.when(() => weight >= 0))
// Run with a valid weightEffect.runPromise(validateWeightOption(100)).then(console.log)// Output:// {//   _id: "Option",//   _tag: "Some",//   value: 100// }
// Run with an invalid weightEffect.runPromise(validateWeightOption(-5)).then(console.log)// Output:// {//   _id: "Option",//   _tag: "None"// }@see ― whenEffect for a version that allows the condition to be an effect.@see ― unless for a version that executes the effect when the condition is false.@since ― 2.0.0when(() => weight: numberweight >= 0))8
9// Run with a valid weight10import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <Option.Option<number>, never>(effect: Effect.Effect<Option.Option<number>, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<Option.Option<number>>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const validateWeightOption: (weight: number) => Effect.Effect<Option.Option<number>>validateWeightOption(100)).Promise<Option<number>>.then<void, never>(onfulfilled?: ((value: Option.Option<number>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)11/*12Output:13{14  _id: "Option",15  _tag: "Some",16  value: 10017}18*/19
20// Run with an invalid weight21import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <Option.Option<number>, never>(effect: Effect.Effect<Option.Option<number>, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<Option.Option<number>>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const validateWeightOption: (weight: number) => Effect.Effect<Option.Option<number>>validateWeightOption(-5)).Promise<Option<number>>.then<void, never>(onfulfilled?: ((value: Option.Option<number>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)22/*23Output:24{25  _id: "Option",26  _tag: "None"27}28*/
```
In this example, the [Option](/docs/data-types/option/) data type is used to represent the presence or absence of a valid value. If the condition evaluates to `true` (in this case, if the weight is non-negative), the effect is executed and wrapped in a `Some`. Otherwise, the result is `None`.
### whenEffect
[](#wheneffect)
Executes an effect conditionally, based on the result of another effect.
Use `Effect.whenEffect` when the condition to determine whether to execute the effect depends on the outcome of another effect that produces a boolean value. If the condition effect evaluates to `true`, the specified effect is executed. If it evaluates to `false`, no effect is executed.
The result of the effect is wrapped in an `Option<A>` to indicate whether the effect was executed. If the condition is `true`, the result of the effect is wrapped in a `Some`. If the condition is `false`, the result is `None`, representing that the effect was skipped.
**Example** (Using an Effect as a Condition)
The following function creates a random integer, but only if a randomly generated boolean is `true`.
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import RandomRandom } from "effect"2
3const const randomIntOption: Effect.Effect<Option<number>, never, never>randomIntOption = import RandomRandom.const nextInt: Effect.Effect<number, never, never>Returns the next integer value from the pseudo-random number generator.@since ― 2.0.0nextInt.Pipeable.pipe<Effect.Effect<number, never, never>, Effect.Effect<Option<number>, never, never>>(this: Effect.Effect<number, never, never>, ab: (_: Effect.Effect<number, never, never>) => Effect.Effect<Option<number>, never, never>): Effect.Effect<Option<number>, never, never> (+21 overloads)pipe(4  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const whenEffect: <never, never>(condition: Effect.Effect<boolean, never, never>) => <A, E2, R2>(effect: Effect.Effect<A, E2, R2>) => Effect.Effect<Option<A>, E2, R2> (+1 overload)Conditionally executes an effect based on the result of another effect.
Details
This function allows you to run an effect only if a conditional effect
evaluating to a boolean resolves to true. If the conditional effect
evaluates to true, the specified effect is executed, and its result is
wrapped in Option.some. If the conditional effect evaluates to false, the
effect is skipped, and the result is Option.none.
When to Use
This function is particularly useful when the decision to execute an effect
depends on the result of another effect, such as a random value, a
user-provided input, or a network request result.
Example (Using an Effect as a Condition)
import { Effect, Random } from "effect"
const randomIntOption = Random.nextInt.pipe(  Effect.whenEffect(Random.nextBoolean))
console.log(Effect.runSync(randomIntOption))// Example Output:// { _id: 'Option', _tag: 'Some', value: 8609104974198840 }@see ― when for a version that allows the condition to be a boolean.@see ― unlessEffect for a version that executes the effect when the condition is false.@since ― 2.0.0whenEffect(import RandomRandom.const nextBoolean: Effect.Effect<boolean, never, never>Returns the next boolean value from the pseudo-random number generator.@since ― 2.0.0nextBoolean)5)6
7var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runSync: <Option<number>, never>(effect: Effect.Effect<Option<number>, never, never>) => Option<number>Executes an effect synchronously, running it immediately and returning the
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
throwing an error.@since ― 2.0.0runSync(const randomIntOption: Effect.Effect<Option<number>, never, never>randomIntOption))8/*9Example Output:10{ _id: 'Option', _tag: 'Some', value: 8609104974198840 }11*/
```
### unless / unlessEffect
[](#unless--unlesseffect)
The `Effect.unless` and `Effect.unlessEffect` functions are similar to the `when*` functions, but they are equivalent to the `if (!condition) expression` construct.
## Zipping
[](#zipping)
### zip
[](#zip)
Combines two effects into a single effect, producing a tuple with the results of both effects.
The `Effect.zip` function executes the first effect (left) and then the second effect (right). Once both effects succeed, their results are combined into a tuple.
**Example** (Combining Two Effects Sequentially)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const task1: Effect.Effect<number, never, never>task1 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(1).Pipeable.pipe<Effect.Effect<number, never, never>, Effect.Effect<number, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<number, never, never>, ab: (_: Effect.Effect<number, never, never>) => Effect.Effect<number, never, never>, bc: (_: Effect.Effect<number, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(4  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const delay: (duration: DurationInput) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R> (+1 overload)Delays the execution of an effect by a specified Duration.
**Details
This function postpones the execution of the provided effect by the specified
duration. The duration can be provided in various formats supported by the
Duration module.
Internally, this function does not block the thread; instead, it uses an
efficient, non-blocking mechanism to introduce the delay.
Example
import { Console, Effect } from "effect"
const task = Console.log("Task executed")
const program = Console.log("start").pipe(  Effect.andThen(    // Delays the log message by 2 seconds    task.pipe(Effect.delay("2 seconds"))  ))
Effect.runFork(program)// Output:// start// Task executed@since ― 2.0.0delay("200 millis"),5  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <Effect.Effect<void, never, never>>(f: Effect.Effect<void, never, never>) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runFork(program)// Output:// timestamp=... level=INFO fiber=#0 message=message1 message=message2 cause="Error: Oh no!// Error: Oh uh!"@since ― 2.0.0log("task1 done"))6)7
8const const task2: Effect.Effect<string, never, never>task2 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("hello").Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>, bc: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(9  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const delay: (duration: DurationInput) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R> (+1 overload)Delays the execution of an effect by a specified Duration.
**Details
This function postpones the execution of the provided effect by the specified
duration. The duration can be provided in various formats supported by the
Duration module.
Internally, this function does not block the thread; instead, it uses an
efficient, non-blocking mechanism to introduce the delay.
Example
import { Console, Effect } from "effect"
const task = Console.log("Task executed")
const program = Console.log("start").pipe(  Effect.andThen(    // Delays the log message by 2 seconds    task.pipe(Effect.delay("2 seconds"))  ))
Effect.runFork(program)// Output:// start// Task executed@since ― 2.0.0delay("100 millis"),10  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <Effect.Effect<void, never, never>>(f: Effect.Effect<void, never, never>) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runFork(program)// Output:// timestamp=... level=INFO fiber=#0 message=message1 message=message2 cause="Error: Oh no!// Error: Oh uh!"@since ― 2.0.0log("task2 done"))11)12
13// Combine the two effects together14//15//      ┌─── Effect<[number, string], never, never>16//      ▼17const const program: Effect.Effect<[number, string], never, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const zip: <number, never, never, string, never, never>(self: Effect.Effect<number, never, never>, that: Effect.Effect<string, never, never>, options?: {    readonly concurrent?: boolean | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly concurrentFinalizers?: boolean | undefined;} | undefined) => Effect.Effect<[number, string], never, never> (+1 overload)Combines two effects into a single effect, producing a tuple of their
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
function.@see ― validate for a version that accumulates errors.@since ― 2.0.0zip(const task1: Effect.Effect<number, never, never>task1, const task2: Effect.Effect<string, never, never>task2)18
19import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <[number, string], never>(effect: Effect.Effect<[number, string], never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<[number, string]>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const program: Effect.Effect<[number, string], never, never>program).Promise<[number, string]>.then<void, never>(onfulfilled?: ((value: [number, string]) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)20/*21Output:22timestamp=... level=INFO fiber=#0 message="task1 done"23timestamp=... level=INFO fiber=#0 message="task2 done"24[ 1, 'hello' ]25*/
```
By default, the effects are run sequentially. To run them concurrently, use the `{ concurrent: true }` option.
**Example** (Combining Two Effects Concurrently)
```
1import { Effect } from "effect"2
9 collapsed lines3const task1 = Effect.succeed(1).pipe(4  Effect.delay("200 millis"),5  Effect.tap(Effect.log("task1 done"))6)7
8const task2 = Effect.succeed("hello").pipe(9  Effect.delay("100 millis"),10  Effect.tap(Effect.log("task2 done"))11)12
13// Run both effects concurrently using the concurrent option14const program = Effect.zip(task1, task2, { concurrent: true })15
16Effect.runPromise(program).then(console.log)17/*18Output:19timestamp=... level=INFO fiber=#3 message="task2 done"20timestamp=... level=INFO fiber=#2 message="task1 done"21[ 1, 'hello' ]22*/
```
In this concurrent version, both effects run in parallel. `task2` completes first, but both tasks can be logged and processed as soon as they’re done.
### zipWith
[](#zipwith)
Combines two effects sequentially and applies a function to their results to produce a single value.
The `Effect.zipWith` function is similar to [Effect.zip](#zip), but instead of returning a tuple of results, it applies a provided function to the results of the two effects, combining them into a single value.
By default, the effects are run sequentially. To run them concurrently, use the `{ concurrent: true }` option.
**Example** (Combining Effects with a Custom Function)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const task1: Effect.Effect<number, never, never>task1 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(1).Pipeable.pipe<Effect.Effect<number, never, never>, Effect.Effect<number, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<number, never, never>, ab: (_: Effect.Effect<number, never, never>) => Effect.Effect<number, never, never>, bc: (_: Effect.Effect<number, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(4  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const delay: (duration: DurationInput) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R> (+1 overload)Delays the execution of an effect by a specified Duration.
**Details
This function postpones the execution of the provided effect by the specified
duration. The duration can be provided in various formats supported by the
Duration module.
Internally, this function does not block the thread; instead, it uses an
efficient, non-blocking mechanism to introduce the delay.
Example
import { Console, Effect } from "effect"
const task = Console.log("Task executed")
const program = Console.log("start").pipe(  Effect.andThen(    // Delays the log message by 2 seconds    task.pipe(Effect.delay("2 seconds"))  ))
Effect.runFork(program)// Output:// start// Task executed@since ― 2.0.0delay("200 millis"),5  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <Effect.Effect<void, never, never>>(f: Effect.Effect<void, never, never>) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runFork(program)// Output:// timestamp=... level=INFO fiber=#0 message=message1 message=message2 cause="Error: Oh no!// Error: Oh uh!"@since ― 2.0.0log("task1 done"))6)7const const task2: Effect.Effect<string, never, never>task2 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("hello").Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>, bc: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(8  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const delay: (duration: DurationInput) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R> (+1 overload)Delays the execution of an effect by a specified Duration.
**Details
This function postpones the execution of the provided effect by the specified
duration. The duration can be provided in various formats supported by the
Duration module.
Internally, this function does not block the thread; instead, it uses an
efficient, non-blocking mechanism to introduce the delay.
Example
import { Console, Effect } from "effect"
const task = Console.log("Task executed")
const program = Console.log("start").pipe(  Effect.andThen(    // Delays the log message by 2 seconds    task.pipe(Effect.delay("2 seconds"))  ))
Effect.runFork(program)// Output:// start// Task executed@since ― 2.0.0delay("100 millis"),9  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <Effect.Effect<void, never, never>>(f: Effect.Effect<void, never, never>) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runFork(program)// Output:// timestamp=... level=INFO fiber=#0 message=message1 message=message2 cause="Error: Oh no!// Error: Oh uh!"@since ― 2.0.0log("task2 done"))10)11
12//      ┌─── Effect<number, never, never>13//      ▼14const const task3: Effect.Effect<number, never, never>task3 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const zipWith: <number, never, never, string, never, never, number>(self: Effect.Effect<number, never, never>, that: Effect.Effect<string, never, never>, f: (a: number, b: string) => number, options?: {    readonly concurrent?: boolean | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly concurrentFinalizers?: boolean | undefined;}) => Effect.Effect<number, never, never> (+1 overload)Combines two effects sequentially and applies a function to their results to
produce a single value.
Details
This function runs two effects in sequence (or concurrently, if the { concurrent: true } option is provided) and combines their results using a
provided function. Unlike
zip
, which returns a tuple of the results,
this function processes the results with a custom function to produce a
single output.
Example (Combining Effects with a Custom Function)
import { Effect } from "effect"
const task1 = Effect.succeed(1).pipe(  Effect.delay("200 millis"),  Effect.tap(Effect.log("task1 done")))const task2 = Effect.succeed("hello").pipe(  Effect.delay("100 millis"),  Effect.tap(Effect.log("task2 done")))
const task3 = Effect.zipWith(  task1,  task2,  // Combines results into a single value  (number, string) => number + string.length)
Effect.runPromise(task3).then(console.log)// Output:// timestamp=... level=INFO fiber=#3 message="task1 done"// timestamp=... level=INFO fiber=#2 message="task2 done"// 6@since ― 2.0.0zipWith(15  const task1: Effect.Effect<number, never, never>task1,16  const task2: Effect.Effect<string, never, never>task2,17  // Combines results into a single value18  (number: numbernumber, string: stringstring) => number: numbernumber + string: stringstring.String.length: numberReturns the length of a String object.length19)20
21import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number, never>(effect: Effect.Effect<number, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const task3: Effect.Effect<number, never, never>task3).Promise<number>.then<void, never>(onfulfilled?: ((value: number) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)22/*23Output:24timestamp=... level=INFO fiber=#3 message="task1 done"25timestamp=... level=INFO fiber=#2 message="task2 done"26627*/
```
## Looping
[](#looping)
### loop
[](#loop)
The `Effect.loop` function allows you to repeatedly update a state using a `step` function until a condition defined by the `while` function becomes `false`. It collects the intermediate states in an array and returns them as the final result.
**Syntax**
```
Effect.loop(initial, {  while: (state) => boolean,  step: (state) => state,  body: (state) => Effect})
```
This function is similar to a `while` loop in JavaScript, with the addition of effectful computations:
```
let state = initialconst result = []
while (options.while(state)) {  result.push(options.body(state)) // Perform the effectful operation  state = options.step(state) // Update the state}
return result
```
**Example** (Looping with Collected Results)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3// A loop that runs 5 times, collecting each iteration's result4const const result: Effect.Effect<number[], never, never>result = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const loop: <number, number, never, never>(initial: number, options: {    readonly while: (a: number) => boolean;    readonly step: (a: number) => number;    readonly body: (a: number) => Effect.Effect<number, never, never>;    readonly discard?: false | undefined;}) => Effect.Effect<number[], never, never> (+3 overloads)Repeatedly executes a loop with a state, collecting results or discarding
them based on configuration.
Details
This function performs an effectful loop, starting with an initial state and
iterating as long as the while condition evaluates to true, similar to a
while loop in JavaScript.
let state = initialconst result = []
while (options.while(state)) {  result.push(options.body(state)) // Perform the effectful operation  state = options.step(state) // Update the state}
return result
During each iteration, the step function updates the state, and the body
effect is executed.
The results of the body effect can be collected in an array or discarded
based on the discard option.
Discarding Intermediate Results
If discard is false or not provided, the intermediate results are
collected into an array and returned as the final result.
If discard is true, the intermediate results are ignored, and the
effect returns void.
When to Use
This is useful for implementing loops where you need to perform effectful
computations repeatedly, such as processing items in a list, generating
values, or performing iterative updates.
Example (Looping with Collected Results)
import { Effect } from "effect"
// A loop that runs 5 times, collecting each iteration's resultconst result = Effect.loop(  // Initial state  1,  {    // Condition to continue looping    while: (state) => state <= 5,    // State update function    step: (state) => state + 1,    // Effect to be performed on each iteration    body: (state) => Effect.succeed(state)  })
Effect.runPromise(result).then(console.log)// Output: [1, 2, 3, 4, 5]
Example (Loop with Discarded Results)
import { Effect, Console } from "effect"
const result = Effect.loop(  // Initial state  1,  {    // Condition to continue looping    while: (state) => state <= 5,    // State update function    step: (state) => state + 1,    // Effect to be performed on each iteration    body: (state) => Console.log(`Currently at state ${state}`),    // Discard intermediate results    discard: true  })
Effect.runPromise(result).then(console.log)// Output:// Currently at state 1// Currently at state 2// Currently at state 3// Currently at state 4// Currently at state 5// undefined@since ― 2.0.0loop(5  // Initial state6  1,7  {8    // Condition to continue looping9    while: (a: number) => booleanwhile: (state: numberstate) => state: numberstate <= 5,10    // State update function11    step: (a: number) => numberstep: (state: numberstate) => state: numberstate + 1,12    // Effect to be performed on each iteration13    body: (a: number) => Effect.Effect<number, never, never>body: (state: numberstate) => import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(state: numberstate)14  }15)16
17import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number[], never>(effect: Effect.Effect<number[], never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number[]>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const result: Effect.Effect<number[], never, never>result).Promise<number[]>.then<void, never>(onfulfilled?: ((value: number[]) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)18// Output: [1, 2, 3, 4, 5]
```
In this example, the loop starts with the state `1` and continues until the state exceeds `5`. Each state is incremented by `1` and is collected into an array, which becomes the final result.
#### Discarding Intermediate Results
[](#discarding-intermediate-results)
The `discard` option, when set to `true`, will discard the results of each effectful operation, returning `void` instead of an array.
**Example** (Loop with Discarded Results)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const result: Effect.Effect<void, never, never>result = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const loop: <number, void, never, never>(initial: number, options: {    readonly while: (a: number) => boolean;    readonly step: (a: number) => number;    readonly body: (a: number) => Effect.Effect<void, never, never>;    readonly discard: true;}) => Effect.Effect<void, never, never> (+3 overloads)Repeatedly executes a loop with a state, collecting results or discarding
them based on configuration.
Details
This function performs an effectful loop, starting with an initial state and
iterating as long as the while condition evaluates to true, similar to a
while loop in JavaScript.
let state = initialconst result = []
while (options.while(state)) {  result.push(options.body(state)) // Perform the effectful operation  state = options.step(state) // Update the state}
return result
During each iteration, the step function updates the state, and the body
effect is executed.
The results of the body effect can be collected in an array or discarded
based on the discard option.
Discarding Intermediate Results
If discard is false or not provided, the intermediate results are
collected into an array and returned as the final result.
If discard is true, the intermediate results are ignored, and the
effect returns void.
When to Use
This is useful for implementing loops where you need to perform effectful
computations repeatedly, such as processing items in a list, generating
values, or performing iterative updates.
Example (Looping with Collected Results)
import { Effect } from "effect"
// A loop that runs 5 times, collecting each iteration's resultconst result = Effect.loop(  // Initial state  1,  {    // Condition to continue looping    while: (state) => state <= 5,    // State update function    step: (state) => state + 1,    // Effect to be performed on each iteration    body: (state) => Effect.succeed(state)  })
Effect.runPromise(result).then(console.log)// Output: [1, 2, 3, 4, 5]
Example (Loop with Discarded Results)
import { Effect, Console } from "effect"
const result = Effect.loop(  // Initial state  1,  {    // Condition to continue looping    while: (state) => state <= 5,    // State update function    step: (state) => state + 1,    // Effect to be performed on each iteration    body: (state) => Console.log(`Currently at state ${state}`),    // Discard intermediate results    discard: true  })
Effect.runPromise(result).then(console.log)// Output:// Currently at state 1// Currently at state 2// Currently at state 3// Currently at state 4// Currently at state 5// undefined@since ― 2.0.0loop(4  // Initial state5  1,6  {7    // Condition to continue looping8    while: (a: number) => booleanwhile: (state: numberstate) => state: numberstate <= 5,9    // State update function10    step: (a: number) => numberstep: (state: numberstate) => state: numberstate + 1,11    // Effect to be performed on each iteration12    body: (a: number) => Effect.Effect<void, never, never>body: (state: numberstate) => import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`Currently at state ${state: numberstate}`),13    // Discard intermediate results14    discard: truediscard: true15  }16)17
18import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <void, never>(effect: Effect.Effect<void, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<void>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const result: Effect.Effect<void, never, never>result).Promise<void>.then<void, never>(onfulfilled?: ((value: void) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)19/*20Output:21Currently at state 122Currently at state 223Currently at state 324Currently at state 425Currently at state 526undefined27*/
```
In this example, the loop performs a side effect of logging the current index on each iteration, but it discards all intermediate results. The final result is `undefined`.
### iterate
[](#iterate)
The `Effect.iterate` function lets you repeatedly update a state through an effectful operation. It runs the `body` effect to update the state in each iteration and continues as long as the `while` condition evaluates to `true`.
**Syntax**
```
Effect.iterate(initial, {  while: (result) => boolean,  body: (result) => Effect})
```
This function is similar to a `while` loop in JavaScript, with the addition of effectful computations:
```
let result = initial
while (options.while(result)) {  result = options.body(result)}
return result
```
**Example** (Effectful Iteration)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3const const result: Effect.Effect<number, never, never>result = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const iterate: <number, never, never>(initial: number, options: {    readonly while: Predicate<number>;    readonly body: (a: number) => Effect.Effect<number, never, never>;}) => Effect.Effect<number, never, never> (+1 overload)Repeatedly updates a state through an effectful operation until a condition
is no longer met.
Details
This function provides a way to implement effectful loops, similar to a
while loop in JavaScript.
let result = initial
while (options.while(result)) {  result = options.body(result)}
return result
It starts with an initial state, checks a
condition (while), and executes a body operation to update the state if the
condition evaluates to true. The process repeats until the condition
returns false.
The state is passed between iterations, allowing the body operation to modify
it dynamically. The final state after the loop ends is returned as the result
of the effect.
When to Use
This is particularly useful for scenarios where looping logic involves
asynchronous or side-effectful operations, such as polling or iterative
computations that depend on external factors.
Example (Effectful Iteration)
import { Effect } from "effect"
const result = Effect.iterate(  // Initial result  1,  {    // Condition to continue iterating    while: (result) => result <= 5,    // Operation to change the result    body: (result) => Effect.succeed(result + 1)  })
Effect.runPromise(result).then(console.log)// Output: 6@since ― 2.0.0iterate(4  // Initial result5  1,6  {7    // Condition to continue iterating8    while: Predicate<number>while: (result: numberresult) => result: numberresult <= 5,9    // Operation to change the result10    body: (a: number) => Effect.Effect<number, never, never>body: (result: numberresult) => import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(result: numberresult + 1)11  }12)13
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
of rejecting.@since ― 2.0.0runPromise(const result: Effect.Effect<number, never, never>result).Promise<number>.then<void, never>(onfulfilled?: ((value: number) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)15// Output: 6
```
### forEach
[](#foreach)
Executes an effectful operation for each element in an `Iterable`.
The `Effect.forEach` function applies a provided operation to each element in the iterable, producing a new effect that returns an array of results. If any effect fails, the iteration stops immediately (short-circuiting), and the error is propagated.
The `concurrency` option controls how many operations are performed concurrently. By default, the operations are performed sequentially.
**Example** (Applying Effects to Iterable Elements)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const result: Effect.Effect<number[], never, never>result = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const forEach: <number, never, never, number[]>(self: number[], f: (a: number, i: number) => Effect.Effect<number, never, never>, options?: {    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard?: false | undefined;    readonly concurrentFinalizers?: boolean | undefined;} | undefined) => Effect.Effect<number[], never, never> (+3 overloads)Executes an effectful operation for each element in an Iterable.
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
Effect.runPromise(result).then(console.log)// Output:// Currently at index 0// Currently at index 1// Currently at index 2// Currently at index 3// Currently at index 4// undefined@see ― all for combining multiple effects into one.@since ― 2.0.0forEach([1, 2, 3, 4, 5], (n: numbern, index: numberindex) =>4  import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`Currently at index ${index: numberindex}`).Pipeable.pipe<Effect.Effect<void, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<void, never, never>, ab: (_: Effect.Effect<void, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <number>(value: number) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<number, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
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
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(n: numbern * 2))5)6
7import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number[], never>(effect: Effect.Effect<number[], never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number[]>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const result: Effect.Effect<number[], never, never>result).Promise<number[]>.then<void, never>(onfulfilled?: ((value: number[]) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)8/*9Output:10Currently at index 011Currently at index 112Currently at index 213Currently at index 314Currently at index 415[ 2, 4, 6, 8, 10 ]16*/
```
In this example, we iterate over the array `[1, 2, 3, 4, 5]`, applying an effect that logs the current index. The `Effect.as(n * 2)` operation transforms each value, resulting in an array `[2, 4, 6, 8, 10]`. The final output is the result of collecting all the transformed values.
#### Discarding Results
[](#discarding-results)
The `discard` option, when set to `true`, will discard the results of each effectful operation, returning `void` instead of an array.
**Example** (Using `discard` to Ignore Results)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3// Apply effects but discard the results4const const result: Effect.Effect<void, never, never>result = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const forEach: <number, number, never, never>(self: Iterable<number>, f: (a: number, i: number) => Effect.Effect<number, never, never>, options: {    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard: true;    readonly concurrentFinalizers?: boolean | undefined;}) => Effect.Effect<void, never, never> (+3 overloads)Executes an effectful operation for each element in an Iterable.
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
Effect.runPromise(result).then(console.log)// Output:// Currently at index 0// Currently at index 1// Currently at index 2// Currently at index 3// Currently at index 4// undefined@see ― all for combining multiple effects into one.@since ― 2.0.0forEach(5  [1, 2, 3, 4, 5],6  (n: numbern, index: numberindex) =>7    import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`Currently at index ${index: numberindex}`).Pipeable.pipe<Effect.Effect<void, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<void, never, never>, ab: (_: Effect.Effect<void, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <number>(value: number) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<number, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
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
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(n: numbern * 2)),8  { discard: truediscard: true }9)10
11import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <void, never>(effect: Effect.Effect<void, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<void>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const result: Effect.Effect<void, never, never>result).Promise<void>.then<void, never>(onfulfilled?: ((value: void) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)12/*13Output:14Currently at index 015Currently at index 116Currently at index 217Currently at index 318Currently at index 419undefined20*/
```
In this case, the effects still run for each element, but the results are discarded, so the final output is `undefined`.
## Collecting
[](#collecting)
### all
[](#all)
Combines multiple effects into one, returning results based on the input structure.
Use `Effect.all` when you need to run multiple effects and combine their results into a single output. It supports tuples, iterables, structs, and records, making it flexible for different input types.
If any effect fails, it stops execution (short-circuiting) and propagates the error. To change this behavior, you can use the [`mode`](#the-mode-option) option, which allows all effects to run and collect results as [Either](/docs/data-types/either/) or [Option](/docs/data-types/option/).
You can control the execution order (e.g., sequential vs. concurrent) using the [Concurrency Options](/docs/concurrency/basic-concurrency/#concurrency-options).
For instance, if the input is a tuple:
```
//         ┌─── a tuple of effects//         ▼Effect.all([effect1, effect2, ...])
```
the effects are executed sequentially, and the result is a new effect containing the results as a tuple. The results in the tuple match the order of the effects passed to `Effect.all`.
Let’s explore examples for different types of structures: tuples, iterables, objects, and records.
**Example** (Combining Effects in Tuples)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const tupleOfEffects: readonly [Effect.Effect<number, never, never>, Effect.Effect<string, never, never>]tupleOfEffects = [4  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(42).Pipeable.pipe<Effect.Effect<number, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<number, never, never>, ab: (_: Effect.Effect<number, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <number, Effect.Effect<void, never, never>>(f: (a: number) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log)),5  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("Hello").Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <string, Effect.Effect<void, never, never>>(f: (a: string) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<string, E, R>) => Effect.Effect<string, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log))6] as type const = readonly [Effect.Effect<number, never, never>, Effect.Effect<string, never, never>]const7
8//      ┌─── Effect<[number, string], never, never>9//      ▼10const const resultsAsTuple: Effect.Effect<[number, string], never, never>resultsAsTuple = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const all: <readonly [Effect.Effect<number, never, never>, Effect.Effect<string, never, never>], NoExcessProperties<{    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard?: boolean | undefined;    readonly mode?: "default" | "validate" | "either" | undefined;    readonly concurrentFinalizers?: boolean | undefined;}, unknown>>(arg: readonly [Effect.Effect<number, never, never>, Effect.Effect<string, never, never>], options?: NoExcessProperties<...> | undefined) => Effect.Effect<...>Combines multiple effects into one, returning results based on the input
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
Effect.runPromiseExit(program).then((result) => console.log("%o", result))// Output:// Task1// Task3// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: [//       { _id: 'Option', _tag: 'None' },//       { _id: 'Option', _tag: 'Some', value: 'Task2: Oh no!' },//       { _id: 'Option', _tag: 'None' }//     ]//   }// }@see ― forEach for iterating over elements and applying an effect.@see ― allWith for a data-last version of this function.@since ― 2.0.0all(const tupleOfEffects: readonly [Effect.Effect<number, never, never>, Effect.Effect<string, never, never>]tupleOfEffects)11
12import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <[number, string], never>(effect: Effect.Effect<[number, string], never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<[number, string]>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const resultsAsTuple: Effect.Effect<[number, string], never, never>resultsAsTuple).Promise<[number, string]>.then<void, never>(onfulfilled?: ((value: [number, string]) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)13/*14Output:154216Hello17[ 42, 'Hello' ]18*/
```
**Example** (Combining Effects in Iterables)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const iterableOfEffects: Iterable<Effect.Effect<number, never, never>>iterableOfEffects: interface Iterable<T, TReturn = any, TNext = any>Iterable<import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number>> = [1, 2, 3].Array<number>.map<Effect.Effect<number, never, never>>(callbackfn: (value: number, index: number, array: number[]) => Effect.Effect<number, never, never>, thisArg?: any): Effect.Effect<number, never, never>[]Calls a defined callback function on each element of an array, and returns an array that contains the results.@param ― callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.@param ― thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.map(4  (n: numbern) => import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(n: numbern).Pipeable.pipe<Effect.Effect<number, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<number, never, never>, ab: (_: Effect.Effect<number, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <number, Effect.Effect<void, never, never>>(f: (a: number) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log))5)6
7//      ┌─── Effect<number[], never, never>8//      ▼9const const resultsAsArray: Effect.Effect<number[], never, never>resultsAsArray = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const all: <Iterable<Effect.Effect<number, never, never>>, NoExcessProperties<{    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard?: boolean | undefined;    readonly mode?: "default" | "validate" | "either" | undefined;    readonly concurrentFinalizers?: boolean | undefined;}, unknown>>(arg: Iterable<Effect.Effect<number, never, never>>, options?: NoExcessProperties<{    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard?: boolean | undefined;    readonly mode?: "default" | "validate" | "either" | undefined;    readonly concurrentFinalizers?: boolean | undefined;}, unknown> | undefined) => Effect.Effect<...>Combines multiple effects into one, returning results based on the input
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
Effect.runPromiseExit(program).then((result) => console.log("%o", result))// Output:// Task1// Task3// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: [//       { _id: 'Option', _tag: 'None' },//       { _id: 'Option', _tag: 'Some', value: 'Task2: Oh no!' },//       { _id: 'Option', _tag: 'None' }//     ]//   }// }@see ― forEach for iterating over elements and applying an effect.@see ― allWith for a data-last version of this function.@since ― 2.0.0all(const iterableOfEffects: Iterable<Effect.Effect<number, never, never>>iterableOfEffects)10
11import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number[], never>(effect: Effect.Effect<number[], never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number[]>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const resultsAsArray: Effect.Effect<number[], never, never>resultsAsArray).Promise<number[]>.then<void, never>(onfulfilled?: ((value: number[]) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)12/*13Output:14115216317[ 1, 2, 3 ]18*/
```
**Example** (Combining Effects in Structs)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const structOfEffects: {    a: Effect.Effect<number, never, never>;    b: Effect.Effect<string, never, never>;}structOfEffects = {4  a: Effect.Effect<number, never, never>a: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(42).Pipeable.pipe<Effect.Effect<number, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<number, never, never>, ab: (_: Effect.Effect<number, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <number, Effect.Effect<void, never, never>>(f: (a: number) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log)),5  b: Effect.Effect<string, never, never>b: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("Hello").Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <string, Effect.Effect<void, never, never>>(f: (a: string) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<string, E, R>) => Effect.Effect<string, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log))6}7
8//      ┌─── Effect<{ a: number; b: string; }, never, never>9//      ▼10const const resultsAsStruct: Effect.Effect<{    a: number;    b: string;}, never, never>resultsAsStruct = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const all: <{    a: Effect.Effect<number, never, never>;    b: Effect.Effect<string, never, never>;}, NoExcessProperties<{    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard?: boolean | undefined;    readonly mode?: "default" | "validate" | "either" | undefined;    readonly concurrentFinalizers?: boolean | undefined;}, unknown>>(arg: {    a: Effect.Effect<number, never, never>;    b: Effect.Effect<string, never, never>;}, options?: NoExcessProperties<...> | undefined) => Effect.Effect<...>Combines multiple effects into one, returning results based on the input
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
Effect.runPromiseExit(program).then((result) => console.log("%o", result))// Output:// Task1// Task3// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: [//       { _id: 'Option', _tag: 'None' },//       { _id: 'Option', _tag: 'Some', value: 'Task2: Oh no!' },//       { _id: 'Option', _tag: 'None' }//     ]//   }// }@see ― forEach for iterating over elements and applying an effect.@see ― allWith for a data-last version of this function.@since ― 2.0.0all(const structOfEffects: {    a: Effect.Effect<number, never, never>;    b: Effect.Effect<string, never, never>;}structOfEffects)11
12import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <{    a: number;    b: string;}, never>(effect: Effect.Effect<{    a: number;    b: string;}, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<{    a: number;    b: string;}>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const resultsAsStruct: Effect.Effect<{    a: number;    b: string;}, never, never>resultsAsStruct).Promise<{ a: number; b: string; }>.then<void, never>(onfulfilled?: ((value: {    a: number;    b: string;}) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)13/*14Output:154216Hello17{ a: 42, b: 'Hello' }18*/
```
**Example** (Combining Effects in Records)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const recordOfEffects: Record<string, Effect.Effect<number, never, never>>recordOfEffects: type Record<K extends keyof any, T> = { [P in K]: T; }Construct a type with a set of properties K of type TRecord<string, import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number>> = {4  key1: Effect.Effect<number, never, never>key1: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(1).Pipeable.pipe<Effect.Effect<number, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<number, never, never>, ab: (_: Effect.Effect<number, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <number, Effect.Effect<void, never, never>>(f: (a: number) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log)),5  key2: Effect.Effect<number, never, never>key2: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(2).Pipeable.pipe<Effect.Effect<number, never, never>, Effect.Effect<number, never, never>>(this: Effect.Effect<number, never, never>, ab: (_: Effect.Effect<number, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <number, Effect.Effect<void, never, never>>(f: (a: number) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log))6}7
8//      ┌─── Effect<{ [x: string]: number; }, never, never>9//      ▼10const const resultsAsRecord: Effect.Effect<{    [x: string]: number;}, never, never>resultsAsRecord = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const all: <Record<string, Effect.Effect<number, never, never>>, NoExcessProperties<{    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard?: boolean | undefined;    readonly mode?: "default" | "validate" | "either" | undefined;    readonly concurrentFinalizers?: boolean | undefined;}, unknown>>(arg: Record<string, Effect.Effect<number, never, never>>, options?: NoExcessProperties<{    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard?: boolean | undefined;    readonly mode?: "default" | "validate" | "either" | undefined;    readonly concurrentFinalizers?: boolean | undefined;}, unknown> | undefined) => Effect.Effect<...>Combines multiple effects into one, returning results based on the input
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
Effect.runPromiseExit(program).then((result) => console.log("%o", result))// Output:// Task1// Task3// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: [//       { _id: 'Option', _tag: 'None' },//       { _id: 'Option', _tag: 'Some', value: 'Task2: Oh no!' },//       { _id: 'Option', _tag: 'None' }//     ]//   }// }@see ― forEach for iterating over elements and applying an effect.@see ― allWith for a data-last version of this function.@since ― 2.0.0all(const recordOfEffects: Record<string, Effect.Effect<number, never, never>>recordOfEffects)11
12import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <{    [x: string]: number;}, never>(effect: Effect.Effect<{    [x: string]: number;}, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<{    [x: string]: number;}>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const resultsAsRecord: Effect.Effect<{    [x: string]: number;}, never, never>resultsAsRecord).Promise<{ [x: string]: number; }>.then<void, never>(onfulfilled?: ((value: {    [x: string]: number;}) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)13/*14Output:15116217{ key1: 1, key2: 2 }18*/
```
#### Short-Circuiting Behavior
[](#short-circuiting-behavior)
The `Effect.all` function stops execution on the first error it encounters, this is called “short-circuiting”. If any effect in the collection fails, the remaining effects will not run, and the error will be propagated.
**Example** (Bail Out on First Failure)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const program: Effect.Effect<[string, never, string], string, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const all: <readonly [Effect.Effect<string, never, never>, Effect.Effect<never, string, never>, Effect.Effect<string, never, never>], NoExcessProperties<{    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard?: boolean | undefined;    readonly mode?: "default" | "validate" | "either" | undefined;    readonly concurrentFinalizers?: boolean | undefined;}, unknown>>(arg: readonly [Effect.Effect<string, never, never>, Effect.Effect<never, string, never>, Effect.Effect<...>], options?: NoExcessProperties<...> | undefined) => Effect.Effect<...>Combines multiple effects into one, returning results based on the input
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
Effect.runPromiseExit(program).then((result) => console.log("%o", result))// Output:// Task1// Task3// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: [//       { _id: 'Option', _tag: 'None' },//       { _id: 'Option', _tag: 'Some', value: 'Task2: Oh no!' },//       { _id: 'Option', _tag: 'None' }//     ]//   }// }@see ― forEach for iterating over elements and applying an effect.@see ― allWith for a data-last version of this function.@since ― 2.0.0all([4  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("Task1").Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <string, Effect.Effect<void, never, never>>(f: (a: string) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<string, E, R>) => Effect.Effect<string, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log)),5  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("Task2: Oh no!").Pipeable.pipe<Effect.Effect<never, string, never>, Effect.Effect<never, string, never>>(this: Effect.Effect<never, string, never>, ab: (_: Effect.Effect<never, string, never>) => Effect.Effect<never, string, never>): Effect.Effect<never, string, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <never, Effect.Effect<void, never, never>>(f: (a: never) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<never, E, R>) => Effect.Effect<never, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log)),6  // Won't execute due to earlier failure7  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("Task3").Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <string, Effect.Effect<void, never, never>>(f: (a: string) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<string, E, R>) => Effect.Effect<string, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log))8])9
10import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <[string, never, string], string>(effect: Effect.Effect<[string, never, string], string, never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<[string, never, string], string>>Runs an effect and returns a Promise that resolves to an Exit,
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
// Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const program: Effect.Effect<[string, never, string], string, never>program).Promise<Exit<[string, never, string], string>>.then<void, never>(onfulfilled?: ((value: Exit<[string, never, string], string>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)11/*12Output:13Task114{15  _id: 'Exit',16  _tag: 'Failure',17  cause: { _id: 'Cause', _tag: 'Fail', failure: 'Task2: Oh no!' }18}19*/
```
You can override this behavior by using the `mode` option.
#### The `mode` option
[](#the-mode-option)
The `{ mode: "either" }` option changes the behavior of `Effect.all` to ensure all effects run, even if some fail. Instead of stopping on the first failure, this mode collects both successes and failures, returning an array of `Either` instances where each result is either a `Right` (success) or a `Left` (failure).
**Example** (Collecting Results with `mode: "either"`)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const effects: (Effect.Effect<string, never, never> | Effect.Effect<never, string, never>)[]effects = [4  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("Task1").Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <string, Effect.Effect<void, never, never>>(f: (a: string) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<string, E, R>) => Effect.Effect<string, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log)),5  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("Task2: Oh no!").Pipeable.pipe<Effect.Effect<never, string, never>, Effect.Effect<never, string, never>>(this: Effect.Effect<never, string, never>, ab: (_: Effect.Effect<never, string, never>) => Effect.Effect<never, string, never>): Effect.Effect<never, string, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <never, Effect.Effect<void, never, never>>(f: (a: never) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<never, E, R>) => Effect.Effect<never, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log)),6  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("Task3").Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <string, Effect.Effect<void, never, never>>(f: (a: string) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<string, E, R>) => Effect.Effect<string, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log))7]8
9const const program: Effect.Effect<Either<string, string>[], never, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const all: <(Effect.Effect<string, never, never> | Effect.Effect<never, string, never>)[], {    mode: "either";}>(arg: (Effect.Effect<string, never, never> | Effect.Effect<never, string, never>)[], options?: {    mode: "either";} | undefined) => Effect.Effect<Either<string, string>[], never, never>Combines multiple effects into one, returning results based on the input
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
Effect.runPromiseExit(program).then((result) => console.log("%o", result))// Output:// Task1// Task3// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: [//       { _id: 'Option', _tag: 'None' },//       { _id: 'Option', _tag: 'Some', value: 'Task2: Oh no!' },//       { _id: 'Option', _tag: 'None' }//     ]//   }// }@see ― forEach for iterating over elements and applying an effect.@see ― allWith for a data-last version of this function.@since ― 2.0.0all(const effects: (Effect.Effect<string, never, never> | Effect.Effect<never, string, never>)[]effects, { mode: "either"mode: "either" })10
11import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <Either<string, string>[], never>(effect: Effect.Effect<Either<string, string>[], never, never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<Either<string, string>[], never>>Runs an effect and returns a Promise that resolves to an Exit,
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
// Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const program: Effect.Effect<Either<string, string>[], never, never>program).Promise<Exit<Either<string, string>[], never>>.then<void, never>(onfulfilled?: ((value: Exit<Either<string, string>[], never>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)12/*13Output:14Task115Task316{17  _id: 'Exit',18  _tag: 'Success',19  value: [20    { _id: 'Either', _tag: 'Right', right: 'Task1' },21    { _id: 'Either', _tag: 'Left', left: 'Task2: Oh no!' },22    { _id: 'Either', _tag: 'Right', right: 'Task3' }23  ]24}25*/
```
Similarly, the `{ mode: "validate" }` option uses `Option` to indicate success or failure. Each effect returns `None` for success and `Some` with the error for failure.
**Example** (Collecting Results with `mode: "validate"`)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3const const effects: (Effect.Effect<string, never, never> | Effect.Effect<never, string, never>)[]effects = [4  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("Task1").Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <string, Effect.Effect<void, never, never>>(f: (a: string) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<string, E, R>) => Effect.Effect<string, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log)),5  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("Task2: Oh no!").Pipeable.pipe<Effect.Effect<never, string, never>, Effect.Effect<never, string, never>>(this: Effect.Effect<never, string, never>, ab: (_: Effect.Effect<never, string, never>) => Effect.Effect<never, string, never>): Effect.Effect<never, string, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <never, Effect.Effect<void, never, never>>(f: (a: never) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<never, E, R>) => Effect.Effect<never, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log)),6  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <string>(value: string) => Effect.Effect<string, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed("Task3").Pipeable.pipe<Effect.Effect<string, never, never>, Effect.Effect<string, never, never>>(this: Effect.Effect<string, never, never>, ab: (_: Effect.Effect<string, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+21 overloads)pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <string, Effect.Effect<void, never, never>>(f: (a: string) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<string, E, R>) => Effect.Effect<string, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap(import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log))7]8
9const const program: Effect.Effect<string[], Option<string>[], never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const all: <(Effect.Effect<string, never, never> | Effect.Effect<never, string, never>)[], {    mode: "validate";}>(arg: (Effect.Effect<string, never, never> | Effect.Effect<never, string, never>)[], options?: {    mode: "validate";} | undefined) => Effect.Effect<string[], Option<string>[], never>Combines multiple effects into one, returning results based on the input
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
Effect.runPromiseExit(program).then((result) => console.log("%o", result))// Output:// Task1// Task3// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: [//       { _id: 'Option', _tag: 'None' },//       { _id: 'Option', _tag: 'Some', value: 'Task2: Oh no!' },//       { _id: 'Option', _tag: 'None' }//     ]//   }// }@see ― forEach for iterating over elements and applying an effect.@see ― allWith for a data-last version of this function.@since ― 2.0.0all(const effects: (Effect.Effect<string, never, never> | Effect.Effect<never, string, never>)[]effects, { mode: "validate"mode: "validate" })10
11import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromiseExit: <string[], Option<string>[]>(effect: Effect.Effect<string[], Option<string>[], never>, options?: {    readonly signal?: AbortSignal;} | undefined) => Promise<Exit<string[], Option<string>[]>>Runs an effect and returns a Promise that resolves to an Exit,
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
// Execute a failing effect and get the Exit result as a PromiseEffect.runPromiseExit(Effect.fail("my error")).then(console.log)// Output:// {//   _id: "Exit",//   _tag: "Failure",//   cause: {//     _id: "Cause",//     _tag: "Fail",//     failure: "my error"//   }// }@since ― 2.0.0runPromiseExit(const program: Effect.Effect<string[], Option<string>[], never>program).Promise<Exit<string[], Option<string>[]>>.then<void, never>(onfulfilled?: ((value: Exit<string[], Option<string>[]>) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then((result: Exit<string[], Option<string>[]>result) => var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log("%o", result: Exit<string[], Option<string>[]>result))12/*13Output:14Task115Task316{17  _id: 'Exit',18  _tag: 'Failure',19  cause: {20    _id: 'Cause',21    _tag: 'Fail',22    failure: [23      { _id: 'Option', _tag: 'None' },24      { _id: 'Option', _tag: 'Some', value: 'Task2: Oh no!' },25      { _id: 'Option', _tag: 'None' }26    ]27  }28}29*/
```
[Edit page](https://github.com/Effect-TS/website/edit/main/content/src/content/docs/docs/getting-started/control-flow.mdx)
[Previous  
Building Pipelines](/docs/getting-started/building-pipelines/) [Next  
Two Types of Errors](/docs/error-management/two-error-types/)
