"use client";

import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

type ShowcasePersona = {
  slug: string;
  name: string;
  chinlish: string;
  oneLiner: string;
  imageSrc: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  spin: number;
  shape: "diamond" | "dash" | "square";
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function buildParticles(width: number, height: number): Particle[] {
  const count = Math.min(96, Math.max(42, Math.floor((width * height) / 18000)));

  return Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.22,
    size: 2 + Math.random() * 4,
    alpha: 0.18 + Math.random() * 0.34,
    spin: Math.random() * Math.PI + index,
    shape: index % 5 === 0 ? "dash" : index % 3 === 0 ? "square" : "diamond",
  }));
}

function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle, tick: number) {
  const pulse = Math.sin(tick * 0.018 + particle.spin) * 0.35 + 0.65;
  ctx.save();
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.spin + tick * 0.004);
  ctx.globalAlpha = particle.alpha * pulse;
  ctx.fillStyle = particle.shape === "dash" ? "#1f2933" : particle.shape === "square" ? "#2f7d48" : "#ff7aa2";

  if (particle.shape === "dash") {
    ctx.fillRect(-particle.size * 1.8, -0.8, particle.size * 3.6, 1.6);
  } else if (particle.shape === "square") {
    ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
  } else {
    ctx.beginPath();
    ctx.moveTo(0, -particle.size);
    ctx.lineTo(particle.size, 0);
    ctx.lineTo(0, particle.size);
    ctx.lineTo(-particle.size, 0);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

export function ImmersiveParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const activeCanvas = canvas;
    const activeCtx = ctx;
    const reduceMotion = prefersReducedMotion();
    let frame = 0;
    let animationId = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      activeCanvas.width = Math.floor(width * dpr);
      activeCanvas.height = Math.floor(height * dpr);
      activeCanvas.style.width = `${width}px`;
      activeCanvas.style.height = `${height}px`;
      activeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = buildParticles(width, height);
    }

    function movePointer(event: globalThis.PointerEvent) {
      pointerRef.current = { x: event.clientX, y: event.clientY, active: true };
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    }

    function leavePointer() {
      pointerRef.current.active = false;
    }

    function animate() {
      frame += 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      activeCtx.clearRect(0, 0, width, height);
      for (const particle of particlesRef.current) {
        if (!reduceMotion) {
          const pointer = pointerRef.current;
          if (pointer.active) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.max(80, Math.hypot(dx, dy));
            if (distance < 190) {
              particle.vx += (dx / distance) * 0.012;
              particle.vy += (dy / distance) * 0.012;
            }
          }

          particle.x += particle.vx;
          particle.y += particle.vy + Math.sin(frame * 0.01 + particle.spin) * 0.02;
          particle.vx *= 0.995;
          particle.vy *= 0.995;
        }

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        drawParticle(activeCtx, particle, frame);
      }

      animationId = window.requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", movePointer);
    window.addEventListener("pointerleave", leavePointer);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", movePointer);
      window.removeEventListener("pointerleave", leavePointer);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-70" aria-hidden="true" />
      <div className="immersive-cursor-light pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
    </>
  );
}

export function PersonaShowcase({ personas }: { personas: ShowcasePersona[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const activePersona = personas[activeIndex] ?? personas[0];

  function handleMove(event: ReactPointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -10;
    setTilt({ x, y });
  }

  return (
    <div className="home-showcase" onPointerMove={handleMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
      <div
        className="home-showcase-card"
        style={{ transform: `perspective(1100px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      >
        <div className="home-showcase-screen">
          <Image
            key={activePersona.slug}
            src={activePersona.imageSrc}
            alt={`${activePersona.name}人格插图`}
            width={620}
            height={430}
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div className="home-showcase-caption">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#2f7d48]">{activePersona.chinlish}</div>
            <div className="mt-1 text-2xl font-black text-neutral-950">{activePersona.name}</div>
          </div>
          <div className="max-w-[12rem] text-right text-sm font-semibold leading-5 text-neutral-500">
            {activePersona.oneLiner}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {personas.slice(0, 6).map((persona, index) => (
          <button
            key={persona.slug}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`home-showcase-chip ${index === activeIndex ? "is-active" : ""}`}
            aria-pressed={index === activeIndex}
          >
            {persona.name}
          </button>
        ))}
      </div>
    </div>
  );
}
