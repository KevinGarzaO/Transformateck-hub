'use client'

import { useState } from 'react'
import type { NavSection } from '@/app/avocado/app/page'

interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  pro?: boolean;
  soon?: boolean;
}

const AVOCADO_CORE_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Resumen general', icon: '🏠' },
  { id: 'recent-activity', label: 'Actividad reciente', icon: '📋' },
  { id: 'notifications', label: 'Notificaciones', icon: '🔔', badge: 3 },
]

const ACCOUNT_ITEMS: NavItem[] = [
  // PERFIL
  { id: 'profile-data', label: 'Datos personales', icon: '👤' },
  { id: 'profile-photo', label: 'Foto de perfil', icon: '📷' },
  { id: 'profile-prefs', label: 'Preferencias', icon: '⚙️' },
  
  // SEGURIDAD
  { id: 'sec-password', label: 'Contraseña', icon: '🔒' },
  { id: 'sec-sessions', label: 'Sesiones activas', icon: '💻' },
  { id: 'sec-api', label: 'API Keys', icon: '🔑' },
  { id: 'sec-2fa', label: '2FA', icon: '🛡️' },

  // CRÉDITOS
  { id: 'credits-wallet', label: 'Wallet', icon: '💰' },
  { id: 'credits-topup', label: 'Recargar', icon: '➕' },
  { id: 'credits-usage', label: 'Uso por producto', icon: '📊' },
  { id: 'credits-history', label: 'Historial', icon: '📜' },

  // FACTURACIÓN
  { id: 'bill-plan', label: 'Plan actual', icon: '💳' },
  { id: 'bill-history', label: 'Historial de pagos', icon: '📈' },
  { id: 'bill-invoices', label: 'Facturas descargables', icon: '📄' },

  // NOTIFICACIONES
  { id: 'notif-credits', label: 'Alertas de créditos', icon: '⚠️' },
  { id: 'notif-news', label: 'Novedades', icon: '📢' },
  { id: 'notif-sec', label: 'Alertas de seguridad', icon: '🚨' },

  // AYUDA
  { id: 'help-docs', label: 'Documentación', icon: '📚' },
  { id: 'help-tuts', label: 'Tutoriales', icon: '🎓' },
  { id: 'help-support', label: 'Soporte', icon: '❓' },
  { id: 'help-feedback', label: 'Dar feedback', icon: '💬' },
]

const CMS_ITEMS: NavItem[] = [
  { id: 'cms-dashboard', label: 'Dashboard CMS', icon: '📊' },
  { id: 'calendar-month', label: 'Calendario editorial', icon: '🗓️' },
  { id: 'content-report', label: 'Auditoría & análisis', icon: '📈' },
  { id: 'ai-chat', label: 'Co-pilot de Negocio', icon: '🤖', pro: true },
  { id: 'topics-all', label: 'Banco de temas', icon: '💡', badge: 5 },
  { id: 'redactor-new', label: 'Redactor IA', icon: '✏️' },
  { id: 'templates-mine', label: 'Plantillas & formatos', icon: '📝' },
  { id: 'history-all', label: 'Historial', icon: '📜' },
  { id: 'auto-gen-style', label: 'Generador automático', icon: '⚡', pro: true },
  { id: 'li-dash', label: 'LinkedIn', icon: '💼', badge: 1 },
  { id: 'substack-dash', label: 'Substack', icon: '📧', badge: 2 },
  { id: 'wp-dash', label: 'WordPress', icon: '🌐', soon: true },
  { id: 'x-dash', label: 'X / Twitter', icon: '🐦', soon: true },
  { id: 'multichannel-create', label: 'Multicanal', icon: '📡', pro: true },
  { id: 'webhooks-mine', label: 'Webhooks', icon: '🔗' },
  { id: 'zapier-connections', label: 'Zapier / Make', icon: '⚙️' },
  { id: 'integrations-wp', label: 'Integraciones', icon: '🔌' },
  { id: 'flows-mine', label: 'Flujos automáticos', icon: '🔀', pro: true },
]

const ACCOUNT_CATEGORIES = [
  { title: 'PERFIL', items: ACCOUNT_ITEMS.slice(0, 3) },
  { title: 'SEGURIDAD', items: ACCOUNT_ITEMS.slice(3, 7) },
  { title: 'CRÉDITOS', items: ACCOUNT_ITEMS.slice(7, 11) },
  { title: 'FACTURACIÓN', items: ACCOUNT_ITEMS.slice(11, 14) },
  { title: 'NOTIFICACIONES', items: ACCOUNT_ITEMS.slice(14, 17) },
  { title: 'AYUDA', items: ACCOUNT_ITEMS.slice(17, 21) },
]

const AVOCADO_APP_CATEGORIES = [
  { title: 'DASHBOARD', items: AVOCADO_CORE_ITEMS },
  { title: 'ESTRATEGIA', items: CMS_ITEMS.slice(0, 4) },
  { title: 'CONTENT OPS', items: CMS_ITEMS.slice(4, 9) },
  { title: 'CANALES', items: CMS_ITEMS.slice(9, 14) },
  { title: 'AUTOMATIZACIÓN', items: CMS_ITEMS.slice(14, 18) },
]

interface SidebarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  mode?: 'app' | 'account';
}

export default function Sidebar({ currentSection, onNavigate, mode = 'app' }: SidebarProps) {
  const categories = mode === 'account' ? ACCOUNT_CATEGORIES : AVOCADO_APP_CATEGORIES

  return (
    <aside className="sidebar">
      {/* Navigation */}
      {categories.map((category) => (
        <div key={category.title} className="sidebar-section">
          <div className="sidebar-section-label">{category.title}</div>
          <nav className="sidebar-nav">
            {category.items.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate(item.id as NavSection)}
                className={`sidebar-nav-item ${currentSection === item.id ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="label">{item.label}</span>
                {item.badge && (
                  <span className="badge">{item.badge}</span>
                )}
                {item.pro && (
                  <span className="badge-pro">PRO</span>
                )}
                {item.soon && (
                  <span className="badge-soon">SOON</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      ))}
    </aside>
  )
}