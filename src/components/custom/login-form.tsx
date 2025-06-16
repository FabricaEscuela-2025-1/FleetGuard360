import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLoginForm } from "@/hooks/useLoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<"div">>) {
  const { email, setEmail, password, setPassword, handleSubmit, error } = useLoginForm()

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center" style={{ color: "#2C2C2C" }}>
            Bienvenido a FleetGuard360
          </CardTitle>
          <CardDescription className="text-lg text-center pt-10 pb-10" style={{ color: "#2C2C2C" }}>
            Iniciar Sesión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Correo electrónico"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-[#2C2C2C] text-white">
                Acceder
              </Button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <a href="#" className="text-sm text-[#2C2C2C] hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
          {error && (
            <div className="text-red-600 text-center mt-2">
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}