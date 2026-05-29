import * as React from "react"
import { cn } from "@/lib/utils"

type FlipTextProps = {
  children: string
  className?: string
  staggerMs?: number
  durationMs?: number
}

/** Each char rotates 360° on parent hover, staggered for a wobble.
 *  CSS animation (not transition) so it doesn't reverse on hover-out. */
export function FlipText({
  children,
  className,
  staggerMs = 35,
  durationMs = 600,
}: FlipTextProps) {
  // Split by word — keeps chars together so line wraps between words, not mid-word.
  const words = React.useMemo(() => children.split(/(\s+)/), [children])

  let charIndex = 0

  return (
    <span aria-label={children} className={cn("perspective-[600px]", className)}>
      {words.map((word, wi) => {
        if (/^\s+$/.test(word)) {
          return <React.Fragment key={`ws-${wi}`}>{word}</React.Fragment>
        }
        return (
          <span
            key={`w-${wi}`}
            aria-hidden
            className="inline-flex whitespace-nowrap"
          >
            {Array.from(word).map((char) => {
              const i = charIndex++
              return (
                <span
                  key={i}
                  style={{
                    animationDelay: `${i * staggerMs}ms`,
                    animationDuration: `${durationMs}ms`,
                  }}
                  className="inline-block [transform-style:preserve-3d] group-hover:animate-flip-x group-focus-visible:animate-flip-x"
                >
                  {char}
                </span>
              )
            })}
          </span>
        )
      })}
    </span>
  )
}
