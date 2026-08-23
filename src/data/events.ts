export type EventStatus = "upcoming" | "active" | "past" | "disabled";

export type SeasonalEvent = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  displayDate: string; // e.g. "June 21, 2026"
  targetDate: string; // ISO date format YYYY-MM-DD
  endDate?: string;
  categorySlug: string;
  heroImage?: string;
  priority: number; // Higher number = higher priority
  enabled: boolean;
  relatedArticles?: string[]; // Slugs of related articles
};

export const seasonalEvents: SeasonalEvent[] = [
  {
    slug: "fathers-day",
    name: "Father's Day",
    tagline: "Celebrate Dad with Something He'll Keep",
    description: "Discover practical, thoughtful, and unique gift ideas for Dad, grandfathers, and father figures.",
    displayDate: "June 21",
    targetDate: "2026-06-21",
    categorySlug: "gifts-for-dad",
    priority: 9,
    enabled: true,
    relatedArticles: ["gift-ideas-for-people-who-want-nothing"],
  },
  {
    slug: "eid-al-fitr",
    name: "Eid al-Fitr",
    tagline: "Celebrate Eid with Meaningful Gifts",
    description: "Thoughtful Eid gifts, home accents, and celebration ideas for family and loved ones.",
    displayDate: "March 20",
    targetDate: "2026-03-20",
    categorySlug: "eid-ramadan",
    priority: 8,
    enabled: true,
    relatedArticles: ["eid-al-fitr-home-decor-ideas"],
  },
  {
    slug: "thanksgiving",
    name: "Thanksgiving",
    tagline: "Warm Hosting & Gratitude Gifts",
    description: "Inspirational Thanksgiving host gifts, tablescape accents, and seasonal appreciation ideas.",
    displayDate: "November 26",
    targetDate: "2026-11-26",
    categorySlug: "thanksgiving",
    priority: 7,
    enabled: true,
    relatedArticles: ["cozy-thanksgiving-tablescape-ideas"],
  },
  {
    slug: "christmas-gifts",
    name: "Christmas",
    tagline: "Find the Perfect Present Under the Tree",
    description: "Curated holiday shopping guides for partners, parents, kids, and hard-to-shop-for friends.",
    displayDate: "December 25",
    targetDate: "2026-12-25",
    categorySlug: "christmas-gifts",
    priority: 10,
    enabled: true,
    relatedArticles: ["christmas-mantel-decorating-ideas", "gift-ideas-for-people-who-want-nothing"],
  },
];

/**
 * Calculates days remaining until target date
 */
export function getDaysRemaining(targetDateIso: string): number {
  const target = new Date(`${targetDateIso}T00:00:00Z`).getTime();
  const now = new Date().getTime();
  const diffTime = target - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Resolves the next featured event based on date and priority
 */
export function getNextUpcomingEvent(): { event: SeasonalEvent; daysLeft: number } | null {
  const now = new Date();

  const activeOrUpcoming = seasonalEvents
    .filter((e) => e.enabled)
    .map((e) => {
      const days = getDaysRemaining(e.targetDate);
      return { event: e, daysLeft: days };
    })
    .filter((item) => item.daysLeft >= -1) // Keep events happening today or in future
    .sort((a, b) => {
      // Sort by closest date first, then priority
      if (Math.abs(a.daysLeft) !== Math.abs(b.daysLeft)) {
        return a.daysLeft - b.daysLeft;
      }
      return b.event.priority - a.event.priority;
    });

  return activeOrUpcoming[0] || null;
}
