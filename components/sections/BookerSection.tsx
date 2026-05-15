import AppointmentBooker from "@/components/sections/AppointmentBooker"

/**
 * Bottom-of-page CTA section that wraps the AppointmentBooker with a
 * heading + subtitle. Shared across the homepage and every subpage so
 * the booking flow is always one scroll away.
 */
export default function BookerSection() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#64CEFB]">
            Start your 48-hour build
          </span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-4">
            Book your slot in 60 seconds.
          </h2>
          <p className="text-white/65 max-w-xl mx-auto">
            Pick a date, pick a time, drop your details — we&apos;ll confirm
            within the hour.
          </p>
        </div>
        <AppointmentBooker />
      </div>
    </section>
  )
}
