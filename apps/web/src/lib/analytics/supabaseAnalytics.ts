import { supabase } from "../supabase";

type SupabaseEventType =
  | "page_view"
  | "scroll_depth"
  | "share_click"
  | "cta_click"
  | "subscribe_submit"
  | "reading_time";

interface TrackEventOptions {
  contentId?: string;
  eventType: SupabaseEventType;
  metadata?: Record<string, any>;
  pageUrl?: string;
}

function getVisitorId(): string {
  if (typeof window === "undefined") return "server";
  const stored = localStorage.getItem("tck_visitor_id");
  if (stored) return stored;
  const id = crypto.randomUUID();
  localStorage.setItem("tck_visitor_id", id);
  return id;
}

export async function trackEvent({
  contentId,
  eventType,
  metadata = {},
  pageUrl,
}: TrackEventOptions) {
  try {
    const visitorId = getVisitorId();
    const url = pageUrl || (typeof window !== "undefined" ? window.location.href : "");

    const { error } = await supabase.from("post_events").insert({
      content_id: contentId || null,
      event_type: eventType,
      visitor_id: visitorId,
      metadata,
      page_url: url,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    });

    if (error) {
      console.error("Analytics error:", error.message);
    }
  } catch (err) {
    console.error("Analytics error:", err);
  }
}

export function trackPageView(contentId: string) {
  trackEvent({ contentId, eventType: "page_view" });
}

export function trackShareClick(contentId: string, platform: string) {
  trackEvent({
    contentId,
    eventType: "share_click",
    metadata: { platform },
  });
}

export function trackCtaClick(contentId: string, ctaName: string) {
  trackEvent({
    contentId,
    eventType: "cta_click",
    metadata: { cta_name: ctaName },
  });
}

export function trackScrollDepth(contentId: string, depth: number) {
  trackEvent({
    contentId,
    eventType: "scroll_depth",
    metadata: { depth_percent: depth },
  });
}

export function trackSubscribeSubmit(contentId: string) {
  trackEvent({ contentId, eventType: "subscribe_submit" });
}

export async function getPostAnalytics(contentId: string) {
  const { data, error } = await supabase
    .from("post_events")
    .select("*")
    .eq("content_id", contentId)
    .order("recorded_at", { ascending: false });

  if (error) {
    console.error("Error fetching analytics:", error.message);
    return [];
  }
  return data || [];
}

export async function getPostViewCount(contentId: string) {
  const { count, error } = await supabase
    .from("post_events")
    .select("*", { count: "exact", head: true })
    .eq("content_id", contentId)
    .eq("event_type", "page_view");

  if (error) {
    console.error("Error counting views:", error.message);
    return 0;
  }
  return count || 0;
}

export async function getPostUniqueVisitors(contentId: string) {
  const { data, error } = await supabase
    .from("post_events")
    .select("visitor_id")
    .eq("content_id", contentId)
    .eq("event_type", "page_view");

  if (error || !data) return 0;
  return new Set(data.map((r) => r.visitor_id)).size;
}

export async function getPopularPosts(limit = 10) {
  const { data, error } = await supabase
    .from("post_events")
    .select("content_id, event_type")
    .eq("event_type", "page_view")
    .not("content_id", "is", null);

  if (error || !data) return [];

  const counts: Record<string, number> = {};
  data.forEach((row) => {
    counts[row.content_id] = (counts[row.content_id] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([contentId, views]) => ({ contentId, views }));
}
