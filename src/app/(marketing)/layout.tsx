import { Bodoni_Moda, Jost } from "next/font/google";
import "@features/landing/landing.css";

// Titres : Didone de magazine de mode, axe optique pour des déliés fins en grand.
const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-landing-display",
  display: "swap",
});

// Texte, sous-titres et capitales : géométrique dans la lignée de Futura.
const body = Jost({
  subsets: ["latin"],
  variable: "--font-landing-body",
  display: "swap",
});

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${body.variable} kk-site`}>{children}</div>;
}
