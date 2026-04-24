---
title: Delete
source: https://orm.drizzle.team/docs/delete
description: Drizzle ORM SQL Delete documentation
---

# SQL Delete

Delete all rows:

```typescript
await db.delete(users);
```

Delete with filters:

```typescript
await db.delete(users).where(eq(users.name, 'Dan'));
```

## Limit

PostgreSQL / MySQL / SQLite / SingleStore

```typescript
await db.delete(users).where(eq(users.name, 'Dan')).limit(2);
```

## Order By

```typescript
import { asc, desc } from 'drizzle-orm';

await db.delete(users).where(eq(users.name, 'Dan')).orderBy(users.name);
await db.delete(users).where(eq(users.name, 'Dan')).orderBy(desc(users.name));
```

## Returning

PostgreSQL / SQLite

```typescript
const deletedUser = await db.delete(users)
  .where(eq(users.name, 'Dan'))
  .returning();

const deletedUserIds: { deletedId: number }[] = await db.delete(users)
  .where(eq(users.name, 'Dan'))
  .returning({ deletedId: users.id });
```

## WITH DELETE Clause

```typescript
const averageAmount = db.$with('average_amount').as(
  db.select({ value: sql`avg(${orders.amount})`.as('value') }).from(orders)
);

const result = await db
  .with(averageAmount)
  .delete(orders)
  .where(gt(orders.amount, sql`(select * from ${averageAmount})`))
  .returning({ id: orders.id });
```
