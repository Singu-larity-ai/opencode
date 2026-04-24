---
title: TypeScript
source: https://docs.solidjs.com/configuration/typescript
description: TypeScript is a superset of JavaScript that enhances code reliability and predictability through static types.
---

# TypeScript

TypeScript is a superset of JavaScript that enhances code reliability and predictability through the introduction of static types. While JavaScript code can be directly used in TypeScript, the added type annotations provide clearer code structure and documentation.

By leveraging standard JSX, a syntax extension to JavaScript, Solid facilitates seamless TypeScript interpretation. Moreover, Solid has built-in types for the API that heighten accuracy.

## Configuring TypeScript

When integrating TypeScript with the Solid JSX compiler:

1. `"jsx": "preserve"` in the `tsconfig.json` retains the original JSX form
2. `"jsxImportSource": "solid-js"` designates Solid as the source of JSX types

## Migrating from JavaScript to TypeScript

1. Install TypeScript: `npm i typescript -D`
2. Run `npx tsc --init` to generate tsconfig.json
3. Update tsconfig.json to match Solid's configuration

## API types

### Signals

Using `createSignal<T>`, a signal's type can be defined as `T`.

### Context

Context uses `createContext<T>`, which is parameterized by the type `T` of the context's value.

### Components

Components in Solid use the generic `Component<P>` type, where `P` represents the props' type.

### Event handling

In Solid, the type for event handlers is specified as `JSX.EventHandler<TElement, TEvent>`.

### ref attribute

In an environment without TypeScript, using the `ref` attribute ensures that the corresponding DOM element is assigned to the variable after it is rendered.

## Control flow-based narrowing

Control flow-based narrowing involves refining the type of a value by using control flow statements.

## Advanced JSX attributes and directives

### Custom event handlers

To handle custom events in Solid, you can use the attribute `on:___`.

### Custom directives

In Solid, custom directives can be applied using the `use:___` attribute.
