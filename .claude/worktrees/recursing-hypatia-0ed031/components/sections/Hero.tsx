"use client"

import { ArrowRight } from "lucide-react"
import ShinyText from "@/components/ui/ShinyText"

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Gradient overlay for readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col pt-12 pb-12">
        {/* Top intro row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-white/80 text-sm md:text-base">
          <p className="max-w-md leading-relaxed">
            We build high-performance websites for lawyers, insurance agents,
            chiropractors, and dentists — launched in 48 hours and built to win
            on Google, ChatGPT, and every search surface that matters.
          </p>
          <p className="lg:text-right font-medium">
            100+ Practices Online and Growing
          </p>
        </div>

        {/* Center hero */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="uppercase text-white/80 text-xs md:text-sm tracking-tight mb-6">
            Now Booking 48-Hour Builds
          </p>
          <h1
            className="font-medium text-white tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
            style={{ lineHeight: 0.85 }}
          >
            <span className="block">Become</span>
            <ShinyText text="Unmissable." />
          </h1>

          <div className="mt-10 md:mt-14">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/15 text-sm md:text-base font-medium transition-colors"
            >
              Claim My 48-Hour Build
              <ArrowRight
                className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
