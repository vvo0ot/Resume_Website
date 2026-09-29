"use client"

export function PhilosophyPanel() {
  return (
    <section
      aria-label="A note on method"
      className="flex h-full w-[86vw] shrink-0 snap-center flex-col justify-center sm:w-[520px]"
    >
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--accent-ink)]">
        A Note on Method
      </p>

      <blockquote className="mt-6 text-balance font-serif text-3xl font-light italic leading-snug text-foreground sm:text-4xl">
        &ldquo;Scholarship is less a sequence of results than a long
        conversation with a question that refuses to be finished.&rdquo;
      </blockquote>

      <div className="mt-8 space-y-4 text-pretty font-sans text-[0.95rem] leading-relaxed text-muted-foreground">
        <p>
          PLACEHOLDER — Use this interlude to describe how you work: the
          questions that recur, the methods you trust, and the intellectual
          commitments that connect the artifacts on either side of this panel.
        </p>
        <p>
          The timeline is deliberately not a list of achievements. It is an
          attempt to show thinking as it actually unfolds — slowly, in revision,
          and in dialogue with teachers, students, and readers.
        </p>
      </div>
    </section>
  )
}
