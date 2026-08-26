import heroTable from "@/assets/hero-table.jpg";
import gifts from "@/assets/gifts.jpg";
import birthday from "@/assets/birthday.jpg";
import christmas from "@/assets/christmas.jpg";
import eid from "@/assets/eid.jpg";
import shower from "@/assets/shower.jpg";
import fall from "@/assets/fall.jpg";
import hosting from "@/assets/hosting.jpg";

export type Product = {
  id?: string;
  name: string;
  price: string;
  why: string;
  amazonUrl?: string | null;
  url?: string | null;
  rating?: number;
  badge?: string;
  bestFor?: string;
  whyWeLoveIt?: string;
  keyFeatures?: string[];
  keyDetails?: string[];
  considerations?: string;
  consider?: string;
  verdict?: string;
  image?: string;
  imageAlt?: string;
  galleryImages?: string[];
};

export type Section = {
  id?: string;
  heading: string;
  body: string[];
  productId?: string;
  product?: Product;
};

export type Faq = { q: string; a: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  answer: string;
  category: string;
  event: string;
  season: "Spring" | "Summer" | "Fall" | "Winter" | "Year-round";
  tags: string[];
  author: string;
  published: string;
  updated: string;
  views: number;
  readingMinutes: number;
  image: string;
  imageWidth: number;
  imageHeight: number;
  featured?: boolean;
  sections: Section[];
  products: Product[];
  faqs: Faq[];
  // Extended SEO & Content Metadata
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  featuredImageAlt?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  focusTopic?: string;
  // Multi-dimensional gift taxonomy classification
  recipient?: string[];
  occasion?: string[];
  holiday?: string[];
  lifeEvent?: string[];
  giftStyle?: string[];
};

import registryArticles from "@/articles";

