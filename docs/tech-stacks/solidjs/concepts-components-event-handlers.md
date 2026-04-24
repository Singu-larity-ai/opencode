---
title: Components - Event handlers
source: https://docs.solidjs.com/concepts/components/event-handlers
description: Event handlers are functions that are called in response to specific events occurring in the browser, such as when a user clicks or taps on an element.
---

# Components - Event handlers

Event handlers are functions that are called in response to specific events occurring in the browser, such as when a user clicks or taps on an element.

Solid provides two ways to add event listeners to the browser:

- `on:__`: adds an event listener to the element. This is also known as a *native event*.
- `on__`: adds an event listener to the document and dispatches it to the element. This can be referred to as a *delegated event*.

## Using events

```jsx
// delegated event
<button onClick={handleClick}>Click me</button>
// native event
<div on:scroll={handleScroll}>... very long text ...</div>
```

## Binding events

To optimize event handlers, you can pass an array as the event handler.

```jsx
const handler = (data, event) => {
  console.log("Data:", data, "Event:", event);
};
<button onClick={[handler, "Hello!"]}>Click Me</button>;
```

### Dynamic handlers

An event handler does not form part of the reactive system.

## Event delegation

Instead of attaching event listeners to every individual element, Solid uses synthetic event delegation, through the `on__` form.

### List of delegated events

Supported events include: beforeinput, click, dblclick, contextmenu, focusin, focusout, input, keydown, keyup, mousedown, mousemove, mouseout, mouseover, mouseup, pointerdown, pointermove, pointerout, pointerover, pointerup, touchend, touchmove, touchstart.
