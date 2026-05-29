"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/* Topographic ridge — abstract ASCII art designed at ~46 cols × 24 rows.
   Density chars: ▓ ▒ ░ # @ % * + = - : .                                   */
const ART = String.raw`
                                              .
                                            .::.
                                          .:----:.
                                        .:--====-:.
                                      .:--========:.
                                    .:--==++++++==:.
                                  .--==+++******++=-:.
                                .--=++**##########*++=-.
                              .-=+**####%%%%%%%####**+=-.
                            .-=+*##%%%@@@@@@@@@%%##*+=-.
                         .:-=+*#%%@@@@@@@@@@@@@@%%#*+=-:.
                       .:-=+*#%%@@@@@@@@@@@@@@@@@%%#*+=-:.
                    .:-=+*#%%@@@@@@@@@@@@@@@@@@@@@%%#*+=-:.
                 .:-=+*#%%@@@@@@@@@@@@@@@@@@@@@@@@@%%#*+=-:.
              .:-=+*#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%#*+=-:.
           .:-=+*#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%#*+=-:.
        .:-=+*#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%#*+=-:.
     .:-=+*#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%#*+=-:.
  .:-=+*#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%#*+=-:.
.:-=+*#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%#*+=-:.
`.trim()

export function AsciiArt() {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        ── ridge / 2026 ──
      </p>
      <pre
        aria-hidden
        className={cn(
          "select-none whitespace-pre font-mono leading-[1.0] tracking-tight",
          "text-[7px] sm:text-[8px]",
          "text-primary"
        )}
        style={{
          textShadow:
            "0 0 8px hsl(var(--primary) / 0.45), 0 0 16px hsl(var(--primary) / 0.25)",
        }}
      >
        {ART}
      </pre>
    </div>
  )
}
