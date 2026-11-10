"use client";

import { MotionConfig } from "framer-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  // Поважаємо системне налаштування «зменшити рух»
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
