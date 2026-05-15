"use server"

import { randomUUID } from "crypto"
import { z } from "zod"
import { BUSINESS_TYPES } from "./business-types"

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().min(1).max(200).email(),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  businessType: z.enum(BUSINESS_TYPES),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
})

export type ContactResult = { success: boolean; error?: string }

function friendlyError(issue: z.ZodIssue): string {
  const field = String(issue.path[0] ?? "")
  if (field === "email") return "Please enter a valid email address."
  if (field === "businessType") return "Please select your business type."
  if (field === "name") return "Please enter your name."
  if (field === "message") return "Message is too long (max 2000 characters)."
  if (field === "phone") return "Phone number is too long."
  return "Please check your entries and try again."
}

export async function submitContact(formData: FormData): Promise<ContactResult> {
  // Honeypot: if a bot fills the hidden "website" field, return success silently.
  const honeypot = String(formData.get("website") ?? "")
  if (honeypot.trim().length > 0) {
    return { success: true }
  }

  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    businessType: String(formData.get("businessType") ?? ""),
    message: String(formData.get("message") ?? ""),
  }

  const parsed = ContactSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, error: friendlyError(parsed.error.issues[0]) }
  }

  const correlationId = randomUUID()
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !toEmail || !fromEmail) {
    if (process.env.NODE_ENV === "test") {
      return { success: true }
    }
    console.error(`Lead pipeline misconfigured [${correlationId}]`)
    return {
      success: false,
      error: "We couldn't deliver your message. Please email us directly.",
    }
  }

  try {
    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)
    const { name, email, phone, businessType, message } = parsed.data
    const safeMessage = message ? message.slice(0, 2000) : ""
    const body =
      `New lead via website\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || "—"}\n` +
      `Business type: ${businessType}\n\n` +
      `Message:\n${safeMessage || "(no message)"}\n\n` +
      `Correlation ID: ${correlationId}\n`
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New Lead Venture inquiry — ${businessType}`,
      text: body,
    })
    return { success: true }
  } catch (err) {
    console.error(
      `Lead delivery failed [${correlationId}]: ${err instanceof Error ? err.message : "unknown"}`
    )
    return {
      success: false,
      error: "Something went wrong. Please try again or email us directly.",
    }
  }
}
