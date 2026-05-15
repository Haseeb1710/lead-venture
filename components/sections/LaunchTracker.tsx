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
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  useEffect(() => {
    setTimeLeft(getNextSlot() - Date.now())
    const timer = setInterval(() => {
      setTimeLeft(getNextSlot() - Date.now())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-2xl p-8 md:p-12"
          style={{
            background:
              "linear-gradient(135deg, var(--lv-tile-from) 0%, var(--lv-tile-mid) 50%, var(--lv-tile-to) 100%)",
            border: "1px solid var(--lv-tile-border)",
            boxShadow:
              "var(--lv-tile-shadow), inset 0 1px 0 var(--lv-tile-inset)",
          backdropFilter: "blur(24px) saturate(100%)",
          WebkitBackdropFilter: "blur(24px) saturate(100%)",
                    }}>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f0a1e] dark:text-white mb-2">
              Your 48-Hour Launch Path
            </h2>
            <p style={{ color: "var(--lv-text-tile-muted)" }}>
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
                            background: "linear-gradient(135deg, #64CEFB, #A78BFA)",
                            color: "#0a0a1a",
                            boxShadow: "0 4px 14px rgba(100,206,251,0.4)",
                          }
                        : {
                            background: "var(--lv-tile-inner-bg)",
                            color: "var(--lv-text-tile-faint)",
                            border: "1px solid var(--lv-tile-inner-border)",
                          }
                    }
                  >
                    {i + 1}
                  </div>
                  <span
                    className="text-xs text-center font-medium"
                    style={{ color: i < 2 ? "#64CEFB" : "var(--lv-text-tile-faint)" }}
                  >
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="h-px flex-1 mx-2 -mt-5"
                    style={{
                      background: i < 1
                        ? "linear-gradient(90deg, #64CEFB, #A78BFA)"
                        : "var(--lv-tile-divider)",
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
              background:
                "linear-gradient(135deg, rgba(100,206,251,0.10) 0%, rgba(167,139,250,0.10) 50%, rgba(124,58,237,0.08) 100%)",
              border: "1px solid rgba(100,206,251,0.20)",
            }}
          >
            <p className="text-sm mb-3 font-medium uppercase tracking-widest" style={{ color: "var(--lv-text-tile-muted)" }}>
              Next Available Slot
            </p>
            <div
              className="text-5xl md:text-6xl font-mono font-bold mb-4 tabular-nums"
              data-testid="countdown"
              style={{
                background: "linear-gradient(135deg, #64CEFB 0%, #A78BFA 50%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {timeLeft === null ? "--:--:--" : formatTime(timeLeft)}
            </div>
            <p className="text-sm font-semibold" style={{ color: "#FBBF24" }}>
              ⚡ Only 3 spots available this week
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
