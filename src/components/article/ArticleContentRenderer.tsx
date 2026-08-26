import React from "react";
import { Link } from "@tanstack/react-router";

interface ContentRendererProps {
  text: string;
  className?: string;
}

/**
 * Parses markdown-style links [Anchor Text](url) into proper internal TanStack Links or external <a> tags.
 */
export function ArticleContentRenderer({ text, className = "" }: ContentRendererProps) {
  // Regex to match [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, linkText, rawUrl] = match;
    const matchIndex = match.index;

    // Push preceding plain text
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    // Clean URL
    let cleanUrl = rawUrl.trim();
    // Normalize file:/// or full paths if any to site routes
    if (cleanUrl.includes("src/articles/")) {
      const matchSlug = cleanUrl.match(/src\/articles\/(?:[^/]+\/)?([^.]+)/);
      if (matchSlug && matchSlug[1]) {
        cleanUrl = `/article/${matchSlug[1]}`;
      }
    } else if (cleanUrl.startsWith("file:///")) {
      const matchSlug = cleanUrl.match(/\/([^/]+)\.ts$/);
      if (matchSlug && matchSlug[1]) {
        cleanUrl = `/article/${matchSlug[1]}`;
      }
    }

    const isInternal = cleanUrl.startsWith("/") || cleanUrl.includes("celebrationstuff.com");

    if (isInternal) {
      const routePath = cleanUrl.replace("https://celebrationstuff.com", "");
      parts.push(
        <Link
          key={`${matchIndex}-${linkText}`}
          // @ts-expect-error tanstack dynamic route
          to={routePath}
          className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary"
        >
          {linkText}
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={`${matchIndex}-${linkText}`}
          href={cleanUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary"
        >
          {linkText}
        </a>,
      );
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <p className={`leading-relaxed text-foreground-muted ${className}`}>{parts}</p>;
}
