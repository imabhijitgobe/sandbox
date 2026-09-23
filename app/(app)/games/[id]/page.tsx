import { notFound } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
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
    <main className="flex min-h-svh items-center justify-center px-6 py-20">
      <Empty>
        <EmptyHeader>
          <EmptyTitle className="text-3xl font-semibold">
            {game.title}
          </EmptyTitle>
          <EmptyDescription>Game workspace coming soon.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  )
}
