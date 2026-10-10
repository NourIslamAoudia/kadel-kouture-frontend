"use client";

import { MotionConfig } from "motion/react";
import { EASE_OUT } from "./ease";

/** Respecte le réglage « réduire les animations » du système. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE_OUT }}>
      {children}
    </MotionConfig>
  );
}
