import type { MetadataRoute } from 'next';
import { getPublicPosts, getTimestampMs } from '@/lib/services/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://transformateck.com';

  // Rutas estáticas de la aplicación
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Rutas dinámicas para cada artículo del blog publicado en Firestore
  try {
    const posts = await getPublicPosts();
    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => {
      const updatedMs = getTimestampMs(post.updatedAt) || getTimestampMs(post.date);
      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: updatedMs ? new Date(updatedMs) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      };
    });

    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    console.error('Error al generar entradas en el sitemap:', error);
    return staticRoutes;
  }
}
