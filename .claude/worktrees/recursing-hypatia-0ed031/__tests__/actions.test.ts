import { submitContact } from "@/lib/actions"

function makeForm(fields: Record<string, string>): FormData {
  const fd = new FormData()
  for (const [k, v] of Object.entries(fields)) fd.set(k, v)
  return fd
}

describe("submitContact", () => {
  it("returns success: true when all required fields are valid", async () => {
    const result = await submitContact(
      makeForm({ name: "Jane Smith", email: "jane@example.com", businessType: "Lawyer" })
    )
    expect(result.success).toBe(true)
  })

  it("returns success: false when name is missing", async () => {
    const result = await submitContact(
      makeForm({ name: "", email: "jane@example.com", businessType: "Lawyer" })
    )
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it("returns success: false when name is only whitespace", async () => {
    const result = await submitContact(
      makeForm({ name: "   ", email: "jane@example.com", businessType: "Lawyer" })
    )
    expect(result.success).toBe(false)
  })

  it("returns success: false when email is missing", async () => {
    const result = await submitContact(
      makeForm({ name: "Jane", email: "", businessType: "Dentist" })
    )
    expect(result.success).toBe(false)
  })

  it("returns success: false when email is malformed", async () => {
    const result = await submitContact(
      makeForm({ name: "Jane", email: "not-an-email", businessType: "Dentist" })
    )
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/valid email/i)
  })

  it("returns success: false when businessType is missing", async () => {
    const result = await submitContact(
      makeForm({ name: "Jane", email: "jane@example.com", businessType: "" })
    )
    expect(result.success).toBe(false)
  })

  it("returns success: false when businessType is not in the allow-list", async () => {
    const result = await submitContact(
      makeForm({ name: "Jane", email: "jane@example.com", businessType: "Hacker" })
    )
    expect(result.success).toBe(false)
  })

  it("returns success: false when message exceeds 2000 characters", async () => {
    const result = await submitContact(
      makeForm({
        name: "Jane",
        email: "jane@example.com",
        businessType: "Lawyer",
        message: "x".repeat(2001),
      })
    )
    expect(result.success).toBe(false)
  })

  it("returns success: true (silently) when honeypot is tripped — bot deception", async () => {
    const result = await submitContact(
      makeForm({
        name: "Bot",
        email: "bot@example.com",
        businessType: "Lawyer",
        website: "http://spam.example",
      })
    )
    expect(result.success).toBe(true)
  })

  it("accepts an optional message and phone", async () => {
    const result = await submitContact(
      makeForm({
        name: "Jane",
        email: "jane@example.com",
        businessType: "Chiropractor",
        phone: "+1 555 0000",
        message: "Need a site fast.",
      })
    )
    expect(result.success).toBe(true)
  })
})
