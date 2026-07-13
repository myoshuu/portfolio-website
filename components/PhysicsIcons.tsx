'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import Image from 'next/image';

const ICONS = [
  { label: 'TypeScript', color: '#3178C6', icon: 'https://cdn.simpleicons.org/typescript/white' },
  { label: 'JavaScript', color: '#F7DF1E', icon: 'https://cdn.simpleicons.org/javascript/black' },
  { label: 'React', color: '#61DAFB', icon: 'https://cdn.simpleicons.org/react/white' },
  { label: 'Next.js', color: '#000000', icon: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { label: 'Tailwind', color: '#06B6D4', icon: 'https://cdn.simpleicons.org/tailwindcss/white' },
  { label: 'Node.js', color: '#339933', icon: 'https://cdn.simpleicons.org/nodedotjs/white' },
  { label: 'Go', color: '#00ADD8', icon: 'https://cdn.simpleicons.org/go/white' },
  { label: 'Spring Boot', color: '#6DB33F', icon: 'https://cdn.simpleicons.org/springboot/white' },
  { label: 'Laravel', color: '#FF2D20', icon: 'https://cdn.simpleicons.org/laravel/white' },
  { label: 'PHP', color: '#777BB4', icon: 'https://cdn.simpleicons.org/php/white' },
  { label: 'Prisma', color: '#2D3748', icon: 'https://cdn.simpleicons.org/prisma/white' },
  { label: 'Express', color: '#000000', icon: 'https://cdn.simpleicons.org/express/white' },
];

interface CustomBody extends Matter.Body {
  customData: {
    label: string;
    color: string;
    icon: string;
  };
}

export default function PhysicsIcons() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [bodies, setBodies] = useState<{ id: number; icon: string; color: string; x: number; y: number; angle: number }[]>([]);
  const [displayIconSize, setDisplayIconSize] = useState(80);

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Runner = Matter.Runner,
      Events = Matter.Events;

    const engine = Matter.Engine.create();
    engine.gravity.y = 0;
    engine.gravity.x = 0;
    engineRef.current = engine;
    const world = engine.world;

    let width = sceneRef.current.clientWidth;
    let height = sceneRef.current.clientHeight;
    let isMobile = width < 768;
    let iconSize = isMobile ? 56 : 80;
    let margin = isMobile ? 40 : 120;
    let minDist = isMobile ? 68 : 130;

    setDisplayIconSize(iconSize);

    const iconBodies = ICONS.map((icon) => {
      const x = Math.random() * (width * 0.3) + (isMobile ? 50 : 150);
      const y = Math.random() * (height * 0.6) + height * 0.2;

      const body = Bodies.rectangle(x, y, iconSize, iconSize, {
        restitution: 1,
        friction: 0,
        frictionAir: 0.1,
        chamfer: { radius: isMobile ? 8 : 12 },
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4
      });

      (body as CustomBody).customData = icon;
      return body;
    });

    World.add(world, iconBodies);

    const getHeroTextRect = () => {
      const el = document.getElementById('hero-text-area');
      if (el && sceneRef.current) {
        const rect = el.getBoundingClientRect();
        const sceneRect = sceneRef.current.getBoundingClientRect();
        return {
          centerX: rect.left - sceneRect.left + rect.width / 2,
          centerY: rect.top - sceneRect.top + rect.height / 2,
          width: rect.width,
          height: rect.height
        };
      }
      return null;
    };

    let heroTextData = getHeroTextRect();

    Events.on(engine, 'beforeUpdate', () => {
      const time = Date.now() * 0.001;

      iconBodies.forEach((body, i) => {
        if (!mouseConstraint || mouseConstraint.body !== body) {
          const driftX = Math.sin(time * 0.4 + i) * 0.0006;
          const driftY = Math.cos(time * 0.25 + i) * 0.0006;
          Matter.Body.applyForce(body, body.position, { x: driftX, y: driftY });

          for (let j = i + 1; j < iconBodies.length; j++) {
            const other = iconBodies[j];
            const dx = other.position.x - body.position.x;
            const dy = other.position.y - body.position.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < minDist * minDist) {
              const dist = Math.sqrt(distSq) || 1;
              const force = (minDist - dist) * 0.000008;
              const angle = Math.atan2(dy, dx);
              const fx = Math.cos(angle) * force;
              const fy = Math.sin(angle) * force;
              Matter.Body.applyForce(body, body.position, { x: -fx, y: -fy });
              Matter.Body.applyForce(other, other.position, { x: fx, y: fy });
            }
          }

          if (heroTextData) {
            const pad = iconSize / 2 + 15;
            const left = heroTextData.centerX - heroTextData.width / 2 - pad;
            const right = heroTextData.centerX + heroTextData.width / 2 + pad;
            const top = heroTextData.centerY - heroTextData.height / 2 - pad;
            const bottom = heroTextData.centerY + heroTextData.height / 2 + pad;

            if (body.position.x > left && body.position.x < right &&
                body.position.y > top && body.position.y < bottom) {
              const dxL = body.position.x - left;
              const dxR = right - body.position.x;
              const dyT = body.position.y - top;
              const dyB = bottom - body.position.y;
              const minDistVal = Math.min(dxL, dxR, dyT, dyB);
              
              const forceMagnitude = 0.003;
              
              if (minDistVal === dxL) {
                Matter.Body.applyForce(body, body.position, { x: -forceMagnitude, y: 0 });
              } else if (minDistVal === dxR) {
                Matter.Body.applyForce(body, body.position, { x: forceMagnitude, y: 0 });
              } else if (minDistVal === dyT) {
                Matter.Body.applyForce(body, body.position, { x: 0, y: -forceMagnitude });
              } else {
                Matter.Body.applyForce(body, body.position, { x: 0, y: forceMagnitude });
              }
            }
          }

          const boundaryForce = 0.0015;
          if (body.position.x < margin) {
            const f = Math.pow(1 - body.position.x / margin, 2) * boundaryForce;
            Matter.Body.applyForce(body, body.position, { x: f, y: 0 });
          }
          if (body.position.x > width - margin) {
            const f = Math.pow(1 - (width - body.position.x) / margin, 2) * boundaryForce;
            Matter.Body.applyForce(body, body.position, { x: -f, y: 0 });
          }
          if (body.position.y < margin) {
            const f = Math.pow(1 - body.position.y / margin, 2) * boundaryForce;
            Matter.Body.applyForce(body, body.position, { x: 0, y: f });
          }
          if (body.position.y > height - margin) {
            const f = Math.pow(1 - (height - body.position.y) / margin, 2) * boundaryForce;
            Matter.Body.applyForce(body, body.position, { x: 0, y: -f });
          }
        }
      });
    });

    const hasHover = window.matchMedia('(hover: hover)').matches;
    let mouseConstraint: Matter.MouseConstraint | null = null;

     if (hasHover) {
      const mouse = Mouse.create(sceneRef.current);
      const mouseObj = mouse as unknown as { mousewheel: EventListener };

      sceneRef.current.removeEventListener('mousewheel', mouseObj.mousewheel);
      sceneRef.current.removeEventListener('DOMMouseScroll', mouseObj.mousewheel);

      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });

      World.add(world, mouseConstraint);
    }

    const runner = Runner.create();
    Runner.run(runner, engine);

    const update = () => {
      const updatedBodies = iconBodies.map((body) => ({
        id: body.id,
        icon: (body as CustomBody).customData.icon,
        color: (body as CustomBody).customData.color,
        x: body.position.x,
        y: body.position.y,
        angle: body.angle,
      }));
      setBodies(updatedBodies);
      requestAnimationFrame(update);
    };

    const animId = requestAnimationFrame(update);

    const handleResize = () => {
      if (!sceneRef.current) return;
      width = sceneRef.current.clientWidth;
      height = sceneRef.current.clientHeight;
      isMobile = width < 768;

      iconSize = isMobile ? 56 : 80;
      margin = isMobile ? 40 : 120;
      minDist = isMobile ? 68 : 130;

      setDisplayIconSize(iconSize);
      heroTextData = getHeroTextRect();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div ref={sceneRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full pointer-events-none">
        {bodies.map((body) => (
          <div
            key={body.id}
            className="absolute flex items-center justify-center p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl select-none cursor-pointer active:cursor-grabbing border border-white/10 pointer-events-auto"
            style={{
              width: `${displayIconSize}px`,
              height: `${displayIconSize}px`,
              left: 0,
              top: 0,
              backgroundColor: body.color,
              transform: `translate3d(${body.x - displayIconSize / 2}px, ${body.y - displayIconSize / 2}px, 0) rotate(${body.angle}rad)`,
              willChange: 'transform',
            }}
          >
            <Image
              src={body.icon}
              alt="icon"
              className="w-full h-full object-contain pointer-events-none"
              width={displayIconSize}
              height={displayIconSize}
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
