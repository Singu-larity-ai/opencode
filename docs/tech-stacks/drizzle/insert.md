---
title: Insert
source: https://orm.drizzle.team/docs/insert
description: Drizzle ORM SQL Insert documentation
---

# SQL Insert

Drizzle ORM provides you the most SQL-like way to insert rows into the database tables.

```typescript
await db.insert(users).values({ name: 'Andrew' });
```

## returning

PostgreSQL / SQLite

```typescript
await db.insert(users).values({ name: "Dan" }).returning();

// partial return
await db.insert(users).values({ name: "Partial Dan" }).returning({ insertedId: users.id });
```

## $returningId

MySQL doesn't have native support for `RETURNING` after using `INSERT`. Drizzle provides automatic handling:

```typescript
const result = await db.insert(usersTable).values([{ name: 'John' }, { name: 'John1' }]).$returningId();
//    ^? { id: number }[]
```

## Insert Multiple Rows

```typescript
await db.insert(users).values([{ name: 'Andrew' }, { name: 'Dan' }]);
```

## Upserts and Conflicts

### On Conflict Do Nothing

PostgreSQL / SQLite / MySQL

```typescript
await db.insert(users)
  .values({ id: 1, name: 'John' })
  .onConflictDoNothing();
```

### On Conflict Do Update

PostgreSQL / SQLite / MySQL

```typescript
await db.insert(users)
  .values({ id: 1, name: 'Dan' })
  .onConflictDoUpdate({ target: users.id, set: { name: 'John' } });
```

### On Duplicate Key Update

MySQL supports `ON DUPLICATE KEY UPDATE`:

```typescript
await db.insert(users)
  .values({ id: 1, name: 'John' })
  .onDuplicateKeyUpdate({ set: { name: 'John' } });
```

## Insert Into … Select

```typescript
const insertedEmployees = await db
  .insert(employees)
  .select(
    db.select({ name: users.name }).from(users).where(eq(users.role, 'employee'))
  )
  .returning({
    id: employees.id,
    name: employees.name
  });
```
