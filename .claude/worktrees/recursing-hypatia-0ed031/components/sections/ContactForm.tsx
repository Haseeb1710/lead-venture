"use client"

import { useId, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { submitContact } from "@/lib/actions"
import { BUSINESS_TYPES } from "@/lib/business-types"

export default function ContactForm() {
  const formId = useId()
  const id = (suffix: string) => `${formId}-${suffix}`

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const successRef = useRef<HTMLDivElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    try {
      const result = await submitContact(formData)
      if (result.success) {
        setSubmitted(true)
        setTimeout(() => successRef.current?.focus(), 0)
      } else {
        setError(result.error ?? "Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please try again or email us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-violet-50 to-[#f8f7ff]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0f0a1e] mb-4">Start Your 48-Hour Build</h2>
          <p className="text-lg text-gray-500">
            Fill in your details and we&apos;ll be in touch within 1 hour.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              ref={successRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border border-violet-100 p-12 text-center shadow-xl shadow-violet-50 outline-none"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-6"
                aria-hidden="true"
              >
                <Check className="w-10 h-10" strokeWidth={3} />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#0f0a1e] mb-3">You&apos;re on the list!</h3>
              <p className="text-gray-500">
                We&apos;ll reach out within 1 hour to confirm your 48-hour build slot.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              className="bg-white rounded-2xl border border-violet-100 p-8 shadow-xl shadow-violet-50 space-y-5"
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-10000px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label htmlFor={id("website")}>Website (leave blank)</label>
                <input
                  id={id("website")}
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor={id("name")}
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Full Name <span className="text-violet-600" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={id("name")}
                    name="name"
                    required
                    type="text"
                    autoComplete="name"
                    maxLength={120}
                    placeholder="Jane Smith"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition-shadow"
                  />
                </div>
                <div>
                  <label
                    htmlFor={id("email")}
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Email <span className="text-violet-600" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={id("email")}
                    name="email"
                    required
                    type="email"
                    autoComplete="email"
                    maxLength={200}
                    placeholder="jane@example.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition-shadow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor={id("phone")}
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Phone
                  </label>
                  <input
                    id={id("phone")}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={40}
                    placeholder="+1 (555) 000-0000"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition-shadow"
                  />
                </div>
                <div>
                  <label
                    htmlFor={id("businessType")}
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Business Type <span className="text-violet-600" aria-hidden="true">*</span>
                  </label>
                  <select
                    id={id("businessType")}
                    name="businessType"
                    required
                    defaultValue=""
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 bg-white transition-shadow"
                  >
                    <option value="" disabled>
                      Select your profession
                    </option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor={id("message")}
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id={id("message")}
                  name="message"
                  rows={4}
                  maxLength={2000}
                  placeholder="Tell us about your practice and goals..."
                  aria-describedby={error ? id("error") : undefined}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 resize-none transition-shadow"
                />
              </div>

              <p
                id={id("error")}
                role="alert"
                aria-live="polite"
                className={`text-red-600 text-sm font-medium min-h-[1.25rem] ${
                  error ? "" : "sr-only"
                }`}
              >
                {error}
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-violet-700 text-white py-4 rounded-xl font-semibold text-base hover:bg-violet-800 transition-colors disabled:opacity-60 shadow-lg shadow-violet-200"
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
