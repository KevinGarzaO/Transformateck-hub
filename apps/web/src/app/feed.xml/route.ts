import { getPublicPosts, getTimestampMs } from "@/lib/services/blog";

export const dynamic = "force-static";
export const revalidate = 60;

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getPublicPosts();
  const siteUrl = "https://transformateck.com";
  const lastBuild = posts.length
    ? new Date(getTimestampMs(posts[0].date) || Date.now()).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const dateMs = getTimestampMs(post.date);
      const updatedMs = getTimestampMs(post.updatedAt);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${dateMs ? new Date(dateMs).toUTCString() : lastBuild}</pubDate>
      <dc:creator>${escapeXml(post.authorName || "Equipo Transformateck")}</dc:creator>
      <description>${escapeXml(post.excerpt)}</description>
      ${
        post.image
          ? `<enclosure url="${escapeXml(post.image)}" type="image/jpeg" />
      `
          : ""
      }<category>${escapeXml(post.type || "Blog")}</category>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Transformateck | Blog de IA en LATAM</title>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Artículos, investigaciones y guías sobre Inteligencia Artificial en Latinoamérica.</description>
    <language>es</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <generator>Transformateck Next.js</generator>
    <image>
      <url>${siteUrl}/hero.png</url>
      <title>Transformateck | Blog de IA en LATAM</title>
      <link>${siteUrl}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
