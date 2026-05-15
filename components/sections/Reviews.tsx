"use client"

import { motion } from "framer-motion"

const REVIEWS = [
  {
    quote:
      "Lead Venture had us live in 47 hours. Within the first month we doubled our new-patient consultations — and the AI receptionist booked 12 of them while we slept.",
    name: "Sarah Chen",
    title: "Owner, Bright Smile Dentistry",
    initials: "SC",
    location: "Dallas, TX",
  },
  {
    quote:
      "We rank #1 on Google AND ChatGPT for personal injury in our city. Phone hasn't stopped ringing since week two. Honestly the best marketing money we've spent.",
    name: "Marcus Hartwell",
    title: "Managing Partner, Hartwell & Burke",
    initials: "MH",
    location: "Atlanta, GA",
  },
  {
    quote:
      "Aria handles every after-hours call and triages who's actually a fit. We've booked 23 new patients this month from missed calls that used to just go to voicemail.",
    name: "Dr. James Vega",
    title: "Director, APEX Spine + Sports",
    initials: "JV",
    location: "Phoenix, AZ",
  },
]

function GradientStars() {
  return (
    <div className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            delay: 0.1 + i * 0.05,
            type: "spring",
            stiffness: 220,
            damping: 12,
          }}
          className="text-lg leading-none"
          style={{
            background: "linear-gradient(135deg, #64CEFB, #A78BFA, #7C3AED)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ★
        </motion.span>
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "linear-gradient(135deg, #64CEFB, #A78BFA, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            What practices say
          </span>
          <h2 className="text-4xl font-bold text-[#0f0a1e] dark:text-white mt-3 mb-6">
            Loved by 500+ practices.
          </h2>

          {/* Aggregate rating pill — theme-aware */}
          <div
            className="relative inline-flex items-center gap-3 px-4 py-2 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, var(--lv-tile-from) 0%, var(--lv-tile-mid) 50%, var(--lv-tile-to) 100%)",
              border: "1px solid var(--lv-tile-border)",
              boxShadow:
                "inset 0 1px 0 var(--lv-tile-inset), 0 6px 24px rgba(15,10,30,0.08)",
          backdropFilter: "blur(24px) saturate(100%)",
          WebkitBackdropFilter: "blur(24px) saturate(100%)",
                      }}
          >
            <GradientStars />
            <span className="text-sm font-bold" style={{ color: "var(--lv-text-tile-primary)" }}>
              5.0
            </span>
            <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "var(--lv-text-tile-muted)" }}>
              247 reviews this month
            </span>
          </div>
        </div>

        {/* Review grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="relative rounded-3xl p-8 flex flex-col"
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
                className="pointer-events-none absolute inset-x-6 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, var(--lv-tile-top-glow) 50%, transparent 100%)",
                }}
              />
              {/* Stars + quote-mark */}
              <div className="flex items-center justify-between mb-5">
                <GradientStars />
                <span
                  className="text-4xl leading-none -mt-2 opacity-30"
                  style={{
                    background:
                      "linear-gradient(135deg, #64CEFB, #A78BFA, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  &ldquo;
                </span>
              </div>

              {/* Quote */}
              <p
                className="text-[15px] leading-relaxed flex-1 mb-6"
                style={{ color: "var(--lv-text-tile-secondary)" }}
              >
                {r.quote}
              </p>

              {/* Author */}
              <div
                className="flex items-center gap-3 pt-5"
                style={{ borderTop: "1px solid var(--lv-tile-divider)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #64CEFB, #A78BFA, #7C3AED)",
                    boxShadow: "0 4px 14px rgba(100,206,251,0.25)",
                  }}
                >
                  {r.initials}
                </div>
                <div className="min-w-0">
                  <div
                    className="text-sm font-bold truncate"
                    style={{ color: "var(--lv-text-tile-primary)" }}
                  >
                    {r.name}
                  </div>
                  <div
                    className="text-[11px] uppercase tracking-widest font-semibold truncate"
                    style={{ color: "var(--lv-text-tile-muted)" }}
                  >
                    {r.title} · {r.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
