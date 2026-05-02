'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ChevronRight, Mail, Lock, Loader2, Sparkles, User, ArrowRight, Zap, Globe, Sparkle } from 'lucide-react';

export default function RegistroPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // MODO DISEÑO: Bypass backend
    document.cookie = "one_token=design_mode; path=/";
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/cuenta/portal');
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#050505', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      {/* LEFT PANEL - Branding */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f0f1a 100%)',
        borderRight: '1px solid rgba(124, 58, 237, 0.15)', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)', top: '-100px', right: '-100px', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)', bottom: '10%', left: '-50px', borderRadius: '50%' }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
             <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)' }}>
              <ShieldCheck size={28} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, background: 'linear-gradient(90deg, #fff, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>Transformateck ONE</h1>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '2px', margin: 0, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ecosistema IA Unificado</p>
            </div>
          </div>

          <h2 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', color: '#fff', margin: 0, maxWidth: '580px' }}>
            Únete a la nueva era del <span style={{ color: '#A78BFA' }}>desarrollo con IA.</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '56px', maxWidth: '500px' }}>
            Crea tu cuenta unificada y obtén acceso instantáneo a todas las aplicaciones de nuestro ecosistema. Un solo ID, infinitas posibilidades.
          </p>

          {/* Social Proof / Stats */}
          <div style={{ display: 'flex', gap: '40px' }}>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>100%</div>
              <div style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Integración</div>
            </div>
            <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>Secured</div>
              <div style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Encryption</div>
            </div>
             <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>IA</div>
              <div style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Native</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Form */}
      <div style={{ width: '520px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 60px', backgroundColor: '#0a0a0a', flexShrink: 0, borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px', color: '#fff', letterSpacing: '-0.02em' }}>Crea tu cuenta 🚀</h2>
          <p style={{ color: '#94A3B8', fontSize: '1rem', margin: 0 }}>Comienza tu viaje en el ecosistema One hoy.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Nombre Completo</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="#475569" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                required 
                type="text" 
                style={{ width: '100%', padding: '14px 16px 14px 48px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', color: '#fff', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.95rem' }} 
                onFocus={(e) => e.currentTarget.style.borderColor = '#7C3AED'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                value={form.name} 
                onChange={e => setForm({ ...form, name: e.target.value })} 
                placeholder="Kevin Garza" 
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Correo Electrónico</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#475569" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                required 
                type="email" 
                style={{ width: '100%', padding: '14px 16px 14px 48px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', color: '#fff', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.95rem' }} 
                onFocus={(e) => e.currentTarget.style.borderColor = '#7C3AED'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                value={form.email} 
                onChange={e => setForm({ ...form, email: e.target.value })} 
                placeholder="tu@email.com" 
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#475569" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                required 
                type="password" 
                style={{ width: '100%', padding: '14px 16px 14px 48px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', color: '#fff', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.95rem' }} 
                onFocus={(e) => e.currentTarget.style.borderColor = '#7C3AED'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                value={form.password} 
                onChange={e => setForm({ ...form, password: e.target.value })} 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4, margin: '4px 0' }}>
            Al registrarte, aceptas nuestros <span style={{ color: '#94A3B8' }}>Términos de Servicio</span> y <span style={{ color: '#94A3B8' }}>Política de Privacidad</span>.
          </div>

          <button 
            type="submit" 
            style={{ 
              padding: '16px', fontSize: '0.95rem', marginTop: '8px', width: '100%', 
              background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', color: '#fff', border: 'none', borderRadius: '14px', 
              fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
              boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)',
              textTransform: 'uppercase', letterSpacing: '0.05em'
            }} 
            disabled={loading}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {loading ? 'Creando Identidad...' : 'Crear mi ID de One'}
          </button>
        </form>

        <p style={{ marginTop: '40px', fontSize: '0.95rem', color: '#94A3B8', textAlign: 'center' }}>
          ¿Ya tienes cuenta? <Link href="/cuenta/login" style={{ color: '#A78BFA', textDecoration: 'none', fontWeight: 700 }}>Inicia sesión aquí →</Link>
        </p>

        <style jsx global>{`
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus {
            -webkit-text-fill-color: #fff !important;
            -webkit-box-shadow: 0 0 0px 1000px #0a0a0a inset !important;
            transition: background-color 5000s ease-in-out 0s;
          }
        `}</style>
      </div>
    </div>
  );
}
