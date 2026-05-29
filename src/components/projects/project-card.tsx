import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/projects"
import { FlipText } from "@/components/shared/flip-text"
import { MonogramCover } from "./monogram-cover"

type ProjectCardProps = {
  project: Project
}

const statusLabel: Record<Project["status"], string> = {
  shipped: "Shipped",
  wip: "Work in progress",
  archived: "Archived",
}

export function ProjectCard({ project }: ProjectCardProps) {
  const primaryLink = project.links[0]
  const isExternal = primaryLink?.href.startsWith("http")

  return (
    <article id={project.slug} className="group flex scroll-mt-24 flex-col">
      {/* Cover */}
      {primaryLink ? (
        <Link
          href={primaryLink.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          aria-label={`Open ${project.title}`}
          className="block overflow-hidden rounded-md"
        >
          <CoverInner project={project} />
        </Link>
      ) : (
        <CoverInner project={project} />
      )}

      {/* Meta row */}
      <div className="mt-4 flex items-center gap-x-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>{project.year}</span>
        <span>·</span>
        <span>{statusLabel[project.status]}</span>
        {project.role ? (
          <>
            <span>·</span>
            <span>{project.role}</span>
          </>
        ) : null}
      </div>

      {/* Title */}
      <h3 className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
        {primaryLink ? (
          <Link
            href={primaryLink.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="group/title"
          >
            <FlipText>{project.title}</FlipText>
          </Link>
        ) : (
          <FlipText>{project.title}</FlipText>
        )}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {project.tech.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      {/* Links */}
      {project.links.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs uppercase tracking-widest">
          {project.links.map((link) => {
            const linkExternal = link.href.startsWith("http")
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target={linkExternal ? "_blank" : undefined}
                  rel={
                    linkExternal ? "noopener noreferrer" : undefined
                  }
                  className="group/link inline-flex items-center gap-1 text-foreground/70 transition-colors hover:text-primary"
                >
                  <FlipText>{link.label}</FlipText>
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </Link>
              </li>
            )
          })}
        </ul>
      ) : null}
    </article>
  )
}

function CoverInner({ project }: { project: Project }) {
  if (project.cover) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
    )
  }
  return (
    <div className="transition-transform duration-500 group-hover:scale-[1.02]">
      <MonogramCover title={project.title} />
    </div>
  )
}
