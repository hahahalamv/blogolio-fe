import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import { getAllPosts } from "@/lib/posts"
import { FlipText } from "@/components/shared/flip-text"

export const metadata: Metadata = {
  title: "Writing — ha lam.",
  description: "Notes on Java, Spring Boot, distributed systems, and learning.",
}

function formatDate(iso: string): string {
  return iso.replaceAll("-", ".")
}

export default function WritingPage() {
  const posts = getAllPosts()

  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 sm:px-12 sm:pt-32">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <span>Writing — {posts.length} {posts.length === 1 ? "post" : "posts"}</span>
      </p>

      <h1 className="mt-8 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
        Notes on what I&apos;m building, reading, and learning.
      </h1>

      <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        Mostly Java, Spring Boot, and the long road of getting better at
        algorithms. Occasional thoughts on tooling and dev workflow.
      </p>

      <Link
        href="/writing/tags"
        className="group mt-6 inline-flex items-center font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
      >
        <FlipText>Browse by tag →</FlipText>
      </Link>

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
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
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
