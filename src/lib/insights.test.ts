import { describe, expect, it } from "vitest";

import { evaluateBottomLine, isGreenSignal, isRedSignal } from "./insights";

describe("green flags", () => {
  it("flags high psychological safety", () => expect(isGreenSignal("High")).toBe(true));
  it("flags provided family health insurance", () => expect(isGreenSignal("Provided")).toBe(true));
  it("does not flag hedged values like Medium–High", () => expect(isGreenSignal("Medium–High")).toBe(false));
  it("does not flag missing data", () => expect(isGreenSignal("NA")).toBe(false));
});

describe("red flags", () => {
  it("flags frequent weekend work", () => expect(isRedSignal("Frequent")).toBe(true));
  it("flags periodic restructuring", () => expect(isRedSignal("Periodic restructuring")).toBe(true));
  it("flags medium to high burnout", () => expect(isRedSignal("Medium to high")).toBe(true));
  it("ignores reassuring layoff history", () => expect(isRedSignal("No major layoffs reported")).toBe(false));
  it("ignores rare weekend work", () => expect(isRedSignal("Rare")).toBe(false));
  it("ignores low burnout", () => expect(isRedSignal("Low; Strong WLB 4.3/5")).toBe(false));
});

describe("the bottom line", () => {
  it("reads flags across the culture, growth and logistics tables", () => {
    const result = evaluateBottomLine({
      company_id: 1,
      company_culture: [{ psychological_safety: "High", burnout_risk: "High", layoff_history: "None" }],
      company_talent_growth: [{ internal_mobility: "Strong" }],
      company_logistics: [{ weekend_work: "Expected" }],
    });
    expect(result.green.map((f) => f.key)).toEqual(["psychological_safety", "internal_mobility"]);
    expect(result.red.map((f) => f.key)).toEqual(["burnout_risk", "weekend_work"]);
  });
});
