import type { NextConfig } from "next"

const allowedOriginsEnv = process.env.SERVER_ACTIONS_ALLOWED_ORIGINS ?? ""
const allowedOrigins = allowedOriginsEnv
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
      ...(allowedOrigins.length > 0 ? { allowedOrigins } : {}),
    },
  },

  images: {
    // Add external image hosts here when needed, e.g. for client testimonial photos.
    remotePatterns: [],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
