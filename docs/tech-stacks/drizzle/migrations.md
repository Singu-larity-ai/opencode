---
title: Migrations
source: https://orm.drizzle.team/docs/migrations
description: Drizzle ORM migrations fundamentals
---

# Drizzle Migrations

SQL databases require you to specify a strict schema of entities upfront, and if you need to change the shape of those entities, you need to do it via schema migrations.

## Migration Approaches

Drizzle Kit provides multiple production-grade ways of managing migrations:

### Database First Approach

Your database schema is the source of truth. You manage your database schema and pull it to your codebase.

```bash
drizzle-kit pull
```

This reads your database and generates TypeScript schema files.

### Codebase First Approach

Your TypeScript Drizzle schema is the source of truth.

**Option 1: Push schema directly**
```bash
drizzle-kit push
```
Drizzle compares your schema to the database and applies changes directly. Best for rapid prototyping.

**Option 2: Generate migration files**
```bash
drizzle-kit generate
```
Generates SQL migration files that you can review and apply.

**Option 3: Export SQL**
```bash
drizzle-kit export
```
Outputs SQL representation of your schema to the console.

## Drizzle Kit Commands

### migrate
Applies pending migrations to the database.
```bash
drizzle-kit migrate
```

### generate
Generates SQL migration files based on schema diff.
```bash
drizzle-kit generate
```

### push
Pushes schema changes directly to the database (no migration files).
```bash
drizzle-kit push
```

### pull
Pulls database schema to TypeScript files.
```bash
drizzle-kit pull
```

### studio
Opens Drizzle Studio - a database browser.
```bash
drizzle-kit studio
```

## Runtime Migrations

Apply migrations during application runtime:

```typescript
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const db = drizzle(process.env.DATABASE_URL);
await migrate(db);
```

## Migration File Structure

```
drizzle/
  20242409125510_premium_mister_fear/
    snapshot.json    # Schema snapshot
    migration.sql    # SQL migration statements
```
