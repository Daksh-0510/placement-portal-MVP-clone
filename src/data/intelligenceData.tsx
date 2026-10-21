import type { DataRecord } from "@/lib/directory";

export type IntelligenceSection = {
  id: string;
  slug: string;
  title: string;
  label: string;
  fields: {
    key: string;
    label: string;
    getValue: (company: DataRecord) => unknown;
  }[];
};

/** Helper to extract a value from record or fallback paths */
function getVal(obj: unknown, path: string): unknown {
  if (!obj || typeof obj !== "object") return null;
  const parts = path.split(".");
  let cur: any = obj;
  for (const part of parts) {
    if (cur === null || cur === undefined) return null;
    cur = cur[part];
  }
  return cur;
}

/** Helper to pick the first defined, non-empty value across paths */
function pick(company: DataRecord, paths: string[]): unknown {
  for (const p of paths) {
    const val = getVal(company, p);
    if (val !== null && val !== undefined && val !== "") return val;
  }
  return null;
}

/** Helper to extract child table record (array or object) */
function child(company: DataRecord, table: string): DataRecord {
  const val = company[table];
  if (Array.isArray(val) && val.length > 0) return val[0] as DataRecord;
  if (val && typeof val === "object") return val as DataRecord;
  return {};
}

/**
 * Builds the 22 comprehensive intelligence categories in strict sequence.
 * Preserves all existing data points and maps every parameter cleanly.
 */
