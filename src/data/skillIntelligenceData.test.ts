import { describe, expect, it } from "vitest";
import {
  DEFAULT_12_SKILLS,
  proficiencyToBloom,
  scoreToCriticality,
  transformCompanySkills,
} from "./skillIntelligenceData";

describe("Skill Intelligence Engine", () => {
  it("maps proficiency scores to Bloom taxonomy correctly according to specification", () => {
    // 1-2 -> CU
    expect(proficiencyToBloom(1).code).toBe("CU");
    expect(proficiencyToBloom(2).code).toBe("CU");

    // 3-4 -> AP
    expect(proficiencyToBloom(3).code).toBe("AP");
    expect(proficiencyToBloom(4).code).toBe("AP");

    // 5-6 -> AS
    expect(proficiencyToBloom(5).code).toBe("AS");
    expect(proficiencyToBloom(6).code).toBe("AS");

    // 7-8 -> EV
    expect(proficiencyToBloom(7).code).toBe("EV");
    expect(proficiencyToBloom(8).code).toBe("EV");

    // 9-10 -> CR
    expect(proficiencyToBloom(9).code).toBe("CR");
    expect(proficiencyToBloom(10).code).toBe("CR");
  });

  it("maps scores to criticality tiers correctly", () => {
    // >= 7 -> Critical
    expect(scoreToCriticality(10).level).toBe("Critical");
    expect(scoreToCriticality(7).level).toBe("Critical");

    // >= 5 and < 7 -> Important
    expect(scoreToCriticality(6).level).toBe("Important");
    expect(scoreToCriticality(5).level).toBe("Important");

    // < 5 -> Baseline
    expect(scoreToCriticality(4).level).toBe("Baseline");
    expect(scoreToCriticality(1).level).toBe("Baseline");
  });

  it("contains exactly 12 skills with 10 roadmap levels each", () => {
    expect(DEFAULT_12_SKILLS).toHaveLength(12);

    for (const skill of DEFAULT_12_SKILLS) {
      expect(skill.requiredScore).toBeGreaterThanOrEqual(1);
      expect(skill.requiredScore).toBeLessThanOrEqual(10);
      expect(skill.roadmap).toHaveLength(10);

      // Verify level numbering and stage division
      skill.roadmap.forEach((step, idx) => {
        expect(step.level).toBe(idx + 1);
        if (step.level <= 3) {
          expect(step.stage).toBe("Fundamentals");
        } else if (step.level <= 7) {
          expect(step.stage).toBe("Intermediate");
        } else {
          expect(step.stage).toBe("Advanced");
        }
      });
    }
  });

  it("dynamically transforms company skills from skill_levels array", () => {
    const mockCompany = {
      name: "Acme Tech",
      skill_levels: [
        { skill: "Data Structures & Algorithms", required_level: 8 },
        { skill: "Cloud & DevOps Infrastructure", required_level: 6 },
        { skill: "Mobile & Cross-Platform Engineering", required_level: 3 },
      ],
    };

    const transformed = transformCompanySkills(mockCompany);
    expect(transformed).toHaveLength(3);
    expect(transformed[0]?.name).toBe("Data Structures & Algorithms");
    expect(transformed[0]?.requiredScore).toBe(8);
    expect(transformed[0]?.roadmap).toHaveLength(10);
    expect(scoreToCriticality(transformed[0]?.requiredScore ?? 0).level).toBe("Critical");

    expect(transformed[1]?.name).toBe("Cloud & DevOps Infrastructure");
    expect(transformed[1]?.requiredScore).toBe(6);
    expect(scoreToCriticality(transformed[1]?.requiredScore ?? 0).level).toBe("Important");

    expect(transformed[2]?.name).toBe("Mobile & Cross-Platform Engineering");
    expect(transformed[2]?.requiredScore).toBe(3);
    expect(scoreToCriticality(transformed[2]?.requiredScore ?? 0).level).toBe("Baseline");
  });

  it("returns empty array when company has no skills or is null", () => {
    expect(transformCompanySkills(null)).toEqual([]);
    expect(transformCompanySkills(undefined)).toEqual([]);
    expect(transformCompanySkills({})).toEqual([]);
    expect(transformCompanySkills({ skill_levels: [] })).toEqual([]);
    expect(transformCompanySkills({ company_skill_levels: [] })).toEqual([]);
  });
});
