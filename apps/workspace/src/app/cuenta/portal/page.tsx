'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
  Globe,
  Truck,
  Building2,
  Calendar,
  ChevronRight,
  ChevronDown,
  CreditCard,
  Wallet,
  LifeBuoy,
  Shield,
  Key,
  History,
  FileText,
  UserPlus,
  Lock,
  Palette,
  Phone,
  BookOpen,
  MessageSquare,
  HelpCircle,
  AlertCircle,
  PlayCircle,
  Download,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

// --- SUB-COMPONENTS ---

const SidebarItem = ({ icon: Icon, label, active = false, href = "#", onClick, isCollapsed }: any) => (
  <Link href={href} onClick={onClick} title={isCollapsed ? label : ''} className="block group">
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${active ? 'bg-gradient-to-r from-[#1A8FBF] to-[#4CB89C] text-white shadow-lg shadow-primary/20 font-bold' : 'text-[#C9D6DC] hover:bg-white/10 hover:text-white'}`}>
      <Icon size={18} className={active ? 'text-white' : 'text-[#8497A0] group-hover:text-[#4CB89C] transition-colors'} />
      {!isCollapsed && <span className="text-[12px] font-semibold leading-none truncate">{label}</span>}
    </div>
  </Link>
);

const KpiCard = ({ label, value, subtext, icon: Icon, color = "bg-[#1A8FBF]/10", iconColor = "text-[#1A8FBF]" }: any) => (
  <div className="bg-white border border-[#ECF1F3] p-7 rounded-[32px] shadow-[0_1px_3px_rgba(14,42,58,0.05)] transition-all hover:shadow-xl hover:shadow-primary/5 flex-1 min-h-[160px] flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-11 h-11 rounded-2xl ${color} ${iconColor} flex items-center justify-center shadow-sm`}>
        <Icon size={20} />
      </div>
      <button className="text-[#8497A0] hover:text-[#0E2A3A] transition-colors"><MoreVertical size={16} /></button>
    </div>
    <div>
      <div className="text-[10px] font-black uppercase tracking-[0.1em] text-[#8497A0] mb-1">{label}</div>
      <div className="text-3xl font-black text-[#0E2A3A] tracking-tighter leading-none mb-2">{value}</div>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#4CB89C] animate-pulse" />
        <span className="text-[10px] font-bold text-[#4CB89C] uppercase tracking-wide">{subtext}</span>
      </div>
    </div>
  </div>
);

const ProductRow = ({ name, icon: Icon, lastAccess, href, color = "bg-[#1A8FBF]" }: any) => (
  <div className="flex items-center justify-between p-5 bg-[#F4F7F9] rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white transition-all group">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <div>
        <div className="text-sm font-black text-[#0E2A3A] mb-0.5">{name}</div>
        <div className="text-[10px] font-bold text-[#8497A0]">Último acceso: {lastAccess}</div>
      </div>
    </div>
    <Link href={href} className="px-4 py-2 bg-white border border-[#ECF1F3] rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all">
      Ir a {name} →
    </Link>
  </div>
);

