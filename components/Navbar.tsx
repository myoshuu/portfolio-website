'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS_EN = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about-section' },
  { label: 'Work', href: '#work-section' },
  { label: 'Journal', href: '#blog-section' },
];

const NAV_LINKS_ID = [
  { label: 'Beranda', href: '#' },
  { label: 'Tentang', href: '#about-section' },
  { label: 'Karya', href: '#work-section' },
  { label: 'Jurnal', href: '#blog-section' },
];

export default function Navbar() {
  const [isHovered, setIsHovering] = useState(false);
  const [hasSeenGreeting, setHasSeenGreeting] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lang, setLang] = useState<'EN' | 'ID'>('EN');
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleLangEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      setLang(customEvent.detail.lang);
    };
    window.addEventListener('language-change', handleLangEvent);
    return () => window.removeEventListener('language-change', handleLangEvent);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const hour = new Date().getHours();
    if (lang === 'EN') {
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    } else {
      if (hour < 11) setGreeting('Selamat Pagi');
      else if (hour < 15) setGreeting('Selamat Siang');
      else if (hour < 18) setGreeting('Selamat Sore');
      else setGreeting('Selamat Malam');
    }

    const timer = setTimeout(() => {
      setHasSeenGreeting(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [mounted, lang]);

  useEffect(() => {
    if (!mounted) return;

    let observer: IntersectionObserver | undefined;
    let aboutSec: HTMLElement | null = null;
    let workSec: HTMLElement | null = null;
    let blogSec: HTMLElement | null = null;

    const setupObserver = () => {
      const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        if (isScrollingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'about-section') {
              setActiveIndex(1);
            } else if (entry.target.id === 'work-section') {
              setActiveIndex(2);
            } else if (entry.target.id === 'blog-section') {
              setActiveIndex(3);
            }
          } else {
            const about = document.getElementById('about-section');
            if (about) {
              const aboutRect = about.getBoundingClientRect();
              if (aboutRect.top > window.innerHeight / 2) {
                setActiveIndex(0);
              }
            }
          }
        });
      };

      observer = new IntersectionObserver(observerCallback, observerOptions);
      aboutSec = document.getElementById('about-section');
      workSec = document.getElementById('work-section');
      blogSec = document.getElementById('blog-section');

      if (aboutSec) observer.observe(aboutSec);
      if (workSec) observer.observe(workSec);
      if (blogSec) observer.observe(blogSec);
    };

    const timer = setTimeout(() => {
      setupObserver();
    }, 400);

    return () => {
      clearTimeout(timer);
      if (observer) {
        if (aboutSec) observer.unobserve(aboutSec);
        if (workSec) observer.unobserve(workSec);
        if (blogSec) observer.unobserve(blogSec);
      }
    };
  }, [mounted]);

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
              {(lang === 'EN' ? NAV_LINKS_EN : NAV_LINKS_ID).map((link, idx) => {
                const isActive = activeIndex === idx;
                const linkHref = link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (linkHref === '#') {
                        e.preventDefault();
                        isScrollingRef.current = true;
                        window.dispatchEvent(new CustomEvent('programmatic-scroll', { detail: { active: true, targetIdx: 0 } }));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setActiveIndex(0);
                        setTimeout(() => {
                          isScrollingRef.current = false;
                          window.dispatchEvent(new CustomEvent('programmatic-scroll', { detail: { active: false } }));
                        }, 1000);
                      } else if (linkHref.startsWith('#')) {
                        e.preventDefault();
                        const el = document.querySelector(linkHref);
                        if (el) {
                          isScrollingRef.current = true;
                          const targetIdx = linkHref === '#blog-section' ? 4 : 0;
                          window.dispatchEvent(new CustomEvent('programmatic-scroll', { detail: { active: true, targetIdx } }));
                          const targetTop = window.scrollY + el.getBoundingClientRect().top;
                          window.scrollTo({ top: targetTop, behavior: 'smooth' });
                          setActiveIndex(idx);
                          setTimeout(() => {
                            isScrollingRef.current = false;
                            window.dispatchEvent(new CustomEvent('programmatic-scroll', { detail: { active: false } }));
                          }, 1000);
                        }
                      }
                    }}
                    className={`relative px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap outline-none ${
                      isActive ? 'text-foreground' : 'text-foreground/60 hover:text-foreground/80'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-foreground/10 rounded-full -z-10"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30
                        }}
                      />
                    )}
                    {link.label}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="w-[1px] h-4 bg-foreground/10 shrink-0 self-center" />

        <button
          onClick={() => {
            const nextLang = lang === 'EN' ? 'ID' : 'EN';
            window.dispatchEvent(new CustomEvent('language-change', { detail: { lang: nextLang } }));
          }}
          className="flex items-center justify-center gap-1 px-1.5 h-8 rounded-full text-xs font-semibold text-foreground/45 hover:text-primary transition-all duration-300 cursor-pointer outline-none shrink-0"
          aria-label="Toggle language"
        >
          <span className="text-sm leading-none mr-0.5">{lang === 'EN' ? '🇺🇸' : '🇮🇩'}</span>
          <span className="text-[10px] font-bold tracking-wider">{lang}</span>
        </button>

        <ThemeToggle />
      </motion.div>
    </nav>
  );
}
