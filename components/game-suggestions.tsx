"use client"

import { GAME_SUGGESTIONS } from "@/lib/games/suggestions"
import { Button } from "@/components/ui/button"
import { useNewGameDraft } from "@/components/new-game-composer"

export function GameSuggestions() {
  const setDraft = useNewGameDraft()

  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      {GAME_SUGGESTIONS.map((s) => (
        <Button
          key={s.label}
          type="button"
          variant="outline"
          className="rounded-full opacity-70 hover:opacity-100"
          onClick={() => setDraft(s.prompt)}
        >
          <s.icon />
          {s.label}
        </Button>
      ))}
    </div>
  )
}
