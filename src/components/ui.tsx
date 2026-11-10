"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { LOGO_CONTENT, LOGO_RING, LOGO_VIEWBOX } from "@/lib/logo";

export function Reveal({ delay = 0, y = 24, ...props }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 font-display text-[11px] uppercase tracking-[0.28em] text-gold sm:text-xs">{children}</p>;
}

export function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-balance text-[1.8rem] font-extrabold leading-[1.15] text-head sm:text-4xl lg:text-[2.6rem] ${className}`}>
      {children}
    </h2>
  );
}

export function Section({ id, alt = false, children, className = "" }: { id?: string; alt?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`border-t border-line ${alt ? "bg-ink-2" : ""}`}>
      <div className={`mx-auto max-w-[1200px] px-5 py-20 sm:px-6 lg:py-24 ${className}`}>{children}</div>
    </section>
  );
}

export function Logo({ className = "", fill = "#C9A04A", label = "Логотип Hive Intelligence" }: { className?: string; fill?: string; label?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label={label}>
      <path d={`${LOGO_RING} ${LOGO_CONTENT}`} fillRule="evenodd" fill={fill} />
    </svg>
  );
}

export function HexBullet() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 14" className="mt-[0.45em] h-3 w-2.5 shrink-0">
      <path d="M6 1 L11 4 L11 10 L6 13 L1 10 L1 4 Z" fill="none" stroke="#C9A04A" strokeWidth="1.4" />
    </svg>
  );
}

export function ButtonLink({ href, children, variant = "primary", className = "" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" | "outline"; className?: string }) {
  const base = "inline-flex min-h-[52px] items-center justify-center gap-2 px-7 text-base font-semibold transition-colors duration-200";
  const styles = {
    primary: "bg-gold text-ink hover:bg-gold-hi font-bold",
    ghost: "border border-[#5A5345] text-head hover:border-gold hover:text-gold-hi",
    outline: "border border-gold text-gold-hi hover:bg-gold hover:text-ink",
  }[variant];
  const external = href.startsWith("http");
  return (
    <a href={href} className={`${base} ${styles} ${className}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

export function HoneycombBg({ className = "", opacity = 0.08, cx = "75%", cy = "50%" }: { className?: string; opacity?: number; cx?: string; cy?: string }) {
  const id = `comb-${cx}-${cy}`.replace(/[^a-z0-9-]/gi, "");
  return (
    <svg aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} style={{ opacity }}>
      <defs>
        <pattern id={id} width="27.71" height="48" patternUnits="userSpaceOnUse">
          <path d="M13.856 0 L27.71 8 L27.71 24 L13.856 32 L0 24 L0 8 Z M13.856 32 L13.856 48" fill="none" stroke="#C9A04A" strokeWidth="1" />
        </pattern>
        <radialGradient id={`${id}-f`} cx={cx} cy={cy} r="70%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id={`${id}-m`}>
          <rect width="100%" height="100%" fill={`url(#${id}-f)`} />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} mask={`url(#${id}-m)`} />
    </svg>
  );
}
