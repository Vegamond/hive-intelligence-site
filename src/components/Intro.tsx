"use client";

import { useEffect, useState } from "react";
import { LOGO_CONTENT, LOGO_RING, LOGO_VIEWBOX } from "@/lib/logo";

const LINE = "HIVE INTELLIGENCE // SYSTEM ONLINE";

// Заставка «запуску системи»: показується раз за візит, пропускається дотиком.
// Якщо JS не завантажився, CSS сам ховає її через 2,3 с.
export function Intro() {
  const [chars, setChars] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.intro === "seen") {
      setGone(true);
      return;
    }
    try {
      sessionStorage.setItem("hive-intro", "1");
    } catch {}
    const typer = setInterval(() => setChars((c) => (c >= LINE.length ? c : c + 1)), 38);
    const done = setTimeout(() => setGone(true), 2800);
    return () => {
      clearInterval(typer);
      clearTimeout(done);
    };
  }, []);

  if (gone) return null;

  const pct = Math.round((chars / LINE.length) * 100);

  return (
    <div className="intro" role="presentation" onClick={() => setGone(true)}>
      <div className="intro-scan" />
      <div className="flex flex-col items-center gap-6 px-6">
        <svg viewBox={LOGO_VIEWBOX} className="h-28 w-24 animate-pulse" aria-hidden="true">
          <defs>
            <linearGradient id="intro-foil" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#9C7420" />
              <stop offset="0.45" stopColor="#F0CF78" />
              <stop offset="1" stopColor="#8F6A1E" />
            </linearGradient>
          </defs>
          <path d={`${LOGO_RING} ${LOGO_CONTENT}`} fillRule="evenodd" fill="url(#intro-foil)" />
        </svg>
        <p className="min-h-[1.5em] text-center font-display text-[11px] tracking-[0.3em] text-gold-hi sm:text-xs" aria-live="off">
          {LINE.slice(0, chars)}
          <span className="animate-pulse">▌</span>
        </p>
        <div className="h-px w-56 bg-line">
          <div className="h-px bg-gold transition-[width] duration-75" style={{ width: `${pct}%` }} />
        </div>
        <p className="font-display text-[10px] tracking-[0.3em] text-dim">{String(pct).padStart(3, "0")}%</p>
      </div>
      <button
        type="button"
        className="absolute bottom-8 right-6 min-h-11 px-4 font-display text-[10px] tracking-[0.3em] text-dim hover:text-gold-hi"
        onClick={() => setGone(true)}
      >
        SKIP ›
      </button>
    </div>
  );
}
