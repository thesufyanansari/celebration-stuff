import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { Faq } from "@/data/articles";

interface ArticleFAQProps {
  faqs: Faq[];
  title?: string;
}

export function ArticleFAQ({
  faqs,
  title = "Frequently Asked Questions",
}: ArticleFAQProps) {
  if (!faqs || faqs.length === 0) return null;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="my-12 rounded-3xl border border-border/80 bg-surface p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <HelpCircle className="h-4 w-4" />
        <span>Buyer Questions Answered</span>
      </div>
      <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>

      <div className="mt-6 divide-y divide-border/60">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={i} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggleFaq(i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between text-left font-display text-base font-bold text-foreground transition-colors hover:text-primary sm:text-lg"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-foreground-muted transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-3 text-xs leading-relaxed text-foreground-muted sm:text-sm animate-in fade-in duration-200">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
