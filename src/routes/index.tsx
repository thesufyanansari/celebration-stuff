import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Gift, Heart, Calendar, Flame } from "lucide-react";
import { articles } from "@/data/articles";
import { ArticleCard, BlogGrid } from "@/components/site/ArticleCard";
import { Newsletter } from "@/components/site/Newsletter";
import { PinterestCta } from "@/components/site/PinterestCta";
import { UpcomingEventSpotlight } from "@/components/site/UpcomingEventSpotlight";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Celebration Stuff — Thoughtful Gift Ideas & Curated Guides" },
      {
        name: "description",
        content:
          "Curated gift guides and inspiration for holidays, birthdays, anniversaries, moms, dads, partners and hard-to-shop-for people.",
      },
      { property: "og:title", content: "Celebration Stuff — Thoughtful Gift Ideas" },
      {
        property: "og:description",
        content: "Curated gift guides for holidays, occasions, partners and family.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = articles.find((a) => a.featured) ?? articles[0]!;
  const popularArticles = [...articles].sort((a, b) => b.views - a.views);

  const recipientCategories = [
    { name: "Gifts for Women", slug: "gifts-for-women", count: "180+ Guides" },
    { name: "Gifts for Men", slug: "gifts-for-men", count: "140+ Guides" },
    { name: "Gifts for Mom", slug: "gifts-for-mom", count: "95+ Guides" },
    { name: "Gifts for Dad", slug: "gifts-for-dad", count: "80+ Guides" },
    { name: "Gifts for Girlfriend", slug: "gifts-for-girlfriend", count: "65+ Guides" },
    { name: "Gifts for Boyfriend", slug: "gifts-for-boyfriend", count: "55+ Guides" },
  ];

  const occasionCategories = [
    { name: "Birthday Gifts", slug: "birthday-gifts" },
    { name: "Wedding Gifts", slug: "wedding-gifts" },
    { name: "Anniversary Gifts", slug: "anniversary-gifts" },
    { name: "Housewarming Gifts", slug: "housewarming-gifts" },
    { name: "Christmas Gifts", slug: "christmas-gifts" },
    { name: "Eid & Ramadan", slug: "eid-ramadan" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Curated Gift Inspiration</span>
          </div>
          <h1 className="mt-4 text-display">Find a Gift They'll Actually Love</h1>
          <p className="mt-4 text-lg text-foreground-muted leading-relaxed">
            Discover thoughtful gift guides, unique recommendations and curated lists for every person, occasion, and special holiday.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/explore"
              className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Explore Gift Ideas
            </Link>
            <Link
              to="/category/$slug"
              params={{ slug: "birthday-gifts" }}
              className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-semibold transition-colors hover:bg-surface-hover"
            >
              Browse by Occasion
            </Link>
          </div>
        </div>
        <img
          src={featured.image}
          alt={featured.title}
          width={featured.imageWidth}
          height={featured.imageHeight}
          className="aspect-16/9 w-full rounded-2xl object-cover shadow-card"
        />
      </section>

      {/* Shop by Recipient / People */}
      <section className="mt-16">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          <h2 className="text-h2">Shop Gift Ideas by Person</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipientCategories.map((r) => (
            <Link
              key={r.slug}
              to="/category/$slug"
              params={{ slug: r.slug }}
              className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div>
                <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {r.name}
                </h3>
                <span className="mt-1 block text-xs text-foreground-muted">{r.count}</span>
              </div>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-background-subtle text-xs font-semibold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Event Spotlight */}
      <section className="mt-16">
        <UpcomingEventSpotlight />
      </section>

      {/* Shop by Occasion & Holidays */}
      <section className="mt-16">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-h2">Shop by Occasion & Holiday</h2>
        </div>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {occasionCategories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Gift Guides */}
      <section className="mt-16">
        <div className="flex items-center gap-2 mb-6">
          <Flame className="h-5 w-5 text-amber-500" />
          <h2 className="text-h2">Trending Gift Guides</h2>
        </div>
        <BlogGrid articles={popularArticles.slice(0, 3)} columns={3} />
      </section>

      {/* Editor's Top Pick Highlight */}
      <section className="mt-16 rounded-3xl border border-border bg-surface p-8 shadow-card">
        <div className="max-w-2xl">
          <span className="text-overline text-primary">Editor's Highlight</span>
          <h2 className="mt-2 text-h2 font-display">{featured.title}</h2>
          <p className="mt-3 text-sm text-foreground-muted leading-relaxed">{featured.excerpt}</p>
          <div className="mt-6">
            <Link
              to="/article/$slug"
              params={{ slug: featured.slug }}
              className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Read Full Gift Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Gift Guides */}
      <section className="mt-16">
        <h2 className="text-h2 mb-6">Latest Gift Guides</h2>
        <BlogGrid articles={articles} />
      </section>

      {/* Pinterest CTA */}
      <section className="mt-16">
        <PinterestCta />
      </section>

      {/* Newsletter Section */}
      <section className="mt-16">
        <Newsletter />
      </section>
    </div>
  );
}

