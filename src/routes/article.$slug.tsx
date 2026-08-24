import { createFileRoute, notFound } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { getArticle, getRelatedArticles } from "@/data/articles";
import { getAuthor, site } from "@/data/site";
import { CommentsSection } from "@/components/site/CommentsSection";
import { PinterestCta } from "@/components/site/PinterestCta";
import { Newsletter } from "@/components/site/Newsletter";
import { ArticleAd } from "@/components/ads/AdSlot";
import {
  ArticleHeader,
  ArticleSidebar,
  ArticleTableOfContents,
  TopProductPicks,
  ProductFeature,
  ComparisonTable,
  InternalArticleCard,
  ArticleFAQ,
  AuthorBox,
  RelatedArticles,
  ArticleContentRenderer,
  type EnhancedProduct,
} from "@/components/article";

export const Route = createFileRoute("/article/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const { article } = loaderData;
    const canonicalUrl = article.canonicalUrl || `https://celebrationstuff.com/article/${article.slug}`;
    const pageTitle = article.metaTitle || `${article.title} | ${site.name}`;
    const pageDescription = article.metaDescription || article.excerpt;

    const jsonLdArticle = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: pageDescription,
      image: [article.image],
      datePublished: article.published,
      dateModified: article.updated || article.published,
      author: {
        "@type": "Person",
        name: article.author,
      },
      publisher: {
        "@type": "Organization",
        name: site.name,
        url: "https://celebrationstuff.com",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
    };

    const jsonLdBreadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://celebrationstuff.com" },
        { "@type": "ListItem", position: 2, name: "Gift Guides", item: "https://celebrationstuff.com/explore" },
        { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
      ],
    };

    const jsonLdFaq =
      article.faqs && article.faqs.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: article.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }
        : null;

    const scripts: any[] = [
      { type: "application/ld+json", children: JSON.stringify(jsonLdArticle) },
      { type: "application/ld+json", children: JSON.stringify(jsonLdBreadcrumb) },
    ];

    if (jsonLdFaq) {
      scripts.push({ type: "application/ld+json", children: JSON.stringify(jsonLdFaq) });
    }

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: pageDescription },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDescription },
        { property: "og:image", content: article.image },
        { property: "og:url", content: canonicalUrl },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: pageTitle },
        { name: "twitter:description", content: pageDescription },
        { name: "twitter:image", content: article.image },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      scripts,
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const author = getAuthor(article.author);
  const moreArticles = getRelatedArticles(article, 6);

  // Normalize products with full fallback metadata
  const enhancedProducts: EnhancedProduct[] = (article.products || []).map((p, idx) => ({
    ...p,
    image: p.image || article.image,
    imageAlt: p.imageAlt || p.name,
    galleryImages: p.galleryImages?.length ? p.galleryImages : [p.image || article.image],
    rating: p.rating !== undefined ? p.rating : 4.8 + (idx % 3) * 0.1,
    badge: p.badge || (idx === 0 ? "Best Overall" : idx === 1 ? "Best Budget" : idx === 2 ? "Best Premium" : undefined),
    bestFor: p.bestFor || (idx === 0 ? "Top Recommendation" : "Practical Choice"),
    whyWeLoveIt: p.whyWeLoveIt || p.why,
    keyDetails: p.keyDetails || p.keyFeatures || [
      "Tested for daily durability and ease of use",
      "Prime-eligible fast shipping with free returns",
      "Consistently high satisfaction ratings from buyers",
    ],
    consider:
      p.consider ||
      p.considerations ||
      "Popular item during holiday rush; check current stock on Amazon.",
    verdict:
      p.verdict ||
      "An exceptional gift pick that balances real-world practicality with memorable celebration value.",
  }));

  // Separate non-product intro sections vs closing sections
  const nonProductSections = article.sections.filter((s) => !s.productId);
  const introSections = nonProductSections.slice(0, 2);
  const closingSections = nonProductSections.slice(2);

  // Cross-linking candidates from recommendation engine
  const inlineRelatedSlug1 = moreArticles[0]?.slug;
  const inlineRelatedSlug2 = moreArticles[1]?.slug;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 1. EDITORIAL ARTICLE HEADER */}
      <ArticleHeader article={article} />

      {/* Top of Article Leaderboard Ad */}
      <ArticleAd placement="top" />

      {/* 2. MAIN 2-COLUMN GRID LAYOUT (Bounded sticky container) */}
      <div className="relative grid gap-12 lg:grid-cols-12">
        {/* Main Editorial Content Column (8 Cols) */}
        <main className="lg:col-span-8 min-w-0">
          <article>
            {/* Mobile Collapsible Table of Contents */}
            <ArticleTableOfContents isMobileDrawer />

            {/* Introductory Context Sections */}
            {introSections.map((section, idx) => {
              const secId =
                section.id ||
                `intro-${idx}-${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

              return (
                <section key={secId} id={secId} className="mb-8 scroll-mt-24">
                  <h2 className="mb-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="space-y-3">
                    {section.body.map((para, pIdx) => (
                      <ArticleContentRenderer key={pIdx} text={para} />
                    ))}
                  </div>
                </section>
              );
            })}

            {/* In-Article Ad After Intro */}
            <ArticleAd placement="after-intro" />

            {/* Quick Picks / Top Recommendations Shopping Grid */}
            {enhancedProducts.length > 0 && (
              <TopProductPicks products={enhancedProducts} />
            )}

            {/* Detailed Product Reviews Flow */}
            <div className="my-10 flex flex-col gap-12">
              {enhancedProducts.map((product, idx) => {
                const matchingSection = article.sections.find(
                  (s) =>
                    s.productId === product.id ||
                    (s.heading && s.heading.toLowerCase().includes(product.name.toLowerCase().slice(0, 8)))
                );

                const showInlineCard1 = idx === 2 && inlineRelatedSlug1;
                const showInlineCard2 = idx === 8 && inlineRelatedSlug2;
                // Place an ad after every 2 products (after Product 2, 4, 6, 8, 10, 12, 14, 16, 18, 20)
                const showBetweenProductsAd = (idx + 1) % 2 === 0;

                return (
                  <div key={product.id || idx} className="flex flex-col gap-8">
                    <ProductFeature
                      product={product}
                      index={idx}
                      narrativeParagraphs={matchingSection?.body}
                    />

                    {/* Contextual Inline Recommendation Card between items */}
                    {showInlineCard1 && (
                      <InternalArticleCard
                        slug={inlineRelatedSlug1}
                        calloutText="Trending Holiday Inspiration"
                      />
                    )}
                    {showInlineCard2 && (
                      <InternalArticleCard
                        slug={inlineRelatedSlug2}
                        calloutText="You Might Also Enjoy"
                      />
                    )}

                    {/* In-Article Ad between product batches */}
                    {showBetweenProductsAd && (
                      <ArticleAd placement="between-products" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Product Comparison Table */}
            {enhancedProducts.length > 0 && (
              <ComparisonTable products={enhancedProducts} />
            )}

            {/* Closing Editorial & Decision Sections */}
            {closingSections.map((section, idx) => {
              const secId =
                section.id ||
                `guide-${idx}-${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

              return (
                <section
                  key={secId}
                  id={secId}
                  className="my-10 scroll-mt-24 rounded-3xl border border-border/80 bg-surface p-6 shadow-card sm:p-8"
                >
                  <h2 className="mb-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="space-y-3">
                    {section.body.map((para, pIdx) => (
                      <ArticleContentRenderer key={pIdx} text={para} />
                    ))}
                  </div>
                </section>
              );
            })}

            {/* In-Article Ad Before FAQs & Editorial Standards */}
            <ArticleAd placement="mid-article" />

            {/* Editorial Testing & Quality Standards Box */}
            <div className="my-10 rounded-3xl border border-primary/20 bg-gradient-to-br from-surface to-primary-soft/30 p-6 shadow-card sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Our Editorial Standards</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                How We Choose & Verify Every Recommendation
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground-muted sm:text-sm">
                Every product featured on <em>Celebration Stuff</em> is curated through extensive research, genuine utility assessment, price-to-value analysis, and feedback from real buyers. We continuously monitor price updates and stock availability to ensure our gift guides remain genuinely helpful when you need them.
              </p>
            </div>

            {/* Buyer FAQs */}
            {article.faqs && article.faqs.length > 0 && (
              <ArticleFAQ faqs={article.faqs} />
            )}

            {/* Author Box */}
            {author && <AuthorBox author={author} />}

            {/* Pinterest Share & Comments */}
            <div className="mt-12 space-y-10">
              <PinterestCta />
              <CommentsSection articleSlug={article.slug} />
            </div>
          </article>
        </main>

        {/* Bounded Desktop Right Sidebar Column (4 Cols) */}
        <div className="hidden lg:col-span-4 lg:block relative">
          <ArticleSidebar currentArticle={article} />
        </div>
      </div>

      {/* Ad Before Related Articles */}
      <ArticleAd placement="before-related" />

      {/* 3. MORE IDEAS YOU'LL LOVE (Related Article Cards) */}
      {moreArticles.length > 0 && (
        <RelatedArticles articles={moreArticles} />
      )}

      {/* 4. FOOTER NEWSLETTER */}
      <div className="mt-16">
        <Newsletter compact />
      </div>
    </div>
  );
}
