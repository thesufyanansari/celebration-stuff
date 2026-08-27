import { useEffect, useState } from "react";
import { List, ChevronDown } from "lucide-react";

export type TocHeading = {
  id: string;
  text: string;
  level: number;
};

interface TableOfContentsProps {
  selector?: string;
  isMobileDrawer?: boolean;
}

export function ArticleTableOfContents({
  selector = "main article",
  isMobileDrawer = false,
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Collect all h2 and h3 elements within the article
    const headingElements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(`${selector} h2, ${selector} h3`),
    );

    const items: TocHeading[] = headingElements
      .map((el, i) => {
        // Skip headings inside sidebar, ads, or footer
        if (el.closest("aside") || el.closest("footer")) return null;

        if (!el.id) {
          el.id = `heading-${i}-${el.innerText
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")}`;
        }

        return {
          id: el.id,
          text: el.innerText.replace(/^\d+\.\s*/, ""), // keep display clean
          level: el.tagName === "H2" ? 2 : 3,
        };
      })
      .filter((item): item is TocHeading => item !== null && item.text.trim().length > 0);

    setHeadings(items);

    if (items.length > 0 && items[0] && !activeId) {
      setActiveId(items[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px" },
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, activeId]);

  if (headings.length === 0) return null;

  // Render for Mobile / Collapsible Banner
  if (isMobileDrawer) {
    return (
      <div className="mb-8 block rounded-2xl border border-primary/20 bg-surface p-4 shadow-sm lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-between font-display text-sm font-bold text-foreground"
        >
          <span className="flex items-center gap-2">
            <List className="h-4 w-4 text-primary" />
            <span>In This Article ({headings.length} sections)</span>
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isMobileOpen ? "rotate-180 text-primary" : ""
            }`}
          />
        </button>

        {isMobileOpen && (
          <ul className="mt-3 flex flex-col gap-2 border-t border-border/60 pt-3 text-xs">
            {headings.map((item, idx) => (
              <li key={item.id} className={item.level === 3 ? "pl-3 text-foreground-muted" : ""}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileOpen(false);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`block py-1 transition-colors ${
                    activeId === item.id
                      ? "font-bold text-primary"
                      : "text-foreground-muted hover:text-primary"
                  }`}
                >
                  {item.level === 2 ? `${idx + 1}. ` : "• "}
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Render for Desktop Sticky Sidebar
  return (
    <nav
      className="rounded-3xl border border-border/80 bg-surface p-5 shadow-card"
      aria-label="Table of Contents"
    >
      <div className="flex items-center gap-2 border-b border-border/60 pb-3 font-display text-sm font-bold text-foreground">
        <List className="h-4 w-4 text-primary" />
        <span>In This Article</span>
      </div>

      <ul className="mt-3.5 flex max-h-[50vh] flex-col gap-1.5 overflow-y-auto pr-1 text-xs">
        {headings.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group flex items-start gap-2 rounded-lg px-2.5 py-1.5 transition-all ${
                  isActive
                    ? "bg-primary/10 font-bold text-primary"
                    : "text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                }`}
              >
                <span
                  className={`mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                    isActive ? "bg-primary" : "bg-border group-hover:bg-primary/50"
                  }`}
                />
                <span className="line-clamp-2 leading-snug">{item.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
