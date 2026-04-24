---
title: Control flow - Portal
source: https://docs.solidjs.com/concepts/control-flow/portal
description: Portal helps with rendering elements outside of the usual document flow, handling challenges related to stacking contents and z-index.
---

# Control flow - Portal

When an element requires rendering outside of the usual document flow, challenges related to stacking contents and z-index can interfere with the desired intention or look of an application. `<Portal>` helps with this by putting elements in a different place in the document.

```jsx
import { Portal } from "solid-js/web";
<Portal>
  <div class="popup">...</div>
</Portal>;
```

The content nested within `<Portal>` is rendered and positioned by default at the end of the document body.

This can be changed by passing a `mount` prop to `<Portal>`:

```jsx
import { Portal } from "solid-js/web";
<Portal mount={document.querySelector("main")}>
  <div class="popup">...</div>
</Portal>;
```

Using `<Portal>` can be particularly useful in cases where elements, like information popups, might be clipped or obscured due to the overflow settings of their parent elements.
