import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import { AppProviders } from "./providers";
import "../index.css";

// Une seule typographie pour tout le site (landing, commande, admin).
// Titres : serif éditorial à fort contraste, avec une italique de couture.
const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-landing-display",
  display: "swap",
});

// Texte et interface : sans-serif net, lisible aux petites tailles.
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-landing-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kadel Kouture",
  description:
    "Réparation, retouche et personnalisation de vêtements par des couturiers de Barcelone.",
  // Monogramme KK : SVG pour les navigateurs, PNG pour les écrans d'accueil (iOS, Android).
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning : le script ci-dessous ajoute une classe à <html> avant l'hydratation.
    <html
      lang="fr"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Landing : les animations d'apparition ne s'activent que si JavaScript tourne (sinon tout reste visible). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('kk-anim')",
          }}
        />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
