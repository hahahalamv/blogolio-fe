"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: React.ReactNode
  className?: string
  offsetY?: number
  durationMs?: number
  delayMs?: number
  threshold?: number
  rootMargin?: string
  /** Fire only on first viewport entry; ignore exits. */
  once?: boolean
}

/** Fade + translate-up when scrolled into view, via IntersectionObserver. */
export function Reveal({
  children,
  className,
  offsetY = 24,
  durationMs = 950,
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
