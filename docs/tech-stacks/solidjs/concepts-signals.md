---
title: Signals
source: https://docs.solidjs.com/concepts/signals
description: Signals are the primary means of managing state in your Solid application. They provide a way to store and update values, and are the foundation of reactivity in Solid.
---

# Signals

Signals are the primary means of managing state in your Solid application. They provide a way to store and update values, and are the foundation of reactivity in Solid.

Signals can be used to represent any kind of state in your application, such as the current user, the current page, or the current theme.

## Creating a signal

You can create a signal by calling the `createSignal` function:

```javascript
import { createSignal } from "solid-js";
const [count, setCount] = createSignal(0);
//       ^ getter  ^ setter
```

## Accessing values

The getter function returned by `createSignal` is used to access the value of the signal:

```javascript
console.log(count()); // output: 0
```

## Updating values

The setter function returned by `createSignal` is used to update the value of the signal:

```javascript
setCount(count() + 1);
console.log(count()); // output: 1
```

## Reactivity

Signals are reactive, which means that they automatically update when their value changes.
