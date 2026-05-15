import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://leadventure.example"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lead Venture — Professional Business Websites in 48 Hours",
    template: "%s | Lead Venture",
  },
  description:
    "We build high-performance websites for lawyers, insurance agents, chiropractors, and dentists — launched in 48 hours. AEO, SEO, GEO, and AI Receptionist services.",
  keywords: [
    "website design",
    "48 hour website",
    "lawyer website",
    "dentist website",
    "chiropractor website",
    "insurance agent website",
    "AEO",
    "SEO",
    "GEO",
    "AI receptionist",
  ],
  authors: [{ name: "Lead Venture" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Lead Venture",
    title: "Lead Venture — Your Business Online in 48 Hours",
    description:
      "Professional websites for lawyers, insurance agents, chiropractors & dentists. Launched in 48 hours.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead Venture — Your Business Online in 48 Hours",
    description:
      "Professional websites for lawyers, insurance agents, chiropractors & dentists. Launched in 48 hours.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: "#7C3AED",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#f8f7ff]`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-violet-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
