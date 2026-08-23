import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { articles } from "@/data/articles";
import { categories } from "@/data/site";
import { MasonryGrid } from "@/components/site/ArticleCard";
import { Newsletter } from "@/components/site/Newsletter";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Celebration Ideas — Celebration Stuff" },
      {
        name: "description",
        content:
          "Search every Celebration Stuff guide: holidays, gifts, parties, seasonal decor and hosting ideas.",
      },
      { property: "og:title", content: "Explore Celebration Ideas" },
      {
        property: "og:description",
        content: "Search holidays, gifts, parties, seasonal decor and hosting guides.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return articles.filter((a) => {
      const inCat =
        cat === "all" ||
        a.category === cat ||
        a.recipient?.includes(cat) ||
        a.occasion?.includes(cat) ||
        a.holiday?.includes(cat) ||
        a.lifeEvent?.includes(cat) ||
        a.giftStyle?.includes(cat);
      const inTerm =
        !term ||
        a.title.toLowerCase().includes(term) ||
        a.excerpt.toLowerCase().includes(term) ||
        a.tags.some((t) => t.includes(term));
      return inCat && inTerm;
    });
  }, [q, cat]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-overline">Explore</p>
        <h1 className="mt-2 text-h1">Every celebration idea in one place</h1>
        <p className="mt-3 text-foreground-muted">
          Search {articles.length} guides across holidays, gifts, parties and seasonal decorating.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-4">
        <label htmlFor="explore-search" className="sr-only">
          Search articles
        </label>
        <input
          id="explore-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tablescapes, gifts, birthdays…"
          className="h-12 w-full rounded-full border border-border bg-background px-5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
        />
        <div className="flex flex-wrap gap-2">
          <FilterChip active={cat === "all"} onClick={() => setCat("all")} label="All" />
          {categories.map((c) => (
            <FilterChip
              key={c.slug}
              active={cat === c.slug}
              onClick={() => setCat(c.slug)}
              label={c.name}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        {results.length ? (
          <MasonryGrid articles={results} />
        ) : (
          <p className="text-foreground-muted">No ideas match that search yet.</p>
        )}
      </div>

      <div className="mt-14">
        <Newsletter compact />
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-foreground-muted hover:bg-surface-hover hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
