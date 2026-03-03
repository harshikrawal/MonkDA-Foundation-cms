"use client";

import { useEffect, useRef } from "react";

/* ── Theme presets ──────────────────────────────────── */
export type ParticleTheme = "realestate" | "automobile" | "clinic";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  hue: number; // 0=base, 1=accent1, 2=accent2
}

function particleColor(
  hue: number,
  alpha: number,
  theme: ParticleTheme,
): string {
  if (theme === "automobile") {
    if (hue === 1) return `rgba(232,52,26,${alpha})`; // red
    if (hue === 2) return `rgba(255,120,20,${alpha})`; // orange
    return `rgba(240,237,234,${alpha})`; // warm white
  }
  if (theme === "clinic") {
    if (hue === 1) return `rgba(14,165,233,${alpha})`; // clinic blue
    if (hue === 2) return `rgba(20,184,166,${alpha})`; // teal
    return `rgba(230,245,255,${alpha})`; // cool white
  }
  // realestate (default)
  if (hue === 1) return `rgba(212,175,110,${alpha})`; // gold
  if (hue === 2) return `rgba(160,180,220,${alpha})`; // blue
  return `rgba(245,244,240,${alpha})`; // off-white
}

function glowColor(theme: ParticleTheme): string {
  if (theme === "automobile") return "232,52,26";
  if (theme === "clinic") return "14,165,233";
  return "212,175,110";
}

const PARTICLE_COUNT = 220;
const FOV = 500;
const DEPTH = 900;
const SPEED = 0.55;

export default function HeroParticles({
  theme = "realestate",
}: {
  theme?: ParticleTheme;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0,
      height = 0,
      raf = 0;
    const mouse = { x: 0, y: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const particles: Particle[] = Array.from(
      { length: PARTICLE_COUNT },
      () => ({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 900,
        z: Math.random() * DEPTH + 1,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        vz: SPEED + Math.random() * 0.5,
        radius: 0.8 + Math.random() * 1.6,
        hue: Math.random() < 0.12 ? 1 : Math.random() < 0.15 ? 2 : 0,
      }),
    );

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const glow = glowColor(theme);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2 + mouse.x * 40;
      const cy = height / 2 + mouse.y * 20;

      for (const p of particles) {
        p.z -= p.vz;
        p.x += p.vx;
        p.y += p.vy;
        if (p.z < 1) {
          p.x = (Math.random() - 0.5) * 1600;
          p.y = (Math.random() - 0.5) * 900;
          p.z = DEPTH;
        }

        const scale = FOV / p.z;
        const sx = p.x * scale + cx;
        const sy = p.y * scale + cy;
        if (sx < -40 || sx > width + 40 || sy < -40 || sy > height + 40)
          continue;

        const nearness = 1 - p.z / DEPTH;
        const alpha = 0.05 + nearness * 0.85;
        const r = Math.max(0.3, p.radius * scale * 0.45);

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = particleColor(p.hue, alpha, theme);
        ctx.fill();

        if (p.hue === 1 && nearness > 0.75) {
          ctx.beginPath();
          ctx.arc(sx, sy, r * 3.5, 0, Math.PI * 2);
          const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 3.5);
          grd.addColorStop(0, `rgba(${glow},${alpha * 0.22})`);
          grd.addColorStop(1, `rgba(${glow},0)`);
          ctx.fillStyle = grd;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        display: "block",
      }}
    />
  );
}
