'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, 
  MapPin, 
  Users, 
  Box,
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  User, 
  Zap, 
  Clock, 
  ShieldCheck,
  Layers,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Globe
} from 'lucide-react';

// --- SUB-COMPONENTS ---

const SidebarItem = ({ icon: Icon, label, active = false, href = "#" }: any) => (
  <Link href={href} className="block group">
    <div className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${active ? 'bg-[#4ECCA3] text-[#050505] shadow-[0_0_20px_rgba(78,204,163,0.3)] font-black' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
      <Icon size={20} className={active ? 'text-[#050505]' : 'group-hover:text-[#4ECCA3] transition-colors'} />
      <span className="text-[10px] font-black uppercase tracking-widest leading-none">{label}</span>
    </div>
  </Link>
);

const ModuleCard = ({ name, desc, icon: Icon, href }: any) => (
  <Link href={href} className="group relative">
    <div className="absolute inset-0 bg-gradient-to-br from-[#4ECCA3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px] blur-xl" />
    <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[32px] relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[#4ECCA3]/30">
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-[#4ECCA3] group-hover:text-[#050505] transition-all duration-500">
        <Icon size={28} />
      </div>
      <h4 className="text-xl font-black uppercase text-white mb-2 group-hover:text-[#4ECCA3] transition-colors flex items-center gap-2 text-[18px]">
        {name} <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
      </h4>
      <p className="text-white/40 text-xs leading-relaxed mb-6 font-medium">{desc}</p>
      
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4ECCA3] animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#4ECCA3]">Sistema Online</span>
        </div>
        <span className="text-[9px] font-black uppercase tracking-tighter text-white/10">v4.2.0</span>
      </div>
    </div>
  </Link>
);

// --- MAIN PORTAL ---

export default function WorkspacePortal() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#4ECCA3] font-sans flex overflow-hidden">
      
      {/* ─── SIDEBAR (Enterprise Console Style) ─────────────────────────── */}
      <aside className={`h-screen bg-[#080808] border-r border-white/5 flex flex-col transition-all duration-500 ${isSidebarOpen ? 'w-72' : 'w-20'} relative z-50`}>
        <div className="p-8 mb-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#4ECCA3] flex items-center justify-center shadow-[0_0_15px_rgba(78,204,163,0.4)]">
              <Layers size={16} className="text-[#050505]" />
            </div>
            {isSidebarOpen && <span className="font-black tracking-tighter uppercase text-sm">Workspace</span>}
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <SidebarItem icon={LayoutGrid} label="Panel Central" active />
          <SidebarItem icon={MapPin} label="TransSync TMS" href="/transsync" />
          <SidebarItem icon={Users} label="Nexus HR" href="#" />
          <SidebarItem icon={Box} label="Kardex OS" href="#" />
          <div className="h-px bg-white/5 my-6 mx-4" />
          <SidebarItem icon={Globe} label="Infraestructura" />
          <SidebarItem icon={TrendingUp} label="Analítica B2B" />
          <SidebarItem icon={ShieldCheck} label="Seguridad" />
        </nav>

        <div className="p-4 border-t border-white/5">
          <SidebarItem icon={Settings} label="Configuración" />
          <SidebarItem icon={LogOut} label="Cerrar Consola" href="/cuenta/login" />
        </div>
      </aside>

      {/* ─── MAIN CONTENT ──────────────────────────────────────────────── */}
      <main className="flex-1 h-screen overflow-y-auto bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(78,204,163,0.08),transparent)]">
        
        {/* Top Header Bar */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-12 bg-[#050505]/50 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#4ECCA3] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Buscar flota, empleados o inventario..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-medium focus:outline-none focus:border-[#4ECCA3]/40 focus:bg-white/[0.07] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40">
              <Activity size={12} className="text-[#4ECCA3]" />
              Latencia: 14ms
            </div>
            <button className="relative p-2 text-white/40 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#4ECCA3] rounded-full border-2 border-[#050505]" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-white leading-none mb-1">Empresa Alpha</p>
                <p className="text-[8px] font-bold text-[#4ECCA3] uppercase tracking-widest leading-none">Enterprise</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                <Building2 size={20} className="text-white/40" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-12 max-w-[1600px] mx-auto">
          {/* Greeting Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={16} className="text-[#4ECCA3]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4ECCA3]">Infraestructura Crítica Operativa</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase text-white leading-tight">
              Consola de Mando <span className="text-[#4ECCA3]">Global.</span>
            </h1>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { label: 'Flotas Activas', val: '124', change: '+12%', icon: MapPin },
              { label: 'Plantilla HR', val: '842', change: '+3', icon: Users },
              { label: 'Stock Almacén', val: '94%', change: 'Estable', icon: Box },
              { label: 'Ingresos Mensuales', val: '$2.4M', change: '+24%', icon: TrendingUp },
            ].map((stat, i) => (
              <div key={i} className="bg-[#0A0A0A] border border-white/5 p-6 rounded-3xl group hover:border-[#4ECCA3]/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon size={18} className="text-white/20 group-hover:text-[#4ECCA3] transition-colors" />
                  <span className="text-[10px] font-black text-[#4ECCA3]">{stat.change}</span>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-white">{stat.val}</p>
              </div>
            ))}
          </div>

          {/* Core Modules */}
          <section className="mb-16">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-8">Módulos de Ecosistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ModuleCard 
                name="TransSync TMS" 
                desc="Orquestación logística inteligente, monitoreo de flotas y rutas optimizadas con IA." 
                icon={MapPin} 
                href="/transsync"
              />
              <ModuleCard 
                name="Nexus HR" 
                desc="Gestión integral de capital humano, nóminas y estructura organizacional B2B." 
                icon={Users} 
                href="#"
              />
              <ModuleCard 
                name="Kardex OS" 
                desc="Control de inventarios omnicanal, WMS y visibilidad de cadena de suministro." 
                icon={Box} 
                href="#"
              />
            </div>
          </section>

          {/* System Status / Network Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                <Globe size={180} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Activity size={18} className="text-[#4ECCA3]" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-white">Estado de la Red Global</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4ECCA3]" />
                    <span className="text-[10px] font-black text-[#4ECCA3] uppercase tracking-widest">Todos los sistemas operativos</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                  <div>
                    <p className="text-[9px] font-black uppercase text-white/20 mb-4 tracking-[0.2em]">Nodo Norteamérica</p>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-[#4ECCA3] shadow-[0_0_10px_#4ECCA3]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-white/20 mb-4 tracking-[0.2em]">Nodo Europa</p>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-[#4ECCA3] shadow-[0_0_10px_#4ECCA3]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-white/20 mb-4 tracking-[0.2em]">Nodo Latam</p>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-[92%] h-full bg-[#4ECCA3] shadow-[0_0_10px_#4ECCA3]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative effect */}
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#4ECCA3]/05 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}

// Re-importing missing Icon
import { Building2 } from 'lucide-react';
