import { createFileRoute, notFound } from "@tanstack/react-router";
import { articles as allArticles } from "@/data/articles";
import { getAuthor, site } from "@/data/site";
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
    return {
      meta: [
        { title: `${author.name} — ${site.name}` },
        { name: "description", content: author.bio.slice(0, 155) },
        { property: "og:title", content: `${author.name}, ${author.role}` },
        { property: "og:description", content: author.bio.slice(0, 155) },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AuthorPage,
});

function AuthorPage() {
  const { author, articles } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
