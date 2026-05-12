"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#f8f7ff] overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-8 border border-violet-200">
            48-Hour Launch Guarantee
          </span>

          <h1 className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-extrabold text-[#0f0a1e] leading-[1.1] tracking-tight mb-6">
            Your Business Online in{" "}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
              48 Hours.
            </span>
            <br />
            Your Brand Everywhere Forever.
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
            We build high-performance websites for lawyers, insurance agents, chiropractors, and dentists —
            then keep you visible on Google, ChatGPT, and everywhere clients search.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
        >
          <a
            href="#contact"
            className="bg-violet-700 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-violet-800 transition-colors shadow-lg shadow-violet-200/60"
          >
            Start 48-Hour Build
          </a>
          <a
            href="#services"
            className="border-2 border-violet-300 text-violet-700 px-8 py-4 rounded-xl font-semibold text-base hover:bg-violet-50 transition-colors"
          >
            See How It Works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {["Lawyers", "Insurance Agents", "Chiropractors", "Dentists"].map((niche) => (
            <span
              key={niche}
              className="bg-white border border-violet-100 text-gray-600 text-sm px-5 py-2 rounded-full shadow-sm font-medium"
            >
              {niche}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
