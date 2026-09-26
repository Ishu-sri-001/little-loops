'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { CATEGORIES, PRODUCTS, productImage } from '@/app/products/data'
import { ChevronLeft, ChevronRight, Heart as HeartIcon } from '@/components/icons/lucide'

type StageTag = (typeof PRODUCTS)[number]['tags'][number]

const MotionLink = motion.create(Link)

type TabId = StageTag

const TABS: {
  id: TabId
  label: string
  title: [string, string]
  description: string
  cta: string
  image: string
}[] = [
  {
    id: 'top-picks',
    label: 'Top Picks',
    title: ['Handpicked', 'Just for You.'],
    description:
      'A little bit of everything we love: our most-loved crochet pieces, chosen to bring warmth, beauty and joy to your everyday.',
    cta: 'Shop Top Picks',
    image: 'rose-bouquet1',
  },
  {
    id: 'best-sellers',
    label: 'Best Sellers',
    title: ['Loved by', 'Many Hands.'],
    description:
      'The pieces our community keeps coming back for: tried, gifted and treasured in homes everywhere.',
    cta: 'Shop Best Sellers',
    image: 'tote-bag4',
  },
  {
    id: 'collections',
    label: 'Collections',
    title: ['Stories in', 'Every Stitch.'],
    description:
      'Curated sets woven around a mood, a season or a memory, made to sit beautifully together.',
    cta: 'Browse Collections',
    image: 'daisy-wall-hanging1',
  },
  {
    id: 'new-arrivals',
    label: 'New Arrivals',
    title: ['Fresh off', 'the Hook.'],
    description:
      'Just finished and ready for a new home: the latest loops from our makers, in small batches.',
    cta: 'Shop New Arrivals',
    image: 'jacket1',
  },
  {
    id: 'gifts',
    label: 'Gifts',
    title: ['Wrapped in', 'Warmth.'],
    description:
      'Thoughtful, handmade gifts for the people who make your days softer. Big smiles, small stitches.',
    cta: 'Shop Gifts',
    image: 'soft-toy4',
  },
]

const formatPrice = (price: number) => `₹ ${price.toLocaleString('en-IN')}`

const Chevron = ({ className = '', direction = 'right' }: { className?: string; direction?: 'left' | 'right' }) =>
  direction === 'left' ? <ChevronLeft className={`size-4 ${className}`} /> : <ChevronRight className={`size-4 ${className}`} />

const Heart = ({ className = '' }: { className?: string }) => <HeartIcon strokeWidth={1.2} className={className} />

const Sprig = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 120 180" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" className={className} aria-hidden>
    <path d="M20 178C40 130 62 80 100 8" />
    <path d="M100 8c-8 4-12 14-8 22 8-4 12-14 8-22Z" />
    <path d="M86 36c-10 0-18 8-18 16 10 0 18-8 18-16Z" />
    <path d="M88 38c8-6 18-6 22 0-8 6-18 6-22 0Z" />
    <path d="M74 62c-10-2-20 4-22 12 10 2 20-4 22-12Z" />
    <path d="M76 64c8-6 20-4 24 2-8 6-20 4-24-2Z" />
    <path d="M60 92c-10-2-20 4-22 12 10 2 20-4 22-12Z" />
    <path d="M62 94c8-6 20-4 24 2-8 6-20 4-24-2Z" />
    <path d="M44 126c-8 2-14 12-12 20 8-2 14-12 12-20Z" />
    <path d="M46 128c10-4 22 0 24 8-10 4-22 0-24-8Z" />
  </svg>
)

