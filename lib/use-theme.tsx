"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  toggle: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/**
 * Provides a single shared theme state for the entire app. The inline script
 * in layout.tsx applies the .dark class on <html> before hydration; this
 * provider reads that initial state and exposes a toggle that all consumers
 * subscribe to via context.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "dark" : "light")
    setMounted(true)
  }, [])

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light"
    setTheme(next)
    document.documentElement.classList.toggle("dark", next === "dark")
    try {
      localStorage.setItem("theme", next)
    } catch {
      // ignore (private mode etc.)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    // Fallback for any consumer rendered outside the provider — assume light.
    return { theme: "light", toggle: () => {}, mounted: false }
  }
  return ctx
}
