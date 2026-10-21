/**
 * Pure helpers that decide how a single database parameter is displayed.
 * Kept framework free so the display rules can be unit tested.
 */

export const HIDDEN_KEYS = new Set(["id", "company_id", "created_at", "updated_at"]);

export type FieldView =
  | { kind: "empty" }
  | { kind: "boolean"; value: boolean }
  | { kind: "list"; items: string[] }
  | { kind: "link"; href: string; label: string }
  | { kind: "number"; text: string }
  | { kind: "text"; text: string; long: boolean }
  | { kind: "object"; entries: [string, FieldView][] };

const EMPTY_STRINGS = /^(null|undefined|n\/?a|na|-|nil)$/i;
const TRUE_STRINGS = /^(true|yes|y)$/i;
const FALSE_STRINGS = /^(false|no|n)$/i;
const BOOLEAN_KEY = /^(is|has|offers|allows|provides|supports|can)_/i;
const YEAR_KEY = /(year|founded|established|incorporat)/i;

// Keys whose comma separated text is really a list of items.
const LIST_KEY =
  /(stack|tags|skills|technolog|tools|languages|frameworks|platforms|libraries|databases|list|locations|cities|countries|regions|benefits|perks|offices|products|services|competitors|clients|customers|investors|partners|certifications|awards|values|domains|industries|segments|subsidiaries|brands|roles|programs|keywords|hubs|markets|verticals|channels|clouds|focus_areas|specializations|hiring_for|positions)/i;

const LONG_TEXT_LENGTH = 120;

export function isEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" || EMPTY_STRINGS.test(trimmed);
  }
  if (typeof value === "number") return Number.isNaN(value);
  if (Array.isArray(value)) return value.every(isEmptyValue);
  if (typeof value === "object") return Object.keys(value as object).length === 0;
  return false;
}

function itemToString(item: unknown): string {
  if (item === null || item === undefined) return "";
  if (typeof item === "object") {
    return Object.values(item as Record<string, unknown>)
      .filter((v) => !isEmptyValue(v))
      .map((v) => String(v))
      .join(" · ");
  }
  return String(item).trim();
}

function cleanItems(items: unknown[]): string[] {
  return items.map(itemToString).filter((s) => s.length > 0);
}

export function splitListText(key: string, text: string): string[] | null {
  const trimmed = text.trim();

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed: unknown = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        const items = cleanItems(parsed);
        return items.length > 0 ? items : null;
      }
    } catch {
      // Not JSON; fall through to separator rules.
    }
  }

  let parts: string[] | null = null;
  if (/[;|\n•]/.test(trimmed)) {
    parts = trimmed.split(/\s*[;|\n•]+\s*/);
  } else if (trimmed.includes(",") && LIST_KEY.test(key)) {
    parts = trimmed.split(/\s*,\s*/);
  }
  if (!parts) return null;

  const items = parts.map((p) => p.replace(/^[-*]\s+/, "").trim()).filter(Boolean);
  return items.length >= 2 ? items : null;
}

function linkLabel(href: string): string {
  try {
    const url = new URL(href);
    const path = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");
    return `${url.hostname.replace(/^www\./, "")}${path}`;
  } catch {
    return href;
  }
}

export function classifyField(key: string, value: unknown): FieldView {
  if (isEmptyValue(value)) return { kind: "empty" };

  if (typeof value === "boolean") return { kind: "boolean", value };

  if (typeof value === "number") {
    if (BOOLEAN_KEY.test(key) && (value === 0 || value === 1)) {
      return { kind: "boolean", value: value === 1 };
    }
    const text =
      YEAR_KEY.test(key) && Number.isInteger(value)
        ? String(value)
        : value.toLocaleString("en-US", { maximumFractionDigits: 2 });
    return { kind: "number", text };
  }

  if (Array.isArray(value)) {
    const items = cleanItems(value);
    return items.length > 0 ? { kind: "list", items } : { kind: "empty" };
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).map(
      ([k, v]) => [humanizeKey(k), classifyField(k, v)] as [string, FieldView],
    );
    return { kind: "object", entries };
  }

  const text = String(value).trim();

  if (TRUE_STRINGS.test(text)) return { kind: "boolean", value: true };
  if (FALSE_STRINGS.test(text)) return { kind: "boolean", value: false };

  if (/^https?:\/\/\S+$/i.test(text)) return { kind: "link", href: text, label: linkLabel(text) };

  const list = splitListText(key, text);
  if (list) return { kind: "list", items: list };

  return { kind: "text", text, long: text.length > LONG_TEXT_LENGTH };
}

const ACRONYMS: Record<string, string> = {
  ceo: "CEO",
  cto: "CTO",
  cfo: "CFO",
  coo: "COO",
  hq: "HQ",
  url: "URL",
  urls: "URLs",
  id: "ID",
  ctc: "CTC",
  lpa: "LPA",
  esop: "ESOP",
  esops: "ESOPs",
  wfh: "WFH",
  ai: "AI",
  ml: "ML",
  hr: "HR",
  pf: "PF",
  usd: "USD",
  inr: "INR",
  yoy: "YoY",
  cagr: "CAGR",
  roi: "ROI",
  esg: "ESG",
  dei: "DEI",
  ipo: "IPO",
  b2b: "B2B",
  b2c: "B2C",
  saas: "SaaS",
  api: "API",
  ui: "UI",
  ux: "UX",
  gpa: "GPA",
  cgpa: "CGPA",
  pto: "PTO",
  kpi: "KPI",
  okr: "OKR",
  csr: "CSR",
  rnd: "R&D",
  qa: "QA",
  sde: "SDE",
  it: "IT",
  ppo: "PPO",
  ppos: "PPOs",
  nps: "NPS",
};

export function humanizeKey(key: string): string {
  const words = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[_\s-]+/)
    .filter(Boolean);
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (ACRONYMS[lower]) return ACRONYMS[lower];
      return index === 0 ? lower.charAt(0).toUpperCase() + lower.slice(1) : lower;
    })
    .join(" ");
}