const Stage = () => {
  const [activeTab, setActiveTab] = useState<TabId>('top-picks')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const tab = TABS.find((t) => t.id === activeTab)!
  const products = PRODUCTS.filter(
    (p) => p.tags.includes(activeTab) && (selectedTypes.length === 0 || selectedTypes.includes(p.category))
  )

  const toggleType = (type: string) =>
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))

  const updateScrollState = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollPrev(el.scrollLeft > 4)
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  const scrollTrack = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8
    el.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  // Reset carousel whenever the visible product list changes
  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 })
    updateScrollState()
  }, [activeTab, selectedTypes])

  useEffect(() => {
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [])

  return (
    <section id="shop" className="relative w-full scroll-mt-10 bg-background px-4 py-16 text-foreground sm:px-8 lg:px-16 lg:py-24">
      {/* Heading */}
      <header className="relative mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="flex items-center gap-4 text-xs tracking-[0.35em] text-foreground/70 uppercase">
            Explore <span className="h-px w-12 bg-foreground/40" />
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            Handmade,
            <br />
            Just for You.
          </h2>
        </div>

        <p className="max-w-xs text-sm leading-relaxed tracking-wide text-foreground/75 md:mb-6 lg:mr-auto lg:ml-40">
          Thoughtfully crafted pieces to add warmth, beauty and meaning to your everyday.
        </p>

        <div className="pointer-events-none absolute -top-6 right-0 hidden items-start gap-6 lg:flex">
          <Sprig className="h-44 w-auto text-foreground/60" />
          <p className="mt-2 -rotate-12 font-accent text-3xl leading-tight text-foreground/70">
            Small
            <br />
            &nbsp;&nbsp;Stitches
            <br />
            &nbsp;&nbsp;&nbsp;Brighter
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;Days ♡
          </p>
        </div>
      </header>

      {/* Stage card */}
      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-3 rounded-3xl border border-foreground/10 bg-clean/40 p-3 shadow-[0_20px_60px_-30px_rgba(95,75,62,0.35)] lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-foreground/10 bg-highlight/40 p-5 lg:py-8">
          <nav aria-label="Product categories">
            <ul className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
              {TABS.map((t) => {
                const active = t.id === activeTab
                return (
                  <li key={t.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveTab(t.id)}
                      aria-current={active ? 'page' : undefined}
                      className={`group flex w-full cursor-pointer items-center gap-3 rounded-full px-5 py-3 text-left font-display text-lg transition-colors duration-300 ${
                        active
                          ? 'bg-linear-to-r from-primary/45 to-neutral/70 text-foreground'
                          : 'text-foreground/80 hover:bg-neutral/40'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full bg-foreground transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`}
                      />
                      <span className="flex-1 whitespace-nowrap">{t.label}</span>
                      <Chevron className="hidden transition-transform group-hover:translate-x-0.5 lg:block" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="my-6 h-px bg-foreground/15 lg:my-8" />

          <fieldset>
            <div className="flex items-center justify-between">
              <legend className="text-[11px] tracking-[0.3em] text-foreground/70 uppercase">Refine</legend>
              {selectedTypes.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedTypes([])}
                  className="cursor-pointer text-xs text-accent underline-offset-4 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {CATEGORIES.map((type) => {
                const count = PRODUCTS.filter((p) => p.tags.includes(activeTab) && p.category === type).length
                return (
                  <label
                    key={type}
                    className={`flex cursor-pointer items-center gap-3 text-sm tracking-wide ${
                      count === 0 ? 'text-foreground/40' : 'text-foreground/85'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className="size-4 cursor-pointer rounded-sm border-foreground/40 accent-accent"
                    />
                    <span className="flex-1">{type}</span>
                    <span className="text-xs text-foreground/50">{count}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        </aside>

        {/* Main stage */}
        <div className="flex min-w-0 flex-col gap-4">
          {/* Banner */}
          <div className="relative flex min-h-105 items-center overflow-hidden rounded-2xl bg-neutral lg:min-h-115">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={productImage(tab.image)}
                  alt=""
                  fill
                  priority={tab.id === 'top-picks'}
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="object-cover object-right"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-linear-to-r from-neutral via-neutral/80 to-transparent md:via-neutral/60" />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative z-10 flex max-w-md flex-col justify-center p-8 sm:p-12 lg:p-14"
              >
                <p className="text-xs tracking-[0.35em] text-foreground/70 uppercase">{tab.label}</p>
                <h3 className="mt-6 font-display text-4xl leading-[1.1] sm:text-5xl">
                  {tab.title[0]}
                  <br />
                  {tab.title[1]}
                </h3>
                <p className="mt-6 text-sm leading-7 tracking-wide text-foreground/80">{tab.description}</p>
                <a
                  href="#stage-products"
                  className="group mt-8 inline-flex w-fit items-center gap-4 rounded-full border border-foreground/70 px-8 py-3 text-sm tracking-wide transition-colors duration-300 hover:bg-foreground hover:text-clean"
                >
                  {tab.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </motion.div>
            </AnimatePresence>

            <p className="pointer-events-none absolute top-10 right-8 z-10 hidden text-center font-accent text-3xl leading-snug text-foreground/75 md:block">
              Made
              <br />
              with
              <br />
              Care
              <br />
              <span className="text-xl">♡</span>
            </p>
          </div>

          {/* Product carousel */}
          <div id="stage-products" className="flex scroll-mt-24 items-center gap-4 px-2 pb-4 sm:px-6">
            <div
              ref={trackRef}
              onScroll={updateScrollState}
              className="flex min-w-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {products.length === 0 ? (
                <div className="flex h-56 w-full flex-col items-center justify-center gap-3 text-center text-sm text-foreground/70">
                  <Heart className="size-6 text-primary" />
                  Nothing here just yet. Try another filter.
                  <button
                    type="button"
                    onClick={() => setSelectedTypes([])}
                    className="cursor-pointer text-accent underline underline-offset-4"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                products.map((p) => (
                  <MotionLink
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    data-card
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="group w-[44%] shrink-0 snap-start sm:w-[30%] xl:w-[calc((100%-4rem)/5)]"
                  >
                    <div className="relative aspect-[4/3.6] overflow-hidden rounded-md bg-neutral">
                      <Image
                        src={productImage(p.cover)}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1280px) 15vw, (min-width: 640px) 25vw, 45vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 truncate text-sm tracking-wide">{p.name}</p>
                    <p className="mt-1 text-sm text-foreground/80">{formatPrice(p.fromPrice)}</p>
                  </MotionLink>
                ))
              )}
            </div>

            <div className="hidden shrink-0 flex-col gap-4 sm:flex">
              <button
                type="button"
                aria-label="Next products"
                onClick={() => scrollTrack(1)}
                disabled={!canScrollNext}
                className="grid size-11 cursor-pointer place-items-center rounded-full border border-foreground/50 transition-colors hover:bg-foreground hover:text-clean disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground"
              >
                <Chevron />
              </button>
              <button
                type="button"
                aria-label="Previous products"
                onClick={() => scrollTrack(-1)}
                disabled={!canScrollPrev}
                className="grid size-11 cursor-pointer place-items-center rounded-full border border-foreground/50 transition-colors hover:bg-foreground hover:text-clean disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground"
              >
                <Chevron direction="left" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer line */}
      <footer className="mx-auto mt-10 max-w-7xl">
        <div data-icon-trigger className="flex items-center gap-6">
          <span className="h-px flex-1 bg-foreground/20" />
          <Heart className="size-5 text-foreground/60" />
          <span className="h-px w-1/4 bg-foreground/20" />
        </div>
        <div className="mt-4 flex flex-col gap-2 text-[11px] tracking-[0.35em] text-foreground/70 uppercase sm:flex-row sm:justify-between">
          <p>Craft &nbsp;•&nbsp; People &nbsp;•&nbsp; Planet</p>
          <p>Slower Days, Brighter Tomorrows</p>
        </div>
      </footer>
    </section>
  )
}

export default Stage
