import type { SupabaseClient } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import { queryOptions } from "@tanstack/react-query";

import { isEmptyValue } from "./fields";

export type DataRecord = Record<string, unknown>;

export class DirectoryNotConnectedError extends Error {
  constructor() {
    super("The company database is not connected to this app yet.");
    this.name = "DirectoryNotConnectedError";
  }
}

export class CompanyNotFoundError extends Error {
  constructor(id: string) {
    super(`No company exists with the ID "${id}".`);
    this.name = "CompanyNotFoundError";
  }
}

// Lovable Cloud client (tables are untyped here, so cast to a generic client).
function getClient(): SupabaseClient | null {
  return supabase as unknown as SupabaseClient;
}

export const CATEGORIES = [
  { key: "company_business", label: "Business", slug: "business" },
  { key: "company_financials", label: "Financials", slug: "financials" },
  { key: "company_culture", label: "Culture", slug: "culture" },
  { key: "company_compensation", label: "Compensation", slug: "compensation" },
  { key: "company_logistics", label: "Logistics", slug: "logistics" },
  { key: "company_people", label: "People", slug: "people" },
  { key: "company_talent_growth", label: "Talent and growth", slug: "talent-growth" },
  { key: "company_technologies", label: "Technologies", slug: "technologies" },
  { key: "company_brand_reputation", label: "Brand and reputation", slug: "brand-reputation" },
  { key: "company_skill_levels", label: "Skill levels", slug: "skill-levels" },
] as const;

export const CATEGORY_KEYS = new Set<string>(CATEGORIES.map((c) => c.key));

const NAME_KEYS = ["name", "company_name"];
const SHORT_NAME_KEYS = ["short_name"];
const LOGO_KEYS = ["logo_url", "logo", "logo_link", "company_logo", "logo_image", "logo_src"];
export const IDENTITY_KEYS = new Set([...NAME_KEYS, ...SHORT_NAME_KEYS, ...LOGO_KEYS]);

export const CEO_KEYS = ["ceo_name", "ceo", "ceo_full_name", "chief_executive"];
export const HQ_KEYS = ["headquarters_address", "headquarters", "headquarters_location", "hq_location", "hq", "head_office"];

export const STAT_DEFINITIONS = [
  { label: "Employees", keys: ["employee_size", "employee_count", "employees", "total_employees"] },
  { label: "Annual revenue", keys: ["annual_revenue", "revenue", "annual_revenue_usd"] },
  { label: "Offices", keys: ["office_count", "number_of_offices", "offices_count", "total_offices"] },
  {
    label: "Founded",
    keys: ["year_of_incorporation", "founded_year", "year_founded", "founded", "incorporation_year"],
  },
] as const;

export function pickFirst(record: DataRecord | null | undefined, keys: readonly string[]): unknown {
  if (!record) return null;
  for (const key of keys) {
    const value = record[key];
    if (!isEmptyValue(value)) return value;
  }
  return null;
}

export function getCompanyId(company: DataRecord): string {
  const id = company["company_id"] ?? company["id"];
  return id === null || id === undefined ? "" : String(id);
}

export function getCompanyName(company: DataRecord): string {
  const value = pickFirst(company, NAME_KEYS);
  return value === null ? "Unnamed company" : String(value);
}

export function getShortName(company: DataRecord): string | null {
  const value = pickFirst(company, SHORT_NAME_KEYS);
  return value === null ? null : String(value);
}

export function getLogoUrl(company: DataRecord): string | null {
  const value = pickFirst(company, LOGO_KEYS);
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return /^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith("/") || trimmed.startsWith("data:image")
    ? trimmed
    : null;
}

/** Same-origin logo backup: server-fetched database logo, then the website's icon. */
export function getLogoFallbackUrl(id: string): string | null {
  return /^\d+$/.test(id) ? `/api/public/logo/${id}` : null;
}

export function sortCompanies(companies: DataRecord[]): DataRecord[] {
  const letters: DataRecord[] = [];
  const nonLetters: DataRecord[] = [];

  for (const company of companies) {
    const first = getCompanyName(company).trim().charAt(0);
    if (/^[a-zA-Z]/.test(first)) {
      letters.push(company);
    } else {
      nonLetters.push(company);
    }
  }

  const sortFn = (a: DataRecord, b: DataRecord) =>
    getCompanyName(a).localeCompare(getCompanyName(b), "en", { sensitivity: "base" });

  letters.sort(sortFn);
  nonLetters.sort(sortFn);

  return [...letters, ...nonLetters];
}

export function filterCompanies(companies: DataRecord[], query: string): DataRecord[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return companies;
  return companies.filter((company) => {
    const name = getCompanyName(company).toLowerCase();
    const short = (getShortName(company) ?? "").toLowerCase();
    return name.includes(needle) || short.includes(needle);
  });
}

