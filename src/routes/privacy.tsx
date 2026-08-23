import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { site } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy — ${site.name}` },
      {
        name: "description",
        content:
          "How Celebration Stuff collects, uses and protects your data, including analytics and newsletter sign-ups.",
      },
      { property: "og:title", content: `Privacy Policy — ${site.name}` },
      { property: "og:description", content: "How we collect, use and protect your data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Privacy policy" updated="August 2026">
      <p>
        We collect the minimum data needed to run {site.name}: anonymous analytics about page
        visits, and the email address you give us if you subscribe to our newsletter.
      </p>
      <h2>Analytics</h2>
      <p>
        Aggregated, anonymised analytics help us understand which guides are useful. We do not sell
        personal data to anyone.
      </p>
      <h2>Newsletter</h2>
      <p>
        Your email is used only to send the weekly edit. Every email contains a one-click
        unsubscribe link, and unsubscribing deletes your address from our list.
      </p>
      <h2>Cookies</h2>
      <p>
        We use functional cookies plus cookies set by advertising and affiliate partners on pages
        that contain product links.
      </p>
      <h2>Contact</h2>
      <p>
        Questions or a data request? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  ),
});
