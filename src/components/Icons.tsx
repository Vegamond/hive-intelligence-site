"use client";

import { motion } from "framer-motion";
import type { ServiceIcon } from "@/content/site";

// Лінійні ілюстрації в стилі бренду; лінії «прорисовуються», коли блок з'являється на екрані
const paths: Record<ServiceIcon, string[]> = {
  laptop: [
    "M40 18 L160 18 L160 84 L40 84 Z M28 90 L172 90 L178 98 L22 98 Z",
    "M98 51 A20 20 0 1 1 58 51 A20 20 0 1 1 98 51 Z M82 51 A4 4 0 1 1 74 51 A4 4 0 1 1 82 51 Z",
    "M78 47 C70 38 76 33 84 36 M82 51 C91 45 95 51 92 59 M78 55 C82 65 75 69 68 64 M74 51 C65 55 61 49 64 42",
    "M112 36 L144 36 L144 66 L112 66 Z M120 44 L136 44 L136 58 L120 58 Z M112 42 L106 42 M112 50 L106 50 M112 58 L106 58 M144 42 L150 42 M144 50 L150 50 M144 58 L150 58",
  ],
  network: [
    "M24 62 L84 62 L84 82 L24 82 Z M34 62 L28 36 M74 62 L80 36 M36 72 L40 72 M48 72 L52 72 M60 72 L64 72",
    "M44 30 A10 10 0 0 1 64 30 M38 24 A18 18 0 0 1 70 24",
    "M84 72 L112 72 L112 40 L128 40",
    "M128 30 L166 30 L178 40 L166 50 L128 50 Z M178 40 L184 40 M152 40 A6 6 0 1 1 140 40 A6 6 0 1 1 152 40 Z M150 50 L150 66 L140 74 L160 74",
  ],
  power: [
    "M30 26 L92 26 L92 90 L30 90 Z M40 36 L82 36 L82 48 L40 48 Z",
    "M64 56 L52 72 L62 72 L56 84",
    "M92 58 L120 58",
    "M120 44 L170 44 L170 74 L120 74 Z M170 52 L178 52 L178 66 L170 66 M128 52 L136 52 L136 66 L128 66 Z M140 52 L148 52 L148 66 L140 66 Z M152 52 L160 52 L160 66 L152 66 Z",
  ],
  business: [
    "M22 44 L74 44 L74 92 L22 92 Z M18 44 L78 44 L72 28 L24 28 Z M30 60 L46 60 L46 92 M54 60 L66 60 L66 74 L54 74 Z",
    "M126 44 L178 44 L178 92 L126 92 Z M122 44 L182 44 L176 28 L128 28 Z M134 60 L150 60 L150 92 M158 60 L170 60 L170 74 L158 74 Z",
    "M74 68 L100 68 L100 50 L126 50 M100 68 L100 86 L126 86",
    "M92 14 L108 14 L114 24 L108 34 L92 34 L86 24 Z M100 34 L100 50",
  ],
};

export function ServiceArt({ icon }: { icon: ServiceIcon }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 112" className="h-auto w-[78%]">
      {paths[icon].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="#C9A04A"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, delay: 0.15 + i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

export function CaseArt({ kind }: { kind: "chain" | "campus" }) {
  const common = { fill: "none", stroke: "#C9A04A", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const draw = (i: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 1.2, delay: 0.1 + i * 0.15 },
  });
  if (kind === "chain") {
    return (
      <svg role="img" aria-label="Схема: кілька кав'ярень і виробництво, з'єднані з центральним вузлом" viewBox="0 0 360 180" className="h-auto w-[88%]">
        <motion.path {...common} {...draw(0)} d="M180 66 L198 76 L198 96 L180 106 L162 96 L162 76 Z" />
        <motion.path {...common} {...draw(1)} opacity={0.8} d="M162 86 L90 86 L70 50 M90 86 L70 122 M198 86 L270 86 L290 50 M270 86 L290 130" />
        <motion.path {...common} {...draw(2)} d="M40 34 L72 34 L72 58 L40 58 Z M36 34 L76 34 L72 26 L40 26 Z M40 112 L72 112 L72 136 L40 136 Z M36 112 L76 112 L72 104 L40 104 Z" />
        <motion.path {...common} {...draw(3)} d="M288 34 L320 34 L320 58 L288 58 Z M284 34 L324 34 L320 26 L288 26 Z M284 116 L330 116 L330 146 L284 146 Z M284 116 L296 104 L308 116 L320 104 L330 116" />
        <g fontFamily="var(--font-manrope)" fontSize="11" fill="#9A9486" textAnchor="middle">
          <text x="56" y="76">Точка 1</text>
          <text x="56" y="154">Точка 2</text>
          <text x="304" y="76">Точка 3</text>
          <text x="307" y="164">Виробництво</text>
        </g>
      </svg>
    );
  }
  return (
    <svg role="img" aria-label="Схема: навчальний корпус з аудиторіями, мережею, принтерами та моноблоками" viewBox="0 0 360 180" className="h-auto w-[88%]">
      <motion.path {...common} {...draw(0)} d="M110 150 L110 66 L180 30 L250 66 L250 150 Z M96 150 L264 150" />
      <motion.path {...common} {...draw(1)} d="M126 82 L150 82 L150 104 L126 104 Z M168 82 L192 82 L192 104 L168 104 Z M210 82 L234 82 L234 104 L210 104 Z M126 118 L150 118 L150 140 L126 140 Z M210 118 L234 118 L234 140 L210 140 Z M168 120 L192 120 L192 150" />
      <motion.path {...common} {...draw(2)} d="M250 92 L296 92 M296 80 L334 80 L334 104 L296 104 Z M306 104 L302 114 L328 114 L324 104" />
      <motion.path {...common} {...draw(3)} d="M110 92 L64 92 M26 86 L64 86 L64 106 L26 106 Z M32 86 L32 74 L58 74 L58 86 M34 96 L56 96" />
      <g fontFamily="var(--font-manrope)" fontSize="11" fill="#9A9486" textAnchor="middle">
        <text x="315" y="132">Моноблоки</text>
        <text x="45" y="124">Принтери</text>
      </g>
    </svg>
  );
}
