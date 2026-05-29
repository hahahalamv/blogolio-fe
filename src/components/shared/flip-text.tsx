import * as React from "react"
import { cn } from "@/lib/utils"

type FlipTextProps = {
  children: string
  className?: string
  staggerMs?: number
  durationMs?: number
}

/**
 * On parent .group hover (or focus-visible), each character animates a single
 * rotateX(360deg) flip in place, staggered for a wave/wobble feel.
 *
 * Uses CSS animation (not transition) so it does NOT reverse when the cursor
 * leaves — chars stay put once the flip finishes.
 */
export function FlipText({
  children,
  className,
  staggerMs = 35,
  durationMs = 600,
}: FlipTextProps) {
  const chars = React.useMemo(() => Array.from(children), [children])

  return (
    <span
      aria-label={children}
      className={cn("inline-flex perspective-[600px]", className)}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            animationDelay: `${i * staggerMs}ms`,
            animationDuration: `${durationMs}ms`,
          }}
          className="inline-block [transform-style:preserve-3d] group-hover:animate-flip-x group-focus-visible:animate-flip-x"
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  )
}
