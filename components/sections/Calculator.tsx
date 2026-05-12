"use client"

import { useState } from "react"

export function calculateProjected(current: number): number {
  return current * 3
}

export default function Calculator() {
  const [leads, setLeads] = useState(20)
  const projected = calculateProjected(leads)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0f0a1e] mb-4">See Your Growth Potential</h2>
          <p className="text-lg text-gray-500">
            Drag the slider to see what the O-Trifecta can do for your practice
          </p>
        </div>

        <div className="bg-gradient-to-br from-violet-50 to-cyan-50 rounded-2xl border border-violet-100 p-10">
          {/* Slider */}
          <div className="mb-10">
            <label className="block text-sm font-semibold text-gray-600 mb-4">
              Current monthly leads:{" "}
              <span className="text-violet-700 text-lg">{leads}</span>
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
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>5 leads/mo</span>
              <span>200 leads/mo</span>
            </div>
          </div>

          {/* Stat boxes */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-sm">
              <p className="text-sm text-gray-500 mb-3 font-medium">Current</p>
              <span
                className="text-5xl font-extrabold text-gray-700 tabular-nums"
                data-testid="current-leads"
              >
                {leads}
              </span>
              <p className="text-xs text-gray-400 mt-2">leads / month</p>
            </div>
            <div className="bg-violet-700 rounded-xl p-6 text-center shadow-lg shadow-violet-200">
              <p className="text-sm text-violet-200 mb-3 font-medium">With Lead Venture</p>
              <span
                className="text-5xl font-extrabold text-white tabular-nums"
                data-testid="projected-leads"
              >
                {projected}
              </span>
              <p className="text-xs text-violet-300 mt-2">projected / month</p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Based on average client results using our AEO + GEO + SEO trifecta
          </p>
        </div>
      </div>
    </section>
  )
}
