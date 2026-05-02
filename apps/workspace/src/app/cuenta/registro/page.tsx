'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Building2, Mail, Lock, ChevronRight, Layers } from 'lucide-react';

export default function WorkspaceRegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/cuenta/portal');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0A0A0A] border border-white/10 p-10 rounded-[40px] relative overflow-hidden shadow-2xl"
      >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#4ECCA3]/10 blur-3xl rounded-full -mr-16 -mt-16" />
      
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-[#4ECCA3] flex items-center justify-center shadow-[0_0_20px_rgba(78,204,163,0.5)]">
          <Layers size={20} className="text-[#050505]" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase tracking-tighter text-white">Registro B2B</h2>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Inscribir Nueva Empresa</p>
        </div>
      </div>

      <div className="flex gap-4 p-1 bg-white/5 rounded-2xl mb-10">
        <Link 
          href="/cuenta/login"
          className="flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl text-white/40 hover:text-white text-center transition-all"
        >
          Entrar
        </Link>
        <div className="flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl bg-[#4ECCA3] text-[#050505] shadow-lg text-center cursor-default">
          Registro
        </div>
      </div>

      <form onSubmit={handleRegister}>
        <div className="mb-6 group">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 group-focus-within:text-[#4ECCA3] transition-colors">Nombre de la Empresa</label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#4ECCA3]" size={18} />
            <input 
              required
              type="text" 
              placeholder="Logística Avanzada"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-white placeholder:text-white/10 focus:outline-none focus:border-[#4ECCA3]/50 focus:bg-[#4ECCA3]/5 transition-all"
            />
          </div>
        </div>

        <div className="mb-6 group">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 group-focus-within:text-[#4ECCA3] transition-colors">Correo Corporativo</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#4ECCA3]" size={18} />
            <input 
              required
              type="email" 
              placeholder="contacto@empresa.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-white placeholder:text-white/10 focus:outline-none focus:border-[#4ECCA3]/50 focus:bg-[#4ECCA3]/5 transition-all"
            />
          </div>
        </div>

        <div className="mb-6 group">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 group-focus-within:text-[#4ECCA3] transition-colors">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#4ECCA3]" size={18} />
            <input 
              required
              type="password" 
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-white placeholder:text-white/10 focus:outline-none focus:border-[#4ECCA3]/50 focus:bg-[#4ECCA3]/5 transition-all"
            />
          </div>
        </div>
        
        <button 
          disabled={loading}
          className="w-full py-5 bg-white text-[#050505] rounded-2xl font-black text-xs uppercase tracking-widest mt-4 flex items-center justify-center gap-2 hover:bg-[#4ECCA3] hover:shadow-[0_0_30px_rgba(78,204,163,0.4)] transition-all disabled:opacity-50"
        >
          {loading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-[#050505] border-t-transparent rounded-full" />
          ) : (
            <>Registrar Empresa <ChevronRight size={16} /></>
          )}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
          Uso sujeto a contrato Enterprise Node
        </p>
      </div>
    </motion.div>
    </div>
  );
}
