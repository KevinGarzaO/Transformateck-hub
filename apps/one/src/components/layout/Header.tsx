'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useApp } from './AppProvider'
import type { NavSection } from '@/app/avocado/app/page'
import AvocadoAppSwitcher from './AppSwitcher'

function getSectionLabel(active: string): string {
  const ERP_MENU = [
    {
      title: 'CUENTA',
      categories: [
        {
          title: '👤 Perfil',
          items: [
            { id: 'profile-data', label: 'Datos personales' },
            { id: 'profile-photo', label: 'Foto de perfil' },
            { id: 'profile-prefs', label: 'Preferencias' },
          ]
        },
        {
          title: '🔒 Seguridad',
          items: [
            { id: 'sec-password', label: 'Contraseña' },
            { id: 'sec-sessions', label: 'Sesiones activas' },
            { id: 'sec-api', label: 'API Keys' },
            { id: 'sec-2fa', label: '2FA' },
          ]
        },
        {
          title: '💰 Créditos',
          items: [
            { id: 'credits-wallet', label: 'Wallet' },
            { id: 'credits-topup', label: 'Recargar' },
            { id: 'credits-usage', label: 'Uso por producto' },
            { id: 'credits-history', label: 'Historial' },
          ]
        },
        {
          title: '💳 Facturación',
          items: [
            { id: 'bill-plan', label: 'Plan actual' },
            { id: 'bill-history', label: 'Historial de pagos' },
            { id: 'bill-invoices', label: 'Facturas descargables' },
          ]
        },
        {
          title: '🔔 Notificaciones',
          items: [
            { id: 'notif-credits', label: 'Alertas de créditos' },
            { id: 'notif-news', label: 'Novedades' },
            { id: 'notif-sec', label: 'Alertas de seguridad' },
          ]
        },
        {
          title: '❓ Ayuda',
          items: [
            { id: 'help-docs', label: 'Documentación' },
            { id: 'help-tuts', label: 'Tutoriales' },
            { id: 'help-support', label: 'Soporte' },
            { id: 'feedback', label: 'Dar feedback' },
          ]
        },
      ]
    },
    {
      title: 'CMS',
      categories: [
        {
          title: '📊 Estrategia',
          items: [
            { id: 'cms-dashboard', label: 'Dashboard CMS' },
            { id: 'calendar-month', label: 'Calendario editorial' },
            { id: 'content-report', label: 'Auditoría & análisis' },
            { id: 'ai-chat', label: 'Co-pilot de Negocio', pro: true },
          ]
        },
        {
          title: '✏️ Content Ops',
          items: [
            { id: 'topics-all', label: 'Banco de temas' },
            { id: 'redactor-new', label: 'Redactor IA' },
            { id: 'templates-mine', label: 'Plantillas & formatos' },
            { id: 'history-all', label: 'Historial' },
            { id: 'auto-gen-style', label: 'Generador automático', pro: true },
          ]
        },
        {
          title: '📡 Canales',
          items: [
            { id: 'li-dash', label: 'LinkedIn' },
            { id: 'substack-dash', label: 'Substack' },
            { id: 'wp-dash', label: 'WordPress', soon: true },
            { id: 'x-dash', label: 'X / Twitter', soon: true },
            { id: 'multichannel-create', label: 'Multicanal', pro: true },
          ]
        },
        {
          title: '📡 Automatización',
          items: [
            { id: 'webhooks-mine', label: 'Webhooks' },
            { id: 'zapier-connections', label: 'Zapier / Make' },
            { id: 'integrations-wp', label: 'Integraciones' },
            { id: 'flows-mine', label: 'Flujos automáticos', pro: true },
          ]
        },
      ]
    },
  ];

  for (const group of ERP_MENU) {
    for (const cat of group.categories) {
      for (const item of cat.items) {
        if (item.id === active) return item.label;
      }
    }
  }
  return 'Sección';
}

interface Props { 
  activeSection: NavSection;
  onMenuClick?: () => void;
  appName?: string;
  appLogo?: string;
  activeApp?: 'avocado' | 'specforge' | 'cuenta';
}

export function Header({ activeSection, onMenuClick, appName = "Avocado Estudio", appLogo = "🥑", activeApp = 'avocado' }: Props) {
  useEffect(() => {
    document.title = `${appName} | ${getSectionLabel(activeSection)}`
  }, [activeSection, appName])

  return (
    <header className="topbar">
      {/* Mobile Menu Button */}
      <button 
        onClick={onMenuClick}
        className="md:hidden p-2 hover:text-white transition-colors"
        style={{ color: '#7D8FA9', display: 'none' }}
      >
        <i className="pi pi-bars text-lg"></i>
      </button>

      {/* Logo & Breadcrumb */}
      <div className="topbar-logo">
        <div className="logo-icon">
          {appLogo}
        </div>
        <span className="logo-text">{appName.toUpperCase()}</span>
      </div>

      <div className="topbar-breadcrumb">
        <span>{appName}</span>
        <span className="sep">/</span>
        <span className="current">{getSectionLabel(activeSection)}</span>
      </div>

      <div className="topbar-search">
        <i className="pi pi-search search-icon"></i>
        <input 
          type="text" 
          placeholder="Buscar contenido, canales, tendencias..." 
        />
      </div>

      {/* Right Section */}
      <div className="topbar-right">
        <div className="ai-status">
          <span className="dot"></span>
          <span>Claude Haiku 4.5</span>
        </div>
        
        <div className="text-secondary cursor-pointer text-sm">
          <i className="pi pi-bell"></i>
        </div>
        
        <AvocadoAppSwitcher activeApp={activeApp} />
        
        <Link href="/cuenta/portal" className="topbar-avatar">
          KG
        </Link>
      </div>
    </header>
  )
}