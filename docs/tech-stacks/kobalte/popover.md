---
title: Popover
source: https://kobalte.dev/docs/core/components/popover
description: A window overlaid on the primary content to show focused content.
---

# Popover

A window overlaid on the primary content to show focused content.

## Import

```ts
import { Popover } from "@kobalte/core/popover";
```

## Features

- Follows the [WAI ARIA Popover](https://www.w3.org/WAI/ARIA/apg/patterns/popover/) design pattern.
- Automatically manages focus.
- Supports modal and non-modal modes.
- Can be controlled or uncontrolled.

## Anatomy

```tsx
<Popover>
  <Popover.Trigger />
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content>
      <Popover.Arrow />
      <Popover.Title />
      <Popover.Description />
      <Popover.CloseButton />
    </Popover.Content>
  </Popover.Portal>
</Popover>
```

## Example

```tsx
import { Popover } from "@kobalte/core/popover";
import { CrossIcon } from "some-icon-library";

function App() {
  return (
    <Popover>
      <Popover.Trigger class="popover__trigger">Learn more</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content class="popover__content">
          <Popover.Arrow />
          <Popover.Title>About Kobalte</Popover.Title>
          <Popover.CloseButton>
            <CrossIcon />
          </Popover.CloseButton>
          <Popover.Description>
            A UI toolkit for building accessible web apps...
          </Popover.Description>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
```

## API Reference

### Popover Props

| Prop          | Description                                                    |
| :------------ | :------------------------------------------------------------ |
| open          | `boolean` - The controlled open state of the popover.         |
| defaultOpen   | `boolean` - The default open state when initially rendered.    |
| onOpenChange  | `(open: boolean) => void` - Event handler called when open state changes. |
| modal         | `boolean` - Whether the popover should be modal.              |
| forceMount    | `boolean` - Used to force mounting when more control is needed. |

### Data Attributes

| Data attribute | Description                                    |
| :------------- | :-------------------------------------------- |
| data-expanded  | Present when the popover is open.              |
| data-closed    | Present when the popover is closed.            |

## Rendered elements

| Component              | Default rendered element |
| :-------------------- | :---------------------- |
| `Popover`             | `div`                    |
| `Popover.Trigger`     | `button`                 |
| `Popover.Portal`      | `Portal`                 |
| `Popover.Overlay`      | `div`                    |
| `Popover.Content`      | `div`                    |
| `Popover.Arrow`        | `svg`                    |
| `Popover.Title`        | `h2`                     |
| `Popover.Description`  | `p`                      |
| `Popover.CloseButton`  | `button`                 |
