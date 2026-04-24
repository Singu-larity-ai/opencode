---
title: Components - Basics
source: https://docs.solidjs.com/concepts/components/basics
description: Components are the building blocks of Solid applications. These units are reusable and can be combined to create more complex applications.
---

# Components - Basics

Components are the building blocks of Solid applications. These units are reusable and can be combined to create more complex applications.

Components are functions that return JSX elements:

```jsx
function MyComponent() {
  return <div>Hello World</div>;
}
```

## Component trees

A web page is displayed by rendering a component tree, which is a hierarchical structure of components.

## Component lifecycles

Components have a lifecycle that defines how they are created, updated, and destroyed. A Solid component's lifecycle is different from other frameworks, as it is tied to the concept of reactivity.

### Initialization & configuration

When a component is first rendered into the DOM, the component function is executed. This is where you will set up the component's state and side-effects.

### Conditional rendering

To display different content based on state or other criteria, you can use conditional rendering.

## Importing and exporting

For components to be reusable, they need to be exported from one module and imported into another.

### Exporting components

Once defined, a component can be exported to make it available for use in other parts of your application.

### Importing components

To use a component in another file or component, it must be imported.
