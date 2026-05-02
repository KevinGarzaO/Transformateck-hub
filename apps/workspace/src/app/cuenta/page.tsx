'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WorkspaceCuentaRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/cuenta/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#4ECCA3] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
