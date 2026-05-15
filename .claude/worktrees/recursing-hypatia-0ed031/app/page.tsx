import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import LaunchTracker from "@/components/sections/LaunchTracker"
import IndustryHub from "@/components/sections/IndustryHub"
import AIDemoCard from "@/components/sections/AIDemoCard"
import Services from "@/components/sections/Services"
import Calculator from "@/components/sections/Calculator"
import Pricing from "@/components/sections/Pricing"
import FAQ from "@/components/sections/FAQ"
import ContactForm from "@/components/sections/ContactForm"

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <LaunchTracker />
        <IndustryHub />
        <AIDemoCard />
        <Services />
        <Calculator />
        <Pricing />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
