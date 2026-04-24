---
title: Select
source: https://kobalte.dev/docs/core/components/select
description: A component that allows users to pick a value from a predefined list.
---

# Select

A component that allows users to pick a value from a predefined list.

## Import

```ts
import { Select } from "@kobalte/core/select";
```

## Features

- Follows the [WAI ARIA Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) design pattern.
- Supports single and multiple selection.
- Supports disabled items and groups.
- Provides screen reader announcements.
- Can be controlled or uncontrolled.

## Anatomy

```tsx
<Select>
  <Select.Trigger>
    <Select.Value />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Content>
      <Select.Listbox />
    </Select.Content>
  </Select.Portal>
</Select>
```

## API Reference

### Select Props

| Prop          | Description                                                    |
| :------------ | :------------------------------------------------------------ |
| options       | `T[]` - The options to render.                                 |
| optionValue   | `(option: T) => string` - A function to get the value of an option. |
| optionTextValue | `(option: T) => string` - A function to get the text representation. |
| optionGroup   | `(option: T) => string` - A function to get the group an option belongs to. |
| value         | `T | T[]` - The controlled value of the select.                     |
| defaultValue  | `T | T[]` - The default value when initially rendered.              |
| onChange     | `(value: T | T[]) => void` - Event handler called when value changes.     |
| placeholder  | `string` - The placeholder text when no value is selected.   |
| multiple     | `boolean` - Whether multiple items can be selected.            |
| disabled     | `boolean` - Whether the select is disabled.                   |
| itemDisabled | `(option: T) => boolean` - Whether an item is disabled.        |

### Data Attributes

| Data attribute   | Description                              |
| :--------------- | :-------------------------------------- |
| data-expanded    | Present when the select is open.         |
| data-closed      | Present when the select is closed.       |
| data-disabled    | Present when the select is disabled.     |
| data-selected    | Present when an item is selected.        |
| data-highlighted | Present when an item is highlighted.     |

## Rendered elements

| Component           | Default rendered element |
| :------------------ | :---------------------- |
| `Select`            | `div`                   |
| `Select.Trigger`    | `button`                 |
| `Select.Value`      | `span`                   |
| `Select.Icon`       | `span`                   |
| `Select.Content`    | `div`                    |
| `Select.Listbox`    | `ul`                     |
| `Select.Item`       | `li`                     |
| `Select.ItemLabel`  | `span`                   |
| `Select.ItemIndicator` | `span`               |
| `Select.Group`      | `li`                     |
| `Select.Separator`  | `li`                     |
