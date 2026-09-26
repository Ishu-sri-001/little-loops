'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { productImage } from '@/app/products/data'
import { addToCart } from '@/lib/store'
import { Icon, defaultCartItem, formatPrice, type Product } from './shared'

const BUNDLE_DISCOUNT = 0.1 // applied when 2+ items are selected

const FrequentlyBought = ({ product, pairs }: { product: Product; pairs: Product[] }) => {
  const items = [product, ...pairs]
  const [selected, setSelected] = useState<string[]>(items.map((i) => i.slug))
  const [added, setAdded] = useState(false)

  if (pairs.length === 0) return null

  const toggle = (slug: string) => {
    setAdded(false)
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]))
  }

  const chosen = items.filter((i) => selected.includes(i.slug))
  const total = chosen.reduce((sum, i) => sum + i.price, 0)
  const discounted = chosen.length > 1 ? Math.round(total * (1 - BUNDLE_DISCOUNT)) : total
  const hasDiscount = discounted < total

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 text-foreground sm:px-8 lg:px-16">
      <h2 className="font-display text-3xl">Frequently Bought Together</h2>
      <p className="mt-1 text-sm text-foreground/65">Complete your creative journey.</p>

      <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-5">
          {items.map((item, i) => {
            const isSelected = selected.includes(item.slug)
            return (
              <Fragment key={item.slug}>
                {i > 0 && (
                  <li aria-hidden className="text-lg text-foreground/50">
                    +
                  </li>
                )}
                <li className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggle(item.slug)}
                    aria-label={`Include ${item.name}`}
                    className="size-4 shrink-0 cursor-pointer accent-foreground"
                  />
                  <Link
                    href={`/products/${item.slug}`}
                    className={`relative size-20 shrink-0 overflow-hidden rounded-sm bg-neutral transition-opacity ${
                      isSelected ? '' : 'opacity-40'
                    }`}
                  >
                    <Image src={productImage(item.cover)} alt={item.name} fill sizes="80px" className="object-cover" />
                  </Link>
                  <span className="max-w-36 text-xs">
                    {i === 0 ? (
                      <span className="block">This item: {item.name}</span>
                    ) : (
                      <Link href={`/products/${item.slug}`} className="block underline-offset-4 hover:underline">
                        {item.name}
                      </Link>
                    )}
                    <span className="mt-1 block text-sm">{formatPrice(item.price)}</span>
                  </span>
                </li>
              </Fragment>
            )
          })}
        </ul>

        <div className="flex flex-col gap-4 lg:min-w-72 lg:border-l lg:border-foreground/10 lg:pl-10">
          <p className="text-sm" aria-live="polite">
            <span className="text-foreground/70">Total: </span>
            {hasDiscount && <span className="mr-2 text-foreground/50 line-through">{formatPrice(total)}</span>}
            <span className="text-base font-medium">{formatPrice(discounted)}</span>
            {hasDiscount && <span className="ml-1 text-xs text-accent">({BUNDLE_DISCOUNT * 100}% OFF)</span>}
          </p>
          <button
            type="button"
            onClick={() => {
              const factor = chosen.length > 1 ? 1 - BUNDLE_DISCOUNT : 1
              chosen.forEach((item) => {
                const line = defaultCartItem(item)
                addToCart({
                  ...line,
                  price: Math.round(item.price * factor),
                  variant: factor < 1 ? [line.variant, 'Bundle'].filter(Boolean).join(' · ') : line.variant,
                })
              })
              setAdded(true)
            }}
            disabled={chosen.length === 0}
            className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-foreground px-8 text-sm text-clean transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Icon name={added ? 'check' : 'cart'} />
            {added
              ? `${chosen.length} added to cart`
              : chosen.length === items.length
                ? 'Add All to Cart'
                : `Add ${chosen.length} to Cart`}
          </button>
        </div>
      </div>
    </section>
  )
}

export default FrequentlyBought
