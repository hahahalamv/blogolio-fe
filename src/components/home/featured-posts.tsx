import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getFeaturedPosts, type Post } from "@/lib/posts"
import { FlipText } from "@/components/shared/flip-text"

function formatDate(iso: string): string {
  // 2026-04-12 → 2026.04.12 (editorial monospace style)
  return iso.replaceAll("-", ".")
}

function PostRow({ post }: { post: Post }) {
  return (
    <li>
      <Link
        href={`/writing/${post.slug}`}
        className="group grid grid-cols-1 gap-3 py-6 sm:grid-cols-[140px_1fr_auto] sm:gap-8 sm:py-8"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {formatDate(post.date)}
        </span>
        <div>
          <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
            <FlipText>{post.title}</FlipText>
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {post.summary}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
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
  )
}

export function FeaturedPosts() {
  const posts = getFeaturedPosts(3)

  return (
    <section className="mx-auto mt-32 max-w-6xl px-6 sm:mt-40 sm:px-12">
      <div className="flex items-baseline justify-between">
        <h2 className="font-mono text-sm lowercase tracking-wide text-foreground">
          writing
        </h2>
        <Link
          href="/writing"
          className="group font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <FlipText>All writing →</FlipText>
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-border/50 border-y border-border/50">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </ul>
    </section>
  )
}
