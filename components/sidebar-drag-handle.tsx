"use client"

import * as React from "react"

import { SidebarRail, useSidebar } from "@/components/ui/sidebar"

const DRAG_THRESHOLD = 16

export function SidebarDragHandle() {
  const { open, setOpen, toggleSidebar } = useSidebar()
  const dragRef = React.useRef<{ startX: number; dragged: boolean } | null>(
    null
  )

  return (
    <SidebarRail
      onPointerDown={(event) => {
        dragRef.current = { startX: event.clientX, dragged: false }
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        const drag = dragRef.current
        if (!drag || !event.buttons) {
          return
        }
        const dx = event.clientX - drag.startX
        if (!open && dx > DRAG_THRESHOLD) {
          drag.dragged = true
          setOpen(true)
        } else if (open && dx < -DRAG_THRESHOLD) {
          drag.dragged = true
          setOpen(false)
        }
      }}
      onPointerCancel={() => {
        dragRef.current = null
      }}
      onClick={() => {
        if (dragRef.current?.dragged) {
          dragRef.current = null
          return
        }
        dragRef.current = null
        toggleSidebar()
      }}
    />
  )
}
