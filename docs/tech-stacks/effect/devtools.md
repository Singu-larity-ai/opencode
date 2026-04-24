---
title: "Getting Started: Devtools"
description: "Effect development tools"
source: "https://effect.website/docs/getting-started/devtools/"
---

# Devtools

Effect provides powerful development tools to enhance your coding experience and help you write safer, more maintainable code. These tools integrate directly into your editor, providing real-time feedback, intelligent refactors, and helpful diagnostics.

## Effect LSP

The Effect LSP extends your editor with Effect-specific features. It analyzes your Effect code and provides intelligent assistance through diagnostics, quick info, completions, and automated refactors.

It works in editors that supports the standard TypeScript LSP, such as Code, Cursor, Zed, NVim, etc.

### Installation

To install the Effect Language Service in your project:

1. Install the package as a development dependency:
   ```bash
   npm install @effect/language-service --save-dev
   ```

2. Add the plugin to your `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "plugins": [
         {
           "name": "@effect/language-service"
         }
       ]
     }
   }
   ```

3. Ensure your editor uses the workspace TypeScript version:
   This step is critical for the language service to function properly. The plugin must run on the TypeScript version installed in your project, not the one bundled with your editor.

   Tip: In VS Code or Cursor, you can select the workspace TypeScript version by opening a TypeScript file, clicking on the TypeScript version number in the status bar, and selecting "Use Workspace Version".

4. You're ready to play! Writing the following code in a file.ts inside your project, should result in an error diagnostic appearing:
   ```ts
   import { Effect } from "effect"

   Effect.log("Hello world!")
   // ^- should be run or assigned to a variable!
   ```

### Features

The Effect Language Service provides a comprehensive set of features:

#### Intelligent Quick Info

Hover over Effect values to see extended type information and detailed insights:
- **Effect Types**: See comprehensive type information for Effect values
- **Generator Parameters**: When hovering over `yield*` in `Effect.gen`, view detailed information about the yielded value
- **Layer Composition**: Visualize layer dependencies with interactive graphs
- **Service Dependencies**: Understand service requirements and their relationships

#### Real-time Diagnostics

Catch common mistakes as you write code:
- **Floating Effects**: Detect Effect values that aren't assigned or yielded
- **Layer Issues**: Catch layer requirement leaks and scope violations
- **Unnecessary Code**: Identify redundant `Effect.gen` or `pipe()` calls
- **Error Handling**: Detect misuse of catch functions on Effects that cannot fail
- **Version Conflicts**: Detect when multiple Effect versions are present

#### Smart Completions

Speed up your coding with context-aware suggestions:
- **Generator Boilerplate**: Quickly scaffold `Effect.gen` functions
- **Scaffolds**: For `Effect.Service`, `Data.TaggedError` and friends
- **Self Parameters**: Auto-complete for `Self` parameters in service declarations

#### Powerful Refactors

Transform your code with intelligent automated refactors:
- **Async to Effect**: Convert async functions to Effect using `gen` or `fn` syntax
- **Error Generation**: Generate tagged errors from promise-based code
- **Service Accessors**: Automatically implement service accessor functions
- **Pipe Conversion**: Transform function calls to pipe syntax

### Configuration

The Effect LSP provides configuration options such as changing severity or disabling diagnostic messages.

### Build-Time Diagnostics

While LSPs only activate during editing sessions, you may want to catch diagnostics during your build process. The Effect Language Service allows you to patch your local TypeScript installation so diagnostics are emitted while performing type checking.

To enable it, run:
```bash
effect-language-service patch
```

To make this automatic for all developers, add it to your `package.json`:
```json
{
  "scripts": {
    "prepare": "effect-language-service patch"
  }
}
```

## VS Code / Cursor Extension

Caution: The editor extension does not include the Effect LSP! Installation of that should be performed per-project.

The editor extension provides utilities for debugging your Effect applications.

### Installation

The extension can be installed from the [Code Marketplace](https://marketplace.visualstudio.com/items?itemName=effectful-tech.effect-vscode) or [Open VSX Marketplace](https://open-vsx.org/extension/effectful-tech/effect-vscode).

### Debugger Features

With the Effect Extension, you'll find new sections inside the Debug section:
- **Context**: Inspect the context of the currently paused Effect Fiber
- **Span Stack**: Shows the stack of telemetry spans
- **Fibers**: List all Effect Fibers running in your application
- **Breakpoints**: Enable "pause on defect"

### Built-in Tracer and Metrics

The built-in tracer and metrics view allows you to quickly see Effect Spans and Metrics without spinning up an entire telemetry service.

To enable it, install the following dependency:
```bash
npm install @effect/experimental
```

You can then import and use the DevTools module in your Effect app:
```ts
import { DevTools } from "@effect/experimental"
import { NodeRuntime, NodeSocket } from "@effect/platform-node"
import { Effect, Layer } from "effect"

const program = Effect.log("Hello!").pipe(
  Effect.delay(2000),
  Effect.withSpan("Hi", { attributes: { foo: "bar" } }),
  Effect.forever,
)
const DevToolsLive = DevTools.layer()

program.pipe(
  Effect.provide(DevToolsLive),
  NodeRuntime.runMain
)
```
