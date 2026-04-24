---
title: Animation
source: https://kobalte.dev/docs/core/overview/animation
description: Guide to animating Kobalte components with CSS and JavaScript animation libraries
---

# Animation

Kobalte components can be animated with CSS keyframes or your JavaScript animation library of choice.

## Animating with CSS animation

The simplest way to animate Kobalte components is with CSS.

```css
.popover__content {
  animation: fadeOut 300ms ease-in forwards;
}

.popover__content[data-expanded] {
  animation: fadeIn 300ms ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

## Delegating unmounting for JavaScript animation

When many stateful Kobalte components are hidden from view, they are actually removed from the DOM. JavaScript animation libraries need control of the unmounting phase, so we provide the `forceMount` prop on many components to allow consumers to delegate the mounting and unmounting of children based on the animation state determined by those libraries.
