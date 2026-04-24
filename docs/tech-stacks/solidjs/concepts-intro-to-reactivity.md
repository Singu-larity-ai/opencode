---
title: Intro to reactivity
source: https://docs.solidjs.com/concepts/intro-to-reactivity
description: Reactivity powers the interactivity in Solid applications. This programming paradigm refers to a system's ability to respond to changes in data or state automatically.
---

# Intro to reactivity

**Note**: While this guide is useful for understanding reactive systems, it does use some Solid-specific terminology.

Reactivity powers the interactivity in Solid applications. This programming paradigm refers to a system's ability to respond to changes in data or state automatically. With Solid, reactivity is the basis of its design, ensuring applications stay up-to-date with their underlying data.

## Importance of reactivity

1. Reactivity keeps the user interface (UI) and state in sync, which reduces the need for manual updates.
2. Real-time updates create a more responsive and interactive user experience.

## Reactive principles

### Signals

Signals serve as core elements in reactive systems, playing an important role in data management and system responsiveness. They are responsible for storing and managing data, as well as triggering updates across the system. This is done through the use of getters and setters.

```javascript
const [count, setCount] = createSignal(0);
//     ^ getter  ^ setter
```

- **Getter**: A function responsible for accessing the current value of the signal.
- **Setter**: The function used to modify a signal's value.

### Subscribers

Subscribers are the other core element in reactive systems. They are responsible for tracking changes in signals and updating the system accordingly. They are automated responders that keep the system up-to-date with the latest data changes.

## State management

State management is the process of managing the state of an application. This involves storing and updating data, as well as responding to the changes in it.

## Synchronous vs. asynchronous

Reactive systems are designed to respond to changes in data. These responses can be immediate or delayed, depending on the nature of the system.

### Synchronous reactivity

Synchronous reactivity is Solid's default reactivity mode, where a system responds to changes in a direct and linear fashion.

### Asynchronous reactivity

Asynchronous reactivity is when a system responds to changes in a delayed or non-linear fashion.
