import { auth } from "@clerk/nextjs/server"
import { google } from "@ai-sdk/google"
import { convertToModelMessages, streamText } from "ai"
import { after } from "next/server"

import { getGame, updateGameMessages } from "@/lib/games/queries"

export async function POST(req: Request) {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { messages, gameId } = await req.json()

  if (typeof gameId !== "string" || !Array.isArray(messages)) {
    return new Response("Bad request", { status: 400 })
  }

  const game = await getGame(gameId)

  if (!game) {
    return new Response("Not found", { status: 404 })
  }

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onEnd: ({ messages: finalMessages }) => {
      after(updateGameMessages(gameId, finalMessages))
    },
  })
}
