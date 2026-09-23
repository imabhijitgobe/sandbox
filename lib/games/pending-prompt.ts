const PREFIX = "pending-prompt:"

export function stashPendingPrompt(gameId: string, prompt: string) {
  try {
    sessionStorage.setItem(`${PREFIX}${gameId}`, prompt)
  } catch {
    // storage unavailable (private mode, SSR) — thread just starts empty
  }
}

export function takePendingPrompt(gameId: string): string | null {
  try {
    const key = `${PREFIX}${gameId}`
    const value = sessionStorage.getItem(key)
    if (value !== null) {
      sessionStorage.removeItem(key)
    }
    return value
  } catch {
    return null
  }
}
