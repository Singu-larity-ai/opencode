import { eq, and, gt, lt, sql } from "drizzle-orm"
import { use } from "../../storage/db"
import { AuthSessionTable, AuthUserTable } from "./schema.sql"
import type { AuthUser } from "./user"

export type AuthSession = typeof AuthSessionTable.$inferSelect

const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

export function create(params: { userId: string; tokenHash: string }): AuthSession {
  const id = crypto.randomUUID()
  const expires_at = Date.now() + SESSION_MAX_AGE_MS
  use((db) => db.insert(AuthSessionTable).values({ id, user_id: params.userId, token_hash: params.tokenHash, expires_at }))
  return { id, user_id: params.userId, token_hash: params.tokenHash, expires_at, time_created: Date.now(), time_updated: Date.now() }
}

export function findValidWithUser(tokenHash: string): { session: AuthSession; user: AuthUser } | undefined {
  const now = Date.now()
  const row = use((db) =>
    db
      .select()
      .from(AuthSessionTable)
      .innerJoin(AuthUserTable, eq(AuthSessionTable.user_id, AuthUserTable.id))
      .where(and(eq(AuthSessionTable.token_hash, tokenHash), gt(AuthSessionTable.expires_at, now)))
      .get(),
  )
  if (!row) return undefined
  return { session: row.auth_session, user: row.auth_user }
}

export function deleteById(id: string) {
  use((db) => db.delete(AuthSessionTable).where(eq(AuthSessionTable.id, id)))
}

export function deleteByUserId(userId: string) {
  use((db) => db.delete(AuthSessionTable).where(eq(AuthSessionTable.user_id, userId)))
}

export function cleanExpired() {
  const now = Date.now()
  use((db) => db.delete(AuthSessionTable).where(lt(AuthSessionTable.expires_at, now)))
}
