'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, Cpu, BookOpen, BrainCircuit, Bot, Eye, Rocket, Users, Activity, Newspaper } from 'lucide-react';
import { SubscribeForm } from '@/components/blog/SubscribeForm';
import { Navbar } from '@/components/shared/Navbar';

// --- ANIMATION VARIANTS ---
const fadeUp: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

// --- COMPONENTS ---

const BackgroundEffects = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(78,204,163,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(78,204,163,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />

    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-20%] left-[-20%] w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,rgba(78,204,163,0.15)_0,transparent_50%)] rounded-full blur-3xl mix-blend-screen"
    />
    <motion.div
      animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
      className="absolute bottom-[-30%] right-[-20%] w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.12)_0,transparent_50%)] rounded-full blur-3xl mix-blend-screen"
    />
  </div>
);

const Marquee = () => (
  <div className="w-full bg-[#4ECCA3] py-3 overflow-hidden flex whitespace-nowrap transform -rotate-2 scale-105 border-y border-[#4ECCA3] z-20 relative shadow-[0_0_50px_rgba(78,204,163,0.2)]">
    <motion.div
      animate={{ x: [0, -1035] }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      className="flex gap-8 items-center text-[#050505] font-black uppercase tracking-widest text-sm"
    >
      {[...Array(10)].map((_, i) => (
        <React.Fragment key={i}>
          <span>Comunidad de IA</span>
          <Sparkles size={16} />
          <span>Innovación LATAM</span>
          <Sparkles size={16} />
          <span>Investigación & Desarrollo</span>
          <Sparkles size={16} />
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export default function TransformateckLanding() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-[#050505] text-white selection:bg-[#4ECCA3] selection:text-[#050505] font-sans min-h-screen overflow-x-hidden">
      <BackgroundEffects />
      <Navbar />

      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-[#4ECCA3] transform-origin-left z-[100] shadow-[0_0_10px_rgba(78,204,163,0.8)]" style={{ scaleX }} />

      <main className="relative z-10">

        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-6 z-10">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 backdrop-blur-sm mb-8 shadow-[0_0_20px_rgba(78,204,163,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#4ECCA3] animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.3em] text-[#4ECCA3] uppercase">Comunidad de IA en LATAM</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-6xl md:text-[90px] lg:text-[110px] font-black tracking-tighter leading-[0.85] mb-8 uppercase">
                LATAM TIENE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] via-white to-[#4ECCA3]">TALENTO.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/60 max-w-xl mb-12 font-medium">
                La comunidad definitiva de Inteligencia Artificial para desarrolladores, investigadores y creadores que transforman Latinoamérica con conocimiento, investigación y tecnología.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                <Link
                  href="/blog"
                  className="px-10 py-5 bg-[#4ECCA3] text-[#050505] rounded-full font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:shadow-[0_0_40px_rgba(78,204,163,0.5)] transition-all duration-300"
                >
                  Explorar Blog de IA <ArrowRight size={18} />
                </Link>
                <Link href="#suscribirme" className="px-10 py-5 border border-white/20 bg-white/5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:border-[#4ECCA3]/50 hover:bg-[#4ECCA3]/10 transition-all duration-300">
                  Unirme a la Comunidad
                </Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-6 relative h-[600px] w-full hidden lg:block perspective-1000">
              <div className="absolute inset-0 flex items-center justify-center transform-style-3d rotate-x-12 rotate-y-[-15deg]">

                <motion.div
                  animate={{ y: [0, -30, 0], rotateZ: [0, 2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute z-30 w-[240px] bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#4ECCA3]/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(78,204,163,0.2)] translate-x-[-150px] translate-y-[-100px]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Activity size={20} className="text-[#4ECCA3]" />
                    <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">Comunidad Activa</span>
                  </div>
                  <div className="text-5xl font-black text-[#4ECCA3] mb-2">LATAM</div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 2, delay: 1 }} className="h-full bg-[#4ECCA3] shadow-[0_0_10px_#4ECCA3]" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 30, 0], rotateZ: [0, -2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute z-20 w-[380px] bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl translate-x-[80px] translate-y-[20px]"
                >
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase text-[#4ECCA3] tracking-widest border border-[#4ECCA3]/30 px-3 py-1 rounded-full">Red Comunidad IA</span>
                    <div className="w-2 h-2 rounded-full bg-[#4ECCA3] animate-ping" />
                  </div>
                  <div className="flex items-end gap-2 h-32 mb-6">
                    {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="flex-1 bg-gradient-to-t from-[#4ECCA3]/20 to-[#4ECCA3] rounded-t-sm" />
                    ))}
                  </div>
                  <div className="h-px w-full bg-white/10 mb-4" />
                  <div className="flex justify-between text-[10px] font-mono text-white/40">
                    <span>BLOG_PUBLISHING</span>
                    <span className="text-[#4ECCA3]">LIVE</span>
                  </div>
                </motion.div>

                <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute z-10 w-[500px] h-[500px] border-[1px] border-[#4ECCA3]/20 rounded-full border-dashed" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* MARQUEE BANNER */}
        <Marquee />

        {/* CONTENIDO DE LA COMUNIDAD */}
        <section id="contenido" className="py-32 px-6 md:px-12 relative z-10">
          <div className="max-w-[1400px] mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20 text-center">
              <div className="inline-block px-4 py-2 rounded-full border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 text-[#4ECCA3] text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                Comunidad & Blog de IA
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Conocimiento, <br className="hidden md:block" />Investigación e Innovación.</h2>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mt-6 font-medium">
                Publicamos análisis sobre modelos LLM, agentes autónomos, visión por computadora y casos de éxito de IA aplicados a la industria de LATAM.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Guías y Tutoriales', desc: 'Tutoriales prácticos paso a paso para dominar herramientas, frameworks y flujos de trabajo de IA modernos.', icon: BookOpen, tag: 'Semanal' },
                { title: 'Investigación y LLMs', desc: 'Análisis profundo de modelos de lenguaje, arquitecturas, benchmarks y tendencias del estado del arte.', icon: BrainCircuit, tag: 'Deep Dive' },
                { title: 'Agentes Autónomos', desc: 'Explora agentes, pipelines y automatizaciones de IA que multiplican la productividad de creadores y equipos.', icon: Bot, tag: 'Nuevo' },
                { title: 'Visión por Computadora', desc: 'De la teoría a la práctica: detección, generación de imágenes y aplicaciones reales de visión artificial.', icon: Eye, tag: 'Investigación' },
                { title: 'Casos de Éxito LATAM', desc: 'Cómo desarrolladores, creadores y empresas de la región están aplicando IA real para escalar su impacto.', icon: Rocket, tag: 'Historias' },
                { title: 'Comunidad y Networking', desc: 'Conecta con investigadores, desarrolladores y creadores de toda Latinoamérica y comparte conocimiento.', icon: Users, tag: 'Comunidad' }
              ].map((feat, i) => (
                <Link
                  key={i} href="/blog"
                  className="bg-[#050505] border border-white/10 hover:border-[#4ECCA3] rounded-3xl p-8 relative overflow-hidden group cursor-pointer transition-colors duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4ECCA3]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <feat.icon size={32} className="text-[#4ECCA3]" />
                    <span className="px-3 py-1 rounded-full border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 text-[#4ECCA3] text-[9px] font-black uppercase tracking-widest">{feat.tag}</span>
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tight mb-3 relative z-10">{feat.title}</h4>
                  <p className="text-white/50 text-sm font-medium relative z-10">{feat.desc}</p>
                  <div className="absolute top-8 right-8 w-8 h-8 rounded-full border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    <ArrowRight size={14} className="text-[#4ECCA3]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* COMUNIDAD DE IA */}
        <section id="comunidad" className="py-28 px-6 md:px-12 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent via-[#4ECCA3]/5 to-transparent">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <span className="px-4 py-1.5 rounded-full border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 text-[#4ECCA3] text-[10px] font-black uppercase tracking-[0.3em] inline-block mb-4">
                  Comunidad de Inteligencia Artificial
                </span>
                <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-6">
                  Aprende, Investiga y Conecta en LATAM
                </h2>
                <p className="text-lg text-white/60 font-medium mb-8">
                  Un espacio abierto donde creadores, desarrolladores e investigadores comparten conocimiento, acceden a recursos exclusivos y escalan su impacto conectando con los mejores talentos de la región.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Link
                    href="/blog"
                    className="px-10 py-5 bg-[#4ECCA3] text-[#050505] rounded-full font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:shadow-[0_0_40px_rgba(78,204,163,0.5)] transition-all duration-300"
                  >
                    Explorar Todos los Artículos <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="#manifiesto"
                    className="px-10 py-5 border border-white/20 bg-white/5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:border-[#4ECCA3]/50 hover:bg-[#4ECCA3]/10 transition-all duration-300"
                  >
                    Conocer el Manifiesto
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: BrainCircuit, stat: 'LLM', label: 'Investigación de Modelos' },
                  { icon: Bot, stat: 'Agentes', label: 'IA Autónoma' },
                  { icon: Eye, stat: 'Visión', label: 'Computer Vision' },
                  { icon: Rocket, stat: 'LATAM', label: 'Casos de Éxito' }
                ].map((s, i) => (
                  <motion.div
                    key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="border border-[#4ECCA3]/20 bg-[#4ECCA3]/5 rounded-3xl p-8 text-center"
                  >
                    <s.icon size={28} className="mx-auto text-[#4ECCA3] mb-4" />
                    <div className="text-2xl font-black text-white uppercase mb-1">{s.stat}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SUSCRIPCIÓN */}
        <section id="suscribirme" className="py-20 px-6 md:px-12 relative z-10">
          <div className="max-w-2xl mx-auto border border-[#4ECCA3]/30 bg-[#4ECCA3]/5 rounded-3xl p-8">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-1">
              Suscríbete a la newsletter
            </h3>
            <p className="text-white/60 text-sm font-medium mb-6">
              Recibe noticias, guías y casos de estudio semanales sobre IA en LATAM.
            </p>
            <SubscribeForm variant="large" />
          </div>
        </section>

        {/* MANIFESTO LATAM */}
        <section id="manifiesto" className="py-40 px-6 md:px-12 min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] text-white/90 uppercase"
            >
              Un creador en Monterrey <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#7C3AED]">merece las mismas herramientas</span><br />
              que uno en San Francisco.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }}
              className="mt-16 flex items-center justify-center gap-4 text-white/40"
            >
              <div className="w-12 h-px bg-[#4ECCA3]/50" />
              <span className="text-xs uppercase tracking-[0.3em] font-black text-[#4ECCA3]">Manifiesto Transformateck</span>
              <div className="w-12 h-px bg-[#4ECCA3]/50" />
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#050505] pt-32 pb-12 px-6 md:px-12 border-t border-[#4ECCA3]/20 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(78,204,163,0.1)_0,transparent_50%)]" />
          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
              <div className="lg:col-span-2">
                <div className="w-12 h-12 rounded-xl bg-[#4ECCA3] flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(78,204,163,0.4)]">
                  <Cpu size={24} className="text-[#050505]" />
                </div>
                <p className="text-white/50 font-medium max-w-sm mb-8 leading-relaxed">
                  Transformateck Innovation Lab & AI Community. Impulsando el conocimiento y la adopción de Inteligencia Artificial nativa en América Latina.
                </p>
              </div>

              <div>
                <h4 className="text-[#4ECCA3] font-black uppercase tracking-widest text-[10px] mb-6">Comunidad & Blog</h4>
                <ul className="space-y-4 font-bold text-sm">
                  <li><Link href="/blog" className="text-white/60 hover:text-white transition-colors">Blog de IA</Link></li>
                  <li><Link href="#comunidad" className="text-white/60 hover:text-white transition-colors">Comunidad LATAM</Link></li>
                  <li><Link href="#manifiesto" className="text-white/60 hover:text-white transition-colors">Manifiesto</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[#4ECCA3] font-black uppercase tracking-widest text-[10px] mb-6">Recursos</h4>
                <ul className="space-y-4 font-bold text-sm">
                  <li><Link href="/blog" className="text-white/60 hover:text-white transition-colors">Investigación</Link></li>
                  <li><Link href="/blog" className="text-white/60 hover:text-white transition-colors">Casos de Estudio</Link></li>
                  <li><Link href="#contenido" className="text-white/60 hover:text-white transition-colors">Contenido</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[#4ECCA3] font-black uppercase tracking-widest text-[10px] mb-6">Redes</h4>
                <ul className="space-y-4 font-bold text-sm">
                  <li>
                    <a
                      href="https://transformateck.substack.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    >
                      <Newspaper size={14} className="text-[#4ECCA3]" />
                      Substack
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full flex justify-center border-t border-white/10 pt-12">
              <h1 className="text-[10vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#4ECCA3]/20 to-transparent select-none text-center">
                TRANSFORMATECK
              </h1>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-12 text-white/30 text-[10px] font-black uppercase tracking-widest">
              <p>© 2026 Transformateck Labs. Monterrey, MX.</p>
              <p className="flex items-center gap-2 mt-4 md:mt-0 text-[#4ECCA3]">
                <span className="w-2 h-2 rounded-full bg-[#4ECCA3] animate-pulse" /> All Systems Operational
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
