import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";
import { FacebookIcon, InstagramIcon, PinterestIcon } from "./icons";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-background-subtle">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-1">
          <span className="font-display text-lg font-semibold">Celebration Stuff</span>
          <p className="mt-3 max-w-xs text-sm text-foreground-muted">
            Thoughtful gift guides, holiday recommendations, and curated occasion shopping across the US and Canada.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href={site.social.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Celebration Stuff on Pinterest"
              className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <PinterestIcon className="h-4 w-4" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Celebration Stuff on Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground-muted transition-colors hover:text-foreground"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Celebration Stuff on Facebook"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground-muted transition-colors hover:text-foreground"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <FooterColumn title="Gifts For">
          <Link to="/category/$slug" params={{ slug: "gifts-for-women" }} className="footer-link">
            Gifts for Women
          </Link>
          <Link to="/category/$slug" params={{ slug: "gifts-for-men" }} className="footer-link">
            Gifts for Men
          </Link>
          <Link to="/category/$slug" params={{ slug: "gifts-for-mom" }} className="footer-link">
            Gifts for Mom
          </Link>
          <Link to="/category/$slug" params={{ slug: "gifts-for-dad" }} className="footer-link">
            Gifts for Dad
          </Link>
          <Link to="/category/$slug" params={{ slug: "gifts-for-kids" }} className="footer-link">
            Gifts for Kids
          </Link>
        </FooterColumn>

        <FooterColumn title="Occasions">
          <Link to="/category/$slug" params={{ slug: "birthday-gifts" }} className="footer-link">
            Birthday Gifts
          </Link>
          <Link to="/category/$slug" params={{ slug: "wedding-gifts" }} className="footer-link">
            Wedding Gifts
          </Link>
          <Link to="/category/$slug" params={{ slug: "anniversary-gifts" }} className="footer-link">
            Anniversary Gifts
          </Link>
          <Link to="/category/$slug" params={{ slug: "housewarming-gifts" }} className="footer-link">
            Housewarming Gifts
          </Link>
        </FooterColumn>

        <FooterColumn title="Holidays">
          <Link to="/category/$slug" params={{ slug: "christmas-gifts" }} className="footer-link">
            Christmas Gifts
          </Link>
          <Link to="/category/$slug" params={{ slug: "thanksgiving" }} className="footer-link">
            Thanksgiving
          </Link>
          <Link to="/category/$slug" params={{ slug: "eid-ramadan" }} className="footer-link">
            Eid & Ramadan
          </Link>
          <Link to="/category/$slug" params={{ slug: "minimalist-gifts" }} className="footer-link">
            Gifts for Minimalists
          </Link>
        </FooterColumn>

        <FooterColumn title="Company">
          <Link to="/about" className="footer-link">
            About Us
          </Link>
          <Link to="/contact" className="footer-link">
            Contact
          </Link>
          <Link to="/privacy" className="footer-link">
            Privacy Policy
          </Link>
          <Link to="/terms" className="footer-link">
            Terms of Use
          </Link>
          <Link to="/affiliate-disclosure" className="footer-link">
            Affiliate Disclosure
          </Link>
        </FooterColumn>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-caption sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Celebration Stuff. All rights reserved.</p>
          <p>
            Celebration Stuff earns commission from qualifying purchases made through links on this site.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-overline">{title}</h2>
      <div className="mt-4 grid gap-2 text-sm [&_.footer-link]:text-foreground-muted [&_.footer-link]:transition-colors hover:[&_.footer-link]:text-primary">
        {children}
      </div>
    </div>
  );
}

