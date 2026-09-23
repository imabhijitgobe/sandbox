import {
  Axe,
  Car,
  Crosshair,
  Gamepad2,
  Plane,
  Swords,
  Zap,
  type LucideIcon,
} from "lucide-react"

export type GameSuggestion = {
  label: string
  prompt: string
  icon: LucideIcon
}

export const GAME_SUGGESTIONS: GameSuggestion[] = [
  { label: "Voxel survival", prompt: "A voxel survival game", icon: Axe },
  {
    label: "Ink samurai duel",
    prompt: "An ink-style samurai duel",
    icon: Swords,
  },
  {
    label: "Comic-book firefight",
    prompt: "A comic-book style firefight shooter",
    icon: Zap,
  },
  {
    label: "Realistic battlefield",
    prompt: "A realistic battlefield shooter",
    icon: Plane,
  },
  {
    label: "Fight-first shooter",
    prompt: "A fight-first shooter game",
    icon: Crosshair,
  },
  {
    label: "Jungle expedition drive",
    prompt: "A jungle expedition driving game",
    icon: Car,
  },
  {
    label: "Sunny kingdom platformer",
    prompt: "A sunny kingdom platformer",
    icon: Gamepad2,
  },
]
