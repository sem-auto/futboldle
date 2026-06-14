import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import GoogleAnalyticsPageView from "@/components/GoogleAnalyticsPageView";
import ShareSheetHost from "@/components/ShareSheetHost";
import AchievementToast from "@/components/AchievementToast";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-Q4DBT40EYL";
const SITE_URL = "https://futboldle.es";
const SITE_TITLE = "Futboldle";
const SITE_DESCRIPTION = "Minijuegos diarios para enfermos de la Liga BBVA.";
const SOCIAL_IMAGE_URL = `${SITE_URL}/og-image.png`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Futboldle",
  alternateName: ["Wordle futbol", "Minijuegos Liga BBVA", "Hombres BBVA"],
  url: SITE_URL,
  applicationCategory: "GameApplication",
  operatingSystem: "Web",
  inLanguage: "es",
  description: SITE_DESCRIPTION,
  genre: ["Futbol", "Trivia", "Word game", "Nostalgia deportiva"],
  image: SOCIAL_IMAGE_URL,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  keywords:
    "minijuegos de futbol, minijuegos Liga Espanola, wordle futbol, Liga BBVA, Hombres BBVA, futbol retro, futbol nostalgia, juegos futbol antiguos",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Futboldle",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Futboldle",
  manifest: "/manifest.webmanifest",
  authors: [{ name: "Futboldle" }],
  creator: "Futboldle",
  publisher: "Futboldle",
  category: "games",
  keywords: [
    "Futboldle",
    "minijuegos de futbol",
    "minijuegos Liga Espanola",
    "juegos de futbol",
    "juegos futbol online",
    "wordle futbol",
    "wordle de futbol",
    "Liga BBVA",
    "Hombres BBVA",
    "hombres bbva juego",
    "minijuegos hombres bbva",
    "juego futbol antiguo",
    "futbol retro",
    "futbol nostalgia",
    "futbol antiguo",
    "juego Liga BBVA",
    "juegos Liga BBVA",
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
        url: SOCIAL_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Futboldle - minijuegos diarios para enfermos de la Liga BBVA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SOCIAL_IMAGE_URL],
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
        <meta property="og:title" content="Futboldle" />
        <meta property="og:description" content="Minijuegos diarios para enfermos de la Liga BBVA." />
        <meta property="og:image" content="https://futboldle.es/og-image.png" />
        <meta property="og:image:secure_url" content="https://futboldle.es/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://futboldle.es" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Futboldle" />
        <meta name="twitter:description" content="Minijuegos diarios para enfermos de la Liga BBVA." />
        <meta name="twitter:image" content="https://futboldle.es/og-image.png" />
        <meta name="twitter:image:alt" content="Futboldle" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0b1410" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
        {children}
        <ShareSheetHost />
        <AchievementToast />
      </body>
    </html>
  );
}
