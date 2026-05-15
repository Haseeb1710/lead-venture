import type { Metadata } from "next"
import PageHero from "@/components/layout/PageHero"
import FAQ from "@/components/sections/FAQ"
import BookerSection from "@/components/sections/BookerSection"

const title = "FAQ — Common Questions"
const description =
  "Everything you need to know about our 48-hour build, our optimization stack, contracts, and the AI Receptionist."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `${title} | Lead Venture`,
    description,
    url: "/faq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Lead Venture`,
    description,
  },
}

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Answers before you ask."
        subtitle="Common questions about timelines, what's included, contracts, and how the AI Receptionist works."
      />
      <FAQ />
      <BookerSection />
    </>
  )
}
