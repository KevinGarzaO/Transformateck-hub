'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

const BackgroundEffects = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(78,204,163,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(78,204,163,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
    <motion.div 
      animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(78,204,163,0.15)_0,transparent_50%)] rounded-full blur-3xl"
    />
  </div>
);

export default function WorkspaceCuentaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#4ECCA3] relative overflow-x-hidden font-sans">
      <BackgroundEffects />
      

      <main className="relative z-10 min-h-screen">
        {children}
      </main>

      <div className="fixed bottom-0 left-0 w-full p-8 pointer-events-none opacity-10">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center text-[8px] font-black uppercase tracking-[0.4em] text-white/50">
          <span>WORKSPACE_SECURE_NODE_04</span>
          <span>B2B_INFRASTRUCTURE_2026</span>
        </div>
      </div>
    </div>
  );
}
