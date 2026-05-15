import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AnimatedBackground from "@/components/layout/AnimatedBackground"
import LoadingScreen from "@/components/layout/LoadingScreen"
import { ThemeProvider } from "@/lib/use-theme"

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

// Canonical site URL — drives metadataBase, sitemap, robots, OG/Twitter, canonical, JSON-LD.
// Override in production via NEXT_PUBLIC_SITE_URL env var if the host changes.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://leadventure.io"
).replace(/\/$/, "")

const TITLE = "Lead Venture — Professional Business Websites in 48 Hours"
const DESCRIPTION =
  "Conversion-optimized websites for lawyers, insurance agents, chiropractors, and dentists — launched in 48 hours, with built-in SEO, AEO, GEO, and AI receptionist services."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Lead Venture",
  },
  description: DESCRIPTION,
  applicationName: "Lead Venture",
  authors: [{ name: "Lead Venture" }],
  generator: "Next.js",
  keywords: [
    "48 hour website",
    "lawyer website design",
    "dentist website design",
    "chiropractor website design",
    "insurance agent website",
    "local SEO",
    "AEO",
    "GEO",
    "generative engine optimization",
    "AI receptionist",
    "Google Business Profile",
    "ChatGPT SEO",
    "Perplexity SEO",
  ],
  category: "business",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Lead Venture",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lead Venture — Your business online in 48 hours.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@leadventure",
    creator: "@leadventure",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/leadv-logo-dark.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    // Add platform verification tokens here once available.
    // google: "TODO-google-search-console-token",
    // other: { "msvalidate.01": "TODO-bing-webmaster-token" },
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
}

// JSON-LD for Organization + WebSite — picked up by Google for sitelinks search
// box, knowledge panel hints, and entity recognition across AI search engines.
const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lead Venture",
  url: SITE_URL,
  logo: `${SITE_URL}/leadv-logo-full.png`,
  description: DESCRIPTION,
  sameAs: [
    "https://twitter.com/leadventure",
    "https://www.linkedin.com/company/leadventure",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "sales",
      email: "hello@leadventure.io",
      areaServed: "US",
      availableLanguage: ["English"],
    },
  ],
}

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Lead Venture",
  url: SITE_URL,
  publisher: { "@type": "Organization", name: "Lead Venture" },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}

// Dark mode only — light mode has been removed. Force .dark on every load
// and clear any stale 'light' preference left in localStorage.
const themeInit = `(function(){try{localStorage.setItem('theme','dark');}catch(e){}document.documentElement.classList.add('dark');})();`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* Organization + WebSite JSON-LD (entity definition for Google + AI search) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jakarta.variable} antialiased`}
        style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
      >
        <ThemeProvider>
          <LoadingScreen />
          <AnimatedBackground />
          <Navbar />
          <main className="relative" style={{ zIndex: 10 }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
