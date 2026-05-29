import "server-only"
import fs from "node:fs"
import path from "node:path"
import { cache } from "react"
import matter from "gray-matter"
import readingTime from "reading-time"

export type Post = {
  slug: string
  title: string
  summary: string
  date: string
  tags: string[]
  featured: boolean
  readingMinutes: number
  /** Raw MDX body (without frontmatter). Compile with next-mdx-remote. */
  content: string
}

const POSTS_DIR = path.join(process.cwd(), "src/content/posts")

type Frontmatter = {
  title: string
  date: string
  summary: string
  tags?: string[]
  featured?: boolean
}

function parseFile(filename: string): Post {
  const slug = filename.replace(/\.mdx$/, "")
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8")
  const { data, content } = matter(raw)
  const fm = data as Frontmatter

  if (!fm.title || !fm.date || !fm.summary) {
    throw new Error(
      `Post "${slug}" is missing required frontmatter (title, date, summary).`
    )
  }

  return {
    slug,
    title: fm.title,
    summary: fm.summary,
    date: fm.date,
    tags: fm.tags ?? [],
    featured: fm.featured ?? false,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
  }
}

/**
 * Read all posts. Cached per-request via React.cache so multiple components
 * on the same page don't hit the filesystem repeatedly.
 */
export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parseFile)
    .sort((a, b) => b.date.localeCompare(a.date))
})

export const getFeaturedPosts = cache((limit = 3): Post[] => {
  return getAllPosts()
    .filter((p) => p.featured)
    .slice(0, limit)
})

export const getPostBySlug = cache((slug: string): Post | null => {
  const all = getAllPosts()
  return all.find((p) => p.slug === slug) ?? null
})

export const getAllSlugs = cache((): string[] => {
  return getAllPosts().map((p) => p.slug)
})

export type TagCount = {
  tag: string
  count: number
}

export const getAllTags = cache((): TagCount[] => {
  const counts = new Map<string, number>()
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
})

export const getPostsByTag = cache((tag: string): Post[] => {
  return getAllPosts().filter((p) => p.tags.includes(tag))
})
