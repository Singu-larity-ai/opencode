---
title: Drizzle SQL Select
description: SQL-like query API in Drizzle ORM
source: https://orm.drizzle.team/docs/select
---

# SQL Select

Drizzle provides you the most SQL-like way to fetch data from your database, while remaining type-safe and composable. It natively supports mostly every query feature and capability of every dialect.

## Basic select

Select all rows from a table including all columns:

```typescript
const result = await db.select().from(users);
// Result type: { id: number; name: string; age: number | null }[]
```

Drizzle always explicitly lists columns in the `select` clause instead of using `select *`.

## Partial select

Select only a subset of columns:

```typescript
const result = await db.select({
  id: users.id,
  name: users.name,
}).from(users);
```

Using arbitrary expressions:

```typescript
const result = await db.select({
  id: users.id,
  lowerName: sql<string>`lower(${users.name})`,
}).from(users);
```

## Conditional select

Dynamic selection based on conditions:

```typescript
async function selectUsers(withName: boolean) {
  return db
    .select({
      id: users.id,
      ...(withName ? { name: users.name } : {}),
    })
    .from(users);
}
```

## Distinct select

```typescript
await db.selectDistinct().from(users).orderBy(users.id);

await db.selectDistinct({ id: users.id }).from(users).orderBy(users.id);
```

## Filters

Filter query results using operators in the `.where()` method:

```typescript
import { eq, lt, gte, ne } from 'drizzle-orm';

await db.select().from(users).where(eq(users.id, 42));
await db.select().from(users).where(lt(users.id, 42));
await db.select().from(users).where(gte(users.id, 42));
await db.select().from(users).where(ne(users.id, 42));
```

### Combining filters

```typescript
import { eq, and, or } from 'drizzle-orm';

// AND
await db.select().from(users).where(
  and(
    eq(users.id, 42),
    eq(users.name, 'Dan')
  )
);

// OR
await db.select().from(users).where(
  or(
    eq(users.id, 42),
    eq(users.name, 'Dan')
  )
);
```

## Limit & Offset

```typescript
await db.select().from(users).limit(10);
await db.select().from(users).limit(10).offset(10);
```

## Order By

```typescript
import { asc, desc } from 'drizzle-orm';

await db.select().from(users).orderBy(users.name);
await db.select().from(users).orderBy(desc(users.name));
await db.select().from(users).orderBy(users.name, users.name2);
```

## Aggregations

```typescript
import { gt, count } from 'drizzle-orm';

await db.select({
  age: users.age,
  count: sql<number>`cast(count(${users.id}) as int)`,
})
  .from(users)
  .groupBy(users.age);

await db.select({
  age: users.age,
  count: sql<number>`cast(count(${users.id}) as int)`,
})
  .from(users)
  .groupBy(users.age)
  .having(({ count }) => gt(count, 1));
```

### Aggregation helpers

Drizzle provides wrapped SQL functions for common aggregations:

```typescript
import { count, countDistinct, avg, sum, max, min } from 'drizzle-orm';

// Count
await db.select({ value: count() }).from(users);
await db.select({ value: count(users.id) }).from(users);

// Count distinct
await db.select({ value: countDistinct(users.id) }).from(users);

// Average
await db.select({ value: avg(users.id) }).from(users);

// Sum
await db.select({ value: sum(users.id) }).from(users);

// Max/Min
await db.select({ value: max(users.id) }).from(users);
await db.select({ value: min(users.id) }).from(users);
```

## $count

```typescript
const count = await db.$count(users);
const count = await db.$count(users, eq(users.name, 'Dan'));
```

## Joins

```typescript
import { eq } from 'drizzle-orm';

// Inner join
await db.select().from(users).innerJoin(posts, eq(users.id, posts.userId));

// Left join
await db.select().from(users).leftJoin(posts, eq(users.id, posts.userId));

// Right join
await db.select().from(users).rightJoin(posts, eq(users.id, posts.userId));

// Full join
await db.select().from(users).fullJoin(posts, eq(users.id, posts.userId));
```

## Subqueries

```typescript
const sq = db.select().from(users).where(eq(users.id, 42)).as('sq');
const result = await db.select().from(sq);
```

## With clause (CTE)

```typescript
const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));

const result = await db.with(sq).select().from(sq);
```

## What's next?

- [Insert](/docs/insert)
- [Update](/docs/update)
- [Delete](/docs/delete)
- [Filters](/docs/operators)
- [Joins](/docs/joins)
- [sql`` operator](/docs/sql)
- [Query Utils](/docs/query-utils)
