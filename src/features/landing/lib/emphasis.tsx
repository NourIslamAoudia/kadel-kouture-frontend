import { Fragment, type ReactNode } from "react";

/**
 * Les mots entre astérisques passent en italique d'accent :
 * "une *deuxième vie.*" → une <em>deuxième vie.</em>
 * Les traductions gardent ainsi la main sur la mise en valeur.
 */
export function emphasis(text: string): ReactNode {
  return text
    .split("*")
    .map((part, index) =>
      index % 2 === 1 ? (
        <em key={index}>{part}</em>
      ) : (
        <Fragment key={index}>{part}</Fragment>
      ),
    );
}
