import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

import { Sidebar, SidebarProps } from "../sidebar"

jest.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}))

jest.mock("@/components/ui/button", () => ({
  Button: jest.fn(({ onClick, children, ...props }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  )),
}))

jest.mock("lucide-react", () => ({
  LayoutDashboard: () => <div data-testid="icon-dashboard" />,
  Truck: () => <div data-testid="icon-truck" />,
  ChevronLeft: () => <div data-testid="icon-chevron-left" />,
  ChevronRight: () => <div data-testid="icon-chevron-right" />,
}))

const renderSidebar = (props: Partial<SidebarProps> = {}) => {
  const defaultProps: SidebarProps = {
    open: true,
    setOpen: jest.fn(),
    activeItem: "dashboard",
    onItemClick: jest.fn(),
  }
  return render(<Sidebar {...defaultProps} {...props} />)
}

describe("Sidebar", () => {
  const user = userEvent.setup()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Renderizado y Estado", () => {
    it("debería renderizar el título y los elementos de navegación estáticos", () => {
      renderSidebar()
      expect(screen.getByText("FleetManager")).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /Dashboard/i })).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /Gestión de Flota/i })).toBeInTheDocument()
      expect(screen.getByText("Admin")).toBeInTheDocument()
    })

    describe("cuando el sidebar está abierto (open = true)", () => {
      it("debería mostrar el overlay para cerrar el menú", () => {
        renderSidebar({ open: true })
        expect(screen.getByLabelText("Cerrar menú")).toBeInTheDocument()
      })

      it("debería ocultar el botón de 'Abrir menú'", () => {
        renderSidebar({ open: true })
        expect(screen.queryByRole("button", { name: "Abrir menú" })).not.toBeInTheDocument()
      })
    })

    describe("cuando el sidebar está cerrado (open = false)", () => {
      it("no debería mostrar el overlay", () => {
        renderSidebar({ open: false })
        expect(screen.queryByLabelText("Cerrar menú")).not.toBeInTheDocument()
      })

      it("debería mostrar el botón de 'Abrir menú'", () => {
        renderSidebar({ open: false })
        expect(screen.getByRole("button", { name: "Abrir menú" })).toBeInTheDocument()
      })
    })

    it("debería aplicar el estilo activo al item 'dashboard' cuando corresponda", () => {
      renderSidebar({ activeItem: "dashboard" })
      const dashboardButton = screen.getByRole("button", { name: /Dashboard/i })
      expect(dashboardButton).toHaveClass("bg-white/10")
    })

    it("debería aplicar el estilo activo al item 'fleet' cuando corresponda", () => {
      renderSidebar({ activeItem: "fleet" })
      const fleetButton = screen.getByRole("button", { name: /Gestión de Flota/i })
      expect(fleetButton).toHaveClass("bg-white/10")
    })
  })

  describe("Interacciones del Usuario", () => {
    it("debería llamar a setOpen(false) al hacer clic en el overlay", async () => {
      const mockSetOpen = jest.fn()
      renderSidebar({ open: true, setOpen: mockSetOpen })
      const overlay = screen.getByLabelText("Cerrar menú")
      await user.click(overlay)
      expect(mockSetOpen).toHaveBeenCalledTimes(1)
      expect(mockSetOpen).toHaveBeenCalledWith(false)
    })

    it("debería llamar a setOpen(false) al presionar Enter en el overlay (accesibilidad)", async () => {
      const mockSetOpen = jest.fn()
      renderSidebar({ open: true, setOpen: mockSetOpen })
      const overlay = screen.getByLabelText("Cerrar menú")
      overlay.focus()
      await user.keyboard("{Enter}")
      expect(mockSetOpen).toHaveBeenCalledTimes(1)
      expect(mockSetOpen).toHaveBeenCalledWith(false)
    })

    it("debería llamar a setOpen(true) al hacer clic en el botón de abrir", async () => {
      const mockSetOpen = jest.fn()
      renderSidebar({ open: false, setOpen: mockSetOpen })
      const openButton = screen.getByRole("button", { name: "Abrir menú" })
      await user.click(openButton)
      expect(mockSetOpen).toHaveBeenCalledTimes(1)
      expect(mockSetOpen).toHaveBeenCalledWith(true)
    })

    it("debería llamar a onItemClick('dashboard') al hacer clic en el botón Dashboard", async () => {
      const mockOnItemClick = jest.fn()
      renderSidebar({ onItemClick: mockOnItemClick })
      const dashboardButton = screen.getByRole("button", { name: /Dashboard/i })
      await user.click(dashboardButton)
      expect(mockOnItemClick).toHaveBeenCalledTimes(1)
      expect(mockOnItemClick).toHaveBeenCalledWith("dashboard")
    })

    it("debería llamar a onItemClick('fleet') al hacer clic en el botón Gestión de Flota", async () => {
      const mockOnItemClick = jest.fn()
      renderSidebar({ onItemClick: mockOnItemClick })
      const fleetButton = screen.getByRole("button", { name: /Gestión de Flota/i })
      await user.click(fleetButton)
      expect(mockOnItemClick).toHaveBeenCalledTimes(1)
      expect(mockOnItemClick).toHaveBeenCalledWith("fleet")
    })
  })
})