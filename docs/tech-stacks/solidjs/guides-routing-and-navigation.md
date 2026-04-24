---
title: Routing & navigation
source: https://docs.solidjs.com/guides/routing-and-navigation
description: Solid Router simplifies routing in Solid applications to help developers manage navigation and rendering by defining routes using JSX or objects passed via props.
---

# Routing & navigation

Solid Router simplifies routing in Solid applications to help developers manage navigation and rendering by defining routes using JSX or objects passed via props.

## Getting started

### Install the router

```bash
npm i @solidjs/router
```

### Setup the Router component

```javascript
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

render(() => <Router />, document.getElementById("root"));
```

### Provide a root level layout

```javascript
const App = (props) => (
  <>
    <h1>Site Title</h1>
    {props.children}
  </>
);

render(() => <Router root={App} />, document.getElementById("root"));
```

### Add routes

```javascript
<Route path="/" component={Home} />
<Route path="/users" component={Users} />
```

## Lazy-loading route components

The `lazy` function postpones the loading of a component until it is navigated to.

## Dynamic routes

If a path is unknown ahead of time, you can treat part of the path as a flexible parameter using `:paramName`.

### Accessing parameters

Use `useParams` to retrieve the dynamic route parameters.

## Nested routes

Only leaf Route nodes are given a route.

## Preload functions

With preload functions, data fetching is started parallel to loading the route.
