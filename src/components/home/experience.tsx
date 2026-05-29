type ExperienceItem = {
  title: string
  org: string
  dateRange: string
  bullets: string[]
}

// TODO: move to MDX or CMS later if list grows.
const experiences: ExperienceItem[] = [
  {
    title: "Fullstack SWE Intern",
    org: "SAP Labs Vietnam",
    dateRange: "2026 — Present",
    bullets: [
      "Building features across the SAP Cloud ALM stack — Java/Spring on the backend, React on the frontend.",
      "Owning small slices end-to-end: from API design through deployment to internal customers.",
      "Learning enterprise patterns: dependency injection, transaction boundaries, observability with OpenTelemetry.",
    ],
  },
]

export function Experience() {
  return (
    <section className="mx-auto mt-32 max-w-6xl px-6 sm:mt-40 sm:px-12">
      <h2 className="font-mono text-sm lowercase tracking-wide text-foreground">
        experience
      </h2>

      <div className="mt-8 divide-y divide-border/50 border-y border-border/50">
        {experiences.map((exp) => (
          <article
            key={`${exp.org}-${exp.title}`}
            className="grid grid-cols-1 gap-3 py-8 sm:grid-cols-[180px_1fr] sm:gap-8"
          >
            <div className="space-y-1">
              <p className="text-base font-semibold tracking-tight text-foreground">
                {exp.org}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {exp.dateRange}
              </p>
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {exp.title}
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
