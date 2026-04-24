---
title: Tabs
source: https://kobalte.dev/docs/core/components/tabs
description: A set of layered sections of content that display one panel at a time.
---

# Tabs

A set of layered sections of content, known as tab panels, that display one panel of content at a time.

## Import

```ts
import { Tabs } from "@kobalte/core/tabs";
```

## Features

- Follow the [WAI ARIA Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) design pattern.
- Support for LTR and RTL keyboard navigation.
- Support for disabled tabs.
- Supports horizontal/vertical orientation.
- Supports automatic/manual activation.
- Focus management for tab panels.
- Can be controlled or uncontrolled.

## Anatomy

```tsx
<Tabs>
  <Tabs.List>
    <Tabs.Trigger />
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content />
</Tabs>
```

## Example

```tsx
import { Tabs } from "@kobalte/core/tabs";
import "./style.css";

function App() {
  return (
    <Tabs aria-label="Main navigation" class="tabs">
      <Tabs.List class="tabs__list">
        <Tabs.Trigger class="tabs__trigger" value="profile">Profile</Tabs.Trigger>
        <Tabs.Trigger class="tabs__trigger" value="dashboard">Dashboard</Tabs.Trigger>
        <Tabs.Trigger class="tabs__trigger" value="settings">Settings</Tabs.Trigger>
        <Tabs.Indicator class="tabs__indicator" />
      </Tabs.List>
      <Tabs.Content class="tabs__content" value="profile">Profile details</Tabs.Content>
      <Tabs.Content class="tabs__content" value="dashboard">Dashboard details</Tabs.Content>
      <Tabs.Content class="tabs__content" value="settings">Settings details</Tabs.Content>
    </Tabs>
  );
}
```

## Usage

### Default value

```tsx
<Tabs defaultValue="dashboard">
  <Tabs.List>
    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
    <Tabs.Trigger value="dashboard">Dashboard</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="profile">Profile details</Tabs.Content>
  <Tabs.Content value="dashboard">Dashboard details</Tabs.Content>
  <Tabs.Content value="settings">Settings details</Tabs.Content>
</Tabs>
```

### Controlled value

```tsx
import { createSignal } from "solid-js";

function ControlledExample() {
  const [selectedTab, setSelectedTab] = createSignal("settings");

  return (
    <>
      <Tabs value={selectedTab()} onChange={setSelectedTab}>
        <Tabs.List>
          <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
          <Tabs.Trigger value="dashboard">Dashboard</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="profile">Profile details</Tabs.Content>
        <Tabs.Content value="dashboard">Dashboard details</Tabs.Content>
        <Tabs.Content value="settings">Settings details</Tabs.Content>
      </Tabs>
      <p>Selected tab: {selectedTab()}</p>
    </>
  );
}
```

## API Reference

### Tabs Props

| Prop           | Description                                                    |
| :------------- | :------------------------------------------------------------ |
| value          | `string` - The controlled value of the tab to activate.       |
| defaultValue   | `string` - The value of the tab that should be active initially. |
| onChange       | `(value: string) => void` - Event handler called when value changes. |
| orientation    | `'horizontal' \| 'vertical'` - The orientation of the tabs.   |
| activationMode | `'automatic' \| 'manual'` - Whether tabs are activated automatically on focus. |
| disabled       | `boolean` - Whether the tabs are disabled.                    |

### Tabs.Trigger Props

| Prop     | Description                                                    |
| :------- | :------------------------------------------------------------ |
| value    | `string` - The unique key that associates the tab with a panel. |
| disabled | `boolean` - Whether the tab should be disabled.               |

### Data Attributes

| Data attribute   | Description                              |
| :--------------- | :-------------------------------------- |
| data-selected    | Present when the trigger is selected.   |
| data-disabled    | Present when the trigger is disabled.   |
| data-highlighted | Present when the trigger is highlighted. |

## Rendered elements

| Component        | Default rendered element |
| :--------------- | :---------------------- |
| `Tabs`           | `div`                   |
| `Tabs.List`      | `div`                   |
| `Tabs.Trigger`   | `button`                |
| `Tabs.Indicator` | `div`                   |
| `Tabs.Content`   | `div`                   |

## Accessibility

### Keyboard Interactions

| Key                   | Description                                                   |
| :-------------------- | :----------------------------------------------------------- |
| Tab                   | Moves focus to the next focusable element.                   |
| ArrowDown/ArrowRight  | Moves focus to the next trigger and activates its content.   |
| ArrowUp/ArrowLeft     | Moves focus to the previous trigger and activates its content. |
| Home                  | Moves focus to the first trigger.                           |
| End                   | Moves focus to the last trigger.                            |
