---
title: Accordion
source: https://kobalte.dev/docs/core/components/accordion
description: A vertically stacked set of interactive headings that each reveal an associated section of content.
---

# Accordion

A vertically stacked set of interactive headings that each reveal an associated section of content.

## Import

```ts
import { Accordion } from "@kobalte/core/accordion";
// or
import { Root, Item, ... } from "@kobalte/core/accordion";
```

## Features

- Follow the [WAI ARIA Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) design pattern.
- Full keyboard navigation.
- Can expand one or multiple items.
- Can be controlled or uncontrolled.

## Anatomy

```tsx
<Accordion>
  <Accordion.Item>
    <Accordion.Header>
      <Accordion.Trigger />
    </Accordion.Header>
    <Accordion.Content />
  </Accordion.Item>
</Accordion>
```

## Example

```tsx
import { Accordion } from "@kobalte/core/accordion";
import { ChevronDownIcon } from "some-icon-library";
import "./style.css";

function App() {
  return (
    <Accordion class="accordion" defaultValue={["item-1"]}>
      <Accordion.Item class="accordion__item" value="item-1">
        <Accordion.Header class="accordion__item-header">
          <Accordion.Trigger class="accordion__item-trigger">
            <span>Is it accessible?</span>
            <ChevronDownIcon class="accordion__item-trigger-icon" aria-hidden />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content class="accordion__item-content">
          <p class="accordion__item-content-text">
            Yes. It adheres to the WAI-ARIA design pattern.
          </p>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
```

## Usage

### Default value

```tsx
<Accordion defaultValue={["item-2"]}>
  <Accordion.Item value="item-1">{/* ... */}</Accordion.Item>
  <Accordion.Item value="item-2">{/* ... */}</Accordion.Item>
</Accordion>
```

### Controlled value

```tsx
import { createSignal } from "solid-js";

function ControlledExample() {
  const [expandedItem, setExpandedItem] = createSignal(["item-2"]);

  return (
    <Accordion value={expandedItem()} onChange={setExpandedItem}>
      <Accordion.Item value="item-1">{/* ... */}</Accordion.Item>
      <Accordion.Item value="item-2">{/* ... */}</Accordion.Item>
    </Accordion>
  );
}
```

### Collapsible item

```tsx
<Accordion collapsible>
  <Accordion.Item value="item-1">{/* ... */}</Accordion.Item>
  <Accordion.Item value="item-2">{/* ... */}</Accordion.Item>
</Accordion>
```

### Allow expanding multiple items

```tsx
<Accordion multiple>
  <Accordion.Item value="item-1">{/* ... */}</Accordion.Item>
  <Accordion.Item value="item-2">{/* ... */}</Accordion.Item>
</Accordion>
```

## API Reference

### Accordion Props

| Prop            | Description                                                                 |
| :-------------- | :-------------------------------------------------------------------------- |
| value           | `string[]` - The controlled value of the accordion item(s) to expand.        |
| defaultValue    | `string[]` - The value of the accordion item(s) to expand when initially rendered. |
| onChange        | `(value: string[]) => void` - Event handler called when the value changes.   |
| multiple        | `boolean` - Whether multiple items can be opened at the same time.           |
| collapsible     | `boolean` - When `multiple` is `false`, allows closing content when clicking trigger. |
| shouldFocusWrap | `boolean` - Whether focus should wrap around when the end/start is reached. |

### Accordion.Item Props

| Prop       | Description                                      |
| :--------- | :---------------------------------------------- |
| value      | `string` - A unique value for the item.         |
| disabled   | `boolean` - Whether the item is disabled.        |
| forceMount | `boolean` - Used to force mounting when more control is needed. |

### Data Attributes

| Data attribute | Description                                  |
| :------------- | :------------------------------------------- |
| data-expanded  | Present when the accordion item is expanded.   |
| data-closed    | Present when the accordion item is collapsed. |
| data-disabled  | Present when the accordion item is disabled.  |

## Rendered elements

| Component           | Default rendered element |
| :------------------ | :---------------------- |
| `Accordion`         | `div`                   |
| `Accordion.Item`    | `div`                   |
| `Accordion.Header`  | `h3`                    |
| `Accordion.Trigger` | `button`                |
| `Accordion.Content` | `div`                   |

## Accessibility

### Keyboard Interactions

| Key                               | Description                                               |
| :-------------------------------- | :------------------------------------------------------- |
| Space/Enter                       | When focus is on a trigger, expands the section.         |
| ArrowDown                         | Moves focus to the next trigger.                         |
| ArrowUp                           | Moves focus to the previous trigger.                     |
| Home                              | Moves focus to the first trigger.                        |
| End                               | Moves focus to the last trigger.                         |
