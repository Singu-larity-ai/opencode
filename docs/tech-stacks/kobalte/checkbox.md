---
title: Checkbox
source: https://kobalte.dev/docs/core/components/checkbox
description: A control that allows the user to toggle between checked and not checked.
---

# Checkbox

A control that allows the user to toggle between checked and not checked.

## Import

```ts
import { Checkbox } from "@kobalte/core/checkbox";
```

## Features

- Built with a native HTML `<input>` element, which is visually hidden to allow custom styling.
- Syncs with form reset events.
- Labeling support for assistive technology.
- Support for description and error message help text.
- Can be controlled or uncontrolled.

## Anatomy

```tsx
<Checkbox>
  <Checkbox.Input />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label />
  <Checkbox.Description />
  <Checkbox.ErrorMessage />
</Checkbox>
```

## Example

```tsx
import { Checkbox } from "@kobalte/core/checkbox";
import { CheckIcon } from "some-icon-library";
import "./style.css";

function App() {
  return (
    <Checkbox class="checkbox">
      <Checkbox.Input class="checkbox__input" />
      <Checkbox.Control class="checkbox__control">
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label class="checkbox__label">Subscribe</Checkbox.Label>
    </Checkbox>
  );
}
```

## Usage

### Default checked

```tsx
<Checkbox defaultChecked>...</Checkbox>
```

### Controlled checked

```tsx
import { createSignal } from "solid-js";

function ControlledExample() {
  const [checked, setChecked] = createSignal(false);

  return (
    <>
      <Checkbox checked={checked()} onChange={setChecked}>
        ...
      </Checkbox>
      <p>You are {checked() ? "subscribed" : "unsubscribed"}.</p>
    </>
  );
}
```

## API Reference

### Checkbox Props

| Prop            | Description                                                    |
| :-------------- | :------------------------------------------------------------ |
| checked         | `boolean` - The controlled checked state of the checkbox.     |
| defaultChecked  | `boolean` - The default checked state when initially rendered.  |
| onChange        | `(checked: boolean) => void` - Event handler called when checked state changes. |
| indeterminate   | `boolean` - Whether the checkbox is in an indeterminate state.  |
| name            | `string` - The name of the checkbox, used when submitting an HTML form. |
| value           | `string` - The value of the checkbox.                          |
| validationState | `'valid' \| 'invalid'` - Whether the checkbox is valid/invalid. |
| required        | `boolean` - Whether the user must check the checkbox.         |
| disabled        | `boolean` - Whether the checkbox is disabled.                  |
| readOnly        | `boolean` - Whether the checkbox can be checked but not changed. |

### Data Attributes

| Data attribute     | Description                                              |
| :----------------- | :------------------------------------------------------ |
| data-valid         | Present when the checkbox is valid.                      |
| data-invalid       | Present when the checkbox is invalid.                    |
| data-required      | Present when the checkbox is required.                   |
| data-disabled      | Present when the checkbox is disabled.                   |
| data-readonly      | Present when the checkbox is read only.                  |
| data-checked       | Present when the checkbox is checked.                    |
| data-indeterminate | Present when the checkbox is in an indeterminate state.   |

## Rendered elements

| Component               | Default rendered element |
| :---------------------- | :---------------------- |
| `Checkbox`              | `div`                   |
| `Checkbox.Input`        | `input`                 |
| `Checkbox.Control`      | `div`                   |
| `Checkbox.Indicator`    | `div`                   |
| `Checkbox.Label`        | `label`                 |
| `Checkbox.Description`  | `div`                   |
| `Checkbox.ErrorMessage` | `div`                   |
