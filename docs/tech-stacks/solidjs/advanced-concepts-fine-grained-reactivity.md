---
title: Fine-grained reactivity
source: https://docs.solidjs.com/concepts/advanced-concepts/fine-grained-reactivity
description: In a fine-grained reactive system an application will have the ability to make highly targeted and specific updates.
---

# Fine-grained reactivity

Reactivity ensures automatic responses to data changes, eliminating the need for manual updates to the user interface (UI). By connecting UI elements to the underlying data, updates become automated. In a fine-grained reactive system an application will now have the ability to make highly targeted and specific updates.

**Note:** If you're new to the concept of reactivity and want to learn the basics, consider starting with our intro to reactivity guide.

## Reactive primitives

In Solid's reactivity system, there are two key elements: signals and observers.

### Understanding signals

Signals are like mutable variables that can point to a value now and another in the future.

### Effects

Effects are functions that are triggered when the signals they depend on point to a different value.

## Building a reactive system

To grasp the concept of reactivity, it is often helpful to construct a reactive system from scratch.

### Making a system reactive

Reactivity emerges when linking `createSignal` and `createEffect`.

### Validating the reactive system

To validate the system, increment the count value at one-second intervals.

## Managing lifecycles in a reactive system

In reactive systems, various elements, often referred to as "nodes", are interconnected.

### Synchronous nature of effect tracking

The reactivity system described above operates synchronously.

### Handling asynchronous effects

While the basic reactivity system is synchronous, frameworks like Solid offer more advanced features to handle asynchronous scenarios.
