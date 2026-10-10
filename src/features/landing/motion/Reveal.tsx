"use client";

import { motion } from "motion/react";
import { EASE_OUT } from "./ease";

const TAGS = {
  div: motion.div,
  p: motion.p,
  li: motion.li,
  span: motion.span,
  figure: motion.figure,
  footer: motion.footer,
};

interface RevealProps {
  children: React.ReactNode;
  as?: keyof typeof TAGS;
  className?: string;
  delay?: number;
  y?: number;
  /** Anime au chargement plutôt qu'à l'entrée dans l'écran. */
  onMount?: boolean;
}

/** Apparition douce : l'élément monte de quelques pixels et se pose. */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 28,
  onMount = false,
}: RevealProps) {
  const Component = TAGS[as] as typeof motion.div;
  const trigger = onMount
    ? { animate: { opacity: 1, y: 0 } }
    : {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "0px 0px -8% 0px" },
      };

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ duration: 1.1, ease: EASE_OUT, delay }}
      {...trigger}
    >
      {children}
    </Component>
  );
}
