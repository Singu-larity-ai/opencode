---
title: Update
source: https://orm.drizzle.team/docs/update
description: Drizzle ORM SQL Update documentation
---

# SQL Update

```typescript
await db.update(users)
  .set({ name: 'Mr. Dan' })
  .where(eq(users.name, 'Dan'));
```

## Limit

PostgreSQL / MySQL / SQLite / SingleStore

```typescript
await db.update(usersTable).set({ verified: true }).limit(2);
```

## Order By

```typescript
import { asc, desc } from 'drizzle-orm';

await db.update(usersTable).set({ verified: true }).orderBy(usersTable.name);
await db.update(usersTable).set({ verified: true }).orderBy(desc(usersTable.name));
```

## Returning

PostgreSQL / SQLite

```typescript
const updatedUserId: { updatedId: number }[] = await db.update(users)
  .set({ name: 'Mr. Dan' })
  .where(eq(users.name, 'Dan'))
  .returning({ updatedId: users.id });
```

## WITH Update Clause

Using the `with` clause can help you simplify complex queries:

```typescript
const averagePrice = db.$with('average_price').as(
  db.select({ value: sql`avg(${products.price})`.as('value') }).from(products)
);

const result = await db.with(averagePrice)
  .update(products)
  .set({ cheap: true })
  .where(lt(products.price, sql`(select * from ${averagePrice})`))
  .returning({ id: products.id });
```

## Update … From

PostgreSQL / MySQL / SQLite

```typescript
await db
  .update(users)
  .set({ cityId: cities.id })
  .from(cities)
  .where(and(eq(cities.name, 'Seattle'), eq(users.name, 'John')))
```
