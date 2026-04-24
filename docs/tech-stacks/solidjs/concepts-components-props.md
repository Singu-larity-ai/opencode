---
title: Components - Props
source: https://docs.solidjs.com/concepts/components/props
description: Props are a way to pass state from a parent component to a child component. These read-only properties are passed to components as attributes within JSX.
---

# Components - Props

Props are a way to pass state from a parent component to a child component. These read-only properties are passed to components as attributes within JSX and are accessible within the component via the `props` object:

```jsx
function App() {
  return <MyComponent name="Ryan Carniato" />;
}

function MyComponent(props) {
  return <div>Hello {props.name}</div>;
}
```

## mergeProps

`mergeProps` is a Solid utility function designed to merge multiple potentially reactive objects together.

## Destructuring props

Props are read-only so that child components do not directly modify the data passed by the parent. This also encourages one-way data flow.

### splitProps

`splitProps` is a utility function designed to help split a single props object into multiple sets of props, retaining the reactivity of the individual properties.

## Passing props to children

Solid provides a `children` helper that ensures you always get the right child components without anything unwanted happening.

## Prop drilling

Prop drilling is a term used to describe the process of passing props through multiple layers of components.
