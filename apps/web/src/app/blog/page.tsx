import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getPublicPosts, formatDate, calculateReadingTime } from "@/lib/services/blog";
import { Sparkles, Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { SubscribeForm } from "@/components/blog/SubscribeForm";

export const metadata: Metadata = {
  title: "Blog & Noticias de IA | Transformateck",
  description: "Artículos, investigaciones y guías sobre Inteligencia Artificial, tecnología e innovación en Latinoamérica.",
  alternates: {
    canonical: "https://www.transformateck.com/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Blog & Noticias de IA | Transformateck",
    description: "Explora las últimas tendencias de Inteligencia Artificial en Latinoamérica.",
    url: "https://www.transformateck.com/blog",
    siteName: "Transformateck | Comunidad de IA",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "https://www.transformateck.com/hero.png",
        width: 1200,
        height: 630,
        alt: "Blog de IA — Transformateck",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Noticias de IA | Transformateck",
    description: "Artículos, investigaciones y guías sobre Inteligencia Artificial en Latinoamérica.",
    images: ["https://www.transformateck.com/hero.png"],
  },
};

export const revalidate = 60; // Revalidar cada 60 segundos (ISR)

export default async function BlogIndexPage() {
  const posts = await getPublicPosts();
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const regularPosts = posts.length > 1 ? posts.slice(1) : [];
  const postsList = regularPosts.length > 0 ? regularPosts : posts;
  const formCount = postsList.length >= 8 ? 4 : postsList.length >= 4 ? 3 : 2;
  const formInterval = Math.max(1, Math.floor(postsList.length / formCount));

  return (
    <>
      {/* Schema Org: Colección de artículos */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://www.transformateck.com/blog",
            url: "https://www.transformateck.com/blog",
            name: "Blog & Noticias de IA | Transformateck",
            description: "Artículos, investigaciones y guías sobre Inteligencia Artificial en Latinoamérica.",
            isPartOf: {
              "@id": "https://www.transformateck.com/#website",
            },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: posts.map((post, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `https://www.transformateck.com/blog/${post.slug}`,
                name: post.title,
              })),
            },
          }),
        }}
      />
      <div className="min-h-screen bg-[#050505] text-white pt-28 pb-24 px-6 relative overflow-hidden">
      {/* Fondo con luces de neón */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(78,204,163,0.08)_0,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.06)_0,transparent_70%)] blur-3xl" />
      </div>

      <main className="max-w-[1400px] mx-auto relative z-10">
        {/* Header de la sección */}
        <header className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 backdrop-blur-sm mb-6 shadow-[0_0_20px_rgba(78,204,163,0.2)]">
            <Sparkles size={14} className="text-[#4ECCA3] animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] text-[#4ECCA3] uppercase">
              Comunidad & Blog de IA
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-[0.95] mb-6">
            Conocimiento e <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] via-white to-[#4ECCA3]">
              Innovación en IA
            </span>
          </h1>

          <p className="text-lg text-white/60 font-medium leading-relaxed">
            Investigación, análisis de tecnología y guías sobre Inteligencia Artificial para creadores y empresas en Latinoamérica.
          </p>
        </header>

        {/* Post Destacado (Hero Post) */}
        {featuredPost && (
          <section className="mb-20">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#0C0C0C] to-[#050505] overflow-hidden p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl group hover:border-[#4ECCA3]/40 transition-all duration-500 cursor-pointer"
            >
              
              {/* Imagen del post destacado */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-[#111] h-[350px] relative border border-white/5">
                {featuredPost.image ? (
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#4ECCA3]/20 to-[#7C3AED]/20 flex items-center justify-center text-[#4ECCA3]">
                    <BookOpen size={64} />
                  </div>
                )}
                <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-[#4ECCA3] text-[#050505] text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Artículo Destacado
                </span>
              </div>

              {/* Información del post destacado */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-4 text-xs text-white/50 mb-4 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-[#4ECCA3]" />
                      {formatDate(featuredPost.date)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-[#4ECCA3]" />
                      {calculateReadingTime(featuredPost.markdownContent)} min
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-[#4ECCA3] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-white/70 text-base font-normal mb-8 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    {featuredPost.authorImg ? (
                      <Image
                        src={featuredPost.authorImg}
                        alt={featuredPost.authorName || "Autor"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover border border-[#4ECCA3]/40"
                        unoptimized
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#4ECCA3]/20 border border-[#4ECCA3] flex items-center justify-center text-[#4ECCA3]">
                        <User size={16} />
                      </div>
                    )}
                    <span className="text-xs font-bold text-white/80">
                      {featuredPost.authorName || "Transformateck"}
                    </span>
                  </div>

                  <span className="px-6 py-3 rounded-full bg-[#4ECCA3] text-[#050505] text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                    Leer Artículo <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Grilla de Entradas de Blog */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Todos los Artículos ({posts.length})
            </h2>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
              <BookOpen size={48} className="mx-auto text-white/30 mb-4" />
              <p className="text-lg text-white/60 font-medium">
                No hay artículos publicados por el momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsList.map((post, index) => {
                const showForm =
                  postsList.length > 3 &&
                  (index + 1) % formInterval === 0 &&
                  Math.ceil((index + 1) / formInterval) <= formCount;
                return (
                  <React.Fragment key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="rounded-3xl border border-white/10 bg-[#0A0A0A] overflow-hidden flex flex-col justify-between hover:border-[#4ECCA3]/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg cursor-pointer"
                    >
                      <div>
                        {/* Imagen de Portada */}
                        <div className="h-52 overflow-hidden bg-[#111] relative border-b border-white/5">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#4ECCA3]/10 to-transparent flex items-center justify-center text-[#4ECCA3]/40">
                              <BookOpen size={40} />
                            </div>
                          )}
                          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#050505]/80 backdrop-blur-md border border-[#4ECCA3]/30 text-[#4ECCA3] text-[9px] font-black uppercase tracking-wider">
                            {post.type || "Blog"}
                          </span>
                        </div>

                        {/* Contenido */}
                        <div className="p-6">
                          <div className="flex items-center gap-3 text-[11px] text-white/50 mb-3 font-medium">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} className="text-[#4ECCA3]" />
                              {formatDate(post.date)}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} className="text-[#4ECCA3]" />
                              {calculateReadingTime(post.markdownContent)} min
                            </span>
                          </div>

                          <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3 group-hover:text-[#4ECCA3] transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h3>

                          <p className="text-white/60 text-sm font-normal line-clamp-3 leading-relaxed mb-6">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Footer del card */}
                      <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-auto">
                        <div className="flex items-center gap-2">
                          {post.authorImg ? (
                            <Image
                              src={post.authorImg}
                              alt={post.authorName || "Autor"}
                              width={28}
                              height={28}
                              className="rounded-full object-cover border border-[#4ECCA3]/30"
                              unoptimized
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-[#4ECCA3]/20 border border-[#4ECCA3] flex items-center justify-center text-[#4ECCA3] text-xs">
                              <User size={12} />
                            </div>
                          )}
                          <span className="text-xs font-semibold text-white/70 truncate max-w-[120px]">
                            {post.authorName || "Transformateck"}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#4ECCA3] group-hover:text-white transition-colors">
                          Leer <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>

                    {showForm && (
                      <div className="rounded-3xl border border-[#4ECCA3]/30 bg-[#0A0A0A] p-6 flex flex-col justify-center shadow-lg">
                        <span className="text-[#4ECCA3] text-[10px] font-black uppercase tracking-widest mb-2">
                          Newsletter de IA
                        </span>
                        <h3 className="text-lg font-black uppercase tracking-tight text-white mb-4 leading-snug">
                          Recibe noticias, guías y casos de estudio en tu correo
                        </h3>
                        <SubscribeForm variant="medium" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </section>
      </main>
      </div>
    </>
  );
}
