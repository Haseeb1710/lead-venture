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
    <section id="pricing" className="py-24 bg-[#08070f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Transparent Pricing. Extraordinary Results.
          </h2>
          <p className="text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
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
              className="rounded-2xl p-8 relative"
              style={
                plan.highlight
                  ? {
                      background: "linear-gradient(145deg, rgba(106,145,255,0.18) 0%, rgba(124,58,237,0.22) 50%, rgba(255,167,179,0.12) 100%)",
                      border: "1px solid rgba(106,145,255,0.35)",
                      boxShadow: "0 30px 80px rgba(106,145,255,0.15)",
                    }
                  : {
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }
              }
            >
              {plan.badge && (
                <span
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg, #6A91FF, #7C3AED)" }}
                >
                  {plan.badge}
                </span>
              )}

              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-5xl font-extrabold text-white">${plan.price}</span>
                <span className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>/mo</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold text-white"
                      style={
                        plan.highlight
                          ? { background: "linear-gradient(135deg, #6A91FF, #7C3AED)" }
                          : { background: "rgba(106,145,255,0.15)", color: "#a5b4fc" }
                      }
                    >
                      ✓
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block text-center py-3.5 rounded-xl font-semibold transition-all text-sm text-white hover:opacity-90"
                style={
                  plan.highlight
                    ? {
                        background: "linear-gradient(135deg, #6A91FF 0%, #7C3AED 100%)",
                        boxShadow: "0 6px 24px rgba(106,145,255,0.3)",
                      }
                    : {
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
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
