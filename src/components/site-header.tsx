import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Directory" },
  { to: "/privacy", label: "Privacy" },
  { to: "/tos", label: "Terms" },
] as const;

const navLinkClass =
  "text-slate-400 hover:bg-emerald-950/60 hover:text-slate-300 transition-colors px-3 py-1.5 rounded-lg text-sm font-medium select-none";

export function Wordmark({ className, textClassName }: { className?: string; textClassName?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <img
        src="/brand-logo.png"
        alt="JSS University, Noida"
        className="h-8 w-8 rounded-md object-contain shadow-xs border border-emerald-500/20 shrink-0"
      />
      <span className="flex flex-col text-left leading-none">
        <span className={cn("text-sm sm:text-base font-black tracking-tight text-white", textClassName)}>
          JSS University, Noida
        </span>
        <span className="text-[10px] sm:text-[11px] font-medium text-emerald-400/90 tracking-tight mt-0.5">
          Student Career Hub <span className="opacity-75 font-normal">(Powered by CorporateDNA)</span>
        </span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [isAtDirectory, setIsAtDirectory] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = useLocation({ select: (l) => l.pathname });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setIsAtDirectory(false);
      return;
    }

    const checkScroll = () => {
      const grid = document.getElementById("directory-grid");
      if (!grid) {
        setIsAtDirectory(false);
        return;
      }
      const top = grid.getBoundingClientRect().top;
      // When the directory grid approaches the top of the viewport (under the 64px navbar)
      setIsAtDirectory(top <= 120);
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, [pathname]);

  const handleDirectoryClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      document.getElementById("directory-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isDark = mounted ? theme === "dark" : false;

  const activeLinkClass = "bg-emerald-950/60 text-emerald-400 font-medium px-3 py-1.5 rounded-lg text-sm transition-colors select-none";
  const mobileActiveLinkClass = "block rounded-lg px-3 py-2 text-base font-medium bg-emerald-950/60 text-emerald-400 transition-colors select-none";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-500/20 bg-[#04160E]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          aria-label="CorporateDNA home"
          className="-ml-2 rounded-lg px-2 py-1 transition-colors hover:bg-emerald-950/60"
        >
          <Wordmark />
        </Link>

        <div className="flex items-center gap-3">
          <nav aria-label="Primary" className="mr-1 hidden items-center gap-1.5 md:flex">
            {NAV.map((item) => {
              const isActive =
                item.to === "/"
                  ? pathname === "/" && isAtDirectory
                  : pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  {...(item.to === "/" && pathname !== "/" ? { hash: "directory-grid" } : {})}
                  {...(item.to === "/" ? { resetScroll: false, onClick: handleDirectoryClick } : {})}
                  className={isActive ? activeLinkClass : navLinkClass}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Animated Slider Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="w-14 h-7 rounded-full p-1 flex items-center cursor-pointer transition-colors bg-black/40 border border-emerald-500/20 shadow-inner relative"
          >
            <div
              style={{ transform: isDark ? "translateX(28px)" : "translateX(0px)" }}
              className="w-5 h-5 rounded-full flex items-center justify-center shadow-md bg-[#0A261C] border border-emerald-500/30 text-slate-100 transition-transform duration-200 ease-in-out"
            >
              {isDark ? (
                <Moon className="h-3 w-3 text-emerald-300" aria-hidden />
              ) : (
                <Sun className="h-3 w-3 text-emerald-400" aria-hidden />
              )}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/20 text-slate-300 transition-colors hover:bg-emerald-950/60 hover:text-white md:hidden"
          >
            {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-emerald-500/20 bg-[#04160E] md:hidden"
          >
            <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
              {NAV.map((item) => {
                const isActive =
                  item.to === "/"
                    ? pathname === "/" && isAtDirectory
                    : pathname === item.to;

                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      {...(item.to === "/" && pathname !== "/" ? { hash: "directory-grid" } : {})}
                      {...(item.to === "/" ? { resetScroll: false, onClick: handleDirectoryClick } : {})}
                      className={
                        isActive
                          ? mobileActiveLinkClass
                          : "block rounded-lg px-3 py-2 text-base font-medium text-slate-400 transition-colors hover:bg-emerald-950/60 hover:text-slate-300 select-none"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
