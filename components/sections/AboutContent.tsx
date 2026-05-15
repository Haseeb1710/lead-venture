"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const VALUES = [
  {
    title: "Speed Over Polish",
    body:
      "A 90% website live in 48 hours beats a 100% website that ships in three months. We move fast, then refine in flight.",
    // Giphy: Saturn V rocket ignition — visceral speed/launch metaphor
    image: "https://media.giphy.com/media/sGBMzyeEzKpySD74qv/giphy.gif",
    imageAlt: "Animated rocket igniting and launching at speed.",
  },
  {
    title: "Visibility, Not Vanity",
    body:
      "We don't chase pretty dashboards. Every dollar we deploy is tied to a phone ring, a form submit, or a booked appointment.",
    // Giphy: Kyocera spotlight searching — direct visibility metaphor
    image: "https://media.giphy.com/media/l0ul7AmB09GcMJdTAE/giphy.gif",
    imageAlt: "Animated spotlight sweeping across a scene, searching.",
  },
  {
    title: "AI-First Search",
    body:
      "ChatGPT, Gemini, and Perplexity are already where your next client asks for recommendations. We make sure your name comes up.",
    // Giphy: ChatbotBuilder AI animation — on-theme AI/chatbot visual
    image: "https://media.giphy.com/media/13YPREdAEAHpCoo1SA/giphy.gif",
    imageAlt:
      "Animated artificial intelligence and chatbot visualization.",
  },
] as const

const STATS = [
  { value: "500+", label: "Practices Launched" },
  { value: "48h", label: "Average Build Time" },
  { value: "12", label: "States Served" },
  { value: "3.1×", label: "Avg. Lead Growth" },
]

export default function AboutContent() {
  return (
    <>
      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#64CEFB]">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f0a1e] dark:text-white mt-3 mb-5 leading-tight">
              We saw great practices losing to mediocre marketers.
            </h2>
            <p className="text-gray-600 dark:text-white/65 leading-relaxed mb-4">
              Lead Venture started because we kept meeting brilliant attorneys, dentists,
              chiropractors, and insurance agents whose websites were holding them back.
              Slow agencies. Confusing dashboards. SEO that took 18 months to show results.
            </p>
            <p className="text-gray-600 dark:text-white/65 leading-relaxed">
              So we built the opposite: a tight team that ships a working, ranking, AI-discoverable
              website in 48 hours — and stays around to keep your visibility growing month over month.
            </p>
          </motion.div>

          {/* Story visual — stacked glass cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative h-80"
          >
            {[
              {
                top: "8%",
                left: "0%",
                rotate: "-4deg",
                label: "Day 1",
                title: "Payment + Asset upload",
                delay: 0.15,
              },
              {
                top: "32%",
                left: "12%",
                rotate: "2deg",
                label: "Day 2",
                title: "AI training + Site build",
                delay: 0.3,
              },
              {
                top: "56%",
                left: "4%",
                rotate: "-1deg",
                label: "Day 2 · Evening",
                title: "Live. Indexed. Ringing.",
                delay: 0.45,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: card.delay }}
                className="absolute rounded-2xl px-6 py-5"
                style={{
                  top: card.top,
                  left: card.left,
                  right: "8%",
                  transform: `rotate(${card.rotate})`,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.55) 100%)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.55)",
                  boxShadow: "0 18px 40px rgba(15,10,30,0.08)",
                }}
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    background:
                      "linear-gradient(135deg, #64CEFB, #A78BFA, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {card.label}
                </span>
                <p className="text-base font-semibold text-[#0f0a1e] mt-1">
                  {card.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#64CEFB]">
              What we believe
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f0a1e] dark:text-white mt-3">
              Three principles, no exceptions.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.article
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl overflow-hidden"
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
                {/* Top-edge cyan highlight */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 top-0 h-px z-30"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, var(--lv-tile-top-glow) 50%, transparent 100%)",
                  }}
                />

                {/* GIF header — native img for reliable animation playback */}
                <div className="relative h-44 sm:h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.image}
                    alt={v.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />

                  {/* Bottom-fade so the value label is legible */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.10) 40%, rgba(0,0,0,0.55) 100%)",
                    }}
                  />

                  {/* Centered value title overlay */}
                  <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
                    <span className="text-white text-xl sm:text-2xl font-bold tracking-tight text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                      {v.title}
                    </span>
                  </div>

                  {/* Read more affordance, bottom-right */}
                  <a
                    href="/about"
                    className="absolute right-4 bottom-3 inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-white/95 hover:text-white transition-colors"
                    aria-label={`Read more about ${v.title}`}
                  >
                    read more
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </a>
                </div>

                {/* Body copy */}
                <div className="p-7">
                  <p className="text-sm text-white/65 leading-relaxed">{v.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(100,206,251,0.10), rgba(167,139,250,0.10), rgba(124,58,237,0.10))",
              backdropFilter: "blur(22px) saturate(180%)",
              WebkitBackdropFilter: "blur(22px) saturate(180%)",
              border: "1px solid rgba(100,206,251,0.20)",
              boxShadow:
                "0 14px 40px rgba(100,206,251,0.10), inset 0 1px 0 rgba(255,255,255,0.85)",
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="text-center"
                >
                  <div
                    className="text-4xl md:text-5xl font-extrabold mb-1"
                    style={{
                      background:
                        "linear-gradient(135deg, #64CEFB, #A78BFA, #7C3AED)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-[11px] uppercase tracking-widest font-bold text-gray-500 dark:text-white/55"
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
