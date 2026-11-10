"use client";

import { motion } from "framer-motion";
import type { ServiceIcon } from "@/content/site";

// Ізометрична проєкція: (x, y, z) → екран. x іде вправо-вниз, y — вліво-вниз, z — вгору.
const C = Math.cos(Math.PI / 6);
const S = 0.5;
const p = (x: number, y: number, z: number): [number, number] => [(x - y) * C, (x + y) * S - z];
const pts = (list: [number, number, number][]) => list.map((q) => p(...q).map((n) => n.toFixed(1)).join(",")).join(" ");
const path = (list: [number, number, number][], close = true) =>
  "M" + list.map((q) => p(...q).map((n) => n.toFixed(1)).join(" ")).join(" L") + (close ? " Z" : "");

type Box = { x: number; y: number; z: number; w: number; d: number; h: number };

const GOLD = "#C9A04A";
const GOLD_HI = "#F0CF78";

// Об'ємний блок: верх світлий, фасади темні, грані — золото
function Block({ b, delay = 0, top = "url(#iso-top)" }: { b: Box; delay?: number; top?: string }) {
  const { x, y, z, w, d, h } = b;
  const topF: [number, number, number][] = [[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]];
  const front: [number, number, number][] = [[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]];
  const right: [number, number, number][] = [[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]];
  const draw = {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 1, delay },
  };
  return (
    <g>
      <motion.polygon points={pts(front)} fill="url(#iso-front)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: delay + 0.4 }} />
      <motion.polygon points={pts(right)} fill="url(#iso-side)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: delay + 0.4 }} />
      <motion.polygon points={pts(topF)} fill={top} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: delay + 0.4 }} />
      <g fill="none" stroke={GOLD} strokeWidth={1.3} strokeLinejoin="round" filter="url(#iso-glow)">
        <motion.path d={path(front)} {...draw} />
        <motion.path d={path(right)} {...draw} />
        <motion.path d={path(topF)} {...draw} />
      </g>
    </g>
  );
}

// Деталь на передньому фасаді (площина y = const): u — вздовж x, v — вгору
const onFront = (b: Box, list: [number, number][]) => list.map(([u, v]) => [b.x + u, b.y + b.d, b.z + v] as [number, number, number]);
// Деталь на верхній грані: u — вздовж x, v — вздовж y
const onTop = (b: Box, list: [number, number][]) => list.map(([u, v]) => [b.x + u, b.y + v, b.z + b.h] as [number, number, number]);

function Glow({ d, delay = 0, fill = "none", width = 1.4 }: { d: string; delay?: number; fill?: string; width?: number }) {
  return (
    <motion.path
      d={d}
      fill={fill}
      stroke={GOLD_HI}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#iso-glow-strong)"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: [0, 1, 0.75, 1] }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay }}
    />
  );
}

function Floor({ r = 70 }: { r?: number }) {
  // золоте «світло з-під підлоги» у формі ромба-соти
  const ring: [number, number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    ring.push([r * Math.cos(a), r * Math.sin(a), 0]);
  }
  return (
    <g>
      <ellipse cx="0" cy="0" rx={r * 1.05} ry={r * 0.55} fill="url(#iso-floor)" />
      <path d={path(ring)} fill="none" stroke={GOLD} strokeOpacity={0.35} strokeWidth={1} strokeDasharray="3 5" />
    </g>
  );
}

function Laptop() {
  const base: Box = { x: -34, y: -18, z: 0, w: 68, d: 44, h: 5 };
  const screen: Box = { x: -34, y: -22, z: 5, w: 68, d: 4, h: 44 };
  const keys: string[] = [];
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 7; c++) keys.push(path(onTop(base, [[6 + c * 8.2, 6 + r * 7], [12 + c * 8.2, 6 + r * 7], [12 + c * 8.2, 11 + r * 7], [6 + c * 8.2, 11 + r * 7]])));
  return (
    <>
      <Block b={screen} />
      <Glow d={path(onFront(screen, [[5, 5], [63, 5], [63, 40], [5, 40]]))} delay={0.6} width={1} />
      <Glow d={[path(onFront(screen, [[11, 33], [34, 33]]), false), path(onFront(screen, [[11, 27], [48, 27]]), false), path(onFront(screen, [[11, 21], [28, 21]]), false), path(onFront(screen, [[11, 15], [42, 15]]), false)].join(" ")} delay={0.9} width={1.6} />
      <Block b={base} delay={0.2} />
      <g fill="none" stroke={GOLD} strokeOpacity={0.6} strokeWidth={0.8}>
        <path d={keys.join(" ")} />
      </g>
      <Glow d={path(onTop(base, [[24, 31], [44, 31], [44, 40], [24, 40]]))} delay={1.1} width={1} />
    </>
  );
}

