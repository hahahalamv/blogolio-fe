"use client"

import * as React from "react"
import { Cloud, CloudRain } from "lucide-react"
import { RainOverlay } from "./rain-overlay"

const STORAGE_KEY = "weather-rain"

export function WeatherToggle() {
  const [raining, setRaining] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  // Hydration-safe: read persisted preference on client only.
  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === "1") setRaining(true)
    } catch {
      /* ignore */
    }
    setMounted(true)
  }, [])

  const toggle = () => {
    setRaining((prev) => {
      const next = !prev
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0")
      } catch {
        /* ignore */
      }
      return next
    })
  }

  return (
    <>
      <button
        type="button"
        aria-label={raining ? "Stop the rain" : "Make it rain"}
        aria-pressed={raining}
        onClick={toggle}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground/70 transition-colors hover:text-foreground"
      >
        {!mounted ? (
          <span className="h-4 w-4" />
        ) : raining ? (
          <Cloud className="h-4 w-4" />
        ) : (
          <CloudRain className="h-4 w-4" />
        )}
      </button>

      {mounted && raining && <RainOverlay />}
    </>
  )
}
