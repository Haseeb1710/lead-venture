import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Lead Venture — Professional websites in 48 hours"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "linear-gradient(135deg, #0f0a1e 0%, #2d1b69 50%, #7c3aed 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 32,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#c4b5fd",
            marginBottom: 24,
          }}
        >
          Lead Venture
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 32,
            maxWidth: "90%",
          }}
        >
          Your business online in 48 hours.
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#e9d5ff",
            maxWidth: "85%",
            lineHeight: 1.3,
          }}
        >
          Professional websites for lawyers, insurance agents, chiropractors & dentists.
        </div>
      </div>
    ),
    { ...size }
  )
}
