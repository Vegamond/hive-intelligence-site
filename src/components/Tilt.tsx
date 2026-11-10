"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// 3D-нахил картки за курсором з відблиском, що ковзає по поверхні (лише миша)
export function Tilt({ children, className = "", max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 180, damping: 18 });
  const glare = useTransform([mx, my] as never, ([x, y]: number[]) => `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(240,207,120,0.16), transparent 55%)`);

  const hover = useMotionValue(0);
  const glareOpacity = useSpring(hover, { stiffness: 120, damping: 20 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    hover.set(1);
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    hover.set(0);
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div className={`h-full [perspective:900px] ${className}`}>
      <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative h-full">
        {children}
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: glare, opacity: glareOpacity }} />
      </motion.div>
    </div>
  );
}
