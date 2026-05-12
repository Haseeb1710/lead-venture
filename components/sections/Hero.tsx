"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center bg-[#08070f] overflow-hidden">
      {/* Dynamic Glow blobs — Interactive & Floating */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full pointer-events-none -translate-y-1/3 translate-x-1/4"
        style={{
          background: "radial-gradient(circle, rgba(106,145,255,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 0.8, 1],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(255,167,179,0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center w-full"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-block text-sm font-semibold px-5 py-2 rounded-full mb-8 border cursor-default"
            style={{
              background: "rgba(106,145,255,0.08)",
              borderColor: "rgba(106,145,255,0.2)",
              color: "#a5b4fc",
              boxShadow: "0 0 20px rgba(106,145,255,0.1)",
            }}
          >
            🚀 48-Hour Launch Guarantee
          </motion.span>

          <h1 className="text-[clamp(2.8rem,6.5vw,5.5rem)] font-extrabold leading-[1.02] tracking-tighter mb-8 text-white">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block"
            >
              Your Business Online in{" "}
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #6A91FF 0%, #a78bfa 45%, #FFA7B3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              48 Hours.
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute -bottom-2 left-0 h-1 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, #6A91FF, transparent)",
                  opacity: 0.5,
                }}
              />
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="inline-block text-white/90 mt-2"
            >
              Your Brand Everywhere <span className="text-white/40">Forever.</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            High-performance websites for <span className="text-white/80">lawyers, insurance agents, chiropractors, and dentists.</span>
            <br className="hidden md:block" />
            Stay visible on Google, AI Search, and everywhere clients find you.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-5 justify-center mb-16"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(106, 145, 255, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="px-10 py-4.5 rounded-2xl font-bold text-lg text-white transition-all"
            style={{
              background: "linear-gradient(135deg, #6A91FF 0%, #7C3AED 100%)",
              boxShadow: "0 8px 32px rgba(106, 145, 255, 0.25)",
            }}
          >
            Start 48-Hour Build
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.98 }}
            href="#services"
            className="px-10 py-4.5 rounded-2xl font-semibold text-lg text-white/80 hover:text-white border transition-all"
            style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)" }}
          >
            See How It Works
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {["Lawyers", "Insurance Agents", "Chiropractors", "Dentists"].map((niche, i) => (
            <motion.span
              key={niche}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              whileHover={{ y: -3, color: "rgba(255,255,255,0.9)", borderColor: "rgba(255,255,255,0.2)" }}
              className="text-sm px-6 py-2.5 rounded-xl font-medium border cursor-default transition-colors"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {niche}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

