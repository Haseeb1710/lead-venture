import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import ContactForm from "@/components/sections/ContactForm"
import * as actions from "@/lib/actions"

jest.mock("@/lib/actions")

describe("ContactForm", () => {
  it("renders required fields", () => {
    render(<ContactForm />)
    expect(screen.getByPlaceholderText("Jane Smith")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("jane@example.com")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("renders submit button", () => {
    render(<ContactForm />)
    expect(
      screen.getByRole("button", { name: /claim my 48-hour build slot/i })
    ).toBeInTheDocument()
  })

  it("shows success message after successful submission", async () => {
    jest.mocked(actions.submitContact).mockResolvedValue({ success: true })
    render(<ContactForm />)

    fireEvent.change(screen.getByPlaceholderText("Jane Smith"), {
      target: { value: "Jane Smith" },
    })
    fireEvent.change(screen.getByPlaceholderText("jane@example.com"), {
      target: { value: "jane@example.com" },
    })
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Lawyer" },
    })

    fireEvent.click(screen.getByRole("button", { name: /claim my 48-hour build slot/i }))

    await waitFor(() => {
      expect(screen.getByText(/you're on the list/i)).toBeInTheDocument()
    })
  })

  it("shows error message on failed submission", async () => {
    jest.mocked(actions.submitContact).mockResolvedValue({
      success: false,
      error: "Please enter a valid email address.",
    })
    render(<ContactForm />)

    fireEvent.click(screen.getByRole("button", { name: /claim my 48-hour build slot/i }))

    await waitFor(() => {
      expect(screen.getByText(/valid email address/i)).toBeInTheDocument()
    })
  })

  it("recovers gracefully when the server action throws (network error)", async () => {
    jest.mocked(actions.submitContact).mockRejectedValue(new Error("network down"))
    render(<ContactForm />)

    const button = screen.getByRole("button", { name: /claim my 48-hour build slot/i })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument()
    })
    // Button is re-enabled after error so the user can retry.
    expect(button).not.toBeDisabled()
  })

  it("includes a honeypot 'website' field that is hidden from sighted users", () => {
    render(<ContactForm />)
    const honeypot = document.querySelector('input[name="website"]') as HTMLInputElement
    expect(honeypot).toBeInTheDocument()
    expect(honeypot.tabIndex).toBe(-1)
  })
})