export const articles: Article[] = [
  ...registryArticles,
  {
    slug: "pastel-first-birthday-party-ideas",
    title: "Pastel First Birthday Party Ideas That Photograph Beautifully",
    excerpt:
      "A balloon arch, one cake table and a two-hour timeline — the calm version of a first birthday.",
    answer:
      "Keep a first birthday to two hours, build one styled focal point (the cake table), and schedule cake within the first forty-five minutes while the baby is still fresh.",
    category: "parties-celebrations",
    event: "Birthday",
    season: "Year-round",
    tags: ["birthday", "first birthday", "balloons", "party"],
    author: "daniel-reyes",
    published: "2026-06-24",
    updated: "2026-08-01",
    views: 33780,
    readingMinutes: 6,
    image: birthday,
    imageWidth: 900,
    imageHeight: 1100,
    sections: [
      {
        heading: "Build one focal point",
        body: [
          "Photographers, grandparents and guests all gravitate to the same spot. Put your entire decorating budget into one cake table with a balloon garland behind it and leave the rest of the room plain.",
        ],
      },
      {
        heading: "The two-hour timeline",
        body: [
          "Arrive and mingle (0:00–0:20), group photo (0:20–0:30), cake and singing (0:30–0:50), open play (0:50–1:40), goodbyes (1:40–2:00). Cake early is non-negotiable — a tired one-year-old does not perform.",
        ],
      },
      {
        heading: "Palette over theme",
        body: [
          "Pick three pastels plus cream and repeat them across balloons, plates and napkins. A palette holds together in photos far better than a licensed character theme.",
        ],
      },
    ],
    products: [
      {
        name: "Pastel Balloon Garland Kit",
        price: "$32",
        why: "Comes pre-sorted by size with the strip and glue dots included, which turns a two-person, two-hour job into a solo forty-minute one.",
        url: null,
      },
      {
        name: "Ivory Cake Stand, 12 in",
        price: "$40",
        why: "A neutral pedestal works for every birthday after this one, and the extra height keeps small hands out of the frosting.",
        url: null,
      },
    ],
    faqs: [
      {
        q: "How long should a first birthday party be?",
        a: "Two hours, scheduled around the baby's usual nap window. Anything longer and the guest of honour is asleep for the second half.",
      },
      {
        q: "How many balloons do I need for a 6-foot arch?",
        a: "Roughly 90 to 120 balloons in mixed sizes for a full-looking garland at that length.",
      },
    ],
  },
  {
    slug: "eid-al-fitr-home-decor-ideas",
    title: "Warm, Modern Eid al-Fitr Decor Ideas for a Small Home",
    excerpt:
      "Lanterns, brass trays and a dessert table that works for both a quiet family morning and evening guests.",
    answer:
      "For a small-space Eid, focus on three surfaces: the entry console, the dessert table and the dining table. Lanterns and warm metals do most of the work without permanent installation.",
    category: "holidays",
    event: "Eid al-Fitr",
    season: "Year-round",
    tags: ["eid", "ramadan", "lanterns", "decor"],
    author: "sarah-linden",
    published: "2026-03-05",
    updated: "2026-07-20",
    views: 27650,
    readingMinutes: 6,
    image: eid,
    imageWidth: 900,
    imageHeight: 1000,
    sections: [
      {
        heading: "Three surfaces, nothing more",
        body: [
          "In a small home, decorating everything reads as clutter. Choose the entry console, the dessert table and the dining table — the three places guests actually stop.",
        ],
      },
      {
        heading: "Lanterns as the anchor",
        body: [
          "A trio of metal lanterns in mixed heights and finishes gives you instant occasion. Use flameless LED candles inside so they can sit near fabric, and group them tightly rather than spreading them across a surface.",
        ],
      },
      {
        heading: "The dates tray matters",
        body: [
          "A brass or hammered tray of dates and nuts is both the most traditional and the most photographed element of the day. Keep it filled and central.",
        ],
      },
    ],
    products: [
      {
        name: "Moroccan Metal Lantern Trio",
        price: "$78",
        why: "Three coordinated heights in one purchase solves the grouping problem, and the cutwork throws patterned light on the wall after dark.",
        url: null,
      },
      {
        name: "Hammered Brass Serving Tray",
        price: "$56",
        why: "Doubles as everyday coffee-table styling the rest of the year, so it isn't a single-occasion buy.",
        url: null,
      },
    ],
    faqs: [
      {
        q: "When should I decorate for Eid?",
        a: "Most families set up during the final nights of Ramadan so everything is ready before the morning prayer.",
      },
      {
        q: "How do I make decor work for both children and guests?",
        a: "Keep breakables at table height or above and choose flameless candles. A low, sturdy dessert table lets kids serve themselves without supervision.",
      },
    ],
  },
  {
    slug: "bridal-shower-brunch-ideas",
    title: "A Bridal Shower Brunch Plan: Menu, Timeline and Table",
    excerpt:
      "White florals, a make-ahead menu and a three-hour flow that leaves the host actually enjoying it.",
    answer:
      "A bridal shower brunch works best at three hours with a fully make-ahead menu, one floral centerpiece style repeated down the table, and games kept to a single short activity.",
    category: "life-events",
    event: "Bridal Shower",
    season: "Spring",
    tags: ["bridal shower", "brunch", "wedding", "hosting"],
    author: "daniel-reyes",
    published: "2026-04-14",
    updated: "2026-08-06",
    views: 21430,
    readingMinutes: 7,
    image: shower,
    imageWidth: 900,
    imageHeight: 1150,
    sections: [
      {
        heading: "The make-ahead menu",
        body: [
          "Two baked egg dishes, a green salad with dressing on the side, a fruit platter, pastries from a good bakery, and one signature drink. Everything but the salad can be finished the day before.",
        ],
      },
      {
        heading: "The three-hour flow",
        body: [
          "Arrival and drinks (0:00–0:30), brunch served (0:30–1:15), one game or story activity (1:15–1:45), gifts (1:45–2:30), cake and departures (2:30–3:00).",
        ],
      },
      {
        heading: "One centerpiece, repeated",
        body: [
          "Three or five identical low arrangements down the table look far more expensive than one large mixed arrangement. Use a single flower type in white or cream with plenty of greenery.",
        ],
      },
    ],
    products: [
      {
        name: "Footed Ceramic Bud Vase Set (5)",
        price: "$46",
        why: "Five matching low vases give you the repeated-centerpiece look on a supermarket-flower budget, and they store flat.",
        url: null,
      },
      {
        name: "Linen Blend Napkin Set of 12",
        price: "$52",
        why: "Twelve matching cloth napkins cost about the same as three packs of premium paper but photograph far better and survive future events.",
        url: null,
      },
    ],
    faqs: [
      {
        q: "How long should a bridal shower last?",
        a: "Three hours is the sweet spot — enough for a meal, gifts and conversation without the afternoon disappearing.",
      },
      {
        q: "Who traditionally hosts the bridal shower?",
        a: "Traditionally the maid of honour or the wedding party, though today it's just as often a close friend, sibling or parent.",
      },
    ],
  },
  {
    slug: "fall-front-porch-decorating-ideas",
    title: "Fall Front Porch Decorating: The Layered Pumpkin Method",
    excerpt:
      "Odd numbers, three heights and one wreath — a porch that looks styled from the sidewalk.",
    answer:
      "Group pumpkins in odd numbers at three distinct heights, anchor with two tall planters of dried grasses, and hang one wreath at eye level. Repeat two colours only.",
    category: "seasonal-decor",
    event: "Fall",
    season: "Fall",
    tags: ["fall", "porch", "pumpkins", "wreath"],
    author: "sarah-linden",
    published: "2026-08-19",
    updated: "2026-08-19",
    views: 15980,
    readingMinutes: 5,
    image: fall,
    imageWidth: 900,
    imageHeight: 1000,
    sections: [
      {
        heading: "Three heights, odd numbers",
        body: [
          "Place your largest pumpkins on the ground, a medium group on the step, and a small cluster on an overturned crate or stool. Odd-numbered groupings at three heights is the entire trick.",
        ],
      },
      {
        heading: "Anchor with dried texture",
        body: [
          "Two tall containers of dried wheat, pampas or corn stalks flanking the door frame the whole arrangement and hold up in wind better than fresh mums.",
        ],
      },
      {
        heading: "Keep it to two colours",
        body: [
          "Orange plus cream, or cream plus deep green. Adding a third colour is where porches start looking like a garden centre display.",
        ],
      },
    ],
    products: [
      {
        name: "Dried Wheat Bundle, 100 stems",
        price: "$34",
        why: "Weather-tolerant, reusable across several autumns, and it fills a large planter for less than a single fresh arrangement.",
        url: null,
      },
      {
        name: "Grapevine and Wheat Front Door Wreath",
        price: "$58",
        why: "Neutral enough to hang from September through Thanksgiving, which is roughly three months of use from one purchase.",
        url: null,
      },
    ],
    faqs: [
      {
        q: "How long do real pumpkins last outside?",
        a: "Six to ten weeks in cool weather if they sit on a dry surface rather than directly on damp concrete or soil.",
      },
      {
        q: "When should I decorate my porch for fall?",
        a: "Early to mid September in most of the US and Canada — early enough to enjoy it, late enough that nothing rots before Halloween.",
      },
    ],
  },
  {
    slug: "dinner-party-hosting-checklist",
    title: "The Relaxed Dinner Party Checklist: A Five-Day Plan",
    excerpt:
      "What to do each day so the host is pouring drinks at 7pm, not plating alone in the kitchen.",
    answer:
      "Spread dinner party prep across five days: menu and invites, shopping, cleaning, make-ahead cooking, and a day-of list that ends ninety minutes before guests arrive.",
    category: "home-entertaining",
    event: "Dinner Party",
    season: "Year-round",
    tags: ["dinner party", "hosting", "checklist", "entertaining"],
    author: "daniel-reyes",
    published: "2026-05-30",
    updated: "2026-08-10",
    views: 40210,
    readingMinutes: 8,
    image: hosting,
    imageWidth: 900,
    imageHeight: 1150,
    sections: [
      {
        heading: "Day 5: menu and invitations",
        body: [
          "Choose one dish that impresses and three that are easy. Send invitations with a clear start and end time — guests relax more when they know the shape of the evening.",
        ],
      },
      {
        heading: "Day 3: shop and clean",
        body: [
          "Do the full shop in one trip and clean the two rooms guests will use. Nobody is inspecting your bedroom.",
        ],
      },
      {
        heading: "Day 1: cook ahead",
        body: [
          "Braises, dips, dressings and desserts all improve overnight. Anything that can be reheated should be finished today.",
        ],
      },
      {
        heading: "Day of: stop at 90 minutes",
        body: [
          "Set the table, chill the drinks, light the candles and then stop. A host who is calm at the door sets the tone for the entire night.",
        ],
      },
    ],
    products: [
      {
        name: "Enamelled Cast Iron Dutch Oven, 5.5 qt",
        price: "$180",
        why: "Make-ahead braising, oven-to-table serving and decades of use — the single most justifiable splurge for people who host regularly.",
        url: null,
      },
      {
        name: "Unscented Ivory Taper Candles, 12-pack",
        price: "$22",
        why: "Unscented keeps candlelight from competing with the food, and twelve tapers covers roughly four dinner parties.",
        url: null,
      },
    ],
    faqs: [
      {
        q: "How many courses should a home dinner party have?",
        a: "Three is plenty: something to nibble with drinks, a main with sides, and dessert. Four or more turns the host into staff.",
      },
      {
        q: "What if a guest has dietary restrictions?",
        a: "Ask when you invite, then build the menu so the main sides work for everyone rather than plating a separate special meal.",
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const byCategory = (slug: string) =>
  articles.filter(
    (a) =>
      a.category === slug ||
      a.recipient?.includes(slug) ||
      a.occasion?.includes(slug) ||
      a.holiday?.includes(slug) ||
      a.lifeEvent?.includes(slug) ||
      a.giftStyle?.includes(slug) ||
      a.tags.includes(slug),
  );

/**
 * Returns latest published articles sorted chronologically (newest first).
 */
export const getLatestArticles = (limit = 12): Article[] =>
  [...articles]
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, limit);

/**
 * Returns top popular articles ranked by views (excluding a specific article).
 */
export const getPopularArticles = (excludeSlug?: string, limit = 10): Article[] =>
  [...articles]
    .filter((a) => a.slug !== excludeSlug)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);

/**
 * Context-aware topic relationship engine:
 * Priority 1: Exact topic / holiday / recipient match
 * Priority 2: Same holiday / event (e.g. Christmas)
 * Priority 3: Same category (e.g. Gift Guides)
 * Priority 4: Same recipient (e.g. Dad / Mom / Men)
 * Priority 5: Shared tags
 */
export const getTopicArticles = (article: Article, limit = 10): Article[] => {
  return [...articles]
    .filter((a) => a.slug !== article.slug)
    .map((candidate) => {
      let score = 0;

      // Same holiday / event (e.g. Christmas)
      if (
        article.event &&
        candidate.event &&
        article.event.toLowerCase() === candidate.event.toLowerCase()
      ) {
        score += 50;
      }
      if (
        article.holiday &&
        candidate.holiday &&
        article.holiday.some((h) => candidate.holiday?.includes(h))
      ) {
        score += 40;
      }

      // Same recipient (e.g. Dad / Mom)
      if (
        article.recipient &&
        candidate.recipient &&
        article.recipient.some((r) => candidate.recipient?.includes(r))
      ) {
        score += 30;
      }

      // Same category
      if (article.category === candidate.category) {
        score += 20;
      }

      // Shared tags
      const sharedTags = candidate.tags.filter((t) => article.tags.includes(t)).length;
      score += sharedTags * 5;

      // Same season
      if (article.season && candidate.season === article.season) {
        score += 5;
      }

      return { article: candidate, score };
    })
    .sort((a, b) => b.score - a.score || (b.article.views || 0) - (a.article.views || 0))
    .map((item) => item.article)
    .slice(0, limit);
};

/**
 * Related articles recommendation engine (surfaces best match for bottom grid).
 */
export const getRelatedArticles = (article: Article, count = 6): Article[] =>
  getTopicArticles(article, count);

export const related = (article: Article, count = 6) => getRelatedArticles(article, count);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export const formatViews = (views: number) =>
  views >= 1000 ? `${(views / 1000).toFixed(views >= 10000 ? 0 : 1)}k` : `${views}`;
