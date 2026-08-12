import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Transformateck | Comunidad de IA en LATAM",
    short_name: "Transformateck",
    description:
      "Comunidad de Inteligencia Artificial en Latinoamérica. Análisis de modelos LLM, agentes autónomos, guías prácticas y casos de éxito.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
