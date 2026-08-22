import { supabase } from "../supabase";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  markdownContent: string;
  image?: string;
  publico: boolean;
  type?: string;
  authorName?: string;
  authorImg?: string;
  date?: any;
  updatedAt?: any;
}

/**
 * Obtiene los milisegundos desde epoch a partir de un timestamp
 */
export function getTimestampMs(dateField?: any): number | null {
  if (!dateField) return null;
  if (typeof dateField === "object" && dateField !== null && "seconds" in dateField && typeof dateField.seconds === "number") {
    return dateField.seconds * 1000;
  }
  if (dateField instanceof Date) {
    return dateField.getTime();
  }
  const parsed = new Date(dateField);
  return isNaN(parsed.getTime()) ? null : parsed.getTime();
}

/**
 * Convierte un timestamp en formato de texto legible
 */
export function formatDate(dateField?: any): string {
  const ms = getTimestampMs(dateField);
  if (!ms) return "Fecha reciente";
  try {
    return new Date(ms).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    return "Fecha reciente";
  }
}

/**
 * Calcula el tiempo estimado de lectura en minutos
 */
export function calculateReadingTime(content: string = ""): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Obtiene todos los posts públicos desde Supabase
 */
export async function getPublicPosts(): Promise<BlogPost[]> {
  try {
    const { data: posts, error } = await supabase
      .from("content")
      .select("*")
      .eq("content_type", "blog_post")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error al obtener posts de Supabase:", error.message);
      return [];
    }

    return (posts || []).map((post: any) => ({
      id: post.id,
      title: post.title || "Sin título",
      slug: post.slug || post.id,
      excerpt: post.excerpt || "",
      markdownContent: post.markdown_content || "",
      image: post.image_url || "",
      publico: true,
      type: "Blog",
      authorName: "Kevin Garza",
      authorImg: "https://firebasestorage.googleapis.com/v0/b/babelink-ia.firebasestorage.app/o/all%2FKevinGarza.png?alt=media&token=6f54",
      date: post.published_at || post.created_at,
      updatedAt: post.updated_at,
    }));
  } catch (error) {
    console.error("Error al obtener posts de Supabase:", error);
    return [];
  }
}

/**
 * Obtiene un post específico por su slug desde Supabase
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data: post, error } = await supabase
      .from("content")
      .select("*")
      .eq("slug", slug)
      .eq("content_type", "blog_post")
      .single();

    if (error || !post) {
      console.error(`Error al obtener post con slug '${slug}':`, error?.message);
      return null;
    }

    return {
      id: post.id,
      title: post.title || "Sin título",
      slug: post.slug || post.id,
      excerpt: post.excerpt || "",
      markdownContent: post.markdown_content || "",
      image: post.image_url || "",
      publico: true,
      type: "Blog",
      authorName: "Kevin Garza",
      authorImg: "https://firebasestorage.googleapis.com/v0/b/babelink-ia.firebasestorage.app/o/all%2FKevinGarza.png?alt=media&token=6f54",
      date: post.published_at || post.created_at,
      updatedAt: post.updated_at,
    };
  } catch (error) {
    console.error(`Error al obtener post con slug '${slug}':`, error);
    return null;
  }
}
