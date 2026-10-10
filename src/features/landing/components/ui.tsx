import Link from "next/link";
import { ArrowIcon } from "../art/Ornaments";
import { cx } from "../lib/cx";

interface FrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: "black" | "oak" | "white";
  /** Passe-partout autour de l'œuvre. */
  mat?: boolean;
}

/** Cadre de galerie : baguette, passe-partout, œuvre texturée. */
export function Frame({ children, className, variant = "black", mat = true }: FrameProps) {
  return (
    <div
      className={cx(
        "kk-frame",
        variant === "oak" && "kk-frame--oak",
        variant === "white" && "kk-frame--white",
        className,
      )}
    >
      <div className={cx("kk-frame__mat", !mat && "kk-frame__mat--flush")}>
        <div className="kk-frame__art kk-grain">{children}</div>
      </div>
    </div>
  );
}

/** « (03) Le catalogue » : le numéro de salle de chaque section. */
export function SectionLabel({
  index,
  label,
  className,
}: {
  index?: string;
  label: string;
  className?: string;
}) {
  return (
    <p className={cx("kk-label", className)}>
      {index ? <span className="kk-label__index">({index})</span> : null}
      <span>{label}</span>
    </p>
  );
}

interface ActionLinkProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "light" | "ghost";
  size?: "default" | "small";
  className?: string;
}

/** Bouton principal : un seul geste sur toute la page, commander. */
export function ActionLink({
  href = "/commander",
  children,
  variant = "primary",
  size = "default",
  className,
}: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={cx(
        "kk-btn",
        variant === "light" && "kk-btn--light",
        variant === "ghost" && "kk-btn--ghost",
        size === "small" && "kk-btn--small",
        className,
      )}
    >
      <span>{children}</span>
      <span className="kk-btn__icon">
        <ArrowIcon />
      </span>
    </Link>
  );
}
