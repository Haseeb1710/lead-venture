import type { Metadata } from "next"
import PageHero from "@/components/layout/PageHero"
import Services from "@/components/sections/Services"
import AIDemoCard from "@/components/sections/AIDemoCard"
import BookerSection from "@/components/sections/BookerSection"

const title = "Services — SEO, AEO, GEO & AI Receptionist"
const description =
  "Full-stack search visibility for lawyers, insurance agents, chiropractors, and dentists. SEO + AEO + GEO + AI Receptionist — built to convert."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${title} | Lead Venture`,
    description,
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Lead Venture`,
    description,
  },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Search visibility that actually rings the phone."
        subtitle="Four services. One platform. We rank you on Google, win the featured snippet, get cited by AI assistants, and answer every call — so you never miss a lead."
      />
      <Services />
      <AIDemoCard />
      <BookerSection />
    </>
  )
}
