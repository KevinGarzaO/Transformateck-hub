import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@/components/shared/Analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://transformateck.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Transformateck | Comunidad de IA en LATAM",
    template: "%s | Transformateck",
  },
  description:
    "Comunidad de Inteligencia Artificial en Latinoamérica. Análisis de modelos LLM, agentes autónomos, visión por computadora, guías prácticas y casos de éxito para desarrolladores, investigadores y creadores.",
  applicationName: "Transformateck",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
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
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: "Transformateck | Comunidad de IA",
    title: "Transformateck | Comunidad de IA en LATAM",
    description:
      "Comunidad de Inteligencia Artificial en Latinoamérica. Análisis, guías y casos de éxito en español.",
    images: [
      {
        url: `${siteUrl}/hero.png`,
        width: 1200,
        height: 630,
        alt: "Transformateck — Comunidad de IA en LATAM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transformateck | Comunidad de IA en LATAM",
    description:
      "Comunidad de Inteligencia Artificial en Latinoamérica.",
    images: [`${siteUrl}/hero.png`],
  },
  verification: {
    google: "googleab820c4f0cd7adc2",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
  colorScheme: "dark",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Transformateck",
  url: siteUrl,
  logo: `${siteUrl}/hero.png`,
  description:
    "Innovation Lab y comunidad de Inteligencia Artificial en Latinoamérica.",
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Transformateck",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationLd, websiteLd]),
          }}
        />
        {children}
        <Suspense>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
