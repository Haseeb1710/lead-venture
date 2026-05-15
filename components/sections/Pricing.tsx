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
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0f0a1e] dark:text-white mb-4">
            Transparent Pricing. Extraordinary Results.
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/60">
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
              className="relative rounded-2xl p-8"
              style={
                plan.highlight
                  ? {
                      background: "#0f0e1a",
                      border: "1px solid #1e1e2e",
                      boxShadow: "0 30px 80px rgba(15,14,26,0.22)",
                    }
                  : {
                      background:
                        "linear-gradient(135deg, var(--lv-tile-from) 0%, var(--lv-tile-mid) 50%, var(--lv-tile-to) 100%)",
                      border: "1px solid var(--lv-tile-border)",
                      boxShadow:
                        "var(--lv-tile-shadow), inset 0 1px 0 var(--lv-tile-inset)",
          backdropFilter: "blur(24px) saturate(100%)",
          WebkitBackdropFilter: "blur(24px) saturate(100%)",
                              }
              }
            >
              {plan.badge && (
                <span
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #64CEFB 0%, #A78BFA 50%, #7C3AED 100%)",
                  }}
                >
                  {plan.badge}
                </span>
              )}

              <h3
                className="text-xl font-bold mb-2"
                style={{ color: plan.highlight ? "#ffffff" : "var(--lv-text-tile-primary)" }}
              >
                {plan.name}
              </h3>
              <div className="flex items-end gap-1 mb-6">
                <span
                  className="text-5xl font-extrabold"
                  style={{ color: plan.highlight ? "#ffffff" : "var(--lv-text-tile-primary)" }}
                >
                  ${plan.price}
                </span>
                <span
                  className="text-sm mb-2"
                  style={{ color: plan.highlight ? "rgba(255,255,255,0.45)" : "var(--lv-text-tile-faint)" }}
                >
                  /mo
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, #64CEFB, #A78BFA)",
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{ color: plan.highlight ? "rgba(255,255,255,0.72)" : "var(--lv-text-tile-secondary)" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="/contact"
                className="block text-center py-3.5 rounded-xl font-semibold transition-all text-sm"
                style={
                  plan.highlight
                    ? {
                        background: "linear-gradient(135deg, #64CEFB 0%, #A78BFA 50%, #7C3AED 100%)",
                        color: "#ffffff",
                        boxShadow: "0 6px 20px rgba(100,206,251,0.3)",
                      }
                    : {
                        background: "#0f0e1a",
                        color: "#ffffff",
                      }
                }
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
