---
title: Effects
source: https://docs.solidjs.com/concepts/effects
description: Effects are functions that are triggered when the signals they depend on change. They play a crucial role in managing side effects.
---

# Effects

Effects are functions that are triggered when the signals they depend on change. They play a crucial role in managing side effects, which are actions that occur outside of the application's scope, such as DOM manipulations, data fetching, and subscriptions.

## Using an effect

An effect is created using the `createEffect` function:

```javascript
import { createEffect } from "solid-js";

const [count, setCount] = createSignal(0);

createEffect(() => {
  console.log(count());
});
```

## Managing dependencies

Effects can be set to observe any number of dependencies. Upon initialization, an effect will run once, regardless of whether it has any dependencies.

## Subscribing to signals

When an effect is set to observe a signal, it creates a subscription to it.

### Nested effects

When working with effects, it is possible to nest them within each other.

## Lifecycle functions

### onMount

In situations where you just want to run a side effect once, you can use the `onMount` function.

### onCleanup

`onCleanup` is helpful for cleaning up a task when it is no longer needed. `onCleanup` will run whenever the component unmounts.
