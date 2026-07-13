'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasHoverSupport, setHasHoverSupport] = useState(false);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorCurrentPos = useRef({ x: 0, y: 0 });
  const ringCurrentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const hoverMedia = window.matchMedia('(hover: hover)');
    setHasHoverSupport(hoverMedia.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setHasHoverSupport(e.matches);
    };
    hoverMedia.addEventListener('change', handleChange);
    return () => hoverMedia.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!hasHoverSupport) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible) {
        setIsVisible(true);
        cursorCurrentPos.current = { x: e.clientX, y: e.clientY };
        ringCurrentPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);

    const animate = () => {
      // High responsiveness lerp values
      // Inner Dot - 0.5 (Very snappy, almost 1:1 but with a hint of fluid smoothness)
      cursorCurrentPos.current.x += (mousePos.current.x - cursorCurrentPos.current.x) * 0.5;
      cursorCurrentPos.current.y += (mousePos.current.y - cursorCurrentPos.current.y) * 0.5;

      // Outer Ring - 0.25 (Snappy trail)
      ringCurrentPos.current.x += (mousePos.current.x - ringCurrentPos.current.x) * 0.25;
      ringCurrentPos.current.y += (mousePos.current.y - ringCurrentPos.current.y) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorCurrentPos.current.x}px, ${cursorCurrentPos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCurrentPos.current.x}px, ${ringCurrentPos.current.y}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible, hasHoverSupport]);

  if (!hasHoverSupport) return null;

  return (
    <>
      {/* Outer Ring - More dramatic expansion */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 border border-primary/30 bg-primary/5 rounded-full pointer-events-none z-[9999] transition-[width,height,margin,opacity] duration-500 ease-out hidden md:block ${
          isHovering 
            ? 'w-16 h-16 -ml-8 -mt-8 opacity-100' 
            : 'w-8 h-8 -ml-4 -mt-4 opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      />
      {/* Inner Dot - Becomes a "Difference" lens on hover */}
      <motion.div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } border transition-[background-color,border-color,mix-blend-mode] duration-300 ease-out ${
          isHovering
            ? 'bg-white border-transparent mix-blend-difference'
            : 'bg-transparent border-primary mix-blend-normal'
        }`}
        animate={{
          width: isHovering ? 48 : 10,
          height: isHovering ? 48 : 10,
          marginLeft: isHovering ? -24 : -5,
          marginTop: isHovering ? -24 : -5,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.8
        }}
        style={{ willChange: 'transform, width, height, margin' }}
      />
    </>
  );
}
