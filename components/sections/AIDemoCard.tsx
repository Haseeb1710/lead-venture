"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const BAR_HEIGHTS = [0.4, 0.8, 0.5, 1.0, 0.6, 0.9, 0.4]

export default function AIDemoCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <section id="ai-demo" className="py-24 bg-[#0f0e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Card */}
          <div className="flex justify-center lg:order-2">
            <motion.div
              className="rounded-2xl p-8 w-full max-w-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(106,145,255,0.2)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              whileHover={{ scale: 1.02, boxShadow: "0 30px 80px rgba(106,145,255,0.12)" }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #6A91FF 0%, #7C3AED 100%)",
                    boxShadow: "0 4px 20px rgba(106,145,255,0.4)",
                  }}
                >
                  A
                </div>
                <div>
                  <div className="font-semibold text-white">Aria — AI Receptionist</div>
                  <div className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
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
                      background: "linear-gradient(to top, #6A91FF, #FFA7B3)",
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
                className="rounded-xl p-4 text-sm italic mb-6 leading-relaxed"
                style={{
                  background: "rgba(106,145,255,0.08)",
                  border: "1px solid rgba(106,145,255,0.15)",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                "Hi, this is Aria from [Your Practice]. How can I help you today?"
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {["24/7 Available", "Instant Response", "Books Appointments"].map((pill) => (
                  <span
                    key={pill}
                    className="text-xs px-3 py-1.5 rounded-full font-semibold"
                    style={{
                      background: "rgba(106,145,255,0.12)",
                      border: "1px solid rgba(106,145,255,0.2)",
                      color: "#a5b4fc",
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
            <h2 className="text-4xl font-bold text-white mb-6">
              Meet Aria, Your AI Receptionist
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.58)" }}>
              Stop losing calls after hours. Aria answers every call, qualifies the lead, and books
              appointments directly into your calendar — 24 hours a day, 7 days a week. No hold
              music. No missed revenue.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #6A91FF 0%, #7C3AED 100%)",
                boxShadow: "0 8px 28px rgba(106,145,255,0.25)",
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
