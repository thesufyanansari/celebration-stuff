import { createFileRoute } from "@tanstack/react-router";
import { getLatestArticles } from "@/data/articles";
import { Newsletter } from "@/components/site/Newsletter";
import { PinterestCta } from "@/components/site/PinterestCta";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  HomeHero,
  UpcomingEventsSection,
  GiftIdeasByPerson,
  FreshlyPublished,
  CurrentSeasonFeature,
  HomePopularArticles,
  ExploreByOccasion,
  ExploreByHoliday,
  TrendingEditorsPicks,
} from "@/components/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Celebration Stuff — Thoughtful Gift Ideas, Holiday Guides & Celebration Inspiration",
      },
      {
        name: "description",
        content:
          "Curated gift guides and inspiration for holidays, birthdays, anniversaries, moms, dads, partners and hard-to-shop-for people.",
      },
      { property: "og:title", content: "Celebration Stuff — Thoughtful Gift Ideas & Guides" },
      {
        property: "og:description",
        content: "Curated gift guides and holiday inspiration for every celebration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  // Dynamically resolve latest published articles
  const latestArticles = getLatestArticles(12);
  const featured = latestArticles.find((a) => a.featured) ?? latestArticles[0]!;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 1. HERO / FEATURED ARTICLE */}
      <HomeHero featuredArticle={featured} />

      {/* Top Homepage Leaderboard Ad */}
      <AdSlot type="top" className="my-10" />

      {/* 2. UPCOMING EVENTS & CELEBRATIONS (Immediately after hero) */}
      <UpcomingEventsSection />

      {/* 3. SHOP GIFT IDEAS BY PERSON */}
      <GiftIdeasByPerson />

      {/* In-Feed Mid Ad */}
      <AdSlot type="mid-article" className="my-10" />

      {/* 4. FRESHLY PUBLISHED & LATEST IDEAS (Chronological feed) */}
      <FreshlyPublished limit={6} />

      {/* 5. CURRENT SEASON / ACTIVE HOLIDAY SPOTLIGHT */}
      <CurrentSeasonFeature />

      {/* Between Sections Ad */}
      <AdSlot type="between-products" className="my-10" />

      {/* 6. MOST POPULAR GIFT GUIDES */}
      <HomePopularArticles limit={6} />

      {/* 7. EXPLORE BY OCCASION */}
      <ExploreByOccasion />

      {/* 8. EXPLORE BY HOLIDAY */}
      <ExploreByHoliday />

      {/* 9. TRENDING & EDITORIAL PICKS */}
      <TrendingEditorsPicks />

      {/* 10. PINTEREST CTA & NEWSLETTER */}
      <div className="my-16 space-y-12">
        <PinterestCta />
        <Newsletter />
      </div>
    </div>
  );
}
