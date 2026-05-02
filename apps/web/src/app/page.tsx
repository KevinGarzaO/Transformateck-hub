'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Globe, Cpu, Check, Instagram, Twitter, Linkedin, User, LayoutGrid, Layers, Activity, Code2, Shield, Database, BarChart3, Fingerprint, MapPin } from 'lucide-react';

// --- ANIMATION VARIANTS ---
const fadeUp: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const fadeLeft: any = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const pulseGlow = {
  initial: { opacity: 0.5, scale: 1 },
  animate: { opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1], transition: { duration: 3, repeat: Infinity } }
};

// --- COMPONENTS ---

const BackgroundEffects = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
    {/* Grid Pattern con toques de Teal */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(78,204,163,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(78,204,163,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
    
    {/* Orbe Teal Principal (Massive Glow) */}
    <motion.div 
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-20%] left-[-20%] w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,rgba(78,204,163,0.15)_0,transparent_50%)] rounded-full blur-3xl mix-blend-screen"
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
         <div className="w-8 h-8 rounded bg-[#4ECCA3] flex items-center justify-center shadow-[0_0_15px_rgba(78,204,163,0.5)]">
            <Cpu size={16} className="text-[#050505]" />
         </div>
         <span className="text-xl font-black tracking-tighter text-white">Transformateck</span>
      </div>
      
      <div className="hidden lg:flex items-center gap-12 bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-[#4ECCA3]/20">
         {['El Problema', 'Ecosistemas', 'Productos', 'Manifiesto'].map((item, i) => (
            <Link key={i} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-xs font-bold text-white/70 hover:text-[#4ECCA3] transition-colors tracking-widest uppercase">{item}</Link>
         ))}
      </div>

      <div className="flex items-center gap-4">
         <a href="https://one.transformateck.com" className="px-6 py-3 bg-[#7C3AED] text-white text-xs font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all duration-300">
            One
         </a>
         <a href="https://workspace.transformateck.com" className="px-6 py-3 bg-[#4ECCA3] text-[#050505] text-xs font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_30px_rgba(78,204,163,0.4)] transition-all duration-300">
            Workspace
         </a>
      </div>
    </div>
  </motion.nav>
);

