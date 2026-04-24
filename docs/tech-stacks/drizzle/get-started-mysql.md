---
title: Drizzle ORM MySQL
description: Getting started with Drizzle ORM and MySQL
source: https://orm.drizzle.team/docs/get-started-mysql
---

# Drizzle <> MySQL

To use Drizzle with a MySQL database, you should use the `mysql2` driver.

According to the **[official website](https://github.com/sidorares/node-mysql2)**, `mysql2` is a MySQL client for Node.js with focus on performance.

Drizzle ORM natively supports `mysql2` with `drizzle-orm/mysql2` package.

### Step 1 - Install packages

```bash
npm i drizzle-orm mysql2
npm i -D drizzle-kit
```

### Step 2 - Initialize the driver and make a query

```typescript
import { drizzle } from 'drizzle-orm/mysql2';

const db = drizzle(process.env.DATABASE_URL);

const response = await db.select().from(...)
```

With config:

```typescript
import { drizzle } from 'drizzle-orm/mysql2';

const db = drizzle({ connection:{ uri: process.env.DATABASE_URL }});

const response = await db.select().from(...)
```

With client connection:

```typescript
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'host',
  user: 'user',
  database: 'database',
});

const db = drizzle({ client: connection });
```

With pool connection:

```typescript
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const poolConnection = mysql.createPool({
  host: 'host',
  user: 'user',
  database: 'database',
});

const db = drizzle({ client: poolConnection });
```

> For the built in `migrate` function with DDL migrations we and drivers strongly encourage you to use single `client` connection.
> For querying purposes feel free to use either `client` or `pool` based on your business demands.

## What's next?

**Manage schema**

- [Drizzle Schema](/docs/sql-schema-declaration)
- [MySQL data types](/docs/column-types/mysql)
- [Indexes and Constraints](/docs/indexes-constraints)
- [Database Views](/docs/views)
- [Database Schemas](/docs/schemas)
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
