'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Work', href: '#' },
  { label: 'Blog', href: '#' },
];

export default function Navbar() {
  const [isHovered, setIsHovering] = useState(false);
  const [hasSeenGreeting, setHasSeenGreeting] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Show greeting for 3 seconds then transition to menu
    const timer = setTimeout(() => {
      setHasSeenGreeting(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const showMenu = hasSeenGreeting || isHovered;

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100000] max-w-[95vw]">
      <motion.div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        layout
        className="flex items-center p-1.5 pr-2.5 rounded-full bg-background/40 border border-foreground/7 backdrop-blur-2xl cursor-default min-h-[48px] relative overflow-hidden gap-1.5"
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 35,
          layout: { duration: 0.3 }
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!showMenu ? (
            <motion.div
              key="greeting"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 px-4 min-w-[170px] justify-center"
            >
              <div className="w-6 h-6 flex items-center justify-center rounded-[4px] bg-gradient-to-br from-orange-400 to-red-500 shadow-inner shrink-0">
                 <span className="text-[10px] filter drop-shadow-sm">☀️</span>
              </div>
              <span className="text-sm font-medium whitespace-nowrap tracking-tight">{greeting}</span>
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-0.5 sm:gap-1 px-1"
            >
              <a href="#" className="px-3 sm:px-5 py-2 rounded-full bg-foreground/10 text-xs sm:text-sm font-medium hover:bg-foreground/20 transition-all whitespace-nowrap">
                Home
              </a>

              {NAV_LINKS.slice(1).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium opacity-60 hover:opacity-100 hover:bg-foreground/5 transition-all whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="w-[1px] h-4 bg-foreground/10 shrink-0 self-center" />
        <ThemeToggle />
      </motion.div>
    </nav>
  );
}
