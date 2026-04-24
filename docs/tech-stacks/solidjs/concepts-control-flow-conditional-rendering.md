---
title: Control flow - Conditional rendering
source: https://docs.solidjs.com/concepts/control-flow/conditional-rendering
description: Conditional rendering is the process of displaying different UI elements based on certain conditions. Solid offers dedicated components to handle this.
---

# Control flow - Conditional rendering

Conditional rendering is the process of displaying different UI elements based on certain conditions. This is a common pattern in UI development, and is often used to show or hide elements based on user input, data, or other conditions.

Solid offers dedicated components to handle conditional rendering in a more straightforward and readable way.

## Show

`<Show>` renders its children when a condition is evaluated to be true.

```jsx
import { Show } from "solid-js";
<Show when={data.loading}>
  <div>Loading...</div>
</Show>;
```

`<Show>` has the `fallback` property that can be used to specify the content to be rendered when the condition evaluates to false.

## Switch and Match

When there are multiple conditions that need to be handled, it can be difficult to manage the logic flow with nested `<Show>` components. Solid has the `<Switch>` and `<Match>` components for this purpose.

```jsx
import { Switch, Match } from "solid-js";
<Switch>
  <Match when={condition1}>
    <p>Outcome 1</p>
  </Match>
  <Match when={condition2}>
    <p>Outcome 2</p>
  </Match>
</Switch>;
```
