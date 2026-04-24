---
title: Switch
source: https://kobalte.dev/docs/core/components/switch
description: A control that allows the user to toggle between on and off states.
---

# Switch

A control that allows the user to toggle between on and off states.

## Import

```ts
import { Switch } from "@kobalte/core/switch";
```

## Features

- Built with a native HTML `<input>` element.
- Syncs with form reset events.
- Full keyboard support.
- Can be controlled or uncontrolled.

## Anatomy

```tsx
<Switch>
  <Switch.Input />
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.Label />
</Switch>
```

## Example

```tsx
import { Switch } from "@kobalte/core/switch";

function App() {
  return (
    <Switch>
      <Switch.Input />
      <Switch.Control class="switch__control">
        <Switch.Thumb class="switch__thumb" />
      </Switch.Control>
      <Switch.Label class="switch__label">Airplane mode</Switch.Label>
    </Switch>
  );
}
```

## API Reference

### Switch Props

| Prop           | Description                                                    |
| :------------- | :------------------------------------------------------------ |
| checked        | `boolean` - The controlled checked state of the switch.       |
| defaultChecked | `boolean` - The default checked state when initially rendered. |
| onChange       | `(checked: boolean) => void` - Event handler called when checked state changes. |
| disabled       | `boolean` - Whether the switch is disabled.                   |
| readOnly       | `boolean` - Whether the switch can be toggled but not changed. |

### Data Attributes

| Data attribute | Description                                    |
| :------------- | :-------------------------------------------- |
| data-checked   | Present when the switch is checked/on.          |
| data-disabled  | Present when the switch is disabled.            |
| data-readonly  | Present when the switch is read only.           |

## Rendered elements

| Component       | Default rendered element |
| :-------------- | :---------------------- |
| `Switch`        | `label`                 |
| `Switch.Input`  | `input`                 |
| `Switch.Control` | `div`                   |
| `Switch.Thumb`  | `div`                   |
| `Switch.Label`  | `span`                  |
