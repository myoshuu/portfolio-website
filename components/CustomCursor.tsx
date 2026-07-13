'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'magnifier'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [hasHoverSupport, setHasHoverSupport] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    html: string;
  } | null>(null);

  const hoveredTagRef = useRef(hoveredTag);
  const cloneRef = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorCurrentPos = useRef({ x: 0, y: 0 });
  const ringCurrentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    hoveredTagRef.current = hoveredTag;
  }, [hoveredTag]);

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
      
      const isTechTag = target.closest('.tech-tag');
      const isInteractive = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      if (isTechTag) {
        const rect = isTechTag.getBoundingClientRect();
        setHoveredTag({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
          html: isTechTag.innerHTML,
        });
        setCursorType('magnifier');
        setIsHovering(true);
      } else if (isInteractive) {
        setHoveredTag(null);
        setCursorType('pointer');
        setIsHovering(true);
      } else {
        setHoveredTag(null);
        setCursorType('default');
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);

    const animate = () => {
      // High responsiveness lerp values
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

      if (cloneRef.current && hoveredTagRef.current) {
        const tag = hoveredTagRef.current;
        const S_visual = 1.35; // Visual zoom factor (1.35x)
        
        // Center calculation inside the high-res 60px base container, corrected for zoom scaling
        const left = (30 - (cursorCurrentPos.current.x - tag.x) * S_visual) / S_visual;
        const top = (30 - (cursorCurrentPos.current.y - tag.y) * S_visual) / S_visual;
        
        cloneRef.current.style.left = `${left}px`;
        cloneRef.current.style.top = `${top}px`;
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
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 border border-primary/30 bg-primary/5 rounded-full pointer-events-none z-[9999] transition-[width,height,margin,opacity] duration-500 ease-out hidden md:block ${
          isHovering 
            ? 'w-16 h-16 -ml-8 -mt-8 opacity-100' 
            : 'w-8 h-8 -ml-4 -mt-4 opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      />
      {/* Inner Dot Wrapper - Laid out at full 60px size to guarantee high-resolution rendering */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-[60px] h-[60px] -ml-[30px] -mt-[30px] pointer-events-none z-[9999] hidden md:block transition-[opacity,mix-blend-mode] duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovering && cursorType !== 'magnifier' ? 'mix-blend-difference' : 'mix-blend-normal'
        }`}
        style={{ willChange: 'transform' }}
      >
        <motion.div
          className={`relative w-full h-full rounded-full border-2 pointer-events-none transition-[background-color,border-color] duration-300 ease-out flex items-center justify-center overflow-hidden ${
            cursorType === 'magnifier'
              ? 'bg-background border-foreground/15 dark:border-primary'
              : (isHovering ? 'bg-white border-transparent' : 'bg-transparent border-primary dark:border-sky-400')
          }`}
          animate={{
            scale: cursorType === 'magnifier' ? 1 : (isHovering ? 48 / 60 : 10 / 60),
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }}
        >
          {cursorType === 'magnifier' && hoveredTag && (
            <div
              ref={cloneRef}
              className="absolute left-0 top-0 pointer-events-none whitespace-nowrap origin-top-left inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full border border-foreground/10 bg-background text-foreground transition-opacity duration-150 ease-out"
              style={{
                width: `${hoveredTag.width}px`,
                height: `${hoveredTag.height}px`,
                zoom: 1.35, // Forces native browser text re-rasterization at the target zoom level
                willChange: 'transform, opacity',
                opacity: isVisible ? 1 : 0,
              }}
              dangerouslySetInnerHTML={{ __html: hoveredTag.html }}
            />
          )}
        </motion.div>
      </div>
    </>
  );
}
