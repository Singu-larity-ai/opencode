---
title: SQL
source: https://bun.com/docs/runtime/sql.md
description: Bun provides native bindings for working with SQL databases supporting PostgreSQL, MySQL, and SQLite
---

## Quick Start

```ts title="db.ts"
import { sql, SQL } from "bun";

const users = await sql`
  SELECT * FROM users
  WHERE active = ${true}
  LIMIT ${10}
`;
```

## Database Support

### PostgreSQL

```ts
import { sql } from "bun";

await sql`SELECT ...`;

import { SQL } from "bun";
const pg = new SQL("postgres://user:pass@localhost:5432/mydb");
```

### MySQL

```ts
import { SQL } from "bun";

const mysql = new SQL("mysql://user:password@localhost:3306/database");

const users = await mysql`SELECT * FROM users WHERE id = ${userId}`;

await mysql.begin(async tx => {
  await tx`INSERT INTO users (name) VALUES (${"Alice"})`;
});
```

### SQLite

```ts
import { SQL } from "bun";

const memory = new SQL(":memory:");
const sqlite = new SQL("sqlite://myapp.db");
```

## Inserting data

```ts
const [user] = await sql`
  INSERT INTO users (name, email)
  VALUES (${name}, ${email})
  RETURNING *
`;

const userData = {
  name: "Alice",
  email: "alice@example.com",
};

const [newUser] = await sql`
  INSERT INTO users ${sql(userData)}
  RETURNING *
`;
```

### Bulk Insert

```ts
const users = [
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
];

await sql`INSERT INTO users ${sql(users)}`;
```

## Query Results

### values() format

```ts
const rows = await sql`SELECT * FROM users`.values();
```

### raw() format

```ts
const rows = await sql`SELECT * FROM users`.raw();
```

## SQL Fragments

### Dynamic Table Names

```ts
await sql`SELECT * FROM ${sql("users")}`;
```

### Conditional Queries

```ts
const filterAge = true;
const minAge = 21;

await sql`
  SELECT * FROM users
  WHERE active = ${true}
  ${filterAge ? sql`AND age > ${minAge}` : sql``}
`;
```

### where in

```ts
await sql`SELECT * FROM users WHERE id IN ${sql([1, 2, 3])}`;
```

## Transactions

```ts
await sql.begin(async tx => {
  await tx`INSERT INTO users (name) VALUES (${"Alice"})`;
  await tx`UPDATE accounts SET balance = balance - 100 WHERE user_id = 1`;
});
```

### Savepoints

```ts
await sql.begin(async tx => {
  await tx`INSERT INTO users (name) VALUES (${"Alice"})`;

  await tx.savepoint(async sp => {
    await sp`UPDATE users SET status = 'active'`;
  });
});
```

## Connection Options

### PostgreSQL

```ts
const sql = new SQL({
  url: "postgres://user:pass@localhost:5432/dbname",
  max: 20,
  idleTimeout: 30,
  connectionTimeout: 30,
  tls: true,
});
```

### MySQL

```ts
const sql = new SQL({
  adapter: "mysql",
  hostname: "localhost",
  port: 3306,
  database: "myapp",
  username: "dbuser",
  password: "secretpass",
  max: 20,
});
```

### SQLite

```ts
const sql = new SQL({
  adapter: "sqlite",
  filename: "./data/app.db",
  readonly: false,
  create: true,
  strict: true,
});
```

## Connection Pooling

```ts
const sql = new SQL({
  max: 20,
  idleTimeout: 30,
  maxLifetime: 3600,
  connectionTimeout: 10,
});

await sql.close();
```

## Error Handling

```ts
try {
  await sql`SELECT * FROM users`;
} catch (error) {
  if (error instanceof SQL.PostgresError) {
    console.log(error.code);
  } else if (error instanceof SQL.SQLiteError) {
    console.log(error.code);
  }
}
```

## Numbers and BigInt

```ts
const [{ x }] = await sql`SELECT 9223372036854777 as x`;
console.log(typeof x, x);
```

### BigInt instead of strings

```ts
const sql = new SQL({
  bigint: true,
});
```
