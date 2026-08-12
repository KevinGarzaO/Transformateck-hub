import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublicPosts, formatDate, calculateReadingTime, getTimestampMs } from "@/lib/services/blog";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { ArrowLeft, Calendar, Clock, User, Sparkles, Share2 } from "lucide-react";

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

  // JSON-LD Schema Org para Google Search Console Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
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

      <article className="min-h-screen bg-[#050505] text-white pt-28 pb-24 px-6 relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(78,204,163,0.12)_0,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
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
                <img
                  src={post.authorImg}
                  alt={post.authorName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#4ECCA3]/50"
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
            <div className="mb-14 rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto max-h-[600px] object-cover"
              />
            </div>
          )}

          {/* Contenido Markdown */}
          <div className="prose prose-invert max-w-none mb-16">
            <MarkdownRenderer content={post.markdownContent} />
          </div>

          {/* Banner de Comunidad al final del artículo */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#0A0A0A] border border-[#4ECCA3]/30 relative overflow-hidden shadow-[0_0_40px_rgba(78,204,163,0.15)]">
            <div className="absolute top-0 right-0 p-8 text-[#4ECCA3]/10 pointer-events-none">
              <Sparkles size={120} />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-[#4ECCA3]/20 text-[#4ECCA3] text-[10px] font-black uppercase tracking-widest mb-4">
              Comunidad de IA Transformateck
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 uppercase tracking-tight">
              ¿Quieres estar a la vanguardia de la IA en LATAM?
            </h3>
            <p className="text-white/70 max-w-xl mb-8 font-medium">
              Únete a nuestra comunidad de creadores, desarrolladores e investigadores de Inteligencia Artificial. Recibe noticias, guías y casos de estudio semanales.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#comunidad"
                className="px-8 py-4 bg-[#4ECCA3] text-[#050505] rounded-full font-black text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(78,204,163,0.5)] transition-all"
              >
                Unirme a la Comunidad
              </Link>
              <Link
                href="/blog"
                className="px-8 py-4 border border-white/20 rounded-full font-black text-xs uppercase tracking-widest text-white hover:border-[#4ECCA3]/50 transition-all"
              >
                Explorar más artículos
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
