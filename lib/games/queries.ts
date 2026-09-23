import { desc, eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"

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
