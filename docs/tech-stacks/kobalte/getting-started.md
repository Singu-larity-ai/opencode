---
title: Getting Started
source: https://kobalte.dev/docs/core/overview/getting-started
description: Installation and basic usage guide for Kobalte
---

# Getting started

## Installation

Install Kobalte by running either of the following:

```bash
npm install @kobalte/core
# or
yarn add @kobalte/core
# or
pnpm add @kobalte/core
```

## Using the components

The example below demonstrate how to create a Popover component with Kobalte.

```tsx
import { Popover } from "@kobalte/core/popover";
import { CrossIcon } from "some-icon-library";
import "./style.css";

function App() {
  return (
    <Popover>
      <Popover.Trigger class="popover__trigger">Learn more</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content class="popover__content">
          <Popover.Arrow />
          <div class="popover__header">
            <Popover.Title class="popover__title">About Kobalte</Popover.Title>
            <Popover.CloseButton class="popover__close-button">
              <CrossIcon />
            </Popover.CloseButton>
          </div>
          <Popover.Description class="popover__description">
            A UI toolkit for building accessible web apps and design systems with SolidJS.
          </Popover.Description>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
```

In a few lines of code, we've implemented a fully accessible Popover component that :

- Adheres to [WAI-ARIA Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/) design pattern.
- Can be controlled or uncontrolled.
- Optionally render a pointing arrow.
- Has focus fully managed and customizable.
