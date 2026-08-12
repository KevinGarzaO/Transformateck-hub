import type { Metadata } from "next";
import Landing from "@/components/home/Landing";

const siteUrl = "https://www.transformateck.com";

export const metadata: Metadata = {
  title: "Comunidad de IA en LATAM | Blog, Investigación y Networking",
  description:
    "La comunidad definitiva de Inteligencia Artificial en Latinoamérica. Análisis de modelos LLM, agentes autónomos, visión por computadora, guías prácticas y casos de éxito para desarrolladores, investigadores y creadores.",
  alternates: {
    canonical: siteUrl,
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
    description: "Comunidad de Inteligencia Artificial en Latinoamérica.",
    images: [`${siteUrl}/hero.png`],
  },
};

export default function HomePage() {
  return <Landing />;
}
