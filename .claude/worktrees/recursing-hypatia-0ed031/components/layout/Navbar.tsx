"use client"

import Link from "next/link"
import { useEffect, useId, useRef, useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-violet-100">
      <nav
        aria-label="Primary"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-violet-700 to-cyan-600 bg-clip-text text-transparent"
        >
          Lead Venture
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm text-gray-600 hover:text-violet-700 transition-colors">
            Services
          </a>
          <a href="#pricing" className="text-sm text-gray-600 hover:text-violet-700 transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-sm text-gray-600 hover:text-violet-700 transition-colors">
            FAQ
          </a>
          <a
            href="#contact"
            className="bg-violet-700 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-violet-800 transition-colors font-semibold shadow-sm shadow-violet-200"
          >
            Start 48-Hour Build
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={buttonRef}
          type="button"
          className="md:hidden p-2 text-gray-600 hover:text-violet-700 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
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
        <div
          id={menuId}
          className="md:hidden bg-white/95 backdrop-blur-md border-b border-violet-100 px-4 py-4 flex flex-col gap-4"
        >
          <a href="#services" className="text-sm text-gray-600 py-1" onClick={() => setOpen(false)}>
            Services
          </a>
          <a href="#pricing" className="text-sm text-gray-600 py-1" onClick={() => setOpen(false)}>
            Pricing
          </a>
          <a href="#faq" className="text-sm text-gray-600 py-1" onClick={() => setOpen(false)}>
            FAQ
          </a>
          <a
            href="#contact"
            className="bg-violet-700 text-white text-sm px-5 py-2.5 rounded-lg text-center font-semibold"
            onClick={() => setOpen(false)}
          >
            Start 48-Hour Build
          </a>
        </div>
      )}
    </header>
  )
}
