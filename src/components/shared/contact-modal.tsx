"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { Check, Copy, Github, Linkedin, Mail, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

type ContactModalProps = {
  open: boolean
  onClose: () => void
}

const CONTACT = {
  name: "Võ Hà Lam",
  role: "Software Engineering Intern @ SAP Labs Vietnam",
  email: "hlvsworking@gmail.com",
  phone: "+84 91-328-1397",
  github: "https://github.com/hahahalamv",
  linkedin: "https://linkedin.com/in/ha-lam-vo-222582246/",
  avatar: "/avatar.png", // drop file in public/avatar.png
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // ESC closes
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  // Lock scroll when open
  React.useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  if (!mounted || !open) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contact info"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close contact modal"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
      />

      {/* Card */}
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-md border border-border bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — match Nav "Close" style */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 font-mono text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-foreground sm:right-6 sm:top-6"
        >
          Close
        </button>

        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-[140px_1fr] sm:gap-8 sm:p-8">
          {/* Avatar */}
          <div className="mx-auto sm:mx-0">
            <div className="relative h-32 w-32 overflow-hidden rounded-md sm:h-[140px] sm:w-[140px]">
              {/* Fallback (rendered first, behind Image). Visible if image is missing. */}
              <div className="absolute inset-0 flex items-center justify-center bg-primary font-sans text-3xl font-bold text-primary-foreground">
                VHL
              </div>
              {/* Try the real image on top — if it fails, hide it to reveal fallback. */}
              <Image
                src={CONTACT.avatar}
                alt={CONTACT.name}
                fill
                sizes="140px"
                className="relative object-cover"
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.display = "none"
                }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="text-center sm:text-left">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Get in touch
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {CONTACT.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {CONTACT.role}
            </p>

            {/* Unified contact rows */}
            <div className="mt-6 space-y-3 text-left">
              <ContactRow
                icon={<Mail className="h-3.5 w-3.5" />}
                value={CONTACT.email}
                label="Email"
              />
              <ContactRow
                icon={<Phone className="h-3.5 w-3.5" />}
                value={CONTACT.phone}
                label="Phone"
              />
              <ContactRow
                icon={<Linkedin className="h-3.5 w-3.5" />}
                value={CONTACT.linkedin}
                href={CONTACT.linkedin}
                displayValue="linkedin.com/in/halamvo"
                label="LinkedIn"
              />
              <ContactRow
                icon={<Github className="h-3.5 w-3.5" />}
                value={CONTACT.github}
                href={CONTACT.github}
                displayValue="github.com/hahahalamv"
                label="GitHub"
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ---------------------------- Contact row ---------------------------- */
/* If `href` is provided, clicking the row opens external in new tab.
   Copy button on the right always copies `value` (full URL/string).      */

type ContactRowProps = {
  icon: React.ReactNode
  value: string
  label: string
  /** If set, clicking row opens this URL in new tab. */
  href?: string
  /** Optional shorter text shown in row (full `value` is what's copied). */
  displayValue?: string
}

function ContactRow({ icon, value, label, href, displayValue }: ContactRowProps) {
  const [copied, setCopied] = React.useState(false)
  const text = displayValue ?? value

  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // No-op on insecure context.
    }
  }

  // Outer element: <a> if href provided, otherwise <div>.
  const isLink = Boolean(href)

  return React.createElement(
    isLink ? "a" : "div",
    {
      ...(isLink
        ? {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": `Open ${label}`,
          }
        : {}),
      className: cn(
        "group flex w-full items-center justify-between gap-4 rounded-md border border-border bg-muted/30 px-4 py-3 transition-colors",
        isLink ? "cursor-pointer hover:border-primary/40 hover:bg-muted/50" : ""
      ),
    },
    <>
      <span className="flex min-w-0 items-center gap-3">
        <span className="text-muted-foreground">{icon}</span>
        <span className="truncate font-mono text-sm text-foreground">{text}</span>
      </span>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${label}`}
        className="inline-flex shrink-0 items-center gap-1.5 rounded px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:bg-background hover:text-primary"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" />
            Copy
          </>
        )}
      </button>
    </>
  )
}
