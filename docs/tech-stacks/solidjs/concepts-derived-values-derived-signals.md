---
title: Derived signals
source: https://docs.solidjs.com/concepts/derived-values/derived-signals
description: Derived signals are functions that rely on one or more signals to produce a value.
---

# Derived signals

Derived signals are functions that rely on one or more signals to produce a value.

These functions are not executed immediately, but instead are only called when the values they rely on are changed:

```javascript
const double = () => count() * 2;
```

In the above example, the `double` function relies on the `count` signal to produce a value. When the `count` signal is changed, the `double` function will be called again to produce a new value.

These dependent functions gain reactivity from the signal they access, ensuring that changes in the underlying data propagate throughout your application.

While you can create derived values in this manner, Solid created the `createMemo` primitive for this purpose.
