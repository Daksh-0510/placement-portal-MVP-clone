export type LegalSection = {
  heading: string;
  body: (string | string[])[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function LegalPage({ eyebrow, title, updated, intro, sections }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pt-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <header className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-4 text-sm text-muted-foreground">Last updated {updated}</p>
            <nav aria-label="Sections" className="mt-10 hidden lg:block">
              <ol className="space-y-0.5 border-l border-border">
                {sections.map((section, index) => (
                  <li key={section.heading}>
                    <a
                      href={`#${slugify(section.heading)}`}
                      className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-foreground hover:bg-accent hover:text-foreground"
                    >
                      <span className="tabular-nums text-xs leading-5">{String(index + 1).padStart(2, "0")}</span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </header>

        <article className="min-w-0 lg:col-span-8 lg:col-start-5 xl:col-span-7">
          <p className="text-lg leading-relaxed text-foreground">{intro}</p>
          {sections.map((section, index) => (
            <section
              key={section.heading}
              id={slugify(section.heading)}
              className="scroll-mt-28 border-t border-border pt-8 mt-10"
            >
              <h2 className="flex items-baseline gap-3 text-xl font-semibold tracking-tight">
                <span className="tabular-nums text-xs font-normal text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                {section.body.map((block, i) =>
                  Array.isArray(block) ? (
                    <ul key={i} className="list-disc space-y-2 pl-5 marker:text-border-strong">
                      {block.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i}>{block}</p>
                  ),
                )}
              </div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
