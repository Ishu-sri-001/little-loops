'use client'

import { useRef, useState, type FormEvent } from 'react'
import Image from 'next/image'
import { productImage } from '@/app/products/data'
import { Icon, Stars, type Product, type Review } from './shared'

const RealStories = ({ product }: { product: Product }) => {
  const [reviews, setReviews] = useState<Review[]>(product.reviews)
  const [formOpen, setFormOpen] = useState(false)
  const [draftRating, setDraftRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [thanks, setThanks] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  // Fold newly written reviews into the headline numbers
  const newReviews = reviews.slice(0, reviews.length - product.reviews.length)
  const count = product.reviewCount + newReviews.length
  const average =
    Math.round(((product.rating * product.reviewCount + newReviews.reduce((s, r) => s + r.rating, 0)) / count) * 10) / 10

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: el.clientWidth * 0.9 * dir, behavior: 'smooth' })
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const review: Review = {
      id: `${product.slug}-user-${Date.now()}`,
      author: String(data.get('author')).trim(),
      title: String(data.get('title')).trim(),
      body: String(data.get('body')).trim(),
      rating: draftRating,
      image: product.cover,
    }
    setReviews((r) => [review, ...r])
    e.currentTarget.reset()
    setDraftRating(5)
    setFormOpen(false)
    setThanks(true)
    trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
  }

  const inputClass =
    'w-full rounded-md border border-foreground/20 bg-clean/60 px-4 py-2.5 text-sm outline-none placeholder:text-foreground/40 focus:border-foreground/60'

  return (
    <section id="reviews" className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-12 pb-20 text-foreground sm:px-8 lg:px-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl">Real Stories, Real Creations</h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-foreground/70">
            <span className="font-medium text-foreground">{average}</span> out of 5
            <span className="text-accent">
              <Stars rating={1} className="size-3.5" />
            </span>
            Based on {count} reviews
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFormOpen((o) => !o)
            setThanks(false)
          }}
          aria-expanded={formOpen}
          className="cursor-pointer rounded-full border border-foreground/60 px-6 py-2.5 text-sm transition-colors hover:bg-foreground hover:text-clean"
        >
          {formOpen ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {thanks && (
        <p role="status" className="mt-4 text-sm text-secondary">
          Thank you for sharing your story! ♡
        </p>
      )}

      {formOpen && (
        <form onSubmit={submit} className="mt-6 grid gap-4 rounded-md bg-highlight/60 p-6 sm:grid-cols-2">
          <fieldset className="sm:col-span-2">
            <legend className="text-sm">Your rating</legend>
            <div className="mt-2 flex gap-1" onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setDraftRating(n)}
                  onMouseEnter={() => setHoverRating(n)}
                  aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  aria-pressed={draftRating === n}
                  className="cursor-pointer text-accent"
                >
                  <Stars rating={(hoverRating || draftRating) >= n ? 1 : 0} className="size-6" />
                </button>
              ))}
            </div>
          </fieldset>
          <input name="author" required maxLength={40} placeholder="Your name" className={inputClass} />
          <input name="title" required maxLength={80} placeholder="Review title" className={inputClass} />
          <textarea name="body" required maxLength={400} rows={3} placeholder="Tell us what you made…" className={`${inputClass} sm:col-span-2`} />
          <button
            type="submit"
            className="h-11 cursor-pointer rounded-full bg-foreground px-8 text-sm text-clean transition-opacity hover:opacity-90 sm:col-span-2 sm:w-fit"
          >
            Submit Review
          </button>
        </form>
      )}

      <div className="relative mt-8">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6"
        >
          {reviews.map((r) => (
            <article
              key={r.id}
              className="flex w-[88%] shrink-0 snap-start gap-4 rounded-md border border-foreground/10 bg-highlight/50 p-4 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
            >
              <div className="relative size-28 shrink-0 overflow-hidden rounded-sm bg-neutral">
                <Image src={productImage(r.image)} alt="" fill sizes="112px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <Stars rating={r.rating} />
                <h3 className="mt-2 font-display text-base leading-snug">“{r.title}”</h3>
                <p className="mt-1 line-clamp-3 text-xs leading-5 text-foreground/75">{r.body}</p>
                <p className="mt-2 text-xs text-foreground/60">{r.author}</p>
              </div>
            </article>
          ))}
        </div>

        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => scroll(dir)}
            aria-label={dir === -1 ? 'Previous reviews' : 'Next reviews'}
            className={`absolute top-1/2 hidden size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-foreground/30 bg-background transition-colors hover:bg-foreground hover:text-clean sm:grid ${
              dir === -1 ? '-left-3' : '-right-3'
            }`}
          >
            <Icon name={dir === -1 ? 'arrowLeft' : 'arrowRight'} />
          </button>
        ))}
      </div>
    </section>
  )
}

export default RealStories
