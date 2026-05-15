"use client"

import { motion } from "framer-motion"

interface ShinyTextProps {
  text: string
  baseColor?: string
  shineColor?: string
  speed?: number
  spread?: number
  className?: string
}

export default function ShinyText({
  text,
  baseColor = "#64CEFB",
  shineColor = "#ffffff",
  speed = 3,
  spread = 100,
  className = "",
}: ShinyTextProps) {
  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${baseColor} 0%, ${baseColor} 35%, ${shineColor} 50%, ${baseColor} 65%, ${baseColor} 100%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      animate={{
        backgroundPosition: ["200% 0%", "-200% 0%"],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  )
}
