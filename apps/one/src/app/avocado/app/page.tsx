'use client'
import { useState } from 'react'
import SidebarNew from '@/components/layout/SidebarNew'
import { Header } from '@/components/layout/Header'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { TopicsSection } from '@/components/topics/TopicsSection'
import { RedactorSection } from '@/components/redactor/RedactorSection'
import { HistorySection } from '@/components/history/HistorySection'
import { CalendarSection } from '@/components/calendar/CalendarSection'
import { StatsSection } from '@/components/stats/StatsSection'
import { TemplatesSection } from '@/components/templates/TemplatesSection'
import { SubstackSection } from '@/components/substack/SubstackSection'
import { IntegrationsSection } from '@/components/integrations/IntegrationsSection'
import { LinkedInSection } from '@/components/linkedin/LinkedInSection'
import { SettingsSection } from '@/components/settings/SettingsSection'
import AvocadoStatusBar from '@/components/layout/StatusBar'

export type NavSection = 
  | 'dashboard' | 'recent-activity' | 'notifications'
  | 'profile-data' | 'photo-brand' | 'preferences'
  | 'billing-plan' | 'payment-history' | 'change-plan'
  | 'security-password' | 'active-sessions' | 'api-keys'
  | 'help-docs' | 'tutorials' | 'support' | 'feedback'
  | 'cms-dashboard' | 'calendar-month' | 'content-report' | 'ai-chat'
  | 'topics-all' | 'redactor-new' | 'templates-mine' | 'history-all' | 'auto-gen-style'
  | 'li-dash' | 'substack-dash' | 'wp-dash' | 'x-dash' | 'multichannel-create'
  | 'webhooks-mine' | 'zapier-connections' | 'integrations-wp' | 'flows-mine'
  | 'crm-contacts' | 'crm-lists' | 'crm-pipelines'
  | 'leads-active' | 'providers-dir' | 'leads-history-date'
  | 'copilot-chat-new' | 'rec-active' | 'biz-report'
  | 'fin-balance' | 'fin-history'
  | 'loan-active' | 'loan-request' | 'loan-history'
  | 'pay-next' | 'pay-now' | 'pay-vouchers'
  | 'trans-analyzer' | 'trans-reports' | 'trans-recommendations'
  | 'trans-feed' | 'trans-groups' | 'trans-events'
  | 'trans-library' | 'trans-tutorials'
  | 'trans-providers' | 'trans-members'
  // Legacy or generic
  | 'substack' | 'settings' | 'redactor' | 'topics' | 'calendar' | 'stats' | 'history' | 'templates' | 'integrations'
  | 'profile-photo' | 'profile-prefs' | 'sec-password' | 'sec-sessions' | 'sec-api' | 'sec-2fa'
  | 'credits-wallet' | 'credits-topup' | 'credits-usage' | 'credits-history'
  | 'bill-plan' | 'bill-history' | 'bill-invoices'
  | 'notif-credits' | 'notif-news' | 'notif-sec'
  | 'help-tuts' | 'help-support'
  | 'calendar-week' | 'scheduled' | 'channel-performance' | 'period-comparison'
  | 'chat-history' | 'active-recommendations' | 'topics-saved' | 'topics-suggested'
  | 'redactor-drafts' | 'redactor-approved' | 'templates-pre' | 'templates-create'
  | 'history-channel' | 'history-date' | 'auto-gen-schedule' | 'auto-gen-queue'
  | 'substack-posts' | 'substack-create' | 'substack-stats' | 'substack-config'
  | 'wp-posts' | 'wp-create' | 'wp-config' | 'li-posts' | 'li-create' | 'li-config'
  | 'x-posts' | 'x-create' | 'x-config' | 'multichannel-schedule' | 'multichannel-history'
  | 'webhooks-create' | 'webhooks-logs' | 'zapier-config' | 'integrations-li' | 'integrations-x' | 'integrations-stripe'
  | 'flows-create' | 'flows-templates' | 'crm-import' | 'crm-export' | 'crm-segment-create' | 'crm-segment-ia'
  | 'crm-pipeline-create' | 'crm-stages' | 'leads-process' | 'leads-closed' | 'providers-favs' | 'providers-add'
  | 'leads-history-provider' | 'leads-history-cat' | 'copilot-chat-history' | 'rec-archived' | 'biz-oppoutunities'
  | 'biz-suggested-providers' | 'trans-groups' | 'trans-events' | 'trans-feed'

export default function Home() {
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard')
  const [redactorPrefill, setRedactorPrefill] = useState<{ title?: string; notes?: string } | null>(null)

  function navTo(section: NavSection, prefill?: { title?: string; notes?: string }) {
    setActiveSection(section)
    if (prefill) setRedactorPrefill(prefill)
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':     return <Dashboard onNav={navTo} />
      case 'topics-all':    return <TopicsSection onWriteTopic={(t) => navTo('redactor-new', t)} />
      case 'redactor-new':  return <RedactorSection prefill={redactorPrefill} onNav={navTo} />
      case 'history-all':   return <HistorySection onRewrite={(t) => navTo('redactor-new', { title: t })} />
      case 'calendar-month': return <CalendarSection />
      case 'substack-stats': return <StatsSection />
      case 'templates-mine': return <TemplatesSection />
      case 'substack-dash':  return <SubstackSection />
      case 'li-dash':        return <LinkedInSection />
      case 'integrations':   return <IntegrationsSection />
      case 'security-password': return <SettingsSection />
      case 'profile-data':      return <div className="p-8 text-center text-stone-500 mt-20"><i className="pi pi-user text-4xl mb-4 opacity-50 block"></i><h2>Perfil & Facturación</h2><p className="text-sm mt-2">Gestión de cuenta y suscripción. (Próximamente)</p></div>
      case 'help-docs':         return <div className="p-8 text-center text-stone-500 mt-20"><i className="pi pi-question-circle text-4xl mb-4 opacity-50 block"></i><h2>Centro de Ayuda</h2><p className="text-sm mt-2">Documentación y soporte. (Próximamente)</p></div>
      case 'feedback':          return <div className="p-8 text-center text-stone-500 mt-20"><i className="pi pi-comment text-4xl mb-4 opacity-50 block"></i><h2>Dar Feedback</h2><p className="text-sm mt-2">Ayúdanos a mejorar enviando tus comentarios y sugerencias. (Próximamente)</p></div>
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-stone-400 py-20">
            <i className="pi pi-map-marker text-5xl mb-4 opacity-20"></i>
            <h2 className="text-xl font-bold text-stone-500">Módulo en construcción</h2>
            <p className="text-sm mt-2 max-w-xs text-center">Estamos trabajando para habilitar la sección <b>{activeSection}</b> muy pronto.</p>
            <button onClick={() => navTo('dashboard')} className="btn btn-secondary mt-6">Regresar al Dashboard</button>
          </div>
        )
    }
  }

  return (
    <div className="app-layout">
      <Header activeSection={activeSection} onMenuClick={() => {}} />
      <div className="app-body">
        <SidebarNew currentSection={activeSection} onNavigate={navTo} />
        <main className="main-content">
          {renderSection()}
        </main>
      </div>
      <AvocadoStatusBar />
    </div>
  )
}
