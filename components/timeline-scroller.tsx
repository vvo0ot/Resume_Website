"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { timelineItems, type TimelineItem } from "@/lib/timeline-data"
import { TimelineTile } from "@/components/timeline-tile"
import { TileDetail } from "@/components/tile-detail"
import { IntroPanel } from "@/components/intro-panel"
import { PhilosophyPanel } from "@/components/philosophy-panel"
import { ContactPanel } from "@/components/contact-panel"

function Divider() {
  return (
    <div aria-hidden className="hidden h-40 w-px shrink-0 self-center bg-border sm:block" />
  )
}

export function TimelineScroller() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<TimelineItem | null>(null)
  const [progress, setProgress] = useState(0)
  const [current, setCurrent] = useState(timelineItems[0])
  const dragging = useRef(false)

  const sorted = useMemo(
    () => [...timelineItems].sort((a, b) => a.date.localeCompare(b.date)),
    [],
  )
  const firstYear = sorted[0]?.date.slice(0, 4)
  const lastYear = sorted[sorted.length - 1]?.date.slice(0, 4)

  const updatePosition = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)

    // Determine which dated tile is nearest the viewport center.
    const center = el.scrollLeft + el.clientWidth / 2
    let best: TimelineItem | null = null
    let bestDist = Number.POSITIVE_INFINITY
    el.querySelectorAll<HTMLElement>("[data-tile-date]").forEach((node) => {
      const nodeCenter = node.offsetLeft + node.offsetWidth / 2
      const dist = Math.abs(nodeCenter - center)
      if (dist < bestDist) {
        bestDist = dist
        const id = node.dataset.tileId
        best = sorted.find((s) => s.id === id) ?? null
      }
    })
    if (best) setCurrent(best)
  }, [sorted])

  // Translate vertical wheel gestures into horizontal scrolling.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0 || e.shiftKey) return
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return
      el.scrollLeft += e.deltaY
      e.preventDefault()
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  // Keyboard navigation across the archive.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active) return
      const el = scrollRef.current
      if (!el) return
      const step = Math.min(el.clientWidth * 0.8, 480)
      if (e.key === "ArrowRight") {
        el.scrollBy({ left: step, behavior: "smooth" })
      } else if (e.key === "ArrowLeft") {
        el.scrollBy({ left: -step, behavior: "smooth" })
      } else if (e.key === "Home") {
        el.scrollTo({ left: 0, behavior: "smooth" })
      } else if (e.key === "End") {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" })
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active])

  useEffect(() => {
    updatePosition()
    window.addEventListener("resize", updatePosition)
    return () => window.removeEventListener("resize", updatePosition)
  }, [updatePosition])

  const nudge = (dir: 1 | -1) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 480), behavior: "smooth" })
  }

  // Pointer drag-to-scroll (skips touch, which scrolls natively).
  // No pointer capture — capturing would swallow clicks on the tiles.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return
    const el = scrollRef.current
    if (!el) return
    const startX = e.clientX
    const startLeft = el.scrollLeft
    dragging.current = false

    const onMove = (ev: PointerEvent) => {
      const delta = ev.clientX - startX
      // Only treat as a drag once the pointer moves past a small threshold,
      // so a plain click still reaches the tile button.
      if (!dragging.current && Math.abs(delta) < 6) return
      dragging.current = true
      el.scrollLeft = startLeft - delta
    }
    const onUp = () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
  }

  return (
    <div className="paper-grain relative flex h-[100dvh] w-full flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="z-20 flex shrink-0 items-center justify-between px-6 pt-6 sm:px-12">
        <span className="font-serif text-sm tracking-wide text-foreground">
          Eleanor Voss
          <span className="ml-2 text-muted-foreground">— Archive</span>
        </span>
        <span className="hidden font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground sm:inline">
          Scroll, drag, or use ← →
        </span>
      </header>

      {/* Scroll region */}
      <div className="relative flex-1">
        <div
          ref={scrollRef}
          onScroll={updatePosition}
          onPointerDown={onPointerDown}
          className="no-scrollbar absolute inset-0 flex snap-x snap-mandatory items-center gap-8 overflow-x-auto scroll-smooth px-6 sm:gap-14 sm:px-16 [cursor:grab] active:[cursor:grabbing]"
        >
          <IntroPanel />
          <Divider />
          {sorted.map((item, i) => (
            <div
              key={item.id}
              data-tile-id={item.id}
              data-tile-date={item.date}
              className="flex h-full items-center"
            >
              <TimelineTile item={item} index={i} onOpen={setActive} />
            </div>
          ))}
          <Divider />
          <PhilosophyPanel />
          <Divider />
          <ContactPanel />
          <div aria-hidden className="w-2 shrink-0 sm:w-8" />
        </div>

        {/* Edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent sm:w-16"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent sm:w-16"
        />

        {/* Arrow controls */}
        <button
          type="button"
          onClick={() => nudge(-1)}
          className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 font-sans text-foreground/70 backdrop-blur transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex"
          aria-label="Scroll earlier"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          className="absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 font-sans text-foreground/70 backdrop-blur transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex"
          aria-label="Scroll later"
        >
          →
        </button>
      </div>

      {/* Chronological rail */}
      <footer className="z-20 shrink-0 px-6 pb-6 pt-2 sm:px-12">
        <div className="flex items-center gap-4">
          <span className="font-sans text-xs tabular-nums text-muted-foreground">{firstYear}</span>
          <div className="relative h-px flex-1 bg-border">
            <div
              className="absolute inset-y-0 left-0 bg-[var(--accent-ink)]"
              style={{ width: `${progress * 100}%` }}
            />
            <span
              className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent-ink)] bg-background transition-[left] duration-150"
              style={{ left: `${progress * 100}%` }}
              aria-hidden
            />
          </div>
          <span className="font-sans text-xs tabular-nums text-muted-foreground">{lastYear}</span>
        </div>
        <p className="mt-2 text-center font-sans text-xs tracking-wide text-foreground/60" aria-live="polite">
          <span className="text-[var(--accent-ink)]">{current.dateLabel}</span>
          <span className="mx-2 text-border">·</span>
          {current.title}
        </p>
      </footer>

      <TileDetail item={active} onClose={() => setActive(null)} />
    </div>
  )
}
