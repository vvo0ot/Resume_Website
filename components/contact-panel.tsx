"use client"

const links = [
  { label: "Email", value: "eleanor.voss@[institution].edu", href: "mailto:eleanor.voss@example.edu" },
  { label: "ORCID", value: "0000-0000-0000-0000", href: "#" },
  { label: "Curriculum Vitae", value: "Download (PDF)", href: "#" },
  { label: "Google Scholar", value: "Profile", href: "#" },
]

export function ContactPanel() {
  return (
    <section
      aria-label="Contact and colophon"
      className="flex h-full w-[86vw] shrink-0 snap-center flex-col justify-center sm:w-[480px]"
    >
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--accent-ink)]">
        Correspondence
      </p>

      <h2 className="mt-5 text-balance font-serif text-4xl font-light leading-tight text-foreground">
        The archive is open. Write, and it continues.
      </h2>

      <dl className="mt-8 divide-y divide-border border-y border-border">
        {links.map((link) => (
          <div key={link.label} className="flex items-baseline justify-between gap-4 py-3">
            <dt className="font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {link.label}
            </dt>
            <dd>
              <a
                href={link.href}
                className="font-serif text-base text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-[var(--accent-ink)]"
              >
                {link.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 font-sans text-xs leading-relaxed text-foreground/50">
        Set in Spectral &amp; Inter. Placeholder content and artifacts throughout —
        an exhibition awaiting its scholarship.
      </p>
    </section>
  )
}
