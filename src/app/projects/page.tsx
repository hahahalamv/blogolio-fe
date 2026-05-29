import type { Metadata } from "next"
import { getAllProjects } from "@/lib/projects"
import { ProjectCard } from "@/components/projects/project-card"

export const metadata: Metadata = {
  title: "Projects — ha lam.",
  description:
    "Tech projects by me",
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 sm:px-12 sm:pt-32">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <span>Projects — {projects.length}</span>
      </p>

      <h1 className="mt-8 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
        I touched these things.
      </h1>

      <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        Browse through my collection of tech projects, spanning from web apps to machine learning experiments. Each one is a snapshot of my learning journey and the fun (really?) I had building it.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="h-32" aria-hidden />
    </section>
  )
}
