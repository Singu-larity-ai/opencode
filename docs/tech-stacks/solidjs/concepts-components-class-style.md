---
title: Components - Class and style
source: https://docs.solidjs.com/concepts/components/class-style
description: Similar to HTML, Solid uses class and style attributes to style elements via CSS.
---

# Components - Class and style

Similar to HTML, Solid uses `class` and `style` attributes to style elements via CSS (Cascading Style Sheets).

- **Class attribute**: Enables styling one or more elements through CSS rules.
- **Style attribute**: Inline styles that style single elements.

## Inline styling

The `style` attribute allows you to style a single element and define CSS variables dynamically during runtime.

```jsx
// String
<div style="color: red;">This is a red div</div>
// Object
<div style={{ color: "red" }}>This is a red div</div>
```

## Classes

The `class` attribute allows you to style one or more elements through CSS rules.

### Dynamic styling

Dynamic styling provides a way to change the appearance of a component based on state or other factors like user inputs.

### classList

When you want to apply multiple classes to an element, you can use the `classList` attribute.

```jsx
<button
  classList={{ selected: current() === "foo" }}
  onClick={() => setCurrent("foo")}>
  foo
</button>;
```
