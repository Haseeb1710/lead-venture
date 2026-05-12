"use client"

import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold"
          style={{
            background: "linear-gradient(135deg, #6A91FF 0%, #a78bfa 50%, #FFA7B3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Lead Venture
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm text-white/60 hover:text-white transition-colors">
            Services
          </a>
          <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-sm text-white/60 hover:text-white transition-colors">
            FAQ
          </a>
          <a
            href="#contact"
            className="text-sm px-5 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #6A91FF 0%, #7C3AED 100%)",
              boxShadow: "0 4px 20px rgba(106, 145, 255, 0.25)",
            }}
          >
            Start 48-Hour Build
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-[#0f0e1a]/95 backdrop-blur-xl border-b border-white/[0.06] px-4 py-4 flex flex-col gap-4">
          <a href="#services" className="text-sm text-white/60 py-1" onClick={() => setOpen(false)}>
            Services
          </a>
          <a href="#pricing" className="text-sm text-white/60 py-1" onClick={() => setOpen(false)}>
            Pricing
          </a>
          <a href="#faq" className="text-sm text-white/60 py-1" onClick={() => setOpen(false)}>
            FAQ
          </a>
          <a
            href="#contact"
            className="text-sm px-5 py-2.5 rounded-lg text-center font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #6A91FF 0%, #7C3AED 100%)" }}
            onClick={() => setOpen(false)}
          >
            Start 48-Hour Build
          </a>
        </div>
      )}
    </header>
  )
}
