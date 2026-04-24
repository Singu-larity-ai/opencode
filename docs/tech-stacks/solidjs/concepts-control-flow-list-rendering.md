---
title: Control flow - List rendering
source: https://docs.solidjs.com/concepts/control-flow/list-rendering
description: List rendering allows you to generate multiple elements from a collection of data, such as an array or object.
---

# Control flow - List rendering

List rendering allows you to generate multiple elements from a collection of data, such as an array or object, where each element corresponds to an item in the collection.

When dealing with dynamic data, Solid offers two ways to render lists: the `<For>` and `<Index>` components.

## For

`<For>` is a looping component that allows you to render elements based on the contents of an array or object.

```jsx
import { For } from "solid-js"
<For each={data()}>
  {(item, index) =>
    // rendering logic for each element
  }
</For>
```

## Index

`<Index>`, similar to `<For>`, is a looping component that allows you to render elements based on the contents of an array or object. However, when the order and length of the list remain stable, but the content may change frequently, `<Index>` is a better option because it results in fewer re-renders.

```jsx
import { Index } from "solid-js"
<Index each={data()}>
  {(item, index) =>
    // rendering logic for each element
  }
</Index>
```

## Index vs For

`<For>` is designed to be used when the order and length of the list may change frequently. `<Index>` is designed to be used when the order and length of the list remain stable, but the content may change frequently.
