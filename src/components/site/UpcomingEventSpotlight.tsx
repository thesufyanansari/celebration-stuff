import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { getNextUpcomingEvent, getDaysRemaining } from "@/data/events";
import { getArticle } from "@/data/articles";

export function UpcomingEventSpotlight() {
  const next = getNextUpcomingEvent();

  if (!next) {
    // Fallback if no active upcoming event
    return (
      <div className="rounded-3xl border border-border bg-surface p-8 shadow-card text-center">
        <Sparkles className="mx-auto h-6 w-6 text-primary" />
        <h3 className="mt-2 font-display text-xl font-bold text-foreground">Discover Thoughtful Gift Ideas</h3>
        <p className="mt-1 text-sm text-foreground-muted">Explore curated lists for every person and special occasion.</p>
        <Link
          to="/explore"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground"
        >
          <span>Explore All Guides</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  const { event, daysLeft } = next;
  const relatedArticleObj = event.relatedArticles?.[0] ? getArticle(event.relatedArticles[0]) : null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-accent-soft/30 p-6 sm:p-8 shadow-card">
      <div className="grid gap-6 lg:grid-cols-12 items-center">
        {/* Event Details Column */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface px-3 py-1 text-xs font-semibold text-primary">
            <Calendar className="h-3.5 w-3.5" />
            <span>Upcoming Seasonal Event</span>
          </div>

          <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-foreground">
            {event.name} is Coming Up
          </h3>
          <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
            {event.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              to="/category/$slug"
              params={{ slug: event.categorySlug }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <span>Explore {event.name} Gifts</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            {relatedArticleObj && (
              <Link
                to="/article/$slug"
                params={{ slug: relatedArticleObj.slug }}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Read Featured Guide →
              </Link>
            )}
          </div>
        </div>

        {/* Live Countdown Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center rounded-2xl border border-border/80 bg-surface p-6 shadow-sm text-center">
          <span className="text-overline text-foreground-muted">Target Date: {event.displayDate}</span>

          <div className="mt-3 flex items-baseline justify-center gap-2">
            <span className="font-display text-4xl sm:text-5xl font-extrabold text-primary">
              {daysLeft > 0 ? daysLeft : 0}
            </span>
            <span className="text-sm font-semibold text-foreground-muted">Days Left</span>
          </div>

          <div className="mt-3 flex items-center gap-1 text-[0.7rem] text-foreground-muted">
            <Clock className="h-3 w-3 text-primary" />
            <span>Updated automatically based on calendar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
