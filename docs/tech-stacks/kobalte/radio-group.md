---
title: Radio Group
source: https://kobalte.dev/docs/core/components/radio-group
description: A set of checkable buttons for selecting a single option.
---

# Radio Group

A set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time.

## Import

```ts
import { RadioGroup } from "@kobalte/core/radio-group";
```

## Features

- Follows the [WAI ARIA Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) design pattern.
- Supports horizontal and vertical orientation.
- Supports disabled items and groups.
- Full keyboard navigation.
- Can be controlled or uncontrolled.

## Anatomy

```tsx
<RadioGroup>
  <RadioGroup.Label />
  <RadioGroup.Item>
    <RadioGroup.ItemInput />
    <RadioGroup.ItemControl />
    <RadioGroup.ItemIndicator />
  </RadioGroup.Item>
  <RadioGroup.Description />
</RadioGroup>
```

## Example

```tsx
import { RadioGroup } from "@kobalte/core/radio-group";
import { CheckIcon } from "some-icon-library";

function App() {
  return (
    <RadioGroup value="dog" onChange={console.log}>
      <RadioGroup.Label>Pets</RadioGroup.Label>
      <RadioGroup.Item value="cat">
        <RadioGroup.ItemInput />
        <RadioGroup.ItemControl>
          <RadioGroup.ItemIndicator>
            <CheckIcon />
          </RadioGroup.ItemIndicator>
        </RadioGroup.ItemControl>
        <RadioGroup.ItemLabel>Cat</RadioGroup.ItemLabel>
      </RadioGroup.Item>
      <RadioGroup.Item value="dog">
        <RadioGroup.ItemInput />
        <RadioGroup.ItemControl>
          <RadioGroup.ItemIndicator>
            <CheckIcon />
          </RadioGroup.ItemIndicator>
        </RadioGroup.ItemControl>
        <RadioGroup.ItemLabel>Dog</RadioGroup.ItemLabel>
      </RadioGroup.Item>
    </RadioGroup>
  );
}
```

## API Reference

### RadioGroup Props

| Prop           | Description                                                    |
| :------------- | :------------------------------------------------------------ |
| value          | `string` - The controlled value of the selected item.         |
| defaultValue   | `string` - The default value when initially rendered.          |
| onChange       | `(value: string) => void` - Event handler called when value changes. |
| disabled       | `boolean` - Whether the radio group is disabled.               |
| orientation    | `'horizontal' \| 'vertical'` - The orientation of the group.  |

### RadioGroup.Item Props

| Prop     | Description                                      |
| :------- | :---------------------------------------------- |
| value    | `string` - The unique value of the item.         |
| disabled | `boolean` - Whether the item is disabled.        |

### Data Attributes

| Data attribute   | Description                              |
| :--------------- | :-------------------------------------- |
| data-checked     | Present when the item is checked.         |
| data-disabled    | Present when the item is disabled.        |
| data-highlighted | Present when the item is highlighted.     |

## Rendered elements

| Component                  | Default rendered element |
| :------------------------ | :---------------------- |
| `RadioGroup`               | `fieldset`               |
| `RadioGroup.Label`         | `legend`                 |
| `RadioGroup.Item`          | `div`                    |
| `RadioGroup.ItemInput`     | `input`                  |
| `RadioGroup.ItemControl`   | `div`                    |
| `RadioGroup.ItemIndicator`  | `div`                    |
| `RadioGroup.ItemLabel`     | `span`                   |
| `RadioGroup.Description`   | `div`                    |
