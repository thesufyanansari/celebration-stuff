import registryArticles from "@/articles";

export type Product = {
  id?: string;
  name: string;
  price: string;
  why: string;
  amazonUrl?: string | null;
  url?: string | null;
  rating?: number;
  badge?: string;
  bestFor?: string;
  whyWeLoveIt?: string;
  keyFeatures?: string[];
  keyDetails?: string[];
  considerations?: string;
  consider?: string;
  verdict?: string;
  image?: string;
  imageAlt?: string;
  galleryImages?: string[];
};

export type Section = {
  id?: string;
  heading: string;
  body?: string[];
  content?: string;
  productId?: string;
  product?: Product;
};

export type Faq = { q: string; a: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  answer: string;
  category: string;
  event: string;
  season: "Spring" | "Summer" | "Fall" | "Winter" | "Year-round";
  tags: string[];
  author: string;
  published: string;
  updated: string;
  views: number;
  readingMinutes: number;
  image: string;
  imageWidth: number;
  imageHeight: number;
  featured?: boolean;
  sections: Section[];
  products?: Product[];
  items?: Product[];
  faqs: Faq[];
  // Extended SEO & Content Metadata
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  featuredImageAlt?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  focusTopic?: string;
  // Multi-dimensional gift taxonomy classification
  recipient?: string[];
  occasion?: string[];
  holiday?: string[];
  lifeEvent?: string[];
  giftStyle?: string[];
};

export const articles: Article[] = [...registryArticles];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

/**
 * Strict Centralized Taxonomy Matching Function
 *
 * An article may appear in a category ONLY if it has an explicit, legitimate
 * taxonomy relationship to that category.
 *
 * Rules:
 * 1. Holiday categories (thanksgiving, halloween, christmas-gifts, eid-ramadan)
 *    require explicit holiday membership and strictly forbid cross-holiday contamination.
 * 2. Recipient categories (gifts-for-mom, gifts-for-dad, etc.) require explicit
 *    recipient taxonomy or primary category match.
 * 3. Occasion & style categories require matching occasion, style, or tag taxonomy.
 */
export function isArticleRelevantToCategory(article: Article, categorySlug: string): boolean {
  if (!article || !categorySlug) return false;

  // 1. Specific Holiday Category Rules
  const HOLIDAY_MAP: Record<string, string[]> = {
    thanksgiving: ["thanksgiving", "thanksgiving-gifts", "thanksgiving-ideas"],
    halloween: ["halloween", "halloween-ideas", "halloween-decor"],
    "christmas-gifts": ["christmas", "christmas-gifts", "holiday-gifts"],
    christmas: ["christmas", "christmas-gifts", "holiday-gifts"],
    "eid-ramadan": ["eid-ramadan", "eid", "ramadan"],
  };

  if (categorySlug in HOLIDAY_MAP) {
    const validHolidayIdentifiers = HOLIDAY_MAP[categorySlug];

    // Check if the article legitimately belongs to this specific holiday
    const matchesHoliday =
      article.category === categorySlug ||
      (article.event && validHolidayIdentifiers.includes(article.event.toLowerCase())) ||
      article.holiday?.some((h) => validHolidayIdentifiers.includes(h.toLowerCase()));

    if (!matchesHoliday) return false;

    // Strict Cross-Holiday Mutual Exclusion:
    if (categorySlug === "thanksgiving") {
      // Thanksgiving must NEVER display Halloween or Christmas articles
      const isHalloween =
        article.category === "halloween" ||
        article.holiday?.some((h) => h.includes("halloween")) ||
        article.event?.toLowerCase() === "halloween";
      const isChristmas =
        article.category === "christmas" ||
        article.category === "christmas-gifts" ||
        article.holiday?.some((h) => h.includes("christmas")) ||
        article.event?.toLowerCase() === "christmas";

      if (isHalloween || isChristmas) return false;
    } else if (categorySlug === "halloween") {
      // Halloween must NEVER display Thanksgiving or Christmas articles
      const isThanksgiving =
        article.category === "thanksgiving" ||
        article.holiday?.some((h) => h.includes("thanksgiving")) ||
        article.event?.toLowerCase() === "thanksgiving";
      const isChristmas =
        article.category === "christmas" ||
        article.category === "christmas-gifts" ||
        article.holiday?.some((h) => h.includes("christmas")) ||
        article.event?.toLowerCase() === "christmas";

      if (isThanksgiving || isChristmas) return false;
    } else if (categorySlug === "christmas-gifts" || categorySlug === "christmas") {
      // Christmas must NEVER display Halloween or Thanksgiving articles
      const isHalloween =
        article.category === "halloween" ||
        article.holiday?.some((h) => h.includes("halloween")) ||
        article.event?.toLowerCase() === "halloween";
      const isThanksgiving =
        article.category === "thanksgiving" ||
        article.holiday?.some((h) => h.includes("thanksgiving")) ||
        article.event?.toLowerCase() === "thanksgiving";

      if (isHalloween || isThanksgiving) return false;
    }

    return true;
  }

  // 2. People / Recipient Categories
  if (categorySlug.startsWith("gifts-for-")) {
    const recipientKey = categorySlug.replace("gifts-for-", "");
    return (
      article.category === categorySlug ||
      article.recipient?.includes(categorySlug) ||
      article.recipient?.includes(recipientKey) ||
      article.recipient?.includes(`gifts-for-${recipientKey}`) ||
      (recipientKey === "women" &&
        (article.recipient?.includes("mom") ||
          article.recipient?.includes("women") ||
          article.recipient?.includes("her"))) ||
      (recipientKey === "men" &&
        (article.recipient?.includes("dad") ||
          article.recipient?.includes("men") ||
          article.recipient?.includes("him")))
    );
  }

  // 3. General & Occasion Categories
  return (
    article.category === categorySlug ||
    article.occasion?.includes(categorySlug) ||
    article.recipient?.includes(categorySlug) ||
    article.lifeEvent?.includes(categorySlug) ||
    article.giftStyle?.includes(categorySlug) ||
    article.holiday?.includes(categorySlug) ||
    article.tags?.includes(categorySlug)
  );
}

