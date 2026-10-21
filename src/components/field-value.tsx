import { Check, X } from "lucide-react";

import { classifyField, HIDDEN_KEYS, humanizeKey, type FieldView } from "@/lib/fields";
import { cn } from "@/lib/utils";

export function Unavailable({ className }: { className?: string }) {
  return <span className={cn("text-sm text-muted-foreground/80", className)}>Data unavailable</span>;
}

export function FieldValue({ view }: { view: FieldView }) {
  switch (view.kind) {
    case "empty":
      return <Unavailable />;
    case "boolean":
      return view.value ? (
        <span className="inline-flex items-center gap-1.5">
          <Check className="h-4 w-4 text-primary" strokeWidth={2.25} aria-hidden />
          Yes
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <X className="h-4 w-4" strokeWidth={2.25} aria-hidden />
          No
        </span>
      );
    case "list":
      return (
        <ul className="flex flex-wrap gap-1.5">
          {view.items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="rounded-sm border border-border bg-muted px-2 py-0.5 text-xs leading-relaxed text-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case "link":
      return (
        <a
          href={view.href}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all rounded-sm text-primary underline-offset-4 transition-colors hover:underline"
        >
          {view.label}
        </a>
      );
    case "number":
      return <span className="tabular-nums">{view.text}</span>;
    case "text":
      return <span className="whitespace-pre-line break-words">{view.text}</span>;
    case "object":
      return (
        <dl className="grid gap-2.5">
          {view.entries.map(([label, child]) => (
            <div key={label} className="min-w-0">
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-0.5">
                <FieldValue view={child} />
              </dd>
            </div>
          ))}
        </dl>
      );
  }
}

export function visibleEntries(record: Record<string, unknown>, exclude?: Set<string>) {
  return Object.entries(record).filter(
    ([key]) => !HIDDEN_KEYS.has(key) && !(exclude?.has(key) ?? false),
  );
}

export function FieldList({ entries }: { entries: [string, unknown][] }) {
  if (entries.length === 0) {
    return (
      <p className="mt-6 border-y border-border py-4">
        <Unavailable />
      </p>
    );
  }

  return (
    <dl className="mt-6 divide-y divide-border border-y border-border">
      {entries.map(([key, value]) => {
        const view = classifyField(key, value);
        const wide = (view.kind === "text" && view.long) || view.kind === "object";
        return (
          <div
            key={key}
            className={cn(
              "grid gap-1.5 py-3.5",
              !wide && "sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6",
            )}
          >
            <dt className="text-sm leading-relaxed text-muted-foreground">{humanizeKey(key)}</dt>
            <dd className="min-w-0 text-sm leading-relaxed text-foreground">
              <FieldValue view={view} />
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
