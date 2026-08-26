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
  body: string[];
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
  products: Product[];
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

export const byCategory = (slug: string) =>
  articles.filter(
    (a) =>
      a.category === slug ||
      a.recipient?.includes(slug) ||
      a.occasion?.includes(slug) ||
      a.holiday?.includes(slug) ||
      a.lifeEvent?.includes(slug) ||
      a.giftStyle?.includes(slug) ||
      a.tags.includes(slug),
  );

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
