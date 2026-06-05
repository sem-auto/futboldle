import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Futboldle — Minijuegos diarios para enfermos de la Liga BBVA",
  description: "Wordle BBVA y más. La nostalgia de la Liga BBVA 2005-2016. Hombres BBVA.",
  keywords: "futboldle, wordle futbol, liga bbva, hombres bbva, adivina futbolista, laliga nostalgia",
  openGraph: {
    title: "Futboldle ⚽",
    description: "Minijuegos diarios para enfermos de la Liga BBVA.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0b1410" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
