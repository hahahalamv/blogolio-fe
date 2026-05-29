import Link from "next/link"
import { MenuButton } from "./menu-button"
import { ThemeToggle } from "./theme-toggle"

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-12">
        <Link
          href="/"
          aria-label="Go to home"
          className="font-sans text-base font-semibold tracking-tight transition-colors hover:text-primary"
        >
          lam<span className="text-primary">.</span>
        </Link>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          <MenuButton />
        </div>
      </div>
    </header>
  )
}
