import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { AppProviders } from "./providers";
import "../index.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  // Pas de préchargement : la landing (route la plus visitée) n'utilise pas ces polices.
  preload: false,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Kadel Kouture",
  description:
    "Réparation, retouche et personnalisation de vêtements par des couturiers de Barcelone.",
  icons: { icon: "/favicon.svg" },
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
      className={`${cormorant.variable} ${dmSans.variable}`}
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
