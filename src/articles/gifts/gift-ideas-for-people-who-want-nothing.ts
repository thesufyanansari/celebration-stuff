import type { Article } from "@/data/articles";
import gifts from "@/assets/gifts.jpg";

export const article: Article = {
  slug: "gift-ideas-for-people-who-want-nothing",
  title: "38 Gift Ideas for People Who Say They Want Nothing",
  excerpt:
    "Consumables, upgrades and experiences — the three categories that never end up in a donation box.",
  answer:
    "For someone who wants nothing, choose consumables they'd never buy themselves, an upgrade to something they already use daily, or a shared experience. All three avoid adding clutter.",
  category: "gifts",
  event: "Any Occasion",
  season: "Year-round",
  tags: ["gift guide", "holiday gifts", "minimalist"],
  recipient: ["gifts-for-mom", "gifts-for-dad", "gifts-for-women", "gifts-for-men"],
  occasion: ["birthday-gifts", "housewarming-gifts"],
  holiday: ["christmas-gifts"],
  giftStyle: ["minimalist-gifts", "budget-gifts"],
  author: "maya-okafor",
  published: "2026-08-11",
  updated: "2026-08-15",
  views: 93120,
  readingMinutes: 9,
  image: gifts,
  imageWidth: 900,
  imageHeight: 1200,
  featured: true,
  sections: [
    {
      heading: "Category one: excellent consumables",
      body: [
        "The safest gift for a minimalist is something delicious, fragrant or useful that disappears. Single-origin coffee, good olive oil, a beeswax candle, a box of citrus in January.",
        "The rule: it should be a clear step above what they'd buy for themselves on a normal Tuesday.",
      ],
    },
    {
      heading: "Category two: upgrade the daily object",
      body: [
        "Everyone uses something every single day that is slightly worse than it could be — the tea towel, the pillowcase, the phone cable, the reading light. Replacing that object is a gift that gets noticed daily without adding a new category of stuff.",
      ],
    },
    {
      heading: "Category three: shared time",
      body: [
        "A pottery class, a two-hour boat rental, tickets to something small and local. Book it for a specific date and put it in both calendars — an unbooked experience gift quietly becomes homework.",
        "If you're specifically shopping for family members, explore our dedicated guides to [12 Christmas gifts for Mom](/article/12-christmas-gifts-for-mom-she-will-actually-love) and [18 useful Christmas gifts for dad who doesn't need more stuff](/article/18-useful-christmas-gifts-for-dad-who-doesnt-need-more-stuff) for more thoughtful, clutter-free inspiration.",
      ],
    },
    {
      heading: "What to skip",
      body: [
        "Decorative objects with no function, novelty kitchen gadgets, and anything monogrammed unless you are certain. These are the three most common items in post-holiday donation bins.",
      ],
    },
  ],
  products: [
    {
      name: "Single-Origin Coffee Subscription (3 months)",
      price: "$54",
      why: "Three deliveries keeps the gift alive past the first week and lets them discover a roaster instead of receiving one bag they may not like.",
      url: null,
    },
    {
      name: "Waffle-Weave Turkish Towel Set",
      price: "$48",
      why: "Everyday item, clear quality jump over a supermarket towel, and no size or style guesswork involved.",
      url: null,
    },
    {
      name: "Rechargeable Warm-Light Reading Lamp",
      price: "$65",
      why: "Solves a real nightly annoyance for readers and partners alike, and the cordless design means no furniture rearranging.",
      url: null,
    },
  ],
  faqs: [
    {
      q: "How much should I spend on someone who wants nothing?",
      a: "Spend less than usual and choose better. A $30 item they use every day lands harder than a $100 object they need to find space for.",
    },
    {
      q: "Are gift cards a bad idea?",
      a: "Not at all — but pair them with a small consumable so there's something to open. A card alone can feel transactional.",
    },
  ],
};

export default article;
