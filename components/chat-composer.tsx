"use client"

import * as React from "react"
import {
  ArrowUp,
  Axe,
  Car,
  ChevronDown,
  Crosshair,
  Gamepad2,
  Grip,
  Plane,
  Swords,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"

const MODELS = [{ id: "kimi-k3", label: "Kimi K3" }]

const SUGGESTIONS = [
  { label: "Voxel survival", prompt: "A voxel survival game", icon: Axe },
  { label: "Ink samurai duel", prompt: "An ink-style samurai duel", icon: Swords },
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

export function ChatComposer({
  onSubmit,
}: {
  onSubmit?: (value: string) => void
}) {
  const [value, setValue] = React.useState("")
  const [model, setModel] = React.useState(MODELS[0].id)

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!value.trim()) {
      return
    }
    onSubmit?.(value.trim())
  }

  return (
    <div className="w-full">
      <form onSubmit={submit}>
        <InputGroup>
          <InputGroupTextarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault()
                event.currentTarget.form?.requestSubmit()
              }
            }}
            placeholder="Describe the game you want to build..."
            rows={3}
            aria-label="Describe the game you want to build"
          />
          <InputGroupAddon align="block-end">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <InputGroupButton>
                    <Grip />
                    <span>
                      {MODELS.find((m) => m.id === model)?.label}
                    </span>
                    <ChevronDown />
                  </InputGroupButton>
                }
              />
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup
                  value={model}
                  onValueChange={setModel}
                >
                  {MODELS.map((m) => (
                    <DropdownMenuRadioItem key={m.id} value={m.id}>
                      {m.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <InputGroupButton
              type="submit"
              variant="default"
              size="icon-sm"
              className="ml-auto rounded-full"
              aria-label="Send"
            >
              <ArrowUp />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((s) => (
          <Button
            key={s.label}
            type="button"
            variant="outline"
            className="rounded-full opacity-70 hover:opacity-100"
            onClick={() => setValue(s.prompt)}
          >
            <s.icon />
            {s.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
