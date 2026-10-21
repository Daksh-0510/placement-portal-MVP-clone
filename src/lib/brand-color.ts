import type { CSSProperties } from "react";

export type Rgb = { r: number; g: number; b: number };

export type BrandPalette = {
  light: string;
  dark: string;
  softLight: string;
  softDark: string;
};

function toHsl({ r, g, b }: Rgb) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === rn) h = ((gn - bn) / d) % 6;
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  h = Math.round(h * 60);
  return { h: h < 0 ? h + 360 : h, s, l };
}

/**
 * Most common vivid color in RGBA pixel data. Skips transparent, near white,
 * near black and grey pixels so logo backgrounds do not win. Returns null
 * when the logo is essentially monochrome.
 */
export function dominantColor(pixels: ArrayLike<number>): Rgb | null {
  const buckets = new Map<number, { weight: number; r: number; g: number; b: number; n: number }>();
  let opaque = 0;
  for (let i = 0; i + 3 < pixels.length; i += 4) {
    const r = pixels[i]!;
    const g = pixels[i + 1]!;
    const b = pixels[i + 2]!;
    if (pixels[i + 3]! < 200) continue;
    opaque++;
    const { s, l } = toHsl({ r, g, b });
    if (l > 0.92 || l < 0.1 || s < 0.25) continue;
    const key = ((r >> 5) << 6) | ((g >> 5) << 3) | (b >> 5);
    const bucket = buckets.get(key) ?? { weight: 0, r: 0, g: 0, b: 0, n: 0 };
    bucket.weight += 1 + s;
    bucket.r += r;
    bucket.g += g;
    bucket.b += b;
    bucket.n++;
    buckets.set(key, bucket);
  }
  let best: { weight: number; r: number; g: number; b: number; n: number } | null = null;
  for (const bucket of buckets.values()) if (!best || bucket.weight > best.weight) best = bucket;
  if (!best || best.n < Math.max(4, opaque * 0.02)) return null;
  return { r: Math.round(best.r / best.n), g: Math.round(best.g / best.n), b: Math.round(best.b / best.n) };
}

/** Readable, non-neon accent shades for light and dark mode from one brand color. */
export function brandPalette(color: Rgb): BrandPalette {
  const { h } = toHsl(color);
  const s = Math.round(Math.min(0.68, Math.max(0.4, toHsl(color).s)) * 100);
  return {
    light: `hsl(${h} ${s}% 40%)`,
    dark: `hsl(${h} ${s}% 66%)`,
    softLight: `hsl(${h} ${s}% 96%)`,
    softDark: `hsl(${h} ${s}% 22% / 0.45)`,
  };
}

export function brandCssVars(palette: BrandPalette): CSSProperties {
  return {
    "--brand-light": palette.light,
    "--brand-dark": palette.dark,
    "--brand-soft-light": palette.softLight,
    "--brand-soft-dark": palette.softDark,
  } as CSSProperties;
}
