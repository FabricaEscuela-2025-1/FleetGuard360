"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "./sidebar"

interface MainLayoutProps {
  children: React.ReactNode
  activeView: "dashboard" | "fleet"
  onViewChange: (view: "dashboard" | "fleet") => void
}

export function MainLayout({ children, activeView, onViewChange }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-[#F9F9F9]">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activeItem={activeView} onItemClick={onViewChange} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
