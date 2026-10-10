import { Lora, Open_Sans, Space_Mono } from "next/font/google";
import "@features/landing/landing.css";

// Titres : serif chaleureux et lisible, avec une vraie italique pour les mots mis en valeur.
const display = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-landing-display",
  display: "swap",
});

// Texte courant.
const body = Open_Sans({
  subsets: ["latin"],
  variable: "--font-landing-body",
  display: "swap",
});

// Petits labels en capitales : monospace gras, façon étiquette d'atelier.
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-landing-mono",
  display: "swap",
});

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} kk-site`}>{children}</div>
  );
}
