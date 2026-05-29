"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const RAIN_STORAGE_KEY = "weather-rain"
const RAIN_EVENT = "blogolio:rain-change"

type MascotProps = {
  className?: string
}

export function ExperienceMascot({ className }: MascotProps) {
  const [raining, setRaining] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(RAIN_STORAGE_KEY)
      if (saved === "1") setRaining(true)
    } catch {
      /* ignore */
    }
    setMounted(true)
  }, [])

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

  // Umbrella variant has wider viewBox (480 vs 358) — scale container up
  // and nudge right so the cat's body stays the same size and visually
  // centered with the no-umbrella version.
  const sizeClasses = raining
    ? "h-[11.36rem] w-[8.39rem] translate-x-[11px] -translate-y-[1px] sm:h-[16.8rem] sm:w-[12.85rem] sm:translate-x-[17px] sm:-translate-y-[1px]"
    : "h-32 w-24 sm:h-48 sm:w-36"

  return (
    <div aria-hidden className={cn("relative", sizeClasses, className)}>
      <Image
        src={lightSrc}
        alt=""
        fill
        sizes="(max-width: 640px) 96px, 144px"
        className="object-contain dark:hidden"
      />
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
