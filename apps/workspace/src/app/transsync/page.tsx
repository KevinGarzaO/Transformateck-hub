'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, Map, Shield, BarChart3, ArrowRight, PlayCircle, CheckCircle2, Globe, Users } from 'lucide-react';

export default function transsyncLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 px-12 border-b border-ink-50 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1A8FBF] to-[#4CB89C] flex items-center justify-center shadow-lg">
            <Truck className="text-white w-5 h-5" />
          </div>
          <span className="text-[#0E2A3A] font-extrabold text-xl tracking-tight">TransSync<sup className="text-[10px] opacity-50 ml-0.5">®</sup></span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <Link href="#features" className="text-sm font-bold text-[#5C7480] hover:text-[#0E2A3A] transition-colors">Características</Link>
          <Link href="#pricing" className="text-sm font-bold text-[#5C7480] hover:text-[#0E2A3A] transition-colors">Precios</Link>
          <Link href="#solutions" className="text-sm font-bold text-[#5C7480] hover:text-[#0E2A3A] transition-colors">Soluciones</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/transsync/dashboard/inicio" className="btn btn-solid px-6 py-2.5 rounded-full text-sm">Prueba el Panel</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1A8FBF]/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#4CB89C]/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h1 className="text-7xl font-black text-[#0E2A3A] leading-[1.05] tracking-tight mb-8">
              Logística <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A8FBF] to-[#4CB89C]">Inteligente</span> en tiempo real.
            </h1>
            <p className="text-xl text-[#5C7480] mb-12 leading-relaxed max-w-xl">
              TransSync es el TMS líder en México para la gestión de flotas, monitoreo de última milla y automatización de despacho. Optimiza tus rutas y reduce costos operativos hoy mismo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/transsync/dashboard/inicio" className="px-8 py-4 bg-[#0E2A3A] text-white rounded-2xl font-bold text-lg hover:bg-[#1A8FBF] transition-all shadow-xl shadow-primary/10 flex items-center gap-3 group">
                Comenzar ahora <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-white text-[#0E2A3A] border border-ink-100 rounded-2xl font-bold text-lg hover:bg-ink-50 transition-all flex items-center gap-3">
                <PlayCircle size={20} className="text-[#1A8FBF]" /> Ver Demo
              </button>
            </div>
            
            <div className="mt-16 flex items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
               <div className="text-xs font-bold uppercase tracking-widest text-ink-400">Confían en nosotros:</div>
               <Users size={24} />
               <Truck size={24} />
               <Globe size={24} />
            </div>
          </div>

          <div className="relative">
             <div className="relative z-10 bg-white rounded-[40px] p-4 shadow-2xl border border-ink-50 rotate-3 group hover:rotate-0 transition-transform duration-700">
                <div className="aspect-video bg-[#F2F6F8] rounded-[30px] overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-tr from-[#0E2A3A]/20 to-transparent pointer-events-none" />
                   <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1000" alt="TMS Monitor" className="w-full h-full object-cover" />
                   <div className="absolute bottom-8 left-8 p-6 bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white/50 max-w-[280px]">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="w-3 h-3 rounded-full bg-[#4CB89C] animate-pulse" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-[#0E2A3A]">En Tránsito</span>
                      </div>
                      <div className="text-sm font-bold text-[#0E2A3A]">Ruta MTY-CDMX</div>
                      <div className="text-[10px] text-ink-400 mt-1 font-medium">98% de precisión en llegada estimada</div>
                   </div>
                </div>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-[#1A8FBF]/20 to-[#4CB89C]/20 blur-[100px] z-0 opacity-50" />
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-[#F2F6F8]">
        <div className="max-w-7xl mx-auto px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-[#0E2A3A] mb-6 tracking-tight">Todo lo que necesitas para escalar tu logística</h2>
            <p className="text-lg text-[#5C7480]">Nuestra plataforma integra cada aspecto de tu operación en una sola interfaz inteligente y poderosa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: Map, 
                title: 'Monitoreo Global', 
                desc: 'Visualiza toda tu flota en un mapa dinámico con telemetría en tiempo real y alertas de desvío.',
                color: 'text-[#1A8FBF]'
              },
              { 
                icon: BarChart3, 
                title: 'Analítica Predictiva', 
                desc: 'Anticípate a retrasos y optimiza el consumo de combustible mediante algoritmos de IA.',
                color: 'text-[#4CB89C]'
              },
              { 
                icon: Shield, 
                title: 'Gestión Documental', 
                desc: 'Control total de seguros, licencias y mantenimientos con sistema de alertas preventivas.',
                color: 'text-[#EAB308]'
              }
            ].map((f, i) => (
              <div key={i} className="p-10 bg-white rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-[#1A8FBF]/10">
                <div className={`w-14 h-14 rounded-2xl bg-ink-50 flex items-center justify-center ${f.color} mb-8`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#0E2A3A] mb-4">{f.title}</h3>
                <p className="text-[#5C7480] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Numbers */}
      <section className="py-24 border-y border-ink-50">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { n: '500k+', l: 'Envíos procesados' },
            { n: '99.9%', l: 'Uptime del servidor' },
            { n: '30%', l: 'Ahorro operativo avg.' },
            { n: '15min', l: 'Setup inicial' }
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-black text-[#0E2A3A] mb-2">{s.n}</div>
              <div className="text-xs font-bold text-ink-400 uppercase tracking-widest">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 px-12">
         <div className="max-w-5xl mx-auto bg-[#0E2A3A] rounded-[48px] p-16 relative overflow-hidden text-center text-white shadow-2xl shadow-primary/30">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1A8FBF]/10 blur-[80px] rounded-full translate-x-1/4 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#4CB89C]/10 blur-[80px] rounded-full -translate-x-1/4 translate-y-1/4" />
            
            <h2 className="text-5xl font-black mb-8 tracking-tight relative z-10">¿Listo para transformar tu operación?</h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto relative z-10">Únete a cientos de empresas que ya están ahorrando tiempo y dinero con el TMS más moderno del mercado.</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
               <Link href="/transsync/dashboard/inicio" className="px-10 py-5 bg-[#1A8FBF] text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-[#0E2A3A] transition-all flex items-center gap-3">
                  Crear cuenta gratuita <ArrowRight size={20} />
               </Link>
               <button className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                  Hablar con un experto
               </button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-white/40 text-sm font-medium relative z-10">
               <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Sin tarjeta de crédito</div>
               <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Cancela en cualquier momento</div>
            </div>
         </div>
      </section>

      <footer className="py-12 px-12 border-t border-ink-50 bg-white">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 opacity-50 grayscale">
              <div className="w-8 h-8 rounded-lg bg-ink-900 flex items-center justify-center">
                <Truck className="text-white w-5 h-5" />
              </div>
              <span className="text-ink-900 font-extrabold text-lg tracking-tight">TransSync<sup className="text-[10px] opacity-50 ml-0.5">®</sup></span>
            </div>
            <div className="flex items-center gap-8 text-sm font-medium text-ink-500">
               <span>© 2026 Transformateck. Todos los derechos reservados.</span>
               <Link href="#" className="hover:text-primary transition-colors">Privacidad</Link>
               <Link href="#" className="hover:text-primary transition-colors">Términos</Link>
            </div>
         </div>
      </footer>
    </div>
  );
}
