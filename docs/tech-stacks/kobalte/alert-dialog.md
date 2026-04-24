---
title: Alert Dialog
source: https://kobalte.dev/docs/core/components/alert-dialog
description: A modal dialog that interrupts the user's workflow to communicate an important message.
---

# Alert Dialog

A modal dialog that interrupts the user's workflow to communicate an important message and acquire a response.

## Import

```ts
import { AlertDialog } from "@kobalte/core/alert-dialog";
```

## Features

- Follow the [WAI ARIA Alert Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) design pattern.
- Supports modal and non-modal modes.
- Provides screen reader announcements via rendered title and description.
- Focus is trapped and scrolling is blocked while it is open.
- Pressing Escape closes the alert dialog.
- Can be controlled or uncontrolled.

## Anatomy

```tsx
<AlertDialog>
  <AlertDialog.Trigger />
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Content>
      <AlertDialog.CloseButton />
      <AlertDialog.Title />
      <AlertDialog.Description />
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog>
```

## API Reference

### AlertDialog Props

| Prop          | Description                                                                              |
| :------------ | :-------------------------------------------------------------------------------------- |
| open          | `boolean` - The controlled open state of the dialog.                                     |
| defaultOpen   | `boolean` - The default open state when initially rendered.                              |
| onOpenChange  | `(open: boolean) => void` - Event handler called when the open state changes.            |
| modal         | `boolean` - Whether the dialog should be the only visible content for screen readers.     |
| preventScroll | `boolean` - Whether the scroll should be locked even if the alert dialog is not modal.    |
| forceMount    | `boolean` - Used to force mounting when more control is needed.                          |

### AlertDialog.Content Props

| Prop                 | Description                                                    |
| :------------------- | :------------------------------------------------------------- |
| onOpenAutoFocus      | Event handler called when focus moves into the component.       |
| onCloseAutoFocus     | Event handler called when focus moves to the trigger.          |
| onEscapeKeyDown      | Event handler called when the escape key is pressed.           |
| onPointerDownOutside | Event handler called when pointer event occurs outside.         |
| onFocusOutside       | Event handler called when focus moves outside.                 |
| onInteractOutside    | Event handler called when interaction happens outside.          |

## Rendered elements

| Component                 | Default rendered element |
| :------------------------ | :----------------------- |
| `AlertDialog`             | none                     |
| `AlertDialog.Trigger`     | `button`                 |
| `AlertDialog.Portal`     | `Portal`                 |
| `AlertDialog.Overlay`     | `div`                    |
| `AlertDialog.Content`     | `div`                    |
| `AlertDialog.CloseButton` | `button`                 |
| `AlertDialog.Title`       | `h2`                     |
| `AlertDialog.Description` | `p`                      |
