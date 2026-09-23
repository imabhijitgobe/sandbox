import { auth } from "@clerk/nextjs/server"
import { google } from "@ai-sdk/google"
import { convertToModelMessages, streamText } from "ai"

export async function POST(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { messages } = await req.json()

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
