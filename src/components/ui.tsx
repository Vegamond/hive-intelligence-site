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

// HUD-мітка секції: «▸ // 01 — ПОСЛУГИ»
export function Eyebrow({ children, index }: { children: React.ReactNode; index?: string }) {
  return (
    <p className="mb-4 flex items-center gap-2.5 font-display text-[11px] uppercase tracking-[0.28em] text-gold sm:text-xs">
      <svg aria-hidden="true" viewBox="0 0 10 10" className="h-2.5 w-2.5">
        <path d="M1 1 L9 5 L1 9 Z" fill="#C9A04A" />
      </svg>
      {index && <span className="text-dim">{`// ${index} —`}</span>}
      {children}
    </p>
  );
}

export function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`glitch text-balance text-[1.8rem] font-extrabold leading-[1.15] text-head sm:text-4xl lg:text-[2.6rem] ${className}`}>
      {children}
    </h2>
  );
}

// Роздільник секцій: тонка лінія з трикутним «вирізом» по центру
export function Divider() {
  return (
    <div aria-hidden="true" className="mx-auto flex max-w-[1200px] items-center px-5 sm:px-6">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-line-2" />
      <svg viewBox="0 0 40 12" className="h-3 w-10 shrink-0">
        <path d="M0 0.5 L14 0.5 L20 10 L26 0.5 L40 0.5" fill="none" stroke="#C9A04A" strokeOpacity="0.7" strokeWidth="1" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-line-2" />
    </div>
  );
}

export function Section({ id, alt = false, children, className = "" }: { id?: string; alt?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative ${alt ? "bg-ink-2" : ""}`}>
      <Divider />
      <div className={`mx-auto max-w-[1200px] px-5 py-20 sm:px-6 lg:py-24 ${className}`}>{children}</div>
    </section>
  );
}

// Картка зі скошеними кутами, контуром і світінням при наведенні
export function Cut({ children, gold = false, className = "", innerClassName = "" }: { children: React.ReactNode; gold?: boolean; className?: string; innerClassName?: string }) {
  return (
    <div className={`cut-glow ${className}`}>
      <div className={`cut-frame ${gold ? "is-gold" : ""}`}>
        <div className={`cut-inner ${innerClassName}`}>{children}</div>
      </div>
    </div>
  );
}

// Кутові HUD-скоби, що «сходяться» при появі
export function HudCorners({ size = 18, color = "#C9A04A" }: { size?: number; color?: string }) {
  const s = { width: size, height: size, borderColor: color };
  const t = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };
  const v = { once: true, margin: "-40px" };
  return (
    <>
      <motion.span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 border-l-[1.5px] border-t-[1.5px]" style={s} initial={{ x: -10, y: -10, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} viewport={v} transition={t} />
      <motion.span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 border-r-[1.5px] border-t-[1.5px]" style={s} initial={{ x: 10, y: -10, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} viewport={v} transition={t} />
      <motion.span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]" style={s} initial={{ x: -10, y: 10, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} viewport={v} transition={t} />
      <motion.span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 border-b-[1.5px] border-r-[1.5px]" style={s} initial={{ x: 10, y: 10, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} viewport={v} transition={t} />
    </>
  );
}

export function Logo({ className = "", fill = "#C9A04A", label = "Логотип Hive Intelligence" }: { className?: string; fill?: string; label?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role={label ? "img" : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true}>
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
  const base = "btn-cut group/btn relative inline-flex whitespace-nowrap min-h-[52px] items-center justify-center gap-2 px-7 text-base font-semibold transition-all duration-200";
  const styles = {
    primary: "bg-gold text-ink font-bold hover:bg-gold-hi hover:shadow-[0_0_24px_rgba(230,192,98,0.45)]",
    ghost: "bg-[#5A5345] text-head hover:bg-gold hover:text-ink",
    outline: "bg-gold text-gold-hi",
  }[variant];
  const external = href.startsWith("http");
  const inner =
    variant === "primary" ? (
      children
    ) : (
      // рамка зі скошеними кутами: зовнішній шар — контур, внутрішній — фон
      <span className="btn-cut absolute inset-px flex items-center justify-center bg-ink px-7 transition-colors group-hover/btn:bg-transparent">{children}</span>
    );
  return (
    <a href={href} className={`${base} ${styles} ${className}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {variant === "primary" ? inner : <><span className="invisible">{children}</span>{inner}</>}
    </a>
  );
}
