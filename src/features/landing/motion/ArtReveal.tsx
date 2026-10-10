"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE_IN_OUT, EASE_OUT } from "./ease";

interface ArtRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onMount?: boolean;
  /** Sens du rideau. */
  from?: "bottom" | "left" | "right";
}

const HIDDEN = {
  bottom: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * L'œuvre « se développe » dans son cadre : un rideau s'ouvre pendant que
 * l'image, légèrement agrandie, reprend sa taille.
 * On observe le conteneur et non l'œuvre : un élément entièrement masqué par
 * son propre clip-path n'est jamais signalé comme visible par le navigateur.
 * (Le zoom est coupé automatiquement si l'utilisateur réduit les animations.)
 */
export function ArtReveal({
  children,
  className,
  delay = 0,
  onMount = false,
  from = "bottom",
}: ArtRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const shown = onMount || inView;

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ clipPath: HIDDEN[from], scale: 1.16 }}
        animate={shown ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 } : undefined}
        transition={{
          clipPath: { duration: 1.4, ease: EASE_IN_OUT, delay },
          scale: { duration: 2, ease: EASE_OUT, delay },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
