import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { CompanyLogo } from "@/components/company-logo";
import { primaryButtonClass, secondaryButtonClass, StatePanel } from "@/components/state-panel";
import { useFetchToasts } from "@/hooks/use-fetch-toasts";
import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  companiesQueryOptions,
  DirectoryNotConnectedError,
  filterCompanies,
  getCompanyId,
  getCompanyName,
  getLogoFallbackUrl,
  getLogoUrl,
  getShortName,
  groupByInitial,
  type DataRecord,
} from "@/lib/directory";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { q?: string } =>
    typeof search["q"] === "string" && search["q"].length > 0 ? { q: search["q"] } : {},
  head: () => ({
    meta: [
      { title: "JSS University Noida | Student Career Hub (CorporateDNA)" },
      {
        name: "description",
        content:
          "Explore company profiles, skill expectations, and career signals before campus placements.",
      },
      { property: "og:title", content: "JSS University Noida | Student Career Hub (CorporateDNA)" },
      {
        property: "og:description",
        content:
          "Explore company profiles, skill expectations, and career signals before campus placements.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DirectoryPage,
});

const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

const CATEGORY_FILTERS = [
  { id: "All", label: "All", regex: /.*/ },
  { id: "Tech", label: "Tech", regex: /tech|software|saas|cloud|data|ai|cyber/i },
  { id: "Finance", label: "Finance", regex: /fintech|bank|finance|wealth|invest|lending/i },
  { id: "Consulting", label: "Consulting", regex: /consult|service|analytics|transformation/i },
  { id: "Enterprise", label: "Enterprise", regex: /enterprise|large cap|conglomerate|mature/i },
  { id: "Startup", label: "Startup", regex: /startup|scale-up|unicorn/i },
] as const;

function DirectoryPage() {
  const { q = "" } = Route.useSearch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const query = useQuery(companiesQueryOptions);

  const [searchTerm, setSearchTerm] = useState(q);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useFetchToasts({
    id: "directory",
    error: query.error,
    hasData: Boolean(query.data),
    errorTitle: "Could not load the company directory",
    successTitle: "Directory loaded",
  });

  const companies = useMemo(() => query.data ?? [], [query.data]);

  // Synchronize internal input value if URL 'q' changes externally
  useEffect(() => {
    setSearchTerm(q);
  }, [q]);

  // Debounce search update by 250ms
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== q) {
        navigate({ to: "/", search: searchTerm ? { q: searchTerm } : {}, replace: true, resetScroll: false });
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm, q, navigate]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of CATEGORY_FILTERS) {
      if (cat.id === "All") {
        counts[cat.id] = companies.length;
      } else {
        counts[cat.id] = companies.filter((c) => {
          const text = [
            getCompanyName(c),
            getShortName(c),
            c["category"],
            c["nature_of_company"],
            c["overview_text"],
          ]
            .filter(Boolean)
            .join(" ");
          return cat.regex.test(text);
        }).length;
      }
    }
    return counts;
  }, [companies]);

  const filtered = useMemo(() => {
    let result = filterCompanies(companies, q);
    if (selectedCategory !== "All") {
      const def = CATEGORY_FILTERS.find((c) => c.id === selectedCategory);
      if (def) {
        result = result.filter((company) => {
          const text = [
            getCompanyName(company),
            getShortName(company),
            company["category"],
            company["nature_of_company"],
            company["overview_text"],
          ]
            .filter(Boolean)
            .join(" ");
          return def.regex.test(text);
        });
      }
    }
    return result;
  }, [companies, q, selectedCategory]);

  const groups = useMemo(() => groupByInitial(filtered), [filtered]);

  const setSearch = (value: string) => {
    setSearchTerm(value);
    navigate({ to: "/", search: value ? { q: value } : {}, replace: true, resetScroll: false });
  };

  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash === "#directory-grid") {
        setTimeout(() => {
          const el = document.getElementById("directory-grid");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 350);
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isLoading = query.isPending || isInitialLoading;

  const status = isLoading
    ? "Loading companies"
    : query.error
      ? "Directory unavailable"
      : q || selectedCategory !== "All"
        ? `${filtered.length} of ${companies.length} companies match filters`
        : `${companies.length} companies, sorted A to Z`;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background">
        {/* Prominent top-center emerald ambient glow strictly below the Navbar */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -top-20 -translate-x-1/2 w-full max-w-6xl h-[32rem] rounded-full blur-[110px] opacity-40 dark:opacity-85 bg-gradient-to-b from-emerald-300/40 via-emerald-200/20 to-transparent dark:from-emerald-500/35 dark:via-emerald-700/20 dark:to-transparent"
        />
        {/* Accent glow diffusing directly behind the Metrics Card */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[5%] top-2 w-[28rem] h-[22rem] rounded-full blur-[90px] opacity-25 dark:opacity-60 bg-gradient-to-br from-emerald-400/25 to-transparent dark:from-emerald-400/30 dark:to-transparent"
        />

        <div className={`relative ${container} pb-12 pt-14 sm:pt-20 lg:pb-16 lg:pt-24`}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 lg:items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#047857] dark:text-[#10B981]">
                  PLACEMENT INTELLIGENCE PLATFORM
                </p>
                <h1 className="mt-5 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.5rem] text-slate-900 dark:text-white">
                  Do Your Due Diligence
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Go beyond standard job boards. Audit a company's financial health, psychological safety, and true work culture before you apply.
                </p>
              </motion.div>
            </div>

            {/* Frosted Glassmorphism Metrics Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="backdrop-blur-xl bg-white/50 border border-white/70 shadow-lg dark:bg-black/35 dark:border-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-2xl p-6 relative overflow-hidden">
                {/* Specular glass edge highlight */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-emerald-400/30 to-transparent"
                />
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/10 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-semibold tracking-wide text-emerald-600 dark:text-emerald-400">
                      Live Database
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    Verified Intelligence
                  </span>
                </div>

                <dl className="mt-4 text-sm">
                  <div className="flex items-baseline justify-between py-2">
                    <dt className="text-muted-foreground">Companies indexed</dt>
                    <dd className="font-semibold tabular-nums text-lg text-[#047857] dark:text-[#10B981]">
                      {query.data ? (
                        companies.length
                      ) : (
                        <span className="font-normal text-xs text-muted-foreground">
                          {query.isPending ? "Syncing..." : "Unavailable"}
                        </span>
                      )}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between py-2 border-t border-emerald-500/10 dark:border-emerald-500/15">
                    <dt className="text-muted-foreground">Parameters per company</dt>
                    <dd className="font-semibold tabular-nums text-lg text-[#047857] dark:text-[#10B981]">
                      163
                    </dd>
                  </div>
                </dl>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 lg:mt-16"
          >
            <label htmlFor="company-search" className="sr-only">
              Search companies, industries, or locations
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                ref={inputRef}
                id="company-search"
                type="search"
                autoComplete="off"
                spellCheck={false}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search companies, industries, or locations"
                className="h-16 w-full rounded-md border border-[#059669] bg-card pl-14 pr-16 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 dark:border-[#10B981]/55 hover:border-[#059669] dark:hover:border-[#10B981]/70 focus:border-[#059669] dark:focus:border-[#10B981] focus:ring-4 focus:ring-[#059669]/20 dark:focus:ring-[#10B981]/20 sm:text-lg [&::-webkit-search-cancel-button]:hidden"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {searchTerm ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      inputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                ) : (
                  <kbd className="hidden h-7 min-w-7 items-center justify-center rounded-sm border border-border px-2 font-sans text-xs text-muted-foreground sm:flex">
                    /
                  </kbd>
                )}
              </div>
            </div>

            {/* Live Count Category Filter Pills */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
                Category:
              </span>
              {CATEGORY_FILTERS.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] ?? 0;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(isSelected && cat.id !== "All" ? "All" : cat.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-medium transition-all duration-200 backdrop-blur-md cursor-pointer border",
                      isSelected
                        ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-700 dark:text-emerald-300 shadow-xs"
                        : "bg-white/40 dark:bg-black/30 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-emerald-500/30 hover:text-emerald-600 dark:hover:text-emerald-300"
                    )}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={cn(
                        "text-[10px] tabular-nums font-mono",
                        isSelected ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "opacity-70"
                      )}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
              {status}
            </p>
          </motion.div>
        </div>
      </section>

      <section
        id="directory-grid"
        aria-labelledby="directory-heading"
        className={`${container} py-12 lg:py-16 scroll-mt-20`}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="directory-heading" className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Company directory
          </h2>
          <span className="text-sm text-muted-foreground">A to Z</span>
        </div>

        <div className="mt-6">
          {isLoading ? (
            <SkeletonGrid />
          ) : query.error ? (
            <StatePanel
              eyebrow={query.error instanceof DirectoryNotConnectedError ? "Not connected" : "Loading failed"}
              title={
                query.error instanceof DirectoryNotConnectedError
                  ? "The company database is not connected yet."
                  : "We could not load the directory."
              }
              description={
                query.error instanceof DirectoryNotConnectedError
                  ? "Once the database is linked, every company will appear here automatically."
                  : query.error.message
              }
              actions={
                <button type="button" onClick={() => query.refetch()} className={primaryButtonClass}>
                  {query.isFetching ? "Retrying..." : "Try again"}
                </button>
              }
            />
          ) : companies.length === 0 ? (
            <StatePanel
              eyebrow="Empty directory"
              title="No companies have been added yet."
              description="Companies will appear here as soon as they are added to the database."
            />
          ) : filtered.length === 0 ? (
            <StatePanel
              eyebrow="No matches"
              title={`Nothing matches "${q}".`}
              description="Try a shorter search, or check the spelling of the company or its short name."
              actions={
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                  }}
                  className={secondaryButtonClass}
                >
                  Clear search
                </button>
              }
            />
          ) : (
            <div>
              {groups.map((group) => (
                <div
                  key={group.letter}
                  className="grid gap-4 border-t border-border py-8 first:border-t-0 first:pt-2 lg:grid-cols-[4rem_minmax(0,1fr)] lg:gap-6"
                >
                  <h3 className="text-2xl font-semibold tracking-tight text-muted-foreground lg:sticky lg:top-24 lg:self-start">
                    {group.letter}
                  </h3>
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5">
                    {group.items.map((company) => (
                      <CompanyCard key={getCompanyId(company)} company={company} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function CompanyCard({ company }: { company: DataRecord }) {
  const id = getCompanyId(company);
  const name = getCompanyName(company);
  const shortName = getShortName(company);

  const handleSelect = () => {
    try {
      localStorage.setItem(
        "selected-company",
        JSON.stringify({
          companyId: id,
          id,
          name,
          shortName,
          selectedAt: new Date().toISOString(),
        })
      );
    } catch (err) {
      console.warn("Failed to persist selected-company in localStorage", err);
    }
  };

  return (
    <li className="min-w-0">
      <Link
        to="/company/$id"
        params={{ id }}
        onClick={handleSelect}
        className="group flex h-full flex-col items-center justify-center rounded-md border border-emerald-700/40 dark:border-emerald-500/45 bg-card p-4 text-center transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-1 hover:border-emerald-600 focus-visible:-translate-y-1 focus-visible:border-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/25"
      >
        <CompanyLogo
          id={id}
          name={name}
          src={getLogoUrl(company)}
          fallbackSrc={getLogoFallbackUrl(id)}
          className="h-16 w-16"
          imgClassName="saturate-50 opacity-90 transition duration-300 group-hover:saturate-150 group-hover:opacity-100"
          initialsClassName="text-lg"
        />
        <p className="mt-4 text-xs font-medium text-slate-600 dark:text-slate-300 text-center line-clamp-1">
          {name}
        </p>
        {shortName && shortName !== name && (
          <span className="mt-0.5 block text-[11px] text-muted-foreground line-clamp-1">{shortName}</span>
        )}
      </Link>
    </li>
  );
}

function SkeletonGrid() {
  return (
    <div
      aria-hidden
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-4 pt-4"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white/5 border border-white/10 rounded-xl h-64 flex flex-col items-center justify-center p-6 gap-4 backdrop-blur-md"
        >
          <div className="h-16 w-16 rounded-xl bg-white/10 border border-white/10" />
          <div className="h-4 w-28 rounded-md bg-white/10" />
          <div className="h-3 w-16 rounded-md bg-white/5" />
        </div>
      ))}
    </div>
  );
}
