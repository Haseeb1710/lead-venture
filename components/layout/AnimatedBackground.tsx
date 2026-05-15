"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/lib/use-theme"

// Deterministic particle positions — SSR-safe (no Math.random)
const PARTICLES = Array.from({ length: 36 }, (_, i) => ({
  x: (i * 37 + 7) % 100,
  y: (i * 53 + 13) % 100,
  size: 2 + (i % 4),
  hue: i % 3,
  delay: (i * 0.19) % 5,
  duration: 6 + (i % 6),
}))

const PARTICLE_COLORS = ["#64CEFB", "#A78BFA", "#7C3AED"]

/**
 * Fixed full-viewport animated backdrop, shared across the whole site.
 * Adapts to light/dark theme.
 */
export default function AnimatedBackground() {
  const { theme, mounted } = useTheme()
  const isDark = mounted && theme === "dark"

  // Light: dark dots on white. Dark: true black to match the hero section.
  const baseColor = isDark ? "#000000" : "#ffffff"
  const dotColor = isDark ? "rgba(255,255,255,0.03)" : "rgba(15,10,30,0.07)"
  // Background glow knocked down further — almost-imperceptible ambient color.
  const blobBg = isDark
    ? "radial-gradient(ellipse 75% 75% at 0% 30%, rgba(100,206,251,0.10) 0%, transparent 60%), " +
      "radial-gradient(ellipse 65% 65% at 100% 20%, rgba(124,58,237,0.09) 0%, transparent 60%), " +
      "radial-gradient(ellipse 60% 65% at 100% 80%, rgba(167,139,250,0.09) 0%, transparent 55%), " +
      "radial-gradient(ellipse 55% 55% at 20% 100%, rgba(100,206,251,0.08) 0%, transparent 55%)"
    : "radial-gradient(ellipse 70% 70% at 0% 30%, rgba(167,139,250,0.32) 0%, transparent 60%), " +
      "radial-gradient(ellipse 60% 60% at 100% 20%, rgba(124,58,237,0.26) 0%, transparent 60%), " +
      "radial-gradient(ellipse 55% 60% at 100% 80%, rgba(100,206,251,0.24) 0%, transparent 55%), " +
      "radial-gradient(ellipse 50% 50% at 20% 100%, rgba(167,139,250,0.20) 0%, transparent 55%)"

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        background: baseColor,
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Layer 1 — Quantum lattice dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Layer 2 — Soft Traxy gradient blobs */}
      <div
        className="absolute inset-0"
        style={{ background: blobBg }}
      />

      {/* Layer 3 — Floating animated particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: PARTICLE_COLORS[p.hue],
            // Particles dimmed to whisper-level — barely-there starlight.
            boxShadow: `0 0 ${p.size * (isDark ? 2 : 3)}px ${PARTICLE_COLORS[p.hue]}`,
            opacity: isDark ? 0.18 : 0.5,
          }}
          animate={{
            y: [0, -24, 0],
            opacity: isDark ? [0.12, 0.20, 0.12] : [0.25, 0.75, 0.25],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
