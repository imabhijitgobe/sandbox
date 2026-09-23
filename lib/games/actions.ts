"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

import { db } from "@/db"
import { games } from "@/db/schema"

export async function createGame(title: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const trimmed = title.trim()

  if (!trimmed) {
    throw new Error("Title is required")
  }

  const [game] = await db
    .insert(games)
    .values({ organizationId: orgId, title: trimmed })
    .returning()

  revalidatePath("/")

  return game
}
