import Image from "next/image";
import Link from "next/link";
import { cx } from "../lib/cx";
import { ArtReveal } from "../motion/ArtReveal";

interface ActionLinkProps {
  href?: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "outline";
  size?: "default" | "small";
  className?: string;
}

/** Bouton principal : un seul geste sur toute la page, commander. */
export function ActionLink({
  href = "/commander",
  children,
  variant = "dark",
  size = "default",
  className,
}: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={cx(
        "kk-btn",
        variant === "light" && "kk-btn--light",
        variant === "outline" && "kk-btn--outline",
        size === "small" && "kk-btn--small",
        className,
      )}
    >
      <span>{children}</span>
      <span className="kk-btn__line" aria-hidden="true" />
    </Link>
  );
}

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cx("kk-label", className)}>{children}</p>;
}

interface EditorialImageProps {
  src: string;
  alt: string;
  /** Rapport largeur / hauteur du cadre, ex. "4 / 5". */
  ratio: string;
  sizes: string;
  /** Point de cadrage, ex. "35% 50%". */
  focus?: string;
  className?: string;
  priority?: boolean;
  reveal?: boolean;
}

/** Image d'une des quatre scènes de la vidéo, cadrée et révélée au défilement. */
export function EditorialImage({
  src,
  alt,
  ratio,
  sizes,
  focus = "50% 50%",
  className,
  priority = false,
  reveal = true,
}: EditorialImageProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={85}
      priority={priority}
      style={{ objectPosition: focus }}
    />
  );

  return (
    <div className={cx("kk-media", className)} style={{ aspectRatio: ratio }}>
      {reveal ? (
        <ArtReveal className="absolute inset-0">{image}</ArtReveal>
      ) : (
        image
      )}
    </div>
  );
}
