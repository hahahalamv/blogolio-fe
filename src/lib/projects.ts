export type Project = {
  slug: string
  title: string
  description: string
  tech: string[]
  href?: string // external link or internal /projects/[slug]
  featured: boolean
}

const mockProjects: Project[] = [
  {
    slug: "blogolio",
    title: "Blogolio — this site",
    description:
      "A personal portfolio + tech blog. Next.js 14 App Router on the frontend, Spring Boot 3 + Postgres + Redis on the backend.",
    tech: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Redis"],
    href: "https://github.com/hahahalamv/blogolio-fe",
    featured: true,
  },
  {
    slug: "quantum-breast-cancer",
    title: "Quantum-Enhanced ML for Breast Cancer Diagnosis",
    description:
      "Thesis project. Comparing four quantum-classical hybrid paradigms (VQC, QSVM, QSVMF, MidFusion) against a true QCCNN baseline on WDBC, GBSG, and SEER datasets. First quantum study on GBSG and SEER.",
    tech: ["Python", "PennyLane", "PyTorch", "scikit-learn", "XGBoost"],
    featured: true,
  },
  {
    slug: "recipe-planner",
    title: "Recipe Planner",
    description:
      "Weekly meal-planning app with shopping list generation. Spring Boot backend with JPA, React frontend.",
    tech: ["Spring Boot", "React", "PostgreSQL"],
    featured: true,
  },
]

export function getFeaturedProjects(limit = 3): Project[] {
  return mockProjects
    .filter((p) => p.featured)
    .slice(0, limit)
}

export function getAllProjects(): Project[] {
  return [...mockProjects]
}
