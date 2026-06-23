import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import GoogleAnalyticsPageView from "@/components/GoogleAnalyticsPageView";
import ShareSheetHost from "@/components/ShareSheetHost";
import AchievementToast from "@/components/AchievementToast";
import PwaRuntime from "@/components/PwaRuntime";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-Q4DBT40EYL";
const SITE_URL = "https://futboldle.es";
const SITE_TITLE = "Futboldle | Juegos diarios de fútbol, Liga BBVA y Mundiales";
const SITE_DESCRIPTION = "Juega gratis a los mejores juegos diarios de fútbol. Wordle BBVA, Mundialdle, Top10 históricos, trayectorias, cromos y retos mundialistas.";
const SOCIAL_IMAGE_URL = `${SITE_URL}/og-image.png`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Futboldle",
      url: SITE_URL,
      inLanguage: "es",
      description: SITE_DESCRIPTION,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#app`,
      name: "Futboldle",
      url: SITE_URL,
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
    {
      "@type": "Game",
      "@id": `${SITE_URL}/#game`,
      name: "Futboldle",
      alternateName: ["Wordle fútbol", "Minijuegos Liga BBVA", "Hombres BBVA", "Mundialdle"],
      url: SITE_URL,
      gamePlatform: "Web",
      inLanguage: "es",
      description: SITE_DESCRIPTION,
      genre: ["Fútbol", "Trivia", "Nostalgia deportiva"],
      image: SOCIAL_IMAGE_URL,
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s",
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
    "minijuegos de fútbol",
    "minijuegos Liga Española",
    "juegos de fútbol",
    "juegos fútbol online",
    "wordle fútbol",
    "wordle de fútbol",
    "Liga BBVA",
    "Hombres BBVA",
    "hombres bbva juego",
    "minijuegos hombres bbva",
    "juego fútbol antiguo",
    "fútbol retro",
    "fútbol nostalgia",
    "fútbol antiguo",
    "juego Liga BBVA",
    "juegos Liga BBVA",
    "trivia fútbol",
    "adivinar futbolistas",
    "adivina el jugador",
    "LaLiga nostalgia",
    "adivina futbolista",
    "Mundialdle",
    "wordle mundial",
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
        alt: "Futboldle - juegos diarios de fútbol nostalgia",
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
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
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
        <PwaRuntime />
      </body>
    </html>
  );
}
