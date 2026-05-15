"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const BAR_HEIGHTS = [0.4, 0.8, 0.5, 1.0, 0.6, 0.9, 0.4]

export default function AIDemoCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <section id="ai-demo" className="py-24 bg-gradient-to-br from-violet-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Card */}
          <div className="flex justify-center lg:order-2">
            <motion.div
              className="bg-white rounded-2xl border border-violet-200 shadow-2xl shadow-violet-100 p-8 w-full max-w-sm"
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-violet-200 flex-shrink-0">
                  A
                </div>
                <div>
                  <div className="font-semibold text-[#0f0a1e]">Aria — AI Receptionist</div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live &amp; Booking
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
                    className="w-2.5 rounded-full bg-gradient-to-t from-violet-600 to-cyan-500"
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
                    style={{ height: 48, originY: 0.5 }}
                  />
                ))}
              </div>

              {/* Dialogue */}
              <div className="bg-violet-50 rounded-xl p-4 text-sm text-gray-600 italic mb-6 border border-violet-100 leading-relaxed">
                &ldquo;Hi, this is Aria from [Your Practice]. How can I help you today?&rdquo;
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {["24/7 Available", "Instant Response", "Books Appointments"].map((pill) => (
                  <span
                    key={pill}
                    className="bg-violet-100 text-violet-700 text-xs px-3 py-1.5 rounded-full font-semibold"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Copy */}
          <div className="lg:order-1">
            <h2 className="text-4xl font-bold text-[#0f0a1e] mb-6">
              Meet Aria, Your AI Receptionist
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Stop losing calls after hours. Aria answers every call, qualifies the lead, and books
              appointments directly into your calendar — 24 hours a day, 7 days a week. No hold
              music. No missed revenue.
            </p>
            <a
              href="#contact"
              className="inline-block bg-violet-700 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-violet-800 transition-colors shadow-lg shadow-violet-200"
            >
              Add Aria to My Practice
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
