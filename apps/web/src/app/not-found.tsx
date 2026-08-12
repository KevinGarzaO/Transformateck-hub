import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { SubscribeForm } from "@/components/blog/SubscribeForm";

export const metadata: Metadata = {
  title: "Página no encontrada | Transformateck",
  description: "La página que buscas no existe o fue movida.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-40 pb-24 px-6 relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(78,204,163,0.08)_0,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg">
        <div className="w-16 h-16 rounded-2xl bg-[#4ECCA3]/10 border border-[#4ECCA3]/30 flex items-center justify-center mx-auto mb-8">
          <SearchX size={32} className="text-[#4ECCA3]" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4ECCA3] mb-4">
          Error 404
        </p>
        <h1 className="text-5xl font-black uppercase tracking-tight mb-6">
          Página no encontrada
        </h1>
        <p className="text-lg text-white/60 font-medium mb-10">
          La página que buscas no existe o fue movida. Explora nuestro blog de Inteligencia Artificial o vuelve al inicio.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-4 bg-[#4ECCA3] text-[#050505] rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:shadow-[0_0_30px_rgba(78,204,163,0.5)] transition-all"
          >
            <ArrowLeft size={16} />
            Volver al Inicio
          </Link>
          <Link
            href="/blog"
            className="px-8 py-4 border border-white/20 rounded-full font-black text-xs uppercase tracking-widest text-white hover:border-[#4ECCA3]/50 transition-all"
          >
            Explorar el Blog
          </Link>
        </div>

        <div className="mt-12 border border-[#4ECCA3]/30 bg-[#4ECCA3]/5 rounded-3xl p-8 text-left">
          <h2 className="text-xl font-black uppercase tracking-tight text-white mb-1">
            Suscríbete a la newsletter
          </h2>
          <p className="text-sm text-white/60 font-medium mb-6">
            Recibe noticias, guías y casos de estudio semanales sobre IA en LATAM.
          </p>
          <SubscribeForm variant="large" />
        </div>
      </div>
    </div>
  );
}
