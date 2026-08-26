import christmasImg from "@/assets/christmas.jpg";
import eidImg from "@/assets/eid.jpg";
import fallImg from "@/assets/fall.jpg";
import birthdayImg from "@/assets/birthday.jpg";
import hostingImg from "@/assets/hosting.jpg";
import showerImg from "@/assets/shower.jpg";
import giftsImg from "@/assets/gifts.jpg";

export type EventStatus = "upcoming" | "active" | "past" | "disabled";

export type RecurringHolidayDefinition = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  categorySlug: string;
  heroImage: string;
  priority: number;
  // Fixed date (month 1-12, day 1-31) or floating type
  month: number;
  day?: number;
  floatingType?: "mothers-day" | "fathers-day" | "thanksgiving-us" | "easter" | "black-friday";
  relatedArticles?: string[];
};

export type SeasonalEvent = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  displayDate: string; // e.g. "December 25"
  targetDate: string; // ISO date format YYYY-MM-DD
  categorySlug: string;
  heroImage: string;
  priority: number;
  daysRemaining: number;
  isCurrentOrVeryClose: boolean;
  relatedArticles?: string[];
};

/**
 * Master catalog of recurring celebrations with automated evergreen yearly date calculation.
 */
export const holidayDefinitions: RecurringHolidayDefinition[] = [
  {
    slug: "christmas-gifts",
    name: "Christmas",
    tagline: "Find the Perfect Present Under the Tree",
    description:
      "Curated holiday shopping guides for partners, parents, kids, and hard-to-shop-for friends.",
    categorySlug: "christmas-gifts",
    heroImage: christmasImg,
    priority: 10,
    month: 12,
    day: 25,
    relatedArticles: [
      "25-thoughtful-christmas-gifts-for-dad",
      "23-unique-christmas-gifts-for-dad-practical",
      "20-christmas-gifts-for-dad-under-50",
      "18-useful-christmas-gifts-for-dad-who-doesnt-need-more-stuff",
      "17-practical-christmas-gifts-for-dad-who-has-everything",
      "20-christmas-gift-ideas-for-dad-useful-picks",
      "10-best-christmas-gifts-for-mom",
      "best-christmas-gifts-for-mom-2026",
      "12-christmas-gifts-for-mom-she-will-actually-love",
      "christmas-mantel-decorating-ideas",
    ],
  },
  {
    slug: "new-years-eve",
    name: "New Year's Eve",
    tagline: "Ring in the New Year with Style",
    description:
      "Sparkling dinner party ideas, cocktail tablescapes, and celebratory gifts for hosts.",
    categorySlug: "holidays",
    heroImage: hostingImg,
    priority: 8,
    month: 12,
    day: 31,
  },
  {
    slug: "valentines-day",
    name: "Valentine's Day",
    tagline: "Thoughtful Ways to Show You Care",
    description:
      "Romantic gift ideas, cozy date night plans, and meaningful keepsakes for partners.",
    categorySlug: "occasions",
    heroImage: giftsImg,
    priority: 9,
    month: 2,
    day: 14,
    relatedArticles: ["gift-ideas-for-people-who-want-nothing"],
  },
  {
    slug: "eid-al-fitr",
    name: "Eid & Ramadan",
    tagline: "Celebrate with Meaningful Gifts & Decor",
    description: "Thoughtful Eid gifts, date trays, lanterns, and family celebration ideas.",
    categorySlug: "eid-ramadan",
    heroImage: eidImg,
    priority: 8,
    month: 3,
    day: 20, // approximate recurring spring window
  },
  {
    slug: "mothers-day",
    name: "Mother's Day",
    tagline: "Celebrate Mom with Something Meaningful",
    description:
      "Personalized keepsakes, luxury comfort upgrades, and thoughtful ideas to make Mom feel seen.",
    categorySlug: "gifts-for-mom",
    heroImage: showerImg,
    priority: 10,
    month: 5,
    floatingType: "mothers-day",
    relatedArticles: [
      "10-best-christmas-gifts-for-mom",
      "best-christmas-gifts-for-mom-2026",
      "12-christmas-gifts-for-mom-she-will-actually-love",
    ],
  },
  {
    slug: "fathers-day",
    name: "Father's Day",
    tagline: "Celebrate Dad with Something He'll Actually Use",
    description:
      "Practical gadgets, rugged outdoor gear, and high-utility everyday items Dad will love.",
    categorySlug: "gifts-for-dad",
    heroImage: giftsImg,
    priority: 9,
    month: 6,
    floatingType: "fathers-day",
    relatedArticles: [
      "25-thoughtful-christmas-gifts-for-dad",
      "23-unique-christmas-gifts-for-dad-practical",
      "20-christmas-gifts-for-dad-under-50",
      "18-useful-christmas-gifts-for-dad-who-doesnt-need-more-stuff",
      "17-practical-christmas-gifts-for-dad-who-has-everything",
      "20-christmas-gift-ideas-for-dad-useful-picks",
      "gift-ideas-for-people-who-want-nothing",
    ],
  },
  {
    slug: "halloween",
    name: "Halloween",
    tagline: "Spooky Decor, Treat Displays & Fun Favors",
    description: "Charming porch decor, creative party themes, and delightful seasonal host gifts.",
    categorySlug: "holidays",
    heroImage: fallImg,
    priority: 9,
    month: 10,
    day: 31,
  },
  {
    slug: "thanksgiving",
    name: "Thanksgiving",
    tagline: "Warm Tablescapes & Host Appreciation",
    description:
      "Layered linen tables, low garlands, taper candles, and thank-you gifts for hosts.",
    categorySlug: "thanksgiving",
    heroImage: fallImg,
    priority: 9,
    month: 11,
    floatingType: "thanksgiving-us",
    relatedArticles: ["cozy-thanksgiving-tablescape-ideas"],
  },
  {
    slug: "black-friday",
    name: "Black Friday & Cyber Week",
    tagline: "Best Holiday Gift Deals & Steals",
    description: "Early bird shopping guides and vetted holiday discounts for every budget.",
    categorySlug: "gifts",
    heroImage: giftsImg,
    priority: 8,
    month: 11,
    floatingType: "black-friday",
  },
];

