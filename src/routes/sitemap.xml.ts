import { createAPIFileRoute } from "@tanstack/react-start/api";
import { generateSitemapXml } from "@/lib/sitemap";

export const APIRoute = createAPIFileRoute("/sitemap.xml")({
  GET: async () => {
    const sitemap = generateSitemapXml();
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  },
});
