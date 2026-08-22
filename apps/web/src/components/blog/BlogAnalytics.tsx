"use client";

import { useEffect, useRef } from "react";
import {
  trackPageView,
  trackScrollDepth,
  trackShareClick,
} from "@/lib/analytics/supabaseAnalytics";

interface BlogAnalyticsProps {
  contentId: string;
}

export function BlogAnalytics({ contentId }: BlogAnalyticsProps) {
  const hasTrackedView = useRef(false);
  const maxScroll = useRef(0);

  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    trackPageView(contentId);
  }, [contentId]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll.current) {
        maxScroll.current = scrollPercent;
        if ([25, 50, 75, 90, 100].includes(scrollPercent)) {
          trackScrollDepth(contentId, scrollPercent);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [contentId]);

  return null;
}

interface ShareButtonProps {
  contentId: string;
  platform: string;
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ShareButton({
  contentId,
  platform,
  href,
  children,
  className,
}: ShareButtonProps) {
  const handleClick = () => {
    trackShareClick(contentId, platform);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
