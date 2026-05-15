"use client"

import { useEffect, useState } from "react"

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
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot mount sync
    setTimeLeft(getNextSlot() - Date.now())
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
            <p className="text-gray-500">
              From payment to published — here&apos;s exactly what happens
            </p>
          </div>

          <ol
            aria-label="Launch path steps"
            className="flex items-center justify-between mb-10"
          >
            {STEPS.map((step, i) => (
              <li key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                      i === 0
                        ? "bg-violet-700 text-white"
                        : "bg-violet-100 text-violet-700"
                    }`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs text-center font-medium text-violet-700">
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="h-0.5 flex-1 mx-2 -mt-5 bg-violet-200"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>

          <div className="text-center bg-violet-50 rounded-xl p-8 border border-violet-100">
            <p className="text-sm text-gray-500 mb-3 font-medium uppercase tracking-widest">
              Next Available Slot
            </p>
            <div
              className="text-5xl md:text-6xl font-mono font-bold text-violet-700 mb-4 tabular-nums"
              data-testid="countdown"
              suppressHydrationWarning
            >
              {timeLeft === null ? "—" : formatTime(timeLeft)}
            </div>
            <p className="text-sm text-amber-700 font-semibold">
              Limited slots each week — book early to secure your launch date.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
