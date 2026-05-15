"use client"

import { motion } from "framer-motion"
import { Bone, Scale, ShieldCheck, Smile, type LucideIcon } from "lucide-react"

type Niche = {
  Icon: LucideIcon
  profession: string
  headline: string
  copy: string
}

const NICHES: Niche[] = [
  {
    Icon: Scale,
    profession: "Lawyers",
    headline: "Turn Searches Into Retained Clients",
    copy: "Every day your site doesn't rank is a case your competitor wins. We get you found when prospects search 'attorney near me' on Google and ChatGPT.",
  },
  {
    Icon: ShieldCheck,
    profession: "Insurance Agents",
    headline: "Be the Agent Clients Find First",
    copy: "Insurance is a trust game. We make sure your name appears first — on search engines, AI assistants, and local maps — before clients call anyone else.",
  },
  {
    Icon: Bone,
    profession: "Chiropractors",
    headline: "Fill Your Schedule Every Week",
    copy: "New patients search for pain relief right now. We put your practice in front of them on Google, Yelp, and AI search before they book somewhere else.",
  },
  {
    Icon: Smile,
    profession: "Dentists",
    headline: "Keep Your Chair Full Year-Round",
    copy: "Cosmetic and emergency dental patients decide fast. We make sure your practice is the first result they see — and the easiest to book.",
  },
]

export default function IndustryHub() {
  return (
    <section id="industry" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0f0a1e] mb-4">Built for Your Profession</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            We specialize in four high-revenue professions — and we know exactly what it takes to grow each one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {NICHES.map((niche, i) => {
            const Icon = niche.Icon
            return (
              <motion.div
                key={niche.profession}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(124,58,237,0.1)" }}
                className="bg-[#faf5ff] rounded-2xl p-8 border border-violet-100 cursor-default"
              >
                <div
                  className="w-12 h-12 mb-4 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <div className="text-xs text-violet-600 font-semibold uppercase tracking-widest mb-2">
                  {niche.profession}
                </div>
                <h3 className="text-xl font-bold text-[#0f0a1e] mb-3">{niche.headline}</h3>
                <p className="text-gray-600 leading-relaxed">{niche.copy}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
