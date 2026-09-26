'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, X } from '@/components/icons/lucide'
import { PRODUCTS, productImage } from '@/app/products/data'
import { formatPrice } from '@/components/ProductDetail/shared'

const MAX_RESULTS = 6

// Every word must appear somewhere in the product's searchable text
const search = (query: string) => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (words.length === 0) return []
  return PRODUCTS.filter((p) => {
    const haystack = [p.name, p.subtitle, p.category, p.material, ...p.colors.map((c) => c.name), ...p.occasions]
      .join(' ')
      .toLowerCase()
    return words.every((w) => haystack.includes(w))
  }).sort((a, b) => b.popularity - a.popularity)
}

const SUGGESTIONS = ['Bags', 'Keychain', 'Bouquet', 'Scrunchies', 'Coasters', 'Gifting']

const SearchDialog = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)

  const results = search(query)
  const visible = results.slice(0, MAX_RESULTS)

  const open = (slug: string) => {
    onClose()
    router.push(`/products/${slug}`)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (visible.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => (h + 1) % visible.length)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => (h - 1 + visible.length) % visible.length)
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      open(visible[Math.min(highlight, visible.length - 1)].slug)
    }
  }

  return (
    <div role="dialog" aria-modal="true" aria-label="Search products" className="fixed inset-0 z-50" onKeyDown={onKeyDown}>
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-[2px]" onClick={onClose} />
      <div
        data-lenis-prevent
        className="relative mx-auto mt-4 max-h-[85vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl bg-background p-5 text-foreground shadow-[0_30px_60px_-20px_rgba(95,75,62,0.5)] sm:mt-20 sm:p-6"
      >
        <div className="flex items-center gap-3 border-b border-foreground/15 pb-4">
          <Search strokeWidth={1.4} className="size-5 shrink-0 text-foreground/60" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setHighlight(0)
            }}
            placeholder="Search bags, bouquets, keychains…"
            aria-label="Search products"
            aria-controls="search-results"
            className="flex-1 bg-transparent font-display text-xl outline-none placeholder:text-foreground/40"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="grid size-9 cursor-pointer place-items-center rounded-full hover:bg-neutral"
          >
            <X strokeWidth={1.4} className="size-5" />
          </button>
        </div>

        {query.trim() === '' ? (
          <div className="pt-5">
            <p className="text-[11px] tracking-[0.3em] text-foreground/60 uppercase">Popular searches</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="cursor-pointer rounded-full border border-foreground/20 px-4 py-1.5 text-sm transition-colors hover:border-foreground/60"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : visible.length === 0 ? (
          <p className="py-10 text-center text-sm text-foreground/70">
            No pieces match “{query}”. Try a colour, a category or “gift”.
          </p>
        ) : (
          <>
            <ul id="search-results" role="listbox" className="mt-3 divide-y divide-foreground/10">
              {visible.map((p, i) => (
                <li key={p.slug} role="option" aria-selected={i === highlight}>
                  <Link
                    href={`/products/${p.slug}`}
                    onClick={onClose}
                    onMouseEnter={() => setHighlight(i)}
                    className={`flex items-center gap-4 rounded-lg px-2 py-3 transition-colors ${
                      i === highlight ? 'bg-highlight' : ''
                    }`}
                  >
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-md bg-neutral">
                      <Image src={productImage(p.cover)} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-base">{p.name}</span>
                      <span className="block text-xs text-foreground/60">{p.category}</span>
                    </span>
                    <span className="text-sm">{formatPrice(p.fromPrice)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {results.length > MAX_RESULTS && (
              <p className="mt-3 text-center text-xs text-foreground/60">
                Showing {MAX_RESULTS} of {results.length}.{' '}
                <Link href="/products" onClick={onClose} className="underline underline-offset-4 hover:text-foreground">
                  Browse all products
                </Link>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SearchDialog
