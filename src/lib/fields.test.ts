import { describe, expect, it } from "vitest";

import { classifyField, humanizeKey } from "./fields";

describe("parameter display rules", () => {
  it("shows null, blank and empty list values as unavailable", () => {
    expect(classifyField("annual_revenue", null).kind).toBe("empty");
    expect(classifyField("annual_revenue", "  ").kind).toBe("empty");
    expect(classifyField("tech_stack", []).kind).toBe("empty");
  });

  it("shows booleans and yes/no policies as boolean values", () => {
    expect(classifyField("remote_policy", true)).toEqual({ kind: "boolean", value: true });
    expect(classifyField("offers_esop", "No")).toEqual({ kind: "boolean", value: false });
  });

  it("turns list-like text into separate badges instead of a comma list", () => {
    expect(classifyField("tech_stack", "React, Go, Rust")).toEqual({
      kind: "list",
      items: ["React", "Go", "Rust"],
    });
    expect(classifyField("tech_stack", ["React", "Go"])).toEqual({ kind: "list", items: ["React", "Go"] });
  });

  it("keeps an ordinary comma in a non-list field as plain text", () => {
    expect(classifyField("headquarters", "Bengaluru, India").kind).toBe("text");
  });

  it("formats parameter names as readable labels", () => {
    expect(humanizeKey("ceo_name")).toBe("CEO name");
  });
});
