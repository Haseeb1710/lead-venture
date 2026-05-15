"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const BAR_HEIGHTS = [0.4, 0.8, 0.5, 1.0, 0.6, 0.9, 0.4]

export default function AIDemoCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <section id="ai-demo" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Card */}
          <div className="flex justify-center lg:order-2">
            <motion.div
              className="relative rounded-2xl p-8 w-full max-w-sm"
              style={{
                background:
                  "linear-gradient(135deg, var(--lv-tile-from) 0%, var(--lv-tile-mid) 50%, var(--lv-tile-to) 100%)",
                border: "1px solid var(--lv-tile-border)",
                boxShadow:
                  "var(--lv-tile-shadow), inset 0 1px 0 var(--lv-tile-inset)",
          backdropFilter: "blur(24px) saturate(100%)",
          WebkitBackdropFilter: "blur(24px) saturate(100%)",
                        }}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              whileHover={{ scale: 1.02, boxShadow: "0 30px 70px rgba(100,206,251,0.20)" }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #64CEFB 0%, #A78BFA 100%)",
                    boxShadow: "0 4px 16px rgba(100,206,251,0.35)",
                  }}
                >
                  A
                </div>
                <div>
                  <div className="font-semibold" style={{ color: "var(--lv-text-tile-primary)" }}>Aria — AI Receptionist</div>
                  <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--lv-text-tile-muted)" }}>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    {'Live & Booking'}
                  </div>
                </div>
              </div>

              {/* Waveform */}
              <div
                className="flex items-center justify-center gap-1.5 mb-6"
                style={{ height: 64 }}
                data-testid="waveform"
              >
                {BAR_HEIGHTS.map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-2.5 rounded-full"
                    style={{
                      background: "linear-gradient(to top, #64CEFB, #7C3AED)",
                      height: 48,
                      originY: 0.5,
                    }}
                    animate={{
                      scaleY: hovered
                        ? [h * 0.2, h * 1.3, h * 0.4, h * 1.1, h * 0.2]
                        : [h * 0.3, h * 1.0, h * 0.5, h * 0.8, h * 0.3],
                    }}
                    transition={{
                      duration: hovered ? 0.35 : 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.08,
                    }}
                  />
                ))}
              </div>

              {/* Dialogue */}
              <div
                className="rounded-xl p-4 text-sm italic mb-6 leading-relaxed border"
                style={{
                  background: "rgba(100,206,251,0.08)",
                  borderColor: "rgba(100,206,251,0.22)",
                  color: "var(--lv-text-tile-secondary)",
                }}
              >
                "Hi, this is Aria from [Your Practice]. How can I help you today?"
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {["24/7 Available", "Instant Response", "Books Appointments"].map((pill) => (
                  <span
                    key={pill}
                    className="text-xs px-3 py-1.5 rounded-full font-semibold border"
                    style={{
                      background: "rgba(100,206,251,0.08)",
                      borderColor: "rgba(100,206,251,0.22)",
                      color: "#64CEFB",
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Copy */}
          <div className="lg:order-1">
            <h2
              className="text-4xl font-bold mb-6"
              style={{ color: "var(--lv-text-tile-primary)" }}
            >
              Meet Aria, Your AI Receptionist
            </h2>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "var(--lv-text-tile-secondary)" }}
            >
              Stop losing calls after hours. Aria answers every call, qualifies the lead, and books
              appointments directly into your calendar — 24 hours a day, 7 days a week. No hold
              music. No missed revenue.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-md"
              style={{
                background: "var(--lv-cta-button-bg)",
                color: "var(--lv-cta-button-text)",
              }}
            >
              Add Aria to My Practice
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
