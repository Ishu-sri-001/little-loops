'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { useLenis } from 'lenis/react'
import { SITE } from '@/lib/site'

export type LegalSection = { id: string; title: string; body: ReactNode }

const LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/shipping-returns', label: 'Shipping & Returns' },
]

/** Shared layout for the legal pages: header, sticky contents list with scroll-spy, and sections */
const LegalPage = ({
  title,
  intro,
  path,
  sections,
}: {
  title: string
  intro: string
  path: string
  sections: LegalSection[]
}) => {
  const lenis = useLenis()
  const [active, setActive] = useState(sections[0]?.id)

  // Highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px' }
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  const jump = (e: React.MouseEvent, id: string) => {
    if (!lenis) return
    e.preventDefault()
    lenis.scrollTo(`#${id}`, { offset: -96 })
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <main className="w-full text-foreground">
      <header className="border-b border-foreground/10 bg-highlight/50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 md:py-16 lg:px-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-foreground/60">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>{' '}
            / <span className="text-foreground/80">{title}</span>
          </nav>
          <p className="mt-6 flex items-center gap-4 text-xs tracking-[0.35em] text-foreground/70 uppercase">
            Legal <span className="h-px w-10 bg-foreground/40" />
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/75 sm:text-base">{intro}</p>
          <p className="mt-4 text-xs text-foreground/55">Last updated: {SITE.legal.lastUpdated}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-8 md:grid-cols-[200px_1fr] md:gap-12 lg:grid-cols-[240px_1fr] lg:gap-16 lg:px-16 lg:py-16">
        {/* Contents */}
        <aside className="md:sticky md:top-28 md:self-start">
          <p className="text-[11px] tracking-[0.3em] text-foreground/60 uppercase">On this page</p>
          <ol className="mt-4 space-y-1 border-l border-foreground/15 text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => jump(e, s.id)}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={`-ml-px block border-l py-1.5 pl-4 transition-colors ${
                    active === s.id
                      ? 'border-foreground font-medium text-foreground'
                      : 'border-transparent text-foreground/65 hover:text-foreground'
                  }`}
                >
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-[11px] tracking-[0.3em] text-foreground/60 uppercase">Other policies</p>
          <ul className="mt-3 space-y-2 text-sm">
            {LEGAL_LINKS.filter((l) => l.href !== path).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-foreground/75 underline-offset-4 hover:text-foreground hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Body */}
        <article className="max-w-3xl space-y-12">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="font-display text-2xl sm:text-3xl">
                {i + 1}. {s.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/80 sm:text-[15px] [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:space-y-2">
                {s.body}
              </div>
            </section>
          ))}

          <div className="rounded-2xl bg-highlight/70 p-6 text-sm leading-6 sm:p-8 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-accent">
            <p className="font-display text-xl">Questions about this policy?</p>
            <p className="mt-2 text-foreground/75">
              Write to us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or use our{' '}
              <Link href="/contact">contact form</Link> and a real person will reply.
            </p>
          </div>
        </article>
      </div>
    </main>
  )
}

export default LegalPage
