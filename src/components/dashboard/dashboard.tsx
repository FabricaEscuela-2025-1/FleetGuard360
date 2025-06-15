import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Users, Calendar, BarChart3 } from "lucide-react"

export function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#1D3557] mb-6">Dashboard</h1>

      <div className="flex justify-center items-center mb-8">
        <Card className="w-full max-w-3xl bg-gradient-to-r from-[#1D3557] to-[#457B9D] text-white">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold">Welcome a Fleet Manager</CardTitle>
            <CardDescription className="text-white/80">
              Sistema de gestión de flota para optimizar sus operaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">Utilice el menú lateral para navegar entre las diferentes secciones del sistema.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Vehículos</CardTitle>
            <Truck className="h-4 w-4 text-[#457B9D]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conductores</CardTitle>
            <Users className="h-4 w-4 text-[#457B9D]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">+1 desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Mantenimientos</CardTitle>
            <Calendar className="h-4 w-4 text-[#457B9D]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Programados este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Eficiencia</CardTitle>
            <BarChart3 className="h-4 w-4 text-[#457B9D]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">+4% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
