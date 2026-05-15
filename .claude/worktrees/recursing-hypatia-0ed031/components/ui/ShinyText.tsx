"use client"

import { motion } from "framer-motion"

type ShinyTextProps = {
  text: string
  speed?: number
  baseColor?: string
  shineColor?: string
  spread?: number
  className?: string
}

export default function ShinyText({
  text,
  speed = 3,
  baseColor = "#64CEFB",
  shineColor = "#ffffff",
  spread = 100,
  className = "",
}: ShinyTextProps) {
  const gradient = `linear-gradient(${spread}deg, ${baseColor} 0%, ${shineColor} 50%, ${baseColor} 100%)`

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
      transition={{
        duration: speed,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {text}
    </motion.span>
  )
}
