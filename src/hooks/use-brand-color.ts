import { useEffect, useState } from "react";

import { brandPalette, dominantColor, type BrandPalette } from "@/lib/brand-color";

/** Reads the dominant color of a same-origin logo image after hydration. */
export function useBrandColor(src: string | null): BrandPalette | null {
  const [palette, setPalette] = useState<BrandPalette | null>(null);

  useEffect(() => {
    setPalette(null);
    if (!src) return;
    let cancelled = false;
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (cancelled) return;
      try {
        const size = 48;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, size, size);
        const color = dominantColor(ctx.getImageData(0, 0, size, size).data);
        if (!cancelled) setPalette(color ? brandPalette(color) : null);
      } catch {
        // Unreadable image: keep the default accent.
      }
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return palette;
}
