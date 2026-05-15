import { render, screen, fireEvent } from "@testing-library/react"
import Calculator, {
  calculateProjected,
  getMultiplier,
} from "@/components/sections/Calculator"

describe("getMultiplier", () => {
  it("returns a defined multiplier for every business/plan combination", () => {
    const businesses = ["Lawyer", "Insurance Agent", "Chiropractor", "Dentist", "Other"] as const
    const plans = ["Accelerator", "Authority", "Market Leader"] as const
    for (const b of businesses) {
      for (const p of plans) {
        const m = getMultiplier(b, p)
        expect(typeof m).toBe("number")
        expect(m).toBeGreaterThan(1)
        expect(m).toBeLessThan(5)
      }
    }
  })

  it("ranks higher tiers above lower tiers within the same vertical", () => {
    expect(getMultiplier("Dentist", "Market Leader")).toBeGreaterThan(
      getMultiplier("Dentist", "Authority")
    )
    expect(getMultiplier("Dentist", "Authority")).toBeGreaterThan(
      getMultiplier("Dentist", "Accelerator")
    )
  })
})

describe("calculateProjected", () => {
  it("multiplies current leads by the business+plan multiplier and rounds", () => {
    expect(calculateProjected(20, "Dentist", "Authority")).toBe(52) // 20 * 2.6
    expect(calculateProjected(100, "Lawyer", "Market Leader")).toBe(280) // 100 * 2.8
    expect(calculateProjected(5, "Chiropractor", "Accelerator")).toBe(9) // 5 * 1.7 = 8.5 → 9
  })

  it("returns 0 when current leads is 0", () => {
    expect(calculateProjected(0, "Dentist", "Authority")).toBe(0)
  })
})

describe("Calculator", () => {
  it("renders with default 20 leads, Dentist + Authority", () => {
    render(<Calculator />)
    expect(screen.getByTestId("current-leads")).toHaveTextContent("20")
    expect(screen.getByTestId("projected-leads")).toHaveTextContent("52")
  })

  it("updates projected leads when slider moves to 50", () => {
    render(<Calculator />)
    const slider = screen.getByTestId("leads-slider")
    fireEvent.change(slider, { target: { value: "50" } })
    expect(screen.getByTestId("current-leads")).toHaveTextContent("50")
    // 50 * 2.6 = 130
    expect(screen.getByTestId("projected-leads")).toHaveTextContent("130")
  })

  it("clamps slider min to 5 and max to 200", () => {
    render(<Calculator />)
    const slider = screen.getByTestId("leads-slider") as HTMLInputElement
    expect(slider.min).toBe("5")
    expect(slider.max).toBe("200")
  })

  it("shows the illustrative-estimate disclaimer adjacent to the result", () => {
    render(<Calculator />)
    expect(
      screen.getByText(/illustrative estimate, not a guarantee/i)
    ).toBeInTheDocument()
  })
})
