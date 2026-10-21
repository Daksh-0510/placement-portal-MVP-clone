import { describe, expect, it } from "vitest";

import { filterCompanies, sortCompanies } from "./directory";

const companies = [
  { company_id: 1, name: "Tata Consultancy Services", short_name: "TCS" },
  { company_id: 2, name: "amazon", short_name: "AMZN" },
  { company_id: 3, name: "Google", short_name: null },
];

describe("company directory search", () => {
  it("lists companies alphabetically by name", () => {
    expect(sortCompanies(companies).map((c) => c["name"])).toEqual([
      "amazon",
      "Google",
      "Tata Consultancy Services",
    ]);
  });

  it("matches the search against the company name", () => {
    expect(filterCompanies(companies, "goo").map((c) => c["company_id"])).toEqual([3]);
  });

  it("matches the search against the short name", () => {
    expect(filterCompanies(companies, "tcs").map((c) => c["company_id"])).toEqual([1]);
  });

  it("stores and restores selected-company in localStorage", () => {
    const selected = { companyId: "1", id: "1", name: "Tata Consultancy Services" };
    localStorage.setItem("selected-company", JSON.stringify(selected));

    const restored = JSON.parse(localStorage.getItem("selected-company") ?? "{}");
    expect(restored.companyId).toBe("1");
    expect(restored.name).toBe("Tata Consultancy Services");
  });
});
