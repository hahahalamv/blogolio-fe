export type ProjectLink = {
  label: string
  href: string
}

export type ProjectStatus = "shipped" | "wip" | "archived"

export type Project = {
  slug: string
  title: string
  description: string
  tech: string[]
  year: number
  status: ProjectStatus
  /** Short role indicator: "Solo", "Frontend", "Lead", etc. */
  role?: string
  links: ProjectLink[]
  /** Optional cover image path (relative to /public). Falls back to monogram. */
  cover?: string
  featured: boolean
}

const allProjects: Project[] = [
  {
    slug: "blogolio",
    title: "Blogolio — this site",
    description:
      "A personal portfolio + tech blog. Next.js 14 App Router on the frontend, Spring Boot 3 + Postgres + Redis on the backend.",
    tech: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Redis"],
    year: 2026,
    status: "wip",
    role: "Solo",
    links: [
      { label: "Frontend", href: "https://github.com/hahahalamv/blogolio-fe" },
    ],
    featured: true,
  },
  {
    slug: "quantum-breast-cancer",
    title: "Quantum-Enhanced ML for Breast Cancer Diagnosis",
    description:
      "Thesis project. Comparing four quantum-classical hybrid paradigms (VQC, QSVM, QSVMF, MidFusion) against a true QCCNN baseline on WDBC, GBSG, and SEER datasets. First quantum study on GBSG and SEER.",
    tech: ["Python", "PennyLane", "PyTorch", "scikit-learn", "XGBoost"],
    year: 2026,
    status: "wip",
    role: "Solo (thesis)",
    links: [{ label: "GitHub", href: "https://github.com/hahahalamv" }],
    featured: true,
  },
  {
    slug: "recipe-planner",
    title: "Recipe Planner",
    description:
      "Full-stack meal planning app: React frontend (weekly planner, paginated recipe cards, auto-generated shopping list, gamified streak tracking with 365-day activity heatmap) + Spring Boot REST API with JWT/BCrypt auth, Spring Data JPA, PostgreSQL, Flyway. Integrated Google Gemini AI for on-demand recipe generation and ingredient-based fridge search.",
    tech: [
      "Java",
      "Spring Boot",
      "React",
      "PostgreSQL",
      "JWT",
      "Google Gemini API",
    ],
    year: 2026,
    status: "shipped",
    role: "Solo",
    links: [{ label: "Live", href: "https://github.com/hahahalamv" }],
    featured: true,
  },
  {
    slug: "movigo",
    title: "Movigo — Movie Streaming Platform",
    description:
      "School project. Built responsive React UI for browsing and streaming pages in a team of 5 (SCRUM). Configured AWS S3 with presigned URLs for secure video upload/download without exposing credentials, plus bucket policies and CORS settings for FE↔BE communication.",
    tech: ["React", "FastAPI", "MongoDB", "AWS S3"],
    year: 2025,
    status: "shipped",
    role: "Contributor",
    links: [{ label: "GitHub", href: "https://github.com/hahahalamv" }],
    featured: false,
  },
  {
    slug: "socket-project",
    title: "POP3/SMTP Email Client",
    description:
      "School project. Implemented a POP3/SMTP email client over raw TCP sockets in Python with multi-threaded connection handling for concurrent send/receive. Local email storage with SQLite and configurable filtering rules for inbox management.",
    tech: ["Python", "Sockets", "POP3", "SMTP", "SQLite"],
    year: 2023,
    status: "archived",
    role: "Contributor",
    links: [{ label: "GitHub", href: "https://github.com/hahahalamv" }],
    featured: false,
  },
]

export function getAllProjects(): Project[] {
  return [...allProjects].sort((a, b) => b.year - a.year)
}

export function getFeaturedProjects(limit = 3): Project[] {
  return getAllProjects()
    .filter((p) => p.featured)
    .slice(0, limit)
}
