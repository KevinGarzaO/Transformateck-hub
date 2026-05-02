'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Film, Mic, Sparkles, ArrowRight, Play, Check, Instagram, Twitter, Youtube } from 'lucide-react';

export default function AvocadoLanding() {
  return (
    <div className="min-h-screen bg-[#0E1612] text-white selection:bg-[#4CB89C] selection:text-white">
      {/* Premium Navbar */}
      <nav className="flex items-center justify-between p-8 px-12 sticky top-0 bg-[#0E1612]/80 backdrop-blur-xl z-50 border-b border-white/5">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-[14px] bg-[#4CB89C] flex items-center justify-center shadow-[0_0_20px_rgba(76,184,156,0.3)]">
              <Camera size={22} className="text-white" />
           </div>
           <span className="text-xl font-black tracking-tighter">Avocado<span className="text-[#4CB89C]">Estudio</span></span>
        </div>
        <div className="hidden md:flex items-center gap-10">
           <Link href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">Portafolio</Link>
           <Link href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">Servicios</Link>
           <Link href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">Precios</Link>
        </div>
        <div className="flex items-center gap-6">
           <Link href="https://one.transformateck.com/login" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">Login</Link>
           <Link href="/app" className="px-6 py-3 bg-white text-[#0E1612] rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#4CB89C] hover:text-white transition-all shadow-xl">Comenzar</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-24 pb-40 px-12 overflow-hidden">
         <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#4CB89C]/10 blur-[150px] rounded-full pointer-events-none" />
         <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#1A8FBF]/10 blur-[120px] rounded-full pointer-events-none" />

         <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#4CB89C] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
               <Sparkles size={14} /> Tu visión, capturada con precisión
            </div>
            <h1 className="text-8xl md:text-[120px] font-black tracking-tighter leading-[0.9] mb-12">
               CREATIVIDAD <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CB89C] via-[#66D6B5] to-[#1A8FBF]">SIN LÍMITES</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-16 leading-relaxed">
               La plataforma definitiva para gestionar producciones creativas, coordinar equipos de contenido y elevar tu narrativa visual a un nivel superior.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
               <Link href="/app" className="px-10 py-6 bg-[#4CB89C] text-white rounded-[24px] font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-[#4CB89C]/20 flex items-center gap-4 group">
                  Explorar Estudio <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
               </Link>
               <button className="px-10 py-6 bg-white/5 border border-white/10 text-white rounded-[24px] font-black text-lg hover:bg-white/10 transition-all flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#4CB89C] transition-colors">
                     <Play size={18} fill="currentColor" />
                  </div>
                  Ver Reel
               </button>
            </div>
         </div>
      </header>

      {/* Capabilities Section */}
      <section className="py-40 bg-[#0A100D] border-y border-white/5">
         <div className="max-w-7xl mx-auto px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
               {[
                  {
                     icon: Film,
                     title: 'Producción de Video',
                     desc: 'Gestión integral de flujos de trabajo de video, desde la pre-producción hasta el render final.',
                     accent: 'bg-[#4CB89C]'
                  },
                  {
                     icon: Mic,
                     title: 'Diseño Sonoro',
                     desc: 'Herramientas avanzadas para la coordinación de audio y post-producción de sonido envolvente.',
                     accent: 'bg-[#1A8FBF]'
                  },
                  {
                     icon: Sparkles,
                     title: 'VFX & Color',
                     desc: 'Optimización de procesos para efectos visuales y corrección de color profesional en la nube.',
                     accent: 'bg-[#EAB308]'
                  }
               ].map((c, i) => (
                  <div key={i} className="group p-10 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-[#4CB89C]/30 transition-all duration-700">
                     <div className={`w-16 h-16 rounded-2xl ${c.accent} flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-700`}>
                        <c.icon size={32} />
                     </div>
                     <h3 className="text-3xl font-bold mb-6">{c.title}</h3>
                     <p className="text-lg text-white/50 leading-relaxed">{c.desc}</p>
                     <div className="mt-8 h-px w-full bg-white/10 group-hover:bg-[#4CB89C]/30 transition-colors" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-40 px-12">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative">
               <div className="aspect-square rounded-[60px] bg-gradient-to-tr from-[#4CB89C]/20 to-[#1A8FBF]/20 p-8">
                  <div className="w-full h-full rounded-[40px] overflow-hidden shadow-2xl relative">
                     <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000" alt="Creative Workspace" className="w-full h-full object-cover opacity-80" />
                     <div className="absolute inset-0 bg-[#0E1612]/40" />
                     <div className="absolute bottom-12 left-12 p-8 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 max-w-xs">
                        <div className="text-3xl font-black mb-2 text-[#4CB89C]">85%</div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/70">Mayor eficiencia en tiempos de entrega</p>
                     </div>
                  </div>
               </div>
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#4CB89C] blur-[100px] opacity-30 rounded-full" />
            </div>

            <div>
               <h2 className="text-6xl font-black mb-10 leading-[1.1] tracking-tighter">DISEÑADO POR <br/><span className="text-[#4CB89C]">CREADORES</span>.</h2>
               <div className="space-y-8">
                  {[
                     'Colaboración en tiempo real para equipos creativos.',
                     'Sistema de gestión de activos de alta fidelidad.',
                     'Flujos de aprobación simplificados para clientes.',
                     'Integración nativa con herramientas de edición profesional.'
                  ].map((t, i) => (
                     <div key={i} className="flex items-start gap-5">
                        <div className="w-7 h-7 rounded-full bg-[#4CB89C]/20 flex items-center justify-center shrink-0 mt-1">
                           <Check size={16} className="text-[#4CB89C]" />
                        </div>
                        <p className="text-xl text-white/70">{t}</p>
                     </div>
                  ))}
               </div>
               <button className="mt-16 px-12 py-5 border border-white/10 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white hover:text-[#0E1612] transition-all">
                  Explorar Características
               </button>
            </div>
         </div>
      </section>

      {/* Social Links / Footer */}
      <footer className="py-24 px-12 border-t border-white/5 bg-[#080E0B]">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div>
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#4CB89C] flex items-center justify-center">
                     <Camera size={18} className="text-white" />
                  </div>
                  <span className="text-lg font-black tracking-tighter">Avocado<span className="text-[#4CB89C]">Estudio</span></span>
               </div>
               <p className="text-white/30 text-sm font-medium">Elevando el estándar de la producción creativa.</p>
            </div>
            
            <div className="flex gap-10">
               {[Instagram, Twitter, Youtube].map((Icon, i) => (
                  <Link key={i} href="#" className="text-white/30 hover:text-[#4CB89C] transition-colors">
                     <Icon size={24} />
                  </Link>
               ))}
            </div>

            <div className="text-right">
               <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Una iniciativa de</p>
               <span className="text-xl font-black tracking-tighter italic text-white/80">One<span className="text-[#4CB89C]">.</span></span>
            </div>
         </div>
      </footer>
    </div>
  );
}
