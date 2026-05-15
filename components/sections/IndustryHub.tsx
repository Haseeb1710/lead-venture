"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

/* ─── Niche data ────────────────────────────────────────────────────── */

const NICHES = [
  {
    profession: "Lawyers",
    headline: "Turn Searches Into Retained Clients",
    copy:
      "Every day your site doesn't rank is a case your competitor wins. We get you found when prospects search 'attorney near me' on Google and ChatGPT.",
    image:
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A judge's gavel and law books on a desk.",
  },
  {
    profession: "Insurance Agents",
    headline: "Be the Agent Clients Find First",
    copy:
      "Insurance is a trust game. We make sure your name appears first — on search engines, AI assistants, and local maps — before clients call anyone else.",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
    imageAlt:
      "A family walking together in a park at sunset.",
  },
  {
    profession: "Chiropractors",
    headline: "Fill Your Schedule Every Week",
    copy:
      "New patients search for pain relief right now. We put your practice in front of them on Google, Yelp, and AI search before they book somewhere else.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    imageAlt:
      "A chiropractor performing a back adjustment on a patient.",
  },
  {
    profession: "Dentists",
    headline: "Keep Your Chair Full Year-Round",
    copy:
      "Cosmetic and emergency dental patients decide fast. We make sure your practice is the first result they see — and the easiest to book.",
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A dentist examining a patient in a modern clinic.",
  },
] as const

export default function IndustryHub() {
  return (
    <section id="industry" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0f0a1e] dark:text-white mb-4">
            Built for Your Profession
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/60 max-w-xl mx-auto">
            We specialize in four high-revenue professions — and we know
            exactly what it takes to grow each one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {NICHES.map((niche, i) => (
            <motion.article
              key={niche.profession}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-3xl overflow-hidden cursor-default transition-all"
              style={{
                background:
                  "linear-gradient(135deg, var(--lv-tile-from) 0%, var(--lv-tile-mid) 50%, var(--lv-tile-to) 100%)",
                border: "1px solid var(--lv-tile-border)",
                boxShadow:
                  "inset 0 1px 0 var(--lv-tile-inset), var(--lv-tile-shadow)",
                backdropFilter: "blur(24px) saturate(100%)",
                WebkitBackdropFilter: "blur(24px) saturate(100%)",
              }}
            >
              {/* Top-edge cyan highlight — matches the rest of the tile system */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-6 top-0 h-px z-30"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, var(--lv-tile-top-glow) 50%, transparent 100%)",
                }}
              />

              {/* Photo header */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <Image
                  src={niche.image}
                  alt={niche.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  priority={i < 2}
                />

                {/* Dark bottom-fade for the "read more" link legibility */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.10) 40%, rgba(0,0,0,0.55) 100%)",
                  }}
                />

                {/* Centered profession label — same role as the brand logos in the reference */}
                <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
                  <span
                    className="text-white text-2xl sm:text-3xl font-bold tracking-tight text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]"
                  >
                    {niche.profession}
                  </span>
                </div>

                {/* "Read more" affordance, bottom-right */}
                <a
                  href="/services"
                  className="absolute right-4 bottom-3 inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-white/95 hover:text-white transition-colors"
                  aria-label={`Read more about how we help ${niche.profession}`}
                >
                  read more
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>
              </div>

              {/* Text content */}
              <div className="p-8">
                <span
                  className="block text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #64CEFB, #A78BFA, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {niche.profession}
                </span>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--lv-text-tile-primary)" }}
                >
                  {niche.headline}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--lv-text-tile-secondary)" }}
                >
                  {niche.copy}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
