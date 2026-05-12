import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQS = [
  {
    q: "How does the 48-hour turnaround actually work?",
    a: "Once payment is confirmed, you'll receive an asset upload link within 1 hour. As soon as you submit your logo, photos, and copy, our team begins building immediately. Most sites are live within 48 hours of receiving all assets.",
  },
  {
    q: "What's included in the website build?",
    a: "Every website includes a professionally designed multi-page site, mobile responsiveness, fast loading speeds, on-page SEO, contact forms, and Google Analytics setup. Higher tiers add advanced optimization layers.",
  },
  {
    q: "What is GEO and why does it matter?",
    a: "Generative Engine Optimization (GEO) is the practice of making your business show up when AI tools like ChatGPT, Google Gemini, and Perplexity answer questions. As more people use AI to find local services, GEO is becoming as important as traditional SEO.",
  },
  {
    q: "Are there long-term contracts?",
    a: "No. All plans are month-to-month. You can cancel at any time with 30 days notice. We earn your business every month.",
  },
  {
    q: "How many revision rounds do I get?",
    a: "Accelerator includes 1 revision round, Authority includes 3, and Market Leader includes unlimited revisions for the life of your subscription.",
  },
  {
    q: "How does the AI Receptionist work?",
    a: "Aria is trained on your practice's services, FAQs, and booking system. She answers calls 24/7, qualifies leads with a scripted flow, and books appointments directly into your calendar — with zero hold time for your clients.",
  },
  {
    q: "What if I already have a website?",
    a: "We can migrate your existing content to a new, optimized site or start fresh. Either way, you'll go live within 48 hours without losing your current search rankings.",
  },
]

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[#0f0e1a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
            Everything you need to know before you start
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl px-6 transition-colors"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <AccordionTrigger
                className="text-left font-semibold text-white hover:no-underline py-5 hover:text-[#a5b4fc] transition-colors"
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed pb-5" style={{ color: "rgba(255,255,255,0.58)" }}>
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
