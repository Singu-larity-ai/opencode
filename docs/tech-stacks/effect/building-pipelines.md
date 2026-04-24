---
title: "Building Pipelines"
source: "https://effect.website/docs/building-pipelines/"
description: "Effect documentation - Building Pipelines"
---

# Building Pipelines

[Docs](/docs/) [Blog](/blog/) [Podcast](/podcast/) [Play](/play/)
On this page
## On this page
-   [Overview](#_top)
-   [Why Pipelines are Good for Structuring Your Application](#why-pipelines-are-good-for-structuring-your-application)
-   [Functions vs Methods](#functions-vs-methods)
-   [pipe](#pipe)
-   [map](#map)
-   [as](#as)
-   [flatMap](#flatmap)
-   [andThen](#andthen)
-   [tap](#tap)
-   [all](#all)
-   [Build your first pipeline](#build-your-first-pipeline)
-   [The pipe method](#the-pipe-method)
-   [Cheatsheet](#cheatsheet)
# Building Pipelines
Effect pipelines allow for the composition and sequencing of operations on values, enabling the transformation and manipulation of data in a concise and modular manner.
## Why Pipelines are Good for Structuring Your Application
[](#why-pipelines-are-good-for-structuring-your-application)
Pipelines are an excellent way to structure your application and handle data transformations in a concise and modular manner. They offer several benefits:
1.  **Readability**: Pipelines allow you to compose functions in a readable and sequential manner. You can clearly see the flow of data and the operations applied to it, making it easier to understand and maintain the code.
2.  **Code Organization**: With pipelines, you can break down complex operations into smaller, manageable functions. Each function performs a specific task, making your code more modular and easier to reason about.
3.  **Reusability**: Pipelines promote the reuse of functions. By breaking down operations into smaller functions, you can reuse them in different pipelines or contexts, improving code reuse and reducing duplication.
4.  **Type Safety**: By leveraging the type system, pipelines help catch errors at compile-time. Functions in a pipeline have well-defined input and output types, ensuring that the data flows correctly through the pipeline and minimizing runtime errors.
## Functions vs Methods
[](#functions-vs-methods)
The use of functions in the Effect ecosystem libraries is important for achieving **tree shakeability** and ensuring **extensibility**. Functions enable efficient bundling by eliminating unused code, and they provide a flexible and modular approach to extending the libraries’ functionality.
### Tree Shakeability
[](#tree-shakeability)
Tree shakeability refers to the ability of a build system to eliminate unused code during the bundling process. Functions are tree shakeable, while methods are not.
When functions are used in the Effect ecosystem, only the functions that are actually imported and used in your application will be included in the final bundled code. Unused functions are automatically removed, resulting in a smaller bundle size and improved performance.
On the other hand, methods are attached to objects or prototypes, and they cannot be easily tree shaken. Even if you only use a subset of methods, all methods associated with an object or prototype will be included in the bundle, leading to unnecessary code bloat.
### Extensibility
[](#extensibility)
Another important advantage of using functions in the Effect ecosystem is the ease of extensibility. With methods, extending the functionality of an existing API often requires modifying the prototype of the object, which can be complex and error-prone.
In contrast, with functions, extending the functionality is much simpler. You can define your own “extension methods” as plain old functions without the need to modify the prototypes of objects. This promotes cleaner and more modular code, and it also allows for better compatibility with other libraries and modules.
## pipe
[](#pipe)
The `pipe` function is a utility that allows us to compose functions in a readable and sequential manner. It takes the output of one function and passes it as the input to the next function in the pipeline. This enables us to build complex transformations by chaining multiple functions together.
**Syntax**
```
import { pipe } from "effect"
const result = pipe(input, func1, func2, ..., funcN)
```
In this syntax, `input` is the initial value, and `func1`, `func2`, …, `funcN` are the functions to be applied in sequence. The result of each function becomes the input for the next function, and the final result is returned.
Here’s an illustration of how `pipe` works:
```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```
It’s important to note that functions passed to `pipe` must have a **single argument** because they are only called with a single argument.
Let’s see an example to better understand how `pipe` works:
**Example** (Chaining Arithmetic Operations)
```
1import { function pipe<A>(a: A): A (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
3// Define simple arithmetic operations4const const increment: (x: number) => numberincrement = (x: numberx: number) => x: numberx + 15const const double: (x: number) => numberdouble = (x: numberx: number) => x: numberx * 26const const subtractTen: (x: number) => numbersubtractTen = (x: numberx: number) => x: numberx - 107
8// Sequentially apply these operations using `pipe`9const const result: numberresult = pipe<5, number, number, number>(a: 5, ab: (a: 5) => number, bc: (b: number) => number, cd: (c: number) => number): number (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe(5, const increment: (x: number) => numberincrement, const double: (x: number) => numberdouble, const subtractTen: (x: number) => numbersubtractTen)10
11var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log(const result: numberresult)12// Output: 2
```
In the above example, we start with an input value of `5`. The `increment` function adds `1` to the initial value, resulting in `6`. Then, the `double` function doubles the value, giving us `12`. Finally, the `subtractTen` function subtracts `10` from `12`, resulting in the final output of `2`.
The result is equivalent to `subtractTen(double(increment(5)))`, but using `pipe` makes the code more readable because the operations are sequenced from left to right, rather than nesting them inside out.
## map
[](#map)
Transforms the value inside an effect by applying a function to it.
**Syntax**
```
const mappedEffect = pipe(myEffect, Effect.map(transformation))// orconst mappedEffect = Effect.map(myEffect, transformation)// orconst mappedEffect = myEffect.pipe(Effect.map(transformation))
```
`Effect.map` takes a function and applies it to the value contained within an effect, creating a new effect with the transformed value.
Effects are Immutable
It’s important to note that effects are immutable, meaning that the original effect is not modified. Instead, a new effect is returned with the updated value.
**Example** (Adding a Service Charge)
Here’s a practical example where we apply a service charge to a transaction amount:
```
1import { function pipe<A>(a: A): A (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe, import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3// Function to add a small service charge to a transaction amount4const const addServiceCharge: (amount: number) => numberaddServiceCharge = (amount: numberamount: number) => amount: numberamount + 15
6// Simulated asynchronous task to fetch a transaction amount from database7const const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const promise: <number>(evaluate: (signal: AbortSignal) => PromiseLike<number>) => Effect.Effect<number, never, never>Creates an Effect that represents an asynchronous computation guaranteed to
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
//      ┌─── Effect<string, never, never>//      ▼const program = delay("Async operation completed successfully!")@see ― tryPromise for a version that can handle failures.@since ― 2.0.0promise(() => var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<number>(value: number): Promise<number> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve(100))8
9// Apply service charge to the transaction amount10const const finalAmount: Effect.Effect<number, never, never>finalAmount = pipe<Effect.Effect<number, never, never>, Effect.Effect<number, never, never>>(a: Effect.Effect<number, never, never>, ab: (a: Effect.Effect<number, never, never>) => Effect.Effect<number, never, never>): Effect.Effect<number, never, never> (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe(11  const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount,12  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const map: <number, number>(f: (a: number) => number) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, E, R> (+1 overload)Transforms the value inside an effect by applying a function to it.
Syntax
const mappedEffect = pipe(myEffect, Effect.map(transformation))// orconst mappedEffect = Effect.map(myEffect, transformation)// orconst mappedEffect = myEffect.pipe(Effect.map(transformation))
Details
map takes a function and applies it to the value contained within an
effect, creating a new effect with the transformed value.
It's important to note that effects are immutable, meaning that the original
effect is not modified. Instead, a new effect is returned with the updated
value.
Example (Adding a Service Charge)
import { pipe, Effect } from "effect"
const addServiceCharge = (amount: number) => amount + 1
const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
const finalAmount = pipe(  fetchTransactionAmount,  Effect.map(addServiceCharge))
Effect.runPromise(finalAmount).then(console.log)// Output: 101@see ― mapError for a version that operates on the error channel.@see ― mapBoth for a version that operates on both channels.@see ― flatMap or andThen for a version that can return a new effect.@since ― 2.0.0map(const addServiceCharge: (amount: number) => numberaddServiceCharge)13)14
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
of rejecting.@since ― 2.0.0runPromise(const finalAmount: Effect.Effect<number, never, never>finalAmount).Promise<number>.then<void, never>(onfulfilled?: ((value: number) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log) // Output: 101
```
## as
[](#as)
Replaces the value inside an effect with a constant value.
`Effect.as` allows you to ignore the original value inside an effect and replace it with a new constant value.
Effects are Immutable
It’s important to note that effects are immutable, meaning that the original effect is not modified. Instead, a new effect is returned with the updated value.
**Example** (Replacing a Value)
```
1import { function pipe<A>(a: A): A (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe, import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3// Replace the value 5 with the constant "new value"4const const program: Effect.Effect<string, never, never>program = pipe<Effect.Effect<number, never, never>, Effect.Effect<string, never, never>>(a: Effect.Effect<number, never, never>, ab: (a: Effect.Effect<number, never, never>) => Effect.Effect<string, never, never>): Effect.Effect<string, never, never> (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe(import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(5), import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const as: <string>(value: string) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<string, E, R> (+1 overload)Replaces the value inside an effect with a constant value.
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
Effect.runPromise(program).then(console.log)// Output: "new value"@since ― 2.0.0as("new value"))5
6import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <string, never>(effect: Effect.Effect<string, never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<string>Executes an effect and returns the result as a Promise.
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
See util.format() for more information.@since ― v0.1.100log) // Output: "new value"
```
## flatMap
[](#flatmap)
Chains effects to produce new `Effect` instances, useful for combining operations that depend on previous results.
**Syntax**
```
const flatMappedEffect = pipe(myEffect, Effect.flatMap(transformation))// orconst flatMappedEffect = Effect.flatMap(myEffect, transformation)// orconst flatMappedEffect = myEffect.pipe(Effect.flatMap(transformation))
```
In the code above, `transformation` is the function that takes a value and returns an `Effect`, and `myEffect` is the initial `Effect` being transformed.
Use `Effect.flatMap` when you need to chain multiple effects, ensuring that each step produces a new `Effect` while flattening any nested effects that may occur.
It is similar to `flatMap` used with arrays but works specifically with `Effect` instances, allowing you to avoid deeply nested effect structures.
Effects are Immutable
It’s important to note that effects are immutable, meaning that the original effect is not modified. Instead, a new effect is returned with the updated value.
**Example** (Applying a Discount)
```
1import { function pipe<A>(a: A): A (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe, import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3// Function to apply a discount safely to a transaction amount4const const applyDiscount: (total: number, discountRate: number) => Effect.Effect<number, Error>applyDiscount = (5  total: numbertotal: number,6  discountRate: numberdiscountRate: number7): import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, interface ErrorError> =>8  discountRate: numberdiscountRate === 09    ? import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <Error>(error: Error) => Effect.Effect<never, Error, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(new var Error: ErrorConstructornew (message?: string) => ErrorError("Discount rate cannot be zero"))10    : import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(total: numbertotal - (total: numbertotal * discountRate: numberdiscountRate) / 100)11
12// Simulated asynchronous task to fetch a transaction amount from database13const const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const promise: <number>(evaluate: (signal: AbortSignal) => PromiseLike<number>) => Effect.Effect<number, never, never>Creates an Effect that represents an asynchronous computation guaranteed to
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
15// Chaining the fetch and discount application using `flatMap`16const const finalAmount: Effect.Effect<number, Error, never>finalAmount = pipe<Effect.Effect<number, never, never>, Effect.Effect<number, Error, never>>(a: Effect.Effect<number, never, never>, ab: (a: Effect.Effect<number, never, never>) => Effect.Effect<number, Error, never>): Effect.Effect<number, Error, never> (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe(17  const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount,18  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const flatMap: <number, number, Error, never>(f: (a: number) => Effect.Effect<number, Error, never>) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, Error | E, R> (+1 overload)Chains effects to produce new Effect instances, useful for combining
operations that depend on previous results.
Syntax
const flatMappedEffect = pipe(myEffect, Effect.flatMap(transformation))// orconst flatMappedEffect = Effect.flatMap(myEffect, transformation)// orconst flatMappedEffect = myEffect.pipe(Effect.flatMap(transformation))
Details
flatMap lets you sequence effects so that the result of one effect can be
used in the next step. It is similar to flatMap used with arrays but works
specifically with Effect instances, allowing you to avoid deeply nested
effect structures.
Since effects are immutable, flatMap always returns a new effect instead of
changing the original one.
When to Use
Use flatMap when you need to chain multiple effects, ensuring that each
step produces a new Effect while flattening any nested effects that may
occur.
Example
import { pipe, Effect } from "effect"
// Function to apply a discount safely to a transaction amountconst applyDiscount = (  total: number,  discountRate: number): Effect.Effect<number, Error> =>  discountRate === 0    ? Effect.fail(new Error("Discount rate cannot be zero"))    : Effect.succeed(total - (total * discountRate) / 100)
// Simulated asynchronous task to fetch a transaction amount from databaseconst fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
// Chaining the fetch and discount application using `flatMap`const finalAmount = pipe(  fetchTransactionAmount,  Effect.flatMap((amount) => applyDiscount(amount, 5)))
Effect.runPromise(finalAmount).then(console.log)// Output: 95@see ― tap for a version that ignores the result of the effect.@since ― 2.0.0flatMap((amount: numberamount) => const applyDiscount: (total: number, discountRate: number) => Effect.Effect<number, Error>applyDiscount(amount: numberamount, 5))19)20
21import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number, Error>(effect: Effect.Effect<number, Error, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const finalAmount: Effect.Effect<number, Error, never>finalAmount).Promise<number>.then<void, never>(onfulfilled?: ((value: number) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)22// Output: 95
```
### Ensure All Effects Are Considered
[](#ensure-all-effects-are-considered)
Make sure that all effects within `Effect.flatMap` contribute to the final computation. If you ignore an effect, it can lead to unexpected behavior:
```
Effect.flatMap((amount) => {  // This effect will be ignored  Effect.sync(() => console.log(`Apply a discount to: ${amount}`))  return applyDiscount(amount, 5)})
```
In this case, the `Effect.sync` call is ignored and does not affect the result of `applyDiscount(amount, 5)`. To handle effects correctly, make sure to explicitly chain them using functions like `Effect.map`, `Effect.flatMap`, `Effect.andThen`, or `Effect.tap`.
## andThen
[](#andthen)
Chains two actions, where the second action can depend on the result of the first.
**Syntax**
```
const transformedEffect = pipe(myEffect, Effect.andThen(anotherEffect))// orconst transformedEffect = Effect.andThen(myEffect, anotherEffect)// orconst transformedEffect = myEffect.pipe(Effect.andThen(anotherEffect))
```
Use `andThen` when you need to run multiple actions in sequence, with the second action depending on the result of the first. This is useful for combining effects or handling computations that must happen in order.
The second action can be:
1.  A value (similar to `Effect.as`)
2.  A function returning a value (similar to `Effect.map`)
3.  A `Promise`
4.  A function returning a `Promise`
5.  An `Effect`
6.  A function returning an `Effect` (similar to `Effect.flatMap`)
**Example** (Applying a Discount Based on Fetched Amount)
Let’s look at an example comparing `Effect.andThen` with `Effect.map` and `Effect.flatMap`:
```
1import { function pipe<A>(a: A): A (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe, import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3// Function to apply a discount safely to a transaction amount4const const applyDiscount: (total: number, discountRate: number) => Effect.Effect<number, Error>applyDiscount = (5  total: numbertotal: number,6  discountRate: numberdiscountRate: number7): import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, interface ErrorError> =>8  discountRate: numberdiscountRate === 09    ? import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <Error>(error: Error) => Effect.Effect<never, Error, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(new var Error: ErrorConstructornew (message?: string) => ErrorError("Discount rate cannot be zero"))10    : import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(total: numbertotal - (total: numbertotal * discountRate: numberdiscountRate) / 100)11
12// Simulated asynchronous task to fetch a transaction amount from database13const const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const promise: <number>(evaluate: (signal: AbortSignal) => PromiseLike<number>) => Effect.Effect<number, never, never>Creates an Effect that represents an asynchronous computation guaranteed to
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
15// Using Effect.map and Effect.flatMap16const const result1: Effect.Effect<number, Error, never>result1 = pipe<Effect.Effect<number, never, never>, Effect.Effect<number, never, never>, Effect.Effect<number, Error, never>>(a: Effect.Effect<number, never, never>, ab: (a: Effect.Effect<number, never, never>) => Effect.Effect<number, never, never>, bc: (b: Effect.Effect<number, never, never>) => Effect.Effect<number, Error, never>): Effect.Effect<number, Error, never> (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe(17  const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount,18  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const map: <number, number>(f: (a: number) => number) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, E, R> (+1 overload)Transforms the value inside an effect by applying a function to it.
Syntax
const mappedEffect = pipe(myEffect, Effect.map(transformation))// orconst mappedEffect = Effect.map(myEffect, transformation)// orconst mappedEffect = myEffect.pipe(Effect.map(transformation))
Details
map takes a function and applies it to the value contained within an
effect, creating a new effect with the transformed value.
It's important to note that effects are immutable, meaning that the original
effect is not modified. Instead, a new effect is returned with the updated
value.
Example (Adding a Service Charge)
import { pipe, Effect } from "effect"
const addServiceCharge = (amount: number) => amount + 1
const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
const finalAmount = pipe(  fetchTransactionAmount,  Effect.map(addServiceCharge))
Effect.runPromise(finalAmount).then(console.log)// Output: 101@see ― mapError for a version that operates on the error channel.@see ― mapBoth for a version that operates on both channels.@see ― flatMap or andThen for a version that can return a new effect.@since ― 2.0.0map((amount: numberamount) => amount: numberamount * 2),19  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const flatMap: <number, number, Error, never>(f: (a: number) => Effect.Effect<number, Error, never>) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, Error | E, R> (+1 overload)Chains effects to produce new Effect instances, useful for combining
operations that depend on previous results.
Syntax
const flatMappedEffect = pipe(myEffect, Effect.flatMap(transformation))// orconst flatMappedEffect = Effect.flatMap(myEffect, transformation)// orconst flatMappedEffect = myEffect.pipe(Effect.flatMap(transformation))
Details
flatMap lets you sequence effects so that the result of one effect can be
used in the next step. It is similar to flatMap used with arrays but works
specifically with Effect instances, allowing you to avoid deeply nested
effect structures.
Since effects are immutable, flatMap always returns a new effect instead of
changing the original one.
When to Use
Use flatMap when you need to chain multiple effects, ensuring that each
step produces a new Effect while flattening any nested effects that may
occur.
Example
import { pipe, Effect } from "effect"
// Function to apply a discount safely to a transaction amountconst applyDiscount = (  total: number,  discountRate: number): Effect.Effect<number, Error> =>  discountRate === 0    ? Effect.fail(new Error("Discount rate cannot be zero"))    : Effect.succeed(total - (total * discountRate) / 100)
// Simulated asynchronous task to fetch a transaction amount from databaseconst fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
// Chaining the fetch and discount application using `flatMap`const finalAmount = pipe(  fetchTransactionAmount,  Effect.flatMap((amount) => applyDiscount(amount, 5)))
Effect.runPromise(finalAmount).then(console.log)// Output: 95@see ― tap for a version that ignores the result of the effect.@since ― 2.0.0flatMap((amount: numberamount) => const applyDiscount: (total: number, discountRate: number) => Effect.Effect<number, Error>applyDiscount(amount: numberamount, 5))20)21
22import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number, Error>(effect: Effect.Effect<number, Error, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const result1: Effect.Effect<number, Error, never>result1).Promise<number>.then<void, never>(onfulfilled?: ((value: number) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log) // Output: 19023
24// Using Effect.andThen25const const result2: Effect.Effect<number, Error, never>result2 = pipe<Effect.Effect<number, never, never>, Effect.Effect<number, never, never>, Effect.Effect<number, Error, never>>(a: Effect.Effect<number, never, never>, ab: (a: Effect.Effect<number, never, never>) => Effect.Effect<number, never, never>, bc: (b: Effect.Effect<number, never, never>) => Effect.Effect<number, Error, never>): Effect.Effect<number, Error, never> (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe(26  const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount,27  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const andThen: <number, number>(f: (a: number) => number) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, E, R> (+3 overloads)Chains two actions, where the second action can depend on the result of the
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
Effect.runPromise(result2).then(console.log)// Output: 190@since ― 2.0.0andThen((amount: numberamount) => amount: numberamount * 2),28  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const andThen: <number, Effect.Effect<number, Error, never>>(f: (a: number) => Effect.Effect<number, Error, never>) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, Error | E, R> (+3 overloads)Chains two actions, where the second action can depend on the result of the
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
Effect.runPromise(result2).then(console.log)// Output: 190@since ― 2.0.0andThen((amount: numberamount) => const applyDiscount: (total: number, discountRate: number) => Effect.Effect<number, Error>applyDiscount(amount: numberamount, 5))29)30
31import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number, Error>(effect: Effect.Effect<number, Error, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const result2: Effect.Effect<number, Error, never>result2).Promise<number>.then<void, never>(onfulfilled?: ((value: number) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log) // Output: 190
```
### Option and Either with andThen
[](#option-and-either-with-andthen)
Both [Option](/docs/data-types/option/#interop-with-effect) and [Either](/docs/data-types/either/#interop-with-effect) are commonly used for handling optional or missing values or simple error cases. These types integrate well with `Effect.andThen`. When used with `Effect.andThen`, the operations are categorized as scenarios 5 and 6 (as discussed earlier) because both `Option` and `Either` are treated as effects in this context.
**Example** (with Option)
```
1import { function pipe<A>(a: A): A (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe, import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import Option@since ― 2.0.0@since ― 2.0.0Option } from "effect"2
3// Simulated asynchronous task fetching a number from a database4const const fetchNumberValue: Effect.Effect<number, UnknownException, never>fetchNumberValue = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tryPromise: <number>(evaluate: (signal: AbortSignal) => PromiseLike<number>) => Effect.Effect<number, UnknownException, never> (+1 overload)Creates an Effect that represents an asynchronous computation that might
fail.
When to Use
In situations where you need to perform asynchronous operations that might
fail, such as fetching data from an API, you can use the tryPromise
constructor. This constructor is designed to handle operations that could
throw exceptions by capturing those exceptions and transforming them into
manageable errors.
Error Handling
There are two ways to handle errors with tryPromise:
If you don't provide a catch function, the error is caught and the
effect fails with an UnknownException.
If you provide a catch function, the error is caught and the catch
function maps it to an error of type E.
Interruptions
An optional AbortSignal can be provided to allow for interruption of the
wrapped Promise API.
Example (Fetching a TODO Item)
import { Effect } from "effect"
const getTodo = (id: number) =>  // Will catch any errors and propagate them as UnknownException  Effect.tryPromise(() =>    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)  )
//      ┌─── Effect<Response, UnknownException, never>//      ▼const program = getTodo(1)
Example (Custom Error Handling)
import { Effect } from "effect"
const getTodo = (id: number) =>  Effect.tryPromise({    try: () => fetch(`https://jsonplaceholder.typicode.com/todos/${id}`),    // remap the error    catch: (unknown) => new Error(`something went wrong ${unknown}`)  })
//      ┌─── Effect<Response, Error, never>//      ▼const program = getTodo(1)@see ― promise if the effectful computation is asynchronous and does not throw errors.@since ― 2.0.0tryPromise(() => var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<number>(value: number): Promise<number> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve(42))5
6//      ┌─── Effect<number, UnknownException | NoSuchElementException, never>7//      ▼8const const program: Effect.Effect<number, UnknownException | NoSuchElementException, never>program = pipe<Effect.Effect<number, UnknownException, never>, Effect.Effect<number, UnknownException | NoSuchElementException, never>>(a: Effect.Effect<number, UnknownException, never>, ab: (a: Effect.Effect<number, UnknownException, never>) => Effect.Effect<number, UnknownException | NoSuchElementException, never>): Effect.Effect<number, UnknownException | NoSuchElementException, never> (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe(9  const fetchNumberValue: Effect.Effect<number, UnknownException, never>fetchNumberValue,10  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const andThen: <number, Option.None<number> | Option.Some<number>>(f: (a: number) => Option.None<number> | Option.Some<number>) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, NoSuchElementException | E, R> (+3 overloads)Chains two actions, where the second action can depend on the result of the
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
Effect.runPromise(result2).then(console.log)// Output: 190@since ― 2.0.0andThen((x: numberx) => (x: numberx > 0 ? import Option@since ― 2.0.0@since ― 2.0.0Option.const some: <number>(value: number) => Option.Option<number>Wraps the given value into an Option to represent its presence.
Example (Creating an Option with a Value)
import { Option } from "effect"
// An Option holding the number 1////      ┌─── Option<number>//      ▼const value = Option.some(1)
console.log(value)// Output: { _id: 'Option', _tag: 'Some', value: 1 }@see ― none for the opposite operation.@since ― 2.0.0some(x: numberx) : import Option@since ― 2.0.0@since ― 2.0.0Option.const none: <never>() => Option.Option<never>Represents the absence of a value by creating an empty Option.
Option.none returns an Option<never>, which is a subtype of Option<A>.
This means you can use it in place of any Option<A> regardless of the type
A.
Example (Creating an Option with No Value)
import { Option } from "effect"
// An Option holding no value////      ┌─── Option<never>//      ▼const noValue = Option.none()
console.log(noValue)// Output: { _id: 'Option', _tag: 'None' }@see ― some for the opposite operation.@since ― 2.0.0none()))11)
```
You might expect the type of `program` to be `Effect<Option<number>, UnknownException, never>`, but it is actually `Effect<number, UnknownException | NoSuchElementException, never>`.
This is because `Option<A>` is treated as an effect of type `Effect<A, NoSuchElementException>`, and as a result, the possible errors are combined into a union type.
Option As Effect
A value of type `Option<A>` is interpreted as an effect of type `Effect<A, NoSuchElementException>`.
**Example** (with Either)
```
1import { function pipe<A>(a: A): A (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe, import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import Either@since ― 2.0.0@since ― 2.0.0Either } from "effect"2
3// Function to parse an integer from a string that can fail4const const parseInteger: (input: string) => Either.Either<number, string>parseInteger = (input: stringinput: string): import Either@since ― 2.0.0@since ― 2.0.0Either.type Either<A, E = never> = Either.Left<E, A> | Either.Right<E, A>@since ― 2.0.0@since ― 2.0.0Either<number, string> =>5  function isNaN(number: number): booleanReturns a Boolean value that indicates whether a value is the reserved value NaN (not a number).@param ― number A numeric value.isNaN(function parseInt(string: string, radix?: number): numberConverts a string to an integer.@param ― string A string to convert into a number.@param ― radix A value between 2 and 36 that specifies the base of the number in string.
If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
All other strings are considered decimal.parseInt(input: stringinput))6    ? import Either@since ― 2.0.0@since ― 2.0.0Either.const left: <string>(e: string) => Either.Either<never, string>Constructs a new Either holding a Left value. This usually represents a failure, due to the right-bias of this
structure.@since ― 2.0.0left("Invalid integer")7    : import Either@since ― 2.0.0@since ― 2.0.0Either.const right: <number>(a: number) => Either.Either<number, never>Constructs a new Either holding a Right value. This usually represents a successful value due to the right bias
of this structure.@since ― 2.0.0right(function parseInt(string: string, radix?: number): numberConverts a string to an integer.@param ― string A string to convert into a number.@param ― radix A value between 2 and 36 that specifies the base of the number in string.
If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
All other strings are considered decimal.parseInt(input: stringinput))8
9// Simulated asynchronous task fetching a string from database10const const fetchStringValue: Effect.Effect<string, UnknownException, never>fetchStringValue = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tryPromise: <string>(evaluate: (signal: AbortSignal) => PromiseLike<string>) => Effect.Effect<string, UnknownException, never> (+1 overload)Creates an Effect that represents an asynchronous computation that might
fail.
When to Use
In situations where you need to perform asynchronous operations that might
fail, such as fetching data from an API, you can use the tryPromise
constructor. This constructor is designed to handle operations that could
throw exceptions by capturing those exceptions and transforming them into
manageable errors.
Error Handling
There are two ways to handle errors with tryPromise:
If you don't provide a catch function, the error is caught and the
effect fails with an UnknownException.
If you provide a catch function, the error is caught and the catch
function maps it to an error of type E.
Interruptions
An optional AbortSignal can be provided to allow for interruption of the
wrapped Promise API.
Example (Fetching a TODO Item)
import { Effect } from "effect"
const getTodo = (id: number) =>  // Will catch any errors and propagate them as UnknownException  Effect.tryPromise(() =>    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)  )
//      ┌─── Effect<Response, UnknownException, never>//      ▼const program = getTodo(1)
Example (Custom Error Handling)
import { Effect } from "effect"
const getTodo = (id: number) =>  Effect.tryPromise({    try: () => fetch(`https://jsonplaceholder.typicode.com/todos/${id}`),    // remap the error    catch: (unknown) => new Error(`something went wrong ${unknown}`)  })
//      ┌─── Effect<Response, Error, never>//      ▼const program = getTodo(1)@see ― promise if the effectful computation is asynchronous and does not throw errors.@since ― 2.0.0tryPromise(() => var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<string>(value: string): Promise<string> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve("42"))11
12//      ┌─── Effect<number, string | UnknownException, never>13//      ▼14const const program: Effect.Effect<number, string | UnknownException, never>program = pipe<Effect.Effect<string, UnknownException, never>, Effect.Effect<number, string | UnknownException, never>>(a: Effect.Effect<string, UnknownException, never>, ab: (a: Effect.Effect<string, UnknownException, never>) => Effect.Effect<number, string | UnknownException, never>): Effect.Effect<number, string | UnknownException, never> (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe(15  const fetchStringValue: Effect.Effect<string, UnknownException, never>fetchStringValue,16  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const andThen: <string, Either.Either<number, string>>(f: (a: string) => Either.Either<number, string>) => <E, R>(self: Effect.Effect<string, E, R>) => Effect.Effect<number, string | E, R> (+3 overloads)Chains two actions, where the second action can depend on the result of the
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
Effect.runPromise(result2).then(console.log)// Output: 190@since ― 2.0.0andThen((str: stringstr) => const parseInteger: (input: string) => Either.Either<number, string>parseInteger(str: stringstr))17)
```
Although one might expect the type of `program` to be `Effect<Either<number, string>, UnknownException, never>`, it is actually `Effect<number, string | UnknownException, never>`.
This is because `Either<A, E>` is treated as an effect of type `Effect<A, E>`, meaning the errors are combined into a union type.
Either As Effect
A value of type `Either<A, E>` is interpreted as an effect of type `Effect<A, E>`.
## tap
[](#tap)
Runs a side effect with the result of an effect without changing the original value.
Use `Effect.tap` when you want to perform a side effect, like logging or tracking, without modifying the main value. This is useful when you need to observe or record an action but want the original value to be passed to the next step.
`Effect.tap` works similarly to `Effect.flatMap`, but it ignores the result of the function passed to it. The value from the previous effect remains available for the next part of the chain. Note that if the side effect fails, the entire chain will fail too.
**Example** (Logging a step in a pipeline)
```
1import { function pipe<A>(a: A): A (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe, import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect, import ConsoleConsole } from "effect"2
3// Function to apply a discount safely to a transaction amount4const const applyDiscount: (total: number, discountRate: number) => Effect.Effect<number, Error>applyDiscount = (5  total: numbertotal: number,6  discountRate: numberdiscountRate: number7): import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.interface Effect<out A, out E = never, out R = never>The Effect interface defines a value that describes a workflow or job,
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
environment necessary to run and manage the computation.@since ― 2.0.0@since ― 2.0.0Effect<number, interface ErrorError> =>8  discountRate: numberdiscountRate === 09    ? import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const fail: <Error>(error: Error) => Effect.Effect<never, Error, never>Creates an Effect that represents a recoverable error.
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
//      ┌─── Effect<never, Error, never>//      ▼const failure = Effect.fail(  new Error("Operation failed due to network error"))@see ― succeed to create an effect that represents a successful value.@since ― 2.0.0fail(new var Error: ErrorConstructornew (message?: string) => ErrorError("Discount rate cannot be zero"))10    : import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const succeed: <number>(value: number) => Effect.Effect<number, never, never>Creates an Effect that always succeeds with a given value.
When to Use
Use this function when you need an effect that completes successfully with a
specific value without any errors or external dependencies.
Example (Creating a Successful Effect)
import { Effect } from "effect"
// Creating an effect that represents a successful scenario////      ┌─── Effect<number, never, never>//      ▼const success = Effect.succeed(42)@see ― fail to create an effect that represents a failure.@since ― 2.0.0succeed(total: numbertotal - (total: numbertotal * discountRate: numberdiscountRate) / 100)11
12// Simulated asynchronous task to fetch a transaction amount from database13const const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const promise: <number>(evaluate: (signal: AbortSignal) => PromiseLike<number>) => Effect.Effect<number, never, never>Creates an Effect that represents an asynchronous computation guaranteed to
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
15const const finalAmount: Effect.Effect<number, Error, never>finalAmount = pipe<Effect.Effect<number, never, never>, Effect.Effect<number, never, never>, Effect.Effect<number, Error, never>>(a: Effect.Effect<number, never, never>, ab: (a: Effect.Effect<number, never, never>) => Effect.Effect<number, never, never>, bc: (b: Effect.Effect<number, never, never>) => Effect.Effect<number, Error, never>): Effect.Effect<number, Error, never> (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe(16  const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount,17  // Log the fetched transaction amount18  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const tap: <number, Effect.Effect<void, never, never>>(f: (a: number) => Effect.Effect<void, never, never>) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, E, R> (+7 overloads)Runs a side effect with the result of an effect without changing the original
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
Effect.runPromise(finalAmount).then(console.log)// Output:// Apply a discount to: 100// 95@see ― flatMap for a version that allows you to change the value.@since ― 2.0.0tap((amount: numberamount) => import ConsoleConsole.const log: (...args: ReadonlyArray<any>) => Effect.Effect<void>@since ― 2.0.0log(`Apply a discount to: ${amount: numberamount}`)),19  // `amount` is still available!20  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const flatMap: <number, number, Error, never>(f: (a: number) => Effect.Effect<number, Error, never>) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, Error | E, R> (+1 overload)Chains effects to produce new Effect instances, useful for combining
operations that depend on previous results.
Syntax
const flatMappedEffect = pipe(myEffect, Effect.flatMap(transformation))// orconst flatMappedEffect = Effect.flatMap(myEffect, transformation)// orconst flatMappedEffect = myEffect.pipe(Effect.flatMap(transformation))
Details
flatMap lets you sequence effects so that the result of one effect can be
used in the next step. It is similar to flatMap used with arrays but works
specifically with Effect instances, allowing you to avoid deeply nested
effect structures.
Since effects are immutable, flatMap always returns a new effect instead of
changing the original one.
When to Use
Use flatMap when you need to chain multiple effects, ensuring that each
step produces a new Effect while flattening any nested effects that may
occur.
Example
import { pipe, Effect } from "effect"
// Function to apply a discount safely to a transaction amountconst applyDiscount = (  total: number,  discountRate: number): Effect.Effect<number, Error> =>  discountRate === 0    ? Effect.fail(new Error("Discount rate cannot be zero"))    : Effect.succeed(total - (total * discountRate) / 100)
// Simulated asynchronous task to fetch a transaction amount from databaseconst fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
// Chaining the fetch and discount application using `flatMap`const finalAmount = pipe(  fetchTransactionAmount,  Effect.flatMap((amount) => applyDiscount(amount, 5)))
Effect.runPromise(finalAmount).then(console.log)// Output: 95@see ― tap for a version that ignores the result of the effect.@since ― 2.0.0flatMap((amount: numberamount) => const applyDiscount: (total: number, discountRate: number) => Effect.Effect<number, Error>applyDiscount(amount: numberamount, 5))21)22
23import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <number, Error>(effect: Effect.Effect<number, Error, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<number>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const finalAmount: Effect.Effect<number, Error, never>finalAmount).Promise<number>.then<void, never>(onfulfilled?: ((value: number) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log)24/*25Output:26Apply a discount to: 100279528*/
```
In this example, `Effect.tap` is used to log the transaction amount before applying the discount, without modifying the value itself. The original value (`amount`) remains available for the next operation (`applyDiscount`).
Using `Effect.tap` allows us to execute side effects during the computation without altering the result. This can be useful for logging, performing additional actions, or observing the intermediate values without interfering with the main computation flow.
## all
[](#all)
Combines multiple effects into one, returning results based on the input structure.
Use `Effect.all` when you need to run multiple effects and combine their results into a single output. It supports tuples, iterables, structs, and records, making it flexible for different input types.
For instance, if the input is a tuple:
```
//         ┌─── a tuple of effects//         ▼Effect.all([effect1, effect2, ...])
```
the effects are executed in order, and the result is a new effect containing the results as a tuple. The results in the tuple match the order of the effects passed to `Effect.all`.
By default, `Effect.all` runs effects sequentially and produces a tuple or object with the results. If any effect fails, it stops execution (short-circuiting) and propagates the error.
See [Collecting](/docs/getting-started/control-flow/#all) for more information on how to use `Effect.all`.
**Example** (Combining Configuration and Database Checks)
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
3// Simulated function to read configuration from a file4const const webConfig: Effect.Effect<{    dbConnection: string;    port: number;}, never, never>webConfig = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const promise: <{    dbConnection: string;    port: number;}>(evaluate: (signal: AbortSignal) => PromiseLike<{    dbConnection: string;    port: number;}>) => Effect.Effect<{    dbConnection: string;    port: number;}, never, never>Creates an Effect that represents an asynchronous computation guaranteed to
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
//      ┌─── Effect<string, never, never>//      ▼const program = delay("Async operation completed successfully!")@see ― tryPromise for a version that can handle failures.@since ― 2.0.0promise(() =>5  var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<{    dbConnection: string;    port: number;}>(value: {    dbConnection: string;    port: number;}): Promise<{    dbConnection: string;    port: number;}> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve({ dbConnection: stringdbConnection: "localhost", port: numberport: 8080 })6)7
8// Simulated function to test database connectivity9const const checkDatabaseConnectivity: Effect.Effect<string, never, never>checkDatabaseConnectivity = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const promise: <string>(evaluate: (signal: AbortSignal) => PromiseLike<string>) => Effect.Effect<string, never, never>Creates an Effect that represents an asynchronous computation guaranteed to
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
//      ┌─── Effect<string, never, never>//      ▼const program = delay("Async operation completed successfully!")@see ― tryPromise for a version that can handle failures.@since ― 2.0.0promise(() =>10  var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<string>(value: string): Promise<string> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve("Connected to Database")11)12
13// Combine both effects to perform startup checks14const const startupChecks: Effect.Effect<[{    dbConnection: string;    port: number;}, string], never, never>startupChecks = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const all: <readonly [Effect.Effect<{    dbConnection: string;    port: number;}, never, never>, Effect.Effect<string, never, never>], NoExcessProperties<{    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard?: boolean | undefined;    readonly mode?: "default" | "validate" | "either" | undefined;    readonly concurrentFinalizers?: boolean | undefined;}, unknown>>(arg: readonly [Effect.Effect<{    dbConnection: string;    port: number;}, never, never>, Effect.Effect<...>], options?: NoExcessProperties<...> | undefined) => Effect.Effect<...>Combines multiple effects into one, returning results based on the input
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
Effect.runPromiseExit(program).then((result) => console.log("%o", result))// Output:// Task1// Task3// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: [//       { _id: 'Option', _tag: 'None' },//       { _id: 'Option', _tag: 'Some', value: 'Task2: Oh no!' },//       { _id: 'Option', _tag: 'None' }//     ]//   }// }@see ― forEach for iterating over elements and applying an effect.@see ― allWith for a data-last version of this function.@since ― 2.0.0all([const webConfig: Effect.Effect<{    dbConnection: string;    port: number;}, never, never>webConfig, const checkDatabaseConnectivity: Effect.Effect<string, never, never>checkDatabaseConnectivity])15
16import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <[{    dbConnection: string;    port: number;}, string], never>(effect: Effect.Effect<[{    dbConnection: string;    port: number;}, string], never, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<[{    dbConnection: string;    port: number;}, string]>Executes an effect and returns the result as a Promise.
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
of rejecting.@since ― 2.0.0runPromise(const startupChecks: Effect.Effect<[{    dbConnection: string;    port: number;}, string], never, never>startupChecks).Promise<[{ dbConnection: string; port: number; }, string]>.then<void, never>(onfulfilled?: ((value: [{    dbConnection: string;    port: number;}, string]) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>Attaches callbacks for the resolution and/or rejection of the Promise.@param ― onfulfilled The callback to execute when the Promise is resolved.@param ― onrejected The callback to execute when the Promise is rejected.@returns ― A Promise for the completion of which ever callback is executed.then(([config: {    dbConnection: string;    port: number;}config, dbStatus: stringdbStatus]) => {17  var console: ConsoleThe console module provides a simple debugging console that is similar to the
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
See util.format() for more information.@since ― v0.1.100log(18    `Configuration: ${var JSON: JSONAn intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.JSON.JSON.stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string (+1 overload)Converts a JavaScript value to a JavaScript Object Notation (JSON) string.@param ― value A JavaScript value, usually an object or array, to be converted.@param ― replacer A function that transforms the results.@param ― space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.@throws ― {TypeError} If a circular reference or a BigInt value is found.stringify(config: {    dbConnection: string;    port: number;}config)}\nDB Status: ${dbStatus: stringdbStatus}`19  )20})21/*22Output:23Configuration: {"dbConnection":"localhost","port":8080}24DB Status: Connected to Database25*/
```
## Build your first pipeline
[](#build-your-first-pipeline)
Let’s now combine the `pipe` function, `Effect.all`, and `Effect.andThen` to create a pipeline that performs a sequence of transformations.
**Example** (Building a Transaction Pipeline)
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
15// Simulated asynchronous task to fetch a transaction amount from database16const const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const promise: <number>(evaluate: (signal: AbortSignal) => PromiseLike<number>) => Effect.Effect<number, never, never>Creates an Effect that represents an asynchronous computation guaranteed to
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
//      ┌─── Effect<string, never, never>//      ▼const program = delay("Async operation completed successfully!")@see ― tryPromise for a version that can handle failures.@since ― 2.0.0promise(() => var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<number>(value: number): Promise<number> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve(100))17
18// Simulated asynchronous task to fetch a discount rate19// from a configuration file20const const fetchDiscountRate: Effect.Effect<number, never, never>fetchDiscountRate = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const promise: <number>(evaluate: (signal: AbortSignal) => PromiseLike<number>) => Effect.Effect<number, never, never>Creates an Effect that represents an asynchronous computation guaranteed to
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
//      ┌─── Effect<string, never, never>//      ▼const program = delay("Async operation completed successfully!")@see ― tryPromise for a version that can handle failures.@since ― 2.0.0promise(() => var Promise: PromiseConstructorRepresents the completion of an asynchronous operationPromise.PromiseConstructor.resolve<number>(value: number): Promise<number> (+2 overloads)Creates a new resolved promise for the provided value.@param ― value A promise.@returns ― A promise whose internal state matches the provided promise.resolve(5))21
22// Assembling the program using a pipeline of effects23const const program: Effect.Effect<string, Error, never>program = pipe<Effect.Effect<[number, number], never, never>, Effect.Effect<number, Error, never>, Effect.Effect<number, Error, never>, Effect.Effect<string, Error, never>>(a: Effect.Effect<[number, number], never, never>, ab: (a: Effect.Effect<[number, number], never, never>) => Effect.Effect<number, Error, never>, bc: (b: Effect.Effect<number, Error, never>) => Effect.Effect<number, Error, never>, cd: (c: Effect.Effect<number, Error, never>) => Effect.Effect<...>): Effect.Effect<...> (+19 overloads)Pipes the value of an expression into a pipeline of functions.
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
console.log(result)// Output: 2@since ― 2.0.0pipe(24  // Combine both fetch effects to get the transaction amount25  // and discount rate26  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const all: <readonly [Effect.Effect<number, never, never>, Effect.Effect<number, never, never>], NoExcessProperties<{    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard?: boolean | undefined;    readonly mode?: "default" | "validate" | "either" | undefined;    readonly concurrentFinalizers?: boolean | undefined;}, unknown>>(arg: readonly [Effect.Effect<number, never, never>, Effect.Effect<number, never, never>], options?: NoExcessProperties<...> | undefined) => Effect.Effect<...>Combines multiple effects into one, returning results based on the input
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
Effect.runPromiseExit(program).then((result) => console.log("%o", result))// Output:// Task1// Task3// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: [//       { _id: 'Option', _tag: 'None' },//       { _id: 'Option', _tag: 'Some', value: 'Task2: Oh no!' },//       { _id: 'Option', _tag: 'None' }//     ]//   }// }@see ― forEach for iterating over elements and applying an effect.@see ― allWith for a data-last version of this function.@since ― 2.0.0all([const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount, const fetchDiscountRate: Effect.Effect<number, never, never>fetchDiscountRate]),27
28  // Apply the discount to the transaction amount29  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const andThen: <[number, number], Effect.Effect<number, Error, never>>(f: (a: [number, number]) => Effect.Effect<number, Error, never>) => <E, R>(self: Effect.Effect<[number, number], E, R>) => Effect.Effect<number, Error | E, R> (+3 overloads)Chains two actions, where the second action can depend on the result of the
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
Effect.runPromise(result2).then(console.log)// Output: 190@since ― 2.0.0andThen(([transactionAmount: numbertransactionAmount, discountRate: numberdiscountRate]) =>30    const applyDiscount: (total: number, discountRate: number) => Effect.Effect<number, Error>applyDiscount(transactionAmount: numbertransactionAmount, discountRate: numberdiscountRate)31  ),32
33  // Add the service charge to the discounted amount34  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const andThen: <number, number>(f: (a: number) => number) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, E, R> (+3 overloads)Chains two actions, where the second action can depend on the result of the
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
Effect.runPromise(result2).then(console.log)// Output: 190@since ― 2.0.0andThen(const addServiceCharge: (amount: number) => numberaddServiceCharge),35
36  // Format the final result for display37  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const andThen: <number, string>(f: (a: number) => string) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<string, E, R> (+3 overloads)Chains two actions, where the second action can depend on the result of the
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
Effect.runPromise(result2).then(console.log)// Output: 190@since ― 2.0.0andThen(38    (finalAmount: numberfinalAmount) => `Final amount to charge: ${finalAmount: numberfinalAmount}`39  )40)41
42// Execute the program and log the result43import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const runPromise: <string, Error>(effect: Effect.Effect<string, Error, never>, options?: {    readonly signal?: AbortSignal | undefined;} | undefined) => Promise<string>Executes an effect and returns the result as a Promise.
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
See util.format() for more information.@since ― v0.1.100log)44// Output: "Final amount to charge: 96"
```
This pipeline demonstrates how you can structure your code by combining different effects into a clear, readable flow.
## The pipe method
[](#the-pipe-method)
Effect provides a `pipe` method that works similarly to the `pipe` method found in [rxjs](https://rxjs.dev/api/index/function/pipe). This method allows you to chain multiple operations together, making your code more concise and readable.
**Syntax**
```
const result = effect.pipe(func1, func2, ..., funcN)
```
This is equivalent to using the `pipe` **function** like this:
```
const result = pipe(effect, func1, func2, ..., funcN)
```
The `pipe` method is available on all effects and many other data types, eliminating the need to import the `pipe` function and saving you some keystrokes.
**Example** (Using the `pipe` Method)
Let’s rewrite an [earlier example](#build-your-first-pipeline), this time using the `pipe` method.
```
1import { import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect } from "effect"2
13 collapsed lines3const const addServiceCharge: (amount: number) => numberaddServiceCharge = (amount: numberamount: number) => amount: numberamount + 14
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
17const const program: Effect.Effect<string, Error, never>program = import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const all: <readonly [Effect.Effect<number, never, never>, Effect.Effect<number, never, never>], NoExcessProperties<{    readonly concurrency?: Concurrency | undefined;    readonly batching?: boolean | "inherit" | undefined;    readonly discard?: boolean | undefined;    readonly mode?: "default" | "validate" | "either" | undefined;    readonly concurrentFinalizers?: boolean | undefined;}, unknown>>(arg: readonly [Effect.Effect<number, never, never>, Effect.Effect<number, never, never>], options?: NoExcessProperties<...> | undefined) => Effect.Effect<...>Combines multiple effects into one, returning results based on the input
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
Effect.runPromiseExit(program).then((result) => console.log("%o", result))// Output:// Task1// Task3// {//   _id: 'Exit',//   _tag: 'Failure',//   cause: {//     _id: 'Cause',//     _tag: 'Fail',//     failure: [//       { _id: 'Option', _tag: 'None' },//       { _id: 'Option', _tag: 'Some', value: 'Task2: Oh no!' },//       { _id: 'Option', _tag: 'None' }//     ]//   }// }@see ― forEach for iterating over elements and applying an effect.@see ― allWith for a data-last version of this function.@since ― 2.0.0all([18  const fetchTransactionAmount: Effect.Effect<number, never, never>fetchTransactionAmount,19  const fetchDiscountRate: Effect.Effect<number, never, never>fetchDiscountRate20]).Pipeable.pipe<Effect.Effect<[number, number], never, never>, Effect.Effect<number, Error, never>, Effect.Effect<number, Error, never>, Effect.Effect<string, Error, never>>(this: Effect.Effect<...>, ab: (_: Effect.Effect<[number, number], never, never>) => Effect.Effect<number, Error, never>, bc: (_: Effect.Effect<number, Error, never>) => Effect.Effect<number, Error, never>, cd: (_: Effect.Effect<number, Error, never>) => Effect.Effect<string, Error, never>): Effect.Effect<...> (+21 overloads)pipe(21  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const andThen: <[number, number], Effect.Effect<number, Error, never>>(f: (a: [number, number]) => Effect.Effect<number, Error, never>) => <E, R>(self: Effect.Effect<[number, number], E, R>) => Effect.Effect<number, Error | E, R> (+3 overloads)Chains two actions, where the second action can depend on the result of the
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
Effect.runPromise(result2).then(console.log)// Output: 190@since ― 2.0.0andThen(([transactionAmount: numbertransactionAmount, discountRate: numberdiscountRate]) =>22    const applyDiscount: (total: number, discountRate: number) => Effect.Effect<number, Error>applyDiscount(transactionAmount: numbertransactionAmount, discountRate: numberdiscountRate)23  ),24  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const andThen: <number, number>(f: (a: number) => number) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<number, E, R> (+3 overloads)Chains two actions, where the second action can depend on the result of the
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
Effect.runPromise(result2).then(console.log)// Output: 190@since ― 2.0.0andThen(const addServiceCharge: (amount: number) => numberaddServiceCharge),25  import Effect@since ― 2.0.0@since ― 2.0.0@since ― 2.0.0Effect.const andThen: <number, string>(f: (a: number) => string) => <E, R>(self: Effect.Effect<number, E, R>) => Effect.Effect<string, E, R> (+3 overloads)Chains two actions, where the second action can depend on the result of the
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
Effect.runPromise(result2).then(console.log)// Output: 190@since ― 2.0.0andThen(26    (finalAmount: numberfinalAmount) => `Final amount to charge: ${finalAmount: numberfinalAmount}`27  )28)
```
## Cheatsheet
[](#cheatsheet)
Let’s summarize the transformation functions we have seen so far:
API
Input
Output
`map`
`Effect<A, E, R>`, `A => B`
`Effect<B, E, R>`
`flatMap`
`Effect<A, E, R>`, `A => Effect<B, E, R>`
`Effect<B, E, R>`
`andThen`
`Effect<A, E, R>`, \*
`Effect<B, E, R>`
`tap`
`Effect<A, E, R>`, `A => Effect<B, E, R>`
`Effect<A, E, R>`
`all`
`[Effect<A, E, R>, Effect<B, E, R>, ...]`
`Effect<[A, B, ...], E, R>`
[Edit page](https://github.com/Effect-TS/website/edit/main/content/src/content/docs/docs/getting-started/building-pipelines.mdx)
[Previous  
Using Generators](/docs/getting-started/using-generators/) [Next  
Control Flow Operators](/docs/getting-started/control-flow/)
