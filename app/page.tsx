import Hero from "@/components/sections/Hero"
import MotionMarquee from "@/components/sections/MotionMarquee"
import StockTicker from "@/components/sections/StockTicker"
import Services from "@/components/sections/Services"
import IndustryHub from "@/components/sections/IndustryHub"
import AIDemoCard from "@/components/sections/AIDemoCard"
import Calculator from "@/components/sections/Calculator"
import Pricing from "@/components/sections/Pricing"
import Reviews from "@/components/sections/Reviews"
import FAQ from "@/components/sections/FAQ"
import BookerSection from "@/components/sections/BookerSection"

export default function Home() {
  return (
    <>
      <Hero />
      <MotionMarquee />
      <StockTicker />
      <Services />
      <IndustryHub />
      <AIDemoCard />
      <Calculator />
      <Pricing />
      <Reviews />
      <FAQ />
      <BookerSection />
    </>
  )
}
