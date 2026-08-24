import { Link } from "@tanstack/react-router";
import { Heart, ArrowRight, User } from "lucide-react";

export type RecipientCard = {
  name: string;
  slug: string;
  description: string;
  tagline: string;
  badge?: string;
};

export const recipientsList: RecipientCard[] = [
  {
    name: "Gifts for Dad",
    slug: "gifts-for-dad",
    description: "Practical gadgets, rugged outdoor gear, and everyday upgrades he'll actually use.",
    tagline: "High-utility finds",
    badge: "Trending",
  },
  {
    name: "Gifts for Mom",
    slug: "gifts-for-mom",
    description: "Personalized keepsakes, cozy luxury blankets, and self-care essentials to make her feel seen.",
    tagline: "Thoughtful & cozy",
    badge: "Most Popular",
  },
  {
    name: "Gifts for Men",
    slug: "gifts-for-men",
    description: "Curated EDC tools, barware, stylish accessories, and smart tech gadgets.",
    tagline: "Cool & practical",
  },
  {
    name: "Gifts for Women",
    slug: "gifts-for-women",
    description: "Chic home aesthetics, bespoke jewelry, artisanal treats, and wellness favorites.",
    tagline: "Charming & elegant",
  },
  {
    name: "Gifts for Boyfriend",
    slug: "gifts-for-boyfriend",
    description: "Meaningful date night activities, audio tech, gaming gear, and cozy apparel.",
    tagline: "Memorable & fun",
  },
  {
    name: "Gifts for Girlfriend",
    slug: "gifts-for-girlfriend",
    description: "Romantic keepsakes, aesthetic decor, luxury skincare, and heartfelt surprises.",
    tagline: "Sweet & special",
  },
];

export function GiftIdeasByPerson() {
  return (
    <section className="my-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Heart className="h-4 w-4" />
            <span>Targeted Gifting</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Shop Gift Ideas by Person
          </h2>
        </div>
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
        >
          <span>View All Recipients</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipientsList.map((rec) => (
          <Link
            key={rec.slug}
            to="/category/$slug"
            params={{ slug: rec.slug }}
            className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[0.72rem] font-bold uppercase tracking-wider text-primary">
                  {rec.tagline}
                </span>
                {rec.badge && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[0.65rem] font-bold text-primary">
                    {rec.badge}
                  </span>
                )}
              </div>

              <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                {rec.name}
              </h3>

              <p className="mt-2 text-xs text-foreground-muted leading-relaxed">
                {rec.description}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-xs font-semibold text-primary">
              <span>Browse Guides</span>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 transition-transform group-hover:translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
