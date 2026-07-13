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
  const [portalTargets, setPortalTargets] = React.useState<Element[]>([])

  React.useEffect(() => {
    // Small delay to ensure no sync state updates during mount
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, [])

  const toggleTheme = () => {
    if (isAnimating) return;

    // Get all page-level targets to apply the local stacking context sweep
    const targets = Array.from(document.querySelectorAll(".theme-wipe-target"));
    setPortalTargets(targets);

    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

    // Precise HEX matches for your OKLCH backgrounds
    const nextColor = nextTheme === "dark" ? "#1a1e26" : "#ffffff";

    setCurtainColor(nextColor);
    setIsAnimating(true);

    // Switch theme exactly when the \"liquid\" center of the wipe passes through
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
      {isAnimating && portalTargets.map((target, idx) => 
        createPortal(
          <motion.div
            key={`wipe-${idx}`}
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              inset: 0,
              width: "150vw", // Wider than screen for a smoother gradient sweep
              left: "-25vw",
              background: `linear-gradient(to right, transparent, ${curtainColor} 15%, ${curtainColor} 85%, transparent)`,
              pointerEvents: "none",
            }}
          />,
          target
        )
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
