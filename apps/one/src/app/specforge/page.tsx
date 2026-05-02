'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, Cpu, Zap, Code2, ArrowRight, Github, Bug, Share2, Layers, ShieldCheck } from 'lucide-react';

export default function SpecForgeLanding() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] selection:bg-[#1A8FBF] selection:text-white font-mono">
      {/* Matrix-like Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(26,143,191,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(26,143,191,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Tech Navbar */}
      <nav className="flex items-center justify-between p-6 px-10 sticky top-0 bg-[#050505]/80 backdrop-blur-md z-50 border-b border-[#1A8FBF]/20">
        <div className="flex items-center gap-3">
           <div className="w-9 h-9 rounded-lg bg-[#1A8FBF] flex items-center justify-center shadow-[0_0_15px_rgba(26,143,191,0.4)]">
              <Terminal size={20} className="text-[#050505]" />
           </div>
           <span className="text-xl font-black tracking-widest uppercase">Spec<span className="text-[#1A8FBF]">Forge</span>-Tx</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
           <Link href="#features" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-[#1A8FBF] transition-colors">Core</Link>
           <Link href="#cli" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-[#1A8FBF] transition-colors">CLI</Link>
           <Link href="#docs" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-[#1A8FBF] transition-colors">Docs</Link>
        </div>
        <div className="flex items-center gap-4">
           <Link href="https://github.com" className="p-2 hover:text-[#1A8FBF] transition-colors">
              <Github size={20} />
           </Link>
           <Link href="/app" className="px-5 py-2 bg-transparent border border-[#1A8FBF] text-[#1A8FBF] rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-[#1A8FBF] hover:text-[#050505] transition-all shadow-[0_0_10px_rgba(26,143,191,0.1)]">
              Launch Dashboard
           </Link>
        </div>
      </nav>

      {/* Terminal Hero Section */}
      <header className="relative pt-32 pb-40 px-10 max-w-7xl mx-auto overflow-hidden">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1A8FBF]/10 border border-[#1A8FBF]/30 text-[#1A8FBF] text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
                  <Zap size={14} /> AI-Powered Code Generation v1.0
               </div>
               <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                  FORJA TU <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A8FBF] via-[#4CB89C] to-[#1A8FBF]">CÓDIGO</span>
               </h1>
               <p className="text-lg text-[#A0A0A0] max-w-xl mb-12 leading-relaxed">
                  Automatiza la creación de especificaciones técnicas (SDD) y genera esqueletos de aplicaciones robustas en segundos. Diseñado para desarrolladores que buscan velocidad sin sacrificar la arquitectura.
               </p>
               
               <div className="flex flex-wrap gap-4">
                  <div className="p-[1px] bg-gradient-to-r from-[#1A8FBF] to-[#4CB89C] rounded-lg group">
                     <Link href="/app" className="flex items-center gap-3 px-8 py-4 bg-[#050505] rounded-[7px] text-white font-bold group-hover:bg-transparent transition-all">
                        Get Started <ArrowRight size={20} />
                     </Link>
                  </div>
                  <code className="px-6 py-4 bg-[#111111] border border-white/5 rounded-lg text-sm text-[#1A8FBF] flex items-center gap-3">
                     npm install -g @specforge/cli
                  </code>
               </div>
            </div>

            <div className="relative">
               {/* Decorative Tech Elements */}
               <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#1A8FBF]/20 blur-[100px] rounded-full opacity-30" />
               <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10 font-mono text-sm group">
                  <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
                     <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                     <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                     <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                     <div className="ml-auto text-[10px] text-white/20 uppercase tracking-widest">specforge.yaml</div>
                  </div>
                  <div className="space-y-2">
                     <div className="text-[#4CB89C]">name: <span className="text-[#E0E0E0]">"transsync TMS"</span></div>
                     <div className="text-[#4CB89C]">architecture: <span className="text-[#E0E0E0]">"Next.js Monorepo"</span></div>
                     <div className="text-[#4CB89C]">modules:</div>
                     <div className="pl-4 text-[#A0A0A0]">- auth_system</div>
                     <div className="pl-4 text-[#A0A0A0]">- fleet_management</div>
                     <div className="pl-4 text-[#A0A0A0]">- routing_engine</div>
                     <div className="text-[#1A8FBF] animate-pulse">_ generation in progress...</div>
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -bottom-10 -right-10 p-6 bg-[#1A8FBF] text-[#050505] rounded-2xl shadow-2xl group-hover:scale-110 transition-transform">
                     <Cpu size={32} />
                  </div>
               </div>
            </div>
         </div>
      </header>

      {/* Feature Grid (Hard-coded high fidelity) */}
      <section id="features" className="py-32 border-y border-white/5">
         <div className="max-w-7xl mx-auto px-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
               {[
                  { icon: Code2, title: 'SDD Generation', desc: 'Convierte tus prompts en Documentos de Diseño de Software (SDD) detallados.' },
                  { icon: Layers, title: 'Monorepo Ready', desc: 'Configura arquitecturas complejas de Turborepo automáticamente.' },
                  { icon: Bug, title: 'Self-Healing', desc: 'Bucle de corrección automática que valida builds antes de entregar.' },
                  { icon: Share2, title: 'API Sync', desc: 'Sincroniza tus definiciones de API entre el frontend y el backend.' }
               ].map((f, i) => (
                  <div key={i} className="space-y-4 group">
                     <div className="w-12 h-12 border border-[#1A8FBF]/30 flex items-center justify-center text-[#1A8FBF] group-hover:bg-[#1A8FBF] group-hover:text-[#050505] transition-all rounded-lg">
                        <f.icon size={24} />
                     </div>
                     <h3 className="text-xs font-black uppercase tracking-[0.2em]">{f.title}</h3>
                     <p className="text-sm text-[#707070] leading-relaxed">{f.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Footer / CTA */}
      <footer className="py-20 px-10 text-center">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black mb-8 italic tracking-tighter">BUILD SMARTER, <br/> FORGE FASTER.</h2>
            <div className="flex items-center justify-center gap-8 mb-12">
               <div className="flex items-center gap-2 text-xs font-bold text-white/30 uppercase tracking-[0.2em]">
                  <ShieldCheck size={16} /> Enterprise Ready
               </div>
               <div className="flex items-center gap-2 text-xs font-bold text-white/30 uppercase tracking-[0.2em]">
                  <Cpu size={16} /> AI Driven
               </div>
            </div>
            <Link href="/app" className="inline-flex items-center gap-2 text-[#1A8FBF] font-black text-sm uppercase tracking-[0.3em] hover:tracking-[0.4em] transition-all">
               Launch Console <ArrowRight size={20} />
            </Link>
         </div>
      </footer>
    </div>
  );
}
