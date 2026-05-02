import type { Metadata } from 'next'
import '@/app/globals.css'
import { AppProvider } from '@/components/layout/AppProvider'
import { PWARegister } from '@/components/layout/PWARegister'
import { InstallPWA } from '@/components/layout/InstallPWA'

export const viewport = {
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: 'Avocado Estudio',
  description: 'Plataforma de creación y publicación de contenido con IA',
  manifest: '/manifest.json',
  icons: { 
    icon: '/icon-192.png',
    apple: '/icon-192.png'
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black',
    title: 'Avocado Estudio',
  }
}

export default function AvocadoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PWARegister />
      <InstallPWA />
      <AppProvider>{children}</AppProvider>
    </>
  )
}
