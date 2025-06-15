"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, LayoutDashboard, Truck } from "lucide-react"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  activeItem: "dashboard" | "fleet"
  onItemClick: (item: "dashboard" | "fleet") => void
}

export function Sidebar({ open, setOpen, activeItem, onItemClick }: SidebarProps) {
  return (
    <>
      {/* Overlay para móviles */}
      {open && <div className="fixed inset-0 z-10 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col bg-[#1D3557] text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo y título */}
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">FleetManager</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Cerrar menú</span>
          </Button>
        </div>

        {/* Navegación */}
        <nav className="mt-6 flex flex-1 flex-col px-2">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-white hover:bg-white/10",
                activeItem === "dashboard" && "bg-white/10",
              )}
              onClick={() => onItemClick("dashboard")}
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-white hover:bg-white/10",
                activeItem === "fleet" && "bg-white/10",
              )}
              onClick={() => onItemClick("fleet")}
            >
              <Truck className="mr-2 h-5 w-5" />
              Gestión de Flota
            </Button>
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t border-white/10 p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/10" />
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-white/70">admin@fleetmanager.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Botón para abrir el sidebar en móviles */}
      <Button
        variant="outline"
        size="icon"
        className={cn("fixed left-4 top-4 z-30 lg:hidden", open && "hidden")}
        onClick={() => setOpen(true)}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Abrir menú</span>
      </Button>
    </>
  )
}
