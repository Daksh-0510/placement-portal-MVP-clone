import { describe, expect, it } from "vitest";

import { brandPalette, dominantColor } from "./brand-color";

function pixels(...colors: [number, number, number, number, number][]) {
  const out: number[] = [];
  for (const [r, g, b, a, count] of colors) for (let i = 0; i < count; i++) out.push(r, g, b, a);
  return out;
}

describe("brand color", () => {
  it("ignores white backgrounds and transparent pixels", () => {
    const color = dominantColor(pixels([255, 255, 255, 255, 500], [0, 0, 0, 0, 500], [200, 30, 40, 255, 100]));
    expect(color).toEqual({ r: 200, g: 30, b: 40 });
  });

  it("returns no color for a black and white logo", () => {
    expect(dominantColor(pixels([255, 255, 255, 255, 300], [20, 20, 20, 255, 300], [128, 128, 128, 255, 50]))).toBeNull();
  });

  it("tones neon colors down to readable light and dark shades", () => {
    const palette = brandPalette({ r: 0, g: 255, b: 0 });
    expect(palette.light).toBe("hsl(120 68% 40%)");
    expect(palette.dark).toBe("hsl(120 68% 66%)");
  });
});
