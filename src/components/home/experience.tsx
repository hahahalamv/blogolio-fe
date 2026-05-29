type ExperienceItem = {
  title: string
  org: string
  dateRange: string
  bullets: string[]
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineering Intern",
    org: "SAP Labs Vietnam",
    dateRange: "Oct 2025 — Present",
    bullets: [
      "Modernizing Manufacturing Collaboration workflows from legacy Gen1 architecture to next-gen platform services within SAP Business Network.",
      "Owning delivery of production features end-to-end: API contract definition, technical alignment, and cross-team coordination.",
      "Driving SDK packaging and release activities to support internal platform integration and developer adoption.",
      "Building integration and end-to-end automated tests, improving regression coverage and release confidence.",
    ],
  },
  {
    title: "End-to-End QA Intern",
    org: "SAP Labs Vietnam",
    dateRange: "Jul 2025 — Oct 2025",
    bullets: [
      "Authored 100+ automated E2E test scenarios using WebdriverIO (QMATE framework) in TypeScript across SAP Business Network's Goods Receipt Notice and Order Confirmation modules.",
      "Validated API integrations and edge cases across procurement flows, contributing to release-gate test coverage.",
      "Collaborated with cross-functional Agile teams of 8+ engineers and QA leads on enterprise release processes.",
    ],
  },
  {
    title: "Student Researcher",
    org: "Computational Linguistics Center, VNUHCM",
    dateRange: "Oct 2024 — Jun 2025",
    bullets: [
      "Curated and preprocessed a parallel corpus of 30,000+ Chinese/Nôm - Vietnamese sentence pairs in Python.",
      "Supported training of machine translation models for low-resource historical language preservation.",
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
            key={`${exp.org}-${exp.title}-${exp.dateRange}`}
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
              <p className="text-base font-semibold tracking-tight text-primary sm:text-lg">
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
