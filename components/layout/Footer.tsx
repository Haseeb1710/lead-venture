"use client"

import Image from "next/image"
import { motion } from "framer-motion"

// Deterministic glow particles — SSR-safe (no Math.random)
const FOOTER_PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  x: (i * 41 + 5) % 100,
  y: (i * 29 + 17) % 100,
  size: 2 + (i % 4),
  hue: i % 3,
  delay: (i * 0.21) % 5,
  duration: 6 + (i % 5),
}))

// Video-derived palette: cyan, electric purple, deep violet
const PARTICLE_COLORS = ["#64CEFB", "#A78BFA", "#7C3AED"]

const COMPANY = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/#industry" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
]

const RESOURCES = [
  { label: "FAQ", href: "/faq" },
  { label: "AI Receptionist", href: "/#ai-demo" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Blog", href: "/blog" },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a0a1a] text-white">
      {/* Top gradient divider — pulled straight from the hero video palette */}
      <div
        className="relative z-10 h-px"
        style={{
          background:
            "linear-gradient(90deg, #64CEFB 0%, #A78BFA 50%, #7C3AED 100%)",
        }}
      />

      {/* Layer 1 — dot lattice (very subtle on near-black) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Layer 2 — soft swirling glow that echoes the hero video */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 0% 0%, rgba(100,206,251,0.18) 0%, transparent 60%), " +
            "radial-gradient(ellipse 60% 100% at 100% 0%, rgba(167,139,250,0.18) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 80% at 50% 100%, rgba(124,58,237,0.14) 0%, transparent 55%)",
        }}
      />

      {/* Layer 3 — drifting glow particles */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {FOOTER_PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: PARTICLE_COLORS[p.hue],
              boxShadow: `0 0 ${p.size * 4}px ${PARTICLE_COLORS[p.hue]}`,
              opacity: 0.55,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.85, 0.3],
              scale: [1, 1.25, 1],
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

      {/* Footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand + socials */}
          <div className="lg:col-span-1">
            <a
              href="/"
              className="flex items-center gap-2 mb-4"
              aria-label="Lead Venture — Home"
            >
              <Image
                src="/leadv-logo-dark.svg"
                alt="Lead Venture"
                width={394}
                height={87}
                className="h-9 w-auto"
              />
            </a>
            <p className="text-white/40 text-xs leading-relaxed mb-6 max-w-xs">
              Professional business websites launched in 48 hours.
              SEO, AEO, GEO &amp; AI receptionist — your brand everywhere forever.
            </p>
            <div className="flex gap-2.5">
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors"
                aria-label="Twitter / X"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.734l7.731-8.843L1.254 2.25h7.002l4.258 5.63 4.73-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {RESOURCES.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+15551234567"
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@leadventure.io"
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  hello@leadventure.io
                </a>
              </li>
              <li className="text-white/60 text-sm leading-relaxed pt-2">
                123 Market Street
                <br />
                San Francisco, CA 94105
                <br />
                United States
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © 2026 Lead Venture. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-white/25 text-xs hover:text-white/50 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/25 text-xs hover:text-white/50 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
