---
title: Two Types of Errors
source: https://effect.website/docs/error-management/two-error-types
description: Expected errors (failures) vs unexpected errors (defects) in Effect
---

## Overview

In Effect, there are two ways for a program to fail:

- **Expected Errors**: Errors that developers anticipate as part of normal program execution
- **Unexpected Errors**: Errors that occur unexpectedly, not part of the intended program flow

## Expected Errors

Expected errors (also called *failures*, *typed errors*, or *recoverable errors*) are errors that developers anticipate.

Expected errors are **tracked** at the type level:

```ts
const program: Effect<string, HttpError, never>
```

The type shows the program can fail with an error of type `HttpError`.

## Unexpected Errors

Unexpected errors (also called *defects*, *untyped errors*, or *unrecoverable errors*) are errors that developers do not anticipate.

They resemble unchecked exceptions and are **not tracked** at the type level. However, the Effect runtime tracks these errors and provides methods to recover from them.
