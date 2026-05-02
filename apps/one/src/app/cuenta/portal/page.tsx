'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import SidebarNew from '@/components/layout/SidebarNew';
import AvocadoStatusBar from '@/components/layout/StatusBar';
import type { NavSection } from '@/app/avocado/app/page';

export default function CuentaPage() {
  const [activeSection, setActiveSection] = useState<NavSection>('profile-data');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile-data':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-3 border-b border-brand-border pb-4">
              <div>
                <h1 className="text-2xl md:text-[28px] font-bold tracking-tight text-brand-primary flex items-center gap-3">
                  <i className="pi pi-user text-brand-secondary"></i> Datos personales
                </h1>
                <p className="text-sm text-brand-secondary mt-1">Gestiona tu identidad en el ecosistema One</p>
              </div>
              <button className="btn btn-primary w-full md:w-auto shadow-lg">
                <i className="pi pi-pencil mr-1 text-[10px]"></i>
                Editar Perfil
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Proyectos Activos', value: '12', icon: 'pi-folder-open' },
                { label: 'Tareas Completadas', value: '148', icon: 'pi-check-square' },
                { label: 'Créditos IA', value: '8,420', icon: 'pi-bolt' },
                { label: 'Días como Builder', value: '45', icon: 'pi-calendar' },
              ].map((s, i) => (
                <div key={i} className="bg-brand-surface border border-brand-border shadow-[var(--shadow)] rounded-2xl px-5 py-5 hover:-translate-y-1 hover:border-brand-accent transition-all duration-300 cursor-default">
                  <i className={`pi ${s.icon} text-brand-secondary/40 text-xs mb-3 block`}></i>
                  <div className="text-[10px] font-bold text-brand-secondary tracking-widest mb-2 uppercase">{s.label}</div>
                  <div className="text-2xl md:text-[32px] font-black text-brand-primary leading-none tracking-tight">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div className="card shadow-sm">
                  <div className="panel-header-dark">
                    <span className="panel-title flex items-center gap-2"><i className="pi pi-id-card"></i> Identidad Digital</span>
                  </div>
                  <div className="p-6 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center text-3xl font-black shadow-2xl shadow-[#7C3AED]/20">
                      KG
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-primary">Kevin Garza</h3>
                      <p className="text-brand-secondary text-sm mb-2">kevin@transformateck.com</p>
                      <span className="px-2 py-1 bg-[#7C3AED]/10 text-[#7C3AED] text-[9px] font-black uppercase tracking-widest rounded-md border border-[#7C3AED]/20">Founder</span>
                    </div>
                  </div>
               </div>

               <div className="card shadow-sm">
                  <div className="panel-header-dark">
                    <span className="panel-title flex items-center gap-2"><i className="pi pi-chart-bar"></i> Rendimiento</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Nivel de Energía</span>
                      <span className="text-xs font-black text-[#7C3AED]">85%</span>
                    </div>
                    <div className="w-full h-2 bg-brand-bg rounded-full overflow-hidden border border-brand-border">
                      <div className="h-full bg-[#7C3AED] shadow-[0_0_10px_#7C3AED]" style={{ width: '85%' }} />
                    </div>
                    <p className="text-[10px] text-brand-secondary mt-3 italic">Estás en el top 5% de builders este mes.</p>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'bill-plan':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-3 border-b border-brand-border pb-4">
              <div>
                <h1 className="text-2xl md:text-[28px] font-bold tracking-tight text-brand-primary flex items-center gap-3">
                  <i className="pi pi-id-card text-brand-secondary"></i> Plan Actual
                </h1>
                <p className="text-sm text-brand-secondary mt-1">Gestiona tu suscripción al ecosistema One</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="lg:col-span-2 card p-8 bg-gradient-to-br from-[#111827] to-[#0A0E1A] relative overflow-hidden group border-brand-accent/20">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <i className="pi pi-sparkles text-[120px] text-brand-accent"></i>
                </div>
                <div className="relative z-10">
                  <span className="px-3 py-1 bg-brand-accent/20 text-brand-accent text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-brand-accent/30 mb-6 inline-block shadow-[0_0_15px_rgba(78,204,163,0.1)]">Plan Pro Ecosistema</span>
                  <h3 className="text-4xl font-black text-brand-primary mb-4">$49.00 <span className="text-lg text-brand-secondary font-medium">/ mes</span></h3>
                  <p className="text-brand-secondary mb-8 max-w-md">Acceso ilimitado a Avocado, SpecForge y todo el ecosistema One con procesamiento prioritario de IA.</p>
                  
                  <div className="flex gap-4 flex-wrap">
                    <button className="btn btn-primary px-8">Gestionar Suscripción</button>
                    <button className="btn btn-secondary px-8">Ver Historial</button>
                  </div>
                </div>
              </div>

              <div className="card p-8 flex flex-col justify-between border-brand-accent/30 bg-brand-accent/5">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-brand-accent mb-6 flex items-center gap-2">
                    <i className="pi pi-bolt"></i> Créditos IA
                  </h4>
                  <div className="text-4xl font-black text-brand-primary mb-2 tracking-tight">8,420</div>
                  <p className="text-xs text-brand-secondary">disponibles de 10,000</p>
                </div>
                <button className="w-full py-3 bg-brand-bg border border-brand-border rounded-xl text-xs font-black uppercase tracking-widest text-brand-primary hover:border-brand-accent transition-all mt-8">Recargar Créditos</button>
              </div>
            </div>
          </div>
        );
      case 'sec-password':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-end justify-between mb-8 flex-wrap gap-3 border-b border-brand-border pb-4">
              <div>
                <h1 className="text-2xl md:text-[28px] font-bold tracking-tight text-brand-primary flex items-center gap-3">
                  <i className="pi pi-lock text-brand-secondary"></i> Seguridad
                </h1>
                <p className="text-sm text-brand-secondary mt-1">Protege tu acceso y sesiones activas</p>
              </div>
            </div>
            <div className="card max-w-2xl">
               <div className="panel-header-dark"><span className="panel-title">Cambiar Contraseña</span></div>
               <div className="p-6 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-2 block">Contraseña Actual</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-primary outline-none focus:border-brand-accent transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-2 block">Nueva Contraseña</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-primary outline-none focus:border-brand-accent transition-all" />
                  </div>
                  <button className="btn btn-primary">Actualizar Contraseña</button>
               </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-brand-secondary/20">
            <i className="pi pi-cog text-6xl mb-4 opacity-10 animate-spin-slow"></i>
            <h2 className="text-xl font-bold text-brand-secondary/40 tracking-tight">Módulo en Construcción</h2>
            <p className="text-sm mt-2 font-medium">Estamos trabajando para habilitar la sección <b>{activeSection}</b> muy pronto.</p>
            <button onClick={() => setActiveSection('profile-data')} className="btn btn-secondary mt-8 text-[10px] font-black uppercase tracking-widest px-8">Volver al Perfil</button>
          </div>
        );
    }
  };

  return (
    <div className="app-layout h-screen overflow-hidden bg-brand-bg">
      <Header 
        activeSection={activeSection} 
        appName="Mi Cuenta" 
        appLogo="🏢"
        activeApp="cuenta"
      />
      <div className="app-body flex flex-1 overflow-hidden">
        <SidebarNew 
          currentSection={activeSection} 
          onNavigate={(s: any) => setActiveSection(s)} 
          mode="account"
        />
        <main className="main-content flex-1 overflow-y-auto bg-brand-bg relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124, 58, 237, 0.03)_0%,transparent_50%)] pointer-events-none" />
          <div className="p-8 md:p-12 max-w-5xl mx-auto relative z-10">
             {renderContent()}
          </div>
        </main>
      </div>
      <AvocadoStatusBar />
    </div>
  );
}
