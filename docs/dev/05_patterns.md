# OpenCode Common Patterns

> Code patterns and templates for common tasks
> Read this before implementing new features

---

## Table of Contents

1. [Effect Service Pattern](#1-effect-service-pattern)
2. [Sync Event Pattern](#2-sync-event-pattern)
3. [Context Provider Pattern](#3-context-provider-pattern)
4. [Store Update Pattern](#4-store-update-pattern)
5. [Adding New Features](#5-adding-new-features)

---

## 1. Effect Service Pattern

Used throughout `packages/opencode/src/` for dependency injection and error handling.

### Complete Template

```typescript
// 1. Define Schema (for validation)
import { Schema } from "effect"
const MyInput = Schema.Struct({ name: Schema.String })
type MyInput = Schema.Type<typeof MyInput>

// 2. Define Error Types
class MyError extends Schema.TaggedError<MyError>()("MyError", {
  cause: Schema.String,
}) {}

// 3. Define Interface (what the service does)
interface MyService {
  readonly doSomething: (input: MyInput) => Effect.Effect<string, MyError>
  readonly getData: () => Effect.Effect<Data>
}

// 4. Define Service Class (attaches interface to context)
export class MyService extends Context.Service<MyService, MyService>()("@opencode/MyService") {}

// 5. Create Layer (implementation)
export const myServiceLayer: Layer.Layer<MyService, MyError, Dependencies> = Layer.effect(
  MyService,
  Effect.gen(function* () {
    const dep = yield* DependencyService

    return MyService.of({
      doSomething: (input) =>
        Effect.succeed(input.name).pipe(
          Effect.mapError((e) => new MyError({ cause: String(e) }))
        ),
      getData: () => Effect.succeed({}).pipe(Effect.orDie),
    })
  })
)

// 6. Use in code
const result = yield* (MyService)
const data = yield* (MyService).getData()
```

### Key Effect Combinators

```typescript
// Success
Effect.succeed(value)
Effect.gen(function* () { return value })

// Failure
Effect.fail(new MyError({ cause: "failed" }))
Effect.try({ try: () => risky(), catch: (e) => new MyError({ cause: String(e) }) })

// Map success
Effect.map(result, (v) => v * 2)

// FlatMap (chain effects)
Effect.flatMap(result, (v) => v > 0 ? success : Effect.fail(new MyError(...)))

// Map error
Effect.mapError(result, (e) => new MyOtherError(...))

// Run
Effect.runPromise(effect)      // Async
Effect.runSync(effect)        // Sync only!
```

### Runtime Creation

```typescript
// packages/opencode/src/effect/run-service.ts
import { makeRuntime } from "./effect/run-service"

const runtime = makeRuntime(Service, layer)
const result = runtime.runPromise(effect)
```

---

## 2. Sync Event Pattern

Used for event sourcing in `packages/opencode/src/sync/`.

### Complete Template

```typescript
// 1. Define Schema
import { SyncEvent, type Projector } from "../sync"

// 2. Define Event
const MyEvent = SyncEvent.define({
  type: "my.event",
  version: 1,
  aggregate: "entityID",  // Events belong to this entity
  schema: z.object({
    entityID: z.string(),
    data: z.string(),
  }),
  busSchema: z.object({  // For backwards compat with Bus
    entityID: z.string(),
    data: z.string(),
  }),
})

// 3. Create Projector
const projectMyEvent: Projector<typeof MyEvent> = (state, event) => {
  // Update state based on event
  return {
    ...state,
    items: [...state.items, { id: event.entityID, data: event.data }],
  }
}

// 4. Register Projector (in projectors.ts)
EventMap.set(MyEvent, projectMyEvent)

// 5. Run Event (records + publishes)
SyncEvent.run(MyEvent, { entityID: "123", data: "value" })

// 6. Subscribe (for real-time updates)
subscribe(BusEvent.MyEvent, (payload) => {
  console.log("My event happened:", payload.entityID)
})
```

### Event Versioning

```typescript
const MyEvent = SyncEvent.define({
  type: "my.event",
  version: 2,  // Bump version when schema changes
  migrate: {
    1: (old) => ({ ...old, newField: "default" }),  // Migrate from v1
  },
  // ... rest of definition
})
```

---

## 3. Context Provider Pattern

Used in `packages/app/src/context/` for SolidJS state management.

### Simple Provider

```typescript
// packages/app/src/context/myservice.tsx
import { createSimpleContext } from "@opencode-ai/ui/context"

export const { use: useMyService, provider: MyServiceProvider } = createSimpleContext({
  name: "MyService",
  init: () => {
    const sdk = useSDK()

    return {
      doSomething: () => sdk.client.someMethod(),
    }
  },
})
```

### Provider with Gate (Wait for Ready)

```typescript
export const { use: useMyService, provider: MyServiceProvider } = createSimpleContext({
  name: "MyService",
  init: () => {
    const [state, setState] = createStore({ ready: false })

    onMount(() => {
      initialize().then(() => setState("ready", true))
    })

    return {
      ready: () => state.ready,
      doSomething: () => { /* ... */ },
    }
  },
  gate: true,  // Children only render when ready() returns true
})
```

### Provider with Props

```typescript
export const { use: useMyService, provider: MyServiceProvider } = createSimpleContext({
  name: "MyService",
  init: (props: { initialValue: string }) => {
    const [value, setValue] = createSignal(props.initialValue)

    return {
      value,
      setValue,
    }
  },
})

// Usage
<MyServiceProvider initialValue="hello">
  <Child />
</MyServiceProvider>
```

---

## 4. Store Update Pattern

### Basic Store

```typescript
import { createStore, produce } from "solid-js/store"

const [store, setStore] = createStore({
  items: [] as Item[],
  count: 0,
})

// Immutable update
setStore("count", c => c + 1)

// Array push
setStore("items", (items) => [...items, newItem])

// Object merge
setStore("config", { ...store.config, newKey: value })
```

### With Produce (Mutable-style but Immutable)

```typescript
setStore(produce((draft) => {
  draft.items.push(newItem)
  draft.count = draft.items.length
}))
```

### Conditional Update

```typescript
setStore(
  produce((draft) => {
    if (condition) {
      draft.status = "done"
    }
  })
)
```

### Intercept Store Updates (for Sync)

```typescript
// From global-sync.tsx - intercepts project updates
const set = ((...input: unknown[]) => {
  if (input[0] === "project" && (Array.isArray(input[1]) || typeof input[1] === "function")) {
    // Custom logic before update
    cacheProjects()
    return input[1]
  }
  return (setGlobalStore as (...args: unknown[]) => unknown)(...input)
}) as typeof setGlobalStore
```

---

## 5. Adding New Features

### Adding a New CLI Command

```typescript
// 1. Create: packages/opencode/src/cli/cmd/newcmd.ts
export const NewCmd = {
  command: "newcmd",
  describe: "Does something amazing",
  handler: async (args) => {
    const runtime = await createRuntime()
    const result = await runtime.runPromise(doSomething(args.name))
    console.log(result)
  },
  builder: (yargs) =>
    yargs
      .option("name", { type: "string", demandOption: true })
      .example("opencode newcmd --name world", "Run with name"),
} as const

// 2. Register in packages/opencode/src/index.ts
yargs.command(NewCmd)
```

### Adding a New API Route

```typescript
// 1. Create: packages/opencode/src/server/routes/instance/myroute.ts
const router = new Hono()

router.get("/resource", async (c) => {
  const directory = c.get("directory")
  const result = await Effect.runPromise(myService.get(directory))
  return c.json(result)
})

router.post("/resource", async (c) => {
  const body = await c.req.json()
  const result = await Effect.runPromise(myService.create(body))
  return c.json(result, 201)
})

export { router as MyRoute }

// 2. Mount in server/routes/instance/index.ts
export function InstanceRoutes() {
  return new Hono()
    .route("/myroute", MyRoute)
    // ... other routes
}
```

### Adding a New Sync Event

```typescript
// 1. Define event in appropriate module
// packages/opencode/src/session/events.ts

const SessionEvent = SyncEvent.define({
  type: "session.myevent",
  version: 1,
  aggregate: "sessionID",
  schema: z.object({
    sessionID: SessionID.zod,
    data: z.string(),
  }),
})

// 2. Create projector
const projectSessionEvent: Projector<typeof SessionEvent> = (state, event) => {
  return { ...state, myData: event.data }
}

// 3. Register in packages/opencode/src/server/projectors.ts
EventMap.set(SessionEvent, projectSessionEvent)

// 4. Use it
SyncEvent.run(SessionEvent, { sessionID: "xxx", data: "value" })
```

### Adding a New Frontend Context Provider

```typescript
// 1. Create: packages/app/src/context/mycontext.tsx
export const { use: useMyContext, provider: MyContextProvider } = createSimpleContext({
  name: "MyContext",
  init: () => {
    const sdk = useSDK()
    const globalSync = useGlobalSync()

    return {
      doSomething: () => sdk.client.resource.do(),
      projects: globalSync.data.project,
    }
  },
})

// 2. Add to provider chain in packages/app/src/app.tsx
// Find the appropriate location in the provider hierarchy

// 3. Use in components
function MyComponent() {
  const { doSomething } = useMyContext()
  return <button onClick={doSomething}>Do</button>
}
```

### Adding a New Database Table

```typescript
// 1. Create schema: packages/opencode/src/mydomain/mytable.sql.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const MyTable = sqliteTable("my_table", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
})

// 2. Create repo: packages/opencode/src/mydomain/myrepo.ts
export class MyRepo extends Context.Service<MyRepo>()("@opencode/MyRepo") {
  constructor(private readonly db: Database) {
    super()
  }

  create = (data: { name: string }) =>
    Effect.tryPromise({
      try: () => this.db.insert(MyTable).values(data).returning(),
      catch: (e) => new DatabaseError({ cause: String(e) }),
    })
}

// 3. Add layer to dependency graph
export const myRepoLayer = Layer.effect(
  MyRepo,
  Effect.gen(function* () {
    const db = yield* Database
    return new MyRepo(db)
  })
)
```

### Adding a New UI Component

```typescript
// 1. Create: packages/ui/src/components/my-component.tsx
import { splitProps, type JSX } from "solid-js"
import "./my-component.css"

interface MyComponentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "destructive"
}

export function MyComponent(props: MyComponentProps) {
  const [local, rest] = splitProps(props, ["variant", "children"])

  return (
    <div
      class={`my-component variant-${local.variant ?? "default"}`}
      {...rest}
    >
      {local.children}
    </div>
  )
}

// 2. Create CSS: packages/ui/src/components/my-component.css
@layer components {
  .my-component {
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .my-component.variant-primary {
    background: var(--color-primary);
  }
}
```

---

## Error Handling Patterns

### Backend (Effect)

```typescript
// Define errors
class NotFoundError extends Schema.TaggedError<NotFoundError>()("NotFoundError", {
  resource: Schema.String,
  id: Schema.String,
}) {}

class ValidationError extends Schema.TaggedError<ValidationError>()("ValidationError", {
  fields: Schema.Record(Schema.String, Schema.String),
}) {}

// Use in service
const findById = (id: string) =>
  Effect.tryPromise({
    try: () => db.find(id),
    catch: () => new NotFoundError({ resource: "User", id }),
  }).pipe(
    Effect.flatMap((user) =>
      user ? Effect.succeed(user) : Effect.fail(new NotFoundError({ resource: "User", id }))
    )
  )
```

### Frontend

```typescript
// Server errors
try {
  await sdk.client.resource.do()
} catch (error) {
  if (error.status === 404) {
    showToast({ title: "Not found", variant: "error" })
  } else if (error.status === 400) {
    const issues = error.data.issues
    showToast({ title: "Validation failed", description: issues[0].message })
  }
}
```

---

## Testing Patterns

### Backend (Effect)

```typescript
import { Effect, Layer } from "effect"
import { describe, it, expect } from "bun:test"

describe("MyService", () => {
  it("should do something", () => {
    const program = Effect.gen(function* () {
      const service = yield* MyService
      const result = yield* service.doSomething({ name: "test" })
      expect(result).toBe("test")
    })

    const runtime = makeRuntime(MyService, myServiceLayer)
    runtime.runPromise(program)
  })
})
```

### Frontend

```typescript
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "bun:test"

describe("MyComponent", () => {
  it("should render", () => {
    render(<MyComponent>Hello</MyComponent>)
    expect(screen.getByText("Hello")).toBeDefined()
  })
})
```

---

## Migration Patterns

### Persisted State Migration

```typescript
// In persist.ts
export const Persist = {
  global(key: string, legacy?: string[]): PersistTarget {
    return {
      storage: GLOBAL_STORAGE,
      key,
      legacy,  // Previous storage keys to migrate from
    }
  },
}

// Legacy migration happens automatically if legacy keys are provided
```

### Store Schema Migration

```typescript
// In layout.tsx - migrate function
const migrate = (value: unknown) => {
  if (!isRecord(value)) return value

  // Add new fields with defaults
  return {
    ...value,
    newField: value.newField ?? "default",
    version: (value.version ?? 0) + 1,
  }
}
```
