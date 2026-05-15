import type { MetadataRoute } from "next"
import { SITE_URL } from "./layout"

const ROUTES: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.95 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
