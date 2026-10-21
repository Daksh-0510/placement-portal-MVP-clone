import { useState, useMemo, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Check,
  Lock,
  Search,
  Sparkles,
  Compass,
  Layers,
  GraduationCap,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DataRecord } from "@/lib/directory";
import {
  BLOOM_TAXONOMY_LEGEND,
  CRITICALITY_LEGEND,
  proficiencyToBloom,
  scoreToCriticality,
  transformCompanySkills,
  type SkillItem,
  type CriticalityLevel,
} from "@/data/skillIntelligenceData";

interface SkillIntelligenceViewProps {
  company?: DataRecord | null;
  companyName?: string | undefined;
}

export function SkillIntelligenceView({ company: propCompany, companyName: propCompanyName }: SkillIntelligenceViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [criticalityFilter, setCriticalityFilter] = useState<"All" | CriticalityLevel>("All");

  const company = useMemo(() => {
    if (propCompany) return propCompany;
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("selected-company");
        if (stored) return JSON.parse(stored) as DataRecord;
      } catch {}
    }
    return null;
  }, [propCompany]);

  const companyName = propCompanyName ?? (company ? (company["name"] as string) : undefined) ?? "Company";

  const companySkills = useMemo(() => {
    return transformCompanySkills(company);
  }, [company]);

  const [expandedSkillIds, setExpandedSkillIds] = useState<Set<string>>(() => new Set());

  // Automatically expand the highest-priority skill when company skills load or change
  useEffect(() => {
    const firstId = companySkills[0]?.id;
    if (firstId) {
      setExpandedSkillIds(new Set([firstId]));
    } else {
      setExpandedSkillIds(new Set());
    }
  }, [companySkills]);

  const filteredSkills = useMemo(() => {
    return companySkills.filter((skill) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.roadmap.some(
          (t) =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const criticality = scoreToCriticality(skill.requiredScore).level;
      const matchesCriticality =
        criticalityFilter === "All" || criticality === criticalityFilter;

      return matchesSearch && matchesCriticality;
    });
  }, [companySkills, searchQuery, criticalityFilter]);

  const toggleExpand = (id: string) => {
    setExpandedSkillIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSkillIds(new Set(filteredSkills.map((s) => s.id)));
  };

  const collapseAll = () => {
    setExpandedSkillIds(new Set());
  };

  const criticalCount = companySkills.filter(
    (s) => scoreToCriticality(s.requiredScore).level === "Critical"
  ).length;
  const importantCount = companySkills.filter(
    (s) => scoreToCriticality(s.requiredScore).level === "Important"
  ).length;
  const baselineCount = companySkills.filter(
    (s) => scoreToCriticality(s.requiredScore).level === "Baseline"
  ).length;

  if (companySkills.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-slate-300">
        Skill Intelligence data is not yet available for this company.
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header Summary Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-black/30 p-6 sm:p-8 backdrop-blur-xl shadow-lg dark:shadow-2xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Skill Intelligence & Roadmap Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {companyName} Capability Architecture
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Granular 10-level competency benchmarks calibrated against real hiring bars.
              Levels up to target requirements represent tested curriculum; levels above are highlighted as beyond scope.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-black/40 p-3 text-center backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">{companySkills.length}</span>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mt-0.5">Skills</p>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/40 p-3 text-center backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                {criticalCount}
              </span>
              <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mt-0.5">Critical</p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-black/40 p-3 text-center backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">10</span>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mt-0.5">Levels</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legends Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bloom Taxonomy Legend */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-black/30 p-5 sm:p-6 backdrop-blur-xl shadow-sm dark:shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Bloom Taxonomy Calibration
              </h3>
            </div>
            <span className="text-xs text-muted-foreground">Cognitive Depth (1 - 10)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {BLOOM_TAXONOMY_LEGEND.map((bloom) => (
              <div
                key={bloom.code}
                className={cn(
                  "group relative flex flex-col justify-between rounded-xl border p-2.5 transition-all duration-200 backdrop-blur-md",
                  bloom.badgeClass
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tracking-tight">
                    {bloom.code}
                  </span>
                  <span className="text-[10px] font-mono opacity-80">{bloom.range}</span>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-semibold leading-tight">{bloom.label}</p>
                  <p className="text-[10px] line-clamp-2 opacity-75 mt-0.5 leading-snug">
                    {bloom.fullName}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground italic">
            Maps proficiency scores: 1-2 → Comprehend (CU), 3-4 → Apply (AP), 5-6 → Analyse (AS), 7-8 → Evaluate (EV), 9-10 → Create (CR).
          </p>
        </div>

        {/* Criticality Legend */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-black/30 p-5 sm:p-6 backdrop-blur-xl shadow-sm dark:shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Evaluation Criticality Tiers
              </h3>
            </div>
            <span className="text-xs text-muted-foreground">Score Thresholds</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {CRITICALITY_LEGEND.map((crit) => (
              <div
                key={crit.level}
                className={cn(
                  "flex flex-col justify-between rounded-xl border p-3 backdrop-blur-md transition-all duration-200",
                  crit.badgeClass
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold">
                    <span className={cn("h-2 w-2 rounded-full", crit.dotColor)} />
                    {crit.level}
                  </span>
                  <span className="font-mono text-[11px] font-medium opacity-80">
                    {crit.range}
                  </span>
                </div>
                <p className="text-[11px] opacity-80 mt-2 leading-relaxed">
                  {crit.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground italic">
            Categorization rule: Score ≥ 7 is Critical, Score ≥ 5 is Important, otherwise Baseline.
          </p>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Criticality Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-black/5 dark:bg-black/40 border border-slate-200 dark:border-white/10 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setCriticalityFilter("All")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150",
              criticalityFilter === "All"
                ? "bg-white dark:bg-emerald-950/60 text-slate-900 dark:text-emerald-300 shadow-sm border border-slate-200 dark:border-emerald-500/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            All Skills ({companySkills.length})
          </button>
          <button
            type="button"
            onClick={() => setCriticalityFilter("Critical")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150",
              criticalityFilter === "Critical"
                ? "bg-white dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shadow-sm border border-slate-200 dark:border-emerald-500/30"
                : "text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Critical ({criticalCount})
          </button>
          <button
            type="button"
            onClick={() => setCriticalityFilter("Important")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150",
              criticalityFilter === "Important"
                ? "bg-white dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 shadow-sm border border-slate-200 dark:border-amber-500/30"
                : "text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-300"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Important ({importantCount})
          </button>
          <button
            type="button"
            onClick={() => setCriticalityFilter("Baseline")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150",
              criticalityFilter === "Baseline"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Baseline ({baselineCount})
          </button>
        </div>

        {/* Search & Accordion Controls */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills or topics..."
              className="h-9 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-black/30 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground outline-none backdrop-blur-md transition-colors focus:border-emerald-500/50"
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={expandAll}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Expand All
            </button>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <button
              type="button"
              onClick={collapseAll}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Skill Cards Grid / List */}
      <div className="space-y-5">
        {filteredSkills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            isExpanded={expandedSkillIds.has(skill.id)}
            onToggle={() => toggleExpand(skill.id)}
          />
        ))}

        {filteredSkills.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-white/10 p-12 text-center">
            <Compass className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">No matching skills found</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your search query or selecting a different criticality tier.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setCriticalityFilter("All");
              }}
              className="mt-4 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SkillCard({
  skill,
  isExpanded,
  onToggle,
}: {
  skill: SkillItem;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const bloom = proficiencyToBloom(skill.requiredScore);
  const criticality = scoreToCriticality(skill.requiredScore);
  const percentage = (skill.requiredScore / 10) * 100;

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-300 backdrop-blur-xl overflow-hidden shadow-sm dark:shadow-xl",
        isExpanded
          ? "border-emerald-500/40 bg-white/70 dark:bg-black/35 ring-1 ring-emerald-500/20"
          : "border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-black/20 hover:border-emerald-500/30 hover:bg-white/60 dark:hover:bg-black/30"
      )}
    >
      {/* Clickable Header Bar */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className="cursor-pointer p-5 sm:p-6 select-none focus:outline-none"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Skill Title & Category */}
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {skill.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border",
                  criticality.badgeClass
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", criticality.dotColor)} />
                {criticality.level}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold",
                  bloom.badgeClass
                )}
              >
                {bloom.code} · {bloom.label}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {skill.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              {skill.description}
            </p>
          </div>

          {/* Score Badge and Toggle */}
          <div className="flex items-center gap-4 shrink-0 self-start lg:self-center">
            {/* Score Numerical Badge */}
            <div className="flex items-baseline gap-1 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-black/40 px-3.5 py-2 text-right backdrop-blur-md">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Score</span>
              <span className="text-lg sm:text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                {skill.requiredScore}
              </span>
              <span className="text-xs text-muted-foreground font-medium">/ 10</span>
            </div>

            {/* Expand / Collapse Button */}
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-black/40 text-slate-500 dark:text-slate-400 transition-transform duration-200",
                isExpanded && "rotate-180 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
              )}
            >
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Target Progress Bar */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-emerald-500" />
              Target Capability Depth: {skill.requiredScore} of 10 Levels
            </span>
            <span className="font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
              {percentage}% Mastery Bar
            </span>
          </div>

          {/* Progress Bar Container with 10 ticks */}
          <div className="relative h-2.5 w-full rounded-full bg-slate-200/80 dark:bg-white/10 overflow-hidden p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 transition-all duration-500 shadow-sm"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Stepper notches labels */}
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground px-0.5">
            <span>L1 Fundamentals</span>
            <span>L5 Intermediate</span>
            <span>L10 Advanced</span>
          </div>
        </div>
      </div>

      {/* Accordion Roadmap Expansion */}
      {isExpanded && (
        <div className="border-t border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-black/30 p-5 sm:p-7 backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-900 dark:text-slate-200">
                10-Level Topic Mastery Roadmap
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Curriculum breakdown: Levels 1–{skill.requiredScore} assessed. Levels {skill.requiredScore + 1}–10 marked beyond target scope.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Target
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-medium">
                <Lock className="h-3 w-3" />
                Beyond Scope
              </span>
            </div>
          </div>

          {/* Vertical Stepper Timeline */}
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 dark:before:bg-white/10">
            {skill.roadmap.map((step) => {
              const isActive = step.level <= skill.requiredScore;

              return (
                <div key={step.level} className="relative group/step">
                  {/* Step Bubble Indicator */}
                  <div
                    className={cn(
                      "absolute -left-6 sm:-left-8 top-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all duration-200",
                      isActive
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20 ring-4 ring-emerald-500/20"
                        : "border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/60 text-slate-400 dark:text-slate-500"
                    )}
                  >
                    {isActive ? (
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    ) : (
                      <Lock className="h-3 w-3" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div
                    className={cn(
                      "rounded-xl border p-4 transition-all duration-200 backdrop-blur-md",
                      isActive
                        ? "border-emerald-500/30 bg-white/80 dark:bg-black/40 shadow-sm"
                        : "border-slate-200/60 dark:border-white/5 bg-white/20 dark:bg-black/10 opacity-60 hover:opacity-80"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={cn(
                            "font-mono text-xs font-bold",
                            isActive
                              ? "text-emerald-700 dark:text-emerald-400"
                              : "text-slate-400 dark:text-slate-500"
                          )}
                        >
                          Level {step.level}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                          {step.stage}
                        </span>
                        <h5
                          className={cn(
                            "text-sm font-semibold tracking-tight",
                            isActive
                              ? "text-slate-900 dark:text-white"
                              : "text-slate-500 dark:text-slate-400"
                          )}
                        >
                          {step.title}
                        </h5>
                      </div>

                      {/* Pill Badge */}
                      <div className="shrink-0">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Assessed Bar
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                            <Lock className="h-2.5 w-2.5" />
                            Beyond Scope
                          </span>
                        )}
                      </div>
                    </div>

                    <p
                      className={cn(
                        "mt-1.5 text-xs sm:text-sm leading-relaxed",
                        isActive
                          ? "text-slate-600 dark:text-slate-300"
                          : "text-slate-400 dark:text-slate-500"
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
