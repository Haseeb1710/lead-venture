"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { submitContact } from "@/lib/actions"

const BUSINESS_TYPES = ["Lawyer", "Insurance Agent", "Chiropractor", "Dentist", "Other"]

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
    <section id="contact" className="py-24 bg-gradient-to-br from-violet-50 to-[#f8f7ff]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0f0a1e] mb-4">Start Your 48-Hour Build</h2>
          <p className="text-lg text-gray-500">
            Fill in your details and we'll be in touch within 1 hour.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border border-violet-100 p-12 text-center shadow-xl shadow-violet-50"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
              >
                ✓
              </motion.div>
              <h3 className="text-2xl font-bold text-[#0f0a1e] mb-3">You're on the list!</h3>
              <p className="text-gray-500">
                We'll reach out within 1 hour to confirm your 48-hour build slot.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              className="bg-white rounded-2xl border border-violet-100 p-8 shadow-xl shadow-violet-50 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Full Name <span className="text-violet-600">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    type="text"
                    placeholder="Jane Smith"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email <span className="text-violet-600">*</span>
                  </label>
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition-shadow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Business Type <span className="text-violet-600">*</span>
                  </label>
                  <select
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
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your practice and goals..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 resize-none transition-shadow"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}

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
