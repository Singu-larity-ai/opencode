---
title: "Error Channel Operations"
source: "https://effect.website/docs/error-channel-operations/"
description: "Effect documentation - Error Channel Operations"
---

# Error Channel Operations

[Docs](/docs/) [Blog](/blog/) [Podcast](/podcast/) [Play](/play/)
On this page
## On this page
-   [Overview](#_top)
-   [Map Operations](#map-operations)
-   [Filtering the Success Channel](#filtering-the-success-channel)
-   [Inspecting Errors](#inspecting-errors)
-   [Exposing Errors in The Success Channel](#exposing-errors-in-the-success-channel)
-   [Exposing the Cause in The Success Channel](#exposing-the-cause-in-the-success-channel)
-   [Merging the Error Channel into the Success Channel](#merging-the-error-channel-into-the-success-channel)
-   [Flipping Error and Success Channels](#flipping-error-and-success-channels)
# Error Channel Operations
In Effect you can perform various operations on the error channel of effects. These operations allow you to transform, inspect, and handle errors in different ways. Let’s explore some of these operations.
## Map Operations
[](#map-operations)
### mapError
[](#maperror)
The `Effect.mapError` function is used when you need to transform or modify an error produced by an effect, without affecting the success value. This can be helpful when you want to add extra information to the error or change its type.
**Example** (Mapping an Error)
Here, the error type changes from `string` to `Error`.
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3//      ┌─── Effect<number, string, never>4//      ▼5const const simulatedTask: Effect.Effect<number, string, never>simulatedTask = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(1))6
7//      ┌─── Effect<number, Error, never>8//      ▼9const const mapped: Effect.Effect<number, Error, never>mapped = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const mapError: <number, string, never, Error>(self: Effect.Effect<number, string, never>, f: (e: string) => Error) => Effect.Effect<number, Error, never> (+1 overload)Transforms or modifies the error produced by an effect without affecting its
success value.
When to Use
This function is helpful when you want to enhance the error with additional
information, change the error type, or apply custom error handling while
keeping the original behavior of the effect's success values intact. It only
operates on the error channel and leaves the success channel unchanged.
Example
import { Effect } from "effect"
//      ┌─── Effect<number, string, never>//      ▼const simulatedTask = Effect.fail("Oh no!").pipe(Effect.as(1))
//      ┌─── Effect<number, Error, never>//      ▼const mapped = Effect.mapError(  simulatedTask,  (message) => new Error(message))@see ― map for a version that operates on the success channel.@see ― mapBoth for a version that operates on both channels.@see ― orElseFail if you want to replace the error with a new one.@since ― 2.0.0mapError(10  const simulatedTask: Effect.Effect<number, string, never>simulatedTask,11  (message: stringmessage) => new var Error: ErrorConstructornew (message?: string) => ErrorError(message: stringmessage)12)
```
Note
It’s important to note that using the `Effect.mapError` function does not change the overall success or failure of the effect. It only transforms the values in the error channel while preserving the effect’s original success or failure status.
### mapBoth
[](#mapboth)
The `Effect.mapBoth` function allows you to apply transformations to both channels: the error channel and the success channel of an effect. It takes two map functions as arguments: one for the error channel and the other for the success channel.
**Example** (Mapping Both Success and Error)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3//      ┌─── Effect<number, string, never>4//      ▼5const const simulatedTask: Effect.Effect<number, string, never>simulatedTask = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(1))6
7//      ┌─── Effect<boolean, Error, never>8//      ▼9const const modified: Effect.Effect<boolean, Error, never>modified = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const mapBoth: <number, string, never, Error, boolean>(self: Effect.Effect<number, string, never>, options: {    readonly onFailure: (e: string) => Error;    readonly onSuccess: (a: number) => boolean;}) => Effect.Effect<boolean, Error, never> (+1 overload)Applies transformations to both the success and error channels of an effect.
Details
This function takes two map functions as arguments: one for the error channel
and one for the success channel. You can use it when you want to modify both
the error and the success values without altering the overall success or
failure status of the effect.
Example
import { Effect } from "effect"
//      ┌─── Effect<number, string, never>//      ▼const simulatedTask = Effect.fail("Oh no!").pipe(Effect.as(1))
//      ┌─── Effect<boolean, Error, never>//      ▼const modified = Effect.mapBoth(simulatedTask, {  onFailure: (message) => new Error(message),  onSuccess: (n) => n > 0})@see ― map for a version that operates on the success channel.@see ― mapError for a version that operates on the error channel.@since ― 2.0.0mapBoth(const simulatedTask: Effect.Effect<number, string, never>simulatedTask, {10  onFailure: (e: string) => ErroronFailure: (message: stringmessage) => new var Error: ErrorConstructornew (message?: string) => ErrorError(message: stringmessage),11  onSuccess: (a: number) => booleanonSuccess: (n: numbern) => n: numbern > 012})
```
Note
It’s important to note that using the `Effect.mapBoth` function does not change the overall success or failure of the effect. It only transforms the values in the error and success channels while preserving the effect’s original success or failure status.
## Filtering the Success Channel
[](#filtering-the-success-channel)
The Effect library provides several operators to filter values on the success channel based on a given predicate.
These operators offer different strategies for handling cases where the predicate fails:
API
Description
`filterOrFail`
This operator filters the values on the success channel based on a predicate. If the predicate fails for any value, the original effect fails with an error.
`filterOrDie` / `filterOrDieMessage`
These operators also filter the values on the success channel based on a predicate. If the predicate fails for any value, the original effect terminates abruptly. The `filterOrDieMessage` variant allows you to provide a custom error message.
`filterOrElse`
This operator filters the values on the success channel based on a predicate. If the predicate fails for any value, an alternative effect is executed instead.
**Example** (Filtering Success Values)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import RandomRandom, import CauseCause } from "effect"2
3// Fail with a custom error if predicate is false4const const task1: Effect.Effect<number, string, never>task1 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const filterOrFail: <number, never, never, string>(self: Effect.Effect<number, never, never>, predicate: Predicate<number>, orFailWith: (a: number) => string) => Effect.Effect<number, string, never> (+7 overloads)Filters an effect, failing with a custom error if the predicate fails.
Details
This function applies a predicate to the result of an effect. If the
predicate evaluates to false, the effect fails with a custom error
generated by the orFailWith function.
When to Use
This is useful for enforcing constraints and treating violations as
recoverable errors.
Providing a Guard
In addition to the filtering capabilities discussed earlier, you have the
option to further refine and narrow down the type of the success channel by
providing a user-defined type
guard.
Let's explore this concept through an example:
Example
import { Effect, pipe } from "effect"
// Define a user interfaceinterface User {  readonly name: string}
// Simulate an asynchronous authentication functiondeclare const auth: () => Promise<User | null>
const program = pipe(  Effect.promise(() => auth()),  // Use filterOrFail with a custom type guard to ensure user is not null  Effect.filterOrFail(    (user): user is User => user !== null, // Type guard    () => new Error("Unauthorized")  ),  // 'user' now has the type `User` (not `User | null`)  Effect.andThen((user) => user.name))@since ― 2.0.0filterOrFail(5  import RandomRandom.const nextRange: (min: number, max: number) => Effect.Effect<number>Returns the next numeric value in the specified range from the
pseudo-random number generator.@since ― 2.0.0nextRange(-1, 1),6  (n: numbern) => n: numbern >= 0,7  () => "random number is negative"8)9
10// Die with a custom exception if predicate is false11const const task2: Effect.Effect<number, never, never>task2 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const filterOrDie: <number, never, never>(self: Effect.Effect<number, never, never>, predicate: Predicate<number>, orDieWith: (a: number) => unknown) => Effect.Effect<number, never, never> (+3 overloads)Filters an effect, dying with a custom defect if the predicate fails.
Details
This function applies a predicate to the result of an effect. If the
predicate evaluates to false, the effect dies with a custom defect
generated by the orDieWith function.
When to Use
This is useful for enforcing constraints on values and treating violations as
fatal program errors.@since ― 2.0.0filterOrDie(12  import RandomRandom.const nextRange: (min: number, max: number) => Effect.Effect<number>Returns the next numeric value in the specified range from the
pseudo-random number generator.@since ― 2.0.0nextRange(-1, 1),13  (n: numbern) => n: numbern >= 0,14  () => new import CauseCause.const IllegalArgumentException: new (message?: string | undefined) => Cause.IllegalArgumentExceptionCreates an error indicating an invalid method argument.
Details
This function constructs an IllegalArgumentException. It is typically
thrown or returned when an operation receives improper inputs, such as
out-of-range values or invalid object states.@since ― 2.0.0IllegalArgumentException("random number is negative")15)16
17// Die with a custom error message if predicate is false18const const task3: Effect.Effect<number, never, never>task3 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const filterOrDieMessage: <number, never, never>(self: Effect.Effect<number, never, never>, predicate: Predicate<number>, message: string) => Effect.Effect<number, never, never> (+3 overloads)Filters an effect, dying with a custom message if the predicate fails.
Details
This function works like
filterOrDie
but allows you to specify a
custom error message to describe the reason for the failure. The message is
included in the defect when the predicate evaluates to false.@since ― 2.0.0filterOrDieMessage(19  import RandomRandom.const nextRange: (min: number, max: number) => Effect.Effect<number>Returns the next numeric value in the specified range from the
pseudo-random number generator.@since ― 2.0.0nextRange(-1, 1),20  (n: numbern) => n: numbern >= 0,21  "random number is negative"22)23
24// Run an alternative effect if predicate is false25const const task4: Effect.Effect<number, never, never>task4 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const filterOrElse: <number, never, never, number, never, never>(self: Effect.Effect<number, never, never>, predicate: Predicate<number>, orElse: (a: number) => Effect.Effect<number, never, never>) => Effect.Effect<number, never, never> (+3 overloads)Filters an effect, providing an alternative effect if the predicate fails.
Details
This function applies a predicate to the result of an effect. If the
predicate evaluates to false, it executes the orElse effect instead. The
orElse effect can produce an alternative value or perform additional
computations.@since ― 2.0.0filterOrElse(26  import RandomRandom.const nextRange: (min: number, max: number) => Effect.Effect<number>Returns the next numeric value in the specified range from the
pseudo-random number generator.@since ― 2.0.0nextRange(-1, 1),27  (n: numbern) => n: numbern >= 0,28  () => const task3: Effect.Effect<number, never, never>task329)
```
It’s important to note that depending on the specific filtering operator used, the effect can either fail, terminate abruptly, or execute an alternative effect when the predicate fails. Choose the appropriate operator based on your desired error handling strategy and program logic.
The filtering APIs can also be combined with [user-defined type guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) to improve type safety and code clarity. This ensures that only valid types pass through.
**Example** (Using a Type Guard)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, function pipe<A>(a: A): A (+19 overloads)Pipes the value of an expression into a pipeline of functions.
Details
The pipe function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.
import { pipe } from "effect"
const result = pipe(input, func1, func2, ..., funcN)
In this syntax, input is the initial value, and func1, func2, ...,
funcN are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.
Here's an illustration of how pipe works:
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
It's important to note that functions passed to pipe must have a single
argument because they are only called with a single argument.
When to Use
This is useful in combination with data-last functions as a simulation of
methods:
as.map(f).filter(g)
becomes:
import { pipe, Array } from "effect"
pipe(as, Array.map(f), Array.filter(g))
Example (Chaining Arithmetic Operations)
import { pipe } from "effect"
// Define simple arithmetic operationsconst increment = (x: number) => x + 1const double = (x: number) => x * 2const subtractTen = (x: number) => x - 10
// Sequentially apply these operations using `pipe`const result = pipe(5, increment, double, subtractTen)
console.log(result)// Output: 2@since ― 2.0.0pipe } from "effect"2
3// Define a user interface4interface interface UserUser {5  readonly User.name: stringname: string6}7
8// Simulate an asynchronous authentication function9declare const const auth: () => Promise<User | null>auth: () => interface Promise<T>Represents the completion of an asynchronous operationPromise<interface UserUser | null>10
11const const program: Effect.Effect<string, Error, never>program = pipe<Effect.Effect<User | null, never, never>, Effect.Effect<User, Error, never>, Effect.Effect<string, Error, never>>(a: Effect.Effect<User | null, never, never>, ab: (a: Effect.Effect<User | null, never, never>) => Effect.Effect<User, Error, never>, bc: (b: Effect.Effect<User, Error, never>) => Effect.Effect<string, Error, never>): Effect.Effect<string, Error, never> (+19 overloads)Pipes the value of an expression into a pipeline of functions.
Details
The pipe function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.
import { pipe } from "effect"
const result = pipe(input, func1, func2, ..., funcN)
In this syntax, input is the initial value, and func1, func2, ...,
funcN are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.
Here's an illustration of how pipe works:
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
It's important to note that functions passed to pipe must have a single
argument because they are only called with a single argument.
When to Use
This is useful in combination with data-last functions as a simulation of
methods:
as.map(f).filter(g)
becomes:
import { pipe, Array } from "effect"
pipe(as, Array.map(f), Array.filter(g))
Example (Chaining Arithmetic Operations)
import { pipe } from "effect"
// Define simple arithmetic operationsconst increment = (x: number) => x + 1const double = (x: number) => x * 2const subtractTen = (x: number) => x - 10
// Sequentially apply these operations using `pipe`const result = pipe(5, increment, double, subtractTen)
console.log(result)// Output: 2@since ― 2.0.0pipe(12  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const promise: <User | null>(evaluate: (signal: AbortSignal) => PromiseLike<User | null>) => Effect.Effect<User | null, never, never>Creates an Effect that represents an asynchronous computation guaranteed to
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
//      ┌─── Effect<string, never, never>//      ▼const program = delay("Async operation completed successfully!")@see ― tryPromise for a version that can handle failures.@since ― 2.0.0promise(() => const auth: () => Promise<User | null>auth()),13  // Use filterOrFail with a custom type guard to ensure user is not null14  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const filterOrFail: <User | null, Error, User>(refinement: Refinement<User | null, User>, orFailWith: (a: null) => Error) => <E, R>(self: Effect.Effect<User | null, E, R>) => Effect.Effect<User, Error | E, R> (+7 overloads)Filters an effect, failing with a custom error if the predicate fails.
Details
This function applies a predicate to the result of an effect. If the
predicate evaluates to false, the effect fails with a custom error
generated by the orFailWith function.
When to Use
This is useful for enforcing constraints and treating violations as
recoverable errors.
Providing a Guard
In addition to the filtering capabilities discussed earlier, you have the
option to further refine and narrow down the type of the success channel by
providing a user-defined type
guard.
Let's explore this concept through an example:
Example
import { Effect, pipe } from "effect"
// Define a user interfaceinterface User {  readonly name: string}
// Simulate an asynchronous authentication functiondeclare const auth: () => Promise<User | null>
const program = pipe(  Effect.promise(() => auth()),  // Use filterOrFail with a custom type guard to ensure user is not null  Effect.filterOrFail(    (user): user is User => user !== null, // Type guard    () => new Error("Unauthorized")  ),  // 'user' now has the type `User` (not `User | null`)  Effect.andThen((user) => user.name))@since ― 2.0.0filterOrFail(15    (user: User | nulluser): user: User | nulluser is interface UserUser => user: User | nulluser !== null, // Type guard16    () => new var Error: ErrorConstructornew (message?: string) => ErrorError("Unauthorized")17  ),18  // 'user' now has the type `User` (not `User | null`)19  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const andThen: <User, string>(f: (a: User) => string) => <E, R>(self: Effect.Effect<User, E, R>) => Effect.Effect<string, E, R> (+3 overloads)Chains two actions, where the second action can depend on the result of the
first.
Syntax
const transformedEffect = pipe(myEffect, Effect.andThen(anotherEffect))// orconst transformedEffect = Effect.andThen(myEffect, anotherEffect)// orconst transformedEffect = myEffect.pipe(Effect.andThen(anotherEffect))
When to Use
Use andThen when you need to run multiple actions in sequence, with the
second action depending on the result of the first. This is useful for
combining effects or handling computations that must happen in order.
Details
The second action can be:
A constant value (similar to
as
)
A function returning a value (similar to
map
)
A Promise
A function returning a Promise
An Effect
A function returning an Effect (similar to
flatMap
)
Note: andThen works well with both Option and Either types,
treating them as effects.
Example (Applying a Discount Based on Fetched Amount)
import { pipe, Effect } from "effect"
// Function to apply a discount safely to a transaction amountconst applyDiscount = (  total: number,  discountRate: number): Effect.Effect<number, Error> =>  discountRate === 0    ? Effect.fail(new Error("Discount rate cannot be zero"))    : Effect.succeed(total - (total * discountRate) / 100)
// Simulated asynchronous task to fetch a transaction amount from databaseconst fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
// Using Effect.map and Effect.flatMapconst result1 = pipe(  fetchTransactionAmount,  Effect.map((amount) => amount * 2),  Effect.flatMap((amount) => applyDiscount(amount, 5)))
Effect.runPromise(result1).then(console.log)// Output: 190
// Using Effect.andThenconst result2 = pipe(  fetchTransactionAmount,  Effect.andThen((amount) => amount * 2),  Effect.andThen((amount) => applyDiscount(amount, 5)))
Effect.runPromise(result2).then(console.log)// Output: 190@since ― 2.0.0andThen((user: Useruser) => user: Useruser.User.name: stringname)20)
```
In the example above, a guard is used within the `filterOrFail` API to ensure that the `user` is of type `User` rather than `User | null`.
If you prefer, you can utilize a pre-made guard like [Predicate.isNotNull](https://effect-ts.github.io/effect/effect/Predicate.ts.html#isnotnull) for simplicity and consistency.
## Inspecting Errors
[](#inspecting-errors)
Similar to [tapping](/docs/getting-started/building-pipelines/#tap) for success values, Effect provides several operators for inspecting error values. These operators allow developers to observe failures or underlying issues without modifying the outcome.
### tapError
[](#taperror)
Executes an effectful operation to inspect the failure of an effect without altering it.
**Example** (Inspecting Errors)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3// Simulate a task that fails with an error4const const task: Effect.Effect<number, string, never>task: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, string> = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("NetworkError")5
6// Use tapError to log the error message when the task fails7const const tapping: Effect.Effect<number, string, never>tapping = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tapError: <number, string, never, void, never, never>(self: Effect.Effect<number, string, never>, f: (e: string) => Effect.Effect<void, never, never>) => Effect.Effect<number, string, never> (+1 overload)Execute a side effect on failure without modifying the original effect.
Details
This function allows you to inspect and react to the failure of an effect by
executing an additional effect. The failure value is passed to the provided
function, enabling you to log it, track it, or perform any other operation.
Importantly, the original failure remains intact and is re-propagated, so the
effect's behavior is unchanged.
The side effect you provide is only executed when the effect fails. If the
effect succeeds, the function is ignored, and the success value is propagated
as usual.
Example
import { Effect, Console } from "effect"
// Simulate a task that fails with an errorconst task: Effect.Effect<number, string> = Effect.fail("NetworkError")
// Use tapError to log the error message when the task failsconst tapping = Effect.tapError(task, (error) =>  Console.log(`expected error: ${error}`))
Effect.runFork(tapping)// Output:// expected error: NetworkError@since ― 2.0.0tapError(const task: Effect.Effect<number, string, never>task, (error: stringerror) =>8  import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`expected error: ${error: stringerror}`)9)10
11import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runFork: <number, string>(effect: Effect.Effect<number, string, never>, options?: RunForkOptions) => RuntimeFiber<number, string>Runs an effect in the background, returning a fiber that can be observed or
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
setTimeout(() => {  Effect.runFork(Fiber.interrupt(fiber))}, 500)@since ― 2.0.0runFork(const tapping: Effect.Effect<number, string, never>tapping)12/*13Output:14expected error: NetworkError15*/
```
### tapErrorTag
[](#taperrortag)
This function allows you to inspect errors that match a specific tag, helping you handle different error types more precisely.
**Example** (Inspecting Tagged Errors)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole, import DataData } from "effect"2
3class class NetworkErrorNetworkError extends import DataData.const TaggedError: <"NetworkError">(tag: "NetworkError") => new <A>(args: Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => YieldableError & {    readonly _tag: "NetworkError";} & Readonly<A>@since ― 2.0.0TaggedError("NetworkError")<{4  readonly statusCode: numberstatusCode: number5}> {}6
7class class ValidationErrorValidationError extends import DataData.const TaggedError: <"ValidationError">(tag: "ValidationError") => new <A>(args: Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => YieldableError & {    readonly _tag: "ValidationError";} & Readonly<A>@since ― 2.0.0TaggedError("ValidationError")<{8  readonly field: stringfield: string9}> {}10
11// Create a task that fails with a NetworkError12const const task: Effect.Effect<number, NetworkError | ValidationError, never>task: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, class NetworkErrorNetworkError | class ValidationErrorValidationError> =13  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <NetworkError>(error: NetworkError) => Effect.Effect<never, NetworkError, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(new constructor NetworkError<{    readonly statusCode: number;}>(args: {    readonly statusCode: number;}): NetworkErrorNetworkError({ statusCode: numberstatusCode: 504 }))14
15// Use tapErrorTag to inspect only NetworkError types16// and log the status code17const const tapping: Effect.Effect<number, NetworkError | ValidationError, never>tapping = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tapErrorTag: <number, NetworkError | ValidationError, never, "NetworkError", void, never, never>(self: Effect.Effect<number, NetworkError | ValidationError, never>, k: "NetworkError", f: (e: NetworkError) => Effect.Effect<void, never, never>) => Effect.Effect<number, NetworkError | ValidationError, never> (+1 overload)Inspect errors matching a specific tag without altering the original effect.
Details
This function allows you to inspect and handle specific error types based on
their _tag property. It is particularly useful in applications where errors
are modeled with tagged types (e.g., union types with discriminating tags).
By targeting errors with a specific _tag, you can log or perform actions on
them while leaving the error channel and overall effect unchanged.
If the error doesn't match the specified tag, this function does nothing, and
the effect proceeds as usual.
Example
import { Effect, Console } from "effect"
class NetworkError {  readonly _tag = "NetworkError"  constructor(readonly statusCode: number) {}}
class ValidationError {  readonly _tag = "ValidationError"  constructor(readonly field: string) {}}
// Create a task that fails with a NetworkErrorconst task: Effect.Effect<number, NetworkError | ValidationError> =  Effect.fail(new NetworkError(504))
// Use tapErrorTag to inspect only NetworkError types and log the status codeconst tapping = Effect.tapErrorTag(task, "NetworkError", (error) =>  Console.log(`expected error: ${error.statusCode}`))
Effect.runFork(tapping)// Output:// expected error: 504@since ― 2.0.0tapErrorTag(const task: Effect.Effect<number, NetworkError | ValidationError, never>task, "NetworkError", (error: NetworkErrorerror) =>18  import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`expected error: ${error: NetworkErrorerror.statusCode: numberstatusCode}`)19)20
21import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runFork: <number, NetworkError | ValidationError>(effect: Effect.Effect<number, NetworkError | ValidationError, never>, options?: RunForkOptions) => RuntimeFiber<number, NetworkError | ValidationError>Runs an effect in the background, returning a fiber that can be observed or
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
setTimeout(() => {  Effect.runFork(Fiber.interrupt(fiber))}, 500)@since ― 2.0.0runFork(const tapping: Effect.Effect<number, NetworkError | ValidationError, never>tapping)22/*23Output:24expected error: 50425*/
```
### tapErrorCause
[](#taperrorcause)
This function inspects the complete cause of an error, including failures and defects.
**Example** (Inspecting Error Causes)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3// Create a task that fails with a NetworkError4const const task1: Effect.Effect<number, string, never>task1: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, string> = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("NetworkError")5
6const const tapping1: Effect.Effect<number, string, never>tapping1 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tapErrorCause: <number, string, never, void, never, never>(self: Effect.Effect<number, string, never>, f: (cause: Cause<string>) => Effect.Effect<void, never, never>) => Effect.Effect<number, string, never> (+1 overload)Inspect the complete cause of an error, including failures and defects.
Details
This function provides access to the full cause of an error, including both
recoverable failures and irrecoverable defects. It allows you to handle, log,
or monitor specific error causes without modifying the result of the effect.
The full Cause object encapsulates the error and its contextual
information, making it useful for debugging and understanding failure
scenarios in complex workflows.
The effect itself is not modified, and any errors or defects remain in the
error channel of the original effect.
Example
import { Effect, Console } from "effect"
// Create a task that fails with a NetworkErrorconst task1: Effect.Effect<number, string> = Effect.fail("NetworkError")
const tapping1 = Effect.tapErrorCause(task1, (cause) =>  Console.log(`error cause: ${cause}`))
Effect.runFork(tapping1)// Output:// error cause: Error: NetworkError
// Simulate a severe failure in the systemconst task2: Effect.Effect<number, string> = Effect.dieMessage(  "Something went wrong")
const tapping2 = Effect.tapErrorCause(task2, (cause) =>  Console.log(`error cause: ${cause}`))
Effect.runFork(tapping2)// Output:// error cause: RuntimeException: Something went wrong//   ... stack trace ...@since ― 2.0.0tapErrorCause(const task1: Effect.Effect<number, string, never>task1, (cause: Cause<string>cause) =>7  import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`error cause: ${cause: Cause<string>cause}`)8)9
10import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runFork: <number, string>(effect: Effect.Effect<number, string, never>, options?: RunForkOptions) => RuntimeFiber<number, string>Runs an effect in the background, returning a fiber that can be observed or
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
setTimeout(() => {  Effect.runFork(Fiber.interrupt(fiber))}, 500)@since ― 2.0.0runFork(const tapping1: Effect.Effect<number, string, never>tapping1)11/*12Output:13error cause: Error: NetworkError14*/15
16// Simulate a severe failure in the system17const const task2: Effect.Effect<number, string, never>task2: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, string> = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const dieMessage: (message: string) => Effect.Effect<never>Creates an effect that terminates a fiber with a RuntimeException
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
lazily.@since ― 2.0.0dieMessage(18  "Something went wrong"19)20
21const const tapping2: Effect.Effect<number, string, never>tapping2 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tapErrorCause: <number, string, never, void, never, never>(self: Effect.Effect<number, string, never>, f: (cause: Cause<string>) => Effect.Effect<void, never, never>) => Effect.Effect<number, string, never> (+1 overload)Inspect the complete cause of an error, including failures and defects.
Details
This function provides access to the full cause of an error, including both
recoverable failures and irrecoverable defects. It allows you to handle, log,
or monitor specific error causes without modifying the result of the effect.
The full Cause object encapsulates the error and its contextual
information, making it useful for debugging and understanding failure
scenarios in complex workflows.
The effect itself is not modified, and any errors or defects remain in the
error channel of the original effect.
Example
import { Effect, Console } from "effect"
// Create a task that fails with a NetworkErrorconst task1: Effect.Effect<number, string> = Effect.fail("NetworkError")
const tapping1 = Effect.tapErrorCause(task1, (cause) =>  Console.log(`error cause: ${cause}`))
Effect.runFork(tapping1)// Output:// error cause: Error: NetworkError
// Simulate a severe failure in the systemconst task2: Effect.Effect<number, string> = Effect.dieMessage(  "Something went wrong")
const tapping2 = Effect.tapErrorCause(task2, (cause) =>  Console.log(`error cause: ${cause}`))
Effect.runFork(tapping2)// Output:// error cause: RuntimeException: Something went wrong//   ... stack trace ...@since ― 2.0.0tapErrorCause(const task2: Effect.Effect<number, string, never>task2, (cause: Cause<string>cause) =>22  import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`error cause: ${cause: Cause<string>cause}`)23)24
25import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runFork: <number, string>(effect: Effect.Effect<number, string, never>, options?: RunForkOptions) => RuntimeFiber<number, string>Runs an effect in the background, returning a fiber that can be observed or
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
setTimeout(() => {  Effect.runFork(Fiber.interrupt(fiber))}, 500)@since ― 2.0.0runFork(const tapping2: Effect.Effect<number, string, never>tapping2)26/*27Output:28error cause: RuntimeException: Something went wrong29  ... stack trace ...30*/
```
### tapDefect
[](#tapdefect)
Specifically inspects non-recoverable failures or defects in an effect (i.e., one or more [Die](/docs/data-types/cause/#die) causes).
**Example** (Inspecting Defects)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3// Simulate a task that fails with a recoverable error4const const task1: Effect.Effect<number, string, never>task1: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, string> = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail("NetworkError")5
6// tapDefect won't log anything because NetworkError is not a defect7const const tapping1: Effect.Effect<number, string, never>tapping1 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tapDefect: <number, string, never, void, never, never>(self: Effect.Effect<number, string, never>, f: (cause: Cause<never>) => Effect.Effect<void, never, never>) => Effect.Effect<number, string, never> (+1 overload)Inspect severe errors or defects (non-recoverable failures) in an effect.
Details
This function is specifically designed to handle and inspect defects, which
are critical failures in your program, such as unexpected runtime exceptions
or system-level errors. Unlike normal recoverable errors, defects typically
indicate serious issues that cannot be addressed through standard error
handling.
When a defect occurs in an effect, the function you provide to this function
will be executed, allowing you to log, monitor, or handle the defect in some
way. Importantly, this does not alter the main result of the effect. If no
defect occurs, the effect behaves as if this function was not used.
Example
import { Effect, Console } from "effect"
// Simulate a task that fails with a recoverable errorconst task1: Effect.Effect<number, string> = Effect.fail("NetworkError")
// tapDefect won't log anything because NetworkError is not a defectconst tapping1 = Effect.tapDefect(task1, (cause) =>  Console.log(`defect: ${cause}`))
Effect.runFork(tapping1)// No Output
// Simulate a severe failure in the systemconst task2: Effect.Effect<number, string> = Effect.dieMessage(  "Something went wrong")
// Log the defect using tapDefectconst tapping2 = Effect.tapDefect(task2, (cause) =>  Console.log(`defect: ${cause}`))
Effect.runFork(tapping2)// Output:// defect: RuntimeException: Something went wrong//   ... stack trace ...@since ― 2.0.0tapDefect(const task1: Effect.Effect<number, string, never>task1, (cause: Cause<never>cause) =>8  import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`defect: ${cause: Cause<never>cause}`)9)10
11import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runFork: <number, string>(effect: Effect.Effect<number, string, never>, options?: RunForkOptions) => RuntimeFiber<number, string>Runs an effect in the background, returning a fiber that can be observed or
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
setTimeout(() => {  Effect.runFork(Fiber.interrupt(fiber))}, 500)@since ― 2.0.0runFork(const tapping1: Effect.Effect<number, string, never>tapping1)12/*13No Output14*/15
16// Simulate a severe failure in the system17const const task2: Effect.Effect<number, string, never>task2: import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, string> = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const dieMessage: (message: string) => Effect.Effect<never>Creates an effect that terminates a fiber with a RuntimeException
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
lazily.@since ― 2.0.0dieMessage(18  "Something went wrong"19)20
21// Log the defect using tapDefect22const const tapping2: Effect.Effect<number, string, never>tapping2 = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tapDefect: <number, string, never, void, never, never>(self: Effect.Effect<number, string, never>, f: (cause: Cause<never>) => Effect.Effect<void, never, never>) => Effect.Effect<number, string, never> (+1 overload)Inspect severe errors or defects (non-recoverable failures) in an effect.
Details
This function is specifically designed to handle and inspect defects, which
are critical failures in your program, such as unexpected runtime exceptions
or system-level errors. Unlike normal recoverable errors, defects typically
indicate serious issues that cannot be addressed through standard error
handling.
When a defect occurs in an effect, the function you provide to this function
will be executed, allowing you to log, monitor, or handle the defect in some
way. Importantly, this does not alter the main result of the effect. If no
defect occurs, the effect behaves as if this function was not used.
Example
import { Effect, Console } from "effect"
// Simulate a task that fails with a recoverable errorconst task1: Effect.Effect<number, string> = Effect.fail("NetworkError")
// tapDefect won't log anything because NetworkError is not a defectconst tapping1 = Effect.tapDefect(task1, (cause) =>  Console.log(`defect: ${cause}`))
Effect.runFork(tapping1)// No Output
// Simulate a severe failure in the systemconst task2: Effect.Effect<number, string> = Effect.dieMessage(  "Something went wrong")
// Log the defect using tapDefectconst tapping2 = Effect.tapDefect(task2, (cause) =>  Console.log(`defect: ${cause}`))
Effect.runFork(tapping2)// Output:// defect: RuntimeException: Something went wrong//   ... stack trace ...@since ― 2.0.0tapDefect(const task2: Effect.Effect<number, string, never>task2, (cause: Cause<never>cause) =>23  import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`defect: ${cause: Cause<never>cause}`)24)25
26import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runFork: <number, string>(effect: Effect.Effect<number, string, never>, options?: RunForkOptions) => RuntimeFiber<number, string>Runs an effect in the background, returning a fiber that can be observed or
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
setTimeout(() => {  Effect.runFork(Fiber.interrupt(fiber))}, 500)@since ― 2.0.0runFork(const tapping2: Effect.Effect<number, string, never>tapping2)27/*28Output:29defect: RuntimeException: Something went wrong30  ... stack trace ...31*/
```
### tapBoth
[](#tapboth)
Inspects both success and failure outcomes of an effect, performing different actions based on the result.
**Example** (Inspecting Both Success and Failure)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import RandomRandom, import ConsoleConsole } from "effect"2
3// Simulate a task that might fail4const const task: Effect.Effect<number, string, never>task = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const filterOrFail: <number, never, never, string>(self: Effect.Effect<number, never, never>, predicate: Predicate<number>, orFailWith: (a: number) => string) => Effect.Effect<number, string, never> (+7 overloads)Filters an effect, failing with a custom error if the predicate fails.
Details
This function applies a predicate to the result of an effect. If the
predicate evaluates to false, the effect fails with a custom error
generated by the orFailWith function.
When to Use
This is useful for enforcing constraints and treating violations as
recoverable errors.
Providing a Guard
In addition to the filtering capabilities discussed earlier, you have the
option to further refine and narrow down the type of the success channel by
providing a user-defined type
guard.
Let's explore this concept through an example:
Example
import { Effect, pipe } from "effect"
// Define a user interfaceinterface User {  readonly name: string}
// Simulate an asynchronous authentication functiondeclare const auth: () => Promise<User | null>
const program = pipe(  Effect.promise(() => auth()),  // Use filterOrFail with a custom type guard to ensure user is not null  Effect.filterOrFail(    (user): user is User => user !== null, // Type guard    () => new Error("Unauthorized")  ),  // 'user' now has the type `User` (not `User | null`)  Effect.andThen((user) => user.name))@since ― 2.0.0filterOrFail(5  import RandomRandom.const nextRange: (min: number, max: number) => Effect.Effect<number>Returns the next numeric value in the specified range from the
pseudo-random number generator.@since ― 2.0.0nextRange(-1, 1),6  (n: numbern) => n: numbern >= 0,7  () => "random number is negative"8)9
10// Use tapBoth to log both success and failure outcomes11const const tapping: Effect.Effect<number, string, never>tapping = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tapBoth: <number, string, never, void, never, never, void, never, never>(self: Effect.Effect<number, string, never>, options: {    readonly onFailure: (e: string) => Effect.Effect<void, never, never>;    readonly onSuccess: (a: number) => Effect.Effect<void, never, never>;}) => Effect.Effect<number, string, never> (+1 overload)Allows you to inspect both success and failure outcomes of an effect and
perform side effects for each.
Details
This function enables you to handle both success and failure cases
separately, without modifying the main effect's result. It is particularly
useful for scenarios where you need to log, monitor, or perform additional
actions depending on whether the effect succeeded or failed.
When the effect succeeds, the onSuccess handler is executed with the
success value. When the effect fails, the onFailure handler is executed
with the failure value. Both handlers can include side effects such as
logging or analytics, and neither modifies the original effect's output.
If either the success or failure handler fails, the overall effect will also
fail.
Example
import { Effect, Random, Console } from "effect"
// Simulate a task that might failconst task = Effect.filterOrFail(  Random.nextRange(-1, 1),  (n) => n >= 0,  () => "random number is negative")
// Use tapBoth to log both success and failure outcomesconst tapping = Effect.tapBoth(task, {  onFailure: (error) => Console.log(`failure: ${error}`),  onSuccess: (randomNumber) =>    Console.log(`random number: ${randomNumber}`)})
Effect.runFork(tapping)// Example Output:// failure: random number is negative@since ― 2.0.0tapBoth(const task: Effect.Effect<number, string, never>task, {12  onFailure: (e: string) => Effect.Effect<void, never, never>onFailure: (error: stringerror) => import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`failure: ${error: stringerror}`),13  onSuccess: (a: number) => Effect.Effect<void, never, never>onSuccess: (randomNumber: numberrandomNumber) =>14    import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`random number: ${randomNumber: numberrandomNumber}`)15})16
17import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runFork: <number, string>(effect: Effect.Effect<number, string, never>, options?: RunForkOptions) => RuntimeFiber<number, string>Runs an effect in the background, returning a fiber that can be observed or
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
setTimeout(() => {  Effect.runFork(Fiber.interrupt(fiber))}, 500)@since ― 2.0.0runFork(const tapping: Effect.Effect<number, string, never>tapping)18/*19Example Output:20failure: random number is negative21*/
```
## Exposing Errors in The Success Channel
[](#exposing-errors-in-the-success-channel)
The `Effect.either` function transforms an `Effect<A, E, R>` into an effect that encapsulates both potential failure and success within an [Either](/docs/data-types/either/) data type:
```
Effect<A, E, R> -> Effect<Either<A, E>, never, R>
```
This means if you have an effect with the following type:
```
Effect<string, HttpError, never>
```
and you call `Effect.either` on it, the type becomes:
```
Effect<Either<string, HttpError>, never, never>
```
The resulting effect cannot fail because the potential failure is now represented within the `Either`’s `Left` type. The error type of the returned `Effect` is specified as `never`, confirming that the effect is structured to not fail.
This function becomes especially useful when recovering from effects that may fail when using [Effect.gen](/docs/getting-started/using-generators/#understanding-effectgen):
**Example** (Using `Effect.either` to Handle Errors)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import Either@since ― 2.0.0@since ― 2.0.0Either, import ConsoleConsole } from "effect"2
3// Simulate a task that fails4//5//      ┌─── Either<number, string, never>6//      ▼7const const program: Effect.Effect<number, string, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(2))8
9//      ┌─── Either<number, never, never>10//      ▼11const const recovered: Effect.Effect<number, never, never>recovered = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<void, never, never>>, number>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>>, number, never>) => Effect.Effect<number, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {12  //      ┌─── Either<number, string>13  //      ▼14  const const failureOrSuccess: Either.Either<number, string>failureOrSuccess = yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const either: <number, string, never>(self: Effect.Effect<number, string, never>) => Effect.Effect<Either.Either<number, string>, never, never>Encapsulates both success and failure of an Effect into an Either type.
Details
This function converts an effect that may fail into an effect that always
succeeds, wrapping the outcome in an Either type. The result will be
Either.Left if the effect fails, containing the recoverable error, or
Either.Right if it succeeds, containing the result.
Using this function, you can handle recoverable errors explicitly without
causing the effect to fail. This is particularly useful in scenarios where
you want to chain effects and manage both success and failure in the same
logical flow.
It's important to note that unrecoverable errors, often referred to as
"defects," are still thrown and not captured within the Either type. Only
failures that are explicitly represented as recoverable errors in the effect
are encapsulated.
The resulting effect cannot fail directly because all recoverable failures
are represented inside the Either type.
Example
import { Effect, Either, Random } from "effect"
class HttpError {  readonly _tag = "HttpError"}
class ValidationError {  readonly _tag = "ValidationError"}
//      ┌─── Effect<string, HttpError | ValidationError, never>//      ▼const program = Effect.gen(function* () {  const n1 = yield* Random.next  const n2 = yield* Random.next  if (n1 < 0.5) {    yield* Effect.fail(new HttpError())  }  if (n2 < 0.5) {    yield* Effect.fail(new ValidationError())  }  return "some result"})
//      ┌─── Effect<string, never, never>//      ▼const recovered = Effect.gen(function* () {  //      ┌─── Either<string, HttpError | ValidationError>  //      ▼  const failureOrSuccess = yield* Effect.either(program)  return Either.match(failureOrSuccess, {    onLeft: (error) => `Recovering from ${error._tag}`,    onRight: (value) => value // Do nothing in case of success  })})@see ― option for a version that uses Option instead.@see ― exit for a version that encapsulates both recoverable errors and defects in an Exit.@since ― 2.0.0either(const program: Effect.Effect<number, string, never>program)15  if (import Either@since ― 2.0.0@since ― 2.0.0Either.const isLeft: <number, string>(self: Either.Either<number, string>) => self is Either.Left<string, number>Determine if a Either is a Left.@example import * as assert from "node:assert"import { Either } from "effect"
assert.deepStrictEqual(Either.isLeft(Either.right(1)), false)assert.deepStrictEqual(Either.isLeft(Either.left("a")), true)@since ― 2.0.0isLeft(const failureOrSuccess: Either.Either<number, string>failureOrSuccess)) {16    const const error: stringerror = const failureOrSuccess: Either.Left<string, number>failureOrSuccess.Left<string, number>.left: stringleft17    yield* import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`failure: ${const error: stringerror}`)18    return 019  } else {20    const const value: numbervalue = const failureOrSuccess: Either.Right<string, number>failureOrSuccess.Right<string, number>.right: numberright21    yield* import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`success: ${const value: numbervalue}`)22    return const value: numbervalue23  }24})25
26import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number, never>(effect: Effect.Effect<number, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const recovered: Effect.Effect<number, never, never>recovered).Promise<number>.then<void, never>(onfulfilled?: ((value: number) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)27/*28Output:29failure: Oh uh!30031*/
```
## Exposing the Cause in The Success Channel
[](#exposing-the-cause-in-the-success-channel)
You can use the `Effect.cause` function to expose the cause of an effect, which is a more detailed representation of failures, including error messages and defects.
**Example** (Logging the Cause of Failure)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3//      ┌─── Effect<number, string, never>4//      ▼5const const program: Effect.Effect<number, string, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(2))6
7//      ┌─── Effect<void, never, never>8//      ▼9const const recovered: Effect.Effect<void, never, never>recovered = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const gen: <YieldWrap<Effect.Effect<void, never, never>>, void>(f: (resume: Effect.Adapter) => Generator<YieldWrap<Effect.Effect<void, never, never>>, void, never>) => Effect.Effect<void, never, never> (+1 overload)Provides a way to write effectful code using generator functions, simplifying
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
export const program = Effect.gen(function* () {  const transactionAmount = yield* fetchTransactionAmount  const discountRate = yield* fetchDiscountRate  const discountedAmount = yield* applyDiscount(    transactionAmount,    discountRate  )  const finalAmount = addServiceCharge(discountedAmount)  return `Final amount to charge: ${finalAmount}`})@since ― 2.0.0gen(function* () {10  const const cause: Cause<string>cause = yield* import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const cause: <number, string, never>(self: Effect.Effect<number, string, never>) => Effect.Effect<Cause<string>, never, never>Retrieves the cause of a failure in an effect.
Details
This function allows you to expose the detailed cause of an effect, which
includes a more precise representation of failures, such as error messages
and defects.
When to Use
This function is helpful when you need to inspect the cause of a failure in
an effect, giving you more information than just the error message. It can be
used to log, handle, or analyze failures in more detail, including
distinguishing between different types of defects (e.g., runtime exceptions,
interruptions, etc.).
Example
import { Effect, Console } from "effect"
//      ┌─── Effect<number, string, never>//      ▼const program = Effect.fail("Oh uh!").pipe(Effect.as(2))
//      ┌─── Effect<void, never, never>//      ▼const recovered = Effect.gen(function* () {  const cause = yield* Effect.cause(program)  yield* Console.log(cause)})@since ― 2.0.0cause(const program: Effect.Effect<number, string, never>program)11  yield* import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(const cause: Cause<string>cause)12})
```
## Merging the Error Channel into the Success Channel
[](#merging-the-error-channel-into-the-success-channel)
The `Effect.merge` function allows you to combine the error channel with the success channel. This results in an effect that never fails; instead, both successes and errors are handled as values in the success channel.
**Example** (Combining Error and Success Channels)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3//      ┌─── Effect<number, string, never>4//      ▼5const const program: Effect.Effect<number, string, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(2))6
7//      ┌─── Effect<number | string, never, never>8//      ▼9const const recovered: Effect.Effect<string | number, never, never>recovered = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const merge: <number, string, never>(self: Effect.Effect<number, string, never>) => Effect.Effect<string | number, never, never>Combines both success and error channels of an effect into a single outcome.
Details
This function transforms an effect that may fail into one that always returns
a value, where both success and failure outcomes are handled as values in the
success channel.
When to Use
This can be useful when you want to continue execution regardless of the
error type and still capture both successful results and errors as part of
the outcome.
Example
import { Effect } from "effect"
//      ┌─── Effect<number, string, never>//      ▼const program = Effect.fail("Oh uh!").pipe(Effect.as(2))
//      ┌─── Effect<number | string, never, never>//      ▼const recovered = Effect.merge(program)@since ― 2.0.0merge(const program: Effect.Effect<number, string, never>program)
```
## Flipping Error and Success Channels
[](#flipping-error-and-success-channels)
The `Effect.flip` function allows you to switch the error and success channels of an effect. This means that what was previously a success becomes the error, and vice versa.
**Example** (Swapping Error and Success Channels)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3//      ┌─── Effect<number, string, never>4//      ▼5const const program: Effect.Effect<number, string, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <string>(error: string) => Effect.Effect<never, string, never>Creates an Effect that represents a recoverable error.
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
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as(2))6
7//      ┌─── Effect<string, number, never>8//      ▼9const const flipped: Effect.Effect<string, number, never>flipped = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const flip: <number, string, never>(self: Effect.Effect<number, string, never>) => Effect.Effect<string, number, never>Swaps the success and error channels of an effect.
Details
This function reverses the flow of an effect by swapping its success and
error channels. The success value becomes an error, and the error value
becomes a success.
Example
import { Effect } from "effect"
//      ┌─── Effect<number, string, never>//      ▼const program = Effect.fail("Oh uh!").pipe(Effect.as(2))
//      ┌─── Effect<string, number, never>//      ▼const flipped = Effect.flip(program)@since ― 2.0.0flip(const program: Effect.Effect<number, string, never>program)
```
[Edit page](https://github.com/Effect-TS/website/edit/main/content/src/content/docs/docs/error-management/error-channel-operations.mdx)
[Previous  
Error Accumulation](/docs/error-management/error-accumulation/) [Next  
Parallel and Sequential Errors](/docs/error-management/parallel-and-sequential-errors/)
