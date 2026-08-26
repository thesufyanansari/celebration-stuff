export const site = {
  name: "Celebration Stuff",
  tagline: "Celebration ideas for every moment",
  description:
    "Inspiration for holidays, parties, gifts, seasonal decorating, and life's special occasions.",
  social: {
    pinterest: "https://www.pinterest.com/celebrationstuff/",
    instagram: "https://www.instagram.com/celebrationstuff/",
    facebook: "https://www.facebook.com/celebrationstuff/",
  },
  email: "hello@celebrationstuff.com",
};

export type CategoryGroup =
  "people" | "occasions" | "holidays" | "life-events" | "styles" | "general";

export type Category = {
  slug: string;
  name: string;
  description: string;
  group?: CategoryGroup;
  parentSlug?: string;
};

export const categories: Category[] = [
  // Primary General Categories
  {
    slug: "gifts",
    name: "Gifts",
    description:
      "Thoughtful gift guides for birthdays, weddings, housewarmings, holidays and hard-to-shop-for people.",
    group: "general",
  },
  {
    slug: "holidays",
    name: "Holidays",
    description:
      "Christmas, Thanksgiving, Halloween, Easter, Eid and every holiday in between — decorating, hosting and gifting ideas.",
    group: "general",
  },
  {
    slug: "parties-celebrations",
    name: "Parties & Celebrations",
    description:
      "Birthday parties, showers, graduations and dinner parties — themes, tablescapes, food and favors.",
    group: "general",
  },
  {
    slug: "seasonal-decor",
    name: "Seasonal Decor",
    description:
      "Spring, summer, fall and winter decorating ideas for the front porch, mantel, table and entryway.",
    group: "general",
  },
  {
    slug: "life-events",
    name: "Life Events",
    description:
      "Engagements, weddings, new babies, anniversaries, retirements and the milestones worth marking.",
    group: "general",
  },
  {
    slug: "home-entertaining",
    name: "Home & Entertaining",
    description:
      "Hosting playbooks, tablescapes, menus and small-space entertaining that feels effortless.",
    group: "general",
  },
  {
    slug: "planning-ideas",
    name: "Planning & Ideas",
    description:
      "Checklists, timelines and budget guides that turn a good idea into a celebration that actually happens.",
    group: "general",
  },

  // Gifts for People / Relationships
  {
    slug: "gifts-for-women",
    name: "Gifts for Women",
    description:
      "Curated gift guides for women, mothers, wives, girlfriends, sisters and female friends.",
    group: "people",
  },
  {
    slug: "gifts-for-men",
    name: "Gifts for Men",
    description:
      "Thoughtful gift ideas for men, fathers, husbands, boyfriends, brothers and male friends.",
    group: "people",
  },
  {
    slug: "gifts-for-mom",
    name: "Gifts for Mom",
    description:
      "Heartfelt and practical gift guides for mothers, grandmothers, and mother figures.",
    group: "people",
    parentSlug: "gifts-for-women",
  },
  {
    slug: "gifts-for-dad",
    name: "Gifts for Dad",
    description: "Meaningful, unique, and useful gift recommendations for dads and grandfathers.",
    group: "people",
    parentSlug: "gifts-for-men",
  },
  {
    slug: "gifts-for-girlfriend",
    name: "Gifts for Girlfriend",
    description: "Romantic, fun, and memorable gift ideas for your girlfriend or partner.",
    group: "people",
    parentSlug: "gifts-for-women",
  },
  {
    slug: "gifts-for-boyfriend",
    name: "Gifts for Boyfriend",
    description: "Unique, practical, and personal gift guides for your boyfriend.",
    group: "people",
    parentSlug: "gifts-for-men",
  },
  {
    slug: "gifts-for-kids",
    name: "Gifts for Kids",
    description: "Creative, fun, and educational gift ideas for toddlers, children, and teens.",
    group: "people",
  },

  // Occasions
  {
    slug: "birthday-gifts",
    name: "Birthday Gifts",
    description: "Best birthday gift ideas across every age, milestone, and personality.",
    group: "occasions",
  },
  {
    slug: "wedding-gifts",
    name: "Wedding Gifts",
    description:
      "Memorable wedding and registry gift ideas for couples starting their lives together.",
    group: "occasions",
  },
  {
    slug: "anniversary-gifts",
    name: "Anniversary Gifts",
    description: "Traditional, modern, and thoughtful milestone anniversary gift guides.",
    group: "occasions",
  },
  {
    slug: "housewarming-gifts",
    name: "Housewarming Gifts",
    description: "Practical and beautiful gifts for new homeowners, apartment moves, and hosts.",
    group: "occasions",
  },

  // Holidays
  {
    slug: "christmas-gifts",
    name: "Christmas & Holiday Gifts",
    description: "Festive Christmas gift guides, stocking stuffers, and holiday shopping lists.",
    group: "holidays",
    parentSlug: "holidays",
  },
  {
    slug: "thanksgiving",
    name: "Thanksgiving",
    description: "Hosting playbooks, tablescapes, and host gifts for Thanksgiving celebrations.",
    group: "holidays",
    parentSlug: "holidays",
  },
  {
    slug: "eid-ramadan",
    name: "Eid & Ramadan",
    description:
      "Warm decor, family gifts, dates trays, and celebration hosting for Eid and Ramadan.",
    group: "holidays",
    parentSlug: "holidays",
  },

  // Life Events & Milestones
  {
    slug: "bridal-shower",
    name: "Bridal & Baby Showers",
    description: "Shower hosting ideas, brunch plans, party themes, and gift registries.",
    group: "life-events",
    parentSlug: "life-events",
  },

  // Gift Styles & Collections
  {
    slug: "minimalist-gifts",
    name: "Gifts for People Who Have Everything",
    description: "Consumables, upgrades, and experience gifts that never end up in donation boxes.",
    group: "styles",
  },
  {
    slug: "budget-gifts",
    name: "Budget & Small Gifts",
    description: "High-impact, affordable gift ideas under $25, $50, and stocking stuffers.",
    group: "styles",
  },
];

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  pinterest: string;
  instagram?: string;
};

export const authors: Author[] = [
  {
    slug: "sarah-linden",
    name: "Sarah Linden",
    role: "Founder & Holiday Editor",
    bio: "Sarah has styled seasonal shoots for lifestyle brands for over a decade and hosts far too many dinner parties from a small Toronto kitchen. She writes about holidays, tablescapes and decorating you can actually pull off in a weekend.",
    initials: "SL",
    pinterest: "https://www.pinterest.com/celebrationstuff/",
    instagram: "https://www.instagram.com/celebrationstuff/",
  },
  {
    slug: "maya-okafor",
    name: "Maya Okafor",
    role: "Gifts & Shopping Editor",
    bio: "Maya spends her year testing, wrapping and re-gifting so you don't have to. She covers gift guides, budgets and the art of finding something genuinely good for the person who says they want nothing.",
    initials: "MO",
    pinterest: "https://www.pinterest.com/celebrationstuff/",
  },
  {
    slug: "daniel-reyes",
    name: "Daniel Reyes",
    role: "Party & Entertaining Editor",
    bio: "A former event planner turned writer, Daniel has run everything from 200-person weddings to a four-year-old's dinosaur party. He writes practical timelines, menus and party plans.",
    initials: "DR",
    pinterest: "https://www.pinterest.com/celebrationstuff/",
  },
];

export const getAuthor = (slug: string) => authors.find((a) => a.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
