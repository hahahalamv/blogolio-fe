"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** How far to translate from below before settling (px). */
  offsetY?: number
  /** Animation duration in ms. */
  durationMs?: number
  /** Delay before animation starts (ms). */
  delayMs?: number
  /** Trigger when this fraction of the element is visible (0..1). */
  threshold?: number
  /** rootMargin for IntersectionObserver — negative bottom delays the trigger. */
  rootMargin?: string
  /** If true, fire only the first time the element enters viewport. */
  once?: boolean
}

/**
 * Wrap content to fade + translate up when scrolled into view.
 * Uses IntersectionObserver — no animation library required.
 */
export function Reveal({
  children,
  className,
  offsetY = 24,
  durationMs = 700,
  delayMs = 0,
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion — show immediately.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
        transform: visible ? "translateY(0)" : `translateY(${offsetY}px)`,
        opacity: visible ? 1 : 0,
      }}
      className={cn(
        "transition-[opacity,transform] ease-out will-change-[opacity,transform]",
        className
      )}
    >
      {children}
    </div>
  )
}
