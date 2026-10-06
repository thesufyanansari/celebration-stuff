import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { articles as allArticles } from "@/data/articles";
import { getAuthor, site, SITE_URL } from "@/data/site";
import { BlogGrid } from "@/components/site/ArticleCard";

export const Route = createFileRoute("/author/$slug")({
  loader: ({ params }) => {
    const author = getAuthor(params.slug);
    if (!author) throw notFound();
    return { author, articles: allArticles.filter((a) => a.author === params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Author unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { author } = loaderData;
    const canonicalUrl = `${SITE_URL}/author/${author.slug}`;

    const jsonLdBreadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: author.name, item: canonicalUrl },
      ],
    };

    return {
      meta: [
        { title: `${author.name} — ${site.name}` },
        { name: "description", content: author.bio.slice(0, 155) },
        { property: "og:title", content: `${author.name}, ${author.role}` },
        { property: "og:description", content: author.bio.slice(0, 155) },
        { property: "og:url", content: canonicalUrl },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLdBreadcrumb) }],
    };
  },
  component: AuthorPage,
});

function AuthorPage() {
  const { author, articles } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-caption mb-4 flex items-center text-xs text-foreground-muted">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="text-border mx-2">/</span>
        <span className="text-foreground font-medium">{author.name}</span>
      </nav>

      <header className="flex max-w-2xl items-start gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent-soft font-semibold text-accent">
          {author.initials}
        </span>
        <div>
          <h1 className="text-h1">{author.name}</h1>
          <p className="text-overline mt-1">{author.role}</p>
          <p className="mt-3 text-foreground-muted">{author.bio}</p>
        </div>
      </header>

      <div className="mt-10">
        <BlogGrid articles={articles} />
      </div>
    </div>
  );
}
