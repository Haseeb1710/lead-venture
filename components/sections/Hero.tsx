"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#08070f] overflow-hidden">
      {/* Glow blobs — Traxy palette */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none -translate-y-1/3 translate-x-1/4"
        style={{ background: "radial-gradient(circle, rgba(106,145,255,0.18) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.20) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(255,167,179,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span
            className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-8 border"
            style={{
              background: "rgba(106,145,255,0.1)",
              borderColor: "rgba(106,145,255,0.25)",
              color: "#a5b4fc",
            }}
          >
            48-Hour Launch Guarantee
          </span>

          <h1 className="text-[clamp(2.6rem,5.8vw,4.8rem)] font-extrabold leading-[1.08] tracking-tight mb-6 text-white">
            Your Business Online in{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6A91FF 0%, #a78bfa 45%, #FFA7B3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              48 Hours.
            </span>
            <br />
            Your Brand Everywhere{" "}
            <span className="text-white/90">Forever.</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.58)" }}>
            We build high-performance websites for lawyers, insurance agents, chiropractors, and dentists —
            then keep you visible on Google, ChatGPT, and everywhere clients search.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
        >
          <a
            href="#contact"
            className="px-8 py-4 rounded-xl font-semibold text-base text-white transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #6A91FF 0%, #7C3AED 100%)",
              boxShadow: "0 8px 32px rgba(106, 145, 255, 0.3)",
            }}
          >
            Start 48-Hour Build
          </a>
          <a
            href="#services"
            className="px-8 py-4 rounded-xl font-semibold text-base text-white/80 hover:text-white border transition-colors"
            style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)" }}
          >
            See How It Works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {["Lawyers", "Insurance Agents", "Chiropractors", "Dentists"].map((niche) => (
            <span
              key={niche}
              className="text-sm px-5 py-2 rounded-full font-medium border"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {niche}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
