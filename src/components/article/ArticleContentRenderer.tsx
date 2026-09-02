import React from "react";
import { Link } from "@tanstack/react-router";

interface ContentRendererProps {
  text: string;
  className?: string;
}

/**
 * Parses inline markdown: links [text](url), bold **text**, and italics *text*.
 */
export function parseInline(text: string): React.ReactNode[] {
  // Regex to match [text](url), **bold**, or *italic*
  const tokenRegex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    const fullMatch = match[0];
    const matchIndex = match.index;

    // Push preceding plain text
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    if (match[1] !== undefined && match[2] !== undefined) {
      // Markdown link: [text](url)
      const linkText = match[1];
      let cleanUrl = match[2].trim();

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
            key={`${matchIndex}-link-${linkText}`}
            to={routePath as string}
            className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary"
          >
            {linkText}
          </Link>,
        );
      } else {
        parts.push(
          <a
            key={`${matchIndex}-link-${linkText}`}
            href={cleanUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary"
          >
            {linkText}
          </a>,
        );
      }
    } else if (match[3] !== undefined) {
      // Bold text: **text**
      parts.push(
        <strong key={`${matchIndex}-bold`} className="font-semibold text-foreground">
          {match[3]}
        </strong>,
      );
    } else if (match[4] !== undefined) {
      // Italic text: *text*
      parts.push(
        <em key={`${matchIndex}-italic`} className="italic text-foreground/90">
          {match[4]}
        </em>,
      );
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

/**
 * Parses markdown-style tables and text with inline links/formatting into proper components.
 */
export function ArticleContentRenderer({ text, className = "" }: ContentRendererProps) {
  // Check if text is a Markdown table
  const trimmed = text.trim();
  if (trimmed.startsWith("|") && trimmed.includes("---")) {
    const rawLines = trimmed
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("|") && l.endsWith("|"));

    const firstLine = rawLines[0];
    if (rawLines.length >= 2 && firstLine) {
      const headers = firstLine
        .slice(1, -1)
        .split("|")
        .map((cell) => cell.trim());

      const dataRows = rawLines.slice(2).map((row) =>
        row
          .slice(1, -1)
          .split("|")
          .map((cell) => cell.trim()),
      );

      return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-border/80 bg-surface shadow-sm">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-background-subtle/70 text-foreground">
                {headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 sm:py-3.5 font-display text-xs sm:text-sm font-bold"
                  >
                    {parseInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className="transition-colors hover:bg-primary/5">
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="px-4 py-3 sm:py-3.5 text-foreground-muted leading-relaxed align-middle"
                    >
                      {parseInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  const parts = parseInline(text);
  return <p className={`leading-relaxed text-foreground-muted ${className}`}>{parts}</p>;
}
