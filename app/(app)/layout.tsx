import { cookies } from "next/headers"
import type { CSSProperties } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { GamesProvider } from "@/components/games-provider"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { listGames } from "@/lib/games/queries"

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  const games = await listGames().catch(() => [])

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={{ "--sidebar-width-icon": "4rem" } as CSSProperties}
    >
      <GamesProvider initialGames={games}>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </GamesProvider>
    </SidebarProvider>
  )
}
