"use server"

export async function submitContact(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const name = (formData.get("name") as string | null) ?? ""
  const email = (formData.get("email") as string | null) ?? ""
  const businessType = (formData.get("businessType") as string | null) ?? ""
  const phone = (formData.get("phone") as string | null) ?? ""
  const message = (formData.get("message") as string | null) ?? ""

  if (!name.trim() || !email.trim() || !businessType.trim()) {
    return { success: false, error: "Please fill in all required fields." }
  }

  console.log("New Lead Venture contact:", { name, email, phone, businessType, message })

  return { success: true }
}
