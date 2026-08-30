import { Link } from "@tanstack/react-router";
import { Calendar, ArrowRight, Sparkles, Clock } from "lucide-react";
import { getUpcomingEvents } from "@/data/events";

export function UpcomingEventsSection() {
  const upcomingEvents = getUpcomingEvents(6);

  if (upcomingEvents.length === 0) return null;

  return (
    <section className="my-14 rounded-3xl border border-primary/20 bg-gradient-to-br from-surface via-primary-soft/20 to-accent-soft/20 p-6 shadow-card sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Calendar className="h-4 w-4" />
            <span>Seasonal Calendar & Timelines</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Upcoming Events & Celebrations
          </h2>
        </div>
        <span className="text-xs font-semibold text-foreground-muted">
          Dynamically calculated for the current season
        </span>
      </div>

      {/* Cards Grid */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((evt) => {
          const isSoon = evt.daysRemaining <= 30 && evt.daysRemaining >= 0;
          const isTodayOrActive = evt.daysRemaining >= -2 && evt.daysRemaining <= 2;

          return (
            <div
              key={evt.slug}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
            >
              <div>
                {/* Event Image & Countdown Badge */}
                <div className="relative aspect-16/9 w-full overflow-hidden bg-background-subtle">
                  <img
                    src={evt.heroImage}
                    alt={evt.name}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="aspect-16/9 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[0.7rem] font-bold text-white backdrop-blur-sm shadow">
                    <Clock className="h-3 w-3 text-primary-soft" />
                    <span>
                      {isTodayOrActive
                        ? "Happening Now!"
                        : isSoon
                          ? `Coming in ${evt.daysRemaining} days`
                          : evt.displayDate}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-foreground-muted mb-1.5">
                    <span className="font-semibold text-primary">{evt.displayDate}</span>
                    {evt.priority >= 9 && (
                      <span className="inline-flex items-center gap-1 text-[0.68rem] font-bold text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        <Sparkles className="h-3 w-3 text-amber-500" />
                        Major Holiday
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary leading-snug">
                    <Link
                      to="/category/$slug"
                      params={{ slug: evt.categorySlug }}
                      className="hover:underline"
                    >
                      {evt.name}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs text-foreground-muted leading-relaxed line-clamp-2">
                    {evt.description}
                  </p>
                </div>
              </div>

              {/* Bottom CTA Link */}
              <div className="border-t border-border/50 px-5 py-3 bg-background-subtle/50">
                <Link
                  to="/category/$slug"
                  params={{ slug: evt.categorySlug }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-transform group-hover:translate-x-1"
                >
                  <span>Explore {evt.name} Ideas</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
