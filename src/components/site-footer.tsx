import { Link } from "@tanstack/react-router";

import { Wordmark } from "./site-header";

const linkClass =
  "rounded-sm px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
          <Wordmark />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Employer intelligence for modern job seekers. Run a corporate audit on any company
            before you apply.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            © {year} CorporateDNA. All rights reserved.
          </p>
        </div>
        <nav aria-label="Footer" className="-ml-3 flex flex-wrap gap-1 md:ml-0">
          <Link to="/" className={linkClass}>
            Directory
          </Link>
          <Link to="/privacy" className={linkClass}>
            Privacy Policy
          </Link>
          <Link to="/tos" className={linkClass}>
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
