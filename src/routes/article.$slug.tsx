import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Eye, Clock, Award, Sparkles, ShieldCheck } from "lucide-react";
import { formatDate, formatViews, getArticle, related } from "@/data/articles";
import { getAuthor, getCategory, site } from "@/data/site";
import { ArticleCard } from "@/components/site/ArticleCard";
import { PinterestCta } from "@/components/site/PinterestCta";
import { Newsletter } from "@/components/site/Newsletter";
import { AffiliateDisclosure } from "@/components/site/AffiliateDisclosure";
import { ArticleSidebar } from "@/components/site/ArticleSidebar";
import { ProductCardBlock, ProductComparisonTable, QuickPicksSection } from "@/components/site/ProductCardBlock";
import { CommentsSection } from "@/components/site/CommentsSection";
import { ArticleAd } from "@/components/ads/AdSlot";
import { FaqAccordion } from "@/components/site/FaqAccordion";

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
      dateModified: article.updated,
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

    const jsonLdFaq = article.faqs && article.faqs.length > 0 ? {
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
    } : null;

    const scripts = [
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
  const category = getCategory(article.category);
  const more = related(article);

  const enhancedProducts = article.products.map((p, idx) => ({
    ...p,
    image: p.image || article.image,
    imageAlt: p.imageAlt || p.name,
    galleryImages: p.galleryImages?.length ? p.galleryImages : [p.image || article.image],
    rating: p.rating !== undefined ? p.rating : 4.8 + (idx % 3) * 0.1,
    badge: p.badge || (idx === 0 ? "Best Overall" : idx === 1 ? "Best Value" : "Best Luxury"),
    bestFor: p.bestFor || (idx === 0 ? "Moms & Partners" : idx === 1 ? "Friends & Family" : "Special Milestones"),
    whyWeLoveIt: p.whyWeLoveIt || p.why,
    keyDetails: p.keyDetails || p.keyFeatures || [
      "High-grade materials & gift-ready presentation",
      "Consistently top-rated by verified buyers",
      "Versatile design suitable for any celebration",
    ],
    consider: p.consider || p.considerations || (idx === 0 ? "Popular item that can sell out close to major holidays." : "Requires 2–3 days extra lead time for custom engraving."),
    verdict: p.verdict || "An exceptional gift choice that combines high practical utility with memorable emotional value.",
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-caption mb-4">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link to="/explore" className="hover:text-primary">
          Gift Guides
        </Link>
        {category && (
          <>
            <span className="px-2">/</span>
            <Link
              to="/category/$slug"
              params={{ slug: category.slug }}
              className="hover:text-primary"
            >
              {category.name}
            </Link>
          </>
        )}
        <span className="px-2">/</span>
        <span className="text-foreground font-medium truncate max-w-[220px] inline-block align-bottom">{article.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Main Article Content Column (8 Cols) */}
        <main className="lg:col-span-8">
          <article>
            {/* Article Hero */}
            <header>
              <h1 className="text-h1 font-display">{article.title}</h1>
              <p className="mt-4 text-lg text-foreground-muted leading-relaxed">{article.excerpt}</p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-caption border-y border-border/60 py-3">
                {author && (
                  <Link to="/author/$slug" params={{ slug: author.slug }} className="font-semibold text-foreground hover:text-primary">
                    By {author.name}
                  </Link>
                )}
                <span>•</span>
                <span>Published {formatDate(article.published)}</span>
                <span>•</span>
                <span>Updated {formatDate(article.updated)}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {article.readingMinutes} min read
                </span>
                <span className="inline-flex items-center gap-1 ml-auto font-medium">
                  <Eye className="h-3.5 w-3.5" /> {formatViews(article.views)} views
                </span>
              </div>

              <div className="mt-5">
                <AffiliateDisclosure />
              </div>

              <img
                src={article.image}
                alt={article.featuredImageAlt || article.title}
                width={article.imageWidth}
                height={article.imageHeight}
                className="mt-6 aspect-16/9 w-full rounded-3xl object-cover shadow-card"
              />
            </header>

            {/* Introduction / Short Answer */}
            <div className="mt-8 rounded-2xl border border-primary/20 bg-accent-soft/30 p-6">
              <div className="flex items-center gap-2 text-overline text-primary font-semibold">
                <Sparkles className="h-4 w-4" />
                <span>Editorial Executive Summary</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{article.answer}</p>
            </div>

            {/* Quick Picks Component */}
            {enhancedProducts.length > 0 && (
              <div className="mt-8">
                <QuickPicksSection products={enhancedProducts} />
              </div>
            )}

            {/* In-Content Ad Placement 1 */}
            <ArticleAd placement="after-intro" />

            {/* Product-by-Product Integrated Editorial Flow */}
            <div className="mt-10 flex flex-col gap-14">
              {article.sections.map((s, idx) => {
                // Find matching product by explicit productId, fallback to index
                const prod = s.productId
                  ? enhancedProducts.find((p) => p.id === s.productId)
                  : enhancedProducts[idx];

                const sectionSlug = s.id || (s.heading ? s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : `section-${idx}`);
                const showAdAfter = idx === 2 || idx === 5 || idx === 8;

                return (
                  <section key={s.id || s.heading || idx} id={sectionSlug} className="article-section scroll-mt-24">
                    {/* 1. SECTION HEADING */}
                    {s.heading && (
                      <h2 id={sectionSlug} className="text-h2 font-display mb-4">{s.heading}</h2>
                    )}

                    {/* 2. EDITORIAL CONTENT (NARRATIVE PARAGRAPHS) */}
                    <div className="article-section-content space-y-3 mb-6">
                      {s.body.map((p, i) => (
                        <p key={i} className="text-foreground-muted leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* 3. PRODUCT CARD — MUST BE AFTER EDITORIAL CONTENT */}
                    {prod && (
                      <div className="mt-6">
                        <ProductCardBlock product={prod} index={idx} />
                      </div>
                    )}

                    {/* Interstitial Display Ad Opportunities between sections */}
                    {showAdAfter && (
                      <div className="mt-10">
                        <ArticleAd placement={`after-section-${idx}`} />
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            {/* Quick Comparison Section (After all products) */}
            {enhancedProducts.length > 0 && (
              <section className="mt-12">
                <h2 className="text-h2 font-display mb-4">Product Comparison Table</h2>
                <ProductComparisonTable products={enhancedProducts} />
              </section>
            )}

            {/* How We Chose These Gifts */}
            <section className="mt-12 rounded-3xl border border-border bg-surface p-6 shadow-card">
              <div className="flex items-center gap-2 text-overline text-primary font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>Our Editorial Standards</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold text-foreground">How We Chose These Gifts</h3>
              <p className="mt-2 text-xs text-foreground-muted leading-relaxed">
                Every item featured in this guide is selected by our editorial team based on design quality, recipient usefulness, verified owner feedback, brand reputation, and overall value. We update our recommendations regularly to keep links and availability current.
              </p>
            </section>

            {/* In-Content Ad Placement 3: Before FAQ */}
            <ArticleAd placement="before-faq" />

            {/* Accessible Accordion FAQs */}
            {article.faqs && article.faqs.length > 0 && (
              <FaqAccordion faqs={article.faqs} />
            )}

            {/* Pinterest Share CTA */}
            <div className="mt-12">
              <PinterestCta />
            </div>

            {/* Comments */}
            <div className="mt-12">
              <CommentsSection articleSlug={article.slug} />
            </div>
          </article>
        </main>

        {/* Sidebar Column (4 Cols) */}
        <div className="lg:col-span-4">
          <ArticleSidebar currentArticle={article} />
        </div>
      </div>

      {/* Related Gift Guides */}
      {more.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="text-h2 font-display">More Gift Guides You Might Like</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* Footer Newsletter */}
      <div className="mt-14">
        <Newsletter compact />
      </div>
    </div>
  );
}


