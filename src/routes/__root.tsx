import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const jsonLdOrg = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Celebration Stuff",
      url: "https://celebrationstuff.com",
      logo: "https://celebrationstuff.com/favicon.ico",
      sameAs: [
        "https://www.pinterest.com/celebrationstuff/",
        "https://www.instagram.com/celebrationstuff/",
        "https://www.facebook.com/celebrationstuff/",
      ],
    };

    const jsonLdWebSite = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Celebration Stuff",
      url: "https://celebrationstuff.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://celebrationstuff.com/explore?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    };

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Celebration Stuff — Thoughtful Gift Ideas, Holidays & Celebrations" },
        {
          name: "description",
          content:
            "Editorial gift guides and celebration inspiration for holidays, birthdays, anniversaries, moms, dads, and special moments.",
        },
        { name: "author", content: "Celebration Stuff" },
        { property: "og:title", content: "Celebration Stuff — Thoughtful Gift Ideas & Guides" },
        {
          property: "og:description",
          content:
            "Editorial gift guides and celebration inspiration for holidays, birthdays, anniversaries, moms, dads, and special moments.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://celebrationstuff.com" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: "https://celebrationstuff.com" },
        {
          rel: "stylesheet",
          href: appCss,
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=DM+Sans:wght@400;500;600;700&display=swap",
        },
        { rel: "icon", href: "/favicon.png", type: "image/png" },
        { rel: "apple-touch-icon", href: "/favicon.png" },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(jsonLdOrg) },
        { type: "application/ld+json", children: JSON.stringify(jsonLdWebSite) },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

import { NewsletterPopup } from "@/components/site/NewsletterPopup";

import { adConfig } from "@/components/ads/AdConfig";

import { VisitorArrivalExperience } from "@/components/site/VisitorArrivalExperience";

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {adConfig.enabled && !adConfig.isDevelopment && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adConfig.publisherId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <VisitorArrivalExperience durationSeconds={1.5} />
        {children}
        <NewsletterPopup delaySeconds={10} />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
