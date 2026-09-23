import Image from "next/image"
import { Coins, SquarePen } from "lucide-react"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

import { Empty, EmptyDescription } from "@/components/ui/empty"
import { SidebarDragHandle } from "@/components/sidebar-drag-handle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-3 group-data-[collapsible=icon]:p-0">
          <Image src="/logo.svg" alt="Logo" width={20} height={20} />
          <span className="font-logo text-base font-semibold group-data-[collapsible=icon]:hidden">
            Sandbox
          </span>
          <SidebarTrigger className="ml-auto group-data-[collapsible=icon]:ml-0" />
        </div>
        <SidebarMenu className="group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="New game">
              <SquarePen />
              <span>New game</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recents</SidebarGroupLabel>
          <SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
            <Empty className="p-4">
              <EmptyDescription>Your games will live here.</EmptyDescription>
            </Empty>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Credits">
              <Coins />
              <span>Credits</span>
              <span className="ml-auto">$1.00</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <OrganizationSwitcher
              appearance={{
                elements: { organizationSwitcherTrigger: "w-full" },
              }}
            />
          </div>
          <div className="pr-1">
            <UserButton />
          </div>
        </div>
      </SidebarFooter>
      <SidebarDragHandle />
    </Sidebar>
  )
}
