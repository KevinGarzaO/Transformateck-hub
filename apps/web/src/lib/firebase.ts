import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuración de Firebase para Babelink IA / Transformateck
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDlgupOyTBYlfKQO6uH2rLyltwkcjDShqc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "babelink-ia.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "babelink-ia",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "babelink-ia.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "724975834078",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:724975834078:web:6635e8da6ac5b3e3a9034f",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-809T7BSL5S"
};

// Inicializar Firebase (Evita inicialización duplicada en Next.js Fast Refresh)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inicializar Firestore (Base de Datos) y Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Inicializar Analytics solo en el cliente (Browser)
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, auth, analytics, firebaseConfig };
