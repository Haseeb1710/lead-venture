"use client"

import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/lib/use-theme"

export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10 text-[#0f0a1e] dark:text-white"
    >
      {/* Avoid hydration mismatch: only render the icon after mount */}
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="inline-flex"
          >
            {theme === "light" ? (
              <Moon size={17} strokeWidth={2} />
            ) : (
              <Sun size={17} strokeWidth={2} />
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
