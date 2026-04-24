---
title: Button
source: https://kobalte.dev/docs/core/components/button
description: Enables users to trigger an action or event.
---

# Button

Enables users to trigger an action or event, such as submitting a form, opening a dialog, or performing a delete operation.

## Import

```ts
import { Button } from "@kobalte/core/button";
```

## Features

- Native HTML `<button>` element support.
- `<a>` and custom element type support via the WAI ARIA Button design pattern.
- Keyboard event support for Space and Enter keys.

## Example

```tsx
import { Button } from "@kobalte/core/button";
import "./style.css";

function App() {
  return <Button class="button">Click me</Button>;
}
```

```css
.button {
  appearance: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: auto;
  outline: none;
  border-radius: 6px;
  padding: 0 16px;
  background-color: hsl(200 98% 39%);
  color: white;
  font-size: 16px;
  transition: 250ms background-color;
}

.button:hover {
  background-color: hsl(201 96% 32%);
}

.button:focus-visible {
  outline: 2px solid hsl(200 98% 39%);
  outline-offset: 2px;
}

.button:active {
  background-color: hsl(201 90% 27%);
}
```

## API Reference

### Button Props

| Prop     | Description                           |
| :------- | :------------------------------------ |
| disabled | `boolean` - Whether the button is disabled. |

### Data Attributes

| Data attribute | Description                          |
| :------------- | :---------------------------------- |
| data-disabled  | Present when the button is disabled. |

## Rendered elements

| Component | Default rendered element |
| :-------- | :----------------------- |
| `Button`  | `button`                 |

## Accessibility

### Keyboard Interactions

| Key              | Description           |
| :--------------- | :-------------------- |
| Space           | Activates the button. |
| Enter          | Activates the button. |
