---
title: Stores
source: https://docs.solidjs.com/concepts/stores
description: Stores are a state management primitive that provide a centralized way to handle shared data and reduce redundancy.
---

# Stores

Stores are a state management primitive that provide a centralized way to handle shared data and reduce redundancy. Unlike signals, which track a single value and trigger a full re-render when updated, stores maintain fine-grained reactivity by updating only the properties that change.

## Creating a store

Stores can manage many data types, including: objects, arrays, strings, and numbers.

Using JavaScript's proxy mechanism, reactivity extends beyond just the top-level objects or arrays:

```javascript
import { createStore } from "solid-js/store";

const [store, setStore] = createStore({
  userCount: 3,
  users: [
    { id: 0, username: "felix909", location: "England", loggedIn: false },
    { id: 1, username: "tracy634", location: "Canada", loggedIn: true },
    { id: 2, username: "johny123", location: "India", loggedIn: true },
  ],
});
```

## Accessing store values

Store properties can be accessed directly from the state proxy through directly referencing the targeted property.

## Modifying store values

Updating values within a store is best accomplished using a setter provided by the `createStore` initialization.

## Path syntax flexibility

Modifying a store using this method is referred to as "path syntax." In this approach, the initial arguments are used to specify the keys that lead to the target value you want to modify.

## Modifying values in arrays

Path syntax provides a convenient way to modify arrays, making it easier to access and update their elements.

## Store utilities

### Store updates with produce

The `produce` utility provides a way to work with data as if it were a mutable JavaScript object.

### Data integration with reconcile

When new information needs to be merged into an existing store `reconcile` can be useful.

### Extracting raw data with unwrap

The `unwrap` utility offers a way to transform a store to a standard object.
