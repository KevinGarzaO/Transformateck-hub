import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@/components/shared/Analytics";
import { ANALYTICS_CONFIG } from "@/lib/analytics/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Transformateck | Innovation Lab",
  description: "Transform your ideas into high-fidelity products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        {children}
        <Suspense>
          <Analytics 
            gaId={ANALYTICS_CONFIG.GA4.transformateck}
            metaPixelId={ANALYTICS_CONFIG.META_PIXEL.transformateck}
          />
        </Suspense>
      </body>
    </html>
  );
}
