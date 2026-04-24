---
title: Joins
source: https://orm.drizzle.team/docs/joins
description: Drizzle ORM SQL joins documentation
---

# SQL Joins

Join clause in SQL is used to combine 2 or more tables, based on related columns between them. Drizzle ORM joins syntax is a balance between SQL-likeness and type safety.

## Join Types

Drizzle ORM supports: `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL JOIN`, `CROSS JOIN`, and their LATERAL variants.

```typescript
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

const pets = pgTable('pets', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  ownerId: integer('owner_id').notNull().references(() => users.id),
});
```

### Left Join
```typescript
const result = await db.select().from(users).leftJoin(pets, eq(users.id, pets.ownerId));
// SELECT ... FROM "users" LEFT JOIN "pets" ON "users"."id" = "pets"."owner_id"
```

### Right Join
```typescript
const result = await db.select().from(users).rightJoin(pets, eq(users.id, pets.ownerId));
// SELECT ... FROM "users" RIGHT JOIN "pets" ON "users"."id" = "pets"."owner_id"
```

### Inner Join
```typescript
const result = await db.select().from(users).innerJoin(pets, eq(users.id, pets.ownerId));
// SELECT ... FROM "users" INNER JOIN "pets" ON "users"."id" = "pets"."owner_id"
```

### Full Join
```typescript
const result = await db.select().from(users).fullJoin(pets, eq(users.id, pets.ownerId));
// SELECT ... FROM "users" FULL JOIN "pets" ON "users"."id" = "pets"."owner_id"
```

### Cross Join
```typescript
const result = await db.select().from(users).crossJoin(pets);
// SELECT ... FROM "users" CROSS JOIN "pets"
```

### Lateral Joins

Left Join Lateral:
```typescript
const subquery = db.select().from(pets).where(gte(users.age, 16)).as('userPets');
const result = await db.select().from(users).leftJoinLateral(subquery, sql`true`);
```

## Partial Select

Select specific fields with flat response:
```typescript
await db.select({
  userId: users.id,
  petId: pets.id,
}).from(users).leftJoin(pets, eq(users.id, pets.ownerId));
```

Use nested objects to avoid nullable fields:
```typescript
await db.select({
  userId: users.id,
  userName: users.name,
  pet: {
    id: pets.id,
    name: pets.name,
  }
}).from(users).fullJoin(pets, eq(users.id, pets.ownerId));
```

## Aliases & Self Joins

```typescript
const parent = alias(user, "parent");
const result = db
  .select()
  .from(user)
  .leftJoin(parent, eq(parent.id, user.parentId));
```

## Many-to-Many Example

```typescript
const usersToChatGroups = sqliteTable('usersToChatGroups', {
  userId: integer('user_id').notNull().references(() => users.id),
  groupId: integer('group_id').notNull().references(() => chatGroups.id),
});

db.select()
  .from(usersToChatGroups)
  .leftJoin(users, eq(usersToChatGroups.userId, users.id))
  .leftJoin(chatGroups, eq(usersToChatGroups.groupId, chatGroups.id))
  .where(eq(chatGroups.id, 1))
  .all();
```