export function buildIntelligenceSections(company: DataRecord | null | undefined): IntelligenceSection[] {
  const c = company ?? {};
  const biz = child(c, "company_business");
  const fin = child(c, "company_financials");
  const cul = child(c, "company_culture");
  const comp = child(c, "company_compensation");
  const log = child(c, "company_logistics");
  const ppl = child(c, "company_people");
  const tg = child(c, "company_talent_growth");
  const tech = child(c, "company_technologies");
  const brand = child(c, "company_brand_reputation");

  return [
    // 1. Company Identity
    {
      id: "company-identity",
      slug: "company-identity",
      title: "Company Identity",
      label: "Company Identity",
      fields: [
        { key: "name", label: "Official Name", getValue: () => c["name"] ?? c["company_name"] },
        { key: "short_name", label: "Short Name / Acronym", getValue: () => c["short_name"] },
        { key: "nature_of_company", label: "Nature of Company", getValue: () => c["nature_of_company"] },
        { key: "category", label: "Industry Category", getValue: () => c["category"] },
        { key: "incorporation_year", label: "Incorporation Year", getValue: () => c["incorporation_year"] },
        { key: "company_maturity", label: "Company Maturity", getValue: () => tg["company_maturity"] },
        { key: "brand_value", label: "Brand Equity / Value Tier", getValue: () => tg["brand_value"] },
      ],
    },

    // 2. Overview & Vision
    {
      id: "overview-vision",
      slug: "overview-vision",
      title: "Overview & Vision",
      label: "Overview & Vision",
      fields: [
        { key: "overview_text", label: "Corporate Overview", getValue: () => c["overview_text"] },
        { key: "mission_statement", label: "Mission Statement", getValue: () => c["mission_statement"] },
        { key: "vision_statement", label: "Vision Statement", getValue: () => c["vision_statement"] },
        { key: "mission_clarity", label: "Mission Clarity & Focus", getValue: () => cul["mission_clarity"] },
        { key: "strategic_priorities", label: "Strategic Priorities", getValue: () => pick(c, ["strategic_priorities", "company_strategic_priorities.strategic_priorities", "company_business.strategic_priorities"]) },
        { key: "future_projections", label: "Future Projections", getValue: () => biz["future_projections"] },
      ],
    },

    // 3. Leadership
    {
      id: "leadership",
      slug: "leadership",
      title: "Leadership",
      label: "Leadership",
      fields: [
        { key: "ceo_name", label: "Chief Executive Officer", getValue: () => ppl["ceo_name"] ?? c["ceo_name"] },
        { key: "ceo_linkedin_url", label: "CEO LinkedIn Profile", getValue: () => ppl["ceo_linkedin_url"] },
        { key: "manager_quality", label: "Management Quality Index", getValue: () => cul["manager_quality"] },
        { key: "decision_maker_access", label: "Decision Maker Accessibility", getValue: () => ppl["decision_maker_access"] },
        { key: "board_members", label: "Board Members", getValue: () => pick(c, ["board_members", "company_board_members.board_members"]) },
        { key: "key_leaders", label: "Executive Leadership Team", getValue: () => pick(c, ["key_leaders", "company_key_leaders.key_leaders"]) },
      ],
    },

    // 4. Funding & Financials
    {
      id: "funding-financials",
      slug: "funding-financials",
      title: "Funding & Financials",
      label: "Funding & Financials",
      fields: [
        { key: "annual_revenue", label: "Annual Revenue", getValue: () => fin["annual_revenue"] },
        { key: "annual_profit", label: "Annual Net Profit / EBITDA", getValue: () => fin["annual_profit"] },
        { key: "valuation", label: "Corporate Valuation", getValue: () => fin["valuation"] },
        { key: "total_capital_raised", label: "Total Capital Raised", getValue: () => fin["total_capital_raised"] },
        { key: "profitability_status", label: "Profitability Status", getValue: () => fin["profitability_status"] },
        { key: "yoy_growth_rate", label: "YoY Revenue Growth Rate", getValue: () => fin["yoy_growth_rate"] },
        { key: "runway_months", label: "Cash Runway (Months)", getValue: () => fin["runway_months"] },
        { key: "burn_rate", label: "Monthly Burn Rate", getValue: () => fin["burn_rate"] },
        { key: "burn_multiplier", label: "Burn Multiplier", getValue: () => fin["burn_multiplier"] },
        { key: "key_investors", label: "Key Investors / Backers", getValue: () => pick(c, ["key_investors", "company_key_investors.key_investors"]) },
        { key: "recent_funding_rounds", label: "Recent Funding Rounds", getValue: () => pick(c, ["recent_funding_rounds", "company_recent_funding_rounds.recent_funding_rounds"]) },
      ],
    },

    // 5. Global Presence
    {
      id: "global-presence",
      slug: "global-presence",
      title: "Global Presence",
      label: "Global Presence",
      fields: [
        { key: "headquarters_address", label: "Global Headquarters", getValue: () => c["headquarters_address"] },
        { key: "office_count", label: "Total Worldwide Offices", getValue: () => c["office_count"] },
        { key: "employee_size", label: "Total Global Headcount", getValue: () => c["employee_size"] },
        { key: "operating_countries", label: "Operating Countries", getValue: () => pick(c, ["operating_countries", "company_operating_countries_map.operating_countries", "company_business.operating_countries"]) },
        { key: "office_locations", label: "Key Office Hubs", getValue: () => pick(c, ["office_locations", "company_office_locations_map.office_locations"]) },
        { key: "global_exposure", label: "Global Project Exposure", getValue: () => tg["exposure_quality"] ?? pick(c, ["global_exposure", "company_global_exposure.global_exposure"]) },
      ],
    },

    // 6. Products & Services
    {
      id: "products-services",
      slug: "products-services",
      title: "Products & Services",
      label: "Products & Services",
      fields: [
        { key: "offerings_description", label: "Core Product / Service Offerings", getValue: () => pick(c, ["offerings_description", "company_offerings_description.offerings_description", "company_business.offerings"]) },
        { key: "product_pipeline", label: "Product Roadmap & Pipeline", getValue: () => pick(c, ["product_pipeline", "company_product_pipeline.product_pipeline"]) },
        { key: "revenue_mix", label: "Revenue Stream Diversification", getValue: () => pick(c, ["revenue_mix", "company_revenue_mix.revenue_mix"]) },
        { key: "case_studies", label: "Flagship Client Case Studies", getValue: () => pick(c, ["case_studies", "company_case_studies.case_studies"]) },
      ],
    },

    // 7. Technology Stack
    {
      id: "technology-stack",
      slug: "technology-stack",
      title: "Technology Stack",
      label: "Technology Stack",
      fields: [
        { key: "ai_ml_adoption_level", label: "AI / ML Adoption Maturity", getValue: () => tech["ai_ml_adoption_level"] },
        { key: "r_and_d_investment", label: "R&D Capital Investment", getValue: () => tech["r_and_d_investment"] },
        { key: "tech_stack", label: "Core Tech Stack & Frameworks", getValue: () => pick(c, ["tech_stack", "company_tech_stack.tech_stack", "company_technologies.tech_stack"]) },
        { key: "automation_level", label: "Internal Workflow Automation", getValue: () => tg["automation_level"] },
        { key: "tools_access", label: "Developer Tools & Infrastructure", getValue: () => pick(c, ["tools_access", "company_tools_access.tools_access"]) },
        { key: "tech_adoption_rating", label: "Modern Engineering Practices", getValue: () => pick(c, ["tech_adoption_rating", "company_tech_adoption_rating.tech_adoption_rating"]) },
      ],
    },

    // 8. Partnerships & Ecosystem
    {
      id: "partnerships-ecosystem",
      slug: "partnerships-ecosystem",
      title: "Partnerships & Ecosystem",
      label: "Partnerships & Ecosystem",
      fields: [
        { key: "partnership_ecosystem", label: "Strategic Alliance Network", getValue: () => pick(c, ["partnership_ecosystem", "company_partnership_ecosystem.partnership_ecosystem"]) },
        { key: "technology_partners", label: "Tier-1 Cloud & Tech Partners", getValue: () => pick(c, ["technology_partners", "company_technology_partners.technology_partners"]) },
        { key: "industry_associations", label: "Industry Bodies & Consortia", getValue: () => pick(c, ["industry_associations", "company_industry_associations.industry_associations"]) },
        { key: "event_participation", label: "Global Summit & Conference Presence", getValue: () => pick(c, ["event_participation", "company_event_participation.event_participation"]) },
      ],
    },

    // 9. Competitive Landscape
    {
      id: "competitive-landscape",
      slug: "competitive-landscape",
      title: "Competitive Landscape",
      label: "Competitive Landscape",
      fields: [
        { key: "market_share_percentage", label: "Market Share Percentage", getValue: () => biz["market_share_percentage"] },
        { key: "key_competitors", label: "Direct & Indirect Competitors", getValue: () => pick(c, ["key_competitors", "company_key_competitors.key_competitors"]) },
        { key: "competitive_advantages", label: "Sustainable Competitive Moats", getValue: () => pick(c, ["competitive_advantages", "company_competitive_advantages.competitive_advantages"]) },
        { key: "benchmark_vs_peers", label: "Peer Benchmark Index", getValue: () => pick(c, ["benchmark_vs_peers", "company_benchmark_vs_peers.benchmark_vs_peers"]) },
      ],
    },

    // 10. Market Opportunity
    {
      id: "market-opportunity",
      slug: "market-opportunity",
      title: "Market Opportunity",
      label: "Market Opportunity",
      fields: [
        { key: "tam", label: "Total Addressable Market (TAM)", getValue: () => biz["tam"] },
        { key: "sam", label: "Serviceable Addressable Market (SAM)", getValue: () => biz["sam"] },
        { key: "som", label: "Serviceable Obtainable Market (SOM)", getValue: () => biz["som"] },
        { key: "sales_motion", label: "Go-to-Market / Sales Motion", getValue: () => biz["sales_motion"] },
        { key: "focus_sectors", label: "High-Growth Target Verticals", getValue: () => pick(c, ["focus_sectors", "company_focus_sectors.focus_sectors"]) },
      ],
    },

    // 11. Core Value Proposition & ESG
    {
      id: "value-prop-esg",
      slug: "value-prop-esg",
      title: "Core Value Proposition & ESG",
      label: "Core Value Proposition & ESG",
      fields: [
        { key: "core_value_prop", label: "Unique Value Proposition", getValue: () => pick(c, ["core_value_proposition", "company_core_value_proposition.core_value_proposition"]) },
        { key: "core_values", label: "Guiding Principles & Values", getValue: () => pick(c, ["core_values", "company_core_values.core_values"]) },
        { key: "esg_ratings", label: "ESG Score & Sustainability Grade", getValue: () => pick(c, ["esg_ratings", "company_esg_ratings.esg_ratings"]) },
        { key: "carbon_footprint", label: "Carbon Neutrality & Emissions", getValue: () => c["carbon_footprint"] },
        { key: "ethical_sourcing", label: "Ethical Procurement & Governance", getValue: () => pick(c, ["ethical_sourcing", "company_ethical_sourcing.ethical_sourcing", "ethical_standards"]) },
      ],
    },

    // 12. Culture & Work Life
    {
      id: "culture-work-life",
      slug: "culture-work-life",
      title: "Culture & Work Life",
      label: "Culture & Work Life",
      fields: [
        { key: "psychological_safety", label: "Psychological Safety Score", getValue: () => cul["psychological_safety"] },
        { key: "burnout_risk", label: "Burnout Risk Assessment", getValue: () => cul["burnout_risk"] },
        { key: "typical_hours", label: "Typical Daily Working Hours", getValue: () => log["typical_hours"] },
        { key: "overtime_expectations", label: "Overtime Expectations", getValue: () => log["overtime_expectations"] },
        { key: "weekend_work", label: "Weekend Work Frequency", getValue: () => log["weekend_work"] },
        { key: "remote_policy_details", label: "Remote & Hybrid Flexibility", getValue: () => log["remote_policy_details"] },
        { key: "avg_retention_tenure", label: "Average Employee Retention (Tenure)", getValue: () => cul["avg_retention_tenure"] },
        { key: "employee_turnover", label: "Annual Voluntary Turnover Rate", getValue: () => cul["employee_turnover"] },
        { key: "layoff_history", label: "Historical Layoff Track Record", getValue: () => cul["layoff_history"] },
        { key: "crisis_behavior", label: "Leadership Crisis Management", getValue: () => cul["crisis_behavior"] },
      ],
    },

    // 13. Recent News & Milestones
    {
      id: "recent-news",
      slug: "recent-news",
      title: "Recent News & Milestones",
      label: "Recent News & Milestones",
      fields: [
        { key: "recent_news", label: "Top Recent Press & Major Announcements", getValue: () => pick(c, ["recent_news", "company_recent_news.recent_news"]) },
        { key: "innovation_roadmap", label: "Strategic Milestones & Releases", getValue: () => biz["innovation_roadmap"] },
        { key: "awards_recognitions", label: "Recent Industry Honors & Accolades", getValue: () => pick(c, ["awards_recognitions", "company_awards_recognitions.awards_recognitions"]) },
        { key: "history_timeline", label: "Founding Story & Milestone Timeline", getValue: () => pick(c, ["history_timeline", "company_history.history_timeline"]) },
      ],
    },

    // 14. Sales & Customer Metrics
    {
      id: "sales-customer-metrics",
      slug: "sales-customer-metrics",
      title: "Sales & Customer Metrics",
      label: "Sales & Customer Metrics",
      fields: [
        { key: "net_promoter_score", label: "Net Promoter Score (NPS)", getValue: () => fin["net_promoter_score"] },
        { key: "churn_rate", label: "Annual Customer Churn Rate", getValue: () => fin["churn_rate"] },
        { key: "customer_acquisition_cost", label: "Customer Acquisition Cost (CAC)", getValue: () => fin["customer_acquisition_cost"] },
        { key: "customer_lifetime_value", label: "Customer Lifetime Value (LTV)", getValue: () => fin["customer_lifetime_value"] },
        { key: "cac_ltv_ratio", label: "LTV to CAC Efficiency Ratio", getValue: () => fin["cac_ltv_ratio"] },
        { key: "customer_concentration_risk", label: "Customer Revenue Concentration", getValue: () => biz["customer_concentration_risk"] },
        { key: "top_customers", label: "Marquee Customers & Enterprise Logos", getValue: () => pick(c, ["top_customers", "company_top_customers.top_customers"]) },
        { key: "customer_testimonials", label: "Client Proof Points & Feedback", getValue: () => pick(c, ["customer_testimonials", "company_customer_testimonials.customer_testimonials"]) },
      ],
    },

    // 15. Risk & Compliance
    {
      id: "risk-compliance",
      slug: "risk-compliance",
      title: "Risk & Compliance",
      label: "Risk & Compliance",
      fields: [
        { key: "legal_issues", label: "Litigation & Regulatory Inquiries", getValue: () => c["legal_issues"] },
        { key: "regulatory_status", label: "Statutory & Industry Compliance", getValue: () => pick(c, ["regulatory_status", "company_regulatory_status.regulatory_status"]) },
        { key: "cybersecurity_posture", label: "Data Protection & InfoSec Posture", getValue: () => pick(c, ["cybersecurity_posture", "company_cybersecurity_posture.cybersecurity_posture"]) },
        { key: "macro_risks", label: "Macroeconomic Sensitivity", getValue: () => pick(c, ["macro_risks", "company_macro_risks.macro_risks"]) },
        { key: "geopolitical_risks", label: "Cross-Border & Geopolitical Exposure", getValue: () => pick(c, ["geopolitical_risks", "company_geopolitical_risks.geopolitical_risks"]) },
        { key: "supply_chain_dependencies", label: "Supply Chain & Vendor Dependencies", getValue: () => pick(c, ["supply_chain_dependencies", "company_supply_chain_dependencies.supply_chain_dependencies"]) },
      ],
    },

    // 16. Work Location & Commute
    {
      id: "work-location-commute",
      slug: "work-location-commute",
      title: "Work Location & Commute",
      label: "Work Location & Commute",
      fields: [
        { key: "location_centrality", label: "HQ Neighbourhood / City Hub", getValue: () => log["location_centrality"] },
        { key: "airport_commute_time", label: "Commute Time to International Airport", getValue: () => log["airport_commute_time"] },
        { key: "office_zone_type", label: "Office Zone Classification", getValue: () => log["office_zone_type"] },
        { key: "public_transport_access", label: "Transit & Metro Connectivity", getValue: () => pick(c, ["public_transport_access", "company_public_transport_access.public_transport_access"]) },
        { key: "cab_policy", label: "Company Cab & Commute Support", getValue: () => pick(c, ["cab_policy", "company_cab_policy.cab_policy"]) },
      ],
    },

    // 17. Safety & Wellbeing
    {
      id: "safety-wellbeing",
      slug: "safety-wellbeing",
      title: "Safety & Wellbeing",
      label: "Safety & Wellbeing",
      fields: [
        { key: "safety_policies", label: "Workplace Safety & Anti-Harassment", getValue: () => pick(c, ["safety_policies", "company_safety_policies.safety_policies"]) },
        { key: "emergency_preparedness", label: "Disaster & Emergency Protocol", getValue: () => pick(c, ["emergency_preparedness", "company_emergency_preparedness.emergency_preparedness"]) },
        { key: "health_support", label: "Mental Health & Wellness Subsidies", getValue: () => pick(c, ["health_support", "company_health_support.health_support"]) },
        { key: "family_health_insurance", label: "Family Medical & Health Coverage", getValue: () => pick(c, ["family_health_insurance", "company_family_health_insurance.family_health_insurance"]) },
        { key: "diversity_inclusion", label: "Diversity, Equity & Inclusion Score", getValue: () => pick(c, ["diversity_inclusion_score", "company_diversity_inclusion_score.diversity_inclusion_score", "company_diversity_metrics.diversity_metrics"]) },
      ],
    },

    // 18. Career Growth & Learning
    {
      id: "career-growth-learning",
      slug: "career-growth-learning",
      title: "Career Growth & Learning",
      label: "Career Growth & Learning",
      fields: [
        { key: "training_spend", label: "Annual L&D Spend Per Employee", getValue: () => tg["training_spend"] },
        { key: "onboarding_quality", label: "New Hire Onboarding Quality", getValue: () => tg["onboarding_quality"] },
        { key: "internal_mobility", label: "Internal Role Mobility Index", getValue: () => tg["internal_mobility"] },
        { key: "role_clarity", label: "Performance Metrics & Role Clarity", getValue: () => tg["role_clarity"] },
        { key: "early_ownership", label: "Early Responsibility & Ownership", getValue: () => tg["early_ownership"] },
        { key: "execution_thinking_balance", label: "Strategic Thinking vs Execution", getValue: () => tg["execution_thinking_balance"] },
        { key: "skill_relevance", label: "Industry Relevance of Tech Stack", getValue: () => tg["skill_relevance"] },
        { key: "mentorship_availability", label: "Structured Senior Mentorship", getValue: () => pick(c, ["mentorship_availability", "company_mentorship_availability.mentorship_availability"]) },
        { key: "promotion_clarity", label: "Promotion Criteria Transparency", getValue: () => pick(c, ["promotion_clarity", "company_promotion_clarity.promotion_clarity"]) },
        { key: "exit_opportunities", label: "Alumni Exit Velocity & Placement", getValue: () => pick(c, ["exit_opportunities", "company_exit_opportunities.exit_opportunities"]) },
      ],
    },

    // 19. Brand & Reputation
    {
      id: "brand-reputation",
      slug: "brand-reputation",
      title: "Brand & Reputation",
      label: "Brand & Reputation",
      fields: [
        { key: "brand_sentiment_score", label: "Public Sentiment Index", getValue: () => brand["brand_sentiment_score"] },
        { key: "external_recognition", label: "Global Employer Prestige", getValue: () => tg["external_recognition"] },
        { key: "glassdoor_rating", label: "Glassdoor Overall Rating", getValue: () => brand["glassdoor_rating"] },
        { key: "indeed_rating", label: "Indeed Overall Rating", getValue: () => brand["indeed_rating"] },
        { key: "google_rating", label: "Google Business Rating", getValue: () => brand["google_rating"] },
        { key: "website_quality", label: "Digital Presence Quality Grade", getValue: () => brand["website_quality"] },
      ],
    },

    // 20. Compensation & Benefits
    {
      id: "compensation-benefits",
      slug: "compensation-benefits",
      title: "Compensation & Benefits",
      label: "Compensation & Benefits",
      fields: [
        { key: "fixed_vs_variable_pay", label: "Fixed vs Variable Pay Split", getValue: () => comp["fixed_vs_variable_pay"] },
        { key: "bonus_predictability", label: "Performance Bonus Realization", getValue: () => comp["bonus_predictability"] },
        { key: "esops_incentives", label: "Equity, Stock Options & ESOPs", getValue: () => pick(c, ["esops_incentives", "company_esops_incentives.esops_incentives"]) },
        { key: "lifestyle_benefits", label: "Perks & Lifestyle Subsidies", getValue: () => pick(c, ["lifestyle_benefits", "company_lifestyle_benefits.lifestyle_benefits"]) },
        { key: "leave_policy", label: "Annual PTO & Parental Leave", getValue: () => pick(c, ["leave_policy", "company_leave_policy.leave_policy"]) },
        { key: "relocation_support", label: "Relocation & Moving Allowance", getValue: () => pick(c, ["relocation_support", "company_relocation_support.relocation_support"]) },
      ],
    },

    // 21. Digital Presence & Ratings
    {
      id: "digital-presence-ratings",
      slug: "digital-presence-ratings",
      title: "Digital Presence & Ratings",
      label: "Digital Presence & Ratings",
      fields: [
        { key: "website_url", label: "Official Corporate Website", getValue: () => c["website_url"] },
        { key: "linkedin_url", label: "LinkedIn Company Page", getValue: () => c["linkedin_url"] },
        { key: "twitter_handle", label: "X / Twitter Handle", getValue: () => c["twitter_handle"] },
        { key: "facebook_url", label: "Facebook Presence", getValue: () => c["facebook_url"] },
        { key: "instagram_url", label: "Instagram Handle", getValue: () => c["instagram_url"] },
        { key: "social_media_followers", label: "Aggregated Social Audience", getValue: () => brand["social_media_followers"] },
        { key: "website_traffic_rank", label: "Global Web Traffic Rank", getValue: () => pick(c, ["website_traffic_rank", "company_website_traffic_rank.website_traffic_rank"]) },
      ],
    },

    // 22. Contact Information
    {
      id: "contact-information",
      slug: "contact-information",
      title: "Contact Information",
      label: "Contact Information",
      fields: [
        { key: "primary_contact_email", label: "Corporate Inquiries Email", getValue: () => c["primary_contact_email"] },
        { key: "primary_phone_number", label: "Switchboard / Phone Line", getValue: () => c["primary_phone_number"] },
        { key: "contact_person_name", label: "Key Placement Coordinator", getValue: () => ppl["contact_person_name"] },
        { key: "contact_person_title", label: "Coordinator Designation", getValue: () => ppl["contact_person_title"] },
        { key: "contact_person_email", label: "Coordinator Direct Email", getValue: () => ppl["contact_person_email"] },
        { key: "contact_person_phone", label: "Coordinator Direct Phone", getValue: () => ppl["contact_person_phone"] },
        { key: "warm_intro_pathways", label: "Campus Recruitment Channel", getValue: () => pick(c, ["warm_intro_pathways", "company_warm_intro_pathways.warm_intro_pathways"]) },
      ],
    },
  ];
}
