import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { primaryButtonClass, secondaryButtonClass } from "@/components/state-panel";
import { Toaster } from "@/components/ui/sonner";
import { THEME_INIT_SCRIPT, ThemeProvider, useTheme } from "@/lib/theme";

function NotFoundComponent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path === "/company" || path === "/company/" || path.startsWith("/company?")) {
        try {
          const stored = localStorage.getItem("selected-company");
          if (stored) {
            let companyId: string | null = null;
            try {
              const parsed = JSON.parse(stored);
              companyId = parsed.companyId || parsed.id || null;
            } catch {
              companyId = stored.trim();
            }
            if (companyId) {
              window.location.replace(`/company/${companyId}`);
              return;
            }
          }
        } catch (e) {
          console.warn("Could not retrieve selected-company from localStorage", e);
        }
      }
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <p
          aria-hidden
          className="text-[7rem] font-semibold leading-none tracking-tighter text-border-strong sm:text-[10rem] lg:col-span-5"
        >
          404
        </p>
        <div className="lg:col-span-7 lg:border-l lg:border-border lg:pl-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Page not found
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            This page is not listed in the directory.
          </h1>
          <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
            The link may be out of date, or the page may have moved. Head back to the directory to
            keep researching companies.
          </p>
          <div className="mt-8">
            <Link to="/" className={primaryButtonClass}>
              Back to Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Error</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Something went wrong on our end. You can try again or head back to the directory.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={primaryButtonClass}
          >
            Try again
          </button>
          <a href="/" className={secondaryButtonClass}>
            Back to Directory
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CorporateDNA | Employer Intelligence Platform" },
      {
        name: "description",
        content:
          "Deep-tier corporate intelligence, culture audits, and financial due diligence for modern job seekers.",
      },
      { property: "og:title", content: "CorporateDNA | Employer Intelligence Platform" },
      {
        property: "og:description",
        content:
          "Deep-tier corporate intelligence, culture audits, and financial due diligence for modern job seekers.",
      },
      { property: "og:site_name", content: "CorporateDNA" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
        <meta name="darkreader-lock" content="" />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ThemedToaster() {
  const { theme } = useTheme();
  return <Toaster
      theme={theme}
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "!rounded-md !border-border !bg-card !text-foreground !shadow-none",
          description: "!text-muted-foreground",
        },
      }}
    />;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
          <SiteHeader />
          <main className="flex-1 pt-16 bg-background text-foreground transition-colors duration-200">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <ThemedToaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
