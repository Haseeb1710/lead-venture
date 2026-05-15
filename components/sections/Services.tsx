"use client"

import { motion } from "framer-motion"

/* ─── Visual #1: SEO — Search Ranking Climb ─────────────────────────── */

const SEO_RESULTS = [
  { title: "competitor-dental.com", caption: "Dental Care", isYou: false },
  { title: "smiles-of-the-city.com", caption: "Dental Care", isYou: false },
  { title: "yourbusiness.com", caption: "Your Practice", isYou: true },
]

/**
 * Looping ranking animation. Each row follows a six-phase keyframe timeline:
 *   t=0       hidden at initial slot
 *   t=0.08    faded in (initial positions)
 *   t=0.30    finished climb to final positions
 *   t=0.85    hold final state
 *   t=0.95    faded out (still at final positions)
 *   t=1.0     snapped back to initial slot (invisible — sets up next loop)
 */
function SeoVisual() {
  const slotY = (idx: number) => idx * 52
  const LOOP = 6 // seconds per full cycle

  return (
    <div className="relative h-44 px-5 pt-5 pb-3">
      {SEO_RESULTS.map((r, i) => {
        const initialIdx = i
        const finalIdx = r.isYou ? 0 : i + 1
        return (
          <motion.div
            key={r.title}
            className="absolute left-5 right-5 h-11 rounded-lg flex items-center px-3 gap-3"
            style={{
              background: r.isYou
                ? "linear-gradient(135deg, rgba(100,206,251,0.18), rgba(124,58,237,0.18))"
                : "var(--lv-tile-inner-bg)",
              border: r.isYou
                ? "1px solid rgba(100,206,251,0.40)"
                : "1px solid var(--lv-tile-inner-border)",
              boxShadow: r.isYou
                ? "0 6px 22px rgba(100,206,251,0.22)"
                : "none",
            }}
            animate={{
              y: [
                slotY(initialIdx),
                slotY(initialIdx),
                slotY(finalIdx),
                slotY(finalIdx),
                slotY(finalIdx),
                slotY(initialIdx),
              ],
              opacity: [0, 1, 1, 1, 0, 0],
            }}
            transition={{
              times: [0, 0.08, 0.30, 0.85, 0.95, 1],
              duration: LOOP,
              repeat: Infinity,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span
              className="text-xs font-mono font-bold w-6 text-center"
              style={{
                color: r.isYou ? "#64CEFB" : "var(--lv-text-tile-faint)",
              }}
            >
              #{r.isYou ? 1 : i + 2}
            </span>
            <div className="flex-1 min-w-0">
              <div
                className="text-sm font-semibold truncate"
                style={{ color: r.isYou ? "var(--lv-text-tile-primary)" : "var(--lv-text-tile-secondary)" }}
              >
                {r.title}
              </div>
              <div
                className="text-[10px] uppercase tracking-wider"
                style={{ color: r.isYou ? "#64CEFB" : "var(--lv-text-tile-faint)" }}
              >
                {r.caption}
              </div>
            </div>
            {r.isYou && (
              <motion.span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full text-white whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #64CEFB, #A78BFA, #7C3AED)",
                }}
                animate={{
                  opacity: [0, 0, 0, 1, 1, 0, 0],
                  scale: [0.6, 0.6, 0.6, 1, 1, 1, 0.6],
                }}
                transition={{
                  times: [0, 0.08, 0.30, 0.42, 0.85, 0.95, 1],
                  duration: LOOP,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                ★ Rank #1
              </motion.span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

/* ─── Visual #2: AEO — Q&A Bubble Exchange ──────────────────────────── */

function AeoVisual() {
  const LOOP = 6
  return (
    <div className="relative h-44 px-5 py-5 flex flex-col justify-center gap-3">
      {/* Question bubble — slides in from left, hold, fades out */}
      <motion.div
        animate={{
          opacity: [0, 1, 1, 1, 0, 0],
          x: [-20, 0, 0, 0, -20, -20],
        }}
        transition={{
          times: [0, 0.10, 0.30, 0.85, 0.95, 1],
          duration: LOOP,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="self-start max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-md"
        style={{
          background: "var(--lv-tile-inner-bg)",
          border: "1px solid var(--lv-tile-inner-border)",
          fontSize: "0.85rem",
          color: "var(--lv-text-tile-secondary)",
        }}
      >
        <span
          className="block text-[9px] uppercase tracking-widest font-bold mb-0.5"
          style={{ color: "var(--lv-text-tile-faint)" }}
        >
          Searcher
        </span>
        &quot;best dentist in dallas?&quot;
      </motion.div>

      {/* Answer bubble — slides in from right after question, holds, fades out */}
      <motion.div
        animate={{
          opacity: [0, 0, 1, 1, 0, 0],
          x: [20, 20, 0, 0, 20, 20],
        }}
        transition={{
          times: [0, 0.20, 0.35, 0.85, 0.95, 1],
          duration: LOOP,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="self-end max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-md"
        style={{
          background: "linear-gradient(135deg, rgba(100,206,251,0.20), rgba(124,58,237,0.20))",
          border: "1px solid rgba(100,206,251,0.40)",
          fontSize: "0.85rem",
          color: "var(--lv-text-tile-primary)",
        }}
      >
        <span
          className="block text-[9px] uppercase tracking-widest font-bold mb-0.5"
          style={{ color: "#64CEFB" }}
        >
          Featured Snippet
        </span>
        We recommend{" "}
        <motion.span
          animate={{ opacity: [0, 0, 0, 1, 1, 0, 0] }}
          transition={{
            times: [0, 0.20, 0.45, 0.55, 0.85, 0.95, 1],
            duration: LOOP,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            fontWeight: 800,
            background: "linear-gradient(135deg, #64CEFB, #A78BFA, #7C3AED)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            display: "inline-block",
          }}
        >
          Bright Smile Dentistry
        </motion.span>
        .
      </motion.div>
    </div>
  )
}

/* ─── Visual #3: GEO — Multi-AI Mentions ────────────────────────────── */

const AI_MENTIONS = [
  { platform: "ChatGPT", snippet: "...try" },
  { platform: "Gemini", snippet: "We recommend" },
  { platform: "Perplexity", snippet: "...visit" },
]

function GeoVisual() {
  const LOOP = 6
  // Each platform card fades up at its own staggered phase of the loop, then
  // all hold together until the global fade-out at t=0.85.
  const cardKeyframes = (offset: number) => ({
    times: [0, offset, offset + 0.08, 0.85, 0.95, 1],
    duration: LOOP,
    repeat: Infinity,
    ease: "easeOut" as const,
  })
  return (
    <div className="relative h-44 px-5 py-4 flex flex-col justify-center gap-2">
      {AI_MENTIONS.map((m, i) => {
        const offset = 0.08 + i * 0.18 // 0.08, 0.26, 0.44
        return (
        <motion.div
          key={m.platform}
          animate={{
            opacity: [0, 0, 1, 1, 0, 0],
            y: [10, 10, 0, 0, 0, 10],
          }}
          transition={cardKeyframes(offset)}
          className="rounded-lg px-3 py-2 flex items-center gap-2.5"
          style={{
            background: "var(--lv-tile-inner-bg)",
            border: "1px solid var(--lv-tile-inner-border)",
            fontSize: "0.78rem",
          }}
        >
          <span
            className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white"
            style={{
              background:
                i === 0
                  ? "linear-gradient(135deg, #10a37f, #1a7f64)"
                  : i === 1
                  ? "linear-gradient(135deg, #4285f4, #34a853)"
                  : "linear-gradient(135deg, #1F1F1F, #64CEFB)",
            }}
          >
            {m.platform[0]}
          </span>
          <span
            className="text-[10px] uppercase tracking-widest font-bold w-16 flex-shrink-0"
            style={{ color: "var(--lv-text-tile-muted)" }}
          >
            {m.platform}
          </span>
          <span
            className="text-xs flex-1 min-w-0 truncate"
            style={{ color: "var(--lv-text-tile-secondary)" }}
          >
            {m.snippet}{" "}
            <span
              style={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #64CEFB, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              your practice
            </span>
          </span>
          <motion.span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "#64CEFB" }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
          />
        </motion.div>
        )
      })}
    </div>
  )
}

/* ─── Service Card wrapper ──────────────────────────────────────────── */

type ServiceCardProps = {
  index: number
  label: string
  title: string
  description: string
  features: string[]
  visual: React.ReactNode
}

function ServiceCard({ index, label, title, description, features, visual }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="relative rounded-3xl overflow-hidden flex flex-col"
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

      {/* Animated visual area */}
      <div
        className="relative"
        style={{
          background:
            "linear-gradient(180deg, var(--lv-tile-scene-from) 0%, var(--lv-tile-scene-to) 100%)",
          borderBottom: "1px solid var(--lv-tile-scene-divider)",
        }}
      >
        {visual}
      </div>

      {/* Text content */}
      <div className="p-7 flex-1 flex flex-col">
        <span
          className="text-[10px] uppercase tracking-widest font-bold mb-2"
          style={{
            background: "linear-gradient(135deg, #64CEFB, #A78BFA, #7C3AED)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {label}
        </span>
        <h3 className="text-xl font-bold mb-3" style={{ color: "var(--lv-text-tile-primary)" }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--lv-text-tile-muted)" }}>
          {description}
        </p>
        <ul className="space-y-2 mt-auto">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-sm"
              style={{ color: "var(--lv-text-tile-secondary)" }}
            >
              <span
                className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 text-white"
                style={{
                  background: "linear-gradient(135deg, #64CEFB, #A78BFA)",
                }}
              >
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

/* ─── Section ───────────────────────────────────────────────────────── */

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0f0a1e] dark:text-white mb-4">
            One Platform. Three Unfair Advantages.
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/60 max-w-2xl mx-auto">
            While your competitors rely on yesterday&apos;s SEO, you&apos;ll dominate everywhere
            clients search — including AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            index={0}
            label="SEO"
            title="Search Engine Optimization"
            description="Rank #1 on Google for the searches that matter. Technical SEO, content strategy, and local maps so your phone rings consistently."
            features={[
              "Google Business Profile optimization",
              "Local keyword domination",
              "Technical site audits & fixes",
            ]}
            visual={<SeoVisual />}
          />
          <ServiceCard
            index={1}
            label="AEO"
            title="Answer Engine Optimization"
            description="When people ask Google a question, we make sure your business is the answer. Featured snippets, People Also Ask, and voice search — all covered."
            features={[
              "Featured snippet targeting",
              "People Also Ask optimization",
              "Voice search readiness",
            ]}
            visual={<AeoVisual />}
          />
          <ServiceCard
            index={2}
            label="GEO"
            title="Generative Engine Optimization"
            description="Optimizing your brand for Gemini, ChatGPT, and Perplexity. When AI answers a question about your profession, your name comes up."
            features={[
              "AI citation building",
              "Structured data markup",
              "Brand entity optimization",
            ]}
            visual={<GeoVisual />}
          />
        </div>
      </div>
    </section>
  )
}
