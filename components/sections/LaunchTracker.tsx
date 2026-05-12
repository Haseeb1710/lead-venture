"use client"

import { useState, useEffect } from "react"

const SLOT_SEED = new Date("2026-05-12T09:00:00").getTime()
const SLOT_DURATION = 72 * 60 * 60 * 1000

function getNextSlot(): number {
  const now = Date.now()
  return SLOT_SEED + Math.ceil((now - SLOT_SEED) / SLOT_DURATION) * SLOT_DURATION
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

const STEPS = ["Payment", "Asset Upload", "AI Training", "Go-Live"]

export default function LaunchTracker() {
  const [timeLeft, setTimeLeft] = useState<number>(() => getNextSlot() - Date.now())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getNextSlot() - Date.now())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 bg-[#0f0e1a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl p-8 md:p-12"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Your 48-Hour Launch Path
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)" }}>
              From payment to published — here&apos;s exactly what happens
            </p>
          </div>

          {/* Progress steps */}
          <div className="flex items-center justify-between mb-10">
            {STEPS.map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-colors"
                    style={
                      i < 2
                        ? {
                            background: "linear-gradient(135deg, #6A91FF, #7C3AED)",
                            color: "#ffffff",
                            boxShadow: "0 4px 16px rgba(106,145,255,0.35)",
                          }
                        : {
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.3)",
                          }
                    }
                  >
                    {i + 1}
                  </div>
                  <span
                    className="text-xs text-center font-medium"
                    style={{ color: i < 2 ? "#a5b4fc" : "rgba(255,255,255,0.3)" }}
                  >
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="h-px flex-1 mx-2 -mt-5"
                    style={{
                      background: i < 1
                        ? "linear-gradient(90deg, #6A91FF, #7C3AED)"
                        : "rgba(255,255,255,0.08)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Countdown */}
          <div
            className="text-center rounded-xl p-8"
            style={{
              background: "rgba(106,145,255,0.06)",
              border: "1px solid rgba(106,145,255,0.15)",
            }}
          >
            <p
              className="text-sm mb-3 font-medium uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Next Available Slot
            </p>
            <div
              className="text-5xl md:text-6xl font-mono font-bold mb-4 tabular-nums"
              data-testid="countdown"
              style={{
                background: "linear-gradient(135deg, #6A91FF 0%, #a78bfa 50%, #FFA7B3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {formatTime(timeLeft)}
            </div>
            <p className="text-sm font-semibold text-amber-400">
              ⚡ Only 3 spots available this week
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
