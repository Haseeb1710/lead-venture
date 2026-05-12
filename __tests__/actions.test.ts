import { submitContact } from "@/lib/actions"

describe("submitContact", () => {
  it("returns success: true when all required fields are present", async () => {
    const formData = new FormData()
    formData.set("name", "Jane Smith")
    formData.set("email", "jane@example.com")
    formData.set("businessType", "Lawyer")

    const result = await submitContact(formData)
    expect(result.success).toBe(true)
  })

  it("returns success: false when name is missing", async () => {
    const formData = new FormData()
    formData.set("name", "")
    formData.set("email", "jane@example.com")
    formData.set("businessType", "Lawyer")

    const result = await submitContact(formData)
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it("returns success: false when email is missing", async () => {
    const formData = new FormData()
    formData.set("name", "Jane")
    formData.set("email", "")
    formData.set("businessType", "Dentist")

    const result = await submitContact(formData)
    expect(result.success).toBe(false)
  })

  it("returns success: false when businessType is missing", async () => {
    const formData = new FormData()
    formData.set("name", "Jane")
    formData.set("email", "jane@example.com")
    formData.set("businessType", "")

    const result = await submitContact(formData)
    expect(result.success).toBe(false)
  })
})
