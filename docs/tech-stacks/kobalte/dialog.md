---
title: Dialog
source: https://kobalte.dev/docs/core/components/dialog
description: A window overlaid on either the primary window or another dialog window.
---

# Dialog

A window overlaid on either the primary window or another dialog window. Content behind a modal dialog is inert.

## Import

```ts
import { Dialog } from "@kobalte/core/dialog";
```

## Features

- Follows the [WAI ARIA Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/) design pattern.
- Supports modal and non-modal modes.
- Provides screen reader announcements via rendered title and description.
- Focus is trapped and scrolling is blocked while it is open.
- Pressing Escape closes the dialog.
- Can be controlled or uncontrolled.

## Anatomy

```tsx
<Dialog>
  <Dialog.Trigger />
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.CloseButton />
      <Dialog.Title />
      <Dialog.Description />
    </Dialog.Content>
  </Dialog.Portal>
</Dialog>
```

## Example

```tsx
import { Dialog } from "@kobalte/core/dialog";
import { CrossIcon } from "some-icon-library";
import "./style.css";

function App() {
  return (
    <Dialog>
      <Dialog.Trigger class="dialog__trigger">Open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="dialog__overlay" />
        <div class="dialog__positioner">
          <Dialog.Content class="dialog__content">
            <div class="dialog__header">
              <Dialog.Title class="dialog__title">About Kobalte</Dialog.Title>
              <Dialog.CloseButton class="dialog__close-button">
                <CrossIcon />
              </Dialog.CloseButton>
            </div>
            <Dialog.Description class="dialog__description">
              Kobalte is a UI toolkit for building accessible web apps...
            </Dialog.Description>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
}
```

## API Reference

### Dialog Props

| Prop          | Description                                                    |
| :------------ | :------------------------------------------------------------ |
| open          | `boolean` - The controlled open state of the dialog.          |
| defaultOpen   | `boolean` - The default open state when initially rendered.    |
| onOpenChange  | `(open: boolean) => void` - Event handler called when open state changes. |
| modal         | `boolean` - Whether the dialog should be the only visible content. |
| preventScroll | `boolean` - Whether the scroll should be locked.              |
| forceMount    | `boolean` - Used to force mounting when more control is needed. |

### Dialog.Content Props

| Prop                 | Description                                                    |
| :------------------- | :------------------------------------------------------------ |
| onOpenAutoFocus      | Event handler called when focus moves into the component.     |
| onCloseAutoFocus     | Event handler called when focus moves to the trigger.         |
| onEscapeKeyDown      | Event handler called when the escape key is pressed.          |
| onPointerDownOutside | Event handler called when pointer event occurs outside.       |
| onFocusOutside       | Event handler called when focus moves outside.                |
| onInteractOutside   | Event handler called when interaction happens outside.         |

## Rendered elements

| Component            | Default rendered element |
| :------------------ | :---------------------- |
| `Dialog`             | none                    |
| `Dialog.Trigger`     | `button`                |
| `Dialog.Portal`      | `Portal`                |
| `Dialog.Overlay`     | `div`                   |
| `Dialog.Content`     | `div`                   |
| `Dialog.CloseButton` | `button`                |
| `Dialog.Title`       | `h2`                    |
| `Dialog.Description` | `p`                     |
