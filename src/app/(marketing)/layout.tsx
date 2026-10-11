import "@features/landing/landing.css";

/** Pages vitrine : styles de la landing (les polices sont chargées dans le layout racine). */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="kk-site">{children}</div>;
}
