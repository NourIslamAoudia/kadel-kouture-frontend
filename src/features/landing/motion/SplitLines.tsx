import type { CSSProperties } from "react";
import { cx } from "../lib/cx";
import { emphasis } from "../lib/emphasis";

interface SplitLinesProps {
  /** Une entrée par ligne : les retours à la ligne sont un choix typographique. */
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  /** Classes par ligne (indentations, décalages). */
  lineClassNames?: Array<string | undefined>;
  /** Délai en secondes. */
  delay?: number;
  /** Écart entre deux lignes, en secondes. */
  stagger?: number;
  onMount?: boolean;
}

/**
 * Titre révélé ligne par ligne, chaque ligne sortant de son propre masque.
 * Composant serveur : l'animation est en CSS (landing.css), déclenchée par RevealObserver.
 */
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
  return (
    <Tag
      id={id}
      className={className}
      data-reveal={onMount ? "lines-mount" : "lines"}
      style={
        {
          "--kk-delay": `${delay}s`,
          "--kk-stagger": `${stagger}s`,
        } as CSSProperties
      }
    >
      {lines.map((line, index) => (
        <span key={index} className={cx("kk-line", lineClassNames?.[index])}>
          <span
            className="kk-line__inner"
            style={{ "--i": index } as CSSProperties}
          >
            {emphasis(line)}
          </span>
        </span>
      ))}
    </Tag>
  );
}
