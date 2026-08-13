'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SearchBar } from './SearchBar';

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 p-6 px-8 md:px-16 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="/assets/logo_3.png"
            alt="Transformateck"
            width={32}
            height={32}
          />
          <span className="text-xl font-black tracking-tighter text-white">Transformateck</span>
        </Link>

        <SearchBar />

        <div className="hidden lg:flex items-center gap-10 bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-[#4ECCA3]/20">
          <Link href="/#comunidad" className="text-xs font-bold text-white/70 hover:text-[#4ECCA3] transition-colors tracking-widest uppercase">Comunidad</Link>
          <Link href="/blog" className="text-xs font-bold text-white/70 hover:text-[#4ECCA3] transition-colors tracking-widest uppercase">Blog & IA</Link>
          <Link href="/#suscribirme" className="text-xs font-bold text-white/70 hover:text-[#4ECCA3] transition-colors tracking-widest uppercase">Unirme</Link>
        </div>
      </div>
    </motion.nav>
  );
}
