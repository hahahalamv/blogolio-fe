import { cn } from "@/lib/utils"

type MonogramCoverProps = {
  title: string
  className?: string
}

/**
 * Visual placeholder for projects without a cover image.
 * Renders the first letter of the title in a primary-colored square.
 *
 * Title-aware variant: picks the first uppercase character or letter
 * found, falling back to the first character.
 */
function pickMonogram(title: string): string {
  const letters = title.match(/[A-Za-zÀ-ỹ一-鿿]/u)
  return (letters?.[0] ?? title[0] ?? "?").toUpperCase()
}

export function MonogramCover({ title, className }: MonogramCoverProps) {
  const letter = pickMonogram(title)
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-md bg-primary",
        className
      )}
    >
      <span className="font-sans text-9xl font-bold leading-none tracking-tighter text-primary-foreground sm:text-[10rem]">
        {letter}
      </span>
      {/* Subtle texture overlay so the block doesn't look dead-flat. */}
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-black/10"
      />
    </div>
  )
}
