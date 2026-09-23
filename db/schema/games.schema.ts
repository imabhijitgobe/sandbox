import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import type { UIMessage } from "ai"

export const games = pgTable("games", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: text("organizationId").notNull(),
  title: text("title").notNull(),
  messages: jsonb("messages").$type<UIMessage[]>().notNull().default([]),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
})
