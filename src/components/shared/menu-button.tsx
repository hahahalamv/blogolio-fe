"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems } from "./nav-items"
import { FlipText } from "./flip-text"
import { cn } from "@/lib/utils"

const socialLinks = [
  { label: "GITHUB", href: "https://github.com/hahahalamv" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/ha-lam-vo-222582246/" },
  { label: "EMAIL", href: "mailto:hlvsworking@gmail.com" },
]

export function MenuButton() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // ESC key đóng overlay
  React.useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen])

  // Lock body scroll khi mở
  React.useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [isOpen])

  const overlay = isOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[100] flex flex-col bg-background"
    >
      {/* Overlay header — mimics Nav so user feels in same place */}
      <div className="border-b border-border/40 bg-background">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-12">
          <Link
            href="/"
            aria-label="Go to home"
            onClick={() => setIsOpen(false)}
            className="font-sans text-base font-semibold tracking-tight transition-colors hover:text-primary"
          >
            hàlam<span className="text-primary">.</span>
          </Link>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="font-mono text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-foreground"
          >
            Close
          </button>
        </div>
      </div>

      {/* Main menu links */}
      <nav className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 sm:px-12">
        <ul className="flex flex-col gap-4 sm:gap-6">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group block text-5xl font-bold tracking-tight transition-colors sm:text-7xl",
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  <FlipText staggerMs={45}>{item.label}</FlipText>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer info inside overlay */}
      <div className="border-t border-border/40 bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-12">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            hlvsworking@gmail.com
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-widest">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <Link
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    s.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  onClick={() => setIsOpen(false)}
                  className="group inline-flex text-muted-foreground transition-colors hover:text-primary"
                >
                  <FlipText>{s.label}</FlipText>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : null

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className="font-mono text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-foreground"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {mounted && overlay && createPortal(overlay, document.body)}
    </>
  )
}
