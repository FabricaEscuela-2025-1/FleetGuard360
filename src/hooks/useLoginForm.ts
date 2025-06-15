/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useRouter } from "next/router"

export function useLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
        if(email != "usuarioTest@gmail.com"|| password != "ABCD1234") {
            setError("Credenciales incorrectas")
            return
        }
      const data = {
        token: "mocked_token",
        message: "Login exitoso",
        userId: "mocked_userId",
        userName: "mocked_userName",
        userRole: "mocked_userRole",
      }
    //   const data = await response.json()
      // Aquí puedes guardar el token, redirigir, etc.
      router.push("/gestionFlota")
      console.log("Login exitoso:", data)
    } catch (err: any) {
      setError(err.message)
      console.error("Error en login:", err)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    error,
  }
}