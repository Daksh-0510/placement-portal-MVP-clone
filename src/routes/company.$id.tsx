import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, FileText, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { BottomLine } from "@/components/bottom-line";
import { CompanyLogo } from "@/components/company-logo";
import { FieldList, Unavailable, visibleEntries } from "@/components/field-value";
import { LOGISTICS_CARD_KEYS, LogisticsCard } from "@/components/logistics-card";
import { RouteError } from "@/components/route-error";
import { SkillIntelligenceView } from "@/components/skill-intelligence-view";
import { primaryButtonClass, secondaryButtonClass, StatePanel } from "@/components/state-panel";
import { useBrandColor } from "@/hooks/use-brand-color";
import { useFetchToasts } from "@/hooks/use-fetch-toasts";
import { brandCssVars } from "@/lib/brand-color";
import {
  CATEGORIES,
  CATEGORY_KEYS,
  categoryRecords,
  CEO_KEYS,
  CompanyNotFoundError,
  companiesQueryOptions,
  companyQueryOptions,
  DirectoryNotConnectedError,
  findAcrossCompany,
  getCompanyId,
  getCompanyName,
  getLogoFallbackUrl,
  getLogoUrl,
  getShortName,
  HQ_KEYS,
  IDENTITY_KEYS,
  sortCompanies,
  STAT_DEFINITIONS,
  type DataRecord,
} from "@/lib/directory";
import { classifyField } from "@/lib/fields";
import { evaluateBottomLine } from "@/lib/insights";
import { cn } from "@/lib/utils";
import { buildIntelligenceSections, type IntelligenceSection } from "@/data/intelligenceData";

