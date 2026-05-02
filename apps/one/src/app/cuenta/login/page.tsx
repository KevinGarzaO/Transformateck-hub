'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ChevronRight, Mail, Lock, Loader2, Sparkles, LayoutGrid, Wallet, UserCircle, Zap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // MODO DISEÑO: Bypass backend
      document.cookie = "one_token=design_mode; path=/";
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/cuenta/portal');
    } catch {
      setError('Error en modo diseño');
    }
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
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)', top: '-100px', left: '-100px', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)', bottom: '-80px', right: '-80px', borderRadius: '50%' }}></div>

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

          {/* Headline */}
          <h2 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', color: '#fff', margin: 0, maxWidth: '600px' }}>
            Una sola llave para <span style={{ color: '#A78BFA' }}>todo tu potencial builder.</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '48px', maxWidth: '520px' }}>
            Accede a Avocado, SpecForge y todas nuestras herramientas con una cuenta centralizada. Gestiona créditos y perfil en un solo lugar.
          </p>

          {/* Features */}
          {[
            { icon: LayoutGrid, title: 'Hub de Aplicaciones', desc: 'Salta entre proyectos y herramientas sin cambiar de cuenta.' },
            { icon: Wallet, title: 'Billetera Unificada', desc: 'Tus créditos IA fluyen por todo el ecosistema One.' },
            { icon: UserCircle, title: 'Perfil Maestro', desc: 'Gestiona tu identidad, seguridad y facturación global.' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '32px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <f.icon size={20} color="#A78BFA" />
              </div>
              <div>
                <p style={{ fontWeight: 700, color: '#fff', marginBottom: '4px', margin: 0, fontSize: '1rem' }}>{f.title}</p>
                <p style={{ fontSize: '0.9rem', color: '#94A3B8', margin: 0, lineHeight: 1.4 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL - Form */}
      <div style={{ width: '520px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', backgroundColor: '#0a0a0a', flexShrink: 0, borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px', color: '#fff', letterSpacing: '-0.02em' }}>Bienvenido 👋</h2>
          <p style={{ color: '#94A3B8', fontSize: '1rem', margin: 0 }}>Ingresa a tu cuenta One para continuar.</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', padding: '14px 18px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem', border: '1px solid rgba(239, 68, 68, 0.2)', fontWeight: 500 }}>
             {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>Correo Electrónico</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#475569" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                required 
                type="email" 
                style={{ width: '100%', padding: '16px 16px 16px 48px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', color: '#fff', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.95rem' }} 
                onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                value={form.email} 
                onChange={e => setForm({ ...form, email: e.target.value })} 
                placeholder="tu@email.com" 
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#475569" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                required 
                type="password" 
                style={{ width: '100%', padding: '16px 16px 16px 48px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', color: '#fff', outline: 'none', transition: 'border-color 0.2s', fontSize: '0.95rem' }} 
                onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                value={form.password} 
                onChange={e => setForm({ ...form, password: e.target.value })} 
                placeholder="••••••••" 
              />
            </div>
          </div>
          <button 
            type="submit" 
            style={{ 
              padding: '18px', fontSize: '1rem', marginTop: '12px', width: '100%', 
              background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', color: '#fff', border: 'none', borderRadius: '14px', 
              fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
              boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)',
              textTransform: 'uppercase', letterSpacing: '0.05em'
            }} 
            disabled={loading}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {loading ? 'Validando Acceso...' : 'Ingresar a One'}
          </button>
        </form>

        <p style={{ marginTop: '40px', fontSize: '0.95rem', color: '#94A3B8', textAlign: 'center' }}>
          ¿Sin cuenta? <Link href="/cuenta/registro" style={{ color: '#A78BFA', textDecoration: 'none', fontWeight: 700 }}>Crea tu ID de One gratis →</Link>
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
