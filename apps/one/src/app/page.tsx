'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, User, Terminal, Camera, Globe, Box, Settings, Cpu } from 'lucide-react';

// --- ANIMATION VARIANTS ---
const fadeUp: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

// --- COMPONENTS ---
const BackgroundEffects = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
    {/* Grid Pattern Violet */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
    
    {/* Orbe Violeta Principal (Massive Glow) */}
    <motion.div 
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-20%] right-[-20%] w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15)_0,transparent_50%)] rounded-full blur-3xl mix-blend-screen"
    />
  </div>
);

const Navbar = () => (
  <motion.nav 
    initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}
    className="fixed top-0 left-0 right-0 p-6 px-8 md:px-16 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5"
  >
    <div className="max-w-[1400px] mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
         <div className="w-8 h-8 rounded bg-[#7C3AED] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            <User size={16} className="text-white" />
         </div>
         <span className="text-xl font-black tracking-tighter text-white">Transformateck <span className="text-[#7C3AED]">One</span></span>
      </div>
      
      <div className="hidden lg:flex items-center gap-12 bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-[#7C3AED]/20">
         {[
           { name: 'El Problema', id: 'el-problema' },
           { name: 'Tecnología', id: 'tecnologia' },
           { name: 'Aplicaciones', id: 'herramientas' }
         ].map((item, i) => (
            <Link key={i} href={`#${item.id}`} className="text-xs font-bold text-white/70 hover:text-[#7C3AED] transition-colors tracking-widest uppercase">{item.name}</Link>
         ))}
      </div>

      <div className="flex items-center gap-6">
         <a href="https://transformateck-hub-web.vercel.app/" className="hidden sm:block text-xs font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest">Volver al Hub</a>
         <Link href="https://cuenta.transformateck.com/login" className="px-6 py-3 bg-[#7C3AED] text-white text-xs font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all duration-300 flex items-center gap-2">
            Mi Cuenta <ArrowRight size={14} />
         </Link>
      </div>
    </div>
  </motion.nav>
);

