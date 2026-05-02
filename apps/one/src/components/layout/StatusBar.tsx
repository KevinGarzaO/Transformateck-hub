'use client';
import { useRouter } from 'next/navigation';

interface AvocadoStatusBarProps {
  postsScheduled?: number;
  drafts?: number;
  credits?: number;
  userName?: string;
  userInitials?: string;
  roles?: string[];
}

export default function AvocadoStatusBar({ 
  postsScheduled = 3, 
  drafts = 2, 
  credits = 968,
  userName = 'Kevin Garza',
  userInitials = 'KG',
  roles = ['Founder']
}: AvocadoStatusBarProps) {
  const router = useRouter();

  const handleLogout = () => {
    // MODO DISEÑO: Borrar cookie y redirigir
    document.cookie = "one_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/cuenta/login';
  };
  return (
    <footer className="statusbar">
      <div className="statusbar-left">
        <div className="ai-status">
          <span className="dot"></span>
          <span className="text-primary">Claude Haiku 4.5 — Online & Listo</span>
        </div>
        
        <div className="divider"></div>
        
        <span>{postsScheduled} posts · {drafts} drafts</span>
      </div>

      <div className="statusbar-right">
        <div className="statusbar-user">
          <div className="topbar-avatar" style={{ width: 18, height: 18, fontSize: 8 }}>
            {userInitials}
          </div>
          <span>{userName}</span>
          {roles.map((role) => (
            <span key={role} className="role-badge">{role}</span>
          ))}
        </div>

        <button 
          onClick={handleLogout}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--danger)', 
            cursor: 'pointer', 
            fontSize: '11px',
            padding: '4px 8px',
            borderRadius: '4px',
            fontFamily: 'inherit',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          Cerrar Sesión
        </button>
      </div>
    </footer>
  );
}