'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, Activity, MapPin, Layers, Shield, Database, BarChart3, Users, Box } from 'lucide-react';
import { AnalyticsEvents } from '@/lib/analytics/events';

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
    {/* Grid Pattern Teal */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(78,204,163,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(78,204,163,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
    
    {/* Orbe Teal Principal (Massive Glow) */}
    <motion.div 
      animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-[10%] left-[-20%] w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,rgba(78,204,163,0.15)_0,transparent_50%)] rounded-full blur-3xl mix-blend-screen"
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
            <Layers size={16} className="text-[#050505]" />
         </div>
         <span className="text-xl font-black tracking-tighter text-white">Transformateck <span className="text-[#4ECCA3]">Workspace</span></span>
      </div>
      
      <div className="hidden lg:flex items-center gap-12 bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-[#4ECCA3]/20">
         {[
           { name: 'Operatividad', id: 'el-problema' },
           { name: 'Infraestructura', id: 'tecnologia' },
           { name: 'Módulos', id: 'modulos' }
         ].map((item, i) => (
            <Link key={i} href={`#${item.id}`} className="text-xs font-bold text-white/70 hover:text-[#4ECCA3] transition-colors tracking-widest uppercase">{item.name}</Link>
         ))}
      </div>

      <div className="flex items-center gap-6">
         <a href="https://www.transformateck.com" className="hidden sm:block text-xs font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest">Volver al Hub</a>
         <Link 
           href="/login" 
           onClick={() => AnalyticsEvents.ctaClick('portal-b2b', 'navbar')}
           className="px-6 py-3 bg-[#4ECCA3] text-[#050505] text-xs font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_30px_rgba(78,204,163,0.4)] transition-all duration-300 flex items-center gap-2"
         >
            Portal B2B <ArrowRight size={14} />
         </Link>
      </div>
    </div>
  </motion.nav>
);

