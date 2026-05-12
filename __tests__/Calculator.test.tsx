import { render, screen, fireEvent } from "@testing-library/react"
import Calculator, { calculateProjected } from "@/components/sections/Calculator"

describe("calculateProjected", () => {
  it("returns 3x the input", () => {
    expect(calculateProjected(20)).toBe(60)
    expect(calculateProjected(100)).toBe(300)
    expect(calculateProjected(5)).toBe(15)
  })
})

describe("Calculator", () => {
  it("renders with default 20 leads and projected 60", () => {
    render(<Calculator />)
    expect(screen.getByTestId("current-leads")).toHaveTextContent("20")
    expect(screen.getByTestId("projected-leads")).toHaveTextContent("60")
  })

  it("updates projected leads when slider moves to 50", () => {
    render(<Calculator />)
    const slider = screen.getByTestId("leads-slider")
    fireEvent.change(slider, { target: { value: "50" } })
    expect(screen.getByTestId("current-leads")).toHaveTextContent("50")
    expect(screen.getByTestId("projected-leads")).toHaveTextContent("150")
  })

  it("clamps slider min to 5", () => {
    render(<Calculator />)
    const slider = screen.getByTestId("leads-slider") as HTMLInputElement
    expect(slider.min).toBe("5")
  })

  it("clamps slider max to 200", () => {
    render(<Calculator />)
    const slider = screen.getByTestId("leads-slider") as HTMLInputElement
    expect(slider.max).toBe("200")
  })
})
