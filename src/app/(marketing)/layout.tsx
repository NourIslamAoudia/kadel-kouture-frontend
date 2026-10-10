import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "@features/landing/landing.css";

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

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${display.variable} ${body.variable} kk-site`}>
      {children}
    </div>
  );
}
