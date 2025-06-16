import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { MainLayout } from "../main-laout"
import { Sidebar } from "../sidebar"

jest.mock("../sidebar", () => ({
  Sidebar: jest.fn(() => <div data-testid="mock-sidebar" />),
}))

const MockedSidebar = Sidebar as jest.Mock

describe("MainLayout", () => {
  beforeEach(() => {
    MockedSidebar.mockClear()
  })

  it("debería renderizar sus hijos (children) correctamente", () => {
    const childText = "Contenido principal de la página"
    render(
      <MainLayout activeView="dashboard" onViewChange={jest.fn()}>
        <h1>{childText}</h1>
      </MainLayout>,
    )
    const childElement = screen.getByRole("heading", { name: childText })
    expect(childElement).toBeInTheDocument()
  })

  it("debería renderizar el componente Sidebar", () => {
    render(
      <MainLayout activeView="dashboard" onViewChange={jest.fn()}>
        <div>Children</div>
      </MainLayout>,
    )
    const sidebarElement = screen.getByTestId("mock-sidebar")
    expect(sidebarElement).toBeInTheDocument()
  })

  it("debería pasar las props correctas al componente Sidebar", () => {
    const mockOnViewChange = jest.fn()
    const currentView = "fleet"
    render(
      <MainLayout activeView={currentView} onViewChange={mockOnViewChange}>
        <div>Children</div>
      </MainLayout>,
    )

    expect(MockedSidebar).toHaveBeenCalledTimes(1)

    // CORRECCIÓN: Inspeccionamos solo el primer argumento (props) del llamado.
    expect(MockedSidebar.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        open: true,
        activeItem: currentView,
        onItemClick: mockOnViewChange,
        setOpen: expect.any(Function),
      }),
    )
  })

  it("debería pasar 'dashboard' como activeItem cuando activeView es 'dashboard'", () => {
    render(
      <MainLayout activeView="dashboard" onViewChange={jest.fn()}>
        <div>Children</div>
      </MainLayout>,
    )

    // CORRECCIÓN: Inspeccionamos solo el primer argumento (props) del llamado.
    expect(MockedSidebar.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        activeItem: "dashboard",
      }),
    )
  })
})