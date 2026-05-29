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
 * Splits text by word so the line wraps naturally on narrow widths instead
 * of breaking between characters.
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
  // Split by word but keep the spaces. Each "word" wraps as a unit.
  const words = React.useMemo(() => children.split(/(\s+)/), [children])

  let charIndex = 0

  return (
    <span aria-label={children} className={cn("perspective-[600px]", className)}>
      {words.map((word, wi) => {
        if (/^\s+$/.test(word)) {
          // Whitespace — render plain so the browser can break the line here.
          return <React.Fragment key={`ws-${wi}`}>{word}</React.Fragment>
        }
        // Wrap the word in a non-breaking inline-flex so chars never split apart.
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
