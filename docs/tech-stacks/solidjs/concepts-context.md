---
title: Context
source: https://docs.solidjs.com/concepts/context
description: Context provides a way to pass data through the component tree without having to pass props down manually at every level.
---

# Context

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

## When to use context

When you have a large component tree that requires state to be shared, context can be used. Context can be employed to avoid prop drilling.

## Creating context

Context is created using the `createContext` function:

```javascript
import { createContext } from "solid-js";
export const MyContext = createContext();
```

## Providing context to children

To pass a value to the Provider, you use the `value` prop:

```jsx
<MyContext.Provider value="new value">{props.children}</MyContext.Provider>
```

## Consuming context

Once the values are available to all the components in the context's component tree, they can be accessed using the `useContext` utility.

## Customizing Context Utilities

When an application contains multiple context objects, you can create a custom utility to create a more readable way to access the context values.

## Updating Context Values

Signals offer a way to synchronize and manage data shared across your components using context.

## Debugging with context

`createContext` takes in an optional default value and it is possible it can return `undefined` if not provided.
