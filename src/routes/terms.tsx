import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { site } from "@/data/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `Terms of Use — ${site.name}` },
      {
        name: "description",
        content:
          "The terms that govern your use of Celebration Stuff, including content ownership and liability.",
      },
      { property: "og:title", content: `Terms of Use — ${site.name}` },
      { property: "og:description", content: "Terms governing your use of this site." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Terms of use" updated="August 2026">
      <p>
        By using {site.name} you agree to these terms. Our guides are published for general
        inspiration and are not professional advice.
      </p>
      <h2>Content ownership</h2>
      <p>
        All articles, photography and original graphics belong to {site.name}. You may share short
        excerpts with a link back, but republishing full articles is not permitted.
      </p>
      <h2>Liability</h2>
      <p>
        We check our recommendations carefully, but you use ideas, recipes and DIY projects at your
        own risk. Prices and availability of linked products change without notice.
      </p>
      <h2>Changes</h2>
      <p>We may update these terms; continued use of the site means you accept the new version.</p>
    </LegalPage>
  ),
});
