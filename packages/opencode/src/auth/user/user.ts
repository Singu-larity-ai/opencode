import { eq } from "drizzle-orm"
import { db, AuthUserTable } from "./db"

export type AuthUser = typeof AuthUserTable.$inferSelect

export function findById(id: string): AuthUser | undefined {
  return db.select().from(AuthUserTable).where(eq(AuthUserTable.id, id)).get()
}

export function findByCasdoorId(casdoorId: string): AuthUser | undefined {
  return db.select().from(AuthUserTable).where(eq(AuthUserTable.casdoor_id, casdoorId)).get()
}

export function list(): AuthUser[] {
  return db.select().from(AuthUserTable).all()
}

export function updateBio(id: string, bio?: string): AuthUser {
  db.update(AuthUserTable).set({ bio: bio ?? null, time_updated: Date.now() }).where(eq(AuthUserTable.id, id)).run()
  return findById(id)!
}

export function upsert(params: { casdoor_id: string; email?: string; name?: string; avatar_url?: string }): AuthUser {
  const existing = findByCasdoorId(params.casdoor_id)
  if (existing) {
    const updates: Partial<{ email: string | null; name: string | null; avatar_url: string | null; time_updated: number }> = { time_updated: Date.now() }
    if (params.email !== undefined) updates.email = params.email
    if (params.name !== undefined) updates.name = params.name
    if (params.avatar_url !== undefined) updates.avatar_url = params.avatar_url
    db.update(AuthUserTable).set(updates).where(eq(AuthUserTable.id, existing.id)).run()
    return { ...existing, ...updates } as AuthUser
  }
  const id = crypto.randomUUID()
  const now = Date.now()
  db.insert(AuthUserTable).values({ id, casdoor_id: params.casdoor_id, email: params.email ?? null, name: params.name ?? null, avatar_url: params.avatar_url ?? null, bio: null, time_created: now, time_updated: now }).run()
  return { id, casdoor_id: params.casdoor_id, email: params.email ?? null, name: params.name ?? null, avatar_url: params.avatar_url ?? null, bio: null, time_created: now, time_updated: now }
}
