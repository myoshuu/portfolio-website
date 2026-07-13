'use client';

import { useEffect, useRef, memo, FC } from 'react';
import './DotField.css';

const TWO_PI = Math.PI * 2;

interface DotFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  dotRadius?: number;
  dotSpacing?: number;
  waveAmplitude?: number;
  cursorRadius?: number;
  maxScale?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

const DotField: FC<DotFieldProps> = memo(({
  dotRadius = 1.5,
  dotSpacing = 14,
  waveAmplitude = 0,
  cursorRadius = 100,
  maxScale = 2,
  gradientFrom = 'var(--primary)',
  gradientTo = 'var(--accent)',
  ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<{ ax: number; ay: number }[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const propsRef = useRef<{
    dotRadius: number;
    dotSpacing: number;
    waveAmplitude: number;
    cursorRadius: number;
    maxScale: number;
    gradientFrom: string;
    gradientTo: string;
  }>({
    dotRadius,
    dotSpacing,
    waveAmplitude,
    cursorRadius,
    maxScale,
    gradientFrom,
    gradientTo,
  });
  
  propsRef.current = { dotRadius, dotSpacing, waveAmplitude, cursorRadius, maxScale, gradientFrom, gradientTo };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let resizeTimer: NodeJS.Timeout;

    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    }

    function doResize() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = { 
        w, 
        h,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY
      };
      buildDots(w, h);
    }

    function buildDots(w: number, h: number) {
      const p = propsRef.current;
      const step = p.dotRadius + p.dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots = new Array(rows * cols);
      let idx = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay };
        }
      }
      dotsRef.current = dots;
    }

    function onMouseMove(e: MouseEvent) {
      const s = sizeRef.current;
      mouseRef.current.x = e.pageX - s.offsetX;
      mouseRef.current.y = e.pageY - s.offsetY;
    }

    let frameCount = 0;

    function tick() {
      frameCount++;
      const dots = dotsRef.current;
      const m = mouseRef.current;
      const { w, h } = sizeRef.current;
      const p = propsRef.current;
      const len = dots.length;
      const t = frameCount * 0.02;

      ctx!.clearRect(0, 0, w, h);

      const computedStyle = getComputedStyle(canvas!);
      const fromColor = p.gradientFrom.startsWith('var(') 
        ? computedStyle.getPropertyValue(p.gradientFrom.slice(4, -1)).trim() || '#000'
        : p.gradientFrom;
      const toColor = p.gradientTo.startsWith('var(')
        ? computedStyle.getPropertyValue(p.gradientTo.slice(4, -1)).trim() || '#000'
        : p.gradientTo;

      const grad = ctx!.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, fromColor);
      grad.addColorStop(1, toColor);
      ctx!.fillStyle = grad;

      const baseRad = p.dotRadius / 2;
      const cr = p.cursorRadius;
      const crSq = cr * cr;

      ctx!.beginPath();

      for (let i = 0; i < len; i++) {
        const d = dots[i];
        let drawX = d.ax;
        let drawY = d.ay;
        
        const dx = m.x - drawX;
        const dy = m.y - drawY;
        const distSq = dx * dx + dy * dy;

        let scale = 1;
        if (distSq < crSq) {
          const dist = Math.sqrt(distSq);
          const tHover = 1 - dist / cr;
          scale = 1 + (p.maxScale - 1) * tHover;
        }

        const currentRad = baseRad * scale;

        if (p.waveAmplitude > 0) {
          drawY += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude;
          drawX += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5;
        }

        ctx!.moveTo(drawX + currentRad, drawY);
        ctx!.arc(drawX, drawY, currentRad, 0, TWO_PI);
      }

      ctx!.fill();
      rafRef.current = requestAnimationFrame(tick);
    }

    doResize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="dot-field-container" {...rest}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
});

DotField.displayName = 'DotField';

export default DotField;
