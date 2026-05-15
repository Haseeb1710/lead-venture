"use client"

import { useState } from "react"

export function calculateProjected(current: number): number {
  return current * 3
}

export default function Calculator() {
  const [leads, setLeads] = useState(20)
  const projected = calculateProjected(leads)

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0f0a1e] dark:text-white mb-4">See Your Growth Potential</h2>
          <p className="text-lg text-gray-600 dark:text-white/60">
            Drag the slider to see what the O-Trifecta can do for your practice
          </p>
        </div>

        <div
          className="relative rounded-2xl p-10"
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
          {/* Slider */}
          <div className="mb-10">
            <label className="block text-sm font-semibold mb-4" style={{ color: "var(--lv-text-tile-secondary)" }}>
              Current monthly leads:{" "}
              <span className="text-lg font-bold" style={{ color: "#64CEFB" }}>{leads}</span>
            </label>
            <input
              type="range"
              min={5}
              max={200}
              value={leads}
              onChange={(e) => setLeads(Number(e.target.value))}
              data-testid="leads-slider"
              className="w-full cursor-pointer"
            />
            <div className="flex justify-between text-xs mt-2" style={{ color: "var(--lv-text-tile-faint)" }}>
              <span>5 leads/mo</span>
              <span>200 leads/mo</span>
            </div>
          </div>

          {/* Stat boxes */}
          <div className="grid grid-cols-2 gap-6">
            <div
              className="rounded-xl p-6 text-center"
              style={{
                background: "var(--lv-tile-inner-bg)",
                border: "1px solid var(--lv-tile-inner-border)",
              }}
            >
              <p className="text-sm mb-3 font-medium" style={{ color: "var(--lv-text-tile-muted)" }}>Current</p>
              <span
                className="text-5xl font-extrabold tabular-nums"
                data-testid="current-leads"
                style={{ color: "var(--lv-text-tile-primary)" }}
              >
                {leads}
              </span>
              <p className="text-xs mt-2" style={{ color: "var(--lv-text-tile-faint)" }}>leads / month</p>
            </div>
            <div
              className="rounded-xl p-6 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(100,206,251,0.18) 0%, rgba(167,139,250,0.18) 50%, rgba(124,58,237,0.14) 100%)",
                border: "1px solid rgba(100,206,251,0.25)",
                boxShadow: "0 8px 28px rgba(100,206,251,0.15)",
              }}
            >
              <p className="text-sm mb-3 font-medium" style={{ color: "#64CEFB" }}>With Lead Venture</p>
              <span
                className="text-5xl font-extrabold tabular-nums"
                data-testid="projected-leads"
                style={{ color: "var(--lv-text-tile-primary)" }}
              >
                {projected}
              </span>
              <p className="text-xs mt-2" style={{ color: "#A78BFA" }}>projected / month</p>
            </div>
          </div>

          <p className="text-center text-xs mt-6" style={{ color: "var(--lv-text-tile-faint)" }}>
            Based on average client results using our AEO + GEO + SEO trifecta
          </p>
        </div>
      </div>
    </section>
  )
}
