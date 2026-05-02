// lib/analytics/getAnalyticsId.ts

export interface AnalyticsIds {
  gaId: string;
  metaPixelId: string;
}

export function getAnalyticsIds(): AnalyticsIds {
  if (typeof window === 'undefined') return { gaId: '', metaPixelId: '' };

  const host = window.location.hostname;

  // 1. Avocado Estudio
  if (host.includes('avocado')) {
    return {
      gaId: process.env.NEXT_PUBLIC_GA4_AVOCADO || 'G-XXXXXXXXXX',
      metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_AVOCADO || 'XXXXXXXXXXXXXXX'
    };
  }

  // 2. SpecForge
  if (host.includes('specforge')) {
    return {
      gaId: process.env.NEXT_PUBLIC_GA4_SPECFORGE || 'G-XXXXXXXXXX',
      metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_SPECFORGE || 'XXXXXXXXXXXXXXX'
    };
  }

  // 3. TransSync
  if (host.includes('transsync')) {
    return {
      gaId: process.env.NEXT_PUBLIC_GA4_TRANSSYNC || 'G-XXXXXXXXXX',
      metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_TRANSSYNC || 'XXXXXXXXXXXXXXX'
    };
  }

  // 4. Inventarios
  if (host.includes('inventarios')) {
    return {
      gaId: process.env.NEXT_PUBLIC_GA4_INVENTARIOS || 'G-XXXXXXXXXX',
      metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_INVENTARIOS || 'XXXXXXXXXXXXXXX'
    };
  }

  // 5. Workspace (Portal Central)
  if (host.includes('workspace')) {
    return {
      gaId: process.env.NEXT_PUBLIC_GA4_WORKSPACE || 'G-XXXXXXXXXX',
      metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_WORKSPACE || 'XXXXXXXXXXXXXXX'
    };
  }

  // 6. One (Landing/Personal)
  if (host.includes('one')) {
    return {
      gaId: process.env.NEXT_PUBLIC_GA4_ONE || 'G-XXXXXXXXXX',
      metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ONE || 'XXXXXXXXXXXXXXX'
    };
  }

  // Default → transformateck.com (Hub)
  return {
    gaId: process.env.NEXT_PUBLIC_GA4_TRANSFORMATECK || 'G-XXXXXXXXXX',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_TRANSFORMATECK || 'XXXXXXXXXXXXXXX'
  };
}
