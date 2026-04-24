---
title: "Getting Started: Importing Effect"
description: "How to import and use Effect modules"
source: "https://effect.website/docs/getting-started/importing-effect/"
---

# Importing Effect

If you're just getting started, you might feel overwhelmed by the variety of modules and functions that Effect offers. However, rest assured that you don't need to worry about all of them right away.

This page will provide a simple introduction on how to import modules and functions.

## Installing Effect

If you haven't already installed the `effect` package:
```bash
npm install effect
```

By installing this package, you get access to the core functionality of Effect.

## Importing Modules and Functions

Once you have installed the `effect` package, you can start using its modules and functions in your projects:

```ts
import { Effect } from "effect"
```

Now you have access to the Effect module, which is the heart of the Effect library.

## Namespace imports

You can also import using a namespace import:
```ts
import * as Effect from "effect/Effect"
```

Both forms allow you to access the functionalities provided by the `Effect` module.

However, an important consideration is **tree shaking**. Named imports may generate tree shaking issues when a bundler doesn't support deep scope analysis. Bundlers that support deep scope analysis include Rollup and Webpack 5+.

## Functions vs Methods

In the Effect ecosystem, libraries often expose functions rather than methods. This design choice is important for two key reasons: tree shakeability and extendibility.

### Tree Shakeability

Tree shakeability refers to the ability of a build system to eliminate unused code during the bundling process. Functions are tree shakeable, while methods are not.

### Extendibility

With functions, extending functionality is much simpler. You can define your own "extension methods" as plain old functions without modifying prototypes.

## Commonly Used Functions

As you start your adventure with Effect, focus on some commonly used functions for creating and running `Effect`s and building pipelines. In upcoming guides, we will explore essential functions for creating and running `Effect`s.

But before we dive into those, let's start from the very heart of Effect: understanding the `Effect` type. This will lay the groundwork for understanding how Effect brings composability, type safety, and error handling into your applications.
