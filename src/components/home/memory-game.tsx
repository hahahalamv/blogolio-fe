"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

/* ASCII faces — hand-picked so they read as little characters/creatures
   without leaning on emoji. Each is a "pair symbol".                     */
const FACES = ["^_^", "@_@", "0_0", "*_*"] as const
const BOMB = "X_X"

type Cell =
  | { kind: "face"; id: number; symbol: string }
  | { kind: "bomb"; id: number }

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function buildDeck(): Cell[] {
  const pairs: Cell[] = FACES.flatMap((symbol, i) => [
    { kind: "face", id: i * 2, symbol },
    { kind: "face", id: i * 2 + 1, symbol },
  ])
  return shuffle([...pairs, { kind: "bomb", id: 99 }])
}

type GameStatus = "playing" | "won" | "lost"

/** Stable placeholder deck for server render — no randomness. */
function emptyDeck(): Cell[] {
  return Array.from({ length: 9 }, (_, i) => ({
    kind: "face" as const,
    id: i,
    symbol: "",
  }))
}

export function MemoryGame() {
  const [deck, setDeck] = React.useState<Cell[]>(() => emptyDeck())
  const [flipped, setFlipped] = React.useState<number[]>([])
  const [matched, setMatched] = React.useState<Set<number>>(new Set())
  const [moves, setMoves] = React.useState(0)
  const [status, setStatus] = React.useState<GameStatus>("playing")
  const [mounted, setMounted] = React.useState(false)

  // Shuffle on the client only — avoids server/client hydration mismatch
  // from Math.random producing different orders on each side.
  React.useEffect(() => {
    setDeck(buildDeck())
    setMounted(true)
  }, [])

  const reset = () => {
    setDeck(buildDeck())
    setFlipped([])
    setMatched(new Set())
    setMoves(0)
    setStatus("playing")
  }

  const handleClick = (cell: Cell, index: number) => {
    if (!mounted) return
    if (status !== "playing") return
    if (flipped.includes(index)) return
    if (cell.kind === "face" && matched.has(cell.id)) return
    if (flipped.length === 2) return // wait for current pair to resolve

    // Bomb hit → instant lose.
    if (cell.kind === "bomb") {
      setFlipped((f) => [...f, index])
      setStatus("lost")
      return
    }

    const next = [...flipped, index]
    setFlipped(next)

    if (next.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = next
      const cellA = deck[a]
      const cellB = deck[b]
      if (
        cellA.kind === "face" &&
        cellB.kind === "face" &&
        cellA.symbol === cellB.symbol
      ) {
        setMatched((prev) => new Set(prev).add(cellA.id).add(cellB.id))
        setFlipped([])
        // Win when all 8 face cards matched.
        if (matched.size + 2 === 8) {
          setStatus("won")
        }
      } else {
        window.setTimeout(() => setFlipped([]), 800)
      }
    }
  }

  const headerLabel =
    status === "won"
      ? `Cleared in ${moves} moves`
      : status === "lost"
        ? "Boom! You hit the bomb."
        : "Match pairs · avoid the bomb"

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span
          className={cn(
            status === "lost" && "text-destructive",
            status === "won" && "text-primary"
          )}
        >
          {headerLabel}
        </span>
        <button
          type="button"
          onClick={reset}
          aria-label="Reset game"
          className="inline-flex items-center gap-1 transition-colors hover:text-primary"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 3x3 grid */}
      <div className="grid aspect-square grid-cols-3 gap-2">
        {deck.map((cell, index) => {
          const isFace = cell.kind === "face"
          const isMatched = isFace && matched.has(cell.id)
          const isOpen = flipped.includes(index) || isMatched
          const symbol = cell.kind === "bomb" ? BOMB : cell.symbol

          // Reveal all on game over so the user sees what was where.
          const revealed = isOpen || status !== "playing"

          return (
            <button
              key={`${cell.kind}-${index}`}
              type="button"
              onClick={() => handleClick(cell, index)}
              disabled={status !== "playing" || isMatched}
              aria-label={revealed ? `Cell ${symbol}` : "Hidden cell"}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-md border transition-colors",
                "[perspective:600px]",
                isMatched
                  ? "border-primary/40 bg-primary/5"
                  : revealed && cell.kind === "bomb"
                    ? "border-destructive/40 bg-destructive/10"
                    : "border-border bg-muted hover:border-primary/40 hover:bg-muted/70",
                status !== "playing" && "cursor-default"
              )}
            >
              <span
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-transform duration-500",
                  "[transform-style:preserve-3d]",
                  revealed
                    ? "[transform:rotateY(0deg)]"
                    : "[transform:rotateY(180deg)]"
                )}
              >
                {/* Front (face up) */}
                <span
                  className={cn(
                    "absolute inset-0 flex items-center justify-center font-mono text-base font-semibold tracking-tight [backface-visibility:hidden] sm:text-lg",
                    cell.kind === "bomb" && revealed
                      ? "text-destructive"
                      : "text-foreground"
                  )}
                >
                  {symbol}
                </span>
                {/* Back (face down) */}
                <span
                  className="absolute inset-0 flex items-center justify-center bg-muted [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  aria-hidden
                >
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/20" />
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Replay caption — always rendered so layout doesn't jump when game ends. */}
      <p
        className={cn(
          "min-h-[1rem] font-mono text-[10px] uppercase tracking-widest",
          status === "won" && "text-primary",
          status === "lost" && "text-destructive",
          status === "playing" && "text-transparent"
        )}
        aria-live="polite"
      >
        {status === "playing" ? (
          // Reserve space (zero-width but keeps line height).
          <span aria-hidden>·</span>
        ) : (
          <button onClick={reset} className="underline underline-offset-2">
            Play again
          </button>
        )}
      </p>
    </div>
  )
}
