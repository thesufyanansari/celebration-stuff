import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

const CANONICAL_HOST = "celebrationsstuff.com";
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

// Known legacy/redirect mapping to closest relevant page (Phase 12 Case A)
const LEGACY_PATH_REDIRECTS: Record<string, string> = {
  "/events": "/category/holidays",
  "/category/occasions": "/explore",
  "/category/baby-shower": "/category/bridal-shower",
  "/category/gift-guides": "/category/gifts",
  "/category/$slug": "/explore",
  "/article/$slug": "/explore",
  "/author/$slug": "/about",
  "/article": "/explore",
  "/category": "/explore",
  "/author": "/about",
};

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const rawHost =
        request.headers.get("x-forwarded-host") || request.headers.get("host") || url.host;
      const host = (rawHost.split(":")[0] || "").toLowerCase();
      const proto = (
        request.headers.get("x-forwarded-proto") || url.protocol.replace(":", "")
      ).toLowerCase();

      // Avoid redirecting local development or test hosts
      const isLocal =
        host.includes("localhost") ||
        host.includes("127.0.0.1") ||
        host.includes("::1") ||
        host.endsWith(".local") ||
        host.endsWith(".internal");

      let normalizedPath = url.pathname;

      // Skip asset and static file normalization
      const isStaticAsset =
        normalizedPath.startsWith("/_") ||
        normalizedPath.startsWith("/assets/") ||
        normalizedPath.startsWith("/fonts/") ||
        normalizedPath === "/favicon.png" ||
        normalizedPath === "/logo.png" ||
        normalizedPath === "/robots.txt" ||
        normalizedPath === "/sitemap.xml";

      let pathChanged = false;

      if (!isStaticAsset) {
        // 1. Lowercase normalization
        const lowerPath = normalizedPath.toLowerCase();
        if (normalizedPath !== lowerPath) {
          normalizedPath = lowerPath;
          pathChanged = true;
        }

        // 2. Trailing slash normalization (strip trailing slash for non-root paths)
        if (normalizedPath.length > 1 && normalizedPath.endsWith("/")) {
          normalizedPath = normalizedPath.replace(/\/+$/, "");
          pathChanged = true;
        }

        // 3. Known legacy route redirects
        if (LEGACY_PATH_REDIRECTS[normalizedPath]) {
          normalizedPath = LEGACY_PATH_REDIRECTS[normalizedPath];
          pathChanged = true;
        }
      }

      // Check if host or protocol needs redirection
      const isNonCanonicalHost =
        !isLocal &&
        (host !== CANONICAL_HOST ||
          host === "www.celebrationsstuff.com" ||
          host === "celebrationstuff.com" ||
          host === "www.celebrationstuff.com");

      const isHttp = !isLocal && proto === "http";

      // If host, protocol, or path requires normalization, issue a single 301 Permanent Redirect
      if (isNonCanonicalHost || isHttp || (pathChanged && !isLocal)) {
        const targetOrigin = isLocal ? `${url.protocol}//${rawHost}` : CANONICAL_ORIGIN;
        const targetUrl = `${targetOrigin}${normalizedPath}${url.search}`;

        // Prevent infinite loops if target is already identical to request
        if (targetUrl !== request.url) {
          return new Response(null, {
            status: 301,
            headers: {
              Location: targetUrl,
            },
          });
        }
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
