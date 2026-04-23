import { eq } from "drizzle-orm"
import { use } from "../../storage/db"
import { AuthUserTable } from "./schema.sql"

export type AuthUser = typeof AuthUserTable.$inferSelect
export type NewAuthUser = typeof AuthUserTable.$inferInsert

export function findById(id: string): AuthUser | undefined {
  return use((db) => db.select().from(AuthUserTable).where(eq(AuthUserTable.id, id)).get())
}

export function findByAuthingId(authingId: string): AuthUser | undefined {
  return use((db) => db.select().from(AuthUserTable).where(eq(AuthUserTable.authing_id, authingId)).get())
}

export function upsert(params: { authing_id: string; email?: string; name?: string; avatar_url?: string }): AuthUser {
  const existing = findByAuthingId(params.authing_id)
  if (existing) {
    const updates: Partial<NewAuthUser> = {}
    if (params.email !== undefined) updates.email = params.email
    if (params.name !== undefined) updates.name = params.name
    if (params.avatar_url !== undefined) updates.avatar_url = params.avatar_url
    if (Object.keys(updates).length > 0) {
      use((db) => db.update(AuthUserTable).set(updates).where(eq(AuthUserTable.id, existing.id)))
    }
    return { ...existing, ...updates } as AuthUser
  }
  const id = crypto.randomUUID()
  use((db) => db.insert(AuthUserTable).values({ id, ...params }))
  return { id, authing_id: params.authing_id, email: params.email ?? null, name: params.name ?? null, avatar_url: params.avatar_url ?? null, time_created: Date.now(), time_updated: Date.now() }
}
