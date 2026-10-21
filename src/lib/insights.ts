import { findAcrossCompany, type DataRecord } from "./directory";

export type Flag = { key: string; label: string; value: string };
export type BottomLine = { green: Flag[]; red: Flag[] };

export const GREEN_FLAG_FIELDS = [
  { key: "psychological_safety", label: "Psychological safety" },
  { key: "internal_mobility", label: "Internal mobility" },
  { key: "family_health_insurance", label: "Family health insurance" },
  { key: "manager_quality", label: "Manager quality" },
  { key: "mission_clarity", label: "Mission clarity" },
  { key: "bonus_predictability", label: "Bonus predictability" },
] as const;

export const RED_FLAG_FIELDS = [
  { key: "burnout_risk", label: "Burnout risk" },
  { key: "layoff_history", label: "Layoff history" },
  { key: "weekend_work", label: "Weekend work" },
  { key: "overtime_expectations", label: "Overtime expectations" },
] as const;

const POSITIVE = /\b(high|strong|excellent|yes|provided|available|clear|good|robust|covered|included|comprehensive|great)\b/;
const HEDGED = /\b(low|limited|no|not|none|mixed|medium|moderate|average|unclear|poor|weak|na|n a|unavailable|unknown)\b/;
const CONCERNING = /\b(high|frequent|frequently|expected|yes|mandatory|often|regular|periodic|significant|major|mass|severe|heavy)\b/;
const REASSURING = /\b(no|none|not|rare|rarely|low|minimal|limited|never|minor|na|n a)\b/;

function normalize(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "boolean") return value ? "yes" : "no";
  const text = String(value).trim();
  if (!text) return null;
  return text.toLowerCase().replace(/[\u2010-\u2015_\-/;:,.()]+/g, " ").replace(/\s+/g, " ");
}

export function isGreenSignal(value: unknown): boolean {
  const text = normalize(value);
  return text !== null && POSITIVE.test(text) && !HEDGED.test(text);
}

export function isRedSignal(value: unknown): boolean {
  const text = normalize(value);
  return text !== null && CONCERNING.test(text) && !REASSURING.test(text);
}

/** Pure read of existing culture, pay and workload fields into green and red flags. */
export function evaluateBottomLine(company: DataRecord | null | undefined): BottomLine {
  const pick = (fields: readonly { key: string; label: string }[], test: (v: unknown) => boolean) =>
    fields.flatMap(({ key, label }) => {
      const value = findAcrossCompany(company, [key]);
      return test(value) ? [{ key, label, value: String(value).trim() }] : [];
    });
  return { green: pick(GREEN_FLAG_FIELDS, isGreenSignal), red: pick(RED_FLAG_FIELDS, isRedSignal) };
}
