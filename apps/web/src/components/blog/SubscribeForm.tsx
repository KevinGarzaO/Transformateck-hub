"use client";

import { useState, type FormEvent } from "react";

const SUBSCRIBE_BASE = "https://transformateck.substack.com/subscribe";

interface SubscribeFormProps {
  variant?: "small" | "medium" | "large";
  centered?: boolean;
}

const sizes = {
  small: {
    input: "w-full max-w-xs px-3 py-2 rounded-lg text-sm",
    button: "w-full max-w-xs px-4 py-2 rounded-lg text-[10px]",
    legend: "text-[10px] max-w-xs",
  },
  medium: {
    input: "w-full max-w-sm px-4 py-3 rounded-xl text-base",
    button: "w-full max-w-sm px-6 py-3 rounded-xl text-xs",
    legend: "text-[11px] max-w-sm",
  },
  large: {
    input: "w-full max-w-md px-5 py-4 rounded-xl text-base",
    button: "w-full max-w-md px-8 py-4 rounded-full text-xs",
    legend: "text-xs max-w-md",
  },
};

export function SubscribeForm({ variant = "small", centered = false }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const s = sizes[variant];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }
    setError("");
    window.location.href = `${SUBSCRIBE_BASE}?email=${encodeURIComponent(value)}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`flex flex-col gap-2.5 ${centered ? "items-center" : ""}`}
    >
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError("");
        }}
        placeholder="tu@correo.com"
        aria-label="Tu correo electrónico"
        className={`${s.input} bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:border-[#4ECCA3] outline-none transition-colors`}
      />
      <button
        type="submit"
        className={`${s.button} bg-[#4ECCA3] text-[#050505] font-black uppercase tracking-widest hover:shadow-[0_0_25px_rgba(78,204,163,0.5)] transition-all`}
      >
        Suscribirme a la newsletter
      </button>
      <p className={`${s.legend} text-white/40 leading-snug ${centered ? "text-center" : ""}`}>
        {error ||
          "Al dar clic en suscribirte aún no quedas suscrito: te redirigiremos a otra web donde terminarás y verificarás tu suscripción."}
      </p>
    </form>
  );
}
