---
title: Styling
source: https://kobalte.dev/docs/core/overview/styling
description: Guide to styling Kobalte components with CSS, TailwindCSS, and Vanilla Extract
---

# Styling

Kobalte components are unstyled, allowing you to completely customize the look and feel. Bring your preferred styling solution (vanilla CSS, Tailwind, CSS-in-JS libraries, etc...).

## Styling a component part

All components and their parts accept a `class` prop. This class will be passed through to the DOM element. You can style a component part by targeting the `class` that you provide.

```tsx
import { Popover as KPopover } from "@kobalte/core";
import "./style.css";

export const Popover = () => {
  return (
    <KPopover>
      <KPopover.Trigger class="popover__trigger">
        Open
      </KPopover.Trigger>
      <KPopover.Content class="popover__content">
        ...
      </KPopover.Content>
    </KPopover>
  );
};
```

```css
.popover__trigger {
  /* The popover trigger style. */
}

.popover__content {
  /* The popover content style. */
}
```

## Styling a state

When a component or its parts can have multiple states, we automatically attach `data-*` attributes that represents the specific state. For example, a popover's trigger can have:

- `data-expanded` — When the popover is expanded.
- `data-disabled` — When the popover is disabled.

You can style a component state by targeting the `data-*` attributes added by Kobalte.

```css
.popover__trigger[data-disabled] {
  /* The popover trigger style when disabled. */
}
```

## Using the TailwindCSS plugin

If you are using [TailwindCSS](https://tailwindcss.com/), you can use the `@kobalte/tailwindcss` plugin to target Kobalte's `data-*` attributes with modifiers like `ui-expanded:*`.

### Installation

```bash
npm install @kobalte/tailwindcss
# or
yarn add @kobalte/tailwindcss
# or
pnpm add @kobalte/tailwindcss
```

### Usage

Add the plugin to your `tailwind.config.js`:

```js
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    require("@kobalte/tailwindcss"),
    // or with a custom prefix:
    require("@kobalte/tailwindcss")({ prefix: "kb" }),
  ],
};
```

Style your component:

```tsx
import { Popover as KPopover } from "@kobalte/core/popover";

export const Popover = () => (
  <KPopover>
    <KPopover.Trigger class="inline-flex px-4 py-2 rounded ui-disabled:bg-slate-100">
      Open
    </KPopover.Trigger>
    <KPopover.Content class="flex p-4 rounded bg-white">...</KPopover.Content>
  </KPopover>
);
```

You can use the following modifiers:

| Modifier           | CSS Selector            |
| :----------------- | :---------------------- |
| `ui-valid`         | `&[data-valid]`         |
| `ui-invalid`       | `&[data-invalid]`       |
| `ui-required`      | `&[data-required]`      |
| `ui-disabled`      | `&[data-disabled]`      |
| `ui-readonly`      | `&[data-readonly]`      |
| `ui-checked`       | `&[data-checked]`       |
| `ui-indeterminate` | `&[data-indeterminate]` |
| `ui-selected`      | `&[data-selected]`      |
| `ui-pressed`       | `&[data-pressed]`       |
| `ui-expanded`      | `&[data-expanded]`      |
| `ui-highlighted`   | `&[data-highlighted]`   |
| `ui-current`       | `&[data-current]`       |

## Using the Vanilla Extract plugin

If you are using [Vanilla Extract](https://vanilla-extract.style/), you can use the `@kobalte/vanilla-extract` plugin.

### Installation

```bash
npm install @kobalte/vanilla-extract
# or
yarn add @kobalte/vanilla-extract
# or
pnpm add @kobalte/vanilla-extract
```

### Usage

Use the `componentStateStyles` utility function:

```ts
import { componentStateStyles } from "@kobalte/vanilla-extract";
import { style } from "@vanilla-extract/css";

const button = style([
  {
    background: "blue",
    padding: "2px 6px",
  },
  componentStateStyles({
    disabled: {
      opacity: 0.4,
    },
    invalid: {
      backgroundColor: "red",
    },
  }),
]);
```

## Extending a component

```tsx
import { Popover as KPopover } from "@kobalte/core/popover";
import { ComponentProps } from "solid-js";

export const PopoverTrigger = (props: ComponentProps<typeof KPopover.Trigger>) => {
  return <KPopover.Trigger {...props} />;
};
```
