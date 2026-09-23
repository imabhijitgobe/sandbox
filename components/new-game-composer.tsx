"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { ChatComposer } from "@/components/chat-composer"
import { useGames } from "@/components/games-provider"
import { stashPendingPrompt } from "@/lib/games/pending-prompt"

const NewGameDraftContext = React.createContext<((prompt: string) => void) | null>(
  null
)

export function useNewGameDraft() {
  const context = React.useContext(NewGameDraftContext)
  if (!context) {
    throw new Error("GameSuggestions must be used within NewGameComposer")
  }
  return context
}

export function NewGameComposer({ children }: { children?: React.ReactNode }) {
  const { addGame } = useGames()
  const [draft, setDraft] = React.useState("")
  const router = useRouter()

  async function handleSubmit(prompt: string) {
    const game = await addGame(prompt)
    stashPendingPrompt(game.id, prompt)
    router.push(`/games/${game.id}`)
  }

  return (
    <NewGameDraftContext.Provider value={setDraft}>
      <ChatComposer value={draft} onValueChange={setDraft} onSubmit={handleSubmit} />
      {children}
    </NewGameDraftContext.Provider>
  )
}
