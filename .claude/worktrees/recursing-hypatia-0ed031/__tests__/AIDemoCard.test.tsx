import { render, screen } from "@testing-library/react"
import AIDemoCard from "@/components/sections/AIDemoCard"

describe("AIDemoCard", () => {
  it("renders the animated waveform", () => {
    render(<AIDemoCard />)
    expect(screen.getByTestId("waveform")).toBeInTheDocument()
  })

  it("renders 7 waveform bars", () => {
    render(<AIDemoCard />)
    const bars = screen.getByTestId("waveform").children
    expect(bars.length).toBe(7)
  })

  it("shows Live & Booking status", () => {
    render(<AIDemoCard />)
    expect(screen.getByText(/Live & Booking/i)).toBeInTheDocument()
  })

  it("shows Aria's name", () => {
    render(<AIDemoCard />)
    expect(screen.getByText(/Aria — AI Receptionist/i)).toBeInTheDocument()
  })
})
