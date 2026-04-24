---
title: Complex state management
source: https://docs.solidjs.com/guides/complex-state-management
description: As applications grow and start to involve many components, more intricate user interactions, Solid stores can help improve the readability and management of your code.
---

# Complex state management

As applications grow and start to involve many components, more intricate user interactions, and possibly communication with backend services, you may find that staying organized with more basic state management methods can become difficult to maintain.

## Introducing stores

Through recreating this list using Stores, you will see how stores can improve the readability and management of your code.

## Creating a store

To reduce the amount of signals that were used in the original example, you can use a store:

```javascript
const [state, setState] = createStore({
  tasks: [],
  numberOfTasks: 0,
});
```

## Accessing state values

Once you have created your store, the values can be accessed directly through the first value returned by the `createStore` function.

## Making changes to the store

When you want to modify your store, you use the second element returned by the `createStore` function.

### Adding to an array

To add an element to an array, in this case the new task, you can append to the next index of the array.

#### Mutating state with produce

In situations where you need to make multiple `setState` calls and target multiple properties, you can use Solid's `produce` utility function.

## State sharing

As applications grow and become more complex, sharing state between components can become a challenge. Solid provides context to solve this problem.
