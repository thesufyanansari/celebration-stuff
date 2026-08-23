import { useEffect, useState } from "react";
import { List } from "lucide-react";

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents({ selector = "article section" }: { selector?: string }) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("article h2, article h3"),
    );

    const items: TocItem[] = headingElements.map((el, i) => {
      if (!el.id) {
        el.id = `heading-${i}-${el.innerText.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
      }
      return {
        id: el.id,
        text: el.innerText,
        level: el.tagName === "H2" ? 2 : 3,
      };
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px" },
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);

  if (headings.length === 0) return null;

  return (
    <nav className="rounded-2xl border border-border bg-surface p-5 shadow-card" aria-label="Table of Contents">
      <div className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
        <List className="h-4 w-4 text-primary" />
        <span>In This Article</span>
      </div>
      <ul className="mt-3 flex flex-col gap-2 text-xs">
        {headings.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`block transition-colors hover:text-primary ${
                activeId === item.id ? "font-semibold text-primary" : "text-foreground-muted"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
