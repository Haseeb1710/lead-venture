export default function Footer() {
  return (
    <footer className="bg-[#1a0533] text-white">
      <div className="h-1 bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-3">
              Lead Venture
            </div>
            <p className="text-sm text-violet-200/60 max-w-xs leading-relaxed">
              Professional business websites launched in 48 hours. Your brand everywhere forever.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-violet-300 uppercase tracking-widest mb-5">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-violet-200/60">
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
            <h4 className="text-xs font-semibold text-violet-300 uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-violet-200/60">
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
        <div className="border-t border-violet-900/60 mt-12 pt-6 text-center text-sm text-violet-200/40">
          © 2026 Lead Venture. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
