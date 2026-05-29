/* Inline tech stack list — placed in hero right column, under memory game.
   Compact mono list. Each item kept whole (no line-break in middle).
   Order: languages first, then their frameworks/runtimes near them.        */

const STACK = [
  "Java",
  "Spring Boot",
  "SAP CAP",
  "TypeScript",
  "React",
  "SAP UI5",
  "Python",
  "C++",
]

export function Stack() {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        stack
      </p>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs leading-relaxed text-foreground/85 sm:text-sm">
        {STACK.map((tech, i) => (
          <span key={tech} className="inline-flex items-center gap-2">
            <span className="whitespace-nowrap">{tech}</span>
            {i < STACK.length - 1 && (
              <span className="text-border">·</span>
            )}
          </span>
        ))}
      </p>
    </div>
  )
}
