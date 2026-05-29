import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"
import { getAllSlugs, getAllPosts, getPostBySlug } from "@/lib/posts"
import { mdxComponents } from "@/lib/mdx-components"
import { FlipText } from "@/components/shared/flip-text"

type PageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: "Not found" }
  return {
    title: `${post.title} — ha lam.`,
    description: post.summary,
  }
}

const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
}

function formatDate(iso: string): string {
  return iso.replaceAll("-", ".")
}

export default async function WritingDetailPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const all = getAllPosts()
  const idx = all.findIndex((p) => p.slug === post.slug)
  // Posts are sorted newest-first, so idx-1 is newer, idx+1 is older.
  const newer = idx > 0 ? all[idx - 1] : null
  const older = idx < all.length - 1 ? all[idx + 1] : null

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, prettyCodeOptions],
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["no-underline"],
              },
            },
          ],
        ],
      },
    },
  })

  return (
    <article className="mx-auto max-w-3xl px-6 pt-16 sm:px-8 sm:pt-24">
      {/* Breadcrumb back */}
      <Link
        href="/writing"
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        <FlipText>All writing</FlipText>
      </Link>

      {/* Header */}
      <header className="mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          <span className="mx-3 text-border">/</span>
          <span>{post.readingMinutes} min read</span>
        </p>

        <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          {post.title}
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {post.summary}
        </p>

        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-widest">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/writing/tags/${tag}`}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Divider */}
      <hr className="mt-12 border-border/60" />

      {/* MDX content */}
      <div className="prose-editorial">{content}</div>

      {/* Footer nav — stacked rows so long titles never overlap */}
      <nav
        aria-label="Writing navigation"
        className="mt-24 divide-y divide-border/50 border-y border-border/50"
      >
        {older ? (
          <Link
            href={`/writing/${older.slug}`}
            className="group grid grid-cols-1 gap-2 py-6 sm:grid-cols-[1fr_120px] sm:gap-8"
          >
            <span className="text-base font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-lg">
              {older.title}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-right">
              ← Older
            </span>
          </Link>
        ) : null}
        {newer ? (
          <Link
            href={`/writing/${newer.slug}`}
            className="group grid grid-cols-1 gap-2 py-6 sm:grid-cols-[1fr_120px] sm:gap-8"
          >
            <span className="text-base font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-lg">
              {newer.title}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-right">
              Newer →
            </span>
          </Link>
        ) : null}
      </nav>

      <div className="h-32" aria-hidden />
    </article>
  )
}
