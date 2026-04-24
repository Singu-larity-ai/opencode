---
title: SQLite
source: https://bun.sh/docs/runtime/sqlite
description: Bun natively implements a high-performance SQLite3 driver.
---

# SQLite

> Bun natively implements a high-performance SQLite3 driver.

Bun's `bun:sqlite` module provides fast, synchronous SQLite access.

```ts
import { Database } from "bun:sqlite";

const db = new Database(":memory:");
const query = db.query("select 'Hello world' as message;");
query.get();
// { message: "Hello world" }
```

## Features

- Transactions
- Parameters (named & positional)
- Prepared statements
- Datatype conversions (BLOB becomes Uint8Array)
- Map query results to classes
- `bigint` support
- WAL mode support

## Basic Usage

```ts
const db = new Database("mydb.sqlite");

// Create table
db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)");

// Insert
const insert = db.query("INSERT INTO users (name) VALUES ($name)");
insert.run({ $name: "Alice" });

// Select
const users = db.query("SELECT * FROM users").all();
// [{ id: 1, name: "Alice" }]
```

## Transactions

```ts
const insertCat = db.prepare("INSERT INTO cats (name) VALUES ($name)");
const insertCats = db.transaction(cats => {
  for (const cat of cats) insertCat.run(cat);
});

insertCats([{ $name: "Keanu" }, { $name: "Salem" }]);
```
