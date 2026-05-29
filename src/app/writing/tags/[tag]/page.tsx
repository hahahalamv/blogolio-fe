import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  getAllTags,
  getPostsByTag,
} from "@/lib/posts"
import { FlipText } from "@/components/shared/flip-text"

type PageProps = {
  params: { tag: string }
}

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tag = params.tag
  return {
    title: `#${tag} — ha lam.`,
    description: `Writing tagged ${tag}.`,
  }
}

function formatDate(iso: string): string {
  return iso.replaceAll("-", ".")
}

export default function TagPage({ params }: PageProps) {
  const tag = params.tag
  const posts = getPostsByTag(tag)

  if (posts.length === 0) notFound()

  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 sm:px-12 sm:pt-32">
      <Link
        href="/writing/tags"
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        <FlipText>All tags</FlipText>
      </Link>

      <p className="mt-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Tag — {posts.length} {posts.length === 1 ? "post" : "posts"}
      </p>

      <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
        #{tag}
      </h1>

      <ul className="mt-16 divide-y divide-border/50 border-y border-border/50">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group grid grid-cols-1 gap-3 py-6 sm:grid-cols-[140px_1fr_auto] sm:gap-8 sm:py-8"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {formatDate(post.date)}
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                  <FlipText>{post.title}</FlipText>
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {post.summary}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {post.readingMinutes} min read
                  </span>
                </div>
              </div>
              <ArrowUpRight className="hidden h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
            </Link>
          </li>
        ))}
      </ul>

      <div className="h-32" aria-hidden />
    </section>
  )
}
