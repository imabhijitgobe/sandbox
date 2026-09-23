"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { google } from "@ai-sdk/google"
import { generateText } from "ai"

import { db } from "@/db"
import { games } from "@/db/schema"

export async function createGame(prompt: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const trimmed = prompt.trim()

  if (!trimmed) {
    throw new Error("Title is required")
  }

  const { text } = await generateText({
    model: google("gemini-3.5-flash-lite"),
    system:
      "Generate a short title (max 6 words, no quotes, no punctuation at the end) for a game based on the user's description.",
    prompt: trimmed,
  })

  const title = text.trim().replace(/^["']|["']$/g, "") || trimmed.slice(0, 60)

  const [game] = await db
    .insert(games)
    .values({ organizationId: orgId, title })
    .returning()

  revalidatePath("/")

  return game
}
