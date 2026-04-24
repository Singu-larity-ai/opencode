---
title: Drizzle Schema Declaration
description: How to define database schemas in Drizzle ORM
source: https://orm.drizzle.team/docs/sql-schema-declaration
---

# Drizzle schema

Drizzle lets you define a schema in TypeScript with various models and properties supported by the underlying database. When you define your schema, it serves as the source of truth for future modifications in queries (using Drizzle-ORM) and migrations (using Drizzle-Kit).

## Organize your schema files

You can declare your SQL schema directly in TypeScript either in a single `schema.ts` file, or you can spread them around.

### Schema in 1 file

The most common way to declare your schema with Drizzle is to put all your tables into one `schema.ts` file.

```typescript
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  age: integer().notNull(),
  email: varchar().notNull().unique(),
});
```

### Schema in multiple files

You can place your Drizzle models in any file you prefer. The only requirement is that you export all the models so that Drizzle Kit can import them.

```
📦 <project root>
 └ 📂 src
    └ 📂 db
       └ 📂 schema
          ├ 📜 users.ts
          ├ 📜 countries.ts
          └ 📜 cities.ts
```

## Shape your data schema

Drizzle schema consists of several model types:

- Tables with columns, constraints, etc.
- Schemas (PostgreSQL only)
- Enums
- Sequences (PostgreSQL only)
- Views
- Materialized Views

### Tables and columns declaration

A table in Drizzle should be defined with at least 1 column. You need to choose a dialect you are using: PostgreSQL, MySQL, or SQLite.

**PostgreSQL:**

```typescript
import { pgTable, integer, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
});
```

**MySQL:**

```typescript
import { mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int().primaryKey().autoincrement(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
});
```

**SQLite:**

```typescript
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
});
```

## Camel and Snake casing

Database model names often use `snake_case` conventions, while in TypeScript it's common to use `camelCase`. Drizzle provides the `casing` option to automatically map between them:

```typescript
const db = drizzle({
  connection: process.env.DATABASE_URL,
  casing: 'snake_case'
});
```

## Column types

### PostgreSQL Column Types

```typescript
import { pgTable, serial, text, integer, boolean, timestamp, json, uuid } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial().primaryKey(),
  name: text().notNull(),
  price: integer().notNull(),
  inStock: boolean().default(true),
  createdAt: timestamp().defaultNow(),
  metadata: json(),
  guid: uuid().defaultRandom(),
});
```

### MySQL Column Types

```typescript
import { mysqlTable, int, text, tinyint, datetime, json } from 'drizzle-orm/mysql-core';

export const products = mysqlTable('products', {
  id: int().primaryKey().autoincrement(),
  name: text().notNull(),
  price: int().notNull(),
  inStock: tinyint().default(1),
  createdAt: datetime().defaultNow(),
  metadata: json(),
});
```

### SQLite Column Types

```typescript
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  price: integer().notNull(),
  rating: real(),
});
```

## Constraints

### Primary Key

```typescript
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial().primaryKey(),
  name: varchar(),
});
```

### Not Null

```typescript
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
});
```

### Unique

```typescript
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial().primaryKey(),
  email: varchar().unique(),
});
```

### Default Value

```typescript
import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial().primaryKey(),
  name: varchar().default('Anonymous'),
  createdAt: timestamp().defaultNow(),
});
```

### Check Constraint

```typescript
import { pgTable, serial, integer, check } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial().primaryKey(),
  price: integer().check((table) => gte(table.price, 0)),
  discountPrice: integer(),
}, (table) => [
  check('price_check', gte(table.price, table.discountPrice))
]);
```

## Indexes

```typescript
import { pgTable, serial, varchar, index, uniqueIndex } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial().primaryKey(),
  email: varchar(),
  name: varchar(),
}, (table) => [
  index('email_idx').on(table.email),
  uniqueIndex('name_idx').on(table.name),
]);
```

## Relations

### One-to-One

```typescript
import { pgTable, serial, text, foreignKey } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial().primaryKey(),
  name: text().notNull(),
});

export const profiles = pgTable('profiles', {
  id: serial().primaryKey(),
  userId: integer().references(() => users.id),
  bio: text(),
});
```

### One-to-Many

```typescript
import { pgTable, serial, text, foreignKey, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial().primaryKey(),
  name: text().notNull(),
});

export const posts = pgTable('posts', {
  id: serial().primaryKey(),
  title: text().notNull(),
  userId: integer().references(() => users.id),
});
```

### Many-to-Many

```typescript
import { pgTable, serial, text, integer, primaryKey } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial().primaryKey(),
  name: text().notNull(),
});

export const posts = pgTable('posts', {
  id: serial().primaryKey(),
  title: text().notNull(),
});

export const usersToPosts = pgTable('users_to_posts', {
  userId: integer().references(() => users.id),
  postId: integer().references(() => posts.id),
}, (table) => [
  primaryKey({ columns: [table.userId, table.postId] })
]);
```

## Enums

```typescript
import { pgEnum } from 'drizzle-orm/pg-core';

export const roles = pgEnum('roles', ['guest', 'user', 'admin']);

export const users = pgTable('users', {
  id: serial().primaryKey(),
  role: roles().default('guest'),
});
```

## What's next?

- [Indexes and Constraints](/docs/indexes-constraints)
- [Database Views](/docs/views)
- [Database Schemas](/docs/schemas)
- [Sequences](/docs/sequences)
- [Relations](/docs/relations-schema-declaration)
- [Migrations](/docs/migrations)
