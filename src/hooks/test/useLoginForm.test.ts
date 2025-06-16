// __tests__/useLoginForm.test.ts (CORREGIDO)

import { renderHook, act } from "@testing-library/react"
// Asegúrate de que esta ruta sea correcta para tu proyecto
import { useLoginForm } from "../useLoginForm"
import { useRouter } from "next/router"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

const mockedUseRouter = useRouter as jest.Mock

describe("useLoginForm", () => {
  const mockRouterPush = jest.fn()

  beforeEach(() => {
    mockedUseRouter.mockReturnValue({
      push: mockRouterPush,
    })
    mockRouterPush.mockClear()
  })

  it("debería inicializar con un estado por defecto correcto", () => {
    const { result } = renderHook(() => useLoginForm())
    expect(result.current.email).toBe("")
    expect(result.current.password).toBe("")
    expect(result.current.error).toBeNull()
  })

  it("debería actualizar el estado del email y la contraseña", () => {
    const { result } = renderHook(() => useLoginForm())
    act(() => {
      result.current.setEmail("test@example.com")
      result.current.setPassword("new_password")
    })
    expect(result.current.email).toBe("test@example.com")
    expect(result.current.password).toBe("new_password")
  })

  describe("handleSubmit", () => {
    it("debería establecer un error y no redirigir con credenciales incorrectas", async () => {
      const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent
      const { result } = renderHook(() => useLoginForm())
      act(() => {
        result.current.setEmail("usuario.incorrecto@gmail.com")
        result.current.setPassword("1234")
      })

      await act(async () => {
        await result.current.handleSubmit(mockEvent)
      })

      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1)
      expect(result.current.error).toBe("Credenciales incorrectas")
      expect(mockRouterPush).not.toHaveBeenCalled()
    })

    it("debería redirigir a /gestionFlota y no establecer error con credenciales correctas", async () => {
      const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent
      const { result } = renderHook(() => useLoginForm())
      act(() => {
        result.current.setEmail("usuarioTest@gmail.com")
        result.current.setPassword("ABCD1234")
      })

      await act(async () => {
        await result.current.handleSubmit(mockEvent)
      })

      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1)
      expect(result.current.error).toBeNull()
      expect(mockRouterPush).toHaveBeenCalledTimes(1)
      expect(mockRouterPush).toHaveBeenCalledWith("/gestionFlota")
    })

    it("debería limpiar un error previo si el login subsecuente es exitoso", async () => {
      const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent
      const { result } = renderHook(() => useLoginForm())

      // 1. Primer intento (fallido)
      act(() => {
        result.current.setEmail("mal")
        result.current.setPassword("mal")
      })
      await act(async () => {
        await result.current.handleSubmit(mockEvent)
      })

      expect(result.current.error).toBe("Credenciales incorrectas")
      expect(mockRouterPush).not.toHaveBeenCalled()

      // 2. Segundo intento (exitoso)
      // CORRECCIÓN: Envolver las actualizaciones de estado en su propio `act`.
      act(() => {
        result.current.setEmail("usuarioTest@gmail.com")
        result.current.setPassword("ABCD1234")
      })
      await act(async () => {
        await result.current.handleSubmit(mockEvent)
      })

      expect(result.current.error).toBeNull()
      expect(mockRouterPush).toHaveBeenCalledWith("/gestionFlota")
    })
  })
})