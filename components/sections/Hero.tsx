"use client"

import { ArrowRight } from "lucide-react"
import ShinyText from "@/components/ui/ShinyText"

const STEPS = [
  {
    title: "Submit Your Brief",
    copy: "Tell us about your business in 5 minutes — no long forms or sales calls.",
  },
  {
    title: "Upload Your Assets",
    copy: "Logo, photos, and copy. We handle the design, build, and optimization.",
  },
  {
    title: "AI Training & SEO",
    copy: "Aria learns your services. We optimize for Google, ChatGPT, and Gemini.",
  },
  {
    title: "Go Live in 48 Hours",
    copy: "Your site launches, ranks, and starts converting — guaranteed.",
  },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Looping video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      {/* Foreground */}
      <div className="relative z-10 min-h-screen flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Center stack */}
        <div className="flex-1 flex flex-col items-center justify-center text-center pt-28 pb-16">
          {/* Pill badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm text-white/85 border border-white/15 bg-white/[0.06] backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#64CEFB] shadow-[0_0_8px_#64CEFB]" />
            48-Hour Launch Guarantee
          </span>

          {/* Headline */}
          <h1
            className="font-bold text-white tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] max-w-5xl"
            style={{ lineHeight: 0.95 }}
          >
            <span className="block">Become The</span>
            <ShinyText text="Market Leader." />
          </h1>

          {/* Subtitle */}
          <p className="mt-7 max-w-xl text-white/75 text-base md:text-lg leading-relaxed">
            We build high-conversion websites for lawyers, dentists, chiropractors,
            and insurance agents — launched in 48 hours and optimized for every
            place clients search.
          </p>

          {/* CTA — white pill, dark text */}
          <a
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#0a0a1a] rounded-full px-7 md:px-9 py-3.5 md:py-4 transition-colors group font-semibold text-sm md:text-base shadow-[0_10px_40px_rgba(255,255,255,0.18)]"
          >
            Start 48-Hour Build
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* 4-column numbered features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 pb-12">
          {STEPS.map((step, i) => (
            <div key={step.title} className="text-left">
              <h3 className="text-white font-semibold text-sm md:text-base mb-2">
                <span className="text-white/55 font-normal mr-1.5">
                  {i + 1}.
                </span>
                {step.title}
              </h3>
              <p className="text-white/55 text-xs md:text-sm leading-relaxed max-w-[18rem]">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
