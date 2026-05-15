import { render, screen } from "@testing-library/react"
import LaunchTracker, { formatTime } from "@/components/sections/LaunchTracker"

describe("formatTime", () => {
  it("formats ms into HH:MM:SS", () => {
    expect(formatTime(3661000)).toBe("01:01:01")
  })

  it("pads single digits with zeros", () => {
    expect(formatTime(65000)).toBe("00:01:05")
  })

  it("returns 00:00:00 for zero or negative ms", () => {
    expect(formatTime(0)).toBe("00:00:00")
    expect(formatTime(-5000)).toBe("00:00:00")
  })
})

describe("LaunchTracker", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it("renders the countdown timer", () => {
    render(<LaunchTracker />)
    expect(screen.getByTestId("countdown")).toBeInTheDocument()
  })

  it("renders all 4 progress steps", () => {
    render(<LaunchTracker />)
    expect(screen.getByText("Payment")).toBeInTheDocument()
    expect(screen.getByText("Asset Upload")).toBeInTheDocument()
    expect(screen.getByText("AI Training")).toBeInTheDocument()
    expect(screen.getByText("Go-Live")).toBeInTheDocument()
  })

  it("clears interval on unmount", () => {
    const spy = jest.spyOn(global, "clearInterval")
    const { unmount } = render(<LaunchTracker />)
    unmount()
    expect(spy).toHaveBeenCalled()
  })
})
