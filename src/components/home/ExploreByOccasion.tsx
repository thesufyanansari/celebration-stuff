import { Link } from "@tanstack/react-router";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";

export const occasionList = [
  { name: "Birthday Gifts", slug: "birthday-gifts", count: "50+ Guides", desc: "Thoughtful milestones & theme parties" },
  { name: "Wedding Gifts", slug: "wedding-gifts", count: "40+ Guides", desc: "Registry staples & couple keepsakes" },
  { name: "Anniversary Gifts", slug: "anniversary-gifts", count: "35+ Guides", desc: "Traditional & modern anniversary picks" },
  { name: "Housewarming Gifts", slug: "housewarming-gifts", count: "25+ Guides", desc: "Cozy home accents & host essentials" },
  { name: "Baby Shower Gifts", slug: "baby-shower", count: "30+ Guides", desc: "Practical nursery picks & new mom luxury" },
  { name: "Parties & Celebrations", slug: "parties-celebrations", count: "45+ Guides", desc: "Decorating themes, food bars & setups" },
];

export function ExploreByOccasion() {
  return (
    <section className="my-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Calendar className="h-4 w-4" />
            <span>Milestones & Life Events</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Explore by Occasion
          </h2>
        </div>
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
        >
          <span>All Occasions</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {occasionList.map((occ) => (
          <Link
            key={occ.slug}
            to="/category/$slug"
            params={{ slug: occ.slug }}
            className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-foreground-muted mb-1.5">
                <span className="font-semibold text-primary">{occ.count}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                {occ.name}
              </h3>
              <p className="mt-1.5 text-xs text-foreground-muted leading-relaxed">
                {occ.desc}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-xs font-semibold text-primary">
              <span>View Ideas</span>
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
