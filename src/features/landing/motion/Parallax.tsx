"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Déplacement maximal en pixels, positif = l'élément monte plus vite que la page. */
  offset?: number;
}

export function Parallax({ children, className, offset = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = reduce ? 0 : offset;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
