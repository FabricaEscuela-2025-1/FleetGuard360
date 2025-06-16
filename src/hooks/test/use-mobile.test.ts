import { renderHook, act } from "@testing-library/react"
import { useIsMobile } from "../use-mobile"

const mockAddListener = jest.fn()
const mockRemoveListener = jest.fn()

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: window.innerWidth < 768,
    media: query,
    onchange: null,
    addEventListener: mockAddListener,
    removeEventListener: mockRemoveListener,
    dispatchEvent: jest.fn(),
  })),
})

const setWindowWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  })
}

describe("useIsMobile", () => {
  beforeEach(() => {
    mockAddListener.mockClear()
    mockRemoveListener.mockClear()
  })

  it("debería devolver 'false' en un dispositivo de escritorio (desktop)", () => {
    setWindowWidth(1024)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it("debería devolver 'true' en un dispositivo móvil (mobile)", () => {
    setWindowWidth(500)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it("debería añadir un event listener al montarse y quitarlo al desmontarse", () => {
    setWindowWidth(1024)
    const { unmount } = renderHook(() => useIsMobile())

    expect(mockAddListener).toHaveBeenCalledWith("change", expect.any(Function))
    const addCalls = mockAddListener.mock.calls
    unmount()
    const removeCalls = mockRemoveListener.mock.calls
    expect(removeCalls.length).toBe(addCalls.length)
    addCalls.forEach((addCall, index) => {
      expect(removeCalls[index][0]).toBe("change")
      expect(removeCalls[index][1]).toBe(addCall[1])
    })
  })

  it("debería cambiar de 'false' a 'true' cuando la ventana se redimensiona a móvil", () => {
    setWindowWidth(1024)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    const onChangeHandler = mockAddListener.mock.calls[mockAddListener.mock.calls.length - 1][1]

    act(() => {
      setWindowWidth(500)
      onChangeHandler()
    })

    expect(result.current).toBe(true)
  })

  it("debería cambiar de 'true' a 'false' cuando la ventana se redimensiona a escritorio", () => {
    setWindowWidth(400)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)

    const onChangeHandler = mockAddListener.mock.calls[mockAddListener.mock.calls.length - 1][1]

    act(() => {
      setWindowWidth(1200)
      onChangeHandler()
    })

    expect(result.current).toBe(false)
  })
})