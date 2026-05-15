"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { submitContact } from "@/lib/actions"

const BUSINESS_TYPES = ["Lawyer", "Insurance Agent", "Chiropractor", "Dentist", "Other"]

const inputClass =
  "w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#64CEFB]/40 focus:border-[#64CEFB]/60 transition-all lv-input"

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const result = await submitContact(formData)

    setSubmitting(false)
    if (result.success) {
      setSubmitted(true)
    } else {
      setError(result.error ?? "Something went wrong. Please try again.")
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0f0a1e] dark:text-white mb-4">Start Your 48-Hour Build</h2>
          <p className="text-lg text-gray-600 dark:text-white/60">
            Fill in your details and we'll be in touch within 1 hour.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-12 text-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--lv-tile-from) 0%, var(--lv-tile-mid) 50%, var(--lv-tile-to) 100%)",
                border: "1px solid var(--lv-tile-border)",
                boxShadow:
                  "var(--lv-tile-shadow), inset 0 1px 0 var(--lv-tile-inset)",
          backdropFilter: "blur(24px) saturate(100%)",
          WebkitBackdropFilter: "blur(24px) saturate(100%)",
                        }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
                style={{ background: "rgba(100,206,251,0.14)", color: "#64CEFB" }}
              >
                ✓
              </motion.div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--lv-text-tile-primary)" }}>You&apos;re on the list!</h3>
              <p style={{ color: "var(--lv-text-tile-muted)" }}>
                We'll reach out within 1 hour to confirm your 48-hour build slot.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl p-8 space-y-5"
              style={{
                background:
                  "linear-gradient(135deg, var(--lv-tile-from) 0%, var(--lv-tile-mid) 50%, var(--lv-tile-to) 100%)",
                border: "1px solid var(--lv-tile-border)",
                boxShadow:
                  "var(--lv-tile-shadow), inset 0 1px 0 var(--lv-tile-inset)",
          backdropFilter: "blur(24px) saturate(100%)",
          WebkitBackdropFilter: "blur(24px) saturate(100%)",
                        }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                  style={{ color: "var(--lv-text-tile-secondary)" }}>
                    Full Name <span style={{ color: "#64CEFB" }}>*</span>
                  </label>
                  <input
                    name="name"
                    required
                    type="text"
                    placeholder="Jane Smith"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                  style={{ color: "var(--lv-text-tile-secondary)" }}>
                    Email <span style={{ color: "#64CEFB" }}>*</span>
                  </label>
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="jane@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                  style={{ color: "var(--lv-text-tile-secondary)" }}>Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                  style={{ color: "var(--lv-text-tile-secondary)" }}>
                    Business Type <span style={{ color: "#64CEFB" }}>*</span>
                  </label>
                  <select
                    name="businessType"
                    required
                    defaultValue=""
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="" disabled>Select your profession</option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5"
                  style={{ color: "var(--lv-text-tile-secondary)" }}>Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your practice and goals..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl font-semibold text-base transition-colors disabled:opacity-60 shadow-md"
                style={{
                  background: "var(--lv-cta-button-bg)",
                  color: "var(--lv-cta-button-text)",
                }}
              >
                {submitting ? "Submitting..." : "Claim My 48-Hour Build Slot"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
