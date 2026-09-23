import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const games = pgTable("games", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: text("organizationId").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
})
