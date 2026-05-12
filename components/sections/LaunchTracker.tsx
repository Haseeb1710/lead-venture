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
    <section className="py-20 bg-violet-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-violet-100 shadow-xl shadow-violet-50 p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f0a1e] mb-2">
              Your 48-Hour Launch Path
            </h2>
            <p className="text-gray-500">From payment to published — here&apos;s exactly what happens</p>
          </div>

          {/* Progress steps */}
          <div className="flex items-center justify-between mb-10">
            {STEPS.map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-colors ${
                      i < 2
                        ? "bg-violet-700 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-xs text-center font-medium ${
                      i < 2 ? "text-violet-700" : "text-gray-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 -mt-5 ${
                      i < 1 ? "bg-violet-700" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Countdown */}
          <div className="text-center bg-violet-50 rounded-xl p-8 border border-violet-100">
            <p className="text-sm text-gray-500 mb-3 font-medium uppercase tracking-widest">
              Next Available Slot
            </p>
            <div
              className="text-5xl md:text-6xl font-mono font-bold text-violet-700 mb-4 tabular-nums"
              data-testid="countdown"
            >
              {formatTime(timeLeft)}
            </div>
            <p className="text-sm text-amber-600 font-semibold">
              ⚡ Only 3 spots available this week
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