function Router() {
  const body: Box = { x: -32, y: -16, z: 0, w: 64, d: 32, h: 11 };
  const ant = (u: number) => path([[body.x + u, body.y + 3, body.z + body.h], [body.x + u, body.y + 3, body.z + body.h + 30]], false);
  const leds = [10, 18, 26, 34, 42].map((u) => {
    const [cx, cy] = p(body.x + u, body.y + body.d, body.z + 5.5);
    return <motion.circle key={u} cx={cx} cy={cy} r={1.8} fill={GOLD_HI} filter="url(#iso-glow-strong)" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.6, repeat: Infinity, delay: u / 30 }} />;
  });
  const [ax, ay] = p(body.x + 32, body.y + 3, body.z + body.h + 34);
  return (
    <>
      <Block b={body} />
      <g stroke={GOLD} strokeWidth={2.2} strokeLinecap="round" filter="url(#iso-glow)">
        <path d={ant(6)} />
        <path d={ant(58)} />
      </g>
      {leds}
      {[16, 28, 40].map((r, i) => (
        <motion.path
          key={r}
          d={`M${(ax - r).toFixed(1)} ${(ay - 4).toFixed(1)} A${r} ${r * 0.7} 0 0 1 ${(ax + r).toFixed(1)} ${(ay - 4).toFixed(1)}`}
          fill="none"
          stroke={GOLD_HI}
          strokeWidth={1.6}
          strokeLinecap="round"
          filter="url(#iso-glow-strong)"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35 }}
        />
      ))}
    </>
  );
}

function Power() {
  const ups: Box = { x: -40, y: -14, z: 0, w: 30, d: 34, h: 52 };
  const batt: Box = { x: 12, y: -6, z: 0, w: 30, d: 22, h: 16 };
  const [c1x, c1y] = p(ups.x + ups.w, ups.y + 17, 10);
  const [c2x, c2y] = p(batt.x, batt.y + 11, 8);
  return (
    <>
      <Block b={ups} />
      <Glow d={path(onFront(ups, [[6, 38], [24, 38], [24, 46], [6, 46]]))} delay={0.7} width={1} />
      <Glow d={path(onFront(ups, [[17, 32], [10, 20], [16, 20], [12, 8], [21, 23], [15, 23], [17, 32]]))} delay={0.9} fill="rgba(240,207,120,0.25)" />
      <motion.path d={`M${c1x.toFixed(1)} ${c1y.toFixed(1)} C${(c1x + 14).toFixed(1)} ${(c1y + 16).toFixed(1)} ${(c2x - 14).toFixed(1)} ${(c2y + 12).toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)}`} fill="none" stroke={GOLD} strokeWidth={1.6} strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      <Block b={batt} delay={0.3} />
      {[0, 1, 2].map((i) => (
        <motion.path key={i} d={path(onTop(batt, [[4 + i * 9, 5], [10 + i * 9, 5], [10 + i * 9, 17], [4 + i * 9, 17]]))} fill={GOLD_HI} fillOpacity={0.5} filter="url(#iso-glow-strong)" animate={{ fillOpacity: [0.15, 0.7, 0.15] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }} />
      ))}
    </>
  );
}

function Business() {
  const a: Box = { x: -54, y: -10, z: 0, w: 32, d: 28, h: 34 };
  const b: Box = { x: 18, y: -26, z: 0, w: 32, d: 28, h: 40 };
  const hub: Box = { x: -8, y: 6, z: 0, w: 14, d: 14, h: 10 };
  const awning = (bx: Box) =>
    [0, 1, 2, 3].map((i) => path(onFront(bx, [[4 + i * 6.5, bx.h - 6], [10 + i * 6.5, bx.h - 6], [9 + i * 6.5, bx.h - 12], [5 + i * 6.5, bx.h - 12]]))).join(" ");
  const door = (bx: Box) => path(onFront(bx, [[11, 0], [21, 0], [21, 16], [11, 16]]));
  const line = (x1: number, y1: number, x2: number, y2: number) => path([[x1, y1, 0], [x2, y1, 0], [x2, y2, 0]], false);
  return (
    <>
      <motion.path d={line(-22, 10, -1, 6) + " " + line(-1, 6, 18, -12)} fill="none" stroke={GOLD_HI} strokeWidth={1.4} strokeDasharray="3 4" filter="url(#iso-glow-strong)" animate={{ strokeDashoffset: [0, -14] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
      <Block b={b} />
      <Glow d={awning(b)} delay={0.8} fill="rgba(240,207,120,0.2)" width={1} />
      <Glow d={door(b)} delay={1} width={1} />
      <Block b={hub} delay={0.2} top="url(#iso-top-hot)" />
      <Block b={a} delay={0.3} />
      <Glow d={awning(a)} delay={0.9} fill="rgba(240,207,120,0.2)" width={1} />
      <Glow d={door(a)} delay={1.1} width={1} />
    </>
  );
}

const scenes: Record<ServiceIcon, () => React.ReactElement> = { laptop: Laptop, network: Router, power: Power, business: Business };

export function IsoArt({ icon }: { icon: ServiceIcon }) {
  const Scene = scenes[icon];
  return (
    <svg aria-hidden="true" viewBox="-96 -74 192 118" className="h-auto w-[88%] overflow-visible">
      <defs>
        <linearGradient id="iso-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b4520" />
          <stop offset="1" stopColor="#2a2012" />
        </linearGradient>
        <linearGradient id="iso-top-hot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F0CF78" />
          <stop offset="1" stopColor="#9C7420" />
        </linearGradient>
        <linearGradient id="iso-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#221b0f" />
          <stop offset="1" stopColor="#0f0c08" />
        </linearGradient>
        <linearGradient id="iso-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#15110b" />
          <stop offset="1" stopColor="#080706" />
        </linearGradient>
        <radialGradient id="iso-floor">
          <stop offset="0" stopColor="#C9A04A" stopOpacity="0.32" />
          <stop offset="1" stopColor="#C9A04A" stopOpacity="0" />
        </radialGradient>
        <filter id="iso-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="iso-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g transform="translate(0 18)">
        <Floor />
      </g>
      <g transform="translate(0 18)">
        <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <Scene />
        </motion.g>
      </g>
    </svg>
  );
}
