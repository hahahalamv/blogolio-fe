import Link from "next/link"
import { FlipText } from "./flip-text"

const socials = [
  { label: "GITHUB", href: "https://github.com/hahahalamv" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/ha-lam-vo-222582246/" },
  { label: "EMAIL", href: "mailto:hlvsworking@gmail.com" },
]

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-12">
        <div className="space-y-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <p>VÕ HÀ LAM</p>
          <p>FULLSTACK SWE INTERN</p>
          <p>SAP LABS — HO CHI MINH CITY</p>
        </div>

        <nav aria-label="Social links">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest">
            {socials.map((s) => (
              <li key={s.label}>
                <Link
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex text-muted-foreground transition-colors hover:text-primary"
                >
                  <FlipText>{s.label}</FlipText>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:px-12">
          <span>© {new Date().getFullYear()} BLOGOLIO</span>
          <span>BUILT WITH NEXT.JS</span>
        </div>
      </div>
    </footer>
  )
}