export const byCategory = (slug: string): Article[] =>
  articles.filter((a) => isArticleRelevantToCategory(a, slug));

/**
 * Returns latest published articles sorted chronologically (newest first).
 */
export const getLatestArticles = (limit = 12): Article[] =>
  [...articles]
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, limit);

/**
 * Returns top popular articles ranked by views (excluding a specific article).
 */
export const getPopularArticles = (excludeSlug?: string, limit = 10): Article[] =>
  [...articles]
    .filter((a) => a.slug !== excludeSlug)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);

/**
 * Context-aware topic relationship engine:
 * Priority 1: Exact topic / holiday / recipient match
 * Priority 2: Same holiday / event (e.g. Christmas)
 * Priority 3: Same category (e.g. Gift Guides)
 * Priority 4: Same recipient (e.g. Dad / Mom / Men)
 * Priority 5: Shared tags
 */
export const getTopicArticles = (article: Article, limit = 10): Article[] => {
  return [...articles]
    .filter((a) => a.slug !== article.slug)
    .map((candidate) => {
      let score = 0;

      // Same holiday / event (e.g. Christmas)
      if (
        article.event &&
        candidate.event &&
        article.event.toLowerCase() === candidate.event.toLowerCase()
      ) {
        score += 50;
      }
      if (
        article.holiday &&
        candidate.holiday &&
        article.holiday.some((h) => candidate.holiday?.includes(h))
      ) {
        score += 40;
      }

      // Same recipient (e.g. Dad / Mom)
      if (
        article.recipient &&
        candidate.recipient &&
        article.recipient.some((r) => candidate.recipient?.includes(r))
      ) {
        score += 30;
      }

      // Same category
      if (article.category === candidate.category) {
        score += 20;
      }

      // Shared tags
      const sharedTags = candidate.tags.filter((t) => article.tags.includes(t)).length;
      score += sharedTags * 5;

      // Same season
      if (article.season && candidate.season === article.season) {
        score += 5;
      }

      return { article: candidate, score };
    })
    .sort((a, b) => b.score - a.score || (b.article.views || 0) - (a.article.views || 0))
    .map((item) => item.article)
    .slice(0, limit);
};

/**
 * Related articles recommendation engine (surfaces best match for bottom grid).
 */
export const getRelatedArticles = (article: Article, count = 6): Article[] =>
  getTopicArticles(article, count);

export const related = (article: Article, count = 6) => getRelatedArticles(article, count);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export const formatViews = (views: number) =>
  views >= 1000 ? `${(views / 1000).toFixed(views >= 10000 ? 0 : 1)}k` : `${views}`;
