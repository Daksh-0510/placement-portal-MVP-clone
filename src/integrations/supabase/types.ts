export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      cities: {
        Row: {
          city: string
          city_id: number
          countries_id: number
        }
        Insert: {
          city: string
          city_id?: number
          countries_id: number
        }
        Update: {
          city?: string
          city_id?: number
          countries_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "cities_countries_id_fkey"
            columns: ["countries_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["countries_id"]
          },
        ]
      }
      companies: {
        Row: {
          carbon_footprint: string | null
          category: string | null
          company_id: number
          employee_size: string | null
          facebook_url: string | null
          headquarters_address: string | null
          incorporation_year: string | null
          instagram_url: string | null
          legal_issues: string | null
          linkedin_url: string | null
          mission_statement: string | null
          name: string | null
          nature_of_company: string | null
          office_count: string | null
          overview_text: string | null
          primary_contact_email: string | null
          primary_phone_number: string | null
          short_name: string | null
          twitter_handle: string | null
          vision_statement: string | null
          website_url: string | null
        }
        Insert: {
          carbon_footprint?: string | null
          category?: string | null
          company_id: number
          employee_size?: string | null
          facebook_url?: string | null
          headquarters_address?: string | null
          incorporation_year?: string | null
          instagram_url?: string | null
          legal_issues?: string | null
          linkedin_url?: string | null
          mission_statement?: string | null
          name?: string | null
          nature_of_company?: string | null
          office_count?: string | null
          overview_text?: string | null
          primary_contact_email?: string | null
          primary_phone_number?: string | null
          short_name?: string | null
          twitter_handle?: string | null
          vision_statement?: string | null
          website_url?: string | null
        }
        Update: {
          carbon_footprint?: string | null
          category?: string | null
          company_id?: number
          employee_size?: string | null
          facebook_url?: string | null
          headquarters_address?: string | null
          incorporation_year?: string | null
          instagram_url?: string | null
          legal_issues?: string | null
          linkedin_url?: string | null
          mission_statement?: string | null
          name?: string | null
          nature_of_company?: string | null
          office_count?: string | null
          overview_text?: string | null
          primary_contact_email?: string | null
          primary_phone_number?: string | null
          short_name?: string | null
          twitter_handle?: string | null
          vision_statement?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      company_area_safety: {
        Row: {
          area_safety: string | null
          company_area_safety_id: number
          company_logistics_id: number
        }
        Insert: {
          area_safety?: string | null
          company_area_safety_id?: number
          company_logistics_id: number
        }
        Update: {
          area_safety?: string | null
          company_area_safety_id?: number
          company_logistics_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_area_safety_company_logistics_id_fkey"
            columns: ["company_logistics_id"]
            isOneToOne: false
            referencedRelation: "company_logistics"
            referencedColumns: ["company_logistics_id"]
          },
        ]
      }
      company_awards_recognitions: {
        Row: {
          awards_recognitions: string | null
          awards_recognitions_id: number
          brand_reputation_id: number
        }
        Insert: {
          awards_recognitions?: string | null
          awards_recognitions_id?: number
          brand_reputation_id: number
        }
        Update: {
          awards_recognitions?: string | null
          awards_recognitions_id?: number
          brand_reputation_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_awards_recognitions_brand_reputation_id_fkey"
            columns: ["brand_reputation_id"]
            isOneToOne: false
            referencedRelation: "company_brand_reputation"
            referencedColumns: ["brand_reputation_id"]
          },
        ]
      }
      company_benchmark_vs_peers: {
        Row: {
          benchmark_vs_peers: string | null
          company_benchmark_vs_peers_id: number
          company_business_id: number
        }
        Insert: {
          benchmark_vs_peers?: string | null
          company_benchmark_vs_peers_id?: number
          company_business_id: number
        }
        Update: {
          benchmark_vs_peers?: string | null
          company_benchmark_vs_peers_id?: number
          company_business_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_benchmark_vs_peers_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_board_members: {
        Row: {
          board_members: string | null
          company_board_members_id: number
          company_people_id: number
        }
        Insert: {
          board_members?: string | null
          company_board_members_id?: number
          company_people_id: number
        }
        Update: {
          board_members?: string | null
          company_board_members_id?: number
          company_people_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_board_members_company_people_id_fkey"
            columns: ["company_people_id"]
            isOneToOne: false
            referencedRelation: "company_people"
            referencedColumns: ["company_people_id"]
          },
        ]
      }
      company_brand_reputation: {
        Row: {
          brand_reputation_id: number
          brand_sentiment_score: string | null
          company_id: number
          glassdoor_rating: string | null
          google_rating: string | null
          indeed_rating: string | null
          social_media_followers: string | null
          website_quality: string | null
          website_rating: string | null
        }
        Insert: {
          brand_reputation_id?: number
          brand_sentiment_score?: string | null
          company_id: number
          glassdoor_rating?: string | null
          google_rating?: string | null
          indeed_rating?: string | null
          social_media_followers?: string | null
          website_quality?: string | null
          website_rating?: string | null
        }
        Update: {
          brand_reputation_id?: number
          brand_sentiment_score?: string | null
          company_id?: number
          glassdoor_rating?: string | null
          google_rating?: string | null
          indeed_rating?: string | null
          social_media_followers?: string | null
          website_quality?: string | null
          website_rating?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_brand_reputation_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_business: {
        Row: {
          company_business_id: number
          company_id: number
          customer_concentration_risk: string | null
          future_projections: string | null
          innovation_roadmap: string | null
          market_share_percentage: string | null
          sales_motion: string | null
          sam: string | null
          som: string | null
          tam: string | null
        }
        Insert: {
          company_business_id?: number
          company_id: number
          customer_concentration_risk?: string | null
          future_projections?: string | null
          innovation_roadmap?: string | null
          market_share_percentage?: string | null
          sales_motion?: string | null
          sam?: string | null
          som?: string | null
          tam?: string | null
        }
        Update: {
          company_business_id?: number
          company_id?: number
          customer_concentration_risk?: string | null
          future_projections?: string | null
          innovation_roadmap?: string | null
          market_share_percentage?: string | null
          sales_motion?: string | null
          sam?: string | null
          som?: string | null
          tam?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_business_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_cab_policy: {
        Row: {
          cab_policy: string | null
          company_cab_policy_id: number
          company_logistics_id: number
        }
        Insert: {
          cab_policy?: string | null
          company_cab_policy_id?: number
          company_logistics_id: number
        }
        Update: {
          cab_policy?: string | null
          company_cab_policy_id?: number
          company_logistics_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_cab_policy_company_logistics_id_fkey"
            columns: ["company_logistics_id"]
            isOneToOne: false
            referencedRelation: "company_logistics"
            referencedColumns: ["company_logistics_id"]
          },
        ]
      }
      company_case_studies: {
        Row: {
          case_studies: string | null
          company_business_id: number
          company_case_studies_id: number
        }
        Insert: {
          case_studies?: string | null
          company_business_id: number
          company_case_studies_id?: number
        }
        Update: {
          case_studies?: string | null
          company_business_id?: number
          company_case_studies_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_case_studies_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_client_quality: {
        Row: {
          client_quality: string | null
          company_client_quality_id: number
          company_talent_growth_id: number
        }
        Insert: {
          client_quality?: string | null
          company_client_quality_id?: number
          company_talent_growth_id: number
        }
        Update: {
          client_quality?: string | null
          company_client_quality_id?: number
          company_talent_growth_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_client_quality_company_talent_growth_id_fkey"
            columns: ["company_talent_growth_id"]
            isOneToOne: false
            referencedRelation: "company_talent_growth"
            referencedColumns: ["company_talent_growth_id"]
          },
        ]
      }
      company_compensation: {
        Row: {
          bonus_predictability: string | null
          company_compensation_id: number
          company_id: number
          fixed_vs_variable_pay: string | null
        }
        Insert: {
          bonus_predictability?: string | null
          company_compensation_id?: number
          company_id: number
          fixed_vs_variable_pay?: string | null
        }
        Update: {
          bonus_predictability?: string | null
          company_compensation_id?: number
          company_id?: number
          fixed_vs_variable_pay?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_compensation_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_competitive_advantages: {
        Row: {
          company_business_id: number
          company_competitive_advantages_id: number
          competitive_advantages: string | null
        }
        Insert: {
          company_business_id: number
          company_competitive_advantages_id?: number
          competitive_advantages?: string | null
        }
        Update: {
          company_business_id?: number
          company_competitive_advantages_id?: number
          competitive_advantages?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_competitive_advantages_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_core_value_proposition: {
        Row: {
          company_business_id: number
          company_core_value_proposition_id: number
          core_value_proposition: string | null
        }
        Insert: {
          company_business_id: number
          company_core_value_proposition_id?: number
          core_value_proposition?: string | null
        }
        Update: {
          company_business_id?: number
          company_core_value_proposition_id?: number
          core_value_proposition?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_core_value_proposition_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_core_values: {
        Row: {
          company_id: number
          core_values: string | null
          core_values_id: number
        }
        Insert: {
          company_id: number
          core_values?: string | null
          core_values_id?: number
        }
        Update: {
          company_id?: number
          core_values?: string | null
          core_values_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_core_values_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_cross_functional_exposure: {
        Row: {
          company_cross_functional_exposure_id: number
          company_talent_growth_id: number
          cross_functional_exposure: string | null
        }
        Insert: {
          company_cross_functional_exposure_id?: number
          company_talent_growth_id: number
          cross_functional_exposure?: string | null
        }
        Update: {
          company_cross_functional_exposure_id?: number
          company_talent_growth_id?: number
          cross_functional_exposure?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_cross_functional_exposure_company_talent_growth_id_fkey"
            columns: ["company_talent_growth_id"]
            isOneToOne: false
            referencedRelation: "company_talent_growth"
            referencedColumns: ["company_talent_growth_id"]
          },
        ]
      }
      company_culture: {
        Row: {
          avg_retention_tenure: string | null
          burnout_risk: string | null
          company_culture_id: number
          company_id: number
          crisis_behavior: string | null
          employee_turnover: string | null
          layoff_history: string | null
          manager_quality: string | null
          mission_clarity: string | null
          psychological_safety: string | null
        }
        Insert: {
          avg_retention_tenure?: string | null
          burnout_risk?: string | null
          company_culture_id?: number
          company_id: number
          crisis_behavior?: string | null
          employee_turnover?: string | null
          layoff_history?: string | null
          manager_quality?: string | null
          mission_clarity?: string | null
          psychological_safety?: string | null
        }
        Update: {
          avg_retention_tenure?: string | null
          burnout_risk?: string | null
          company_culture_id?: number
          company_id?: number
          crisis_behavior?: string | null
          employee_turnover?: string | null
          layoff_history?: string | null
          manager_quality?: string | null
          mission_clarity?: string | null
          psychological_safety?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_culture_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_customer_testimonials: {
        Row: {
          company_id: number
          customer_testimonials: string | null
          customer_testimonials_id: number
        }
        Insert: {
          company_id: number
          customer_testimonials?: string | null
          customer_testimonials_id?: number
        }
        Update: {
          company_id?: number
          customer_testimonials?: string | null
          customer_testimonials_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_customer_testimonials_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_cybersecurity_posture: {
        Row: {
          company_cybersecurity_posture_id: number
          company_technologies_id: number
          cybersecurity_posture: string | null
        }
        Insert: {
          company_cybersecurity_posture_id?: number
          company_technologies_id: number
          cybersecurity_posture?: string | null
        }
        Update: {
          company_cybersecurity_posture_id?: number
          company_technologies_id?: number
          cybersecurity_posture?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_cybersecurity_posture_company_technologies_id_fkey"
            columns: ["company_technologies_id"]
            isOneToOne: false
            referencedRelation: "company_technologies"
            referencedColumns: ["company_technologies_id"]
          },
        ]
      }
      company_diversity_inclusion_score: {
        Row: {
          company_culture_id: number
          company_diversity_inclusion_score_id: number
          diversity_inclusion_score: string | null
        }
        Insert: {
          company_culture_id: number
          company_diversity_inclusion_score_id?: number
          diversity_inclusion_score?: string | null
        }
        Update: {
          company_culture_id?: number
          company_diversity_inclusion_score_id?: number
          diversity_inclusion_score?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_diversity_inclusion_score_company_culture_id_fkey"
            columns: ["company_culture_id"]
            isOneToOne: false
            referencedRelation: "company_culture"
            referencedColumns: ["company_culture_id"]
          },
        ]
      }
      company_diversity_metrics: {
        Row: {
          company_culture_id: number
          company_diversity_metrics_id: number
          diversity_metrics: string | null
        }
        Insert: {
          company_culture_id: number
          company_diversity_metrics_id?: number
          diversity_metrics?: string | null
        }
        Update: {
          company_culture_id?: number
          company_diversity_metrics_id?: number
          diversity_metrics?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_diversity_metrics_company_culture_id_fkey"
            columns: ["company_culture_id"]
            isOneToOne: false
            referencedRelation: "company_culture"
            referencedColumns: ["company_culture_id"]
          },
        ]
      }
      company_emergency_preparedness: {
        Row: {
          company_emergency_preparedness_id: number
          company_logistics_id: number
          emergency_preparedness: string | null
        }
        Insert: {
          company_emergency_preparedness_id?: number
          company_logistics_id: number
          emergency_preparedness?: string | null
        }
        Update: {
          company_emergency_preparedness_id?: number
          company_logistics_id?: number
          emergency_preparedness?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_emergency_preparedness_company_logistics_id_fkey"
            columns: ["company_logistics_id"]
            isOneToOne: false
            referencedRelation: "company_logistics"
            referencedColumns: ["company_logistics_id"]
          },
        ]
      }
      company_esg_ratings: {
        Row: {
          company_id: number
          esg_ratings: string | null
          esg_ratings_id: number
        }
        Insert: {
          company_id: number
          esg_ratings?: string | null
          esg_ratings_id?: number
        }
        Update: {
          company_id?: number
          esg_ratings?: string | null
          esg_ratings_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_esg_ratings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_esops_incentives: {
        Row: {
          company_compensation_id: number
          company_esops_incentives_id: number
          esops_incentives: string | null
        }
        Insert: {
          company_compensation_id: number
          company_esops_incentives_id?: number
          esops_incentives?: string | null
        }
        Update: {
          company_compensation_id?: number
          company_esops_incentives_id?: number
          esops_incentives?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_esops_incentives_company_compensation_id_fkey"
            columns: ["company_compensation_id"]
            isOneToOne: false
            referencedRelation: "company_compensation"
            referencedColumns: ["company_compensation_id"]
          },
        ]
      }
      company_ethical_sourcing: {
        Row: {
          company_id: number
          ethical_sourcing: string | null
          ethical_sourcing_id: number
        }
        Insert: {
          company_id: number
          ethical_sourcing?: string | null
          ethical_sourcing_id?: number
        }
        Update: {
          company_id?: number
          ethical_sourcing?: string | null
          ethical_sourcing_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_ethical_sourcing_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_ethical_standards: {
        Row: {
          company_culture_id: number
          company_ethical_standards_id: number
          ethical_standards: string | null
        }
        Insert: {
          company_culture_id: number
          company_ethical_standards_id?: number
          ethical_standards?: string | null
        }
        Update: {
          company_culture_id?: number
          company_ethical_standards_id?: number
          ethical_standards?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_ethical_standards_company_culture_id_fkey"
            columns: ["company_culture_id"]
            isOneToOne: false
            referencedRelation: "company_culture"
            referencedColumns: ["company_culture_id"]
          },
        ]
      }
      company_event_participation: {
        Row: {
          brand_reputation_id: number
          event_participation: string | null
          event_participation_id: number
        }
        Insert: {
          brand_reputation_id: number
          event_participation?: string | null
          event_participation_id?: number
        }
        Update: {
          brand_reputation_id?: number
          event_participation?: string | null
          event_participation_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_event_participation_brand_reputation_id_fkey"
            columns: ["brand_reputation_id"]
            isOneToOne: false
            referencedRelation: "company_brand_reputation"
            referencedColumns: ["brand_reputation_id"]
          },
        ]
      }
      company_exit_opportunities: {
        Row: {
          company_exit_opportunities_id: number
          company_talent_growth_id: number
          exit_opportunities: string | null
        }
        Insert: {
          company_exit_opportunities_id?: number
          company_talent_growth_id: number
          exit_opportunities?: string | null
        }
        Update: {
          company_exit_opportunities_id?: number
          company_talent_growth_id?: number
          exit_opportunities?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_exit_opportunities_company_talent_growth_id_fkey"
            columns: ["company_talent_growth_id"]
            isOneToOne: false
            referencedRelation: "company_talent_growth"
            referencedColumns: ["company_talent_growth_id"]
          },
        ]
      }
      company_exit_strategy_history: {
        Row: {
          company_business_id: number
          company_exit_strategy_history_id: number
          exit_strategy_history: string | null
        }
        Insert: {
          company_business_id: number
          company_exit_strategy_history_id?: number
          exit_strategy_history?: string | null
        }
        Update: {
          company_business_id?: number
          company_exit_strategy_history_id?: number
          exit_strategy_history?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_exit_strategy_history_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_family_health_insurance: {
        Row: {
          company_compensation_id: number
          company_family_health_insurance_id: number
          family_health_insurance: string | null
        }
        Insert: {
          company_compensation_id: number
          company_family_health_insurance_id?: number
          family_health_insurance?: string | null
        }
        Update: {
          company_compensation_id?: number
          company_family_health_insurance_id?: number
          family_health_insurance?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_family_health_insurance_company_compensation_id_fkey"
            columns: ["company_compensation_id"]
            isOneToOne: false
            referencedRelation: "company_compensation"
            referencedColumns: ["company_compensation_id"]
          },
        ]
      }
      company_feedback_culture: {
        Row: {
          company_culture_id: number
          company_feedback_culture_id: number
          feedback_culture: string | null
        }
        Insert: {
          company_culture_id: number
          company_feedback_culture_id?: number
          feedback_culture?: string | null
        }
        Update: {
          company_culture_id?: number
          company_feedback_culture_id?: number
          feedback_culture?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_feedback_culture_company_culture_id_fkey"
            columns: ["company_culture_id"]
            isOneToOne: false
            referencedRelation: "company_culture"
            referencedColumns: ["company_culture_id"]
          },
        ]
      }
      company_financials: {
        Row: {
          annual_profit: string | null
          annual_revenue: string | null
          burn_multiplier: string | null
          burn_rate: string | null
          cac_ltv_ratio: string | null
          churn_rate: string | null
          company_financials_id: number
          company_id: number
          customer_acquisition_cost: string | null
          customer_lifetime_value: string | null
          net_promoter_score: string | null
          profitability_status: string | null
          runway_months: string | null
          total_capital_raised: string | null
          valuation: string | null
          yoy_growth_rate: string | null
        }
        Insert: {
          annual_profit?: string | null
          annual_revenue?: string | null
          burn_multiplier?: string | null
          burn_rate?: string | null
          cac_ltv_ratio?: string | null
          churn_rate?: string | null
          company_financials_id?: number
          company_id: number
          customer_acquisition_cost?: string | null
          customer_lifetime_value?: string | null
          net_promoter_score?: string | null
          profitability_status?: string | null
          runway_months?: string | null
          total_capital_raised?: string | null
          valuation?: string | null
          yoy_growth_rate?: string | null
        }
        Update: {
          annual_profit?: string | null
          annual_revenue?: string | null
          burn_multiplier?: string | null
          burn_rate?: string | null
          cac_ltv_ratio?: string | null
          churn_rate?: string | null
          company_financials_id?: number
          company_id?: number
          customer_acquisition_cost?: string | null
          customer_lifetime_value?: string | null
          net_promoter_score?: string | null
          profitability_status?: string | null
          runway_months?: string | null
          total_capital_raised?: string | null
          valuation?: string | null
          yoy_growth_rate?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_financials_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_flexibility_level: {
        Row: {
          company_flexibility_level_id: number
          company_id: number
          flexibility_level: string | null
        }
        Insert: {
          company_flexibility_level_id?: number
          company_id: number
          flexibility_level?: string | null
        }
        Update: {
          company_flexibility_level_id?: number
          company_id?: number
          flexibility_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_flexibility_level_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_focus_sectors: {
        Row: {
          company_business_id: number
          company_focus_sectors_id: number
          focus_sectors: string | null
        }
        Insert: {
          company_business_id: number
          company_focus_sectors_id?: number
          focus_sectors?: string | null
        }
        Update: {
          company_business_id?: number
          company_focus_sectors_id?: number
          focus_sectors?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_focus_sectors_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_geopolitical_risks: {
        Row: {
          company_id: number
          geopolitical_risks: string | null
          geopolitical_risks_id: number
        }
        Insert: {
          company_id: number
          geopolitical_risks?: string | null
          geopolitical_risks_id?: number
        }
        Update: {
          company_id?: number
          geopolitical_risks?: string | null
          geopolitical_risks_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_geopolitical_risks_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_global_exposure: {
        Row: {
          company_global_exposure_id: number
          company_talent_growth_id: number
          global_exposure: string | null
        }
        Insert: {
          company_global_exposure_id?: number
          company_talent_growth_id: number
          global_exposure?: string | null
        }
        Update: {
          company_global_exposure_id?: number
          company_talent_growth_id?: number
          global_exposure?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_global_exposure_company_talent_growth_id_fkey"
            columns: ["company_talent_growth_id"]
            isOneToOne: false
            referencedRelation: "company_talent_growth"
            referencedColumns: ["company_talent_growth_id"]
          },
        ]
      }
      company_go_to_market_strategy: {
        Row: {
          company_business_id: number
          company_go_to_market_strategy_id: number
          go_to_market_strategy: string | null
        }
        Insert: {
          company_business_id: number
          company_go_to_market_strategy_id?: number
          go_to_market_strategy?: string | null
        }
        Update: {
          company_business_id?: number
          company_go_to_market_strategy_id?: number
          go_to_market_strategy?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_go_to_market_strategy_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_health_support: {
        Row: {
          company_compensation_id: number
          company_health_support_id: number
          health_support: string | null
        }
        Insert: {
          company_compensation_id: number
          company_health_support_id?: number
          health_support?: string | null
        }
        Update: {
          company_compensation_id?: number
          company_health_support_id?: number
          health_support?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_health_support_company_compensation_id_fkey"
            columns: ["company_compensation_id"]
            isOneToOne: false
            referencedRelation: "company_compensation"
            referencedColumns: ["company_compensation_id"]
          },
        ]
      }
      company_hiring_velocity: {
        Row: {
          company_culture_id: number
          company_hiring_velocity_id: number
          hiring_velocity: string | null
        }
        Insert: {
          company_culture_id: number
          company_hiring_velocity_id?: number
          hiring_velocity?: string | null
        }
        Update: {
          company_culture_id?: number
          company_hiring_velocity_id?: number
          hiring_velocity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_hiring_velocity_company_culture_id_fkey"
            columns: ["company_culture_id"]
            isOneToOne: false
            referencedRelation: "company_culture"
            referencedColumns: ["company_culture_id"]
          },
        ]
      }
      company_history: {
        Row: {
          company_id: number
          history__id: number
          history_timeline: string | null
        }
        Insert: {
          company_id: number
          history__id?: number
          history_timeline?: string | null
        }
        Update: {
          company_id?: number
          history__id?: number
          history_timeline?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_history_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_industry_associations: {
        Row: {
          company_business_id: number
          company_industry_associations_id: number
          industry_associations: string | null
        }
        Insert: {
          company_business_id: number
          company_industry_associations_id?: number
          industry_associations?: string | null
        }
        Update: {
          company_business_id?: number
          company_industry_associations_id?: number
          industry_associations?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_industry_associations_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_infrastructure_safety: {
        Row: {
          company_infrastructure_safety_id: number
          company_logistics_id: number
          infrastructure_safety: string | null
        }
        Insert: {
          company_infrastructure_safety_id?: number
          company_logistics_id: number
          infrastructure_safety?: string | null
        }
        Update: {
          company_infrastructure_safety_id?: number
          company_logistics_id?: number
          infrastructure_safety?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_infrastructure_safety_company_logistics_id_fkey"
            columns: ["company_logistics_id"]
            isOneToOne: false
            referencedRelation: "company_logistics"
            referencedColumns: ["company_logistics_id"]
          },
        ]
      }
      company_innovation_roadmap: {
        Row: {
          company_business_id: number
          company_innovation_roadmap_id: number
          innovation_roadmap: string | null
        }
        Insert: {
          company_business_id: number
          company_innovation_roadmap_id?: number
          innovation_roadmap?: string | null
        }
        Update: {
          company_business_id?: number
          company_innovation_roadmap_id?: number
          innovation_roadmap?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_innovation_roadmap_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_intellectual_property: {
        Row: {
          company_intellectual_property_id: number
          company_technologies_id: number
          intellectual_property: string | null
        }
        Insert: {
          company_intellectual_property_id?: number
          company_technologies_id: number
          intellectual_property?: string | null
        }
        Update: {
          company_intellectual_property_id?: number
          company_technologies_id?: number
          intellectual_property?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_intellectual_property_company_technologies_id_fkey"
            columns: ["company_technologies_id"]
            isOneToOne: false
            referencedRelation: "company_technologies"
            referencedColumns: ["company_technologies_id"]
          },
        ]
      }
      company_json: {
        Row: {
          company_id: number
          full_json: Json | null
          json_id: number
          short_json: Json | null
        }
        Insert: {
          company_id: number
          full_json?: Json | null
          json_id?: number
          short_json?: Json | null
        }
        Update: {
          company_id?: number
          full_json?: Json | null
          json_id?: number
          short_json?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "company_json_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_key_challenges_needs: {
        Row: {
          company_business_id: number
          company_key_challenges_needs_id: number
          key_challenges_needs: string | null
        }
        Insert: {
          company_business_id: number
          company_key_challenges_needs_id?: number
          key_challenges_needs?: string | null
        }
        Update: {
          company_business_id?: number
          company_key_challenges_needs_id?: number
          key_challenges_needs?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_key_challenges_needs_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_key_competitors: {
        Row: {
          company_business_id: number
          company_key_competitors_id: number
          key_competitors: string | null
        }
        Insert: {
          company_business_id: number
          company_key_competitors_id?: number
          key_competitors?: string | null
        }
        Update: {
          company_business_id?: number
          company_key_competitors_id?: number
          key_competitors?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_key_competitors_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_key_investors: {
        Row: {
          company_financials_id: number
          company_key_investors_id: number
          key_investors: string | null
        }
        Insert: {
          company_financials_id: number
          company_key_investors_id?: number
          key_investors?: string | null
        }
        Update: {
          company_financials_id?: number
          company_key_investors_id?: number
          key_investors?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_key_investors_company_financials_id_fkey"
            columns: ["company_financials_id"]
            isOneToOne: false
            referencedRelation: "company_financials"
            referencedColumns: ["company_financials_id"]
          },
        ]
      }
      company_key_leaders: {
        Row: {
          company_key_leaders_id: number
          company_people_id: number
          key_leaders: string | null
        }
        Insert: {
          company_key_leaders_id?: number
          company_people_id: number
          key_leaders?: string | null
        }
        Update: {
          company_key_leaders_id?: number
          company_people_id?: number
          key_leaders?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_key_leaders_company_people_id_fkey"
            columns: ["company_people_id"]
            isOneToOne: false
            referencedRelation: "company_people"
            referencedColumns: ["company_people_id"]
          },
        ]
      }
      company_learning_culture: {
        Row: {
          company_learning_culture_id: number
          company_talent_growth_id: number
          learning_culture: string | null
        }
        Insert: {
          company_learning_culture_id?: number
          company_talent_growth_id: number
          learning_culture?: string | null
        }
        Update: {
          company_learning_culture_id?: number
          company_talent_growth_id?: number
          learning_culture?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_learning_culture_company_talent_growth_id_fkey"
            columns: ["company_talent_growth_id"]
            isOneToOne: false
            referencedRelation: "company_talent_growth"
            referencedColumns: ["company_talent_growth_id"]
          },
        ]
      }
      company_leave_policy: {
        Row: {
          company_compensation_id: number
          company_leave_policy_id: number
          leave_policy: string | null
        }
        Insert: {
          company_compensation_id: number
          company_leave_policy_id?: number
          leave_policy?: string | null
        }
        Update: {
          company_compensation_id?: number
          company_leave_policy_id?: number
          leave_policy?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_leave_policy_company_compensation_id_fkey"
            columns: ["company_compensation_id"]
            isOneToOne: false
            referencedRelation: "company_compensation"
            referencedColumns: ["company_compensation_id"]
          },
        ]
      }
      company_lifestyle_benefits: {
        Row: {
          company_compensation_id: number
          company_lifestyle_benefits_id: number
          lifestyle_benefits: string | null
        }
        Insert: {
          company_compensation_id: number
          company_lifestyle_benefits_id?: number
          lifestyle_benefits?: string | null
        }
        Update: {
          company_compensation_id?: number
          company_lifestyle_benefits_id?: number
          lifestyle_benefits?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_lifestyle_benefits_company_compensation_id_fkey"
            columns: ["company_compensation_id"]
            isOneToOne: false
            referencedRelation: "company_compensation"
            referencedColumns: ["company_compensation_id"]
          },
        ]
      }
      company_logistics: {
        Row: {
          airport_commute_time: string | null
          company_id: number
          company_logistics_id: number
          location_centrality: string | null
          office_zone_type: string | null
          overtime_expectations: string | null
          remote_policy_details: string | null
          typical_hours: string | null
          weekend_work: string | null
        }
        Insert: {
          airport_commute_time?: string | null
          company_id: number
          company_logistics_id?: number
          location_centrality?: string | null
          office_zone_type?: string | null
          overtime_expectations?: string | null
          remote_policy_details?: string | null
          typical_hours?: string | null
          weekend_work?: string | null
        }
        Update: {
          airport_commute_time?: string | null
          company_id?: number
          company_logistics_id?: number
          location_centrality?: string | null
          office_zone_type?: string | null
          overtime_expectations?: string | null
          remote_policy_details?: string | null
          typical_hours?: string | null
          weekend_work?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_logistics_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_logo: {
        Row: {
          company_id: number
          company_logo_id: number
          logo_url: string | null
        }
        Insert: {
          company_id: number
          company_logo_id?: number
          logo_url?: string | null
        }
        Update: {
          company_id?: number
          company_logo_id?: number
          logo_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_logo_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_macro_risks: {
        Row: {
          company_id: number
          macro_risks: string | null
          macro_risks_id: number
        }
        Insert: {
          company_id: number
          macro_risks?: string | null
          macro_risks_id?: number
        }
        Update: {
          company_id?: number
          macro_risks?: string | null
          macro_risks_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_macro_risks_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_marketing_videos: {
        Row: {
          company_id: number
          marketing_video_url: string | null
          marketing_videos_id: number
        }
        Insert: {
          company_id: number
          marketing_video_url?: string | null
          marketing_videos_id?: number
        }
        Update: {
          company_id?: number
          marketing_video_url?: string | null
          marketing_videos_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_marketing_videos_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_mentorship_availability: {
        Row: {
          company_mentorship_availability_id: number
          company_talent_growth_id: number
          mentorship_availability: string | null
        }
        Insert: {
          company_mentorship_availability_id?: number
          company_talent_growth_id: number
          mentorship_availability?: string | null
        }
        Update: {
          company_mentorship_availability_id?: number
          company_talent_growth_id?: number
          mentorship_availability?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_mentorship_availability_company_talent_growth_id_fkey"
            columns: ["company_talent_growth_id"]
            isOneToOne: false
            referencedRelation: "company_talent_growth"
            referencedColumns: ["company_talent_growth_id"]
          },
        ]
      }
      company_network_strength: {
        Row: {
          company_network_strength_id: number
          company_talent_growth_id: number
          network_strength: string | null
        }
        Insert: {
          company_network_strength_id?: number
          company_talent_growth_id: number
          network_strength?: string | null
        }
        Update: {
          company_network_strength_id?: number
          company_talent_growth_id?: number
          network_strength?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_network_strength_company_talent_growth_id_fkey"
            columns: ["company_talent_growth_id"]
            isOneToOne: false
            referencedRelation: "company_talent_growth"
            referencedColumns: ["company_talent_growth_id"]
          },
        ]
      }
      company_offerings_description: {
        Row: {
          company_business_id: number
          company_offerings_description_id: number
          offerings_description: string | null
        }
        Insert: {
          company_business_id: number
          company_offerings_description_id?: number
          offerings_description?: string | null
        }
        Update: {
          company_business_id?: number
          company_offerings_description_id?: number
          offerings_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_offerings_description_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_office_locations_map: {
        Row: {
          city_id: number
          company_id: number
        }
        Insert: {
          city_id: number
          company_id: number
        }
        Update: {
          city_id?: number
          company_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_office_locations_map_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["city_id"]
          },
          {
            foreignKeyName: "company_office_locations_map_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_operating_countries_map: {
        Row: {
          company_id: number
          countries_id: number
        }
        Insert: {
          company_id: number
          countries_id: number
        }
        Update: {
          company_id?: number
          countries_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_operating_countries_map_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "company_operating_countries_map_countries_id_fkey"
            columns: ["countries_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["countries_id"]
          },
        ]
      }
      company_pain_points_addressed: {
        Row: {
          company_business_id: number
          company_pain_points_addressed_id: number
          pain_points_addressed: string | null
        }
        Insert: {
          company_business_id: number
          company_pain_points_addressed_id?: number
          pain_points_addressed?: string | null
        }
        Update: {
          company_business_id?: number
          company_pain_points_addressed_id?: number
          pain_points_addressed?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_pain_points_addressed_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_partnership_ecosystem: {
        Row: {
          company_partnership_ecosystem_id: number
          company_technologies_id: number
          partnership_ecosystem: string | null
        }
        Insert: {
          company_partnership_ecosystem_id?: number
          company_technologies_id: number
          partnership_ecosystem?: string | null
        }
        Update: {
          company_partnership_ecosystem_id?: number
          company_technologies_id?: number
          partnership_ecosystem?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_partnership_ecosystem_company_technologies_id_fkey"
            columns: ["company_technologies_id"]
            isOneToOne: false
            referencedRelation: "company_technologies"
            referencedColumns: ["company_technologies_id"]
          },
        ]
      }
      company_people: {
        Row: {
          ceo_linkedin_url: string | null
          ceo_name: string | null
          company_id: number
          company_people_id: number
          contact_person_email: string | null
          contact_person_name: string | null
          contact_person_phone: string | null
          contact_person_title: string | null
          decision_maker_access: string | null
        }
        Insert: {
          ceo_linkedin_url?: string | null
          ceo_name?: string | null
          company_id: number
          company_people_id?: number
          contact_person_email?: string | null
          contact_person_name?: string | null
          contact_person_phone?: string | null
          contact_person_title?: string | null
          decision_maker_access?: string | null
        }
        Update: {
          ceo_linkedin_url?: string | null
          ceo_name?: string | null
          company_id?: number
          company_people_id?: number
          contact_person_email?: string | null
          contact_person_name?: string | null
          contact_person_phone?: string | null
          contact_person_title?: string | null
          decision_maker_access?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_people_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_product_pipeline: {
        Row: {
          company_business_id: number
          company_product_pipeline_id: number
          product_pipeline: string | null
        }
        Insert: {
          company_business_id: number
          company_product_pipeline_id?: number
          product_pipeline?: string | null
        }
        Update: {
          company_business_id?: number
          company_product_pipeline_id?: number
          product_pipeline?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_product_pipeline_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_promotion_clarity: {
        Row: {
          company_promotion_clarity_id: number
          company_talent_growth_id: number
          promotion_clarity: string | null
        }
        Insert: {
          company_promotion_clarity_id?: number
          company_talent_growth_id: number
          promotion_clarity?: string | null
        }
        Update: {
          company_promotion_clarity_id?: number
          company_talent_growth_id?: number
          promotion_clarity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_promotion_clarity_company_talent_growth_id_fkey"
            columns: ["company_talent_growth_id"]
            isOneToOne: false
            referencedRelation: "company_talent_growth"
            referencedColumns: ["company_talent_growth_id"]
          },
        ]
      }
      company_public_transport_access: {
        Row: {
          company_logistics_id: number
          company_public_transport_access_id: number
          public_transport_access: string | null
        }
        Insert: {
          company_logistics_id: number
          company_public_transport_access_id?: number
          public_transport_access?: string | null
        }
        Update: {
          company_logistics_id?: number
          company_public_transport_access_id?: number
          public_transport_access?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_public_transport_access_company_logistics_id_fkey"
            columns: ["company_logistics_id"]
            isOneToOne: false
            referencedRelation: "company_logistics"
            referencedColumns: ["company_logistics_id"]
          },
        ]
      }
      company_recent_funding_rounds: {
        Row: {
          company_financials_id: number
          company_recent_funding_rounds_id: number
          recent_funding_rounds: string | null
        }
        Insert: {
          company_financials_id: number
          company_recent_funding_rounds_id?: number
          recent_funding_rounds?: string | null
        }
        Update: {
          company_financials_id?: number
          company_recent_funding_rounds_id?: number
          recent_funding_rounds?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_recent_funding_rounds_company_financials_id_fkey"
            columns: ["company_financials_id"]
            isOneToOne: false
            referencedRelation: "company_financials"
            referencedColumns: ["company_financials_id"]
          },
        ]
      }
      company_recent_news: {
        Row: {
          company_id: number
          recent_news: string | null
          recent_news_id: number
        }
        Insert: {
          company_id: number
          recent_news?: string | null
          recent_news_id?: number
        }
        Update: {
          company_id?: number
          recent_news?: string | null
          recent_news_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_recent_news_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_regulatory_status: {
        Row: {
          company_id: number
          regulatory_status: string | null
          regulatory_status_id: number
        }
        Insert: {
          company_id: number
          regulatory_status?: string | null
          regulatory_status_id?: number
        }
        Update: {
          company_id?: number
          regulatory_status?: string | null
          regulatory_status_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_regulatory_status_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_relocation_support: {
        Row: {
          company_compensation_id: number
          company_relocation_support_id: number
          relocation_support: string | null
        }
        Insert: {
          company_compensation_id: number
          company_relocation_support_id?: number
          relocation_support?: string | null
        }
        Update: {
          company_compensation_id?: number
          company_relocation_support_id?: number
          relocation_support?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_relocation_support_company_compensation_id_fkey"
            columns: ["company_compensation_id"]
            isOneToOne: false
            referencedRelation: "company_compensation"
            referencedColumns: ["company_compensation_id"]
          },
        ]
      }
      company_revenue_mix: {
        Row: {
          company_financials_id: number
          company_revenue_mix_id: number
          revenue_mix: string | null
        }
        Insert: {
          company_financials_id: number
          company_revenue_mix_id?: number
          revenue_mix?: string | null
        }
        Update: {
          company_financials_id?: number
          company_revenue_mix_id?: number
          revenue_mix?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_revenue_mix_company_financials_id_fkey"
            columns: ["company_financials_id"]
            isOneToOne: false
            referencedRelation: "company_financials"
            referencedColumns: ["company_financials_id"]
          },
        ]
      }
      company_safety_policies: {
        Row: {
          company_logistics_id: number
          company_safety_policies_id: number
          safety_policies: string | null
        }
        Insert: {
          company_logistics_id: number
          company_safety_policies_id?: number
          safety_policies?: string | null
        }
        Update: {
          company_logistics_id?: number
          company_safety_policies_id?: number
          safety_policies?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_safety_policies_company_logistics_id_fkey"
            columns: ["company_logistics_id"]
            isOneToOne: false
            referencedRelation: "company_logistics"
            referencedColumns: ["company_logistics_id"]
          },
        ]
      }
      company_skill_levels: {
        Row: {
          company_id: number
          created_at: string | null
          id: number
          required_level: number
          required_proficiency_level_id: number
          skill_set_id: number
        }
        Insert: {
          company_id: number
          created_at?: string | null
          id?: number
          required_level: number
          required_proficiency_level_id: number
          skill_set_id: number
        }
        Update: {
          company_id?: number
          created_at?: string | null
          id?: number
          required_level?: number
          required_proficiency_level_id?: number
          skill_set_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_skill_levels_required_proficiency_level_id_fkey"
            columns: ["required_proficiency_level_id"]
            isOneToOne: false
            referencedRelation: "proficiency_levels"
            referencedColumns: ["proficiency_level_id"]
          },
          {
            foreignKeyName: "company_skill_levels_skill_set_id_fkey"
            columns: ["skill_set_id"]
            isOneToOne: false
            referencedRelation: "skill_set_master"
            referencedColumns: ["skill_set_id"]
          },
        ]
      }
      company_strategic_priorities: {
        Row: {
          company_business_id: number
          company_strategic_priorities_id: number
          strategic_priorities: string | null
        }
        Insert: {
          company_business_id: number
          company_strategic_priorities_id?: number
          strategic_priorities?: string | null
        }
        Update: {
          company_business_id?: number
          company_strategic_priorities_id?: number
          strategic_priorities?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_strategic_priorities_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_supply_chain_dependencies: {
        Row: {
          company_id: number
          company_supply_chain_dependencies_id: number
          supply_chain_dependencies: string | null
        }
        Insert: {
          company_id: number
          company_supply_chain_dependencies_id?: number
          supply_chain_dependencies?: string | null
        }
        Update: {
          company_id?: number
          company_supply_chain_dependencies_id?: number
          supply_chain_dependencies?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_supply_chain_dependencies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_sustainability_csr: {
        Row: {
          company_culture_id: number
          company_sustainability_csr_id: number
          sustainability_csr: string | null
        }
        Insert: {
          company_culture_id: number
          company_sustainability_csr_id?: number
          sustainability_csr?: string | null
        }
        Update: {
          company_culture_id?: number
          company_sustainability_csr_id?: number
          sustainability_csr?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_sustainability_csr_company_culture_id_fkey"
            columns: ["company_culture_id"]
            isOneToOne: false
            referencedRelation: "company_culture"
            referencedColumns: ["company_culture_id"]
          },
        ]
      }
      company_talent_growth: {
        Row: {
          automation_level: string | null
          brand_value: string | null
          company_id: number
          company_maturity: string | null
          company_talent_growth_id: number
          early_ownership: string | null
          execution_thinking_balance: string | null
          exposure_quality: string | null
          external_recognition: string | null
          internal_mobility: string | null
          onboarding_quality: string | null
          role_clarity: string | null
          skill_relevance: string | null
          training_spend: string | null
        }
        Insert: {
          automation_level?: string | null
          brand_value?: string | null
          company_id: number
          company_maturity?: string | null
          company_talent_growth_id?: number
          early_ownership?: string | null
          execution_thinking_balance?: string | null
          exposure_quality?: string | null
          external_recognition?: string | null
          internal_mobility?: string | null
          onboarding_quality?: string | null
          role_clarity?: string | null
          skill_relevance?: string | null
          training_spend?: string | null
        }
        Update: {
          automation_level?: string | null
          brand_value?: string | null
          company_id?: number
          company_maturity?: string | null
          company_talent_growth_id?: number
          early_ownership?: string | null
          execution_thinking_balance?: string | null
          exposure_quality?: string | null
          external_recognition?: string | null
          internal_mobility?: string | null
          onboarding_quality?: string | null
          role_clarity?: string | null
          skill_relevance?: string | null
          training_spend?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_talent_growth_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_tech_adoption_rating: {
        Row: {
          company_tech_adoption_rating_id: number
          company_technologies_id: number
          tech_adoption_rating: string | null
        }
        Insert: {
          company_tech_adoption_rating_id?: number
          company_technologies_id: number
          tech_adoption_rating?: string | null
        }
        Update: {
          company_tech_adoption_rating_id?: number
          company_technologies_id?: number
          tech_adoption_rating?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_tech_adoption_rating_company_technologies_id_fkey"
            columns: ["company_technologies_id"]
            isOneToOne: false
            referencedRelation: "company_technologies"
            referencedColumns: ["company_technologies_id"]
          },
        ]
      }
      company_tech_stack: {
        Row: {
          company_tech_stack_id: number
          company_technologies_id: number
          tech_stack: string | null
        }
        Insert: {
          company_tech_stack_id?: number
          company_technologies_id: number
          tech_stack?: string | null
        }
        Update: {
          company_tech_stack_id?: number
          company_technologies_id?: number
          tech_stack?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_tech_stack_company_technologies_id_fkey"
            columns: ["company_technologies_id"]
            isOneToOne: false
            referencedRelation: "company_technologies"
            referencedColumns: ["company_technologies_id"]
          },
        ]
      }
      company_technologies: {
        Row: {
          ai_ml_adoption_level: string | null
          company_id: number
          company_technologies_id: number
          r_and_d_investment: string | null
        }
        Insert: {
          ai_ml_adoption_level?: string | null
          company_id: number
          company_technologies_id?: number
          r_and_d_investment?: string | null
        }
        Update: {
          ai_ml_adoption_level?: string | null
          company_id?: number
          company_technologies_id?: number
          r_and_d_investment?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_technologies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_technology_partners: {
        Row: {
          company_technologies_id: number
          company_technology_partners_id: number
          technology_partners: string | null
        }
        Insert: {
          company_technologies_id: number
          company_technology_partners_id?: number
          technology_partners?: string | null
        }
        Update: {
          company_technologies_id?: number
          company_technology_partners_id?: number
          technology_partners?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_technology_partners_company_technologies_id_fkey"
            columns: ["company_technologies_id"]
            isOneToOne: false
            referencedRelation: "company_technologies"
            referencedColumns: ["company_technologies_id"]
          },
        ]
      }
      company_tools_access: {
        Row: {
          company_talent_growth_id: number
          company_tools_access_id: number
          tools_access: string | null
        }
        Insert: {
          company_talent_growth_id: number
          company_tools_access_id?: number
          tools_access?: string | null
        }
        Update: {
          company_talent_growth_id?: number
          company_tools_access_id?: number
          tools_access?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_tools_access_company_talent_growth_id_fkey"
            columns: ["company_talent_growth_id"]
            isOneToOne: false
            referencedRelation: "company_talent_growth"
            referencedColumns: ["company_talent_growth_id"]
          },
        ]
      }
      company_top_customers: {
        Row: {
          company_business_id: number
          company_top_customers_id: number
          top_customers: string | null
        }
        Insert: {
          company_business_id: number
          company_top_customers_id?: number
          top_customers?: string | null
        }
        Update: {
          company_business_id?: number
          company_top_customers_id?: number
          top_customers?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_top_customers_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_unique_differentiators: {
        Row: {
          company_business_id: number
          company_unique_differentiators_id: number
          unique_differentiators: string | null
        }
        Insert: {
          company_business_id: number
          company_unique_differentiators_id?: number
          unique_differentiators?: string | null
        }
        Update: {
          company_business_id?: number
          company_unique_differentiators_id?: number
          unique_differentiators?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_unique_differentiators_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_warm_intro_pathways: {
        Row: {
          company_people_id: number
          company_warm_intro_pathways_id: number
          warm_intro_pathways: string | null
        }
        Insert: {
          company_people_id: number
          company_warm_intro_pathways_id?: number
          warm_intro_pathways?: string | null
        }
        Update: {
          company_people_id?: number
          company_warm_intro_pathways_id?: number
          warm_intro_pathways?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_warm_intro_pathways_company_people_id_fkey"
            columns: ["company_people_id"]
            isOneToOne: false
            referencedRelation: "company_people"
            referencedColumns: ["company_people_id"]
          },
        ]
      }
      company_weaknesses_gaps: {
        Row: {
          company_business_id: number
          company_weaknesses_gaps_id: number
          weaknesses_gaps: string | null
        }
        Insert: {
          company_business_id: number
          company_weaknesses_gaps_id?: number
          weaknesses_gaps?: string | null
        }
        Update: {
          company_business_id?: number
          company_weaknesses_gaps_id?: number
          weaknesses_gaps?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_weaknesses_gaps_company_business_id_fkey"
            columns: ["company_business_id"]
            isOneToOne: false
            referencedRelation: "company_business"
            referencedColumns: ["company_business_id"]
          },
        ]
      }
      company_website_traffic_rank: {
        Row: {
          brand_reputation_id: number
          website_traffic_rank: string | null
          website_traffic_rank_id: number
        }
        Insert: {
          brand_reputation_id: number
          website_traffic_rank?: string | null
          website_traffic_rank_id?: number
        }
        Update: {
          brand_reputation_id?: number
          website_traffic_rank?: string | null
          website_traffic_rank_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_website_traffic_rank_brand_reputation_id_fkey"
            columns: ["brand_reputation_id"]
            isOneToOne: false
            referencedRelation: "company_brand_reputation"
            referencedColumns: ["brand_reputation_id"]
          },
        ]
      }
      company_work_culture_summary: {
        Row: {
          company_culture_id: number
          company_work_culture_summary_id: number
          work_culture_summary: string | null
        }
        Insert: {
          company_culture_id: number
          company_work_culture_summary_id?: number
          work_culture_summary?: string | null
        }
        Update: {
          company_culture_id?: number
          company_work_culture_summary_id?: number
          work_culture_summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_work_culture_summary_company_culture_id_fkey"
            columns: ["company_culture_id"]
            isOneToOne: false
            referencedRelation: "company_culture"
            referencedColumns: ["company_culture_id"]
          },
        ]
      }
      company_work_impact: {
        Row: {
          company_talent_growth_id: number
          company_work_impact_id: number
          work_impact: string | null
        }
        Insert: {
          company_talent_growth_id: number
          company_work_impact_id?: number
          work_impact?: string | null
        }
        Update: {
          company_talent_growth_id?: number
          company_work_impact_id?: number
          work_impact?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_work_impact_company_talent_growth_id_fkey"
            columns: ["company_talent_growth_id"]
            isOneToOne: false
            referencedRelation: "company_talent_growth"
            referencedColumns: ["company_talent_growth_id"]
          },
        ]
      }
      countries: {
        Row: {
          countries_id: number
          country: string
        }
        Insert: {
          countries_id?: number
          country: string
        }
        Update: {
          countries_id?: number
          country?: string
        }
        Relationships: []
      }
      proficiency_levels: {
        Row: {
          proficiency_code: string
          proficiency_description: string | null
          proficiency_level_id: number
          proficiency_name: string
        }
        Insert: {
          proficiency_code: string
          proficiency_description?: string | null
          proficiency_level_id: number
          proficiency_name: string
        }
        Update: {
          proficiency_code?: string
          proficiency_description?: string | null
          proficiency_level_id?: number
          proficiency_name?: string
        }
        Relationships: []
      }
      skill_set_master: {
        Row: {
          short_name: string
          skill_set_description: string | null
          skill_set_id: number
          skill_set_name: string
        }
        Insert: {
          short_name: string
          skill_set_description?: string | null
          skill_set_id?: number
          skill_set_name: string
        }
        Update: {
          short_name?: string
          skill_set_description?: string | null
          skill_set_id?: number
          skill_set_name?: string
        }
        Relationships: []
      }
      skill_set_topics: {
        Row: {
          created_at: string | null
          level_number: number
          skill_set_id: number
          topic_id: number
          topics: string
        }
        Insert: {
          created_at?: string | null
          level_number: number
          skill_set_id: number
          topic_id?: number
          topics: string
        }
        Update: {
          created_at?: string | null
          level_number?: number
          skill_set_id?: number
          topic_id?: number
          topics?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_set_topics_skill_set_id_fkey"
            columns: ["skill_set_id"]
            isOneToOne: false
            referencedRelation: "skill_set_master"
            referencedColumns: ["skill_set_id"]
          },
        ]
      }
      staging_company: {
        Row: {
          ai_ml_adoption_level: string | null
          airport_commute_time: string | null
          annual_profit: string | null
          annual_revenue: string | null
          area_safety: string | null
          automation_level: string | null
          avg_retention_tenure: string | null
          awards_recognitions: string | null
          benchmark_vs_peers: string | null
          board_members: string | null
          bonus_predictability: string | null
          brand_sentiment_score: string | null
          brand_value: string | null
          burn_multiplier: string | null
          burn_rate: string | null
          burnout_risk: string | null
          cab_policy: string | null
          cac_ltv_ratio: string | null
          carbon_footprint: string | null
          case_studies: string | null
          category: string | null
          ceo_linkedin_url: string | null
          ceo_name: string | null
          churn_rate: string | null
          client_quality: string | null
          company_id: number
          company_maturity: string | null
          competitive_advantages: string | null
          contact_person_email: string | null
          contact_person_name: string | null
          contact_person_phone: string | null
          contact_person_title: string | null
          core_value_proposition: string | null
          core_values: string | null
          crisis_behavior: string | null
          cross_functional_exposure: string | null
          customer_acquisition_cost: string | null
          customer_concentration_risk: string | null
          customer_lifetime_value: string | null
          customer_testimonials: string | null
          cybersecurity_posture: string | null
          decision_maker_access: string | null
          diversity_inclusion_score: string | null
          diversity_metrics: string | null
          early_ownership: string | null
          emergency_preparedness: string | null
          employee_size: string | null
          employee_turnover: string | null
          error_message: string | null
          esg_ratings: string | null
          esops_incentives: string | null
          ethical_sourcing: string | null
          ethical_standards: string | null
          event_participation: string | null
          execution_thinking_balance: string | null
          exit_opportunities: string | null
          exit_strategy_history: string | null
          exposure_quality: string | null
          external_recognition: string | null
          facebook_url: string | null
          family_health_insurance: string | null
          feedback_culture: string | null
          fixed_vs_variable_pay: string | null
          flexibility_level: string | null
          focus_sectors: string | null
          future_projections: string | null
          geopolitical_risks: string | null
          glassdoor_rating: string | null
          global_exposure: string | null
          go_to_market_strategy: string | null
          google_rating: string | null
          headquarters_address: string | null
          health_support: string | null
          hiring_velocity: string | null
          history_timeline: string | null
          incorporation_year: string | null
          indeed_rating: string | null
          industry_associations: string | null
          infrastructure_safety: string | null
          innovation_roadmap: string | null
          inserted_at: string | null
          instagram_url: string | null
          intellectual_property: string | null
          internal_mobility: string | null
          key_challenges_needs: string | null
          key_competitors: string | null
          key_investors: string | null
          key_leaders: string | null
          layoff_history: string | null
          learning_culture: string | null
          leave_policy: string | null
          legal_issues: string | null
          lifestyle_benefits: string | null
          linkedin_url: string | null
          location_centrality: string | null
          logo_url: string | null
          macro_risks: string | null
          manager_quality: string | null
          market_share_percentage: string | null
          marketing_video_url: string | null
          mentorship_availability: string | null
          mission_clarity: string | null
          mission_statement: string | null
          name: string | null
          nature_of_company: string | null
          net_promoter_score: string | null
          network_strength: string | null
          offerings_description: string | null
          office_count: string | null
          office_locations: string | null
          office_zone_type: string | null
          onboarding_quality: string | null
          operating_countries: string | null
          overtime_expectations: string | null
          overview_text: string | null
          pain_points_addressed: string | null
          partnership_ecosystem: string | null
          primary_contact_email: string | null
          primary_phone_number: string | null
          processed_at: string | null
          processing_status: string | null
          product_pipeline: string | null
          profitability_status: string | null
          promotion_clarity: string | null
          psychological_safety: string | null
          public_transport_access: string | null
          r_and_d_investment: string | null
          recent_funding_rounds: string | null
          recent_news: string | null
          regulatory_status: string | null
          relocation_support: string | null
          remote_policy_details: string | null
          revenue_mix: string | null
          role_clarity: string | null
          runway_months: string | null
          safety_policies: string | null
          sales_motion: string | null
          sam: string | null
          short_name: string | null
          skill_relevance: string | null
          social_media_followers: string | null
          som: string | null
          staging_id: number
          strategic_priorities: string | null
          supply_chain_dependencies: string | null
          sustainability_csr: string | null
          tam: string | null
          tech_adoption_rating: string | null
          tech_stack: string | null
          technology_partners: string | null
          tools_access: string | null
          top_customers: string | null
          total_capital_raised: string | null
          training_spend: string | null
          twitter_handle: string | null
          typical_hours: string | null
          unique_differentiators: string | null
          valuation: string | null
          vision_statement: string | null
          warm_intro_pathways: string | null
          weaknesses_gaps: string | null
          website_quality: string | null
          website_rating: string | null
          website_traffic_rank: string | null
          website_url: string | null
          weekend_work: string | null
          work_culture_summary: string | null
          work_impact: string | null
          yoy_growth_rate: string | null
        }
        Insert: {
          ai_ml_adoption_level?: string | null
          airport_commute_time?: string | null
          annual_profit?: string | null
          annual_revenue?: string | null
          area_safety?: string | null
          automation_level?: string | null
          avg_retention_tenure?: string | null
          awards_recognitions?: string | null
          benchmark_vs_peers?: string | null
          board_members?: string | null
          bonus_predictability?: string | null
          brand_sentiment_score?: string | null
          brand_value?: string | null
          burn_multiplier?: string | null
          burn_rate?: string | null
          burnout_risk?: string | null
          cab_policy?: string | null
          cac_ltv_ratio?: string | null
          carbon_footprint?: string | null
          case_studies?: string | null
          category?: string | null
          ceo_linkedin_url?: string | null
          ceo_name?: string | null
          churn_rate?: string | null
          client_quality?: string | null
          company_id: number
          company_maturity?: string | null
          competitive_advantages?: string | null
          contact_person_email?: string | null
          contact_person_name?: string | null
          contact_person_phone?: string | null
          contact_person_title?: string | null
          core_value_proposition?: string | null
          core_values?: string | null
          crisis_behavior?: string | null
          cross_functional_exposure?: string | null
          customer_acquisition_cost?: string | null
          customer_concentration_risk?: string | null
          customer_lifetime_value?: string | null
          customer_testimonials?: string | null
          cybersecurity_posture?: string | null
          decision_maker_access?: string | null
          diversity_inclusion_score?: string | null
          diversity_metrics?: string | null
          early_ownership?: string | null
          emergency_preparedness?: string | null
          employee_size?: string | null
          employee_turnover?: string | null
          error_message?: string | null
          esg_ratings?: string | null
          esops_incentives?: string | null
          ethical_sourcing?: string | null
          ethical_standards?: string | null
          event_participation?: string | null
          execution_thinking_balance?: string | null
          exit_opportunities?: string | null
          exit_strategy_history?: string | null
          exposure_quality?: string | null
          external_recognition?: string | null
          facebook_url?: string | null
          family_health_insurance?: string | null
          feedback_culture?: string | null
          fixed_vs_variable_pay?: string | null
          flexibility_level?: string | null
          focus_sectors?: string | null
          future_projections?: string | null
          geopolitical_risks?: string | null
          glassdoor_rating?: string | null
          global_exposure?: string | null
          go_to_market_strategy?: string | null
          google_rating?: string | null
          headquarters_address?: string | null
          health_support?: string | null
          hiring_velocity?: string | null
          history_timeline?: string | null
          incorporation_year?: string | null
          indeed_rating?: string | null
          industry_associations?: string | null
          infrastructure_safety?: string | null
          innovation_roadmap?: string | null
          inserted_at?: string | null
          instagram_url?: string | null
          intellectual_property?: string | null
          internal_mobility?: string | null
          key_challenges_needs?: string | null
          key_competitors?: string | null
          key_investors?: string | null
          key_leaders?: string | null
          layoff_history?: string | null
          learning_culture?: string | null
          leave_policy?: string | null
          legal_issues?: string | null
          lifestyle_benefits?: string | null
          linkedin_url?: string | null
          location_centrality?: string | null
          logo_url?: string | null
          macro_risks?: string | null
          manager_quality?: string | null
          market_share_percentage?: string | null
          marketing_video_url?: string | null
          mentorship_availability?: string | null
          mission_clarity?: string | null
          mission_statement?: string | null
          name?: string | null
          nature_of_company?: string | null
          net_promoter_score?: string | null
          network_strength?: string | null
          offerings_description?: string | null
          office_count?: string | null
          office_locations?: string | null
          office_zone_type?: string | null
          onboarding_quality?: string | null
          operating_countries?: string | null
          overtime_expectations?: string | null
          overview_text?: string | null
          pain_points_addressed?: string | null
          partnership_ecosystem?: string | null
          primary_contact_email?: string | null
          primary_phone_number?: string | null
          processed_at?: string | null
          processing_status?: string | null
          product_pipeline?: string | null
          profitability_status?: string | null
          promotion_clarity?: string | null
          psychological_safety?: string | null
          public_transport_access?: string | null
          r_and_d_investment?: string | null
          recent_funding_rounds?: string | null
          recent_news?: string | null
          regulatory_status?: string | null
          relocation_support?: string | null
          remote_policy_details?: string | null
          revenue_mix?: string | null
          role_clarity?: string | null
          runway_months?: string | null
          safety_policies?: string | null
          sales_motion?: string | null
          sam?: string | null
          short_name?: string | null
          skill_relevance?: string | null
          social_media_followers?: string | null
          som?: string | null
          staging_id?: number
          strategic_priorities?: string | null
          supply_chain_dependencies?: string | null
          sustainability_csr?: string | null
          tam?: string | null
          tech_adoption_rating?: string | null
          tech_stack?: string | null
          technology_partners?: string | null
          tools_access?: string | null
          top_customers?: string | null
          total_capital_raised?: string | null
          training_spend?: string | null
          twitter_handle?: string | null
          typical_hours?: string | null
          unique_differentiators?: string | null
          valuation?: string | null
          vision_statement?: string | null
          warm_intro_pathways?: string | null
          weaknesses_gaps?: string | null
          website_quality?: string | null
          website_rating?: string | null
          website_traffic_rank?: string | null
          website_url?: string | null
          weekend_work?: string | null
          work_culture_summary?: string | null
          work_impact?: string | null
          yoy_growth_rate?: string | null
        }
        Update: {
          ai_ml_adoption_level?: string | null
          airport_commute_time?: string | null
          annual_profit?: string | null
          annual_revenue?: string | null
          area_safety?: string | null
          automation_level?: string | null
          avg_retention_tenure?: string | null
          awards_recognitions?: string | null
          benchmark_vs_peers?: string | null
          board_members?: string | null
          bonus_predictability?: string | null
          brand_sentiment_score?: string | null
          brand_value?: string | null
          burn_multiplier?: string | null
          burn_rate?: string | null
          burnout_risk?: string | null
          cab_policy?: string | null
          cac_ltv_ratio?: string | null
          carbon_footprint?: string | null
          case_studies?: string | null
          category?: string | null
          ceo_linkedin_url?: string | null
          ceo_name?: string | null
          churn_rate?: string | null
          client_quality?: string | null
          company_id?: number
          company_maturity?: string | null
          competitive_advantages?: string | null
          contact_person_email?: string | null
          contact_person_name?: string | null
          contact_person_phone?: string | null
          contact_person_title?: string | null
          core_value_proposition?: string | null
          core_values?: string | null
          crisis_behavior?: string | null
          cross_functional_exposure?: string | null
          customer_acquisition_cost?: string | null
          customer_concentration_risk?: string | null
          customer_lifetime_value?: string | null
          customer_testimonials?: string | null
          cybersecurity_posture?: string | null
          decision_maker_access?: string | null
          diversity_inclusion_score?: string | null
          diversity_metrics?: string | null
          early_ownership?: string | null
          emergency_preparedness?: string | null
          employee_size?: string | null
          employee_turnover?: string | null
          error_message?: string | null
          esg_ratings?: string | null
          esops_incentives?: string | null
          ethical_sourcing?: string | null
          ethical_standards?: string | null
          event_participation?: string | null
          execution_thinking_balance?: string | null
          exit_opportunities?: string | null
          exit_strategy_history?: string | null
          exposure_quality?: string | null
          external_recognition?: string | null
          facebook_url?: string | null
          family_health_insurance?: string | null
          feedback_culture?: string | null
          fixed_vs_variable_pay?: string | null
          flexibility_level?: string | null
          focus_sectors?: string | null
          future_projections?: string | null
          geopolitical_risks?: string | null
          glassdoor_rating?: string | null
          global_exposure?: string | null
          go_to_market_strategy?: string | null
          google_rating?: string | null
          headquarters_address?: string | null
          health_support?: string | null
          hiring_velocity?: string | null
          history_timeline?: string | null
          incorporation_year?: string | null
          indeed_rating?: string | null
          industry_associations?: string | null
          infrastructure_safety?: string | null
          innovation_roadmap?: string | null
          inserted_at?: string | null
          instagram_url?: string | null
          intellectual_property?: string | null
          internal_mobility?: string | null
          key_challenges_needs?: string | null
          key_competitors?: string | null
          key_investors?: string | null
          key_leaders?: string | null
          layoff_history?: string | null
          learning_culture?: string | null
          leave_policy?: string | null
          legal_issues?: string | null
          lifestyle_benefits?: string | null
          linkedin_url?: string | null
          location_centrality?: string | null
          logo_url?: string | null
          macro_risks?: string | null
          manager_quality?: string | null
          market_share_percentage?: string | null
          marketing_video_url?: string | null
          mentorship_availability?: string | null
          mission_clarity?: string | null
          mission_statement?: string | null
          name?: string | null
          nature_of_company?: string | null
          net_promoter_score?: string | null
          network_strength?: string | null
          offerings_description?: string | null
          office_count?: string | null
          office_locations?: string | null
          office_zone_type?: string | null
          onboarding_quality?: string | null
          operating_countries?: string | null
          overtime_expectations?: string | null
          overview_text?: string | null
          pain_points_addressed?: string | null
          partnership_ecosystem?: string | null
          primary_contact_email?: string | null
          primary_phone_number?: string | null
          processed_at?: string | null
          processing_status?: string | null
          product_pipeline?: string | null
          profitability_status?: string | null
          promotion_clarity?: string | null
          psychological_safety?: string | null
          public_transport_access?: string | null
          r_and_d_investment?: string | null
          recent_funding_rounds?: string | null
          recent_news?: string | null
          regulatory_status?: string | null
          relocation_support?: string | null
          remote_policy_details?: string | null
          revenue_mix?: string | null
          role_clarity?: string | null
          runway_months?: string | null
          safety_policies?: string | null
          sales_motion?: string | null
          sam?: string | null
          short_name?: string | null
          skill_relevance?: string | null
          social_media_followers?: string | null
          som?: string | null
          staging_id?: number
          strategic_priorities?: string | null
          supply_chain_dependencies?: string | null
          sustainability_csr?: string | null
          tam?: string | null
          tech_adoption_rating?: string | null
          tech_stack?: string | null
          technology_partners?: string | null
          tools_access?: string | null
          top_customers?: string | null
          total_capital_raised?: string | null
          training_spend?: string | null
          twitter_handle?: string | null
          typical_hours?: string | null
          unique_differentiators?: string | null
          valuation?: string | null
          vision_statement?: string | null
          warm_intro_pathways?: string | null
          weaknesses_gaps?: string | null
          website_quality?: string | null
          website_rating?: string | null
          website_traffic_rank?: string | null
          website_url?: string | null
          weekend_work?: string | null
          work_culture_summary?: string | null
          work_impact?: string | null
          yoy_growth_rate?: string | null
        }
        Relationships: []
      }
      staging_company_skill_levels: {
        Row: {
          ai_native_engineering: string | null
          aptitude_and_problem_solving: string | null
          coding: string | null
          communication_skills: string | null
          companies: string
          computer_networking: string | null
          created_at: string | null
          data_structures_and_algorithms: string | null
          devops_and_cloud: string | null
          error_message: string | null
          id: number
          object_oriented_programming_and_design: string | null
          operating_system: string | null
          processed: boolean | null
          processed_at: string | null
          software_engineering: string | null
          sql_and_design: string | null
          system_design_and_architecture: string | null
        }
        Insert: {
          ai_native_engineering?: string | null
          aptitude_and_problem_solving?: string | null
          coding?: string | null
          communication_skills?: string | null
          companies: string
          computer_networking?: string | null
          created_at?: string | null
          data_structures_and_algorithms?: string | null
          devops_and_cloud?: string | null
          error_message?: string | null
          id?: number
          object_oriented_programming_and_design?: string | null
          operating_system?: string | null
          processed?: boolean | null
          processed_at?: string | null
          software_engineering?: string | null
          sql_and_design?: string | null
          system_design_and_architecture?: string | null
        }
        Update: {
          ai_native_engineering?: string | null
          aptitude_and_problem_solving?: string | null
          coding?: string | null
          communication_skills?: string | null
          companies?: string
          computer_networking?: string | null
          created_at?: string | null
          data_structures_and_algorithms?: string | null
          devops_and_cloud?: string | null
          error_message?: string | null
          id?: number
          object_oriented_programming_and_design?: string | null
          operating_system?: string | null
          processed?: boolean | null
          processed_at?: string | null
          software_engineering?: string | null
          sql_and_design?: string | null
          system_design_and_architecture?: string | null
        }
        Relationships: []
      }
      staging_skill_topics: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: number
          levels: string
          processed: boolean | null
          processed_at: string | null
          skill_area: string
          topics: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: number
          levels: string
          processed?: boolean | null
          processed_at?: string | null
          skill_area: string
          topics: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: number
          levels?: string
          processed?: boolean | null
          processed_at?: string | null
          skill_area?: string
          topics?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_city_id: { Args: { city_country_text: string }; Returns: number }
      get_country_id: { Args: { country_name: string }; Returns: number }
      get_or_create_company: {
        Args: { company_name_input: string }
        Returns: number
      }
      get_proficiency_level_id: { Args: { prof_code: string }; Returns: number }
      get_skill_set_id: { Args: { skill_name: string }; Returns: number }
      parse_level_number: { Args: { level_text: string }; Returns: number }
      parse_skill_value: {
        Args: { skill_value: string }
        Returns: {
          proficiency_code: string
          required_level: number
        }[]
      }
      split_semicolon: { Args: { input_text: string }; Returns: string[] }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
