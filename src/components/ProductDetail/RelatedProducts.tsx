'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { productImage } from '@/app/products/data'
import { addToCart, isInCart, removeProductFromCart, toggleWishlist, useStore } from '@/lib/store'
import { Icon, defaultCartItem, formatPrice, type Product } from './shared'

const RelatedProducts = ({ products }: { products: Product[] }) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const store = useStore()

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: el.clientWidth * 0.8 * dir, behavior: 'smooth' })
  }

  if (products.length === 0) return null

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 text-foreground sm:px-8 lg:px-16">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl">You Might Also Like</h2>
        <div className="flex gap-2">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scroll(dir)}
              disabled={dir === -1 ? !canPrev : !canNext}
              aria-label={dir === -1 ? 'Previous products' : 'Next products'}
              className="grid size-9 cursor-pointer place-items-center rounded-full border border-foreground/30 transition-colors hover:bg-foreground hover:text-clean disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground"
            >
              <Icon name={dir === -1 ? 'arrowLeft' : 'arrowRight'} />
            </button>
          ))}
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => {
          const wishlisted = store.wishlist.includes(p.slug)
          const inCart = isInCart(store, p.slug)
          return (
            <article
              key={p.slug}
              className="group w-[46%] shrink-0 snap-start sm:w-[31%] md:w-[23%] lg:w-[calc((100%-5rem)/6)]"
            >
              <div className="relative aspect-[4/3.4] overflow-hidden rounded-sm bg-neutral">
                <Link href={`/products/${p.slug}`} aria-label={p.name}>
                  <Image
                    src={productImage(p.cover)}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => toggleWishlist(p.slug)}
                  aria-pressed={wishlisted}
                  aria-label={wishlisted ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
                  className="absolute top-2 right-2 grid size-8 cursor-pointer place-items-center"
                >
                  <Icon name="heart" filled={wishlisted} className={`size-5 transition-colors ${wishlisted ? 'text-accent' : '[&_svg]:fill-clean/40'}`} />
                </button>
              </div>
              <div className="mt-3 flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <Link href={`/products/${p.slug}`} className="block truncate text-sm underline-offset-4 hover:underline">
                    {p.name}
                  </Link>
                  <p className="mt-1 text-sm">
                    {p.fromPrice !== p.price && <span className="mr-1 text-xs text-foreground/60">From</span>}
                    {formatPrice(p.fromPrice)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => (inCart ? removeProductFromCart(p.slug) : addToCart(defaultCartItem(p)))}
                  aria-pressed={inCart}
                  aria-label={inCart ? `Remove ${p.name} from cart` : `Add ${p.name} to cart`}
                  className={`grid size-8 shrink-0 cursor-pointer place-items-center rounded-full border transition-colors ${
                    inCart ? 'border-foreground bg-foreground text-clean' : 'border-foreground/40 hover:bg-foreground hover:text-clean'
                  }`}
                >
                  <Icon name={inCart ? 'check' : 'cart'} className="size-3.5" />
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default RelatedProducts
