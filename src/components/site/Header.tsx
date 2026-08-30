import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { categories, site } from "@/data/site";
import { PinterestIcon } from "./icons";

const giftsForPeople = [
  { slug: "gifts-for-women", name: "Gifts for Women" },
  { slug: "gifts-for-men", name: "Gifts for Men" },
  { slug: "gifts-for-mom", name: "Gifts for Mom" },
  { slug: "gifts-for-dad", name: "Gifts for Dad" },
  { slug: "gifts-for-girlfriend", name: "Gifts for Girlfriend" },
  { slug: "gifts-for-boyfriend", name: "Gifts for Boyfriend" },
  { slug: "gifts-for-kids", name: "Gifts for Kids" },
];

const occasions = [
  { slug: "birthday-gifts", name: "Birthday Gifts" },
  { slug: "wedding-gifts", name: "Wedding Gifts" },
  { slug: "anniversary-gifts", name: "Anniversary Gifts" },
  { slug: "housewarming-gifts", name: "Housewarming Gifts" },
];

const holidays = [
  { slug: "halloween", name: "Halloween Ideas" },
  { slug: "thanksgiving", name: "Thanksgiving" },
  { slug: "christmas-gifts", name: "Christmas Gifts" },
  { slug: "eid-ramadan", name: "Eid & Ramadan" },
];

const collections = [
  { slug: "minimalist-gifts", name: "Gifts for People Who Have Everything" },
  { slug: "budget-gifts", name: "Budget Gifts" },
];

const navLinkClass =
  "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground cursor-pointer";

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${site.name} home`}
        >
          <img
            src="/logo.png"
            alt="Celebration Stuff Logo"
            width={36}
            height={36}
            decoding="async"
            className="h-9 w-9 rounded-full object-cover shadow-sm transition-transform duration-300 hover:scale-105"
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            Celebration<span className="text-primary">&nbsp;Stuff</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Main">
          <Link to="/explore" className={navLinkClass}>
            Explore
          </Link>

          {/* Gifts For Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("gifts")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button type="button" className={navLinkClass}>
              <span>Gifts For</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {activeMenu === "gifts" && (
              <div className="absolute left-0 top-full w-52 rounded-2xl border border-border bg-surface p-2 shadow-lift">
                {giftsForPeople.map((item) => (
                  <Link
                    key={item.slug}
                    to="/category/$slug"
                    params={{ slug: item.slug }}
                    className="block rounded-xl px-3 py-2 text-xs font-medium text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Occasions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("occasions")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button type="button" className={navLinkClass}>
              <span>Occasions</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {activeMenu === "occasions" && (
              <div className="absolute left-0 top-full w-48 rounded-2xl border border-border bg-surface p-2 shadow-lift">
                {occasions.map((item) => (
                  <Link
                    key={item.slug}
                    to="/category/$slug"
                    params={{ slug: item.slug }}
                    className="block rounded-xl px-3 py-2 text-xs font-medium text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Holidays Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("holidays")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button type="button" className={navLinkClass}>
              <span>Holidays</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {activeMenu === "holidays" && (
              <div className="absolute left-0 top-full w-48 rounded-2xl border border-border bg-surface p-2 shadow-lift">
                {holidays.map((item) => (
                  <Link
                    key={item.slug}
                    to="/category/$slug"
                    params={{ slug: item.slug }}
                    className="block rounded-xl px-3 py-2 text-xs font-medium text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Collections Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("collections")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button type="button" className={navLinkClass}>
              <span>Collections</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {activeMenu === "collections" && (
              <div className="absolute left-0 top-full w-60 rounded-2xl border border-border bg-surface p-2 shadow-lift">
                {collections.map((item) => (
                  <Link
                    key={item.slug}
                    to="/category/$slug"
                    params={{ slug: item.slug }}
                    className="block rounded-xl px-3 py-2 text-xs font-medium text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/explore"
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            aria-label="Search articles"
          >
            <Search className="h-4 w-4" />
          </Link>
          <a
            href={site.social.pinterest}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
          >
            <PinterestIcon className="h-4 w-4" />
            Follow on Pinterest
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-surface lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6" aria-label="Mobile">
            <Link
              to="/explore"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-surface-hover"
            >
              Explore All
            </Link>
            {giftsForPeople.map((item) => (
              <Link
                key={item.slug}
                to="/category/$slug"
                params={{ slug: item.slug }}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-xs font-medium text-foreground-muted hover:bg-surface-hover hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
