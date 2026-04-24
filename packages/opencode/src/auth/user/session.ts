import { eq, and, gt, lt } from "drizzle-orm"
import { db, AuthSessionTable, AuthUserTable } from "./db"
import type { AuthUser } from "./user"

export type AuthSession = typeof AuthSessionTable.$inferSelect

const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

export function create(params: { userId: string; tokenHash: string }): AuthSession {
  const id = crypto.randomUUID()
  const now = Date.now()
  const expires_at = now + SESSION_MAX_AGE_MS
  db.insert(AuthSessionTable).values({ id, user_id: params.userId, token_hash: params.tokenHash, expires_at, time_created: now, time_updated: now }).run()
  return { id, user_id: params.userId, token_hash: params.tokenHash, expires_at, time_created: now, time_updated: now }
}

export function findValidWithUser(tokenHash: string): { session: AuthSession; user: AuthUser } | undefined {
  const now = Date.now()
  const row = db
    .select()
    .from(AuthSessionTable)
    .innerJoin(AuthUserTable, eq(AuthSessionTable.user_id, AuthUserTable.id))
    .where(and(eq(AuthSessionTable.token_hash, tokenHash), gt(AuthSessionTable.expires_at, now)))
    .get()
  if (!row) return undefined
  return { session: row.auth_session, user: row.auth_user }
}

export function deleteByUserId(userId: string) {
  db.delete(AuthSessionTable).where(eq(AuthSessionTable.user_id, userId)).run()
}

export function cleanExpired() {
  const now = Date.now()
  db.delete(AuthSessionTable).where(lt(AuthSessionTable.expires_at, now)).run()
}
