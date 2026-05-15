"use client"

import { useId, useState } from "react"
import { BUSINESS_TYPES, type BusinessType } from "@/lib/business-types"

export const PLAN_NAMES = ["Accelerator", "Authority", "Market Leader"] as const
export type PlanName = (typeof PLAN_NAMES)[number]

const MULTIPLIERS: Record<BusinessType, Record<PlanName, number>> = {
  Lawyer: { Accelerator: 1.5, Authority: 2.2, "Market Leader": 2.8 },
  "Insurance Agent": { Accelerator: 1.6, Authority: 2.3, "Market Leader": 2.9 },
  Chiropractor: { Accelerator: 1.7, Authority: 2.5, "Market Leader": 3.1 },
  Dentist: { Accelerator: 1.8, Authority: 2.6, "Market Leader": 3.2 },
  Other: { Accelerator: 1.5, Authority: 2.3, "Market Leader": 3.0 },
}

export function getMultiplier(business: BusinessType, plan: PlanName): number {
  return MULTIPLIERS[business][plan]
}

export function calculateProjected(
  current: number,
  business: BusinessType,
  plan: PlanName
): number {
  return Math.round(current * getMultiplier(business, plan))
}

export default function Calculator() {
  const formId = useId()
  const id = (suffix: string) => `${formId}-${suffix}`
  const [leads, setLeads] = useState(20)
  const [business, setBusiness] = useState<BusinessType>("Dentist")
  const [plan, setPlan] = useState<PlanName>("Authority")
  const multiplier = getMultiplier(business, plan)
  const projected = calculateProjected(leads, business, plan)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0f0a1e] mb-4">
            Projected Growth Illustration
          </h2>
          <p className="text-lg text-gray-500">
            Estimate the lead lift you could see with the O-Trifecta. Adjust your
            profession, plan, and current volume below.
          </p>
        </div>

        <div className="bg-gradient-to-br from-violet-50 to-cyan-50 rounded-2xl border border-violet-100 p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div>
              <label
                htmlFor={id("business")}
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Your profession
              </label>
              <select
                id={id("business")}
                value={business}
                onChange={(e) => setBusiness(e.target.value as BusinessType)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
              >
                {BUSINESS_TYPES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor={id("plan")}
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Plan tier
              </label>
              <select
                id={id("plan")}
                value={plan}
                onChange={(e) => setPlan(e.target.value as PlanName)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
              >
                {PLAN_NAMES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-10">
            <label
              htmlFor={id("leads")}
              className="block text-sm font-semibold text-gray-600 mb-4"
            >
              Current monthly leads:{" "}
              <span className="text-violet-700 text-lg">{leads}</span>
            </label>
            <input
              id={id("leads")}
              type="range"
              min={5}
              max={200}
              value={leads}
              onChange={(e) => setLeads(Number(e.target.value))}
              data-testid="leads-slider"
              aria-label="Current monthly leads"
              className="w-full cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>5 leads/mo</span>
              <span>200 leads/mo</span>
            </div>
          </div>

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
              <p className="text-sm text-violet-200 mb-3 font-medium">
                With Lead Venture
              </p>
              <span
                className="text-5xl font-extrabold text-white tabular-nums"
                data-testid="projected-leads"
              >
                {projected}
              </span>
              <p className="text-xs text-violet-300 mt-2">
                projected ({multiplier.toFixed(1)}× lift)
              </p>
            </div>
          </div>

          <p
            role="note"
            className="mt-8 text-sm text-gray-700 bg-amber-50 border border-amber-200 rounded-lg p-4 leading-relaxed"
          >
            <strong>Illustrative estimate, not a guarantee.</strong> Multipliers are
            informed by anonymised internal results across our client base. Actual
            outcomes vary by market, competition, existing presence, and
            engagement. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </section>
  )
}
