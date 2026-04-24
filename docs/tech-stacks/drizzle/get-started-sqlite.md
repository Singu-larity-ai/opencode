---
title: Drizzle ORM SQLite
description: Getting started with Drizzle ORM and SQLite
source: https://orm.drizzle.team/docs/get-started-sqlite
---

# Drizzle <> SQLite

Drizzle has native support for SQLite connections with the `libsql` and `better-sqlite3` drivers.

There are a few differences between the `libsql` and `better-sqlite3` drivers:

- `libSQL` can connect to both SQLite files and `Turso` remote databases
- LibSQL is a fork of SQLite that offers more functionality
- More ALTER statements available with `libSQL` driver
- You can configure the encryption at rest feature natively
- A large set of extensions supported by SQLite is also supported by `libSQL`

## libsql

### Step 1 - Install packages

```bash
npm i drizzle-orm @libsql/client
npm i -D drizzle-kit
```

### Step 2 - Initialize the driver

```typescript
import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle({ connection: {
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
}});
```

### Step 3 - Make a query

```typescript
import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

## better-sqlite3

### Step 1 - Install packages

```bash
npm i drizzle-orm better-sqlite3
npm i -D drizzle-kit @types/better-sqlite3
```

### Step 2 - Initialize the driver and make a query

```typescript
import { drizzle } from 'drizzle-orm/better-sqlite3';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

With existing database:

```typescript
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('sqlite.db');
const db = drizzle({ client: sqlite });

const result = await db.execute('select 1');
```

## What's next?

**Manage schema**

- [Drizzle Schema](/docs/sql-schema-declaration)
- [SQLite data types](/docs/column-types/sqlite)
- [Indexes and Constraints](/docs/indexes-constraints)
- [Database Views](/docs/views)
- [Sequences](/docs/sequences)

**Query data**

- [Relational Queries](/docs/rqb)
- [Select](/docs/select)
- [Insert](/docs/insert)
- [Update](/docs/update)
- [Delete](/docs/delete)
- [Filters](/docs/operators)
- [Joins](/docs/joins)
- [sql`` operator](/docs/sql)
