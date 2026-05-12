"use client"

import { motion } from "framer-motion"

const NICHES = [
  {
    icon: "⚖️",
    profession: "Lawyers",
    headline: "Turn Searches Into Retained Clients",
    copy: "Every day your site doesn't rank is a case your competitor wins. We get you found when prospects search 'attorney near me' on Google and ChatGPT.",
  },
  {
    icon: "🛡️",
    profession: "Insurance Agents",
    headline: "Be the Agent Clients Find First",
    copy: "Insurance is a trust game. We make sure your name appears first — on search engines, AI assistants, and local maps — before clients call anyone else.",
  },
  {
    icon: "🦴",
    profession: "Chiropractors",
    headline: "Fill Your Schedule Every Week",
    copy: "New patients search for pain relief right now. We put your practice in front of them on Google, Yelp, and AI search before they book somewhere else.",
  },
  {
    icon: "🦷",
    profession: "Dentists",
    headline: "Keep Your Chair Full Year-Round",
    copy: "Cosmetic and emergency dental patients decide fast. We make sure your practice is the first result they see — and the easiest to book.",
  },
]

export default function IndustryHub() {
  return (
    <section id="industry" className="py-24 bg-[#08070f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Built for Your Profession</h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            We specialize in four high-revenue professions — and we know exactly what it takes to grow each one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {NICHES.map((niche, i) => (
            <motion.div
              key={niche.profession}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-8 cursor-default transition-all"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(106,145,255,0.25)"
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(106,145,255,0.08)"
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.07)"
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = "none"
              }}
            >
              <div className="text-4xl mb-4">{niche.icon}</div>
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#a5b4fc" }}
              >
                {niche.profession}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{niche.headline}</h3>
              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.7" }}>{niche.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
