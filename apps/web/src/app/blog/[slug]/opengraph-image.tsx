import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/services/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Transformateck | Comunidad de IA en LATAM";

interface OpengraphImageProps {
  params: Promise<{ slug: string }>;
}

export default async function OpengraphImage({ params }: OpengraphImageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = post?.title || "Comunidad de IA en LATAM";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          color: "#ffffff",
          padding: "70px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: "#4ECCA3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#050505",
              fontWeight: 900,
              fontSize: 30,
            }}
          >
            T
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 4 }}>
            TRANSFORMATECK
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#4ECCA3",
              backgroundColor: "rgba(78,204,163,0.15)",
              borderRadius: 999,
              padding: "8px 24px",
            }}
          >
            BLOG DE IA · LATAM
          </div>
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.1,
            textTransform: "uppercase",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            www.transformateck.com
          </div>
          <div
            style={{
              width: 260,
              height: 8,
              borderRadius: 999,
              backgroundColor: "#4ECCA3",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
