import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import GoogleAnalyticsPageView from "@/components/GoogleAnalyticsPageView";
import ShareSheetHost from "@/components/ShareSheetHost";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-Q4DBT40EYL";
const SITE_URL = "https://futboldle.es";
const SITE_TITLE = "Futboldle ⚽";
const SITE_DESCRIPTION =
  "Minijuegos diarios de fútbol nostalgia para enfermos de la Liga BBVA: Wordle fútbol, Top10, trayectorias, cromos y Hombres BBVA.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Futboldle",
  alternateName: ["Wordle fútbol", "Minijuegos Liga BBVA", "Hombres BBVA"],
  url: SITE_URL,
  applicationCategory: "GameApplication",
  operatingSystem: "Web",
  inLanguage: "es",
  description: SITE_DESCRIPTION,
  genre: ["Fútbol", "Trivia", "Word game", "Nostalgia deportiva"],
  image: `${SITE_URL}/icon.png`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  keywords:
    "minijuegos de fútbol, minijuegos Liga Española, wordle fútbol, Liga BBVA, Hombres BBVA, fútbol retro, fútbol nostalgia, juegos fútbol antiguos",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Futboldle",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Futboldle",
  authors: [{ name: "Futboldle" }],
  creator: "Futboldle",
  publisher: "Futboldle",
  category: "games",
  keywords: [
    "Futboldle",
    "minijuegos de fútbol",
    "minijuegos de futbol",
    "minijuegos Liga Española",
    "minijuegos liga española",
    "juegos de fútbol",
    "juegos de futbol",
    "juegos fútbol online",
    "juegos futbol online",
    "wordle fútbol",
    "wordle futbol",
    "wordle de fútbol",
    "wordle de futbol",
    "Liga BBVA",
    "Hombres BBVA",
    "hombres bbva juego",
    "minijuegos hombres bbva",
    "juego fútbol antiguo",
    "juego futbol antiguo",
    "fútbol retro",
    "futbol retro",
    "fútbol nostalgia",
    "futbol nostalgia",
    "fútbol antiguo",
    "futbol antiguo",
    "juego Liga BBVA",
    "juegos Liga BBVA",
    "trivia fútbol",
    "trivia futbol",
    "adivinar futbolistas",
    "adivina el jugador",
    "LaLiga nostalgia",
    "adivina futbolista",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Futboldle",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/icon.png`,
        width: 512,
        height: 512,
        alt: "Futboldle - minijuegos diarios de fútbol nostalgia",
      },
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Futboldle - Liga BBVA y Hombres BBVA",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/icon.png`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          `}
        </Script>
        <Script
          id="futboldle-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0b1410" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
        {children}
        <ShareSheetHost />
      </body>
    </html>
  );
}
