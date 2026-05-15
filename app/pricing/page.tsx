import type { Metadata } from "next"
import PageHero from "@/components/layout/PageHero"
import Pricing from "@/components/sections/Pricing"
import Calculator from "@/components/sections/Calculator"
import BookerSection from "@/components/sections/BookerSection"

const title = "Pricing — Transparent Monthly Plans"
const description =
  "Three plans. No long-term contracts. No hidden fees. Start your 48-hour build for as little as $500/mo."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: `${title} | Lead Venture`,
    description,
    url: "/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Lead Venture`,
    description,
  },
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Pay for outcomes, not hours."
        subtitle="Pick the plan that matches your growth stage. Upgrade or cancel anytime — no long-term contracts, no hidden fees."
      />
      <Pricing />
      <Calculator />
      <BookerSection />
    </>
  )
}
