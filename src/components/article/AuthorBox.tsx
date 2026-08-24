import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowUpRight } from "lucide-react";
import type { Author } from "@/data/site";
import { PinterestIcon } from "@/components/site/icons";

interface AuthorBoxProps {
  author: Author;
}

export function AuthorBox({ author }: AuthorBoxProps) {
  if (!author) return null;

  return (
    <div className="my-12 overflow-hidden rounded-3xl border border-border/80 bg-surface p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Avatar / Initials */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 font-display text-2xl font-bold text-primary-foreground shadow-md">
          {author.initials}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Written By Editorial Team
              </span>
              <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                <Link
                  to="/author/$slug"
                  params={{ slug: author.slug }}
                  className="hover:text-primary transition-colors"
                >
                  {author.name}
                </Link>
              </h3>
              <p className="text-xs font-medium text-foreground-muted">{author.role}</p>
            </div>

            {/* Pinterest & Profile Links */}
            <div className="flex flex-wrap items-center gap-2">
              {author.pinterest && (
                <a
                  href={author.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#e60023] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#c9001f]"
                >
                  <PinterestIcon className="h-3.5 w-3.5" />
                  <span>Follow on Pinterest</span>
                </a>
              )}
              <Link
                to="/author/$slug"
                params={{ slug: author.slug }}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-surface-hover hover:text-primary"
              >
                <span>View Bio</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <p className="mt-4 text-xs font-normal leading-relaxed text-foreground-muted sm:text-sm">
            {author.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
