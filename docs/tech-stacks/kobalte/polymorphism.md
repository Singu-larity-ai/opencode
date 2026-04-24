---
title: Polymorphism
source: https://kobalte.dev/docs/core/overview/polymorphism
description: Using polymorphism to change the rendered element or component in Kobalte
---

# Polymorphism

Kobalte components that render a DOM element support polymorphism via the `as` prop. This allows you to change the rendered element or component while preserving behavior, accessibility, and state management.

## Basic usage

Use `as` with a native element or a custom Solid component.

```tsx
import { Tabs } from "@kobalte/core/tabs";
import { MyCustomButton } from "./components";

function App() {
  return (
    <Tabs>
      <Tabs.List>
        <Tabs.Trigger value="one" as="a">
          A Trigger
        </Tabs.Trigger>
        <Tabs.Trigger value="one" as={MyCustomButton}>
          Custom Button Trigger
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="one">Content one</Tabs.Content>
    </Tabs>
  );
}
```

## Using `as` callbacks

For full control over which props are passed, `as` can also be a callback:

```tsx
import { Tabs } from "@kobalte/core/tabs";
import { MyCustomButton } from "./components";

function App() {
  return (
    <Tabs>
      <Tabs.List>
        <Tabs.Trigger
          value="one"
          as={props => (
            <MyCustomButton value="custom" {...props} />
          )}
        >
          Custom Button Trigger
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="one">Content one</Tabs.Content>
    </Tabs>
  );
}
```

## Event lifecycle

Custom event handlers defined on a Kobalte component are called *before* Kobalte's internal handlers.

## Component Prop Types

Every Kobalte component that renders an element exposes four core types:
- `ComponentOptions`
- `ComponentCommonProps<T>`
- `ComponentRenderProps`
- `ComponentProps<T>`

### `ComponentOptions`
Custom props consumed internally by Kobalte.

### `ComponentCommonProps<T>`
Optional HTML attributes that will be accepted and forwarded to the rendered DOM node.

### `ComponentRenderProps`
Extends `ComponentCommonProps` with attributes that are passed to the DOM node and fully controlled by Kobalte.

### `ComponentProps<T>`
Public props type exported by the component.
