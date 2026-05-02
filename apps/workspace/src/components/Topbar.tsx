'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Calendar, 
  Bell, 
  LayoutGrid, 
  User, 
  Truck, 
  Box, 
  Users 
} from 'lucide-react';

const AppIconCell = ({ name, icon: Icon, href, color = "bg-primary", onClick }: any) => (
  <Link href={href} onClick={onClick} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-[#F4F7F9] transition-all group text-center">
    <div className={`w-12 h-12 rounded-xl ${color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
      <Icon size={24} />
    </div>
    <span className="text-[9px] font-black text-[#0E2A3A] uppercase tracking-tighter group-hover:text-primary transition-colors">{name}</span>
  </Link>
);

const Topbar = () => {
  const [showApps, setShowApps] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowApps(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-[68px] bg-white border-b border-[#ECF1F3] flex items-center px-7 gap-4 flex-shrink-0">
      <div className="flex-1 max-w-[480px] bg-[#F4F7F9] rounded-xl border border-transparent focus-within:border-[#D9E2E6] focus-within:bg-white flex items-center gap-3 px-4 py-2.5 transition-all group">
        <Search size={16} className="text-[#5C7480] group-focus-within:text-primary" />
        <input placeholder="Buscar dashboard, envíos, conductores…" className="flex-1 bg-transparent border-none outline-none text-sm text-[#0E2A3A] placeholder:text-[#8497A0] font-medium" />
        <kbd className="hidden md:block text-[10px] font-mono text-[#8497A0] bg-white border border-[#D9E2E6] px-1.5 py-0.5 rounded-md shadow-sm">⌘ K</kbd>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl hover:bg-[#F4F7F9] text-[#2C4654] transition-colors flex items-center justify-center relative"><Calendar size={18} /></button>
          <button className="w-10 h-10 rounded-xl hover:bg-[#F4F7F9] text-[#2C4654] transition-colors flex items-center justify-center relative">
            <Bell size={18} /><span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#E15B5B] border-2 border-white rounded-full"></span>
          </button>
        </div>

        <div className="w-px h-6 bg-[#D9E2E6]" />

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowApps(!showApps)}
            className={`w-10 h-10 rounded-xl border transition-all flex items-center justify-center shadow-sm ${showApps ? 'bg-primary border-primary text-white scale-110' : 'bg-[#F4F7F9] border-[#ECF1F3] text-[#0E2A3A] hover:bg-white'}`}
          >
            <LayoutGrid size={20} />
          </button>

          {showApps && (
            <div className="absolute top-full right-[-108px] mt-4 w-64 bg-white border border-[#ECF1F3] rounded-[32px] shadow-2xl p-5 z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="text-[9px] font-black uppercase tracking-widest text-[#8497A0] mb-4 px-2 text-center">TransSync<span className="text-[#4ECCA3]">.</span> Apps</div>
              <div className="grid grid-cols-2 gap-2">
                <AppIconCell name="Cuenta" icon={User} href="/app" color="bg-[#5C7480]" onClick={() => setShowApps(false)} />
                <AppIconCell name="TransSync" icon={Truck} href="/app" color="bg-primary" onClick={() => setShowApps(false)} />
                <AppIconCell name="Inventario" icon={Box} href="#" color="bg-[#F97316]" onClick={() => setShowApps(false)} />
                <AppIconCell name="RRHH" icon={Users} href="#" color="bg-[#4CB89C]" onClick={() => setShowApps(false)} />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 p-1 pr-3 rounded-full border border-[#ECF1F3] hover:bg-[#F4F7F9] cursor-pointer transition-colors shadow-sm">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1A8FBF] to-[#4CB89C] text-white flex items-center justify-center font-bold text-[11px] shadow-lg border-2 border-white">KS</div>
          <div className="hidden sm:block leading-none">
            <div className="text-[11px] font-black text-[#0E2A3A]">Kevin Salazar</div>
            <div className="text-[9px] font-bold text-primary uppercase tracking-widest mt-0.5">Administrador</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
