"use client"

import * as React from "react"

/**
 * Template runs on every navigation (unlike layout which persists).
 * We use this to fade-in main content on route change.
 *
 * Server Component would be enough, but we prefix with "use client" so
 * the animation reset is reliable across browsers (some optimize away
 * SSR-only @keyframes that match identical class names between routes).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-fade">{children}</div>
}
