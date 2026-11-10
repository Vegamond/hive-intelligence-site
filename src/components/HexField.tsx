"use client";

import { useEffect, useRef } from "react";

// Живі соти: клітинки підсвічуються біля курсора; на сенсорних екранах — «блукаюче» світло, що реагує на прокрутку
export function HexField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const R = fine ? 26 : 22;
    const W = Math.sqrt(3) * R;
    const H = 1.5 * R;

    let w = 0, h = 0, dpr = 1, cells: { x: number; y: number; v: number }[] = [];
    let px = -9999, py = -9999, raf = 0, visible = true, t = 0;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cells = [];
      for (let row = -1; row * H < h + R; row++) {
        for (let col = -1; col * W < w + W; col++) {
          cells.push({ x: col * W + (row % 2 ? W / 2 : 0), y: row * H, v: 0 });
        }
      }
    };

    const hex = (x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        const X = x + r * Math.cos(a), Y = y + r * Math.sin(a);
        if (i) ctx.lineTo(X, Y);
        else ctx.moveTo(X, Y);
      }
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const reach = fine ? 190 : 150;
      for (const c of cells) {
        const d = Math.hypot(c.x - px, c.y - py);
        const target = d < reach ? Math.pow(1 - d / reach, 2) : 0;
        c.v += (target - c.v) * 0.08;
        // соти тьмяніють до центру, де стоїть текст
        const edge = Math.min(1, Math.abs(c.x - w * 0.3) / (w * 0.45));
        hex(c.x, c.y, R - 1.5);
        ctx.strokeStyle = `rgba(201,160,74,${0.05 + 0.04 * edge + c.v * 0.55})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        if (c.v > 0.02) {
          ctx.fillStyle = `rgba(230,192,98,${c.v * 0.2})`;
          ctx.fill();
        }
      }
    };

    const loop = () => {
      if (!fine) {
        // на телефоні світло повільно блукає, а прокрутка зсуває його вниз
        t += 0.006;
        const scroll = Math.min(window.scrollY, h) * 0.5;
        px = w * (0.62 + 0.28 * Math.sin(t * 1.3));
        py = h * (0.35 + 0.25 * Math.sin(t * 0.9)) + scroll * 0.4;
      }
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
    };
    const onLeave = () => {
      px = py = -9999;
    };

    build();
    if (reduce) {
      draw();
      return;
    }
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
