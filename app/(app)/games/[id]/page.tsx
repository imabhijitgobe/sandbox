import { notFound } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

import { ChatThread } from "@/components/chat-thread"
import { getGame } from "@/lib/games/queries"

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await auth.protect()

  const { id } = await params
  const game = await getGame(id)

  if (!game) {
    notFound()
  }

  return (
    <main className="flex h-svh flex-col px-6 py-6">
      <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col">
        <ChatThread gameId={id} />
      </div>
    </main>
  )
}
