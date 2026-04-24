---
title: Toast
source: https://kobalte.dev/docs/core/components/toast
description: A component that displays brief messages to the user.
---

# Toast

A component that displays brief messages to the user.

## Import

```ts
import { Toast } from "@kobalte/core/toast";
```

## Features

- Follows the [WAI ARIA Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) design pattern.
- Supports queued toasts.
- Supports swipe to dismiss.
- Supports timeout auto-dismiss.
- Can be controlled or uncontrolled.

## Anatomy

```tsx
<Toast.Region>
  <Toast.List>
    <Toast.Item>
      <Toast.Title />
      <Toast.Description />
      <Toast.CloseButton />
    </Toast.Item>
  </Toast.List>
</Toast.Region>
```

## API Reference

### Toast.Region Props

| Prop          | Description                                                    |
| :------------ | :------------------------------------------------------------ |
| maxToasts    | `number` - The maximum number of toasts to show.              |
| pauseWhenPageIsHidden | `boolean` - Whether to pause timers when the page is hidden. |

### Toast.Item Props

| Prop       | Description                                                    |
| :--------- | :------------------------------------------------------------ |
| toastId    | `string \| number` - The unique id of the toast.             |
| timeout    | `number` - The time in milliseconds before the toast closes.  |
| closeOnSwipe | `boolean` - Whether to close the toast when swiped.         |

### Toast API

| Method        | Description                                                    |
| :----------- | :------------------------------------------------------------ |
| toast()       | Creates and shows a new toast.                                 |
| dismiss()     | Dismisses a toast by id.                                       |

### Data Attributes

| Data attribute | Description                                    |
| :------------- | :-------------------------------------------- |
| data-expanded  | Present when the toast is visible.             |
| data-swiping   | Present when the toast is being swiped.         |

## Rendered elements

| Component            | Default rendered element |
| :------------------ | :---------------------- |
| `Toast.Region`       | `div`                   |
| `Toast.List`         | `ul`                    |
| `Toast.Item`         | `li`                    |
| `Toast.Title`         | `div`                   |
| `Toast.Description`   | `div`                   |
| `Toast.CloseButton`   | `button`                |
