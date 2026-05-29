"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { FlipText } from "@/components/shared/flip-text"
import { ContactModal } from "@/components/shared/contact-modal"
import { MemoryGame } from "./memory-game"
import { Stack } from "./stack"

export function Hero() {
  const [contactOpen, setContactOpen] = React.useState(false)

  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 sm:px-12 sm:pt-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-16">
        {/* Left — text content */}
        <div>
          {/* Zone A — Eyebrow metadata */}
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Based in HCMC, Vietnam
          </p>

          {/* Zone B — Headline */}
          <h1 className="mt-8 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            22nd chapter in this journey <span className="text-primary">we call life</span>.
          </h1>

          {/* Zone C — Sub-paragraph */}
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            欢迎光临! hi, i&apos;m ha lam - currently a software engineering intern at SAP Labs, working on enterprise platform services within SAP Business
            Network. i also am a final-year compsci student at HCMUS (VNU-HCM). i do tech&stuff hoping tech loves me more (lol?).
          </p>

          {/* Zone D — CTA: opens contact modal */}
          <div className="mt-10">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <FlipText>Say hi!</FlipText>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Right — mini memory game + stack (desktop only) */}
        <aside className="hidden lg:flex lg:flex-col lg:gap-8 lg:pt-2">
          <MemoryGame />
          <Stack />
        </aside>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  )
}
