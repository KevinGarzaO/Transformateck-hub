export const ANALYTICS_CONFIG = {
  // Google Analytics 4
  GA4: {
    transformateck: process.env.NEXT_PUBLIC_GA4_TRANSFORMATECK || 'G-XXXXXXXXXX',
    one: process.env.NEXT_PUBLIC_GA4_ONE || 'G-XXXXXXXXXX',
    avocado: process.env.NEXT_PUBLIC_GA4_AVOCADO || 'G-XXXXXXXXXX',
    specforge: process.env.NEXT_PUBLIC_GA4_SPECFORGE || 'G-XXXXXXXXXX',
    transsync: process.env.NEXT_PUBLIC_GA4_TRANSSYNC || 'G-XXXXXXXXXX',
    workspace: process.env.NEXT_PUBLIC_GA4_WORKSPACE || 'G-XXXXXXXXXX',
    inventarios: process.env.NEXT_PUBLIC_GA4_INVENTARIOS || 'G-XXXXXXXXXX',
  },

  // Meta Pixel
  META_PIXEL: {
    transformateck: process.env.NEXT_PUBLIC_META_PIXEL_TRANSFORMATECK || 'XXXXXXXXXXXXXXX',
    one: process.env.NEXT_PUBLIC_META_PIXEL_ONE || 'XXXXXXXXXXXXXXX',
    avocado: process.env.NEXT_PUBLIC_META_PIXEL_AVOCADO || 'XXXXXXXXXXXXXXX',
    specforge: process.env.NEXT_PUBLIC_META_PIXEL_SPECFORGE || 'XXXXXXXXXXXXXXX',
    transsync: process.env.NEXT_PUBLIC_META_PIXEL_TRANSSYNC || 'XXXXXXXXXXXXXXX',
    workspace: process.env.NEXT_PUBLIC_META_PIXEL_WORKSPACE || 'XXXXXXXXXXXXXXX',
    inventarios: process.env.NEXT_PUBLIC_META_PIXEL_INVENTARIOS || 'XXXXXXXXXXXXXXX',
  }
}
