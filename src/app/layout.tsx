import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import GoogleAnalyticsPageView from "@/components/GoogleAnalyticsPageView";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-Q4DBT40EYL";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
