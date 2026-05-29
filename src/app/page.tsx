import { Hero } from "@/components/home/hero"
import { Experience } from "@/components/home/experience"
import { FeaturedProjects } from "@/components/home/featured-projects"
import { FeaturedPosts } from "@/components/home/featured-posts"
import { Reveal } from "@/components/shared/reveal"

export default function Home() {
  return (
    <>
      {/* Hero appears immediately on load (above the fold) — no Reveal wrap. */}
      <Hero />

      <Reveal>
        <Experience />
      </Reveal>

      <Reveal delayMs={80}>
        <FeaturedProjects />
      </Reveal>

      <Reveal delayMs={120}>
        <FeaturedPosts />
      </Reveal>

      <div className="h-32" aria-hidden />
    </>
  )
}
