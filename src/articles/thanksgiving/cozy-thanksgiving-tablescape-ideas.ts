import type { Article } from "@/data/articles";
import heroTable from "@/assets/hero-table.jpg";

export const article: Article = {
  slug: "cozy-thanksgiving-tablescape-ideas",
  title: "12 Cozy Thanksgiving Tablescape Ideas You Can Set in One Afternoon",
  excerpt:
    "Layered linens, candlelight and foraged greenery — a warm Thanksgiving table without a florist budget.",
  answer:
    "The easiest cozy Thanksgiving table uses three layers: a neutral runner, a low green garland, and mixed-height taper candles. Add one seasonal accent per place setting and stop there.",
  category: "holidays",
  event: "Thanksgiving",
  season: "Fall",
  tags: ["thanksgiving", "tablescape", "hosting", "candles"],
  author: "sarah-linden",
  published: "2026-09-18",
  updated: "2026-08-04",
  views: 48210,
  readingMinutes: 8,
  image: heroTable,
  imageWidth: 1280,
  imageHeight: 960,
  featured: true,
  sections: [
    {
      heading: "Start with a neutral base",
      body: [
        "A cozy table reads warm because of texture, not colour. Begin with a washed linen runner in oatmeal, sand or clay and let the wood of your table show at the edges — that visible grain does more for warmth than any centerpiece.",
        "If you only own a white tablecloth, layer a narrower runner over the middle. The contrast instantly makes a rented-looking table feel styled.",
      ],
    },
    {
      heading: "Build a low green garland",
      body: [
        "Eucalyptus, olive branches or even clippings from the yard make a runner-length garland in ten minutes. Keep it under six inches tall so guests can see each other across the table — the single most common tablescape mistake is a centerpiece nobody can see past.",
        "Tuck in small gourds, dried citrus or a few stems of dried wheat at uneven intervals. Odd numbers look intentional; even numbers look arranged.",
      ],
    },
    {
      heading: "Light it like a restaurant",
      body: [
        "Mixed-height brass candlesticks with unscented ivory tapers give you the flattering glow that photographs beautifully and hides the fact that you were cooking twenty minutes ago. Unscented matters: scented candles fight your food.",
        "Add two or three tealights in small glass holders for the gaps. Aim for roughly one flame per guest.",
      ],
    },
    {
      heading: "One accent per place setting",
      body: [
        "A sprig of rosemary tied with twine, a hand-written name card, or a single persimmon on the plate. Choose one and repeat it — restraint is what separates editorial from cluttered.",
        "If you are hosting families with little ones this fall, coordinating festive family moments alongside our favorite [baby Halloween costume ideas](/article/best-baby-halloween-costume-ideas-boys-girls-twins) and autumn celebration ideas brings joyful warmth to your seasonal gathering.",
      ],
    },
  ],
  products: [
    {
      name: "Stonewashed Linen Table Runner",
      price: "$38",
      why: "Heavier weight linen drapes instead of wrinkling into ridges, and the oatmeal shade works from September through New Year's, so it earns its shelf space.",
      url: "#",
    },
    {
      name: "Solid Brass Taper Candlestick Set",
      price: "$62",
      why: "Three graduated heights give you the layered candlelight look with one purchase, and solid brass won't wobble the way hollow plated versions do.",
      url: "#",
    },
    {
      name: "Preserved Eucalyptus Garland, 6 ft",
      price: "$45",
      why: "Preserved stems stay pliable for several seasons, so the cost per use drops well below fresh greenery from a florist.",
      url: "#",
    },
  ],
  faqs: [
    {
      q: "How tall should a Thanksgiving centerpiece be?",
      a: "Keep arrangements under about six inches, or above twenty inches on a pedestal. Anything in between blocks sightlines across the table.",
    },
    {
      q: "How far in advance can I set the table?",
      a: "Set everything except food and fresh greenery the night before. Fresh clippings go down the morning of so they don't wilt under warm indoor air.",
    },
    {
      q: "What if my table seats more than eight?",
      a: "Break the runner into two shorter garlands with a gap in the middle rather than one long line. It creates conversation zones and looks less like a banquet hall.",
    },
  ],
};

export default article;
