"use client";

import { motion } from "framer-motion";
import { contacts, hero } from "@/content/site";
import { LOGO_CONTENT, LOGO_RING } from "@/lib/logo";
import { ButtonLink, HexBullet, HoneycombBg } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

const traces = [
  "M178 198 L130 198 L110 180 L92 180",
  "M342 198 L390 198 L410 180 L428 180",
  "M206 257 L150 350 L110 350",
  "M314 257 L370 350 L410 350",
];

const devices = [
  // ноутбук
  "M28 150 L92 150 L92 210 L28 210 Z M20 216 L100 216 L106 224 L14 224 Z M40 168 L64 168 M40 180 L80 180 M40 192 L72 192",
  // роутер
  "M428 166 L500 166 L500 194 L428 194 Z M440 166 L434 140 M488 166 L494 140 M444 180 L448 180 M456 180 L460 180 M468 180 L472 180 M470 140 A18 18 0 0 1 488 122 M462 140 A26 26 0 0 1 488 114",
  // камера
  "M30 336 L76 336 L90 344 L90 356 L76 364 L30 364 Z M90 350 L104 350 M42 364 L36 384 M36 384 L60 384 M62 350 A6 6 0 1 1 50 350 A6 6 0 1 1 62 350 Z",
  // ДБЖ
  "M414 330 L484 330 L484 372 L414 372 Z M484 344 L492 344 L492 358 L484 358 M452 336 L440 352 L452 352 L444 366",
];

const nodes: [number, number][] = [
  [92, 180],
  [428, 180],
  [110, 350],
  [410, 350],
];

function Scheme() {
  return (
    <svg
      role="img"
      aria-label="Схема: логотип Hive Intelligence у центрі, навколо — ноутбук, роутер, камера та джерело живлення, з'єднані доріжками"
      viewBox="0 0 520 480"
      className="h-auto w-full max-w-[540px]"
    >
      <defs>
        <linearGradient id="hero-foil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9C7420" />
          <stop offset="0.38" stopColor="#F0CF78" />
          <stop offset="0.58" stopColor="#B8892B" />
          <stop offset="0.8" stopColor="#E6C062" />
          <stop offset="1" stopColor="#8F6A1E" />
        </linearGradient>
        <radialGradient id="hero-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#C9A04A" stopOpacity="0.28" />
          <stop offset="1" stopColor="#C9A04A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.circle
        cx="260"
        cy="198"
        r="150"
        fill="url(#hero-glow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <g fill="none" stroke="#C9A04A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {traces.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            transition={{ duration: 0.9, delay: 0.9 + i * 0.12, ease: "easeInOut" }}
          />
        ))}
        <motion.path
          d="M260 100 L260 60 M260 298 L260 430"
          strokeDasharray="4 6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.4 }}
        />
        {devices.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5 + i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </g>

      {nodes.map(([x, y], i) => (
        <motion.circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="3.5"
          fill="#E6C062"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, delay: 2 + i * 0.3, repeat: Infinity }}
        />
      ))}

      <motion.g
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease }}
        style={{ transformOrigin: "260px 198px" }}
      >
        <g transform="translate(184 106) scale(0.4735) translate(-160 -30)">
          <path d={`${LOGO_RING} ${LOGO_CONTENT}`} fillRule="evenodd" fill="url(#hero-foil)" />
        </g>
      </motion.g>

      <g fontFamily="var(--font-manrope)" fontSize="13" fill="#9A9486" textAnchor="middle">
        {[
          [60, 248, "ПК і ноутбуки"],
          [464, 216, "Мережі, Wi-Fi"],
          [62, 406, "Відеонагляд"],
          [452, 394, "Живлення"],
        ].map(([x, y, t], i) => (
          <motion.text key={t as string} x={x} y={y} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 + i * 0.1 }}>
            {t}
          </motion.text>
        ))}
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <HoneycombBg />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-16">
        <div className="flex flex-col gap-6">
          <motion.p
            className="font-display text-[11px] uppercase tracking-[0.28em] text-gold sm:text-xs"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            className="text-balance text-[2.35rem] font-extrabold leading-[1.06] text-head sm:text-5xl lg:text-[3.8rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="max-w-[34rem] text-pretty text-lg text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
          >
            {hero.lead}
          </motion.p>
          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            <ButtonLink href={contacts.telegramHref}>Описати проблему</ButtonLink>
            <ButtonLink href={contacts.phoneHref} variant="ghost">
              {contacts.phone}
            </ButtonLink>
          </motion.div>
          <motion.ul
            className="mt-2 flex flex-col gap-2 text-[0.95rem] text-muted sm:flex-row sm:flex-wrap sm:gap-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {hero.perks.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <HexBullet />
                {p}
              </li>
            ))}
          </motion.ul>
        </div>
        <div className="flex justify-center">
          <Scheme />
        </div>
      </div>
    </section>
  );
}
