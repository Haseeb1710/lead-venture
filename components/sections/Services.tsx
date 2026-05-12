"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SERVICES = [
  {
    id: "seo",
    label: "SEO",
    icon: "🔍",
    title: "Search Engine Optimization",
    description:
      "Rank #1 on Google for the searches that matter. We handle technical SEO, content strategy, and local maps so your phone rings consistently.",
    features: [
      "Google Business Profile optimization",
      "Local keyword domination",
      "Technical site audits & fixes",
    ],
  },
  {
    id: "aeo",
    label: "AEO",
    icon: "💡",
    title: "Answer Engine Optimization",
    description:
      "When people ask Google a question, we make sure your business is the answer. Featured snippets, People Also Ask, and voice search — all covered.",
    features: [
      "Featured snippet targeting",
      "People Also Ask optimization",
      "Voice search readiness",
    ],
  },
  {
    id: "geo",
    label: "GEO",
    icon: "🤖",
    title: "Generative Engine Optimization",
    description:
      "Optimizing your brand for Gemini, ChatGPT, and Perplexity. When AI answers a question about your profession, your name comes up.",
    features: [
      "AI citation building",
      "Structured data markup",
      "Brand entity optimization",
    ],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#f8f7ff]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0f0a1e] mb-4">
            One Platform. Three Unfair Advantages.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            While your competitors rely on yesterday's SEO, you'll dominate everywhere clients
            search — including AI.
          </p>
        </div>

        <Tabs defaultValue="seo">
          <TabsList className="w-full mb-8 bg-violet-50 p-1 rounded-xl border border-violet-100 h-auto">
            {SERVICES.map((s) => (
              <TabsTrigger
                key={s.id}
                value={s.id}
                className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:text-violet-700 data-[state=active]:shadow-sm rounded-lg font-semibold text-gray-600 transition-all"
              >
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {SERVICES.map((s) => (
            <TabsContent key={s.id} value={s.id}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-violet-100 p-10"
              >
                <div className="text-5xl mb-6">{s.icon}</div>
                <h3 className="text-2xl font-bold text-[#0f0a1e] mb-4">{s.title}</h3>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">{s.description}</p>
                <ul className="space-y-4">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-gray-700">
                      <span className="w-6 h-6 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
