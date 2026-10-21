import { createFileRoute, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { companiesQueryOptions, getCompanyId } from "@/lib/directory";

export const Route = createFileRoute("/company")({
  component: CompanyLayout,
});

function CompanyLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const companiesQuery = useQuery(companiesQueryOptions);

  useEffect(() => {
    // Only redirect if visiting "/company" or "/company/" directly without an ID
    if (location.pathname === "/company" || location.pathname === "/company/") {
      try {
        const stored = localStorage.getItem("selected-company");
        if (stored) {
          let targetId: string | null = null;
          try {
            const parsed = JSON.parse(stored);
            targetId = parsed.companyId || parsed.id || null;
          } catch {
            targetId = stored.trim();
          }

          if (targetId) {
            navigate({
              to: "/company/$id",
              params: { id: String(targetId) },
              replace: true,
            });
            return;
          }
        }

        // If companies list is loaded and no company was stored, navigate to the first company
        const firstCompany = companiesQuery.data?.[0];
        if (firstCompany) {
          const firstId = getCompanyId(firstCompany);
          if (firstId) {
            navigate({
              to: "/company/$id",
              params: { id: firstId },
              replace: true,
            });
            return;
          }
        }
      } catch (e) {
        console.warn("Failed to restore selected company from localStorage", e);
        navigate({ to: "/", replace: true });
      }
    }
  }, [location.pathname, navigate, companiesQuery.data]);

  return <Outlet />;
}
