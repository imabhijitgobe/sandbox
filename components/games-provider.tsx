"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { createGame } from "@/lib/games/actions"
import type { games } from "@/db/schema"

type Game = typeof games.$inferSelect

const GamesContext = React.createContext<{
  games: Game[]
  addGame: (title: string) => Promise<void>
} | null>(null)

export function useGames() {
  const context = React.useContext(GamesContext)
  if (!context) {
    throw new Error("useGames must be used within GamesProvider")
  }
  return context
}

export function GamesProvider({
  initialGames,
  children,
}: {
  initialGames: Game[]
  children: React.ReactNode
}) {
  const [games, setGames] = React.useState(initialGames)
  const router = useRouter()

  React.useEffect(() => {
    setGames(initialGames)
  }, [initialGames])

  async function addGame(title: string) {
    const pending: Game = {
      id: `temp-${crypto.randomUUID()}`,
      organizationId: "",
      title,
      createdAt: new Date(),
    }
    setGames((prev) => [pending, ...prev])
    try {
      await createGame(title)
      router.refresh()
    } catch (error) {
      setGames((prev) => prev.filter((game) => game.id !== pending.id))
      throw error
    }
  }

  return (
    <GamesContext.Provider value={{ games, addGame }}>
      {children}
    </GamesContext.Provider>
  )
}
