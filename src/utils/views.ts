import { useState, useEffect } from "react";

const STORAGE_PREFIX = "cs_views_";
const SESSION_PREFIX = "cs_visited_";

/**
 * Get current persistent views for an article (baseline views + real user visits stored in localStorage)
 */
export function getArticleViews(slug: string, initialViews: number): number {
  if (typeof window === "undefined") return initialViews;
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + slug);
    if (!stored) return initialViews;
    const parsed = parseInt(stored, 10);
    return isNaN(parsed) || parsed < initialViews ? initialViews : parsed;
  } catch {
    return initialViews;
  }
}

/**
 * Increment view count for a real user visit and persist to localStorage
 */
export function incrementArticleViews(slug: string, initialViews: number): number {
  if (typeof window === "undefined") return initialViews;
  try {
    const current = getArticleViews(slug, initialViews);
    const sessionKey = SESSION_PREFIX + slug;

    const alreadyCountedInSession = sessionStorage.getItem(sessionKey);
    let nextViews = current;

    if (!alreadyCountedInSession) {
      nextViews = current + 1;
      localStorage.setItem(STORAGE_PREFIX + slug, nextViews.toString());
      sessionStorage.setItem(sessionKey, "1");
    }

    return nextViews;
  } catch {
    return initialViews;
  }
}

/**
 * React Hook for dynamic real-time article view counter that continues incrementing on real views
 */
export function useArticleViews(slug: string, initialViews: number): number {
  const [views, setViews] = useState<number>(() => getArticleViews(slug, initialViews));

  useEffect(() => {
    const updated = incrementArticleViews(slug, initialViews);
    setViews(updated);
  }, [slug, initialViews]);

  return views;
}