export function groupByInitial(companies: DataRecord[]): { letter: string; items: DataRecord[] }[] {
  const groups = new Map<string, DataRecord[]>();
  for (const company of companies) {
    const first = getCompanyName(company).trim().charAt(0).toUpperCase();
    const letter = /[A-Z]/.test(first) ? first : "#";
    const list = groups.get(letter) ?? [];
    list.push(company);
    groups.set(letter, list);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => (a === "#" ? 1 : b === "#" ? -1 : a.localeCompare(b)))
    .map(([letter, items]) => ({ letter, items }));
}

/** Child tables can come back as one object or an array of rows. */
export function categoryRecords(company: DataRecord | null | undefined, key: string): DataRecord[] {
  const value = company?.[key];
  if (Array.isArray(value)) {
    return value.filter((v): v is DataRecord => typeof v === "object" && v !== null);
  }
  if (value && typeof value === "object") return [value as DataRecord];
  return [];
}

/** Finds a value in the company row first, then in every child table row. */
export function findAcrossCompany(company: DataRecord | null | undefined, keys: readonly string[]): unknown {
  if (!company) return null;
  const direct = pickFirst(company, keys);
  if (direct !== null) return direct;
  for (const category of CATEGORIES) {
    for (const record of categoryRecords(company, category.key)) {
      const value = pickFirst(record, keys);
      if (value !== null) return value;
    }
  }
  return null;
}

/** Copies the first logo from the company_logo child table onto the company row. */
export function flattenLogo(company: DataRecord): DataRecord {
  const { company_logo: logos, ...rest } = company;
  const rows = categoryRecords({ company_logo: logos }, "company_logo");
  const logo = rows.map((r) => r["logo_url"]).find((v) => typeof v === "string" && v.trim());
  return logo && isEmptyValue(rest["logo_url"]) ? { ...rest, logo_url: logo } : rest;
}

/** Flattens skill rows joined with their lookup names into readable fields. */
export function flattenSkillLevel(row: DataRecord): DataRecord {
  const { skill_set_master: skill, proficiency_levels: level, ...rest } = row;
  const s = (skill ?? {}) as DataRecord;
  const p = (level ?? {}) as DataRecord;
  return {
    skill: s["skill_set_name"] ?? rest["skill_set_id"],
    required_level: rest["required_level"],
    proficiency: p["proficiency_name"] ?? null,
  };
}

const DETAIL_TABLES = CATEGORIES.filter((c) => c.key !== "company_skill_levels")
  .map((c) => `${c.key}(*)`)
  .join(", ");

export async function fetchCompanies(): Promise<DataRecord[]> {
  const supabase = getClient();
  if (!supabase) throw new DirectoryNotConnectedError();
  const { data, error } = await supabase.from("companies").select("*, company_logo(logo_url)");
  if (error) throw new Error(error.message);
  return sortCompanies(((data ?? []) as DataRecord[]).map(flattenLogo));
}

export async function fetchCompany(id: string): Promise<DataRecord> {
  const supabase = getClient();
  if (!supabase) throw new DirectoryNotConnectedError();
  if (!/^\d+$/.test(id)) throw new CompanyNotFoundError(id);
  const [companyRes, skillsRes] = await Promise.all([
    supabase
      .from("companies")
      .select(`*, company_logo(logo_url), ${DETAIL_TABLES}`)
      .eq("company_id", id)
      .maybeSingle(),
    supabase
      .from("company_skill_levels")
      .select("skill_set_id, required_level, skill_set_master(skill_set_name), proficiency_levels(proficiency_name)")
      .eq("company_id", id)
      .order("required_level", { ascending: false }),
  ]);
  if (companyRes.error) {
    if (companyRes.error.code === "22P02") throw new CompanyNotFoundError(id);
    throw new Error(companyRes.error.message);
  }
  if (!companyRes.data) throw new CompanyNotFoundError(id);
  const skills = skillsRes.error ? [] : ((skillsRes.data ?? []) as DataRecord[]).map(flattenSkillLevel);
  return { ...flattenLogo(companyRes.data as unknown as DataRecord), company_skill_levels: skills, skill_levels: skills };
}

const noRetryErrors = (failureCount: number, error: Error) =>
  !(error instanceof CompanyNotFoundError) &&
  !(error instanceof DirectoryNotConnectedError) &&
  failureCount < 2;

export const companiesQueryOptions = queryOptions({
  queryKey: ["companies"],
  queryFn: fetchCompanies,
  staleTime: 5 * 60_000,
  retry: noRetryErrors,
});

export const companyQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["company", id],
    queryFn: () => fetchCompany(id),
    staleTime: 5 * 60_000,
    retry: noRetryErrors,
  });
