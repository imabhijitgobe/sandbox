"use client"

import * as React from "react"
import { ArrowUp, ChevronDown, Grip } from "lucide-react"

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

export function ChatComposer({
  value: controlledValue,
  onValueChange,
  onSubmit,
}: {
  value?: string
  onValueChange?: (value: string) => void
  onSubmit?: (value: string) => void | Promise<void>
}) {
  const [internalValue, setInternalValue] = React.useState("")
  const value = controlledValue ?? internalValue
  const setValue = onValueChange ?? setInternalValue
  const [model, setModel] = React.useState(MODELS[0].id)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) {
      return
    }
    await onSubmit?.(trimmed)
    setValue("")
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
    </div>
  )
}
