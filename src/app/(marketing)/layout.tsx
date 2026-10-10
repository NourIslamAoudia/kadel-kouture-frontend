import { Jost, Newsreader } from "next/font/google";
import "@features/landing/landing.css";

// Titres : serif éditorial de magazine, axe optique pour des déliés fins en grand.
const display = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-landing-display",
  display: "swap",
});

// Texte : géométrique dans la lignée de Futura, la police de la mode.
const body = Jost({
  subsets: ["latin"],
  variable: "--font-landing-body",
  display: "swap",
});

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${body.variable} kk-site`}>{children}</div>;
}
