<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Directory data access lives only in `src/lib/directory.ts` (client, queries, record helpers) so the data source can be swapped in one place; it wraps the generated Lovable Cloud client.
- Parameter display rules (empty, boolean, list badges, links) live in pure `src/lib/fields.ts` with unit tests, so components stay generic over unknown column names.
- Pages fetch client-side with `useQuery` (not loaders) because the brief requires skeleton loaders and an instant shared-logo transition seeded from the directory cache.
- Theme is a `.dark` class on `<html>` set by an inline head script before paint; colors are semantic tokens in `src/styles.css`, never raw color utilities.
- Logo backups go through the same-origin route `/api/public/logo/$id`, which only serves images for real company IDs (database logo, then website icon), so it cannot act as an open proxy and its images are canvas-readable for brand color extraction.
- Company pages override accent tokens inside a `.brand-scope[data-brand]` wrapper via inline `--brand-*` variables, so per-company color never leaks into the rest of the site.
- Green/red flag rules live in pure `src/lib/insights.ts` with unit tests; components only render its output.
