---
title: Relational Query Builder (RQB)
source: https://orm.drizzle.team/docs/rqb
description: Drizzle ORM relational queries for nested data
---

# Drizzle Queries

PostgreSQL / SQLite / MySQL / SingleStore

Drizzle ORM is designed to be a thin typed layer on top of SQL. Relational queries provide a great developer experience for querying nested relational data from an SQL database, avoiding multiple joins and complex data mappings.

Relational queries always generate exactly one SQL statement to run on the database.

## Querying

Relational queries are an extension to Drizzle's original **[query builder](/docs/select)**. You need to provide all `tables` and `relations` from your schema file/files upon `drizzle()` initialization and then just use the `db._query` API.

## Find Many

```typescript
const users = await db._query.users.findMany();
```

## Find First

`.findFirst()` will add `limit 1` to the query.

```typescript
const user = await db._query.users.findFirst();
```

## Include Relations

`With` operator lets you combine data from multiple related tables and properly aggregate results.

```typescript
const posts = await db._query.posts.findMany({
  with: {
    comments: true,
  },
});
```

## Partial Fields Select

`columns` parameter lets you include or omit columns you want to get from the database.

```typescript
const posts = await db._query.posts.findMany({
  columns: {
    id: true,
    content: true,
  },
  with: {
    comments: true,
  }
});
```

## Select Filters

Just like in our SQL-like query builder, relational queries API lets you define filters and conditions with the list of our **[`operators`](/docs/operators)**.

```typescript
import { eq } from 'drizzle-orm';

const users = await db._query.users.findMany({
  where: eq(users.id, 1)
})
```

## Limit & Offset

```typescript
await db._query.posts.findMany({
  limit: 5,
});
```

## Order By

```typescript
import { desc, asc } from 'drizzle-orm';

await db._query.posts.findMany({
  orderBy: [asc(posts.id)],
});
```

## Prepared Statements

Prepared statements are designed to massively improve query performance.

```typescript
const prepared = db._query.users.findMany({
  where: ((users, { eq }) => eq(users.id, placeholder('id'))),
  with: {
    posts: true,
  },
}).prepare('query_name');

const usersWithPosts = await prepared.execute({ id: 1 });
```
