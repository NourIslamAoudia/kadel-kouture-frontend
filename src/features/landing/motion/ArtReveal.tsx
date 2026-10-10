/**
 * L'image « se développe » dans son cadre : un rideau s'ouvre pendant que
 * l'image, légèrement agrandie, reprend sa taille.
 * On observe le conteneur et l'on masque l'enfant : un élément entièrement masqué
 * par son propre clip-path n'est jamais signalé comme visible par le navigateur.
 * Composant serveur : l'animation est en CSS (landing.css), déclenchée par RevealObserver.
 */
export function ArtReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className} data-reveal="art">
      <div className="kk-art">{children}</div>
    </div>
  );
}
