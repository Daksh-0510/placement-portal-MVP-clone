import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type StatePanelProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  actions?: ReactNode;
  className?: string;
};

/** Editorial message block for empty, error and not-found states. */
export function StatePanel({ eyebrow, title, description, actions, className }: StatePanelProps) {
  return (
    <div className={cn("rounded-md border border-border bg-card px-6 py-10 sm:px-10 sm:py-14", className)}>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h2>
      <div className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </div>
      {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}

export const primaryButtonClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const secondaryButtonClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-sm border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
