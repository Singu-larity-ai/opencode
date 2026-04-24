---
title: Refs
source: https://docs.solidjs.com/concepts/refs
description: Refs, or references, are a special attribute that can be attached to any element, used to reference a DOM element or a component instance.
---

# Refs

Refs, or references, are a special attribute that can be attached to any element, and are used to reference a DOM element or a component instance. They are particularly useful when you need to access the DOM nodes directly or invoke methods on a component.

## Accessing DOM elements

One way of accessing DOM elements is through element selectors such as `document.querySelector` or `document.getElementById`.

## JSX as a value

JSX can be used as a value and assigned to a variable when looking to directly access DOM elements.

## Refs in Solid

Solid provides a ref system to access DOM elements directly inside the JSX template:

```jsx
function Component() {
  let myElement;

  return (
    <div>
      <p ref={myElement}>My Element</p>
    </div>
  );
}
```

### Signals as refs

Signals can also be used as refs.

## Forwarding refs

Forwarding refs is a technique that allows you to pass a ref from a parent component to a child component.

## Directives

Directives allow the attachment of reusable behaviours to DOM elements. The `use:` prefix is used to denote these custom directives.
