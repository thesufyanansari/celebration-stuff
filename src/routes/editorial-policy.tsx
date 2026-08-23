import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { site } from "@/data/site";

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: [
      { title: `Editorial Policy — ${site.name}` },
      {
        name: "description",
        content:
          "How Celebration Stuff researches, reviews, updates and corrects its celebration guides.",
      },
      { property: "og:title", content: `Editorial Policy — ${site.name}` },
      { property: "og:description", content: "How we research, review and correct our guides." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Editorial policy" updated="August 2026">
      <p>
        Every guide on {site.name} is written by a named editor with hands-on experience in that
        subject, then reviewed by a second editor before publication.
      </p>
      <h2>Research</h2>
      <p>
        We prioritise ideas we have styled, hosted or bought ourselves. Where we cite costs or
        timelines, they come from real projects rather than estimates.
      </p>
      <h2>Updates</h2>
      <p>
        Seasonal guides are reviewed before each season and stamped with an updated date so you know
        how current they are.
      </p>
      <h2>Corrections</h2>
      <p>
        Spotted a mistake? Email <a href={`mailto:${site.email}`}>{site.email}</a> and we'll correct
        it and note the change.
      </p>
    </LegalPage>
  ),
});
