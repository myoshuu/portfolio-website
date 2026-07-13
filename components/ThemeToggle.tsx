"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

import { createPortal } from "react-dom"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [curtainColor, setCurtainColor] = React.useState("")

  React.useEffect(() => {
    // Small delay to ensure no sync state updates during mount
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, [])

  const toggleTheme = () => {
    if (isAnimating) return;

    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

    // Precise HEX matches for your OKLCH backgrounds
    const nextColor = nextTheme === "dark" ? "#0d131f" : "#ffffff";

    setCurtainColor(nextColor);
    setIsAnimating(true);

    // Switch theme exactly when the "liquid" center of the wipe passes through
    setTimeout(() => {
      setTheme(nextTheme);
    }, 400);

    // Reset after the full sweep
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 shrink-0" />
    )
  }

  return (
    <>
      {isAnimating && createPortal(
        <motion.div
          key="liquid-wipe"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            position: "fixed",
            inset: 0,
            width: "150vw", // Wider than screen for a smoother gradient sweep
            left: "-25vw",
            zIndex: -15, // Between base background and dots
            background: `linear-gradient(to right, transparent, ${curtainColor} 15%, ${curtainColor} 85%, transparent)`,
            pointerEvents: "none",
          }}
        />,
        document.body
      )}

      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-8 h-8 rounded-full text-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer outline-none shrink-0"
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </button>
    </>
  )
}
