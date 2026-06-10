import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import GoogleAnalyticsPageView from "@/components/GoogleAnalyticsPageView";
import ShareSheetHost from "@/components/ShareSheetHost";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-Q4DBT40EYL";

export const metadata: Metadata = {
  metadataBase: new URL("https://futboldle.es"),
  title: "Futboldle — Minijuegos diarios para enfermos de la Liga BBVA",
  description: "Wordle BBVA y más. La nostalgia de la Liga BBVA 2005-2016. Hombres BBVA.",
  keywords: "futboldle, wordle futbol, liga bbva, hombres bbva, adivina futbolista, laliga nostalgia",
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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Futboldle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Futboldle ⚽",
    description: "Minijuegos diarios para enfermos de la Liga BBVA.",
    images: ["/og-image.png"],
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
