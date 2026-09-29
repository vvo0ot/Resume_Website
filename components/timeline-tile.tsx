"use client"

import Image from "next/image"
import type { TimelineItem } from "@/lib/timeline-data"

interface TimelineTileProps {
  item: TimelineItem
  index: number
  onOpen: (item: TimelineItem) => void
}

export function TimelineTile({ item, index, onOpen }: TimelineTileProps) {
  return (
    <article
      className="group relative flex h-full w-[78vw] shrink-0 snap-center flex-col justify-center sm:w-[420px]"
      aria-labelledby={`tile-title-${item.id}`}
    >
      {/* connector node on the timeline axis */}
      <span
        aria-hidden
        className="absolute bottom-[calc(2.5rem-1px)] left-1/2 hidden h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full border border-foreground/40 bg-background sm:block"
      />

      <button
        type="button"
        onClick={() => onOpen(item)}
        className="flex w-full flex-col text-left outline-none transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-safe:group-hover:-translate-y-1"
        aria-label={`Open details for ${item.title}`}
      >
        <span className="mb-3 flex items-baseline justify-between border-b border-border pb-2">
          <span className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-[var(--accent-ink)]">
            {item.category}
          </span>
          <span className="font-sans text-xs tabular-nums tracking-wide text-muted-foreground">
            {item.dateLabel}
          </span>
        </span>

        <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-muted shadow-[0_1px_0_rgba(0,0,0,0.04),0_18px_40px_-28px_rgba(60,45,30,0.5)]">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 640px) 78vw, 420px"
            className="object-cover saturate-[0.85] transition-[filter,transform] duration-500 motion-safe:group-hover:scale-[1.02] motion-safe:group-hover:saturate-100"
            priority={index < 2}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent"
          />
        </div>

        <h3
          id={`tile-title-${item.id}`}
          className="mt-4 text-pretty font-serif text-xl font-medium leading-snug text-foreground"
        >
          {item.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-pretty font-sans text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        <span className="mt-3 flex items-center gap-3">
          {item.discipline ? (
            <span className="font-sans text-xs italic text-foreground/70">{item.discipline}</span>
          ) : null}
          <span className="ml-auto font-sans text-xs uppercase tracking-[0.15em] text-foreground/50 transition-colors group-hover:text-[var(--accent-ink)]">
            View →
          </span>
        </span>
      </button>
    </article>
  )
}
