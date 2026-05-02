// lib/analytics/events.ts

// Tipos de eventos
type MetaEvent =
  | 'PageView'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Subscribe'
  | 'ViewContent'
  | 'InitiateCheckout'
  | 'Purchase'

type GA4Event =
  | 'newsletter_subscribe'
  | 'signup'
  | 'login'
  | 'app_click'
  | 'cta_click'
  | 'blog_read'
  | 'purchase'

declare global {
  interface Window {
    fbq: any
    gtag: any
  }
}

// Disparar evento en Meta Pixel
export function trackMeta(event: MetaEvent, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, data)
  }
}

// Disparar evento en GA4
export function trackGA4(event: GA4Event, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, data)
  }
}

// Eventos combinados — disparan en Meta y GA4 simultáneamente
export const AnalyticsEvents = {
  // Usuario se suscribe al newsletter
  newsletterSubscribe: (source: string) => {
    trackMeta('Subscribe', { content_name: source })
    trackGA4('newsletter_subscribe', { source })
  },

  // Usuario se registra en la app
  signup: (app: string) => {
    trackMeta('CompleteRegistration', { content_name: app })
    trackGA4('signup', { app })
  },

  // Usuario hace login
  login: (app: string) => {
    trackGA4('login', { app })
  },

  // Usuario hace click en una app desde la landing
  appClick: (app: string) => {
    trackMeta('ViewContent', { content_name: app })
    trackGA4('app_click', { app })
  },

  // Usuario hace click en CTA principal
  ctaClick: (cta: string, source: string) => {
    trackMeta('Lead', { content_name: cta })
    trackGA4('cta_click', { cta, source })
  },

  // Usuario lee un blog post
  blogRead: (title: string, source: string) => {
    trackMeta('ViewContent', { content_name: title })
    trackGA4('blog_read', { title, source })
  },

  // Usuario hace una compra/recarga
  purchase: (amount: number, currency: string = 'MXN') => {
    trackMeta('Purchase', { value: amount, currency })
    trackGA4('purchase', { value: amount, currency })
  }
}
