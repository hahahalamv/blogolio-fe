"use client"

import * as React from "react"
import { createPortal } from "react-dom"

const DROP_COUNT = 80

type Drop = {
  left: number // 0-100 vw
  delay: number // s
  duration: number // s
  opacity: number
}

function buildDrops(seed = 0): Drop[] {
  // Deterministic-ish via simple LCG so we can shuffle on toggle without flicker.
  let s = seed || 1
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  return Array.from({ length: DROP_COUNT }, () => ({
    left: rand() * 100,
    delay: rand() * 4,
    duration: 0.7 + rand() * 0.9,
    opacity: 0.25 + rand() * 0.5,
  }))
}

export function RainOverlay() {
  const [mounted, setMounted] = React.useState(false)
  const drops = React.useMemo(() => buildDrops(Date.now()), [])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[150] overflow-hidden"
    >
      {drops.map((d, i) => (
        <span
          key={i}
          className="absolute -top-8 h-4 w-px bg-foreground/40 sm:h-6"
          style={{
            left: `${d.left}vw`,
            opacity: d.opacity,
            animation: `rain-fall ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>,
    document.body
  )
}
