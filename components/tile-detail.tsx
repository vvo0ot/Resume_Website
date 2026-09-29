"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import type { TimelineItem } from "@/lib/timeline-data"

interface TileDetailProps {
  item: TimelineItem | null
  onClose: () => void
}

export function TileDetail({ item, onClose }: TileDetailProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!item) return

    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`detail-title-${item.id}`}
      className="fixed inset-0 z-[60] flex items-stretch justify-center overflow-y-auto bg-foreground/40 p-0 backdrop-blur-sm duration-200 animate-in fade-in sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative flex min-h-full w-full max-w-4xl flex-col overflow-hidden border border-border bg-card shadow-2xl duration-300 animate-in zoom-in-95 sm:min-h-0 md:flex-row">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 font-sans text-lg leading-none text-foreground/70 backdrop-blur transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Close detail view"
        >
          ×
        </button>

        <div className="relative aspect-[4/5] w-full shrink-0 bg-muted md:aspect-auto md:w-[44%]">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-7 sm:p-9">
          <div className="flex items-baseline justify-between border-b border-border pb-3">
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-[var(--accent-ink)]">
              {item.category}
            </span>
            <span className="font-sans text-xs tabular-nums tracking-wide text-muted-foreground">
              {item.dateLabel}
            </span>
          </div>

          <div>
            <h2
              id={`detail-title-${item.id}`}
              className="text-balance font-serif text-2xl font-medium leading-snug text-foreground sm:text-3xl"
            >
              {item.title}
            </h2>
            {item.discipline ? (
              <p className="mt-2 font-sans text-sm italic text-foreground/70">{item.discipline}</p>
            ) : null}
          </div>

          <p className="text-pretty font-serif text-lg italic leading-relaxed text-foreground/80">
            {item.description}
          </p>

          <div className="space-y-4">
            {item.details.map((paragraph, i) => (
              <p
                key={i}
                className="text-pretty font-sans text-[0.95rem] leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {item.links && item.links.length > 0 ? (
            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-5">
              {item.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-sans text-sm text-[var(--accent-ink)] underline decoration-border underline-offset-4 transition-colors hover:decoration-[var(--accent-ink)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
