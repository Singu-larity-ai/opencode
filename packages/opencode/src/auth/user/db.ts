import Database from "bun:sqlite"
import { drizzle } from "drizzle-orm/bun-sqlite"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import path from "path"
import os from "os"
import fs from "fs"

const dataDir = path.join(os.homedir(), ".local", "share", "opencode")
fs.mkdirSync(dataDir, { recursive: true })

const sqlite = new Database(path.join(dataDir, "auth.db"))
sqlite.run("PRAGMA journal_mode = WAL")
sqlite.run("PRAGMA foreign_keys = ON")

sqlite.run(`CREATE TABLE IF NOT EXISTS auth_user (
  id TEXT PRIMARY KEY,
  casdoor_id TEXT NOT NULL UNIQUE,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  bio TEXT,
  time_created INTEGER NOT NULL,
  time_updated INTEGER NOT NULL
)`)

sqlite.run(`CREATE TABLE IF NOT EXISTS auth_session (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES auth_user(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  time_created INTEGER NOT NULL,
  time_updated INTEGER NOT NULL
)`)

sqlite.run(`CREATE INDEX IF NOT EXISTS auth_session_user_id_idx ON auth_session (user_id)`)
sqlite.run(`CREATE INDEX IF NOT EXISTS auth_user_casdoor_id_idx ON auth_user (casdoor_id)`)

export const AuthUserTable = sqliteTable("auth_user", {
  id: text().primaryKey(),
  casdoor_id: text().notNull().unique(),
  email: text(),
  name: text(),
  avatar_url: text(),
  bio: text(),
  time_created: integer().notNull(),
  time_updated: integer().notNull(),
})

export const AuthSessionTable = sqliteTable("auth_session", {
  id: text().primaryKey(),
  user_id: text().notNull(),
  token_hash: text().notNull(),
  expires_at: integer().notNull(),
  time_created: integer().notNull(),
  time_updated: integer().notNull(),
})

export const db = drizzle({ client: sqlite })
