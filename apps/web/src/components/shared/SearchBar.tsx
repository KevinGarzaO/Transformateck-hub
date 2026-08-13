'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getPublicPosts, type BlogPost } from '@/lib/services/blog';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BlogPost[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getPublicPosts().then(setAllPosts);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.type?.toLowerCase().includes(q) ||
        p.markdownContent.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 5));
  }, [query, allPosts]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={inputRef} className="relative flex-1 max-w-md">
      <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md focus-within:border-[#4ECCA3]/50 focus-within:bg-[#4ECCA3]/10 transition-all duration-300">
        <Search size={14} className="text-white/50" />
        <input
          type="text"
          placeholder="Buscar artículos..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          className="bg-transparent outline-none text-sm text-white placeholder-white/50 w-full font-medium"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0A0A0A]/95 backdrop-blur-xl border border-[#4ECCA3]/20 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50">
          {results.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="flex items-center gap-4 p-4 hover:bg-[#4ECCA3]/10 transition-colors border-b border-white/5 last:border-0"
            >
              {post.image && (
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{post.title}</p>
                <p className="text-xs text-white/50 line-clamp-1">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0A0A0A]/95 backdrop-blur-xl border border-[#4ECCA3]/20 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50">
          <p className="text-sm text-white/50 text-center">No se encontraron artículos</p>
        </div>
      )}
    </div>
  );
}
