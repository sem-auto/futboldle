import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Futboldle — Minijuegos diarios para enfermos de LaLiga",
  description: "Adivina el futbolista oculto del día en 8 intentos. Wordle BBVA, Trayectoria y más. La nostalgia de la Liga BBVA 2005-2016.",
  keywords: "futboldle, wordle futbol, liga bbva, hombres bbva, adivina futbolista, laliga nostalgia",
  openGraph: {
    title: "Futboldle ⚽",
    description: "Minijuegos diarios para enfermos de LaLiga.",
    type: "website",
  },
  themeColor: "#0e0e13",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