export const Route = createFileRoute("/company/$id")({
  head: () => ({
    meta: [
      { title: "Company X-Ray | CorporateDNA" },
      {
        name: "description",
        content:
          "A full corporate audit: business, financials, culture, compensation, logistics, people, growth, technologies, reputation and skill levels.",
      },
      { property: "og:title", content: "Company X-Ray | CorporateDNA" },
      {
        property: "og:description",
        content: "Every due diligence parameter for this employer, grouped into ten clear categories.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompanyPage,
  errorComponent: RouteError,
  notFoundComponent: CompanyMissing,
});

const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const OVERVIEW_EXCLUDE = new Set([...IDENTITY_KEYS, ...CATEGORY_KEYS, ...CEO_KEYS]);

type Section = { slug: string; label: string; records: DataRecord[]; headquarters?: string | null };

function pad(n: number) {
  return String(n + 1).padStart(2, "0");
}

function CompanyMissing() {
  return (
    <div className={`${container} py-16 lg:py-24`}>
      <StatePanel
        eyebrow="Company not found"
        title="This company is not in the directory."
        description="The link may be out of date, or the company may have been removed from our index."
        actions={
          <Link to="/" className={primaryButtonClass}>
            Back to Directory
          </Link>
        }
      />
    </div>
  );
}

function CompanyPage() {
  const { id } = Route.useParams();
  const brand = useBrandColor(getLogoFallbackUrl(id));

  return (
    <div
      className="brand-scope"
      data-brand={brand ? "" : undefined}
      style={brand ? brandCssVars(brand) : undefined}
    >
      <CompanyContent id={id} branded={Boolean(brand)} />
    </div>
  );
}

function CompanyContent({ id, branded }: { id: string; branded: boolean }): ReactNode {
  const queryClient = useQueryClient();

  const query = useQuery({
    ...companyQueryOptions(id),
    // Seed the header with directory cache or localStorage instantly to prevent blank flash
    placeholderData: () => {
      const cached = queryClient.getQueryData(companiesQueryOptions.queryKey)?.find((c) => getCompanyId(c) === id);
      if (cached) return cached;

      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("selected-company");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && (String(parsed.id) === String(id) || String(parsed.companyId) === String(id))) {
              return parsed as DataRecord;
            }
          }
        } catch {}
      }
      return undefined;
    },
  });

  const notFound = query.error instanceof CompanyNotFoundError;

  useFetchToasts({
    id: `company-${id}`,
    error: query.error,
    hasData: Boolean(query.data) && !query.isPlaceholderData,
    errorTitle: notFound ? "Company not found" : "Could not load this company",
    successTitle: "Company profile loaded",
  });

  const company = query.data ?? null;
  const detailsLoading = query.isPending || query.isPlaceholderData;

  useEffect(() => {
    if (id) {
      try {
        localStorage.setItem(
          "selected-company",
          JSON.stringify({
            companyId: id,
            id,
            name: company ? getCompanyName(company) : undefined,
            timestamp: Date.now(),
          })
        );
      } catch (err) {
        console.warn("Could not save selected-company to localStorage", err);
      }
    }
  }, [id, company]);

  const sections = useMemo<Section[]>(() => {
    const intelSections = buildIntelligenceSections(company);
    const hq = formatStat(findAcrossCompany(company, HQ_KEYS));

    return intelSections.map((sec) => {
      // Map field items to a flat record for this category
      const record: DataRecord = {};
      for (const field of sec.fields) {
        record[field.key] = field.getValue(company ?? {});
      }
      return {
        slug: sec.slug,
        label: sec.label,
        records: [record],
        headquarters: hq,
      };
    });
  }, [company]);

  if (notFound) return <CompanyMissing />;

  if (detailsLoading && !company) {
    return (
      <div className={`${container} py-16 space-y-8 animate-pulse`}>
        <div className="h-6 w-36 rounded-md bg-white/5 border border-white/10" />
        <div className="h-36 rounded-2xl bg-white/5 border border-white/10" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-24 rounded-xl bg-white/5 border border-white/10" />
          <div className="h-24 rounded-xl bg-white/5 border border-white/10" />
          <div className="h-24 rounded-xl bg-white/5 border border-white/10" />
          <div className="h-24 rounded-xl bg-white/5 border border-white/10" />
        </div>
        <div className="h-64 rounded-2xl bg-white/5 border border-white/10" />
      </div>
    );
  }

  if (query.error && !query.isPlaceholderData) {
    const notConnected = query.error instanceof DirectoryNotConnectedError;
    return (
      <div className={`${container} py-16 lg:py-24`}>
        <StatePanel
          eyebrow={notConnected ? "Not connected" : "Loading failed"}
          title={notConnected ? "The company database is not connected yet." : "We could not load this company."}
          description={
            notConnected
              ? "Once the database is linked, this profile will load automatically."
              : query.error.message
          }
          actions={
            <>
              <button type="button" onClick={() => query.refetch()} className={primaryButtonClass}>
                {query.isFetching ? "Retrying..." : "Try again"}
              </button>
              <Link to="/" className={secondaryButtonClass}>
                Back to Directory
              </Link>
            </>
          }
        />
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<"intelligence" | "skills">("intelligence");

  return (
    <>
      <ProfileHeader id={id} company={company} detailsLoading={detailsLoading} branded={branded} />

      {/* Tab Navigation Switcher */}
      <div className="border-b border-border/80 bg-background/60 backdrop-blur-md">
        <div className={`${container} py-3.5`}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="inline-flex p-1 rounded-xl bg-black/5 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm">
              <button
                type="button"
                onClick={() => setActiveTab("intelligence")}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200",
                  activeTab === "intelligence"
                    ? "bg-white dark:bg-emerald-950/60 text-slate-900 dark:text-emerald-300 shadow-sm border border-slate-200/80 dark:border-emerald-500/30"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Intelligence Profile</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 font-mono">
                  22 Sections
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("skills")}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200",
                  activeTab === "skills"
                    ? "bg-white dark:bg-emerald-950/60 text-slate-900 dark:text-emerald-300 shadow-sm border border-slate-200/80 dark:border-emerald-500/30"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                <Sparkles className="h-4 w-4 text-emerald-500" />
                <span>Skill Intelligence</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">
                  10-Level Roadmap
                </span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              {activeTab === "intelligence" ? (
                <span>22 Comprehensive Corporate Due Diligence Categories</span>
              ) : (
                <span>12-Skill Assessment Matrix & Bloom Taxonomy Calibration</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTab === "intelligence" ? (
        <ProfileBody sections={sections} loading={detailsLoading} />
      ) : (
        <div className={`${container} py-8 lg:py-12`}>
          <SkillIntelligenceView company={company} companyName={company ? getCompanyName(company) : undefined} />
        </div>
      )}
    </>
  );
}

function SkeletonBar({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={cn("block rounded-sm bg-muted", className)}
      animate={{ opacity: [0.45, 1, 0.45] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function formatStat(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return value.toLocaleString("en-US");
  return String(value);
}

function ProfileHeader({
  id,
  company,
  detailsLoading,
  branded,
}: {
  id: string;
  company: DataRecord | null;
  detailsLoading: boolean;
  branded: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const name = company ? getCompanyName(company) : null;
  const shortName = company ? getShortName(company) : null;
  const ceo = formatStat(findAcrossCompany(company, CEO_KEYS));
  const hq = formatStat(findAcrossCompany(company, HQ_KEYS));
  const bottomLine = useMemo(() => evaluateBottomLine(company), [company]);

  // Alphabetical navigation logic (strictly matching directory order: A-Z first, then non-letters/#)
  const allCompaniesQuery = useQuery(companiesQueryOptions);
  const { prevCompany, nextCompany } = useMemo(() => {
    const list = sortCompanies(allCompaniesQuery.data ?? []);
    const currentIndex = list.findIndex((c) => getCompanyId(c) === id);
    if (currentIndex === -1) {
      return { prevCompany: null, nextCompany: null };
    }
    const prev = currentIndex > 0 ? list[currentIndex - 1] : null;
    const next = currentIndex < list.length - 1 ? list[currentIndex + 1] : null;
    return {
      prevCompany: prev ? { id: getCompanyId(prev), name: getCompanyName(prev) } : null,
      nextCompany: next ? { id: getCompanyId(next), name: getCompanyName(next) } : null,
    };
  }, [allCompaniesQuery.data, id]);

  const navButtonClass =
    "pointer-events-auto inline-flex items-center gap-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white/5 hover:border-emerald-500/50 text-slate-200 hover:text-white shadow-xl transition-all px-3.5 py-2 text-xs sm:text-sm font-medium group select-none";

  return (
    <div
      className={cn(
        "border-b border-border transition-colors duration-700",
        branded && "bg-primary-soft/60",
      )}
    >
      <div
        aria-hidden
        className={cn("h-[3px] bg-primary transition-opacity duration-700", branded ? "opacity-100" : "opacity-0")}
      />

      {/* Floating Previous / Next Company Navigation */}
      {mounted && (prevCompany || nextCompany) && (
        <nav
          aria-label="Company navigation"
          className="fixed z-50 pointer-events-none top-1/2 -translate-y-1/2 left-4 right-4 md:left-8 md:right-8 flex justify-between max-md:top-auto max-md:bottom-6 max-md:translate-y-0 max-md:left-4 max-md:right-4 max-md:flex max-md:justify-between"
        >
          {prevCompany ? (
            <Link
              to="/company/$id"
              params={{ id: prevCompany.id }}
              title={`Previous: ${prevCompany.name}`}
              className={navButtonClass}
            >
              <ChevronLeft className="h-4 w-4 text-emerald-400 transition-transform group-hover:-translate-x-0.5" aria-hidden />
              <span>Previous</span>
            </Link>
          ) : (
            <div aria-hidden className="w-0" />
          )}

          {nextCompany ? (
            <Link
              to="/company/$id"
              params={{ id: nextCompany.id }}
              title={`Next: ${nextCompany.name}`}
              className={navButtonClass}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4 text-emerald-400 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          ) : (
            <div aria-hidden className="w-0" />
          )}
        </nav>
      )}

      <div className={`${container} pb-10 pt-6 sm:pt-8 lg:pb-12`}>
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="-ml-2 inline-flex items-center gap-2 rounded-sm px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to directory
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
          <div
            className={cn(
              "w-fit rounded-md border bg-card p-4 transition-colors duration-700",
              branded ? "border-primary/40" : "border-border",
            )}
          >
            {company && name ? (
              <CompanyLogo
                id={id}
                name={name}
                src={getLogoUrl(company)}
                fallbackSrc={getLogoFallbackUrl(id)}
                className="h-24 w-24 sm:h-28 sm:w-28"
                initialsClassName="text-3xl"
              />
            ) : (
              <SkeletonBar className="h-24 w-24 sm:h-28 sm:w-28" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Company X-Ray{shortName && shortName !== name ? ` · ${shortName}` : ""}
            </p>
            {name ? (
              <h1 className="mt-3 break-words text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                {name}
              </h1>
            ) : (
              <SkeletonBar className="mt-3 h-10 w-64 max-w-full" />
            )}
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm leading-relaxed">
              <p>
                <span className="text-muted-foreground">CEO </span>
                {ceo ? (
                  <span className="font-medium">{ceo}</span>
                ) : detailsLoading ? (
                  <SkeletonBar className="inline-block h-3.5 w-28 align-middle" />
                ) : (
                  <Unavailable />
                )}
              </p>
              {hq && (
                <p>
                  <span className="text-muted-foreground">Headquarters </span>
                  <span className="font-medium">{hq}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {STAT_DEFINITIONS.map((stat) => {
            const value = formatStat(findAcrossCompany(company, stat.keys));
            return (
              <div key={stat.label} className="min-w-0 rounded-md border border-border bg-card p-4 sm:p-5">
                <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{stat.label}</dt>
                <dd className="mt-2 break-words text-lg font-semibold tabular-nums tracking-tight sm:text-2xl">
                  {value ?? (detailsLoading ? <SkeletonBar className="h-6 w-20" /> : <Unavailable />)}
                </dd>
              </div>
            );
          })}
        </dl>

        {detailsLoading ? (
          <div aria-hidden className="mt-10 grid gap-3 md:grid-cols-2">
            <SkeletonBar className="h-36 rounded-md" />
            <SkeletonBar className="h-36 rounded-md" />
          </div>
        ) : (
          <BottomLine data={bottomLine} />
        )}
      </div>
    </div>
  );
}

const SCROLL_OFFSET = 140;

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const lockUntil = useRef(0);
  const key = ids.join("|");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (Date.now() < lockUntil.current) return;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - SCROLL_OFFSET <= 0) current = id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && window.scrollY > 0) current = ids[ids.length - 1];
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const jumpTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    lockUntil.current = Date.now() + 900;
    setActive(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return { active, jumpTo };
}

function ProfileBody({ sections, loading }: { sections: Section[]; loading: boolean }) {
  const ids = useMemo(() => sections.map((s) => s.slug), [sections]);
  const { active, jumpTo } = useScrollSpy(ids);

  return (
    <div className={`${container} pb-24 pt-8 lg:pt-14`}>
      {/* Mobile section jump menu */}
      <div className="sticky top-16 z-30 -mx-4 mb-8 border-b border-border bg-background px-4 py-3 sm:-mx-6 sm:px-6 lg:hidden">
        <label htmlFor="section-jump" className="sr-only">
          Jump to section
        </label>
        <select
          id="section-jump"
          value={active}
          onChange={(e) => jumpTo(e.target.value)}
          className="h-10 w-full rounded-sm border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors hover:border-border-strong focus:border-primary"
        >
          {sections.map((s, i) => (
            <option key={s.slug} value={s.slug}>
              {pad(i)}  {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)] xl:gap-20">
        <aside className="hidden lg:block">
          <nav aria-label="Profile sections" className="sticky top-28">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              On this page
            </p>
            <ol className="border-l border-border">
              {sections.map((s, i) => {
                const isActive = active === s.slug;
                return (
                  <li key={s.slug}>
                    <a
                      href={`#${s.slug}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        jumpTo(s.slug);
                      }}
                      className={cn(
                        "-ml-px flex items-baseline gap-3 rounded-r-sm border-l-2 py-1.5 pl-4 pr-2 text-sm transition-colors",
                        isActive
                          ? "border-primary font-medium text-foreground"
                          : "border-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      <span className={cn("text-xs tabular-nums", isActive && "text-primary")}>{pad(i)}</span>
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0 max-w-3xl">
          {sections.map((section, index) => (
            <ProfileSection key={section.slug} section={section} index={index} loading={loading} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileSection({ section, index, loading }: { section: Section; index: number; loading: boolean }) {
  const recordEntries = section.records.map((r) => visibleEntries(r));
  const count = recordEntries.reduce((sum, entries) => sum + entries.length, 0);
  const available = recordEntries.reduce(
    (sum, entries) => sum + entries.filter(([k, v]) => classifyField(k, v).kind !== "empty").length,
    0,
  );

  return (
    <section
      id={section.slug}
      aria-labelledby={`${section.slug}-title`}
      className="scroll-mt-36 border-t border-border pb-12 pt-8 first:border-t-0 first:pt-0 lg:scroll-mt-28"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id={`${section.slug}-title`} className="flex items-baseline gap-3 text-xl font-semibold tracking-tight sm:text-2xl">
          <span className="text-xs font-normal tabular-nums text-muted-foreground">{pad(index)}</span>
          {section.label}
        </h2>
        {!loading && count > 0 && (
          <span className="text-xs tabular-nums text-muted-foreground">
            {available} of {count} parameters available
          </span>
        )}
      </header>

      {loading ? (
        <div className="mt-6 divide-y divide-border border-y border-border">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="grid gap-2 py-4 sm:grid-cols-[2fr_3fr] sm:gap-6">
              <SkeletonBar className="h-3.5 w-32" />
              <SkeletonBar className="h-3.5 w-48 max-w-full" />
            </div>
          ))}
        </div>
      ) : recordEntries.length === 0 ? (
        <p className="mt-6 border-y border-border py-4">
          <Unavailable />
        </p>
      ) : (
        recordEntries.map((entries, i) => (
          <div key={i}>
            {recordEntries.length > 1 && (
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Record {i + 1}
              </p>
            )}
            {section.slug === "work-location-commute" || section.slug === "logistics" ? (
              <>
                <LogisticsCard record={section.records[i]!} headquarters={section.headquarters ?? null} />
                {entries.some(([k]) => !LOGISTICS_CARD_KEYS.has(k)) && (
                  <FieldList entries={entries.filter(([k]) => !LOGISTICS_CARD_KEYS.has(k))} />
                )}
              </>
            ) : (
              <FieldList entries={entries} />
            )}
          </div>
        ))
      )}
    </section>
  );
}
