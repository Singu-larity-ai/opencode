---
title: Toggle Group
source: https://kobalte.dev/docs/core/components/toggle-group
description: A set of two-state buttons for selecting one or multiple options.
---

# Toggle Group

A set of two-state buttons for selecting one or multiple options.

## Import

```ts
import { ToggleGroup } from "@kobalte/core/toggle-group";
```

## Features

- Follows the [WAI ARIA Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) design pattern.
- Supports single and multiple selection.
- Supports horizontal and vertical orientation.
- Supports disabled items.
- Can be controlled or uncontrolled.

## Anatomy

```tsx
<ToggleGroup>
  <ToggleGroup.Item value="a" />
  <ToggleGroup.Item value="b" />
  <ToggleGroup.Item value="c" />
</ToggleGroup>
```

## Example

```tsx
import { ToggleGroup } from "@kobalte/core/toggle-group";

function App() {
  return (
    <ToggleGroup multiple defaultValue={["a", "c"]}>
      <ToggleGroup.Item value="a">A</ToggleGroup.Item>
      <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      <ToggleGroup.Item value="c">C</ToggleGroup.Item>
    </ToggleGroup>
  );
}
```

## API Reference

### ToggleGroup Props

| Prop        | Description                                                    |
| :---------- | :------------------------------------------------------------ |
| value       | `string[]` - The controlled value(s) of the selected item(s). |
| defaultValue | `string[]` - The default value(s) when initially rendered.     |
| onChange    | `(value: string[]) => void` - Event handler called when value changes. |
| multiple    | `boolean` - Whether multiple items can be selected.           |
| disabled    | `boolean` - Whether the toggle group is disabled.              |
| orientation | `'horizontal' \| 'vertical'` - The orientation of the group.  |

### ToggleGroup.Item Props

| Prop     | Description                                      |
| :------- | :---------------------------------------------- |
| value    | `string` - The unique value of the item.         |
| disabled | `boolean` - Whether the item is disabled.        |

### Data Attributes

| Data attribute   | Description                              |
| :--------------- | :-------------------------------------- |
| data-pressed     | Present when the item is pressed/selected. |
| data-disabled    | Present when the item is disabled.        |

## Rendered elements

| Component           | Default rendered element |
| :------------------ | :---------------------- |
| `ToggleGroup`       | `div`                   |
| `ToggleGroup.Item`  | `button`                |
