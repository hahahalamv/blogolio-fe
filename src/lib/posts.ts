export type Post = {
  slug: string
  title: string
  summary: string
  date: string // ISO format: "2026-04-12"
  tags: string[]
  featured: boolean
}

// TODO Step 4: replace with MDX file reading.
const mockPosts: Post[] = [
  {
    slug: "spring-boot-in-two-weeks",
    title: "How I learned Spring Boot in two weeks",
    summary:
      "A cheat-sheet of the patterns and gotchas that finally made dependency injection click for me.",
    date: "2026-04-12",
    tags: ["java", "spring-boot"],
    featured: true,
  },
  {
    slug: "leetcode-patterns-that-stuck",
    title: "LeetCode patterns that actually stuck",
    summary:
      "After 200 problems, these are the four shapes I keep reaching for. Everything else was noise.",
    date: "2026-03-05",
    tags: ["leetcode", "algorithms"],
    featured: true,
  },
  {
    slug: "redis-write-behind-views",
    title: "Counting blog views without melting Postgres",
    summary:
      "Why I moved view counters to Redis with a write-behind flush, and the small bugs that taught me about cache invalidation.",
    date: "2026-02-18",
    tags: ["redis", "postgresql", "caching"],
    featured: true,
  },
]

export function getFeaturedPosts(limit = 3): Post[] {
  return mockPosts
    .filter((p) => p.featured)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
}

export function getAllPosts(): Post[] {
  return [...mockPosts].sort((a, b) => b.date.localeCompare(a.date))
}
