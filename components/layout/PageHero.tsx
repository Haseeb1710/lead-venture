"use client"

import { motion } from "framer-motion"

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
}

/**
 * Compact page header used at the top of /services, /pricing, /faq, /about.
 * Smaller than the homepage Hero — just enough to establish the page identity
 * below the floating navbar.
 */
export default function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="relative pt-36 pb-12 text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(15,10,30,0.06)",
              backdropFilter: "blur(8px)",
              color: "#64CEFB",
            }}
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-[1.08] tracking-tight text-[#0f0a1e] dark:text-white"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-600 dark:text-white/65 max-w-2xl mx-auto leading-relaxed mt-5"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
