'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ChevronRight, 
  Mail, 
  Lock, 
  Layers, 
  LayoutGrid, 
  Wallet, 
  UserCircle, 
  ArrowRight 
} from 'lucide-react';

export default function WorkspaceLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Establecer cookie de sesión para el ecosistema
    document.cookie = "workspace_token=mock_token_123; path=/; max-age=86400";
    
    setTimeout(() => {
      router.push('/cuenta/portal');
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-[#050505] font-sans selection:bg-[#4ECCA3] selection:text-[#050505]">
      
      {/* ─── PANEL IZQUIERDO: BRAND EXPERIENCE (ONE STYLE) ──────────────── */}
      <div className="hidden lg:flex flex-1 flex-col justify-center p-20 bg-gradient-to-br from-[#050505] via-[#0A1A1F] to-[#050505] border-r border-white/5 relative overflow-hidden">
        
        {/* Orbes Ambientales Replicados de One */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#4ECCA3]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#1A8FBF]/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          {/* Logo Branding */}
          <div className="flex items-center gap-4 mb-16">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1A8FBF] to-[#4ECCA3] flex items-center justify-center shadow-[0_0_30px_rgba(78,204,163,0.3)] border border-white/20">
              <Layers size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">Transformateck <span className="text-[#4ECCA3]">Workspace</span></h1>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mt-1">Enterprise Hub</p>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-[2.8rem] font-black leading-[1.1] mb-6 text-white max-w-[580px] tracking-tighter">
            Una sola llave para <span className="text-[#4ECCA3]">toda tu operatividad logística.</span>
          </h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-[500px] font-medium">
            Accede a TransSync TMS, Inventarios y todas nuestras herramientas corporativas con una cuenta centralizada.
          </p>

          {/* Feature List */}
          <div className="space-y-8">
            {[
              { icon: LayoutGrid, title: 'Hub Logístico', desc: 'Salta entre productos y herramientas sin cambiar de cuenta.' },
              { icon: Wallet, title: 'Créditos Unificados', desc: 'Gestiona tu wallet empresarial desde un solo lugar.' },
              { icon: ShieldCheck, title: 'Gestión Centralizada', desc: 'Control total de usuarios, roles y facturación global.' },
            ].map((f, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="w-11 h-11 rounded-xl bg-[#4ECCA3]/10 border border-[#4ECCA3]/20 flex items-center justify-center shrink-0">
                  <f.icon size={20} className="text-[#4ECCA3]" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base leading-tight mb-1">{f.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-normal">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── PANEL DERECHO: FORMULARIO (ONE STYLE) ──────────────── */}
      <div className="w-full lg:w-[560px] flex flex-col justify-center p-12 lg:p-20 bg-[#070707] relative border-l border-white/5 shadow-2xl">
        <div className="max-w-[400px] mx-auto w-full">
          
          <div className="mb-12">
            <h2 className="text-3xl font-black text-white tracking-tighter mb-3">Bienvenido 👋</h2>
            <p className="text-[#94A3B8] font-medium text-sm">Ingresa a tu cuenta Workspace para continuar.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] ml-1">Correo Corporativo</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#4ECCA3] transition-colors" size={18} />
                <input 
                  required
                  type="email" 
                  placeholder="admin@empresa.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-[#4ECCA3]/40 focus:bg-white/[0.08] transition-all"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Contraseña</label>
                <button type="button" className="text-[9px] font-black uppercase text-white/20 hover:text-white transition-colors tracking-widest">¿Olvidaste?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#4ECCA3] transition-colors" size={18} />
                <input 
                  required
                  type="password" 
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-[#4ECCA3]/40 focus:bg-white/[0.08] transition-all"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                />
              </div>
            </div>
            
            <button 
              disabled={loading}
              className="w-full py-5 bg-[#4ECCA3] text-[#050505] rounded-2xl font-black text-xs uppercase tracking-[0.2em] mt-4 flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(78,204,163,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div 
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-5 h-5 border-3 border-[#050505] border-t-transparent rounded-full animate-spin" 
                  />
                ) : (
                  <motion.div 
                    key="text"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                  >
                    Ingresar a Workspace <ArrowRight size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm font-medium text-[#94A3B8]">
              ¿Sin cuenta? <Link href="/cuenta/registro" className="text-[#4ECCA3] font-bold hover:underline ml-1">Crea tu Workspace gratis →</Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full text-center px-6">
          <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.3em]">© 2026 TransSync Ecosystem · One Identity Sync</p>
        </div>
      </div>
    </div>
  );
}
