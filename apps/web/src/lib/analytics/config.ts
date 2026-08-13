export const ANALYTICS_CONFIG = {
  // Google Analytics 4
  GA4: {
    transformateck: process.env.NEXT_PUBLIC_GA4_TRANSFORMATECK || 'G-XXXXXXXXXX',
  },

  // Meta Pixel
  META_PIXEL: {
    transformateck: process.env.NEXT_PUBLIC_META_PIXEL_TRANSFORMATECK || 'XXXXXXXXXXXXXXX',
  }
}
