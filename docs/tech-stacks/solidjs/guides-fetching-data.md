---
title: Fetching data
source: https://docs.solidjs.com/guides/fetching-data
description: Solid has a built-in utility, createResource, that was created to simplify data fetching for managing asynchronous data.
---

# Fetching data

For most modern web applications, data fetching is a common task. Solid has a built-in utility, `createResource`, that was created to simplify data fetching.

## What is createResource?

`createResource` is a specialized signal designed specifically for managing asynchronous data fetching. It wraps around the async operations, providing a way to handle various states: loading, success, and error.

This function is non-blocking, meaning that `createResource` guarantees that the application remains responsive, even during the retrieval of information.

## Using createResource

`createResource` requires a function that returns a promise as its argument:

```javascript
const [user] = createResource(userId, fetchUser);
```

The signal returned from `createResource` provides properties that assist with conditional rendering based on the different states of the fetch process:
- `state`: The current status of the operation
- `loading`: Indicates that the operation is currently in progress
- `error`: If the operation fails
- `latest`: The most recent data or result returned from the operation

## Calling multiple async events

Solid provides a `Suspense` component designed to act as a boundary. It allows you to display a fallback placeholder while waiting for all asynchronous events to resolve.

## Dynamic data handling

With the second output of `createResource`, there are 2 powerful methods:

### mutate

The `mutate` method offers "optimistic mutations" for immediate feedback.

### refetch

The `refetch` method can be used to reload the current query regardless of any changes.
