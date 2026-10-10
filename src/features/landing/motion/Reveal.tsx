import { createElement, type CSSProperties } from "react";

type RevealTag = "div" | "p" | "li" | "span" | "figure" | "footer";

interface RevealProps {
  children: React.ReactNode;
  as?: RevealTag;
  className?: string;
  /** Délai en secondes. */
  delay?: number;
  /** Décalage vertical de départ, en pixels. */
  y?: number;
  /** Anime au chargement plutôt qu'à l'entrée dans l'écran. */
  onMount?: boolean;
}

/**
 * Apparition douce : l'élément monte de quelques pixels et se pose.
 * Composant serveur : l'animation est en CSS (landing.css), déclenchée par RevealObserver.
 */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 28,
  onMount = false,
}: RevealProps) {
  return createElement(
    as,
    {
      className,
      "data-reveal": onMount ? "mount" : "scroll",
      style: { "--kk-delay": `${delay}s`, "--kk-y": `${y}px` } as CSSProperties,
    },
    children,
  );
}
