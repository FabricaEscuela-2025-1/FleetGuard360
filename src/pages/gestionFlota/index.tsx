"use client"

import { useState } from "react"
import { Dashboard } from "@/components/dashboard/dashboard"
import { FleetManagementDashboard } from "@/components/tablaFlotas/fleet-managment-dashboar"
import { MainLayout } from "@/components/tablaFlotas/main-laout"

export default function Home() {
  const [activeView, setActiveView] = useState<"dashboard" | "fleet">("dashboard")

  return (
    <MainLayout activeView={activeView} onViewChange={setActiveView}>
      {activeView === "dashboard" ? <Dashboard /> : <FleetManagementDashboard />}
    </MainLayout>
  )
}