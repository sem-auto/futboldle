import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import GoogleAnalyticsPageView from "@/components/GoogleAnalyticsPageView";
import ShareSheetHost from "@/components/ShareSheetHost";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-Q4DBT40EYL";

export const metadata: Metadata = {
  metadataBase: new URL("https://futboldle.es"),
  title: "Futboldle ⚽",
  description: "Minijuegos diarios para enfermos de la Liga BBVA.",
  keywords: [
    "Futboldle",
    "minijuegos de fútbol",
    "minijuegos de futbol",
    "minijuegos Liga Española",
    "wordle fútbol",
    "wordle futbol",
    "Liga BBVA",
    "Hombres BBVA",
    "juego fútbol antiguo",
    "juego futbol antiguo",
    "fútbol retro",
    "futbol retro",
    "fútbol nostalgia",
    "LaLiga nostalgia",
    "adivina futbolista",
  ],
  alternates: {
    canonical: "https://futboldle.es",
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
    title: "Futboldle ⚽",
    description: "Minijuegos diarios para enfermos de la Liga BBVA.",
    url: "https://futboldle.es",
    type: "website",
    images: [
      {
        url: "https://futboldle.es/icon.png",
        width: 512,
        height: 512,
        alt: "Futboldle",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Futboldle ⚽",
    description: "Minijuegos diarios para enfermos de la Liga BBVA.",
    images: ["https://futboldle.es/icon.png"],
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0b1410" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
