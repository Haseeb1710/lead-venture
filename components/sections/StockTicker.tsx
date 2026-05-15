"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/lib/use-theme"

type Logo = {
  name: string
  vertical: "Law" | "Insurance" | "Dental" | "Chiro"
  // Visual style of the wordmark
  style: React.CSSProperties
  prefix?: string
}

// Fictional clients styled as distinct wordmarks. Each row mixes weight,
// case, tracking, and italics to feel like a real logo grid.
const LOGOS: Logo[] = [
  {
    name: "Hartwell & Burke",
    vertical: "Law",
    style: { fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontWeight: 500, letterSpacing: "-0.01em" },
  },
  {
    name: "STERLING INSURANCE",
    vertical: "Insurance",
    style: { fontWeight: 800, letterSpacing: "0.18em", fontSize: "1.4rem" },
  },
  {
    name: "Northstar Dental",
    vertical: "Dental",
    prefix: "✦",
    style: { fontWeight: 600, letterSpacing: "-0.02em" },
  },
  {
    name: "APEX Spine + Sports",
    vertical: "Chiro",
    style: { fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" },
  },
  {
    name: "Goldberg Law Group",
    vertical: "Law",
    style: { fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 600, letterSpacing: "0.05em" },
  },
  {
    name: "Sentinel Insurance Co.",
    vertical: "Insurance",
    prefix: "◆",
    style: { fontWeight: 500, letterSpacing: "-0.01em" },
  },
  {
    name: "Bright Smile Dentistry",
    vertical: "Dental",
    style: { fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.02em" },
  },
  {
    name: "PINNACLE CHIROPRACTIC",
    vertical: "Chiro",
    style: { fontWeight: 800, letterSpacing: "0.20em", fontSize: "1.3rem" },
  },
  {
    name: "Weatherspoon & Vega LLP",
    vertical: "Law",
    style: { fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontWeight: 500 },
  },
  {
    name: "MainStreet Insurance",
    vertical: "Insurance",
    style: { fontWeight: 800, letterSpacing: "-0.025em" },
  },
]

export default function StockTicker() {
  const { theme, mounted } = useTheme()
  const isDark = mounted && theme === "dark"

  const shard1Ref = useRef<HTMLDivElement>(null)
  const shard2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 50
      const y = (window.innerHeight / 2 - e.pageY) / 50
      if (shard1Ref.current) {
        shard1Ref.current.style.transform = `translate(${x}px, ${y}px) rotate(-15deg)`
      }
      if (shard2Ref.current) {
        shard2Ref.current.style.transform = `translate(${x}px, ${y}px) rotate(10deg)`
      }
    }
    document.addEventListener("mousemove", onMouseMove)
    return () => document.removeEventListener("mousemove", onMouseMove)
  }, [])

  // Theme-aware palette derived from the site's brand gradient
  const textColor = isDark ? "#e0e6ed" : "#0f0a1e"
  const labelColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(15,10,30,0.45)"
  const verticalLabelColor = isDark ? "rgba(255,255,255,0.40)" : "rgba(15,10,30,0.42)"
  const glassBase = isDark
    ? "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.02) 100%)"
    : "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.52) 100%)"
  const glassBorder = isDark
    ? "rgba(255,255,255,0.10)"
    : "rgba(255,255,255,0.55)"
  // Inner gradient glow uses the brand palette (replacing cyan/magenta)
  const innerGlow =
    "linear-gradient(90deg, transparent, rgba(100,206,251,0.10) 20%, rgba(167,139,250,0.10) 50%, rgba(124,58,237,0.10) 80%, transparent)"
  // Brand-tinted "spectral edge" instead of the RGB chromatic line
  const spectralEdge =
    "linear-gradient(90deg, #64CEFB, #A78BFA, #7C3AED)"
  const shardBg = isDark
    ? "linear-gradient(135deg, rgba(255,255,255,0.10), transparent)"
    : "linear-gradient(135deg, rgba(15,10,30,0.06), transparent)"

  const renderItem = (logo: Logo, key: string, index: number) => (
    <div
      className="stock-item flex items-center px-12 cursor-pointer logo-bob"
      key={key}
      style={{ animationDelay: `${(index % LOGOS.length) * 0.35}s` }}
    >
      <div className="flex flex-col items-start gap-1">
        <span
          className="whitespace-nowrap"
          style={{
            fontSize: logo.style.fontSize ?? "1.6rem",
            color: textColor,
            ...logo.style,
          }}
        >
          {logo.prefix && (
            <span
              style={{
                marginRight: 10,
                background: "linear-gradient(135deg, #64CEFB, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {logo.prefix}
            </span>
          )}
          {logo.name}
        </span>
        <span
          className="text-[10px] uppercase font-mono"
          style={{
            color: verticalLabelColor,
            letterSpacing: "0.25em",
          }}
        >
          {logo.vertical}
        </span>
      </div>
    </div>
  )

  return (
    <section
      className="relative overflow-hidden py-24 flex flex-col items-center justify-center w-full"
      style={{ color: textColor }}
    >
      {/* Parallax shards */}
      <div
        ref={shard1Ref}
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: 300,
          height: 1,
          top: "10%",
          left: "5%",
          transform: "rotate(-15deg)",
          background: shardBg,
          backdropFilter: "blur(10px)",
          border: `1px solid ${glassBorder}`,
          zIndex: 0,
          transition: "transform 0.3s ease-out",
        }}
      />
      <div
        ref={shard2Ref}
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: 1,
          height: 400,
          bottom: "-10%",
          right: "15%",
          transform: "rotate(10deg)",
          background: shardBg,
          backdropFilter: "blur(10px)",
          border: `1px solid ${glassBorder}`,
          zIndex: 0,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Section heading */}
      <div className="text-center mb-12 px-6 relative z-10">
        <p
          className="mb-3"
          style={{
            fontSize: 10,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            opacity: 0.55,
            fontWeight: 500,
            color: labelColor,
          }}
        >
          Trusted Partners // Live Roster
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0f0a1e] dark:text-white">
          Practices we&apos;ve already launched
        </h2>
      </div>

      {/* Full-width edge-to-edge refractive lens */}
      <div className="relative w-screen">
        {/* Refractive lens — glass ticker track */}
        <div
          className="refractive-lens relative h-[140px] flex items-center overflow-hidden"
          style={{
            background: glassBase,
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            borderTop: `1px solid ${glassBorder}`,
            borderBottom: `1px solid ${glassBorder}`,
            maskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          {/* Inner gradient glow — brand palette */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: innerGlow }}
          />

          {/* Sweeping highlight — a soft brand-tinted bar drifts across the lens */}
          <div
            aria-hidden
            className="lens-sweep absolute inset-y-0 pointer-events-none"
            style={{
              width: "32%",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(100,206,251,0.18) 30%, rgba(167,139,250,0.22) 50%, rgba(124,58,237,0.18) 70%, transparent 100%)",
              filter: "blur(8px)",
              mixBlendMode: "screen",
            }}
          />

          {/* Spectral edge — brand gradient instead of RGB chromatic line */}
          <div
            aria-hidden
            className="absolute top-0 left-0 w-full"
            style={{
              height: 1,
              background: spectralEdge,
              opacity: 0.55,
            }}
          />
          <div
            aria-hidden
            className="absolute bottom-0 left-0 w-full"
            style={{
              height: 1,
              background: spectralEdge,
              opacity: 0.35,
            }}
          />

          {/* Ticker — duplicate for seamless loop */}
          <div className="ticker-wrap flex whitespace-nowrap">
            {LOGOS.map((l, i) => renderItem(l, `a-${i}`, i))}
            {LOGOS.map((l, i) => renderItem(l, `b-${i}`, i))}
          </div>
        </div>
      </div>

      {/* Status row */}
      <div
        className="mt-10 flex flex-wrap justify-center gap-5 relative z-10"
        style={{
          fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          color: labelColor,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
        }}
      >
        <div className="flex items-center">
          <span
            className="market-pulse-dot inline-block w-1.5 h-1.5 rounded-full mr-2"
            style={{
              background: "#64CEFB",
              boxShadow: "0 0 10px #64CEFB",
            }}
          />
          500+ Practices Launched
        </div>
        <div>48h Avg. Build</div>
        <div>12 States</div>
      </div>
    </section>
  )
}
