import { AlertTriangle, Check } from "lucide-react";

import type { BottomLine as BottomLineData, Flag } from "@/lib/insights";
import { cn } from "@/lib/utils";

function FlagColumn({
  tone,
  title,
  flags,
  empty,
}: {
  tone: "green" | "red";
  title: string;
  flags: Flag[];
  empty: string;
}) {
  const Icon = tone === "green" ? Check : AlertTriangle;
  return (
    <div className="min-w-0 rounded-md border border-border bg-card p-5">
      <h3 className="flex items-baseline justify-between gap-3 text-sm font-semibold tracking-tight">
        <span className={cn(tone === "green" ? "text-positive" : "text-destructive")}>{title}</span>
        <span className="text-xs font-normal tabular-nums text-muted-foreground">{flags.length}</span>
      </h3>
      {flags.length === 0 ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-4 divide-y divide-border">
          {flags.map((flag) => (
            <li key={flag.key} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
              <Icon
                className={cn("mt-0.5 h-4 w-4 shrink-0", tone === "green" ? "text-positive" : "text-destructive")}
                strokeWidth={2.25}
                aria-hidden
              />
              <span className="min-w-0 text-sm leading-relaxed">
                <span className="font-medium text-foreground">{flag.label}</span>
                <span className="text-muted-foreground">: {flag.value}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function BottomLine({ data }: { data: BottomLineData }) {
  return (
    <section aria-labelledby="bottom-line-title" className="mt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="bottom-line-title" className="text-lg font-semibold tracking-tight sm:text-xl">
          The Bottom Line
        </h2>
        <p className="text-xs text-muted-foreground">Read automatically from culture, pay and workload data</p>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <FlagColumn tone="green" title="Green flags" flags={data.green} empty="No clear green flags in the available data." />
        <FlagColumn tone="red" title="Red flags" flags={data.red} empty="No red flags found in the available data." />
      </div>
    </section>
  );
}
