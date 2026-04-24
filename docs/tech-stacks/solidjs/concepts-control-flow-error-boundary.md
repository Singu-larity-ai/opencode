---
title: Control flow - Error boundary
source: https://docs.solidjs.com/concepts/control-flow/error-boundary
description: Error boundaries provide a way to catch errors during rendering and prevent the entire app from crashing.
---

# Control flow - Error boundary

By default, if part of an application throws an error during rendering, the entire application can crash, resulting in Solid removing its UI from the screen. Error boundaries provide a way to catch these errors and prevent the entire app from crashing.

The `<ErrorBoundary>` component catches any error that occurs during the rendering or updating of its children. However, an important note is that errors occurring outside the rendering process, such as in event handlers or after a `setTimeout`, are not caught by error boundaries.

The `fallback` prop can be used to display a user-friendly error message or notification when an error occurs:

```jsx
import { ErrorBoundary } from "solid-js";
import { Header, ErrorProne } from "./components";

function App() {
  return (
    <div>
      <Header />
      <ErrorBoundary
        fallback={(error, reset) => (
          <div>
            <p>Something went wrong: {error.message}</p>
            <button onClick={reset}>Try Again</button>
          </div>
        )}
      >
        <ErrorProne />
      </ErrorBoundary>
    </div>
  );
}
```
