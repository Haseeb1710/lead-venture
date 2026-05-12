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
      error: "Please fill in all required fields.",
    })
    render(<ContactForm />)

    fireEvent.click(screen.getByRole("button", { name: /claim my 48-hour build slot/i }))

    await waitFor(() => {
      expect(screen.getByText(/please fill in all required fields/i)).toBeInTheDocument()
    })
  })
})
