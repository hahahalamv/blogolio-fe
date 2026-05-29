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
    slug: "quantum-breast-cancer",
    title: "Quantum-Enhanced ML for Breast Cancer Diagnosis",
    description:
      "Undergrad thesis. Exploring whether quantum circuits can meaningfully complement classical neural networks in real-world classification tasks. Designed and evaluated a parallel hybrid architecture combining a classical neural network with a small variational quantum circuit, tested across multiple medical datasets under rigorous cross-validation. Beyond standard accuracy comparisons, developed a diagnostic toolkit to probe what each branch of the model actually learns at the representation level, revealing that hybrid models can fail in fundamentally different ways depending on the dataset, and that no single architectural fix works universally. Used these insights to propose targeted, mode-specific variants that address each failure at the appropriate layer of the architecture.",
    tech: ["Python", "PennyLane", "PyTorch", "scikit-learn"],
    year: 2026,
    status: "wip",
    role: "Solo",
    links: [],
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
    links: [
      { label: "Live", href: "https://recipeplanner-tomotomo.netlify.app" },
    ],
    featured: true,
  },
  {
    slug: "movigo",
    title: "Movigo - Movie Streaming Platform",
    description:
      "School project. Built responsive React UI for browsing and streaming pages in a team of 5 (SCRUM). Configured AWS S3 with presigned URLs for secure video upload/download without exposing credentials, plus bucket policies and CORS settings for FE↔BE communication.",
    tech: ["React", "FastAPI", "MongoDB", "AWS S3"],
    year: 2025,
    status: "archived",
    role: "Contributor",
    links: [],
    featured: false,
  },
  {
    slug: "socket-project",
    title: "POP3/SMTP Email Client",
    description:
      "School project. Implemented a POP3/SMTP email client over raw TCP sockets in Python with multi-threaded connection handling for concurrent send/receive. Local email storage with SQLite and configurable filtering rules for inbox management.",
    tech: ["Python", "Sockets", "POP3", "SMTP", "SQLite"],
    year: 2023,
    status: "shipped",
    role: "Contributor",
    links: [
      { label: "GitHub", href: "https://github.com/hahahalamv/SocketProject" },
    ],
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
