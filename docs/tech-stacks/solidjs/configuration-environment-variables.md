---
title: Environment variables
source: https://docs.solidjs.com/configuration/environment-variables
description: Solid is built on top of Vite, which offers a convenient way to handle environment variables.
---

# Environment variables

Solid is built on top of Vite, which offers a convenient way to handle environment variables.

## Public Environment Variables

Public variables are considered safe to expose to the client-side code. These variables are prefixed with `VITE_` and are injected into the client-side code during compilation time.

In the root directory of the project, create a file called `.env`:

```
VITE_USER_ID=123
VITE_PUBLIC_ENDPOINT=https://api.example.com
```

Only variables prefixed with `VITE_` will be exposed to client source code.

## Private Environment Variables

These variables should only be accessed in your backend code, so it's best not to use the `VITE_` prefix for them. Instead, use `process.env` to access them.

```javascript
const client = new DB({
  host: process.env.DB_URL,
  password: process.env.DB_PASSWORD
});
```
