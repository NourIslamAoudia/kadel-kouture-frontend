import { Bodoni_Moda, Manrope } from "next/font/google";
import "@features/landing/landing.css";

// Titres : Didone de magazine de mode, axe optique pour des déliés fins en grand.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

// Texte : sans-serif net et chaleureux (cahier des charges, section 4).
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${bodoni.variable} ${manrope.variable} kk-site`}>{children}</div>;
}
