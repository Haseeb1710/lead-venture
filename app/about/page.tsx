import type { Metadata } from "next"
import PageHero from "@/components/layout/PageHero"
import AboutContent from "@/components/sections/AboutContent"
import BookerSection from "@/components/sections/BookerSection"

const title = "About — Built for Professionals"
const description =
  "Lead Venture builds high-conversion websites and search visibility for high-trust local businesses. Here's who we are, why we move in 48 hours, and what we believe."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${title} | Lead Venture`,
    description,
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Lead Venture`,
    description,
  },
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="The marketing team your competitors wish they hired first."
        subtitle="We build websites and search visibility for high-trust local businesses — lawyers, insurance agents, chiropractors, and dentists. No agency theatre. Just results, in 48 hours."
      />
      <AboutContent />
      <BookerSection />
    </>
  )
}
