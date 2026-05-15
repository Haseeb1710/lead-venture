"use client"

import { motion } from "framer-motion"

const PLANS = [
  {
    name: "Accelerator",
    price: 500,
    highlight: false,
    features: [
      "Professional website (5 pages)",
      "Basic SEO setup",
      "Google Business Profile",
      "Mobile responsive design",
      "1 revision round",
    ],
  },
  {
    name: "Authority",
    price: 900,
    highlight: true,
    badge: "Most Popular",
    features: [
      "Everything in Accelerator",
      "Full AEO optimization",
      "GEO for ChatGPT & Gemini",
      "Social Media Management",
      "Monthly performance report",
      "3 revision rounds",
    ],
  },
  {
    name: "Market Leader",
    price: 1500,
    highlight: false,
    features: [
      "Everything in Authority",
      "AI Receptionist (Aria)",
      "Priority support",
      "Quarterly strategy calls",
      "Competitor monitoring",
      "Unlimited revisions",
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#f8f7ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0f0a1e] mb-4">
            Transparent Pricing. Extraordinary Results.
          </h2>
          <p className="text-lg text-gray-500">
            No long-term contracts. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={plan.highlight ? { scale: 1.02 } : { y: -4 }}
              className={`rounded-2xl border p-8 relative ${
                plan.highlight
                  ? "bg-violet-700 border-violet-700 text-white shadow-2xl shadow-violet-200 md:-mt-6 md:-mb-6"
                  : "bg-white border-gray-100 shadow-sm"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                  {plan.badge}
                </span>
              )}

              <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? "text-white" : "text-[#0f0a1e]"}`}>
                {plan.name}
              </h3>
              <div className="flex items-end gap-1 mb-6">
                <span className={`text-5xl font-extrabold ${plan.highlight ? "text-white" : "text-[#0f0a1e]"}`}>
                  ${plan.price}
                </span>
                <span className={`text-sm mb-2 ${plan.highlight ? "text-violet-200" : "text-gray-400"}`}>
                  /mo
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold ${
                        plan.highlight
                          ? "bg-white/20 text-white"
                          : "bg-violet-100 text-violet-700"
                      }`}
                    >
                      ✓
                    </span>
                    <span className={plan.highlight ? "text-violet-100" : "text-gray-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3.5 rounded-xl font-semibold transition-colors text-sm ${
                  plan.highlight
                    ? "bg-white text-violet-700 hover:bg-violet-50"
                    : "bg-violet-700 text-white hover:bg-violet-800"
                }`}
              >
                Start 48-Hour Build
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
