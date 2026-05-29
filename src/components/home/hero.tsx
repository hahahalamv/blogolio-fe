import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FlipText } from "@/components/shared/flip-text"

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 sm:px-12 sm:pt-32">
      {/* Zone A — Eyebrow metadata */}
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <span>Main — 2026</span>
        <span className="mx-3 text-border">/</span>
        <span>Ho Chi Minh City</span>
      </p>

      {/* Zone B — Headline */}
      <h1 className="mt-8 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
        Building things at SAP. Writing about Java, Spring, and the long road
        out of LeetCode.
      </h1>

      {/* Zone C — Sub-paragraph */}
      <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        Hi, I&apos;m Lam — a fullstack SWE intern at SAP Labs Vietnam. This
        site is where I keep notes on what I&apos;m building, reading, and
        grinding through LeetCode.
      </p>

      {/* Zone D — CTA: single mailto, gazijarin-style */}
      <div className="mt-10">
        <Link
          href="mailto:hlvsworking@gmail.com"
          className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <FlipText>Say hi!</FlipText>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  )
}
