"use client"

import { useEffect, useRef } from "react"

// First 11 GIFs — Row 1 (scrolls right as the page scrolls down)
const ROW_1 = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
] as const

// Remaining 10 GIFs — Row 2 (scrolls left as the page scrolls down)
const ROW_2 = [
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
] as const

// Triple the array so the row has enough width for seamless side-to-side travel.
const triple = <T,>(arr: readonly T[]): T[] => [...arr, ...arr, ...arr]

export default function MotionMarquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let frame = 0

    const update = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top
      // Spec: (scrollY - sectionTop + innerHeight) * 0.3
      const offset =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const t = offset - 200
      if (row1Ref.current) {
        row1Ref.current.style.transform = `translate3d(${t}px,0,0)`
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translate3d(${-t}px,0,0)`
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    // Initial position
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const row1Tiles = triple(ROW_1)
  const row2Tiles = triple(ROW_2)

  return (
    <section
      ref={sectionRef}
      aria-label="Motion design showcase"
      className="relative overflow-hidden pt-24 sm:pt-32 md:pt-40 pb-10"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 — scrolls RIGHT */}
        <div
          ref={row1Ref}
          className="flex gap-3"
          style={{ willChange: "transform" }}
        >
          {row1Tiles.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`r1-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className="rounded-2xl object-cover shrink-0"
              style={{ width: 420, height: 270 }}
            />
          ))}
        </div>

        {/* Row 2 — scrolls LEFT */}
        <div
          ref={row2Ref}
          className="flex gap-3"
          style={{ willChange: "transform" }}
        >
          {row2Tiles.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`r2-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className="rounded-2xl object-cover shrink-0"
              style={{ width: 420, height: 270 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
