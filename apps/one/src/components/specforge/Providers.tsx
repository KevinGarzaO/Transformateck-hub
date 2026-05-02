"use client";

import { BacklogProvider } from "@/context/specforge/BacklogContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <BacklogProvider>{children}</BacklogProvider>;
}
