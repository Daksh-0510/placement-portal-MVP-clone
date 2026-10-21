import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.length > 1 ? `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}` : name.slice(0, 2);
  return letters.toUpperCase();
}

type CompanyLogoProps = {
  id: string;
  name: string;
  src: string | null;
  /** Tried when `src` is missing or fails to load (server-fetched logo, then website icon). */
  fallbackSrc?: string | null;
  className?: string;
  imgClassName?: string;
  initialsClassName?: string;
};

/**
 * Logo shared between the directory card and the profile header.
 * The shared layoutId lets Framer Motion animate it across routes.
 * Falls back through each source in turn, then to initials.
 */
export function CompanyLogo({ id, name, src, fallbackSrc, className, imgClassName, initialsClassName }: CompanyLogoProps) {
  const sources = useMemo(
    () => [src, fallbackSrc].filter((s, i, all): s is string => Boolean(s) && all.indexOf(s) === i),
    [src, fallbackSrc],
  );
  const [failed, setFailed] = useState<string[]>([]);
  const [small, setSmall] = useState<string | null>(null);
  const current = sources.find((s) => !failed.includes(s)) ?? null;

  return (
    <motion.div
      layoutId={`company-logo-${id}`}
      transition={{ type: "spring", stiffness: 210, damping: 28, mass: 0.9 }}
      className={cn("relative flex shrink-0 items-center justify-center", className)}
    >
      {current ? (
        <img
          key={current}
          src={current}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => setFailed((list) => [...list, current])}
          // Tiny website icons render at half size so they stay visible without heavy blurring.
          onLoad={(e) => setSmall(e.currentTarget.naturalWidth < 72 ? current : null)}
          className={cn(
            small === current ? "h-1/2 w-1/2" : "h-full w-full",
            "object-contain",
            imgClassName,
          )}
        />
      ) : (
        <span
          aria-hidden
          className={cn(
            "flex h-full w-full items-center justify-center rounded-sm bg-muted font-semibold tracking-tight text-muted-foreground",
            initialsClassName,
          )}
        >
          {initials(name)}
        </span>
      )}
    </motion.div>
  );
}
