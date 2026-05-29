import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { MDXComponents } from "mdx/types"

/* ------------------------------ Custom blocks ----------------------------- */

type CalloutProps = {
  type?: "note" | "warning" | "tip"
  children: React.ReactNode
}

function Callout({ type = "note", children }: CalloutProps) {
  const label =
    type === "warning" ? "Warning" : type === "tip" ? "Tip" : "Note"
  return (
    <aside
      className={cn(
        "my-6 rounded-md border-l-2 border-primary bg-primary/5 px-5 py-4",
        type === "warning" && "border-destructive bg-destructive/5"
      )}
    >
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="text-foreground [&>p:last-child]:mb-0">{children}</div>
    </aside>
  )
}

/* --------------------------- Element overrides --------------------------- */
/* All editorial Tailwind. Pulled from gazijarin/Linear-style references.   */

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mt-12 scroll-mt-24 text-balance text-4xl font-semibold tracking-tight sm:text-5xl",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 scroll-mt-24 text-xl font-semibold tracking-tight sm:text-2xl",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "mt-5 text-base leading-relaxed text-foreground/85 sm:text-[17px] sm:leading-[1.75]",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, href, ...props }) => {
    const isExternal = href?.startsWith("http")
    return (
      <Link
        href={href ?? "#"}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={cn(
          "text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary",
          className
        )}
        {...props}
      />
    )
  },
  ul: ({ className, ...props }) => (
    <ul
      className={cn("mt-5 space-y-2 pl-6 [&>li]:list-disc", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("mt-5 space-y-2 pl-6 [&>li]:list-decimal", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li
      className={cn(
        "text-base leading-relaxed text-foreground/85 sm:text-[17px] sm:leading-[1.75] marker:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-primary pl-6 text-foreground/85 italic",
        className
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-12 border-border/60", className)} {...props} />
  ),
  // Inline code
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground",
        className
      )}
      {...props}
    />
  ),
  // Code block (rehype-pretty-code wraps in <pre><code>)
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "mt-6 overflow-x-auto rounded-md border border-border/50 bg-[--shiki-bg] p-4 font-mono text-sm leading-relaxed",
        className
      )}
      {...props}
    />
  ),
  // Custom components — usable directly in .mdx files
  Callout,
}
