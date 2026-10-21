DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['companies','company_logo','company_business','company_financials','company_culture','company_compensation','company_logistics','company_people','company_talent_growth','company_technologies','company_brand_reputation','company_skill_levels','skill_set_master','proficiency_levels']
  LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS "Public read access" ON public.%I', t);
    EXECUTE format('CREATE POLICY "Public read access" ON public.%I FOR SELECT TO anon, authenticated USING (true)', t);
  END LOOP;
END $$;