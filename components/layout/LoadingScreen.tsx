"use client"

import { useState, useEffect, type ReactNode } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

type Phase = "active" | "exiting"

const COUNTER_DURATION = 2400 // ms — counter ticks 0→100
const HOLD_AT_100 = 320       // ms — premium pacing pause
const EXIT_MASK_DURATION = 700
const EXIT_PANEL_DURATION = 1100
const EXIT_PANEL_DELAY = 400  // ms — panel starts after curtain begins (overlap)

// Awwwards-grade cubic-bezier curves
const EASE_ENTER = [0.16, 1, 0.3, 1] as const  // power4.out — settles
const EASE_EXIT = [0.7, 0, 0.84, 0] as const   // power4.in — accelerates out
const EASE_PANEL = [0.65, 0, 0.35, 1] as const // power4.inOut — heavy + smooth

/* ─────────────────────────────────────────────────────────────────
   Mask helper — wraps content in overflow:hidden, slides inner
   element up from 110% on entrance and out to -110% on exit.
   Picks up the parent's animate state via Framer's variant system.
   ───────────────────────────────────────────────────────────────── */
function Mask({
  children,
  entranceDelay = 0,
  exitDelay = 0,
}: {
  children: ReactNode
  entranceDelay?: number
  exitDelay?: number
}) {
  return (
    <span
      className="inline-block overflow-hidden align-bottom"
      style={{ lineHeight: 1 }}
    >
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        variants={{
          active: {
            y: "0%",
            transition: {
              duration: 1.0,
              ease: EASE_ENTER,
              delay: entranceDelay,
            },
          },
          exiting: {
            y: "-110%",
            transition: {
              duration: EXIT_MASK_DURATION / 1000,
              ease: EASE_EXIT,
              delay: exitDelay,
            },
          },
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("active")
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Skip if already shown this session
    try {
      if (sessionStorage.getItem("lv-intro-shown")) {
        setDone(true)
        return
      }
    } catch {
      // sessionStorage unavailable (private mode) — fall through
    }

    // Lock body scroll while intro is visible
    document.body.style.overflow = "hidden"

    // ── Counter: requestAnimationFrame loop, 0 → 100 over COUNTER_DURATION ──
    const start = performance.now()
    let rafId: number
    const tick = () => {
      const elapsed = performance.now() - start
      const pct = Math.min(100, (elapsed / COUNTER_DURATION) * 100)
      setProgress(pct)
      if (pct < 100) {
        rafId = requestAnimationFrame(tick)
      } else {
        // Counter complete → hold briefly → trigger exit
        try {
          sessionStorage.setItem("lv-intro-shown", "1")
        } catch {
          // ignore
        }
        setTimeout(() => setPhase("exiting"), HOLD_AT_100)
        // Total exit window = mask exit + panel exit (with overlap)
        const totalExit = HOLD_AT_100 + EXIT_PANEL_DELAY + EXIT_PANEL_DURATION
        setTimeout(() => setDone(true), totalExit + 50)
      }
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      document.body.style.overflow = ""
    }
  }, [])

  // Restore scroll the moment the exit phase begins so the user can scroll
  // immediately as the panel is sliding up — and as a safety net in case the
  // unmount cleanup above never runs (the component lives in the root layout
  // and persists across page navigations).
  useEffect(() => {
    if (phase === "exiting" || done) {
      document.body.style.overflow = ""
    }
  }, [phase, done])

  // Avoid hydration mismatch — don't render on the server
  if (!mounted) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro-panel"
          // Whole panel slides up off-screen during exit
          animate={{ y: phase === "exiting" ? "-100%" : "0%" }}
          transition={{
            duration: phase === "exiting" ? EXIT_PANEL_DURATION / 1000 : 0,
            ease: EASE_PANEL,
            delay: phase === "exiting" ? EXIT_PANEL_DELAY / 1000 : 0,
          }}
          className="fixed inset-0 overflow-hidden"
          style={{ background: "#0f0e1a", zIndex: 100 }}
        >
          {/* Brand-color ambient blobs */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 18% 28%, rgba(100,206,251,0.18) 0%, transparent 70%), " +
                "radial-gradient(ellipse 50% 50% at 82% 72%, rgba(124,58,237,0.15) 0%, transparent 70%), " +
                "radial-gradient(ellipse 50% 40% at 60% 18%, rgba(167,139,250,0.12) 0%, transparent 60%)",
            }}
          />

          {/* Subtle quantum dot lattice (matches site's global background texture) */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Thin vertical center line — quiet design accent */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-0 bottom-0 w-px"
            style={{
              background: "rgba(255,255,255,0.06)",
              transformOrigin: "top",
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase === "exiting" ? 0 : 1 }}
            transition={{
              duration: phase === "exiting" ? 0.5 : 1.6,
              ease: phase === "exiting" ? EASE_EXIT : EASE_ENTER,
              delay: phase === "exiting" ? 0 : 0.3,
            }}
          />

          {/* ─── Content grid: 4 corners + center ─── */}
          <motion.div
            initial="initial"
            animate={phase}
            className="relative h-full flex flex-col justify-between"
            style={{ padding: "clamp(20px, 3vw, 40px)" }}
          >
            {/* TOP ROW — Logo (left) + Â© (right) */}
            <div className="flex justify-between items-start gap-4">
              <Mask entranceDelay={0} exitDelay={0}>
                <Image
                  src="/leadv-logo-dark.svg"
                  alt="Lead Venture"
                  width={394}
                  height={87}
                  priority
                  className="h-7 w-auto"
                />
              </Mask>
              <Mask entranceDelay={0.08} exitDelay={0.04}>
                <span
                  className="text-[11px] font-medium uppercase"
                  style={{
                    letterSpacing: "0.22em",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  Â© 2026 · 48-Hour Launch
                </span>
              </Mask>
            </div>

            {/* CENTER — Anchoring mini phrase */}
            <div className="self-center text-center">
              <Mask entranceDelay={0.16} exitDelay={0.08}>
                <span
                  className="text-[11px] font-medium uppercase"
                  style={{
                    letterSpacing: "0.4em",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  Your business online in 48 hours
                </span>
              </Mask>
            </div>

            {/* BOTTOM ROW — Counter (left) + Loading label stack (right) */}
            <div className="flex justify-between items-end gap-4">
              <Mask entranceDelay={0.24} exitDelay={0.12}>
                <span
                  className="font-extrabold tabular-nums"
                  style={{
                    fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
                    fontSize: "clamp(6rem, 14vw, 12rem)",
                    lineHeight: 0.82,
                    letterSpacing: "-0.045em",
                    background:
                      "linear-gradient(135deg, #64CEFB 0%, #A78BFA 50%, #7C3AED 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "inline-block",
                  }}
                >
                  {String(Math.floor(progress)).padStart(2, "0")}
                </span>
              </Mask>
              <div className="flex flex-col items-end gap-2 text-right">
                <Mask entranceDelay={0.32} exitDelay={0.16}>
                  <span
                    className="text-[11px] font-medium uppercase"
                    style={{
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    Loading experience
                  </span>
                </Mask>
                <Mask entranceDelay={0.4} exitDelay={0.2}>
                  <span
                    className="text-[11px] font-medium uppercase"
                    style={{
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    v1.0
                  </span>
                </Mask>
              </div>
            </div>
          </motion.div>

          {/* Thin progress bar at the very bottom edge — fills with brand gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div
              className="h-full"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, #64CEFB, #A78BFA, #7C3AED)",
                boxShadow: "0 0 12px rgba(100,206,251,0.5)",
                transition: "width 0.05s linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
