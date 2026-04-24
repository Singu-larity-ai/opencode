---
title: Dropdown Menu
source: https://kobalte.dev/docs/core/components/dropdown-menu
description: A menu that appears when a user clicks or hovers on an element.
---

# Dropdown Menu

A menu that appears when a user clicks or hovers on an element, showing a list of actions.

## Import

```ts
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
```

## Features

- Follows the [WAI ARIA Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menu/) design pattern.
- Supports submenus.
- Supports checkable items (tri-state).
- Supports disabled items.
- Full keyboard navigation.
- Can be controlled or uncontrolled.

## Anatomy

```tsx
<DropdownMenu>
  <DropdownMenu.Trigger />
  <DropdownMenu.Portal>
    <DropdownMenu.Content>
      <DropdownMenu.Item />
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.GroupLabel />
        <DropdownMenu.Item />
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu>
```

## API Reference

### DropdownMenu Props

| Prop          | Description                                                    |
| :------------ | :------------------------------------------------------------ |
| open          | `boolean` - The controlled open state of the menu.           |
| defaultOpen   | `boolean` - The default open state when initially rendered.    |
| onOpenChange  | `(open: boolean) => void` - Event handler called when open state changes. |

### DropdownMenu.Item Props

| Prop     | Description                                                    |
| :------- | :------------------------------------------------------------ |
| disabled | `boolean` - Whether the item is disabled.                      |
| checked  | `boolean` - Whether the item is checked (for checkable items). |
| closeOnSelect | `boolean` - Whether the menu should close when the item is selected. |

### Data Attributes

| Data attribute   | Description                              |
| :--------------- | :-------------------------------------- |
| data-disabled    | Present when the item is disabled.       |
| data-checked     | Present when the item is checked.         |
| data-indeterminate | Present when the item is indeterminate. |
| data-highlighted | Present when the item is highlighted.   |

## Rendered elements

| Component                 | Default rendered element |
| :------------------------ | :---------------------- |
| `DropdownMenu`            | `div`                   |
| `DropdownMenu.Trigger`     | `button`                |
| `DropdownMenu.Portal`      | `Portal`                |
| `DropdownMenu.Content`     | `div`                   |
| `DropdownMenu.Item`        | `div`                   |
| `DropdownMenu.Separator`   | `div`                   |
| `DropdownMenu.Group`       | `div`                   |
| `DropdownMenu.GroupLabel`  | `span`                  |
| `DropdownMenu.Sub`         | `div`                   |
| `DropdownMenu.SubTrigger`  | `div`                   |
| `DropdownMenu.SubContent`  | `div`                   |
