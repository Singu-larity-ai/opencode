import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { Timestamps } from "../../storage/schema.sql"

export const AuthUserTable = sqliteTable("auth_user", {
  id: text().primaryKey(),
  authing_id: text().notNull().unique(),
  email: text(),
  name: text(),
  avatar_url: text(),
  ...Timestamps,
})

export const AuthSessionTable = sqliteTable("auth_session", {
  id: text().primaryKey(),
  user_id: text()
    .notNull()
    .references(() => AuthUserTable.id, { onDelete: "cascade" }),
  token_hash: text().notNull(),
  expires_at: integer().notNull(),
  ...Timestamps,
})
