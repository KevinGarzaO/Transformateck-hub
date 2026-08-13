// lib/analytics/getAnalyticsId.ts

export interface AnalyticsIds {
  gaId: string;
  metaPixelId: string;
}

export function getAnalyticsIds(): AnalyticsIds {
  if (typeof window === 'undefined') return { gaId: '', metaPixelId: '' };

  // Default → transformateck.com (Hub)
  return {
    gaId: process.env.NEXT_PUBLIC_GA4_TRANSFORMATECK || 'G-XXXXXXXXXX',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_TRANSFORMATECK || 'XXXXXXXXXXXXXXX'
  };
}
