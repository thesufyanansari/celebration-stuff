import { Link } from "@tanstack/react-router";
import { TreePine, ArrowRight } from "lucide-react";

export const holidayList = [
  {
    name: "Christmas",
    slug: "christmas-gifts",
    count: "80+ Guides",
    desc: "Tree decor, gift guides & holiday tables",
  },
  {
    name: "Thanksgiving",
    slug: "thanksgiving",
    count: "30+ Guides",
    desc: "Warm tablescapes & host gifts",
  },
  {
    name: "Valentine's Day",
    slug: "occasions",
    count: "40+ Guides",
    desc: "Romantic surprises & cozy date nights",
  },
  {
    name: "Mother's Day",
    slug: "gifts-for-mom",
    count: "50+ Guides",
    desc: "Pampering finds & meaningful keepsakes",
  },
  {
    name: "Father's Day",
    slug: "gifts-for-dad",
    count: "45+ Guides",
    desc: "High-utility gadgets & outdoor gear",
  },
  {
    name: "Eid & Ramadan",
    slug: "eid-ramadan",
    count: "25+ Guides",
    desc: "Lantern decor, date platters & favors",
  },
];

export function ExploreByHoliday() {
  return (
    <section className="my-16 cv-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <TreePine className="h-4 w-4" />
            <span>Seasonal Traditions</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Explore by Holiday
          </h2>
        </div>
        <Link
          to="/events"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
        >
          <span>All Holiday Guides</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {holidayList.map((hol) => (
          <Link
            key={hol.slug}
            to="/category/$slug"
            params={{ slug: hol.slug }}
            className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-foreground-muted mb-1.5">
                <span className="font-semibold text-primary">{hol.count}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                {hol.name}
              </h3>
              <p className="mt-1.5 text-xs text-foreground-muted leading-relaxed">{hol.desc}</p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-xs font-semibold text-primary">
              <span>Explore Holiday</span>
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
