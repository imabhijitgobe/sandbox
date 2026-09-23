import { and, desc, eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"
import type { UIMessage } from "ai"

import { db } from "@/db"
import { games } from "@/db/schema"

export async function listGames() {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  return db
    .select()
    .from(games)
    .where(eq(games.organizationId, orgId))
    .orderBy(desc(games.createdAt))
}

export async function getGame(id: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const [game] = await db
    .select()
    .from(games)
    .where(and(eq(games.id, id), eq(games.organizationId, orgId)))
    .limit(1)

  return game ?? null
}

export async function updateGameMessages(id: string, messages: UIMessage[]) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const [game] = await db
    .update(games)
    .set({ messages })
    .where(and(eq(games.id, id), eq(games.organizationId, orgId)))
    .returning()

  return game ?? null
}
