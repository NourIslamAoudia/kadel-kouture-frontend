"use client";

import { motion } from "motion/react";
import { emphasis } from "../lib/emphasis";
import { cx } from "../lib/cx";
import { EASE_OUT } from "./ease";

interface SplitLinesProps {
  /** Une entrée par ligne : les retours à la ligne sont un choix typographique. */
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  /** Classes par ligne (indentations, décalages). */
  lineClassNames?: Array<string | undefined>;
  delay?: number;
  stagger?: number;
  onMount?: boolean;
}

/** Titre révélé ligne par ligne, chaque ligne sortant de son propre masque. */
export function SplitLines({
  lines,
  as: Tag = "h2",
  id,
  className,
  lineClassNames,
  delay = 0,
  stagger = 0.09,
  onMount = false,
}: SplitLinesProps) {
  const trigger = onMount
    ? { animate: "shown" }
    : {
        whileInView: "shown",
        viewport: { once: true, margin: "0px 0px -12% 0px" },
      };

  return (
    <Tag id={id} className={className}>
      <motion.span
        className="block"
        initial="hidden"
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
        {...trigger}
      >
        {lines.map((line, index) => (
          <span key={index} className={cx("kk-line", lineClassNames?.[index])}>
            <motion.span
              className="kk-line__inner"
              variants={{
                hidden: { y: "112%" },
                shown: { y: "0%", transition: { duration: 1.2, ease: EASE_OUT } },
              }}
            >
              {emphasis(line)}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