const Marquee = () => (
  <div className="w-full bg-[#4ECCA3] py-3 overflow-hidden flex whitespace-nowrap transform -rotate-2 scale-105 border-y border-[#4ECCA3] z-20 relative shadow-[0_0_50px_rgba(78,204,163,0.2)]">
    <motion.div 
      animate={{ x: [0, -1035] }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      className="flex gap-8 items-center text-[#050505] font-black uppercase tracking-widest text-sm"
    >
      {[...Array(10)].map((_, i) => (
        <React.Fragment key={i}>
          <span>Ecosistema One</span>
          <Sparkles size={16} />
          <span>Ecosistema Workspace</span>
          <Sparkles size={16} />
          <span>Tecnología para LATAM</span>
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

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-[#4ECCA3] transform-origin-left z-[100] shadow-[0_0_10px_rgba(78,204,163,0.8)]" style={{ scaleX }} />

      <main className="relative z-10">
        
        {/* 1. HERO SECTION */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-6 z-10">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 backdrop-blur-sm mb-8 shadow-[0_0_20px_rgba(78,204,163,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#4ECCA3] animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.3em] text-[#4ECCA3] uppercase">Misión Transformateck</span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-6xl md:text-[90px] lg:text-[110px] font-black tracking-tighter leading-[0.85] mb-8 uppercase">
                LATAM TIENE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] via-white to-[#4ECCA3]">TALENTO.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/60 max-w-xl mb-12 font-medium">
                Lo que le falta son las herramientas correctas. Construimos el ecosistema definitivo de software para los creadores y empresas que mueven a Latinoamérica.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                <Link href="#ecosistemas" className="px-10 py-5 bg-[#4ECCA3] text-[#050505] rounded-full font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:shadow-[0_0_40px_rgba(78,204,163,0.5)] transition-all duration-300">
                  Ver Ecosistemas <ArrowRight size={18} />
                </Link>
                <Link href="#el-problema" className="px-10 py-5 border border-white/20 bg-white/5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:border-[#4ECCA3]/50 hover:bg-[#4ECCA3]/10 transition-all duration-300">
                  El Problema
                </Link>
              </motion.div>
            </motion.div>

            {/* Abstract 3D Teal Visuals */}
            <motion.div variants={fadeLeft} initial="hidden" animate="visible" className="lg:col-span-6 relative h-[600px] w-full hidden lg:block perspective-1000">
              <div className="absolute inset-0 flex items-center justify-center transform-style-3d rotate-x-12 rotate-y-[-15deg]">
                
                {/* Floating Metric Card 1 */}
                <motion.div 
                  animate={{ y: [0, -30, 0], rotateZ: [0, 2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute z-30 w-[240px] bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#4ECCA3]/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(78,204,163,0.2)] translate-x-[-150px] translate-y-[-100px]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Activity size={20} className="text-[#4ECCA3]" />
                    <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">Adopción LATAM</span>
                  </div>
                  <div className="text-5xl font-black text-[#4ECCA3] mb-2">100%</div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 2, delay: 1 }} className="h-full bg-[#4ECCA3] shadow-[0_0_10px_#4ECCA3]" />
                  </div>
                </motion.div>

                {/* Floating Map/Graph Card */}
                <motion.div 
                  animate={{ y: [0, 30, 0], rotateZ: [0, -2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute z-20 w-[380px] bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl translate-x-[80px] translate-y-[20px]"
                >
                  <div className="flex justify-between items-center mb-6">
                     <span className="text-[10px] font-black uppercase text-[#4ECCA3] tracking-widest border border-[#4ECCA3]/30 px-3 py-1 rounded-full">Ecosistema Dual</span>
                     <div className="w-2 h-2 rounded-full bg-[#4ECCA3] animate-ping" />
                  </div>
                  {/* Simulated graph */}
                  <div className="flex items-end gap-2 h-32 mb-6">
                    {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="flex-1 bg-gradient-to-t from-[#4ECCA3]/20 to-[#4ECCA3] rounded-t-sm" />
                    ))}
                  </div>
                  <div className="h-px w-full bg-white/10 mb-4" />
                  <div className="flex justify-between text-[10px] font-mono text-white/40">
                    <span>NODO_MONTERREY</span>
                    <span className="text-[#4ECCA3]">ONLINE</span>
                  </div>
                </motion.div>

                {/* Background Ring */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute z-10 w-[500px] h-[500px] border-[1px] border-[#4ECCA3]/20 rounded-full border-dashed" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. MARQUEE BANNER */}
        <Marquee />

        {/* 3. BENTO GRID: EL PROBLEMA EN LATAM */}
        <section id="el-problema" className="py-32 px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight max-w-3xl">
                El problema no es la ambición, <span className="text-[#4ECCA3]">es el software ajeno.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
              {/* Box 1 - General LATAM problem */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="col-span-1 md:col-span-8 bg-[#0A0A0A] border border-white/10 hover:border-[#4ECCA3]/50 rounded-[32px] p-10 relative overflow-hidden group transition-colors duration-500"
              >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 group-hover:bg-[#4ECCA3]/10 transition-colors duration-700" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-full border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 flex items-center justify-center">
                    <Globe size={20} className="text-[#4ECCA3]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-medium mb-4">Soluciones Extranjeras</h3>
                    <p className="text-white/50 text-lg max-w-md">Software en inglés, cobrado en dólares, que ignora las reglas logísticas, fiscales y operativas del mercado latinoamericano. No escalan aquí.</p>
                  </div>
                </div>
              </motion.div>

              {/* Box 2 - Creadores */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="col-span-1 md:col-span-4 bg-[#0A0A0A] border border-white/10 hover:border-[#7C3AED]/50 rounded-[32px] p-10 relative overflow-hidden group transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <User size={24} className="text-[#7C3AED]" />
                  <div>
                    <h3 className="text-2xl font-medium mb-2">Para el Creador</h3>
                    <p className="text-white/50 text-sm">Horas perdidas en tareas manuales y publicación, limitando el tiempo real para crear e innovar.</p>
                  </div>
                </div>
              </motion.div>

              {/* Box 3 - Empresas */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="col-span-1 md:col-span-4 bg-[#0A0A0A] border border-white/10 hover:border-[#4ECCA3]/50 rounded-[32px] p-10 relative overflow-hidden group transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-[#4ECCA3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <Layers size={24} className="text-[#4ECCA3]" />
                  <div>
                    <h3 className="text-2xl font-medium mb-2">Para la Empresa</h3>
                    <p className="text-white/50 text-sm">Operación a ciegas. Logística dependiente de WhatsApp y Excel que se rompe al intentar escalar.</p>
                  </div>
                </div>
              </motion.div>

              {/* Box 4 - Transformateck approach */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="col-span-1 md:col-span-8 bg-[#0A0A0A] border border-white/10 hover:border-[#4ECCA3]/50 rounded-[32px] p-10 flex items-center justify-center relative overflow-hidden transition-colors duration-500"
              >
                {/* Abstract Code/Data visualization */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 font-mono text-[10px] text-[#4ECCA3] leading-relaxed p-10 mask-radial-faded">
                  {`function deployTransformateck() {\n  const region = "LATAM";\n  const ecosystem = { one: true, workspace: true };\n  if (problems.manual_processes) {\n    return initEcosystemOne();\n  } else if (problems.logistics) {\n    return initTransSyncTMS();\n  }\n}\n\n// Monitoring real-time LATAM solutions...\n[SUCCESS] Emprendedor empowered.`}
                </div>
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-medium">La solución no es importar. Es construir para nosotros.</h3>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. SOLUCIONES QUE OFRECEMOS (Visual Grid) */}
        <section className="py-32 px-6 md:px-12 bg-gradient-to-b from-transparent to-[#0A0A0A]/50 relative z-10 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20 text-center">
              <div className="inline-block px-4 py-2 rounded-full border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 text-[#4ECCA3] text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                Nuestras Soluciones
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Qué Ofrecemos.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Automatización para Creadores', desc: 'Sistemas inteligentes (Ecosistema One) para programar, publicar y gestionar contenido masivo.', icon: Zap },
                { title: 'Sistemas Empresariales', desc: 'Módulos escalables para RRHH, inventarios, logística (TMS) y finanzas bajo un mismo ecosistema (Workspace).', icon: MapPin },
                { title: 'Herramientas de IA', desc: 'Generación de texto, imágenes y análisis predictivo integrados nativamente en nuestras apps.', icon: Cpu },
                { title: 'Data Analytics B2B', desc: 'Dashboards gerenciales con KPIs logísticos y financieros en tiempo real.', icon: BarChart3 },
                { title: 'Sincronización Global', desc: 'Tu oficina y tu estudio sincronizados en todos tus dispositivos sin fricción.', icon: Layers },
                { title: 'Arquitectura Segura', desc: 'Bases de datos encriptadas y autenticación robusta para proteger tu operación.', icon: Shield }
              ].map((feat, i) => (
                <motion.div 
                  key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                  className="bg-[#050505] border border-white/10 hover:border-[#4ECCA3] rounded-3xl p-8 relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4ECCA3]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <feat.icon size={32} className="text-[#4ECCA3] mb-6 relative z-10" />
                  <h4 className="text-2xl font-black uppercase tracking-tight mb-3 relative z-10">{feat.title}</h4>
                  <p className="text-white/50 text-sm font-medium relative z-10">{feat.desc}</p>
                  <div className="absolute top-8 right-8 w-8 h-8 rounded-full border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    <ArrowRight size={14} className="text-[#4ECCA3]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ECOSISTEMAS (Massive Visual Cards) */}
        <section id="ecosistemas" className="py-32 px-6 md:px-12 relative z-10">
          <div className="max-w-[1400px] mx-auto">
            
            {/* WORKSPACE (Dominant Teal) */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="w-full bg-[#0A0E0C] border-2 border-[#4ECCA3] rounded-[40px] overflow-hidden flex flex-col lg:flex-row relative group mb-12 shadow-[0_0_80px_rgba(78,204,163,0.1)]"
            >
              <div className="lg:w-1/2 p-12 md:p-20 relative z-10">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#4ECCA3] mb-12 shadow-[0_0_20px_rgba(78,204,163,0.5)]">
                  <Globe size={16} className="text-[#050505]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#050505]">Empresas y Logística</span>
                </div>
                <h3 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter uppercase text-white">
                  Transformateck <br/><span className="text-[#4ECCA3]">Workspace.</span>
                </h3>
                <p className="text-white/60 text-lg mb-10 font-medium max-w-md">El sistema operativo definitivo para tu empresa. Un ecosistema de módulos integrados: Recursos Humanos, Inventarios, Logística, y Finanzas, todo centralizado.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-12">
                   {[
                     { stat: 'ERP', label: 'Gestión Centralizada' },
                     { stat: 'B2B', label: 'Escala Industrial' },
                     { stat: 'RRHH', label: 'Nóminas y Talento' },
                     { stat: 'Pro', label: 'Inventario y Logística' }
                   ].map((s,i) => (
                     <div key={i} className="border border-[#4ECCA3]/20 bg-[#4ECCA3]/5 rounded-xl p-4">
                       <div className="text-xl font-black text-[#4ECCA3]">{s.stat}</div>
                       <div className="text-[9px] font-bold uppercase tracking-widest text-white/40">{s.label}</div>
                     </div>
                   ))}
                </div>

                <a href="https://workspace.transformateck.com" className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-[#4ECCA3] text-[#050505] rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(78,204,163,0.4)]">
                  Explorar Workspace
                </a>
              </div>
              
              {/* Visual Side for Workspace */}
              <div className="lg:w-1/2 bg-[#050505] relative overflow-hidden flex items-center justify-center p-10 border-l border-[#4ECCA3]/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(78,204,163,0.2)_0,transparent_70%)]" />
                 {/* Massive animated dashboard abstraction */}
                 <motion.div 
                   animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="w-full max-w-lg bg-[#0A0E0C] border border-[#4ECCA3]/30 rounded-2xl p-6 shadow-[0_30px_60px_rgba(78,204,163,0.2)]"
                 >
                   <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#4ECCA3] animate-pulse shadow-[0_0_20px_#4ECCA3]" />
                        <div>
                          <div className="w-24 h-3 bg-white/20 rounded-full mb-2" />
                          <div className="w-16 h-2 bg-white/10 rounded-full" />
                        </div>
                     </div>
                     <MapPin size={24} className="text-[#4ECCA3]" />
                   </div>
                   <div className="space-y-4">
                     {[1,2,3].map(i => (
                       <div key={i} className="flex items-center justify-between p-4 bg-[#4ECCA3]/5 border border-[#4ECCA3]/10 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-[#4ECCA3]/20" />
                            <div className="w-32 h-2 bg-white/20 rounded-full" />
                          </div>
                          <div className="w-12 h-4 rounded-full bg-[#4ECCA3]/30" />
                       </div>
                     ))}
                   </div>
                 </motion.div>
              </div>
            </motion.div>

            {/* ONE (Secondary) */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="w-full bg-[#0A0A0A] border border-white/10 hover:border-[#7C3AED]/50 rounded-[40px] overflow-hidden flex flex-col lg:flex-row relative group transition-colors duration-500"
            >
              <div className="lg:w-1/2 p-12 md:p-20 relative z-10">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30 mb-12">
                  <User size={16} className="text-[#7C3AED]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7C3AED]">Creadores de Contenido</span>
                </div>
                <h3 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter uppercase text-white">
                  Transformateck <br/><span className="text-[#7C3AED]">One.</span>
                </h3>
                <p className="text-white/60 text-lg mb-10 font-medium max-w-md">Tu laboratorio personal. Automatización de marca, IA para generación de contenido y herramientas consolidadas para el individuo moderno.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-12">
                   {[
                     { stat: 'IA', label: 'Generación Automática' },
                     { stat: 'Auto', label: 'Publicación Masiva' },
                     { stat: 'Sync', label: 'Multi-Plataforma' },
                     { stat: 'Hub', label: 'Marca Personal' }
                   ].map((s,i) => (
                     <div key={i} className="border border-[#7C3AED]/20 bg-[#7C3AED]/5 rounded-xl p-4">
                       <div className="text-xl font-black text-[#7C3AED]">{s.stat}</div>
                       <div className="text-[9px] font-bold uppercase tracking-widest text-white/40">{s.label}</div>
                     </div>
                   ))}
                </div>

                <a href="https://one.transformateck.com" className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-white text-[#050505] rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#7C3AED] hover:text-white transition-all duration-300">
                  Entrar a One
                </a>
              </div>
              
              {/* Visual Side for One */}
              <div className="lg:w-1/2 bg-[#050508] relative overflow-hidden flex items-center justify-center p-10">
                 {/* Abstract UI representation */}
                 <div className="w-full max-w-md bg-[#0A0A0A] border border-[#7C3AED]/20 rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-700">
                   <div className="h-10 border-b border-[#7C3AED]/10 flex items-center px-4 gap-2">
                     <div className="w-3 h-3 rounded-full bg-white/10" /><div className="w-3 h-3 rounded-full bg-white/10" /><div className="w-3 h-3 rounded-full bg-white/10" />
                   </div>
                   <div className="p-6 space-y-6">
                     <div className="flex gap-4">
                       <div className="w-16 h-16 rounded-xl bg-[#7C3AED]/20 animate-pulse" />
                       <div className="flex-1 space-y-2 py-2">
                         <div className="h-3 w-1/3 bg-[#7C3AED]/30 rounded-full" />
                         <div className="h-3 w-3/4 bg-white/5 rounded-full" />
                       </div>
                     </div>
                     <div className="h-32 rounded-xl border border-[#7C3AED]/10 bg-gradient-to-br from-[#7C3AED]/5 to-transparent" />
                   </div>
                 </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* PIPELINE / PRODUCTOS OFICIALES */}
        <section id="productos" className="py-32 px-6 md:px-12 border-t border-white/5 bg-[#0A0A0A]">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-20">
              <span className="text-[11px] font-bold tracking-widest text-[#4ECCA3] uppercase mb-4 block">Nuestro Ecosistema en Acción</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase">Productos de Transformateck.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-transparent">
              
              {/* FILA 1 */}
              {/* Avocado Estudio (One) */}
              <a href="https://one.transformateck.com/app" className="bg-[#050505] border border-white/10 hover:border-[#7C3AED]/50 p-10 rounded-3xl relative group transition-colors duration-300 block text-left">
                <div className="flex justify-between items-start mb-8">
                  <div className="px-3 py-1 rounded border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[10px] uppercase tracking-widest font-black text-[#7C3AED]">Ecosistema One</div>
                  <span className="text-[10px] text-white/40 font-mono border border-white/10 px-2 py-1 rounded">V 1.0</span>
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase">Avocado Estudio</h3>
                <p className="text-white/50 text-base leading-relaxed mb-8">Motor de automatización y gestión de marca personal. Herramientas de IA para generación de contenido, diseñado específicamente para acelerar el flujo de trabajo del creador moderno en LATAM.</p>
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono">React</span>
                   <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono">AI Engine</span>
                </div>
              </a>

              {/* Cárgalo TMS (Workspace) */}
              <a href="https://transsync.transformateck.com" className="bg-[#050505] border border-white/10 hover:border-[#4ECCA3]/50 p-10 rounded-3xl relative group transition-colors duration-300 block text-left">
                <div className="flex justify-between items-start mb-8">
                  <div className="px-3 py-1 rounded border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 text-[10px] uppercase tracking-widest font-black text-[#4ECCA3]">Ecosistema Workspace</div>
                  <span className="text-[10px] text-white/40 font-mono border border-white/10 px-2 py-1 rounded">V 2.0 B2B</span>
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase">TransSync TMS</h3>
                <p className="text-white/50 text-base leading-relaxed mb-8">El núcleo operativo para empresas de logística. Un Sistema de Gestión de Transporte (TMS) de alta fidelidad que ofrece monitoreo en tiempo real, control de rutas y gestión de flotillas.</p>
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono">Next.js</span>
                   <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono">Live Tracking</span>
                </div>
              </a>

              {/* FILA 2 */}
              {/* SpecForge-TSX (One) */}
              <div className="bg-[#050505] border border-white/10 hover:border-[#7C3AED]/50 p-10 rounded-3xl relative group transition-colors duration-300">
                <div className="flex justify-between items-start mb-8">
                  <div className="px-3 py-1 rounded border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[10px] uppercase tracking-widest font-black text-[#7C3AED]">Ecosistema One</div>
                  <span className="text-[10px] text-white/40 font-mono border border-white/10 px-2 py-1 rounded">V 1.0</span>
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase">SpecForge-TSX</h3>
                <p className="text-white/50 text-base leading-relaxed mb-8">Herramienta CLI de desarrollo de alta fidelidad. Auto-corrección de código, validación de builds e inyección de infraestructura para acelerar la creación de software en el ecosistema.</p>
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono">CLI</span>
                   <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono">Auto-Healing</span>
                </div>
              </div>

              {/* Nexus HR (Workspace) */}
              <div className="bg-[#050505] border border-white/10 hover:border-[#4ECCA3]/50 p-10 rounded-3xl relative group transition-colors duration-300">
                <div className="flex justify-between items-start mb-8">
                  <div className="px-3 py-1 rounded border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 text-[10px] uppercase tracking-widest font-black text-[#4ECCA3]">Ecosistema Workspace</div>
                  <span className="text-[10px] text-white/40 font-mono border border-white/10 px-2 py-1 rounded">V 1.0 B2B</span>
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase">Nexus HR</h3>
                <p className="text-white/50 text-base leading-relaxed mb-8">Plataforma integral para la gestión de Recursos Humanos. Automatización de nóminas, control de asistencias, reclutamiento y retención de talento estructurado para empresas escalables.</p>
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono">Automatización</span>
                   <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono">Nómina</span>
                </div>
              </div>

              {/* FILA 3 */}
              {/* Comunidad (One) */}
              <div className="bg-[#050505] border border-white/10 hover:border-[#7C3AED]/50 p-10 rounded-3xl relative group transition-colors duration-300">
                <div className="flex justify-between items-start mb-8">
                  <div className="px-3 py-1 rounded border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[10px] uppercase tracking-widest font-black text-[#7C3AED]">Ecosistema One</div>
                  <span className="text-[10px] text-white/40 font-mono border border-white/10 px-2 py-1 rounded">Global</span>
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase">La Comunidad</h3>
                <p className="text-white/50 text-base leading-relaxed mb-8">El punto de encuentro para creadores, desarrolladores y emprendedores. Comparte conocimiento, accede a recursos exclusivos y escala tu impacto conectando con los mejores talentos de LATAM.</p>
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono">Networking</span>
                   <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono">Recursos</span>
                </div>
              </div>

              {/* Kardex OS (Workspace) */}
              <div className="bg-[#050505] border border-white/10 hover:border-[#4ECCA3]/50 p-10 rounded-3xl relative group transition-colors duration-300">
                <div className="flex justify-between items-start mb-8">
                  <div className="px-3 py-1 rounded border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 text-[10px] uppercase tracking-widest font-black text-[#4ECCA3]">Ecosistema Workspace</div>
                  <span className="text-[10px] text-white/40 font-mono border border-white/10 px-2 py-1 rounded">V 1.0 B2B</span>
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase">Kardex OS</h3>
                <p className="text-white/50 text-base leading-relaxed mb-8">Sistema avanzado de control de inventarios y almacenes (WMS). Sincronización en tiempo real, alertas de stock predictivas y trazabilidad completa de cada producto en la cadena de suministro.</p>
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono">Predictivo</span>
                   <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-mono">Inventarios</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MANIFESTO LATAM */}
        <section id="manifiesto" className="py-40 px-6 md:px-12 min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] text-white/90 uppercase"
            >
              Un emprendedor en Monterrey <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#7C3AED]">merece las mismas herramientas</span><br/>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
              <div className="lg:col-span-2">
                <div className="w-12 h-12 rounded-xl bg-[#4ECCA3] flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(78,204,163,0.4)]">
                  <Cpu size={24} className="text-[#050505]" />
                </div>
                <p className="text-white/50 font-medium max-w-sm mb-8 leading-relaxed">
                  Transformateck Innovation Lab. Construyendo la infraestructura digital nativa que América Latina necesita para escalar.
                </p>
              </div>
              
              <div>
                <h4 className="text-[#4ECCA3] font-black uppercase tracking-widest text-[10px] mb-6">Nuestros Ecosistemas</h4>
                <ul className="space-y-4 font-bold text-sm">
                  <li><a href="https://workspace.transformateck.com" className="text-white/60 hover:text-white transition-colors">Workspace (Empresas)</a></li>
                  <li><a href="https://one.transformateck.com" className="text-white/60 hover:text-white transition-colors">One (Creadores)</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[#4ECCA3] font-black uppercase tracking-widest text-[10px] mb-6">Nuestros Productos</h4>
                <ul className="space-y-4 font-bold text-sm">
                  <li><Link href="#" className="text-white/60 hover:text-white transition-colors">TransSync TMS</Link></li>
                  <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Avocado Estudio</Link></li>
                </ul>
              </div>
            </div>

            {/* MASSIVE GLOWING LOGO */}
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