/**
 * Calculates next date for floating US holidays
 */
function getFloatingDate(year: number, type: string): Date {
  if (type === "mothers-day") {
    // 2nd Sunday in May
    const d = new Date(Date.UTC(year, 4, 1));
    const dayOfWeek = d.getUTCDay();
    const firstSunday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    return new Date(Date.UTC(year, 4, firstSunday + 7));
  }
  if (type === "fathers-day") {
    // 3rd Sunday in June
    const d = new Date(Date.UTC(year, 5, 1));
    const dayOfWeek = d.getUTCDay();
    const firstSunday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    return new Date(Date.UTC(year, 5, firstSunday + 14));
  }
  if (type === "thanksgiving-us") {
    // 4th Thursday in November
    const d = new Date(Date.UTC(year, 10, 1));
    const dayOfWeek = d.getUTCDay();
    const firstThursday = dayOfWeek <= 4 ? 1 + (4 - dayOfWeek) : 1 + (11 - dayOfWeek);
    return new Date(Date.UTC(year, 10, firstThursday + 21));
  }
  if (type === "black-friday") {
    // Day after Thanksgiving
    const thanksgiving = getFloatingDate(year, "thanksgiving-us");
    return new Date(Date.UTC(year, 10, thanksgiving.getUTCDate() + 1));
  }
  // Default to mid-month
  return new Date(Date.UTC(year, 4, 15));
}

/**
 * Calculates next upcoming date (current year or next year if past)
 */
export function calculateNextOccurrence(
  def: RecurringHolidayDefinition,
  referenceDate = new Date(),
): Date {
  const currentYear = referenceDate.getUTCFullYear();

  let candidateDate: Date;
  if (def.floatingType) {
    candidateDate = getFloatingDate(currentYear, def.floatingType);
  } else {
    candidateDate = new Date(Date.UTC(currentYear, def.month - 1, def.day || 15));
  }

  // If candidate date is more than 3 days in the past, roll over to next year
  const nowUtc = Date.UTC(
    referenceDate.getUTCFullYear(),
    referenceDate.getUTCMonth(),
    referenceDate.getUTCDate(),
  );
  const candidateUtc = candidateDate.getTime();

  if (candidateUtc < nowUtc - 3 * 24 * 60 * 60 * 1000) {
    if (def.floatingType) {
      candidateDate = getFloatingDate(currentYear + 1, def.floatingType);
    } else {
      candidateDate = new Date(Date.UTC(currentYear + 1, def.month - 1, def.day || 15));
    }
  }

  return candidateDate;
}

/**
 * Calculates days remaining until target date
 */
export function getDaysRemaining(targetDateIso: string): number {
  const target = new Date(`${targetDateIso}T00:00:00Z`).getTime();
  const now = new Date();
  const nowUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const diffTime = target - nowUtc;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Resolves all upcoming seasonal events sorted chronologically
 */
export function getUpcomingEvents(limit = 6, referenceDate = new Date()): SeasonalEvent[] {
  const events = holidayDefinitions.map((def) => {
    const nextDate = calculateNextOccurrence(def, referenceDate);
    const year = nextDate.getUTCFullYear();
    const month = String(nextDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(nextDate.getUTCDate()).padStart(2, "0");
    const targetDate = `${year}-${month}-${day}`;

    const daysRemaining = getDaysRemaining(targetDate);
    const displayDate = `${MONTH_NAMES[nextDate.getUTCMonth()]} ${nextDate.getUTCDate()}`;

    return {
      slug: def.slug,
      name: def.name,
      tagline: def.tagline,
      description: def.description,
      displayDate,
      targetDate,
      categorySlug: def.categorySlug,
      heroImage: def.heroImage,
      priority: def.priority,
      daysRemaining,
      isCurrentOrVeryClose: daysRemaining >= -2 && daysRemaining <= 14,
      relatedArticles: def.relatedArticles,
    };
  });

  return events
    .sort((a, b) => a.daysRemaining - b.daysRemaining || b.priority - a.priority)
    .slice(0, limit);
}

/**
 * Resolves the currently active or nearest major event for the seasonal feature section
 */
export function getCurrentOrNextMajorEvent(referenceDate = new Date()): SeasonalEvent {
  const upcoming = getUpcomingEvents(6, referenceDate);
  return (
    upcoming[0] || {
      slug: "christmas-gifts",
      name: "Christmas",
      tagline: "Find the Perfect Present Under the Tree",
      description:
        "Curated holiday shopping guides for partners, parents, kids, and hard-to-shop-for friends.",
      displayDate: "December 25",
      targetDate: "2026-12-25",
      categorySlug: "christmas-gifts",
      heroImage: christmasImg,
      priority: 10,
      daysRemaining: 122,
      isCurrentOrVeryClose: false,
    }
  );
}

/**
 * Resolves the next featured event for banner / arrival experience
 */
export function getNextUpcomingEvent(
  referenceDate = new Date(),
): { event: SeasonalEvent; daysLeft: number } | null {
  const upcoming = getUpcomingEvents(1, referenceDate);
  const nextEvent = upcoming[0];
  if (!nextEvent) return null;
  return {
    event: nextEvent,
    daysLeft: nextEvent.daysRemaining,
  };
}
