import { createFileRoute } from "@tanstack/react-router";

/**
 * Same-origin logo endpoint. Looks up the company's logo in the database,
 * fetches it server-side (avoiding browser hotlink and cross-origin blocks),
 * and falls back to the company website's icon. Only serves images for real
 * company IDs, so it cannot be used as an open proxy.
 */

const MAX_BYTES = 2_000_000;
const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

type Image = { body: ArrayBuffer; type: string };

async function fetchImage(raw: string): Promise<Image | null> {
  let url: URL;
  try {
    url = new URL(raw.trim().startsWith("//") ? `https:${raw.trim()}` : raw.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(url.toString(), {
      headers: { "User-Agent": BROWSER_UA, Accept: "image/avif,image/webp,image/png,image/svg+xml,image/*;q=0.8" },
      redirect: "follow",
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const type = (res.headers.get("content-type") ?? "").split(";")[0]!.trim().toLowerCase();
    if (!type.startsWith("image/")) return null;
    const body = await res.arrayBuffer();
    if (body.byteLength === 0 || body.byteLength > MAX_BYTES) return null;
    return { body, type };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function domainOf(website: unknown): string | null {
  if (typeof website !== "string" || !website.trim()) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(website) ? website : `https://${website}`);
    return url.hostname.replace(/^www\./i, "") || null;
  } catch {
    return null;
  }
}

async function lookupCompany(id: string) {
  const base: string | undefined = process.env["SUPABASE_URL"] || import.meta.env["VITE_SUPABASE_URL"];
  const key: string | undefined =
    process.env["SUPABASE_PUBLISHABLE_KEY"] || import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  if (!base || !key) return null;
  const headers: Record<string, string> = { apikey: key };
  if (!key.startsWith("sb_")) headers["Authorization"] = `Bearer ${key}`;
  const res = await fetch(
    `${base}/rest/v1/companies?select=website_url,company_logo(logo_url)&company_id=eq.${id}&limit=1`,
    { headers },
  );
  if (!res.ok) return null;
  const rows = (await res.json()) as { website_url?: string | null; company_logo?: { logo_url?: string | null }[] }[];
  return rows[0] ?? null;
}

const notFound = () =>
  new Response("Logo not found", { status: 404, headers: { "Cache-Control": "public, max-age=3600" } });

export const Route = createFileRoute("/api/public/logo/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        if (!/^\d{1,9}$/.test(params.id)) return notFound();
        const company = await lookupCompany(params.id);
        if (!company) return notFound();

        const domain = domainOf(company.website_url);
        const candidates = [
          ...(company.company_logo ?? []).map((l) => l.logo_url).filter((u): u is string => Boolean(u?.trim())),
          ...(domain
            ? [
                `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`,
                `https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`,
              ]
            : []),
        ];

        for (const candidate of candidates) {
          const image = await fetchImage(candidate);
          if (!image) continue;
          return new Response(image.body, {
            headers: {
              "Content-Type": image.type,
              "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
              "X-Content-Type-Options": "nosniff",
              "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
            },
          });
        }
        return notFound();
      },
    },
  },
});
