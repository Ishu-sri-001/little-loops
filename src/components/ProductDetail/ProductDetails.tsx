'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { productImage } from '@/app/products/data'
import { Icon, Stars, type IconName, type Product } from './shared'

type TabId = 'details' | 'care' | 'shipping' | 'reviews'

const ProductDetails = ({ product }: { product: Product }) => {
  const [tab, setTab] = useState<TabId>('details')
  // A lifestyle shot (not the cut-out) that isn't the hero's first image, when there is one
  const photos = product.images.filter((f) => !f.endsWith('transparent'))
  const sideImage = photos[Math.min(2, photos.length - 1)]
  const madeToOrder = product.features.includes('Made to Order')

  const tabs: { id: TabId; label: string }[] = [
    { id: 'details', label: 'Product Details' },
    { id: 'care', label: 'Care Guide' },
    { id: 'shipping', label: 'Shipping & Returns' },
    { id: 'reviews', label: `Reviews (${product.reviewCount})` },
  ]

  return (
    <section className="w-full text-foreground">
      {/* Highlights strip */}
      <div className="border-y border-foreground/10 bg-highlight/60">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-7 sm:grid-cols-3 sm:px-8 lg:grid-cols-5 lg:px-16">
          {product.highlights.map((h, i) => (
            <li
              key={h.icon}
              className={`flex flex-col items-center gap-2 text-center text-xs leading-snug whitespace-pre-line text-foreground/80 sm:text-sm ${
                i > 0 ? 'lg:border-l lg:border-foreground/15' : ''
              }`}
            >
              <Icon name={h.icon as IconName} className="size-6 text-foreground/80" />
              {h.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]">
        <div className="px-4 py-10 sm:px-8 lg:py-12 lg:pl-16">
          {/* Tabs */}
          <div role="tablist" aria-label="Product information" className="flex gap-6 overflow-x-auto border-b border-foreground/10 [scrollbar-width:none] sm:gap-10">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`-mb-px shrink-0 cursor-pointer border-b-2 pb-3 text-sm transition-colors ${
                  tab === t.id ? 'border-foreground font-medium' : 'border-transparent text-foreground/65 hover:text-foreground'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="pt-8">
            {tab === 'details' && (
              <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
                <div className="relative">
                  <p className="text-sm leading-6 tracking-wide text-foreground/80">{product.longDescription}</p>
                  <p className="pointer-events-none mt-8 hidden -rotate-12 font-accent text-2xl leading-tight text-foreground/70 md:block">
                    Crafted
                    <br />
                    &nbsp;for a
                    <br />
                    &nbsp;&nbsp;Kinder
                    <br />
                    &nbsp;&nbsp;&nbsp;Tomorrow ♡
                  </p>
                </div>
                <table className="w-full text-xs">
                  <tbody>
                    {product.specs.map(([label, value]) => (
                      <tr key={label} className="border-b border-foreground/10 last:border-b-0">
                        <th scope="row" className="py-3 pr-4 text-left font-medium">
                          {label}
                        </th>
                        <td className="py-3 text-foreground/75">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === 'care' && (
              <ul className="max-w-xl space-y-3 text-sm leading-6 text-foreground/80">
                {product.careGuide.map((line) => (
                  <li key={line} className="flex gap-3">
                    <Icon name="leaf" className="mt-1 size-4 shrink-0 text-secondary" />
                    {line}
                  </li>
                ))}
              </ul>
            )}

            {tab === 'shipping' && (
              <div className="grid max-w-2xl gap-6 text-sm leading-6 text-foreground/80 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-lg text-foreground">Shipping</h3>
                  <p className="mt-2">
                    Free shipping on orders above ₹999. Every piece is packed by hand in plastic-free packaging.{' '}
                    {madeToOrder
                      ? 'This piece is made to order, so please allow 7–10 days for it to be crocheted before dispatch.'
                      : 'This piece is ready to ship and is dispatched within 1–2 business days.'}{' '}
                    Delivery takes 3–7 days across India.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-lg text-foreground">Returns</h3>
                  <p className="mt-2">
                    Unused pieces with their tag attached can be returned within 14 days for a full refund.
                    {product.features.includes('Customisable') &&
                      ' Personalised or customised orders can’t be returned, but we’ll always fix any fault in our making.'}
                    {' '}As each piece is handmade, tiny variations in colour and size make it one of a kind.
                  </p>
                  <Link href="/shipping-returns" className="mt-3 inline-block text-accent underline underline-offset-4">
                    Read the full shipping &amp; returns policy
                  </Link>
                </div>
              </div>
            )}

            {tab === 'reviews' && (
              <div>
                <p className="flex items-center gap-3 text-sm">
                  <Stars rating={product.rating} className="size-4" />
                  {product.rating} out of 5 · {product.reviewCount} reviews
                </p>
                <ul className="mt-6 divide-y divide-foreground/10">
                  {product.reviews.map((r) => (
                    <li key={r.id} className="py-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-display text-base">“{r.title}”</p>
                        <Stars rating={r.rating} />
                      </div>
                      <p className="mt-1 text-sm text-foreground/75">{r.body}</p>
                      <p className="mt-2 text-xs text-foreground/60">{r.author}</p>
                    </li>
                  ))}
                </ul>
                <a href="#reviews" className="mt-2 inline-block text-sm text-accent underline underline-offset-4">
                  See all stories & write a review
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Side image with tag */}
        <div className="relative min-h-80 overflow-hidden bg-neutral">
          <Image
            src={productImage(sideImage)}
            alt={`${product.name} styled at home`}
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover"
          />
          <div className="absolute right-5 -bottom-2 rotate-[-8deg]">
            <div className="mx-auto h-8 w-px bg-foreground/40" />
            <div className="relative flex w-36 flex-col items-center rounded-md bg-highlight/95 px-4 pt-7 pb-5 text-center font-display text-lg leading-snug shadow-[0_12px_30px_-12px_rgba(95,75,62,0.5)] [clip-path:polygon(18%_0,82%_0,100%_12%,100%_100%,0_100%,0_12%)]">
              <span className="absolute top-2.5 size-2 rounded-full border border-foreground/40" />
              Same
              <br />
              Softness
              <br />A Brighter
              <br />
              Tomorrow
              <span className="mt-2 text-base">♡</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
