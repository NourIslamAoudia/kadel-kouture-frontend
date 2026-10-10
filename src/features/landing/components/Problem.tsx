"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { LandingCopy } from "../content/fr";
import { SectionLabel } from "./ui";

const PAPER = "#f6f1ea";
const NIGHT = "#1a1714";

function Word({
  children,
  progress,
  range,
  still,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, still ? [1, 1] : [0.14, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

/**
 * 5.3 — Audit des accusations et étiquetage.
 * La salle s'assombrit, l'histoire s'éclaire mot à mot, puis vient
 * l'aversion à la perte : 80 € barrés, 12 €.
 * Avec « réduire les animations », tout est affiché d'emblée (classes motion-reduce).
 */
export function Problem({ copy }: { copy: LandingCopy }) {
  const { problem } = copy;
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const on = (from: number, to: number) => (still ? [1, 1] : [from, to]);

  // La lumière baisse en entrant ; en sortant, la salle sombre glisse vers le haut.
  const background = useTransform(scrollYProgress, [0, 0.12], [PAPER, NIGHT]);
  const color = useTransform(scrollYProgress, [0, 0.12], [NIGHT, PAPER]);
  const aside = useTransform(scrollYProgress, [0.52, 0.6], on(0, 1));
  const loss = useTransform(scrollYProgress, [0.6, 0.68], on(0, 1));
  const strike = useTransform(scrollYProgress, [0.68, 0.76], on(0, 1));
  const repair = useTransform(scrollYProgress, [0.74, 0.82], on(0, 1));
  const repairY = useTransform(scrollYProgress, [0.74, 0.82], still ? [0, 0] : [24, 0]);

  const words = problem.story.split(" ");
  const start = 0.12;
  const end = 0.5;
  const step = (end - start) / words.length;

  return (
    <section ref={ref} aria-label={problem.label} className="relative h-[320svh] motion-reduce:h-auto">
      <motion.div
        className="sticky top-0 flex h-svh items-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:bg-night! motion-reduce:py-32 motion-reduce:text-paper!"
        style={{ backgroundColor: background, color, ["--accent" as string]: "var(--color-ochre)" }}
      >
        <div className="kk-container">
          <SectionLabel index={problem.index} label={problem.label} className="mb-8 opacity-60 lg:mb-12" />

          <p className="max-w-[22ch] font-display text-[clamp(1.75rem,4.4vw,4.1rem)] leading-[1.12] tracking-[-0.015em]">
            {words.map((word, index) => (
              <Word
                key={index}
                progress={scrollYProgress}
                range={[start + index * step, start + (index + 1) * step]}
                still={still}
              >
                {word}
              </Word>
            ))}
          </p>

          <motion.p
            style={{ opacity: aside }}
            className="mt-8 max-w-[42ch] font-display text-[clamp(1.15rem,2vw,1.6rem)] text-ochre italic lg:mt-10"
          >
            {problem.aside}
          </motion.p>

          <motion.div
            style={{ opacity: loss }}
            className="mt-12 grid max-w-[60rem] gap-8 border-t border-current/15 pt-8 sm:grid-cols-2 sm:gap-12 lg:mt-16"
          >
            <p className="flex flex-col gap-2">
              <span className="text-[0.72rem] font-mono font-bold tracking-[0.12em] uppercase opacity-60">
                {problem.replace}
              </span>
              <span className="relative w-fit font-display text-[clamp(2.6rem,5.5vw,4.6rem)] leading-none opacity-55">
                {problem.replacePrice}
                <motion.span
                  aria-hidden="true"
                  className="absolute top-[52%] -right-[6%] -left-[6%] h-[3px] origin-left bg-terracotta"
                  style={{ scaleX: strike }}
                />
              </span>
            </p>
            <p className="flex flex-col gap-2">
              <span className="text-[0.72rem] font-mono font-bold tracking-[0.12em] uppercase opacity-60">
                {problem.repair}
              </span>
              <motion.span
                className="w-fit font-display text-[clamp(2.6rem,5.5vw,4.6rem)] leading-none text-ochre italic"
                style={{ opacity: repair, y: repairY }}
              >
                {problem.repairPrice}
              </motion.span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
