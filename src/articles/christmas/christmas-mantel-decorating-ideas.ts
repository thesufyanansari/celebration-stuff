import type { Article } from "@/data/articles";
import christmas from "@/assets/christmas.jpg";

export const article: Article = {
  slug: "christmas-mantel-decorating-ideas",
  title: "Christmas Mantel Decorating: A Simple Formula That Always Looks Full",
  excerpt:
    "The three-layer mantel method — garland, height, glow — for a fireplace that photographs beautifully.",
  answer:
    "A full-looking Christmas mantel needs a garland roughly 1.5x the mantel length, two or three tall objects for height, and warm string lights woven inside the greenery rather than draped on top.",
  category: "holidays",
  event: "Christmas",
  season: "Winter",
  tags: ["christmas", "mantel", "garland", "decorating"],
  author: "sarah-linden",
  published: "2026-11-02",
  updated: "2026-07-29",
  views: 71540,
  readingMinutes: 7,
  image: christmas,
  imageWidth: 900,
  imageHeight: 1200,
  featured: true,
  sections: [
    {
      heading: "Buy more garland than feels reasonable",
      body: [
        "The number one reason a mantel looks sparse is a garland stretched tight across the shelf. Measure your mantel and buy at least one and a half times that length so the greenery can bunch, curve and drape at the ends.",
        "Anchor it with removable adhesive hooks under the lip of the mantel — never on the face where you'll see them.",
      ],
    },
    {
      heading: "Layer height behind the greenery",
      body: [
        "A mirror, a leaning piece of art or a pair of tall candlesticks stops the arrangement from reading as a flat green line. Aim for one dominant tall object slightly off-centre and one or two medium ones opposite.",
      ],
    },
    {
      heading: "Hide the glow inside",
      body: [
        "Weave warm-white battery string lights deep into the branches so you see light, not wire. Two shorter strands with separate timers beat one long strand — if a battery dies, half the mantel still glows.",
      ],
    },
    {
      heading: "Finish with texture, not more colour",
      body: [
        "Dried orange slices, pinecones, brass bells and knit stockings add richness while keeping the palette calm. If you want colour, pick one — a single red ribbon repeated three times.",
        "For more seasonal celebration inspiration spanning early autumn through the winter holidays, browse our curated guides to [outdoor Halloween decorations that impress the neighbors](/article/outdoor-halloween-decorations-impress-neighbors) and sweet [baby Halloween costume ideas](/article/best-baby-halloween-costume-ideas-boys-girls-twins) for picture-perfect memories.",
      ],
    },
  ],
  products: [
    {
      name: "Faux Norway Spruce Garland, 9 ft",
      price: "$54",
      why: "The mixed needle lengths read as real in photos, and nine feet covers a standard mantel with enough slack to drape properly at both ends.",
      url: "#",
    },
    {
      name: "Warm White Battery Fairy Lights (2-pack)",
      price: "$24",
      why: "Copper wire disappears inside greenery and the built-in six-hour timer means you never think about switching them on again.",
      url: "#",
    },
  ],
  faqs: [
    {
      q: "How do I hang garland without damaging the mantel?",
      a: "Use removable adhesive hooks rated above the garland's weight, placed under the mantel lip. Apply them a day ahead so the adhesive fully cures.",
    },
    {
      q: "Can I leave a lit mantel unattended?",
      a: "Battery LED lights are fine on a timer. Never leave real candles burning near greenery, faux or fresh.",
    },
  ],
};

export default article;
