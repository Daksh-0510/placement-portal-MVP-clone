import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "pt-theme";

// Runs in <head> before first paint so the saved theme never flashes.
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var d=document.documentElement;if(t==='dark'){d.classList.add('dark');d.style.backgroundColor='#0a0a0a';d.style.colorScheme='dark';}else{d.classList.remove('dark');d.style.backgroundColor='#eff4f1';d.style.colorScheme='light';}}catch(e){}})();`;

type ThemeContextValue = { theme: Theme; toggleTheme: () => void };

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const activeTheme: Theme = saved === "light" || saved === "dark" ? saved : prefersDark ? "dark" : "light";
      const root = document.documentElement;
      if (activeTheme === "dark") {
        root.classList.add("dark");
        root.style.backgroundColor = "#0a0a0a";
      } else {
        root.classList.remove("dark");
        root.style.backgroundColor = "#eff4f1";
      }
      root.style.colorScheme = activeTheme;
      setTheme(activeTheme);
    } catch {
      const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
      setTheme(current);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const isCurrentlyDark = root.classList.contains("dark");
    const next: Theme = isCurrentlyDark ? "light" : "dark";
    if (next === "dark") {
      root.classList.add("dark");
      root.style.backgroundColor = "#0a0a0a";
    } else {
      root.classList.remove("dark");
      root.style.backgroundColor = "#eff4f1";
    }
    root.style.colorScheme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    setTheme(next);
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
