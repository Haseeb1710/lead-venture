"use client"

import { useState } from "react"

export function calculateProjected(current: number): number {
  return current * 3
}

export default function Calculator() {
  const [leads, setLeads] = useState(20)
  const projected = calculateProjected(leads)

  return (
    <section className="py-24 bg-[#0f0e1a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">See Your Growth Potential</h2>
          <p className="text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
            Drag the slider to see what the O-Trifecta can do for your practice
          </p>
        </div>

        <div
          className="rounded-2xl p-10"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Slider */}
          <div className="mb-10">
            <label className="block text-sm font-semibold mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
              Current monthly leads:{" "}
              <span className="text-lg font-bold" style={{ color: "#a5b4fc" }}>{leads}</span>
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
            <div className="flex justify-between text-xs mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              <span>5 leads/mo</span>
              <span>200 leads/mo</span>
            </div>
          </div>

          {/* Stat boxes */}
          <div className="grid grid-cols-2 gap-6">
            <div
              className="rounded-xl p-6 text-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-sm mb-3 font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>Current</p>
              <span
                className="text-5xl font-extrabold tabular-nums"
                style={{ color: "rgba(255,255,255,0.7)" }}
                data-testid="current-leads"
              >
                {leads}
              </span>
              <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>leads / month</p>
            </div>
            <div
              className="rounded-xl p-6 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(106,145,255,0.2) 0%, rgba(124,58,237,0.25) 100%)",
                border: "1px solid rgba(106,145,255,0.25)",
                boxShadow: "0 8px 32px rgba(106,145,255,0.12)",
              }}
            >
              <p className="text-sm mb-3 font-medium" style={{ color: "rgba(165,180,252,0.8)" }}>With Lead Venture</p>
              <span
                className="text-5xl font-extrabold tabular-nums text-white"
                data-testid="projected-leads"
              >
                {projected}
              </span>
              <p className="text-xs mt-2" style={{ color: "rgba(165,180,252,0.6)" }}>projected / month</p>
            </div>
          </div>

          <p className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.3)" }}>
            Based on average client results using our AEO + GEO + SEO trifecta
          </p>
        </div>
      </div>
    </section>
  )
}