const Marquee = () => (
  <div className="w-full bg-[#7C3AED] py-3 overflow-hidden flex whitespace-nowrap transform -rotate-2 scale-105 border-y border-[#7C3AED] z-20 relative shadow-[0_0_50px_rgba(124,58,237,0.2)]">
    <motion.div 
      animate={{ x: [0, -1035] }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      className="flex gap-8 items-center text-white font-black uppercase tracking-widest text-sm"
    >
      {[...Array(10)].map((_, i) => (
        <React.Fragment key={i}>
          <span>El Laboratorio del Creador</span>
          <Sparkles size={16} />
          <span>Automatización IA</span>
          <Sparkles size={16} />
          <span>SpecForge TSX</span>
          <Sparkles size={16} />
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export default function OneLanding() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-[#050505] text-white selection:bg-[#7C3AED] selection:text-white font-sans min-h-screen overflow-x-hidden">
      <BackgroundEffects />
      <Navbar />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-[#7C3AED] transform-origin-left z-[100] shadow-[0_0_10px_rgba(124,58,237,0.8)]" style={{ scaleX }} />

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-6 z-10">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 backdrop-blur-sm mb-8 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.3em] text-[#7C3AED] uppercase">Ecosistema One</span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-6xl md:text-[80px] lg:text-[100px] font-black tracking-tighter leading-[0.85] mb-8 uppercase">
                TU LABORATORIO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-white to-[#7C3AED]">PERSONAL.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/60 max-w-xl mb-12 font-medium">
                Las herramientas que necesitas para construir, automatizar y escalar tu marca. Sin distracciones. Solo tecnología orientada al creador en LATAM.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                <Link href="https://cuenta.transformateck.com/login" className="px-10 py-5 bg-[#7C3AED] text-white rounded-full font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-all duration-300">
                  Comienza tu Viaje <ArrowRight size={16} />
                </Link>
                <Link href="#herramientas" className="px-10 py-5 border border-white/20 bg-white/5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/10 transition-all duration-300">
                  Explorar Herramientas
                </Link>
              </motion.div>
            </motion.div>

            {/* Abstract 3D Violet Visuals */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-6 relative h-[600px] w-full hidden lg:block perspective-1000">
              <div className="absolute inset-0 flex items-center justify-center transform-style-3d rotate-x-12 rotate-y-[-15deg]">
                
                {/* Floating Abstract App Card */}
                <motion.div 
                  animate={{ y: [0, -30, 0], rotateZ: [0, -2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute z-30 w-[300px] bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#7C3AED]/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(124,58,237,0.2)] translate-x-[-100px] translate-y-[-80px]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Camera size={20} className="text-[#7C3AED]" />
                    <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">Avocado OS</span>
                  </div>
                  <div className="space-y-3">
                     <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden"><motion.div animate={{ width: ['0%', '85%'] }} transition={{ duration: 2, delay: 0.5 }} className="h-full bg-[#7C3AED] shadow-[0_0_10px_#7C3AED]" /></div>
                     <div className="h-2 w-3/4 bg-white/10 rounded-full overflow-hidden"><motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 2, delay: 0.8 }} className="h-full bg-white" /></div>
                  </div>
                </motion.div>

                {/* Floating CLI Card */}
                <motion.div 
                  animate={{ y: [0, 30, 0], rotateZ: [0, 2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute z-20 w-[340px] bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl translate-x-[120px] translate-y-[50px]"
                >
                  <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                     <Terminal size={16} className="text-[#7C3AED]" />
                     <span className="text-[10px] font-mono text-[#7C3AED]">SpecForge-TSX</span>
                  </div>
                  <div className="text-[10px] font-mono text-white/50 leading-relaxed">
                    $ init transformateck --one<br/>
                    <span className="text-white/30">&gt; Building creator ecosystem...</span><br/>
                    <span className="text-[#7C3AED]">&gt; [OK] AI Engine Online</span><br/>
                    <span className="text-white">&gt; Ready for impact.</span>
                  </div>
                </motion.div>

                {/* Background Ring */}
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute z-10 w-[450px] h-[450px] border-[1px] border-[#7C3AED]/20 rounded-full border-dashed" />
              </div>
            </motion.div>
          </div>
        </section>

        <Marquee />

        {/* EL FLUJO DEL CREADOR (Problema vs Solución) */}
        <section id="el-problema" className="py-32 px-6 md:px-12 relative z-10 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="inline-flex px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED] text-[10px] font-black uppercase tracking-[0.3em] mb-6">El Paradigma Actual</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">El creador en LATAM <br/>está <span className="text-[#7C3AED]">saturado.</span></h2>
              <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">Entre pensar ideas, grabar, editar, programar, gestionar redes y responder a la comunidad, la creatividad muere ahogada por la operatividad técnica. Las herramientas actuales están rotas y desconectadas.</p>
              <ul className="space-y-5">
                 {['Gestión manual y repetitiva de publicaciones', 'Múltiples suscripciones costosas en dólares', 'Ausencia de automatización con IA nativa', 'Aislamiento técnico sin soporte local'].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-white/70 font-medium">
                     <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0"><span className="text-red-500 text-xs font-black">×</span></div>
                     {item}
                   </li>
                 ))}
              </ul>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-[#0A0A0A] border border-[#7C3AED]/30 p-10 md:p-14 rounded-[40px] relative overflow-hidden group shadow-[0_0_50px_rgba(124,58,237,0.1)] hover:shadow-[0_0_80px_rgba(124,58,237,0.2)] transition-shadow duration-500">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.15)_0,transparent_70%)]" />
              <h3 className="text-3xl md:text-4xl font-black uppercase mb-10 relative z-10 leading-tight">La Vía <br/><span className="text-[#7C3AED]">Transformateck One</span></h3>
              <ul className="space-y-8 relative z-10">
                 {[
                   { t: 'Inteligencia Artificial Nativa', d: 'Generación de guiones, código y assets visuales integrados directamente en tu flujo de trabajo.' },
                   { t: 'Automatización Cross-Platform', d: 'Publica, programa y sincroniza en todas tus redes y servidores desde un único panel de control.' },
                   { t: 'Ecosistema Unificado', d: 'Una sola cuenta, un solo pago centralizado en moneda local, acceso total a todas las herramientas.' },
                   { t: 'Comunidad Elite (Networking)', d: 'No estás solo. Conecta, comparte y colabora con los mejores talentos creativos de Latinoamérica.' }
                 ].map((item, i) => (
                   <li key={i} className="flex items-start gap-5 group/item">
                     <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/30 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-[#7C3AED] group-hover/item:text-white transition-colors duration-300"><Sparkles size={18} className="text-[#7C3AED] group-hover/item:text-white" /></div>
                     <div>
                       <h4 className="text-white font-black text-lg mb-2 uppercase tracking-wide">{item.t}</h4>
                       <p className="text-white/50 text-sm leading-relaxed">{item.d}</p>
                     </div>
                   </li>
                 ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* CORE FEATURES GRID */}
        <section id="tecnologia" className="py-32 px-6 md:px-12 bg-gradient-to-b from-[#0A0A0A] to-[#050505] relative z-10 border-y border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-24 text-center max-w-4xl mx-auto">
              <div className="inline-flex px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Tecnología Base</div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">Poder a nivel <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-white">arquitectura.</span></h2>
              <p className="text-white/50 text-xl leading-relaxed font-medium">No construimos "aplicacioncitas". Construimos infraestructura pesada empaquetada en interfaces hermosas para que puedas operar como un estudio creativo completo siendo una sola persona.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { icon: Cpu, t: 'Motores de IA Propios', d: 'No dependemos ciegamente de APIs externas. Integramos modelos de lenguaje y generación visual optimizados específicamente para el contexto y los modismos latinoamericanos.' },
                 { icon: Box, t: 'Arquitectura Modular', d: 'Usa solo lo que necesitas. Activa o desactiva módulos enteros de Avocado o SpecForge sin saturar tu espacio de trabajo ni pagar por lo que no usas.' },
                 { icon: Settings, t: 'Auto-Healing Nativo', d: 'Nuestras herramientas de desarrollo (como SpecForge) corrigen sus propios errores. Si un build falla, la CLI lo analiza y lo repara automáticamente por ti.' },
               ].map((feat, i) => (
                 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} key={i} className="bg-[#050505] border border-white/10 p-12 rounded-[32px] hover:border-[#7C3AED]/50 relative group overflow-hidden transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="w-16 h-16 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#7C3AED] transition-all duration-500 relative z-10">
                      <feat.icon size={28} className="text-[#7C3AED] group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="text-2xl font-black uppercase mb-4 relative z-10">{feat.t}</h4>
                    <p className="text-white/50 text-base leading-relaxed relative z-10">{feat.d}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* BENTO GRID: APLICACIONES ONE */}
        <section id="herramientas" className="py-32 px-6 md:px-12 bg-gradient-to-b from-transparent to-[#0A0A0A]/50 relative z-10 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-20 text-center">
              <div className="inline-block px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED] text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                El Arsenal
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Nuestras Aplicaciones.</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AVOCADO ESTUDIO */}
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-[#050505] border border-white/10 hover:border-[#7C3AED]/50 p-12 rounded-[40px] relative group transition-colors duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                     <Camera size={28} className="text-white" />
                  </div>
                  <span className="text-[10px] font-mono border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED] px-3 py-1.5 rounded-full">ESTABLE</span>
                </div>
                <h3 className="text-4xl font-black mb-4 uppercase relative z-10">Avocado Estudio</h3>
                <p className="text-white/50 text-lg leading-relaxed mb-10 relative z-10 max-w-md">La plataforma definitiva para creadores. Sincroniza, programa y genera contenido masivo con nuestra inteligencia artificial integrada.</p>
                <Link href="/avocado" className="inline-flex relative z-10 items-center justify-center w-full px-8 py-4 bg-white text-[#050505] rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#7C3AED] hover:text-white transition-all duration-300">
                  Abrir Aplicación
                </Link>
              </motion.div>

              {/* SPECFORGE */}
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}
                className="bg-[#050505] border border-white/10 hover:border-[#7C3AED]/50 p-12 rounded-[40px] relative group transition-colors duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                     <Terminal size={28} className="text-white" />
                  </div>
                  <span className="text-[10px] font-mono border border-white/10 bg-white/5 text-white/60 px-3 py-1.5 rounded-full">CLI EXPERIMENTAL</span>
                </div>
                <h3 className="text-4xl font-black mb-4 uppercase relative z-10">SpecForge-TSX</h3>
                <p className="text-white/50 text-lg leading-relaxed mb-10 relative z-10 max-w-md">Herramienta de desarrollo por línea de comandos con capacidades de auto-corrección para acelerar la infraestructura de tus proyectos.</p>
                <Link href="/specforge" className="inline-flex relative z-10 items-center justify-center w-full px-8 py-4 border border-white/20 bg-transparent text-white rounded-full font-black text-xs uppercase tracking-widest hover:border-[#7C3AED] hover:bg-[#7C3AED]/10 transition-all duration-300">
                  Documentación CLI
                </Link>
              </motion.div>

              {/* LA COMUNIDAD */}
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}
                className="bg-[#050505] border border-white/10 hover:border-[#7C3AED]/50 p-12 rounded-[40px] relative group transition-colors duration-500 overflow-hidden lg:col-span-2 flex flex-col md:flex-row items-center gap-12"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.05)_0,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex-1 relative z-10">
                  <div className="inline-flex px-3 py-1 rounded border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[10px] uppercase tracking-widest font-black text-[#7C3AED] mb-6">Red Global</div>
                  <h3 className="text-4xl md:text-5xl font-black mb-4 uppercase">La Comunidad.</h3>
                  <p className="text-white/50 text-lg leading-relaxed max-w-lg mb-8">El núcleo colaborativo de Transformateck One. Aprende, comparte y escala tus proyectos junto a los emprendedores digitales más brillantes de LATAM.</p>
                  <Link href="#" className="inline-flex items-center gap-2 font-bold text-[#7C3AED] hover:text-white transition-colors group/link">
                     Acceder a los foros <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
                <div className="w-full md:w-auto flex justify-center relative z-10">
                  <div className="w-40 h-40 rounded-full border-2 border-dashed border-[#7C3AED]/30 flex items-center justify-center group-hover:rotate-90 group-hover:border-[#7C3AED] transition-all duration-1000">
                     <Globe size={48} className="text-[#7C3AED]/50 group-hover:text-[#7C3AED] transition-colors" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION UNIFICADO */}
        <section className="py-40 px-6 md:px-12 relative overflow-hidden bg-[#0A0A0A]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#7C3AED]/10 to-transparent" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 text-white">
              Gestiona todo desde <br/><span className="text-[#7C3AED]">un solo lugar.</span>
            </h2>
            <p className="text-lg text-white/50 mb-12 max-w-2xl mx-auto font-medium">
              Crea tu cuenta de Transformateck hoy mismo. Un solo inicio de sesión te dará acceso a Avocado Estudio, La Comunidad y todo el ecosistema One.
            </p>
            <Link href="https://cuenta.transformateck.com/login" className="inline-flex px-12 py-6 bg-[#7C3AED] text-white rounded-full font-black text-sm uppercase tracking-[0.2em] hover:scale-105 hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] transition-all duration-300">
               Crear mi Identidad en ONE
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#050505] pt-20 pb-12 px-6 md:px-12 border-t border-white/5 relative z-10">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
               <h1 className="text-2xl font-black tracking-tighter text-white uppercase">Transformateck <span className="text-[#7C3AED]">One</span></h1>
               <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mt-2">Personal Ecosystem</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/50">
               <Link href="/avocado" className="hover:text-[#7C3AED] transition-colors">Avocado</Link>
               <Link href="/specforge" className="hover:text-[#7C3AED] transition-colors">SpecForge</Link>
               <Link href="https://cuenta.transformateck.com/login" className="hover:text-[#7C3AED] transition-colors">Cuenta</Link>
               <a href="https://transformateck-hub-web.vercel.app/" className="hover:text-white transition-colors">Ir al Hub Central</a>
            </div>
            
            <p className="text-white/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse" /> LATAM Ready
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
