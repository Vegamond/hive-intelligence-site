"use client";

import { useEffect, useRef } from "react";

// Тепле «свічкове» світло, що йде за курсором (лише на пристроях з мишею)
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let x = window.innerWidth / 2, y = window.innerHeight / 3, tx = x, ty = y, raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
    };
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[600px] w-[600px] opacity-0 transition-opacity duration-700"
      style={{ background: "radial-gradient(circle, rgba(230,192,98,0.09) 0%, rgba(230,192,98,0.03) 35%, transparent 65%)", mixBlendMode: "screen" }}
    />
  );
}

export function Scanlines() {
  return <div aria-hidden="true" className="scanlines" />;
}
