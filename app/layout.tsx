import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Lead Venture — Professional Business Websites in 48 Hours",
  description:
    "We build high-performance websites for lawyers, insurance agents, chiropractors, and dentists — launched in 48 hours. AEO, SEO, GEO, and AI Receptionist services.",
  keywords:
    "website design, 48 hour website, lawyer website, dentist website, chiropractor website, insurance agent website, AEO, SEO, GEO",
  openGraph: {
    title: "Lead Venture — Your Business Online in 48 Hours",
    description:
      "Professional websites for lawyers, insurance agents, chiropractors & dentists. Launched in 48 hours.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jakarta.variable} font-jakarta antialiased bg-[#08070f]`}>
        {children}
      </body>
    </html>
  )
}
