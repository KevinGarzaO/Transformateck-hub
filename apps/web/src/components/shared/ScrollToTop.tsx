'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#4ECCA3] text-[#050505] flex items-center justify-center shadow-[0_0_20px_rgba(78,204,163,0.5)] hover:shadow-[0_0_30px_rgba(78,204,163,0.8)] transition-all duration-300"
      aria-label="Volver arriba"
    >
      <ArrowUp size={20} />
    </button>
  );
}
