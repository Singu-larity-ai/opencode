---
title: Operators
source: https://orm.drizzle.team/docs/operators
description: Drizzle ORM filter and conditional operators
---

# Filter and Conditional Operators

Drizzle natively supports all dialect-specific filter and conditional operators.

```typescript
import { eq, ne, gt, gte, lt, lte, and, or, not, inArray, like, isNull, between } from "drizzle-orm";
```

## Comparison Operators

### eq - Equal to
```typescript
import { eq } from "drizzle-orm";

db.select().from(table).where(eq(table.column, 5));
// SELECT * FROM table WHERE table.column = 5
```

### ne - Not equal to
```typescript
import { ne } from "drizzle-orm";

db.select().from(table).where(ne(table.column, 5));
// SELECT * FROM table WHERE table.column <> 5
```

### gt - Greater than
```typescript
import { gt } from "drizzle-orm";

db.select().from(table).where(gt(table.column, 5));
// SELECT * FROM table WHERE table.column > 5
```

### gte - Greater than or equal
```typescript
import { gte } from "drizzle-orm";

db.select().from(table).where(gte(table.column, 5));
// SELECT * FROM table WHERE table.column >= 5
```

### lt - Less than
```typescript
import { lt } from "drizzle-orm";

db.select().from(table).where(lt(table.column, 5));
// SELECT * FROM table WHERE table.column < 5
```

### lte - Less than or equal
```typescript
import { lte } from "drizzle-orm";

db.select().from(table).where(lte(table.column, 5));
// SELECT * FROM table WHERE table.column <= 5
```

## Null Checks

### isNull
```typescript
import { isNull } from "drizzle-orm";

db.select().from(table).where(isNull(table.column));
// SELECT * FROM table WHERE table.column IS NULL
```

### isNotNull
```typescript
import { isNotNull } from "drizzle-orm";

db.select().from(table).where(isNotNull(table.column));
// SELECT * FROM table WHERE table.column IS NOT NULL
```

## Array Operators

### inArray
```typescript
import { inArray } from "drizzle-orm";

db.select().from(table).where(inArray(table.column, [1, 2, 3, 4]));
// SELECT * FROM table WHERE table.column in (1, 2, 3, 4)
```

### notInArray
```typescript
import { notInArray } from "drizzle-orm";

db.select().from(table).where(notInArray(table.column, [1, 2, 3, 4]));
// SELECT * FROM table WHERE table.column NOT in (1, 2, 3, 4)
```

## Range Operators

### between
```typescript
import { between } from "drizzle-orm";

db.select().from(table).where(between(table.column, 2, 7));
// SELECT * FROM table WHERE table.column BETWEEN 2 AND 7
```

### notBetween
```typescript
import { notBetween } from "drizzle-orm";

db.select().from(table).where(notBetween(table.column, 2, 7));
// SELECT * FROM table WHERE table.column NOT BETWEEN 2 AND 7
```

## String Operators

### like (case sensitive)
```typescript
import { like } from "drizzle-orm";

db.select().from(table).where(like(table.column, "%llo wor%"));
// SELECT * FROM table WHERE table.column LIKE '%llo wor%'
```

### ilike (case insensitive)
```typescript
import { ilike } from "drizzle-orm";

db.select().from(table).where(ilike(table.column, "%llo wor%"));
// SELECT * FROM table WHERE table.column ILIKE '%llo wor%'
```

## Logical Operators

### and
```typescript
import { and } from "drizzle-orm";

db.select().from(table).where(and(gt(table.column, 5), lt(table.column, 7)));
// SELECT * FROM table WHERE (table.column > 5 AND table.column < 7)
```

### or
```typescript
import { or } from "drizzle-orm";

db.select().from(table).where(or(gt(table.column, 5), lt(table.column, 7)));
// SELECT * FROM table WHERE (table.column > 5 OR table.column < 7)
```

### not
```typescript
import { not } from "drizzle-orm";

db.select().from(table).where(not(eq(table.column, 5)));
// SELECT * FROM table WHERE NOT (table.column = 5)
```

## Existence Operators

### exists
```typescript
import { exists } from "drizzle-orm";

const query = db.select().from(table2);
db.select().from(table).where(exists(query));
// SELECT * FROM table WHERE EXISTS (SELECT * from table2)
```

### notExists
```typescript
import { notExists } from "drizzle-orm";

const query = db.select().from(table2);
db.select().from(table).where(notExists(query));
// SELECT * FROM table WHERE NOT EXISTS (SELECT * from table2)
```
