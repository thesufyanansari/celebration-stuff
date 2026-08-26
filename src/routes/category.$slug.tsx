import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { byCategory } from "@/data/articles";
import { categories, getCategory, site } from "@/data/site";
import { BlogGrid } from "@/components/site/ArticleCard";
import { Newsletter } from "@/components/site/Newsletter";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    const childCategories = categories.filter((c) => c.parentSlug === category.slug);
    return { category, articles: byCategory(params.slug), childCategories };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    const canonicalUrl = `https://celebrationstuff.com/category/${category.slug}`;

    const jsonLdBreadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://celebrationstuff.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Categories",
          item: "https://celebrationstuff.com/explore",
        },
        { "@type": "ListItem", position: 3, name: category.name, item: canonicalUrl },
      ],
    };

    return {
      meta: [
        { title: `${category.name} Gift Ideas & Curated Guides | ${site.name}` },
        { name: "description", content: category.description },
        { property: "og:title", content: `${category.name} Gift Ideas | ${site.name}` },
        { property: "og:description", content: category.description },
        { property: "og:url", content: canonicalUrl },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLdBreadcrumb) }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category, articles, childCategories } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-caption mb-4">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span className="px-2">/</span>
        <span>Categories</span>
        <span className="px-2">/</span>
        <span className="text-foreground font-medium">{category.name}</span>
      </nav>

      <header className="max-w-2xl">
        <p className="text-overline">Gift Category</p>
        <h1 className="mt-2 text-h1">{category.name}</h1>
        <p className="mt-3 text-foreground-muted">{category.description}</p>
      </header>

      {childCategories.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {childCategories.map((child) => (
            <Link
              key={child.slug}
              to="/category/$slug"
              params={{ slug: child.slug }}
              className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10">
        {articles.length ? (
          <BlogGrid articles={articles} />
        ) : (
          <p className="text-foreground-muted">New guides for this category are coming soon.</p>
        )}
      </div>

      <div className="mt-14">
        <Newsletter compact />
      </div>
    </div>
  );
}
