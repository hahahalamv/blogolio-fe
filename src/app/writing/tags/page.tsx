import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import { getAllTags } from "@/lib/posts"
import { FlipText } from "@/components/shared/flip-text"

export const metadata: Metadata = {
  title: "Tags — ha lam.",
  description: "All writing topics, sorted by post count.",
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 sm:px-8 sm:pt-24">
      <Link
        href="/writing"
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        <FlipText>All writing</FlipText>
      </Link>

      <h1 className="mt-10 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
        Tags
      </h1>

      <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {tags.length} {tags.length === 1 ? "topic" : "topics"} across all
        writing.
      </p>

      <ul className="mt-12 divide-y divide-border/50 border-y border-border/50">
        {tags.map(({ tag, count }) => (
          <li key={tag}>
            <Link
              href={`/writing/tags/${tag}`}
              className="group flex items-baseline justify-between gap-6 py-5"
            >
              <span className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-xl">
                <FlipText>{`#${tag}`}</FlipText>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {count} {count === 1 ? "post" : "posts"}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="h-32" aria-hidden />
    </section>
  )
}
