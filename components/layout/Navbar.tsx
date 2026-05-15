"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Menu, X } from "lucide-react"

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const logoSrc = "/leadv-logo-dark.svg"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <motion.header
        // Fixed-position floating wrapper — animates max-width and vertical offset on scroll
        className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none"
        initial={false}
        animate={{
          top: scrolled ? 12 : 24,
          paddingLeft: scrolled ? 16 : 32,
          paddingRight: scrolled ? 16 : 32,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 30 }}
      >
        <motion.nav
          className="relative pointer-events-auto w-full rounded-2xl flex items-center justify-between overflow-hidden"
          initial={false}
          animate={{
            // Reversed: expanded over the hero, contracts to a compact pill on scroll
            maxWidth: scrolled ? 820 : 1180,
            paddingLeft: scrolled ? 18 : 24,
            paddingRight: scrolled ? 12 : 16,
            paddingTop: scrolled ? 5 : 7,
            paddingBottom: scrolled ? 5 : 7,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 30 }}
          style={{
            // Light, near-clear glass — let the page bg breathe through.
            background:
              "linear-gradient(135deg, rgba(100,206,251,0.08) 0%, rgba(167,139,250,0.06) 50%, rgba(124,58,237,0.08) 100%)",
            backdropFilter: "blur(20px) saturate(100%)",
            WebkitBackdropFilter: "blur(20px) saturate(100%)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow:
              "0 8px 28px rgba(0,0,0,0.30), " +
              "inset 0 1px 0 rgba(255,255,255,0.10)",
          }}
        >
          {/* Subtle top sheen — softer than the previous bright crescent */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)",
              mixBlendMode: "screen",
            }}
          />
          {/* Logo — horizontal lockup (394×87 source). Light/dark variants swap the wordmark color while keeping the gradient icon intact. */}
          <Link href="/" aria-label="Lead Venture — Home" className="flex items-center shrink-0">
            <Image
              src={logoSrc}
              alt="Lead Venture"
              width={394}
              height={87}
              priority
              className="h-5 w-auto"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-white/70">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="hover:text-[#0f0a1e] dark:hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-1.5">
            {/* Gradient-bordered CTA — Traxy "Start For Free" style */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold text-[#0f0a1e] dark:text-white shadow-sm transition-transform hover:scale-[1.02] cta-gradient-border"
            >
              Start 48-Hour Build
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </Link>
            <button
              className="md:hidden p-2 rounded-xl text-[#0f0a1e] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-[#08070f]/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-6"
          >
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold text-[#0f0a1e] dark:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center gap-1.5 px-6 py-3 rounded-xl text-base font-semibold text-[#0f0a1e] dark:text-white shadow-sm cta-gradient-border"
            >
              Start 48-Hour Build
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
