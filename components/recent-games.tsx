"use client"

import * as React from "react"
import Link from "next/link"
import type { PopoverRoot } from "@base-ui/react/popover"
import { Gamepad2, History } from "lucide-react"

import { useGames } from "@/components/games-provider"
import { Empty, EmptyDescription } from "@/components/ui/empty"
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function RecentGames() {
  const { games } = useGames()
  const actionsRef = React.useRef<PopoverRoot.Actions | null>(null)
  const recents = games.slice(0, 20)

  return (
    <>
      <SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
        {recents.length > 0 ? (
          <SidebarMenu>
            {recents.map((game) =>
              game.id.startsWith("temp-") ? (
                <SidebarMenuItem key={game.id}>
                  <SidebarMenuButton tooltip={game.title} disabled>
                    <Gamepad2 />
                    <span>{game.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem key={game.id}>
                  <SidebarMenuButton
                    tooltip={game.title}
                    render={<Link href={`/games/${game.id}`} />}
                  >
                    <Gamepad2 />
                    <span>{game.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        ) : (
          <Empty className="p-4">
            <EmptyDescription>Your games will live here.</EmptyDescription>
          </Empty>
        )}
      </SidebarGroupContent>
      <SidebarMenu className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-2">
        <SidebarMenuItem>
          <Popover actionsRef={actionsRef}>
            <PopoverTrigger render={<SidebarMenuButton tooltip="Recents" />}>
              <History />
              <span>Recents</span>
            </PopoverTrigger>
            <PopoverContent side="right" align="start">
              <PopoverTitle>Recents</PopoverTitle>
              {recents.length > 0 ? (
                <SidebarMenu>
                  {recents.map((game) =>
                    game.id.startsWith("temp-") ? (
                      <SidebarMenuItem key={game.id}>
                        <SidebarMenuButton tooltip={game.title} disabled>
                          <span>{game.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ) : (
                      <SidebarMenuItem key={game.id}>
                        <SidebarMenuButton
                          tooltip={game.title}
                          onClick={() => actionsRef.current?.close()}
                          render={<Link href={`/games/${game.id}`} />}
                        >
                          <span>{game.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  )}
                </SidebarMenu>
              ) : (
                <EmptyDescription>Your games will live here.</EmptyDescription>
              )}
            </PopoverContent>
          </Popover>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
