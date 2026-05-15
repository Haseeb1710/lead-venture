import type { Metadata } from "next"
import PageHero from "@/components/layout/PageHero"
import AppointmentBooker from "@/components/sections/AppointmentBooker"
import ContactForm from "@/components/sections/ContactForm"

const title = "Contact — Book Your 48-Hour Build Call"
const description =
  "Pick a time on the calendar, share a few details, and we'll confirm your 48-hour build slot within the hour. Or send a quick message — we reply fast."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${title} | Lead Venture`,
    description,
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Lead Venture`,
    description,
  },
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Book a call. Start your 48-hour build."
        subtitle="Pick a date and time that works for you. We'll walk through your goals, confirm your launch slot, and answer everything you want to know before we move."
      />

      {/* Appointment booking — Calendly-style */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentBooker />
        </div>
      </section>

      {/* Or send a message — fallback contact form */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#64CEFB]">
              Or send a quick message
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-3">
              Not ready to pick a time?
            </h2>
            <p className="text-white/65 max-w-xl mx-auto">
              Drop your details and we&apos;ll get back to you within an hour
              during business hours.
            </p>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  )
}