const UserRow = ({ name, role, status, avatar }: any) => (
  <div className="flex items-center justify-between py-3.5 border-b border-[#ECF1F3] last:border-0 hover:bg-[#F4F7F9]/50 transition-colors px-2 rounded-xl">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1A8FBF] to-[#4CB89C] text-white flex items-center justify-center font-bold text-xs border-2 border-white shadow-md shrink-0">{avatar}</div>
      <div>
        <div className="text-sm font-bold text-[#0E2A3A] leading-tight">{name}</div>
        <div className="text-[10px] font-bold text-[#8497A0] uppercase tracking-widest mt-0.5">{role}</div>
      </div>
    </div>
    <div className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full ${status === 'Activo ahora' ? 'bg-[#E6F4EE] text-[#2C8B6E]' : 'bg-[#F4F7F9] text-[#8497A0]'}`}>
      {status}
    </div>
  </div>
);

const CreditBar = ({ name, used, total, color = "bg-primary" }: any) => {
  const percent = (used / total) * 100;
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between items-end mb-2.5">
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full ${color}`} />
           <span className="text-[13px] font-black text-[#0E2A3A] uppercase tracking-tight">{name}</span>
        </div>
        <span className="text-[11px] font-black text-[#5C7480] tracking-tighter">{used} CRÉDITOS</span>
      </div>
      <div className="w-full h-3 bg-[#F4F7F9] rounded-full overflow-hidden p-0.5 border border-[#ECF1F3]">
        <div className={`h-full ${color} rounded-full transition-all duration-1000 shadow-sm`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

const ActivityItem = ({ icon: Icon, text, time, color = "text-primary" }: any) => (
  <div className="flex items-start gap-4 mb-6 last:mb-0 relative z-10">
    <div className={`w-9 h-9 rounded-xl bg-[#F4F7F9] border border-[#ECF1F3] flex items-center justify-center ${color} shrink-0 shadow-sm`}>
      <Icon size={18} />
    </div>
    <div className="pt-0.5">
      <div className="text-[13px] font-bold text-[#0E2A3A] leading-snug mb-0.5">{text}</div>
      <div className="text-[10px] font-medium text-[#8497A0] flex items-center gap-1.5"><Clock size={10} /> hace {time}</div>
    </div>
  </div>
);

const AppGridCard = ({ name, desc, icon: Icon, href, color = "from-[#1A8FBF] to-[#2BA0C5]" }: any) => (
  <Link href={href} className="group relative overflow-hidden bg-white border border-[#ECF1F3] p-8 rounded-[40px] shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
    <div className="flex justify-between items-start mb-8 relative z-10">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={28} />
      </div>
      <div className="w-8 h-8 rounded-full bg-[#F4F7F9] flex items-center justify-center text-[#0E2A3A] group-hover:bg-primary group-hover:text-white transition-all">
        <ArrowUpRight size={16} />
      </div>
    </div>
    <h3 className="text-xl font-black text-[#0E2A3A] mb-3 uppercase tracking-tight group-hover:text-primary transition-colors">{name}</h3>
    <p className="text-[#5C7480] text-[13px] leading-relaxed font-medium line-clamp-2">{desc}</p>
  </Link>
);

const AppIconCell = ({ name, icon: Icon, href, color = "bg-primary" }: any) => (
  <Link href={href} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-[#F4F7F9] transition-all group">
    <div className={`w-12 h-12 rounded-xl ${color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
      <Icon size={24} />
    </div>
    <span className="text-[9px] font-black text-[#0E2A3A] uppercase tracking-tighter group-hover:text-primary transition-colors text-center">{name}</span>
  </Link>
);

export default function WorkspacePortal() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showApps, setShowApps] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'EMPRESA': true, 'USUARIOS': false, 'SEGURIDAD': false, 'SUSCRIPCIÓN': false, 'CRÉDITOS': false, 'NOTIFICACIONES': false, 'AYUDA': false
  });

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowApps(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    const domain = window.location.hostname.includes('transformateck.com') ? '; domain=.transformateck.com' : '';
    document.cookie = `workspace_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    document.cookie = `workspace_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${domain}`;
    window.location.href = "/login";
  };

  const menuSections = [
    { title: 'EMPRESA', icon: Building2, items: [{ label: 'Información general', icon: Building2 }, { label: 'Logo & marca', icon: Palette }, { label: 'Contacto', icon: Phone }] },
    { title: 'USUARIOS', icon: Users, items: [{ label: 'Mis usuarios', icon: Users }, { label: 'Roles y permisos', icon: ShieldCheck }, { label: 'Invitar usuario', icon: UserPlus }, { label: 'Sesiones activas', icon: Activity }] },
    { title: 'SEGURIDAD', icon: Lock, items: [{ label: 'Contraseña', icon: Key }, { label: 'Autenticación 2FA', icon: Shield }, { label: 'API Keys', icon: Zap }, { label: 'Historial de accesos', icon: History }] },
    { title: 'SUSCRIPCIÓN', icon: CreditCard, items: [{ label: 'Plan actual', icon: Zap }, { label: 'Cambiar plan', icon: TrendingUp }, { label: 'Historial de pagos', icon: History }, { label: 'Facturas descargables', icon: FileText }] },
    { title: 'CRÉDITOS', icon: Wallet, items: [{ label: 'Wallet empresarial', icon: Wallet }, { label: 'Recargar créditos', icon: CreditCard }, { label: 'Uso por producto', icon: Box }, { label: 'Historial de transacciones', icon: History }] },
    { title: 'NOTIFICACIONES', icon: Bell, items: [{ label: 'Alertas del sistema', icon: Bell }, { label: 'Alertas de créditos bajos', icon: AlertCircle }, { label: 'Novedades del workspace', icon: Globe }, { label: 'Alertas de seguridad', icon: ShieldCheck }] },
    { title: 'AYUDA', icon: LifeBuoy, items: [{ label: 'Documentación', icon: BookOpen }, { label: 'Tutoriales', icon: PlayCircle }, { label: 'Soporte', icon: MessageSquare }, { label: 'Dar feedback', icon: HelpCircle }] }
  ];

  return (
    <div className="min-h-screen bg-[#F2F6F8] text-[#0E2A3A] font-sans flex overflow-hidden">
      
      {/* ─── SIDEBAR ─────────────────────────── */}
      <aside className={`h-screen bg-[#0E2A3A] flex flex-col transition-all duration-500 ${isSidebarOpen ? 'w-[280px]' : 'w-20'} relative z-50`}>
        <div className={`flex items-center ${isSidebarOpen ? 'justify-between px-6' : 'justify-center'} py-8 mb-4`}>
          <Link href="/cuenta/portal" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1A8FBF] to-[#4CB89C] flex items-center justify-center shadow-lg shrink-0">
              <Layers size={20} className="text-white" />
            </div>
            {isSidebarOpen && <span className="text-white font-extrabold text-xl tracking-tight">Mi Workspace<span className="text-[#4ECCA3]">.</span></span>}
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sidebar-scroll space-y-1 scrollbar-hide">
          <SidebarItem icon={LayoutGrid} label="Dashboard General" active isCollapsed={!isSidebarOpen} href="/cuenta/portal" />
          <div className="h-px bg-white/5 my-4" />
          
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-2">
              <button onClick={() => isSidebarOpen && toggleSection(section.title)} className={`w-full flex items-center justify-between px-3 py-2 text-[10px] font-black tracking-widest text-[#5C7480] uppercase hover:text-white transition-colors ${!isSidebarOpen && 'justify-center'}`}>
                {isSidebarOpen ? <><span className="truncate">{section.title}</span>{openSections[section.title] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}</> : <div className="h-px w-4 bg-white/10" />}
              </button>
              {(openSections[section.title] || !isSidebarOpen) && (
                <div className="mt-1 space-y-1">
                  {section.items.map((item, i) => (
                    <SidebarItem key={i} icon={item.icon} label={item.label} isCollapsed={!isSidebarOpen} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={`mt-auto bg-white/5 border-t border-white/5 ${isSidebarOpen ? 'p-4' : 'p-2 items-center'} flex gap-3 transition-all`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1A8FBF] to-[#4CB89C] text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white/10 shrink-0">KS</div>
          {isSidebarOpen && (
            <div className="flex-1 min-w-0 text-white">
              <div className="text-sm font-bold truncate">Kevin Salazar</div>
              <div className="text-[#93A6AE] text-[11px] font-medium truncate">admin@transsync.mx</div>
            </div>
          )}
          {isSidebarOpen && (
            <button onClick={handleLogout} className="p-2 rounded-xl hover:bg-white/10 text-white transition-colors">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>

      {/* ─── MAIN CONTENT ──────────────────────────────────────────────── */}
      <main className="flex-1 h-screen overflow-y-auto scrollbar-hide bg-[#F2F6F8]">
        
        <header className="h-[68px] bg-white border-b border-[#ECF1F3] flex items-center px-12 gap-6 sticky top-0 z-40">
          <div className="flex-1 max-w-[480px] bg-[#F4F7F9] rounded-xl border border-transparent focus-within:border-[#D9E2E6] focus-within:bg-white flex items-center gap-3 px-4 py-2.5 transition-all group">
            <Search size={16} className="text-[#5C7480] group-focus-within:text-primary" />
            <input placeholder="Buscar en el portal empresarial..." className="flex-1 bg-transparent border-none outline-none text-sm text-[#0E2A3A] placeholder:text-[#8497A0] font-medium" />
            <kbd className="hidden md:block text-[10px] font-mono text-[#8497A0] bg-white border border-[#D9E2E6] px-1.5 py-0.5 rounded-md shadow-sm">⌘ K</kbd>
          </div>
          
          <div className="flex-1" />

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-xl hover:bg-[#F4F7F9] text-[#2C4654] transition-colors flex items-center justify-center relative"><Calendar size={18} /></button>
              <button className="w-10 h-10 rounded-xl hover:bg-[#F4F7F9] text-[#2C4654] transition-colors flex items-center justify-center relative"><Bell size={18} /><span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#E15B5B] border-2 border-white rounded-full"></span></button>
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
                  <div className="text-[9px] font-black uppercase tracking-widest text-[#8497A0] mb-4 px-2 text-center">Workspace Apps</div>
                  <div className="grid grid-cols-2 gap-2">
                    <AppIconCell name="Cuenta" icon={User} href="/cuenta/portal" color="bg-[#5C7480]" />
                    <AppIconCell name="TransSync" icon={Truck} href="/transsync/dashboard/inicio" color="bg-primary" />
                    <AppIconCell name="Inventario" icon={Box} href="#" color="bg-[#F97316]" />
                    <AppIconCell name="RRHH" icon={Users} href="#" color="bg-[#4CB89C]" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 py-1 pl-1 pr-4 rounded-full border border-[#ECF1F3] hover:bg-[#F4F7F9] transition-all cursor-pointer shadow-sm relative">
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1A8FBF] to-[#4CB89C] text-white flex items-center justify-center font-bold text-[11px] shadow-lg border-2 border-white">KS</div>
               <div className="text-left">
                  <p className="text-[11px] font-black text-[#0E2A3A] leading-none mb-0.5">Kevin Salazar</p>
                  <p className="text-[9px] font-bold text-primary uppercase tracking-widest leading-none">Administrador</p>
               </div>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-[1500px] mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-black text-[#0E2A3A] tracking-tighter">Bienvenido, Transformateck 👋</h1>
            <p className="text-[#8497A0] text-sm font-medium mt-1">Último acceso: 01 de Mayo, 2026 — 18:45:12</p>
          </div>

          {/* Cards de Resumen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <KpiCard label="Usuarios" value="5" subtext="activos ahora" icon={Users} />
            <KpiCard label="Créditos" value="1,000" subtext="disponibles" icon={Wallet} color="bg-[#4CB89C]/10" iconColor="text-[#4CB89C]" />
            <KpiCard label="Productos" value="activos 2" subtext="disponibles" icon={Box} color="bg-[#F97316]/10" iconColor="text-[#F97316]" />
            <KpiCard label="Alertas" value="3" subtext="pendientes" icon={AlertCircle} color="bg-[#E15B5B]/10" iconColor="text-[#E15B5B]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Col */}
            <div className="lg:col-span-2 space-y-8">
              {/* Productos Activos */}
              <div className="bg-white border border-[#ECF1F3] rounded-[32px] p-8 shadow-sm">
                <h3 className="text-lg font-black text-[#0E2A3A] mb-6 flex items-center gap-2 uppercase tracking-tight">
                  <Truck size={20} className="text-primary" /> Productos Activos
                </h3>
                <div className="space-y-4">
                  <ProductRow name="TransSync" icon={Truck} lastAccess="hace 2 horas" href="/transsync/dashboard/inicio" />
                  <ProductRow name="Inventarios" icon={Box} lastAccess="hace 1 día" href="#" color="bg-[#F97316]" />
                </div>
              </div>

              {/* Uso de Créditos */}
              <div className="bg-white border border-[#ECF1F3] rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-black text-[#0E2A3A] flex items-center gap-2 uppercase tracking-tight">
                    <TrendingUp size={22} className="text-[#4CB89C]" /> Uso de Créditos — últimos 30 días
                  </h3>
                </div>
                <div className="p-2">
                  <CreditBar name="TransSync" used={800} total={1000} color="bg-[#1A8FBF]" />
                  <CreditBar name="Inventarios" used={200} total={1000} color="bg-[#F97316]" />
                  <div className="mt-8 pt-8 border-t border-[#ECF1F3] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase text-[#8497A0] mb-1">Total Gastado</div>
                      <div className="text-2xl font-black text-[#0E2A3A]">1,000 créditos</div>
                    </div>
                    <button className="text-xs font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-2">Ver historial completo <ArrowUpRight size={14} /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col */}
            <div className="space-y-8">
              {/* Usuarios Recientes */}
              <div className="bg-white border border-[#ECF1F3] rounded-[32px] p-8 shadow-sm">
                <h3 className="text-[11px] font-black text-[#0E2A3A] mb-6 uppercase tracking-[0.2em] flex items-center justify-between">
                  Usuarios Recientes <Link href="#" className="text-primary hover:underline capitalize tracking-normal font-bold">Ver todos</Link>
                </h3>
                <div className="space-y-1">
                  <UserRow name="Juan Pérez" role="Admin" status="Activo ahora" avatar="JP" />
                  <UserRow name="María García" role="Operador" status="hace 1h" avatar="MG" />
                  <UserRow name="Carlos López" role="Supervisor" status="hace 3h" avatar="CL" />
                </div>
              </div>

              {/* Actividad Reciente */}
              <div className="bg-white border border-[#ECF1F3] rounded-[32px] p-8 shadow-sm">
                <h3 className="text-[11px] font-black text-[#0E2A3A] mb-8 uppercase tracking-[0.2em] flex items-center justify-between">
                  Actividad Reciente <Link href="#" className="text-primary hover:underline capitalize tracking-normal font-bold">Ver toda</Link>
                </h3>
                <div className="relative">
                   <ActivityItem icon={Bell} text="Juan Pérez inició sesión" time="5min" />
                   <ActivityItem icon={Wallet} text="Recarga de 1,000 créditos" time="2h" color="text-[#4CB89C]" />
                   <ActivityItem icon={UserPlus} text="María García agregada" time="1 día" color="text-[#F97316]" />
                   <ActivityItem icon={Settings} text="Plan actualizado" time="3 días" color="text-[#1A8FBF]" />
                </div>
              </div>

              {/* Alertas y Notificaciones */}
              <div className="bg-[#0E2A3A] rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
                <h3 className="text-[11px] font-black text-white/40 mb-6 uppercase tracking-[0.2em]">Alertas y Notificaciones</h3>
                <div className="space-y-4">
                   <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <AlertTriangle size={18} className="text-orange-500" />
                      <div className="text-[11px] font-bold text-white/80">Créditos bajos — quedan 200</div>
                   </div>
                   <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <Bell size={18} className="text-[#4CB89C]" />
                      <div className="text-[11px] font-bold text-white/80">Nueva versión de TransSync</div>
                   </div>
                   <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <FileText size={18} className="text-primary" />
                      <div className="text-[11px] font-bold text-white/80">Factura de marzo lista</div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Aplicaciones (Bento Grid at bottom) */}
          <div className="mt-12 pt-12 border-t border-[#ECF1F3]">
            <h3 className="text-[11px] font-black text-[#0E2A3A] mb-8 uppercase tracking-[0.3em] flex items-center gap-3">
               <LayoutGrid size={16} className="text-primary" /> Aplicaciones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AppGridCard name="TransSync TMS" desc="Gestión inmersiva de transporte y rutas inteligentes." icon={Truck} href="/transsync/dashboard/inicio" color="from-[#1A8FBF] to-[#2BA0C5]" />
              <AppGridCard name="Inventario" desc="Control total de existencias y WMS." icon={Box} href="#" color="from-[#F97316] to-[#C2410C]" />
              <AppGridCard name="RRHH" desc="Gestión de talento y nóminas corporativas." icon={Users} href="#" color="from-[#4CB89C] to-[#2B8365]" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
