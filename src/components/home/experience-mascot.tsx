"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

/* Mascot — 4 SVG variants:
   - cat.svg / cat-dark.svg: clear weather (light/dark themes)
   - cat-umbrella.svg / cat-umbrella-dark.svg: when WeatherToggle is raining
   Listens to a custom 'blogolio:rain-change' event dispatched by
   WeatherToggle, plus reads localStorage on mount for initial state.    */

const RAIN_STORAGE_KEY = "weather-rain"
const RAIN_EVENT = "blogolio:rain-change"

type MascotProps = {
  className?: string
}

export function ExperienceMascot({ className }: MascotProps) {
  const [raining, setRaining] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  // Initial read from localStorage.
  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(RAIN_STORAGE_KEY)
      if (saved === "1") setRaining(true)
    } catch {
      /* ignore */
    }
    setMounted(true)
  }, [])

  // Listen for in-tab toggles via custom event.
  React.useEffect(() => {
    const onRainChange = (e: Event) => {
      const detail = (e as CustomEvent<{ raining: boolean }>).detail
      setRaining(detail.raining)
    }
    window.addEventListener(RAIN_EVENT, onRainChange)
    return () => window.removeEventListener(RAIN_EVENT, onRainChange)
  }, [])

  const lightSrc = raining ? "/cat-umbrella.svg" : "/cat.svg"
  const darkSrc = raining ? "/cat-umbrella-dark.svg" : "/cat-dark.svg"

  // Both SVGs render at the same scale so the cat's BODY is the same
  // physical size in both modes. Umbrella version has a wider viewBox
  // (480 vs 358 = 1.34x) so we scale the container width up by that ratio.
  // We also nudge it slightly to the right because the umbrella adds mass
  // above-left, throwing off the optical center.
  const sizeClasses = raining
    ? "h-[11.36rem] w-[8.39rem] translate-x-[11px] -translate-y-[1px] sm:h-[16.8rem] sm:w-[12.85rem] sm:translate-x-[17px] sm:-translate-y-[1px]"
    : "h-32 w-24 sm:h-48 sm:w-36"

  return (
    <div
      aria-hidden
      className={cn("relative", sizeClasses, className)}
    >
      {/* Light variant */}
      <Image
        src={lightSrc}
        alt=""
        fill
        sizes="(max-width: 640px) 96px, 144px"
        className="object-contain dark:hidden"
      />
      {/* Dark variant */}
      <Image
        src={darkSrc}
        alt=""
        fill
        sizes="(max-width: 640px) 96px, 144px"
        className="hidden object-contain dark:block"
      />
    </div>
  )
}
