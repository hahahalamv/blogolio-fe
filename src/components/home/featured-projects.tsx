import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedProjects, type Project } from "@/lib/projects"
import { FlipText } from "@/components/shared/flip-text"

function ProjectRow({ project }: { project: Project }) {
  const href = `/projects#${project.slug}`

  return (
    <li>
      <Link
        href={href}
        className="group grid grid-cols-1 gap-3 py-6 sm:grid-cols-[1fr_auto] sm:gap-8 sm:py-8"
      >
        <div>
          <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
            <FlipText>{project.title}</FlipText>
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {project.tech.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
        <ArrowRight className="hidden h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
      </Link>
    </li>
  )
}

export function FeaturedProjects() {
  const projects = getFeaturedProjects(3)

  return (
    <section className="mx-auto mt-32 max-w-6xl px-6 sm:mt-40 sm:px-12">
      <div className="flex items-baseline justify-between">
        <h2 className="font-mono text-sm lowercase tracking-wide text-foreground">
          projects
        </h2>
        <Link
          href="/projects"
          className="group font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <FlipText>View all projects →</FlipText>
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-border/50 border-y border-border/50">
        {projects.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
      </ul>
    </section>
  )
}