const Marquee = () => (
  <div className="w-full bg-[#4ECCA3] py-3 overflow-hidden flex whitespace-nowrap transform rotate-2 scale-105 border-y border-[#4ECCA3] z-20 relative shadow-[0_0_50px_rgba(78,204,163,0.2)]">
    <motion.div 
      animate={{ x: [0, -1035] }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      className="flex gap-8 items-center text-[#050505] font-black uppercase tracking-widest text-sm"
    >
      {[...Array(10)].map((_, i) => (
        <React.Fragment key={i}>
          <span>El Sistema Operativo Empresarial</span>
          <Sparkles size={16} />
          <span>Trazabilidad en Tiempo Real</span>
          <Sparkles size={16} />
          <span>TransSync TMS</span>
          <Sparkles size={16} />
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export default function WorkspaceLanding() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-[#050505] text-white selection:bg-[#4ECCA3] selection:text-[#050505] font-sans min-h-screen overflow-x-hidden">
      <BackgroundEffects />
      <Navbar />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-[#4ECCA3] transform-origin-left z-[100] shadow-[0_0_10px_rgba(78,204,163,0.3)]" style={{ scaleX }} />

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-6 z-10">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 backdrop-blur-sm mb-8 shadow-[0_0_20px_rgba(78,204,163,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#4ECCA3] animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.3em] text-[#4ECCA3] uppercase">B2B Ecosystem</span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-6xl md:text-[80px] lg:text-[100px] font-black tracking-tighter leading-[0.85] mb-8 uppercase">
                EL SISTEMA OPERATIVO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] via-white to-[#4ECCA3]">EMPRESARIAL.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/60 max-w-xl mb-12 font-medium">
                Logística, Recursos Humanos e Inventarios bajo una misma infraestructura industrial. Despídete del desorden y opera con visibilidad total.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                <Link href="/app" className="px-10 py-5 bg-[#4ECCA3] text-[#050505] rounded-full font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:shadow-[0_0_40px_rgba(78,204,163,0.5)] transition-all duration-300">
                  Acceder al Portal <ArrowRight size={18} />
                </Link>
                <Link href="#modulos" className="px-10 py-5 border border-white/20 bg-white/5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:border-[#4ECCA3]/50 hover:bg-[#4ECCA3]/10 transition-all duration-300">
                  Ver Módulos
                </Link>
              </motion.div>
            </motion.div>

            {/* Abstract 3D Teal Dashboards */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-6 relative h-[600px] w-full hidden lg:block perspective-1000">
              <div className="absolute inset-0 flex items-center justify-center transform-style-3d rotate-x-[-10deg] rotate-y-[15deg]">
                
                {/* Floating Map/Routing Card */}
                <motion.div 
                  animate={{ y: [0, 30, 0], rotateZ: [0, 2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute z-30 w-[320px] bg-[#0A0E0C]/90 backdrop-blur-xl border border-[#4ECCA3]/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(78,204,163,0.2)] translate-x-[120px] translate-y-[-100px]"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                       <MapPin size={18} className="text-[#4ECCA3]" />
                       <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">Live Tracking</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#4ECCA3] animate-ping" />
                  </div>
                  <div className="h-24 w-full bg-[#4ECCA3]/10 rounded-xl mb-4 relative overflow-hidden border border-[#4ECCA3]/20">
                     {/* Simulated route line */}
                     <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-1/2 left-0 h-0.5 bg-[#4ECCA3] shadow-[0_0_10px_#4ECCA3]" />
                  </div>
                  <div className="text-[10px] font-mono text-white/40 flex justify-between">
                     <span>RUTA_MDS_001</span>
                     <span className="text-[#4ECCA3]">EN TRÁNSITO</span>
                  </div>
                </motion.div>

                {/* Floating Metric Data Card */}
                <motion.div 
                  animate={{ y: [0, -30, 0], rotateZ: [0, -2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute z-20 w-[280px] bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl translate-x-[-80px] translate-y-[80px]"
                >
                  <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                     <BarChart3 size={16} className="text-[#4ECCA3]" />
                     <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">Rendimiento Global</span>
                  </div>
                  <div className="space-y-4">
                     {[85, 92, 100].map((w, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <div className="w-6 h-6 rounded bg-[#4ECCA3]/20" />
                           <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${w}%` }} transition={{ duration: 2, delay: i * 0.2 }} className="h-full bg-[#4ECCA3]" />
                           </div>
                        </div>
                     ))}
                  </div>
                </motion.div>

                {/* Background Ring */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute z-10 w-[500px] h-[500px] border-[1px] border-[#4ECCA3]/20 rounded-full border-dashed" />
              </div>
            </motion.div>
          </div>
        </section>

        <Marquee />

        {/* EL PROBLEMA VS LA SOLUCION B2B */}
        <section id="el-problema" className="py-32 px-6 md:px-12 relative z-10 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="inline-flex px-4 py-2 rounded-full border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 text-[#4ECCA3] text-[10px] font-black uppercase tracking-[0.3em] mb-6">Operatividad Rota</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">Operar a ciegas <br/>cuesta <span className="text-[#4ECCA3]">muy caro.</span></h2>
              <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">Depender de WhatsApp, hojas de cálculo en Excel y software heredado que no se comunica entre sí, es la fórmula perfecta para estancar el crecimiento de tu empresa.</p>
              <ul className="space-y-5">
                 {['Pérdida de inventario y falta de trazabilidad', 'Asignación manual de rutas y operadores', 'Nóminas complejas propensas a error humano', 'Decisiones basadas en intuición, no en datos'].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-white/70 font-medium">
                     <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0"><span className="text-red-500 text-xs font-black">×</span></div>
                     {item}
                   </li>
                 ))}
              </ul>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-[#0A0A0A] border border-[#4ECCA3]/30 p-10 md:p-14 rounded-[40px] relative overflow-hidden group shadow-[0_0_50px_rgba(78,204,163,0.1)] hover:shadow-[0_0_80px_rgba(78,204,163,0.2)] transition-shadow duration-500">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(78,204,163,0.15)_0,transparent_70%)]" />
              <h3 className="text-3xl md:text-4xl font-black uppercase mb-10 relative z-10 leading-tight">La Vía <br/><span className="text-[#4ECCA3]">Transformateck Workspace</span></h3>
              <ul className="space-y-8 relative z-10">
                 {[
                   { t: 'ERP Completamente Unificado', d: 'Logística, Inventario y Recursos Humanos comparten la misma base de datos y paneles de control.' },
                   { t: 'Trazabilidad en Tiempo Real', d: 'Sigue cada viaje, cada paquete y cada empleado al segundo.' },
                   { t: 'Reportes y KPIs Automatizados', d: 'Dashboards directivos en vivo. Toma decisiones de negocio basadas en números reales.' },
                   { t: 'Seguridad Empresarial', d: 'Arquitectura escalable en la nube con cifrado de grado industrial.' }
                 ].map((item, i) => (
                   <li key={i} className="flex items-start gap-5 group/item">
                     <div className="w-10 h-10 rounded-xl bg-[#4ECCA3]/10 border border-[#4ECCA3]/30 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-[#4ECCA3] group-hover/item:text-[#050505] transition-colors duration-300"><Shield size={18} className="text-[#4ECCA3] group-hover/item:text-[#050505]" /></div>
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
              <div className="inline-flex px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Infraestructura Industrial</div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">Diseñado para <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-white">Escalar.</span></h2>
              <p className="text-white/50 text-xl leading-relaxed font-medium">Toda la potencia de Transformateck se traduce en software B2B de alto rendimiento capaz de manejar miles de solicitudes por segundo sin comprometer la velocidad ni la interfaz.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { icon: Activity, t: 'Monitoreo a 60FPS', d: 'Los simuladores y rastreadores logísticos se renderizan sin parpadeos, asegurando que veas tu flota fluir en tiempo real.' },
                 { icon: Database, t: 'Bases de Datos Relacionales', d: 'Conectividad absoluta. Una actualización en el sistema de logística se refleja automáticamente en la nómina de recursos humanos.' },
                 { icon: Shield, t: 'Autenticación Segura', d: 'Gestión de roles avanzada. Asigna permisos específicos a directores, almacenistas o choferes, manteniendo el control total.' },
               ].map((feat, i) => (
                 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} key={i} className="bg-[#050505] border border-white/10 p-12 rounded-[32px] hover:border-[#4ECCA3]/50 relative group overflow-hidden transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4ECCA3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="w-16 h-16 rounded-2xl bg-[#4ECCA3]/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#4ECCA3] transition-all duration-500 relative z-10">
                      <feat.icon size={28} className="text-[#4ECCA3] group-hover:text-[#050505] transition-colors" />
                    </div>
                    <h4 className="text-2xl font-black uppercase mb-4 relative z-10">{feat.t}</h4>
                    <p className="text-white/50 text-base leading-relaxed relative z-10">{feat.d}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* BENTO GRID: MODULOS WORKSPACE */}
        <section id="modulos" className="py-32 px-6 md:px-12 bg-gradient-to-b from-transparent to-[#0A0A0A]/50 relative z-10 border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-20 text-center">
              <div className="inline-block px-4 py-2 rounded-full border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 text-[#4ECCA3] text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                El Ecosistema
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Nuestros Módulos.</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* TRANSSYNC TMS */}
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-[#050505] border border-white/10 hover:border-[#4ECCA3]/50 p-12 rounded-[40px] relative group transition-colors duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4ECCA3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4ECCA3] to-[#2B8365] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                     <MapPin size={28} className="text-[#050505]" />
                  </div>
                  <span className="text-[10px] font-mono border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 text-[#4ECCA3] px-3 py-1.5 rounded-full">ESTABLE B2B</span>
                </div>
                <h3 className="text-4xl font-black mb-4 uppercase relative z-10">TransSync TMS</h3>
                <p className="text-white/50 text-lg leading-relaxed mb-10 relative z-10 max-w-md">Sustituye la gestión de logística tradicional por un sistema inmersivo. Monitorea choferes, analiza rutas y controla tus envíos al segundo.</p>
                <Link 
                  href="/transsync" 
                  onClick={() => AnalyticsEvents.appClick('transsync-from-workspace')}
                  className="inline-flex relative z-10 items-center justify-center w-full px-8 py-4 bg-white text-[#050505] rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#4ECCA3] transition-all duration-300"
                >
                  Acceder a Operaciones
                </Link>
              </motion.div>

              {/* NEXUS HR */}
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}
                className="bg-[#050505] border border-white/10 hover:border-[#4ECCA3]/50 p-12 rounded-[40px] relative group transition-colors duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4ECCA3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                     <Users size={28} className="text-white" />
                  </div>
                  <span className="text-[10px] font-mono border border-white/10 bg-white/5 text-white/60 px-3 py-1.5 rounded-full">MÓDULO BETA</span>
                </div>
                <h3 className="text-4xl font-black mb-4 uppercase relative z-10">Nexus HR</h3>
                <p className="text-white/50 text-lg leading-relaxed mb-10 relative z-10 max-w-md">Plataforma integral para Recursos Humanos. Automatiza nóminas, controla las asistencias y retén el talento clave de tu empresa.</p>
                <Link href="#" className="inline-flex relative z-10 items-center justify-center w-full px-8 py-4 border border-white/20 bg-transparent text-white rounded-full font-black text-xs uppercase tracking-widest hover:border-[#4ECCA3] hover:bg-[#4ECCA3]/10 transition-all duration-300">
                  Solicitar Acceso
                </Link>
              </motion.div>

              {/* KARDEX OS */}
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}
                className="bg-[#050505] border border-white/10 hover:border-[#4ECCA3]/50 p-12 rounded-[40px] relative group transition-colors duration-500 overflow-hidden lg:col-span-2 flex flex-col md:flex-row items-center gap-12"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(78,204,163,0.05)_0,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex-1 relative z-10">
                  <div className="inline-flex px-3 py-1 rounded border border-[#4ECCA3]/30 bg-[#4ECCA3]/10 text-[10px] uppercase tracking-widest font-black text-[#4ECCA3] mb-6">Gestión WMS</div>
                  <h3 className="text-4xl md:text-5xl font-black mb-4 uppercase">Kardex OS.</h3>
                  <p className="text-white/50 text-lg leading-relaxed max-w-lg mb-8">El cerebro de tu almacén. Sincronización en tiempo real, alertas predictivas de inventario y trazabilidad total para la cadena de suministro industrial.</p>
                  <Link href="#" className="inline-flex items-center gap-2 font-bold text-[#4ECCA3] hover:text-white transition-colors group/link">
                     Ver Especificaciones Técnicas <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
                <div className="w-full md:w-auto flex justify-center relative z-10">
                  <div className="w-40 h-40 rounded-full border-2 border-dashed border-[#4ECCA3]/30 flex items-center justify-center group-hover:rotate-90 group-hover:border-[#4ECCA3] transition-all duration-1000">
                     <Box size={48} className="text-[#4ECCA3]/50 group-hover:text-[#4ECCA3] transition-colors" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION UNIFICADO */}
        <section className="py-40 px-6 md:px-12 relative overflow-hidden bg-[#0A0A0A]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#4ECCA3]/10 to-transparent" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 text-white">
              Escala tu empresa al <br/><span className="text-[#4ECCA3]">siguiente nivel.</span>
            </h2>
            <p className="text-lg text-white/50 mb-12 max-w-2xl mx-auto font-medium">
              Obtén acceso a TransSync, Nexus y Kardex desde una sola cuenta. Registra tu empresa hoy mismo y moderniza tus operaciones logísticas.
            </p>
            <Link href="/app" className="inline-flex px-12 py-6 bg-[#4ECCA3] text-[#050505] rounded-full font-black text-sm uppercase tracking-[0.2em] hover:scale-105 hover:shadow-[0_0_50px_rgba(78,204,163,0.5)] transition-all duration-300">
              Crear Cuenta B2B
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#050505] pt-20 pb-12 px-6 md:px-12 border-t border-white/5 relative z-10">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
               <h1 className="text-2xl font-black tracking-tighter text-white uppercase">Transformateck <span className="text-[#4ECCA3]">Workspace</span></h1>
               <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mt-2">Enterprise Ecosystem</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/50">
               <Link href="/transsync" className="hover:text-[#4ECCA3] transition-colors">TransSync TMS</Link>
               <Link href="#" className="hover:text-[#4ECCA3] transition-colors">Nexus HR</Link>
               <Link href="#" className="hover:text-[#4ECCA3] transition-colors">Kardex OS</Link>
               <Link href="/app" className="hover:text-[#4ECCA3] transition-colors">Cuenta</Link>
               <a href="https://transformateck-hub-web.vercel.app/" className="hover:text-white transition-colors">Ir al Hub Central</a>
            </div>
            
            <p className="text-white/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4ECCA3] animate-pulse" /> LATAM Ready
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
