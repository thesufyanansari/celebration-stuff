import { createFileRoute, Link } from "@tanstack/react-router";
import { authors, site } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About ${site.name} — Our Editorial Team` },
      {
        name: "description",
        content:
          "Meet the editors behind Celebration Stuff and how we research holiday, gift, party and decorating ideas.",
      },
      { property: "og:title", content: `About ${site.name}` },
      {
        property: "og:description",
        content: "Meet the editors behind our holiday, gift and party guides.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-h1">About {site.name}</h1>
      <p className="mt-4 text-lg text-foreground-muted">{site.description}</p>
      <p className="mt-4 text-foreground-muted">
        We publish celebration ideas that a real person can pull off in a real week — tested
        tablescapes, honest gift picks and party plans with timelines attached. Every guide is
        written by an editor with hands-on experience, then reviewed before it goes live.
      </p>

      <h2 className="mt-12 text-h2">Our editors</h2>
      <div className="mt-6 grid gap-6">
        {authors.map((a) => (
          <div key={a.slug} className="surface-card p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                {a.initials}
              </span>
              <div>
                <Link
                  to="/author/$slug"
                  params={{ slug: a.slug }}
                  className="font-display font-semibold hover:text-primary"
                >
                  {a.name}
                </Link>
                <p className="text-caption">{a.role}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-foreground-muted">{a.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
