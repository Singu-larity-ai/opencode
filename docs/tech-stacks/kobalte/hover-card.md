---
title: Hover Card
source: https://kobalte.dev/docs/core/components/hover-card
description: A card that appears when hovering over an element.
---

# Hover Card

A card that appears when hovering over an element, showing expanded content.

## Import

```ts
import { HoverCard } from "@kobalte/core/hover-card";
```

## Features

- Follows the [WAI ARIA Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) design pattern.
- Supports multiple open delays.
- Supports controlled and uncontrolled state.
- Full keyboard navigation support.

## Anatomy

```tsx
<HoverCard>
  <HoverCard.Trigger />
  <HoverCard.Portal>
    <HoverCard.Content>
      <HoverCard.Arrow />
    </HoverCard.Content>
  </HoverCard.Portal>
</HoverCard>
```

## API Reference

### HoverCard Props

| Prop          | Description                                                    |
| :------------ | :------------------------------------------------------------ |
| openDelay     | `number` - The delay in milliseconds before the hover card opens. |
| closeDelay    | `number` - The delay in milliseconds before the hover card closes. |
| open          | `boolean` - The controlled open state of the hover card.      |
| defaultOpen   | `boolean` - The default open state when initially rendered.    |
| onOpenChange  | `(open: boolean) => void` - Event handler called when open state changes. |

### Data Attributes

| Data attribute | Description                                    |
| :------------- | :-------------------------------------------- |
| data-expanded  | Present when the hover card is open.            |
| data-closed    | Present when the hover card is closed.          |

## Rendered elements

| Component               | Default rendered element |
| :--------------------- | :---------------------- |
| `HoverCard`            | `div`                    |
| `HoverCard.Trigger`    | `div`                    |
| `HoverCard.Portal`     | `Portal`                 |
| `HoverCard.Content`    | `div`                    |
| `HoverCard.Arrow`      | `svg`                    |
