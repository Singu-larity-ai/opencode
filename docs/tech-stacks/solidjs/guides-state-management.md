---
title: State management
source: https://docs.solidjs.com/guides/state-management
description: State management is the process of handling and manipulating data that affects the behavior and presentation of a web application.
---

# State management

State management is the process of handling and manipulating data that affects the behavior and presentation of a web application. Within Solid, state management is facilitated through the use of reactive primitives.

## Managing basic state

State is represented by a signal, which is a reactive primitive that manages state and notifies the UI of any changes.

## Rendering state in the UI

To achieve a dynamic user interface, the UI must be able to reflect the current state of the data.

## Reacting to changes

When the state is updated, any updates are reflected in the UI. However, there may be times when you want to perform additional actions when the state changes.

For this purpose, you can use effects.

## Derived state

When you want to calculate new state values based on existing state values, you can use derived state.

## Lifting state

When you want to share state between components, you can lift state up to a common ancestor component.

## Managing complex state

As applications grow in size and complexity, lifting state can become difficult to manage. Solid offers stores to manage state in a more scalable and maintainable manner.
