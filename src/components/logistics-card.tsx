import { Building2, Laptop, MapPin, Plane, Train, type LucideIcon } from "lucide-react";

import { Unavailable } from "@/components/field-value";
import type { DataRecord } from "@/lib/directory";
import { isEmptyValue } from "@/lib/fields";

const TILES: { key: string; label: string; icon: LucideIcon; optional?: boolean }[] = [
  { key: "airport_commute_time", label: "To the airport", icon: Plane },
  { key: "location_centrality", label: "Neighbourhood", icon: MapPin },
  { key: "public_transport_access", label: "Public transport", icon: Train, optional: true },
  { key: "office_zone_type", label: "Office zone", icon: Building2 },
  { key: "remote_policy_details", label: "Work setup", icon: Laptop },
];

/** Logistics fields shown in the visual card, hidden from the plain list below it. */
export const LOGISTICS_CARD_KEYS = new Set(TILES.map((t) => t.key));

export function LogisticsCard({ record, headquarters }: { record: DataRecord; headquarters: string | null }) {
  const tiles = TILES.filter((t) => !t.optional || !isEmptyValue(record[t.key]));

  return (
    <div className="mt-6 overflow-hidden rounded-md border border-border bg-card">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border px-5 py-4">
        <h3 className="text-base font-semibold tracking-tight">HQ Logistics</h3>
        <p className="text-sm text-muted-foreground">{headquarters ?? "Headquarters location unavailable"}</p>
      </div>
      <ul className="grid gap-px bg-border sm:grid-cols-2">
        {tiles.map(({ key, label, icon: Icon }) => {
          const value = record[key];
          return (
            <li
              key={key}
              className="flex items-start gap-4 bg-card px-5 py-4 sm:last:odd:col-span-2"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border bg-primary-soft text-primary transition-colors duration-700">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
                <span className="mt-1 block break-words text-sm font-medium leading-relaxed text-foreground">
                  {isEmptyValue(value) ? <Unavailable /> : String(value).trim()}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
