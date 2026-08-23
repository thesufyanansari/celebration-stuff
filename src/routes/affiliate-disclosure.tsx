import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { site } from "@/data/site";

export const Route = createFileRoute("/affiliate-disclosure")({
  head: () => ({
    meta: [
      { title: `Affiliate Disclosure — ${site.name}` },
      {
        name: "description",
        content:
          "How Celebration Stuff earns commission from product links and why it never changes our recommendations.",
      },
      { property: "og:title", content: `Affiliate Disclosure — ${site.name}` },
      { property: "og:description", content: "How we earn from product links." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Affiliate disclosure" updated="August 2026">
      <p>
        {site.name} participates in affiliate programs, including the Amazon Services LLC Associates
        Program. When you buy through a link on this site we may earn a small commission at no extra
        cost to you.
      </p>
      <h2>How it affects our picks</h2>
      <p>
        It doesn't. Editors choose products first and add links afterwards. We never accept payment
        for a placement in a gift guide, and we remove products we stop believing in.
      </p>
      <h2>Prices</h2>
      <p>
        Prices shown are the ones we saw when the guide was published or last updated and can change
        at any time.
      </p>
    </LegalPage>
  ),
});
