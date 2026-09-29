"use client"

import Image from "next/image"

export function IntroPanel() {
  return (
    <section
      aria-label="Introduction"
      className="flex h-full w-[86vw] shrink-0 snap-center flex-col justify-center sm:w-[560px]"
    >
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--accent-ink)]">
        An Intellectual Timeline
      </p>

      <h1 className="mt-5 text-balance font-serif text-5xl font-light leading-[1.05] text-foreground sm:text-6xl">
        Bud Borton
      </h1>

      <p className="mt-6 max-w-md text-pretty font-serif text-lg italic leading-relaxed text-foreground/80">
        A lifetime of scholarship, teaching, and thinking, laid out as an
        archive rather than a résumé — read it as you would walk a gallery,
        left to right.
      </p>

      <div className="mt-8 flex items-center gap-5">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border bg-muted grayscale">
          <Image
            src="/artifacts/portrait.png"
            alt="Portrait placeholder — a scholar's quiet study"
            fill
            sizes="80px"
            className="object-cover"
            priority
          />
        </div>
        <p className="max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">
          Philosopher and historian of ideas. Each artifact ahead is a document
          from the work — click any to read it more closely.
        </p>
      </div>

      <div className="mt-10 flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] text-foreground/50">
        <span>Scroll to begin</span>
        <span aria-hidden className="motion-safe:animate-pulse">
          →
        </span>
      </div>
    </section>
  )
}
