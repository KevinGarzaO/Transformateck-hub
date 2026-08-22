import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublicPosts, formatDate, calculateReadingTime, getTimestampMs } from "@/lib/services/blog";
import { MarkdownRenderer, headingSlug } from "@/components/blog/MarkdownRenderer";
import { ArrowLeft, Calendar, Clock, User, Sparkles, List, Share2, X, Linkedin, MessageCircle } from "lucide-react";
import { BlogAnalytics, ShareButton } from "@/components/blog/BlogAnalytics";
import { SubscribeForm } from "@/components/blog/SubscribeForm";
import { Navbar } from "@/components/shared/Navbar";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generación dinámica de Metadatos SEO para cada entrada
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Artículo no encontrado | Transformateck",
      description: "La entrada del blog solicitada no existe.",
    };
  }

  const postUrl = `https://transformateck.com/blog/${post.slug}`;
  const imageUrl = post.image || "https://transformateck.com/hero.png";
  const dateMs = getTimestampMs(post.date);

  return {
    title: `${post.title} | Blog Transformateck IA`,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "Transformateck | Comunidad de IA",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: dateMs ? new Date(dateMs).toISOString() : undefined,
      authors: [post.authorName || "Transformateck"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

/**
 * Generar rutas estáticas para pre-renderizar en producción
 */
export async function generateStaticParams() {
  const posts = await getPublicPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.markdownContent);
  const formattedDate = formatDate(post.date);
  const postUrl = `https://transformateck.com/blog/${post.slug}`;
  const dateMs = getTimestampMs(post.date);
  const updatedMs = getTimestampMs(post.updatedAt);

  // Artículos relacionados: prioriza la misma categoría
  const allPosts = await getPublicPosts();
  const relatedPosts = [
    ...allPosts.filter((p) => p.id !== post.id && p.type === post.type),
    ...allPosts.filter((p) => p.id !== post.id && p.type !== post.type),
  ].slice(0, 3);

  // División del contenido para insertar el CTA en medio del texto
  const markdownLines = post.markdownContent.split("\n");
  let contentMid = Math.ceil(markdownLines.length / 2);
  for (let i = contentMid; i < Math.min(markdownLines.length, contentMid + 10); i++) {
    if (markdownLines[i].trim() === "") {
      contentMid = i + 1;
      break;
    }
  }
  const markdownFirstHalf = markdownLines.slice(0, contentMid).join("\n");
  const markdownSecondHalf = markdownLines.slice(contentMid).join("\n");

  // Encabezados para la tabla de contenidos
  const headings = markdownLines
    .map((line) => line.trim())
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const isSub = line.startsWith("### ");
      return {
        level: isSub ? 3 : 2,
        text: line.replace(/^#+\s+/, ""),
        id: headingSlug(line.replace(/^#+\s+/, "")),
      };
    });

  // JSON-LD Schema Org para Google Search Console Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": postUrl,
    "url": postUrl,
    "headline": post.title,
    "description": post.excerpt,
    "image": [post.image || "https://transformateck.com/hero.png"],
    "datePublished": dateMs ? new Date(dateMs).toISOString() : undefined,
    "dateModified": updatedMs ? new Date(updatedMs).toISOString() : (dateMs ? new Date(dateMs).toISOString() : undefined),
    "author": {
      "@type": "Person",
      "name": post.authorName || "Equipo Transformateck",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Transformateck",
      "logo": {
        "@type": "ImageObject",
        "url": "https://transformateck.com/hero.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://transformateck.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://transformateck.com/blog",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": postUrl,
      },
    ],
  };

  return (
    <>
      {/* Schema Org Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogAnalytics contentId={post.id} />
      <Navbar />

      <article className="min-h-screen bg-[#050505] text-white pt-28 pb-24 px-6 relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(78,204,163,0.12)_0,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumb visual */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40">
              <li>
                <Link href="/" className="hover:text-[#4ECCA3] transition-colors">Inicio</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-[#4ECCA3] transition-colors">Blog</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#4ECCA3] truncate max-w-[240px]" title={post.title}>{post.title}</li>
            </ol>
          </nav>

          {/* Navegación de regreso */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-[#4ECCA3] hover:border-[#4ECCA3]/40 transition-all mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver al Blog
          </Link>

          {/* Encabezado del artículo */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3.5 py-1 rounded-full bg-[#4ECCA3]/10 border border-[#4ECCA3]/30 text-[#4ECCA3] text-[11px] font-black uppercase tracking-wider">
                {post.type || "Comunidad IA"}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                <Clock size={14} className="text-[#4ECCA3]" />
                {readingTime} min de lectura
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                <Calendar size={14} className="text-[#4ECCA3]" />
                {formattedDate}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-8 uppercase text-white">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl sm:text-2xl text-white/70 leading-relaxed font-light mb-8 border-l-2 border-[#4ECCA3] pl-4">
                {post.excerpt}
              </p>
            )}

            {/* Autor */}
            <div className="flex items-center gap-4 py-4 border-y border-white/10">
              {post.authorImg ? (
                <Image
                  src={post.authorImg}
                  alt={post.authorName || "Autor"}
                  width={48}
                  height={48}
                  className="rounded-full object-cover border-2 border-[#4ECCA3]/50"
                  unoptimized
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#4ECCA3]/20 border border-[#4ECCA3] flex items-center justify-center text-[#4ECCA3]">
                  <User size={20} />
                </div>
              )}
              <div>
                <span className="text-xs uppercase tracking-widest text-white/50 block font-semibold">
                  Escrito por
                </span>
                <span className="text-base font-bold text-white">
                  {post.authorName || "Equipo Transformateck"}
                </span>
              </div>
            </div>
          </header>

          {/* Imagen Principal */}
          {post.image && (
            <div className="mb-14 rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative h-[400px] sm:h-[500px] md:h-[600px]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
                priority
                unoptimized
              />
            </div>
          )}

          {/* Tabla de contenidos */}
          {headings.length > 1 && (
            <div className="mb-12 p-6 rounded-2xl border border-white/10 bg-[#0A0A0A]">
              <h2 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#4ECCA3] mb-4">
                <List size={16} />
                Tabla de Contenidos
              </h2>
              <nav aria-label="Tabla de contenidos">
                <ul className="space-y-2.5">
                  {headings.map((heading) => (
                    <li key={heading.id} style={{ paddingLeft: heading.level === 3 ? 24 : 0 }}>
                      <a
                        href={`#${heading.id}`}
                        className="text-sm font-semibold text-white/70 hover:text-[#4ECCA3] transition-colors leading-snug"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* CTA pequeño al inicio del contenido */}
          <div className="mb-10">
            <SubscribeForm variant="small" centered />
          </div>

          {/* Contenido Markdown con CTA pequeño en medio del texto */}
          <div className="prose prose-invert max-w-none mb-16">
            <MarkdownRenderer content={markdownFirstHalf} />
            <div className="my-12">
              <SubscribeForm variant="small" centered />
            </div>
            <MarkdownRenderer content={markdownSecondHalf} />
          </div>

          {/* CTA grande al final del contenido */}
          <div className="mb-16">
            <SubscribeForm variant="large" centered />
          </div>

          {/* Compartir en redes */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-8 border-y border-white/10 mb-16">
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/50">
              <Share2 size={16} className="text-[#4ECCA3]" />
              Compartir
            </span>
            <div className="flex flex-wrap gap-3">
              <ShareButton
                contentId={post.id}
                platform="twitter"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-xs font-black uppercase tracking-widest text-white hover:border-[#4ECCA3]/50 hover:text-[#4ECCA3] transition-all"
              >
                <X size={14} />
                X / Twitter
              </ShareButton>
              <ShareButton
                contentId={post.id}
                platform="linkedin"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-xs font-black uppercase tracking-widest text-white hover:border-[#4ECCA3]/50 hover:text-[#4ECCA3] transition-all"
              >
                <Linkedin size={14} />
                LinkedIn
              </ShareButton>
              <ShareButton
                contentId={post.id}
                platform="whatsapp"
                href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${postUrl}`)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-xs font-black uppercase tracking-widest text-white hover:border-[#4ECCA3]/50 hover:text-[#4ECCA3] transition-all"
              >
                <MessageCircle size={14} />
                WhatsApp
              </ShareButton>
            </div>
          </div>

          {/* Caja de autor */}
          <div className="mb-16 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0A0A0A] flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {post.authorImg ? (
              <Image
                src={post.authorImg}
                alt={post.authorName || "Autor"}
                width={72}
                height={72}
                className="rounded-full object-cover border-2 border-[#4ECCA3]/50 shrink-0"
                unoptimized
              />
            ) : (
              <div className="w-[72px] h-[72px] rounded-full bg-[#4ECCA3]/20 border border-[#4ECCA3] flex items-center justify-center text-[#4ECCA3] shrink-0">
                <User size={28} />
              </div>
            )}
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4ECCA3] block mb-1">
                Escrito por
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">
                {post.authorName || "Equipo Transformateck"}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Miembro de la comunidad de IA de Transformateck, compartiendo conocimiento y experiencias para impulsar la inteligencia artificial en Latinoamérica.
              </p>
            </div>
          </div>

          {/* Artículos relacionados */}
          {relatedPosts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-8">
                Artículos Relacionados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden flex flex-col justify-between hover:border-[#4ECCA3]/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                  >
                    <div className="h-36 overflow-hidden bg-[#111] relative border-b border-white/5">
                      {related.image ? (
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#4ECCA3]/10 to-transparent flex items-center justify-center text-[#4ECCA3]/40">
                          <Sparkles size={32} />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <span className="px-2.5 py-0.5 rounded-full border border-[#4ECCA3]/30 text-[#4ECCA3] text-[9px] font-black uppercase tracking-wider inline-block mb-3">
                        {related.type || "Blog"}
                      </span>
                      <h3 className="text-sm font-bold uppercase tracking-tight text-white group-hover:text-[#4ECCA3] transition-colors leading-snug line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
