---
title: Understanding JSX
source: https://docs.solidjs.com/concepts/understanding-jsx
description: JSX is an extension for JavaScript that allows you to write HTML-like code inside your JavaScript file which keeps your rendering logic and content in the same place.
---

# Understanding JSX

JSX is an extension for JavaScript. It allows you to write HTML-like code inside your JavaScript file which keeps your rendering logic and content in the same place. This provides a concise and readable way to create and represent components.

## How Solid uses JSX

Solid was designed to align closely with HTML standards.

```jsx
const element = <h1>I'm JSX!!</h1>;
```

It offers a distinct advantage, however: to copy/paste solutions from resources like Stack Overflow; and to allow direct usage of templates from design tools.

## Using JSX in Solid

### Return a single root element

Where HTML lets you have disconnected tags at the top level, JSX requires that a component to return a single root element.

### Close all tags

Self-closing tags are a must in JSX. Unlike in HTML, where elements like `<input>`, `<img>`, or `<br>` don't require explicit closure, JSX requires consistent self-closing tags.

### Properties vs. attributes

HTML attributes and JSX properties may seem similar, but they serve different purposes and behave differently.

### JSX properties (props)

JSX properties, commonly known as "props," help with the passing of data and configurations to components within an application.
