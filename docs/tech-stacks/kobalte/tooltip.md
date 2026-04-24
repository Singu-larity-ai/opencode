---
title: Tooltip
source: https://kobalte.dev/docs/core/components/tooltip
description: A popup that displays information related to an element.
---

# Tooltip

A popup that displays information related to an element when the element receives focus or is hovered.

## Import

```ts
import { Tooltip } from "@kobalte/core/tooltip";
```

## Features

- Follows the [WAI ARIA Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) design pattern.
- Automatically manages focus.
- Supports positioning.
- Can be controlled or uncontrolled.

## Anatomy

```tsx
<Tooltip>
  <Tooltip.Trigger />
  <Tooltip.Portal>
    <Tooltip.Content>
      <Tooltip.Arrow />
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip>
```

## API Reference

### Tooltip Props

| Prop          | Description                                                    |
| :------------ | :------------------------------------------------------------ |
| open          | `boolean` - The controlled open state of the tooltip.         |
| defaultOpen   | `boolean` - The default open state when initially rendered.    |
| onOpenChange  | `(open: boolean) => void` - Event handler called when open state changes. |
| openDelay     | `number` - The delay in milliseconds before the tooltip opens. |
| closeDelay    | `number` - The delay in milliseconds before the tooltip closes. |
| placement     | `Placement` - The placement of the tooltip.                   |

### Data Attributes

| Data attribute | Description                                    |
| :------------- | :-------------------------------------------- |
| data-expanded  | Present when the tooltip is open.              |
| data-closed    | Present when the tooltip is closed.            |

## Rendered elements

| Component              | Default rendered element |
| :-------------------- | :---------------------- |
| `Tooltip`             | `div`                    |
| `Tooltip.Trigger`     | `button`                 |
| `Tooltip.Portal`      | `Portal`                 |
| `Tooltip.Content`      | `div`                    |
| `Tooltip.Arrow`        | `svg`                    |
