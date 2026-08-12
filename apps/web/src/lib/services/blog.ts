import { db } from "../firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

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
 * Obtiene los milisegundos desde epoch a partir de un Timestamp de Firestore, Date o string
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
 * Convierte un Timestamp de Firestore o fecha en formato de texto legible
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
 * Obtiene todos los posts públicos de la colección 'entradas'
 */
export async function getPublicPosts(): Promise<BlogPost[]> {
  try {
    const q = query(
      collection(db, "entradas"),
      where("publico", "==", true)
    );
    const snapshot = await getDocs(q);
    const posts: BlogPost[] = [];
    
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      posts.push({
        id: docSnap.id,
        title: data.title || "Sin título",
        slug: data.slug || docSnap.id,
        excerpt: data.excerpt || "",
        markdownContent: data.markdownContent || "",
        image: data.image || "",
        publico: data.publico ?? true,
        type: data.type || "Blog",
        authorName: data.authorName || "Equipo Transformateck",
        authorImg: data.authorImg || "",
        date: data.date,
        updatedAt: data.updatedAt,
      });
    });

    // Ordenar por fecha descendente
    return posts.sort((a, b) => {
      const msA = getTimestampMs(a.date) || 0;
      const msB = getTimestampMs(b.date) || 0;
      return msB - msA;
    });
  } catch (error) {
    console.error("Error al obtener posts públicos de Firebase:", error);
    return [];
  }
}

/**
 * Obtiene un post específico por su slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const q = query(
      collection(db, "entradas"),
      where("slug", "==", slug)
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || "Sin título",
        slug: data.slug || docSnap.id,
        excerpt: data.excerpt || "",
        markdownContent: data.markdownContent || "",
        image: data.image || "",
        publico: data.publico ?? true,
        type: data.type || "Blog",
        authorName: data.authorName || "Equipo Transformateck",
        authorImg: data.authorImg || "",
        date: data.date,
        updatedAt: data.updatedAt,
      };
    }

    // Fallback: si el id coincide con el slug
    const directDocRef = doc(db, "entradas", slug);
    const directSnap = await getDoc(directDocRef);
    if (directSnap.exists()) {
      const data = directSnap.data();
      return {
        id: directSnap.id,
        title: data.title || "Sin título",
        slug: data.slug || directSnap.id,
        excerpt: data.excerpt || "",
        markdownContent: data.markdownContent || "",
        image: data.image || "",
        publico: data.publico ?? true,
        type: data.type || "Blog",
        authorName: data.authorName || "Equipo Transformateck",
        authorImg: data.authorImg || "",
        date: data.date,
        updatedAt: data.updatedAt,
      };
    }

    return null;
  } catch (error) {
    console.error(`Error al obtener post con slug '${slug}':`, error);
    return null;
  }
}
