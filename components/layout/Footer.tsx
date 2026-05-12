export default function Footer() {
  return (
    <footer style={{ background: "#05040a" }} className="text-white">
      {/* Traxy-inspired gradient divider */}
      <div
        className="h-px"
        style={{ background: "linear-gradient(90deg, #6A91FF 0%, #7C3AED 40%, #B59ADB 70%, #FFA7B3 100%)" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div
              className="text-xl font-bold mb-3"
              style={{
                background: "linear-gradient(135deg, #6A91FF 0%, #a78bfa 50%, #FFA7B3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Lead Venture
            </div>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
              Professional business websites launched in 48 hours. Your brand everywhere forever.
            </p>
          </div>
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "rgba(165,180,252,0.6)" }}
            >
              Services
            </h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              {[
                { label: "SEO", href: "#services" },
                { label: "AEO", href: "#services" },
                { label: "GEO", href: "#services" },
                { label: "AI Receptionist", href: "#ai-demo" },
                { label: "Social Management", href: "#services" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "rgba(165,180,252,0.6)" }}
            >
              Company
            </h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              {[
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="mt-12 pt-6 text-center text-sm"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          © 2026 Lead Venture. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
