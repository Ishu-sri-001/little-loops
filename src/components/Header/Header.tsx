'use client'

import { Suspense, useEffect, useState, type MouseEvent } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { Heart, Menu, Search, ShoppingBag, X } from '@/components/icons/lucide'
import { cartCount, useStore } from '@/lib/store'
import { SITE } from '@/lib/site'
import CartDrawer, { type DrawerTab } from './CartDrawer'
import SearchDialog from './SearchDialog'

type NavLink = { label: string; href: string; category?: string; hash?: string }

const LINKS: NavLink[] = [
  { label: 'Shop', href: '/products' },
  { label: 'Bags', href: '/products?category=Bags', category: 'Bags' },
  { label: 'Accessories', href: '/products?category=Hair%20Accessories', category: 'Hair Accessories' },
  { label: 'Home Decor', href: '/products?category=Home%20Decor', category: 'Home Decor' },
  { label: 'Our Story', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const Logo = () => (
  <Link href="/" className="flex items-center gap-3" aria-label={`${SITE.name} home`}>
    <svg viewBox="0 0 32 40" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" className="h-8 w-6 shrink-0 sm:h-9 sm:w-7" aria-hidden>
      <path d="M16 39V6" />
      <path d="M16 8c-2-2-2-5 0-7 2 2 2 5 0 7Z" />
      {[12, 19, 26].map((y) => (
        <g key={y}>
          <path d={`M16 ${y + 3}c-5 0-8-3-9-7 5 0 8 3 9 7Z`} />
          <path d={`M16 ${y + 1}c5 0 8-3 9-7-5 0-8 3-9 7Z`} />
        </g>
      ))}
    </svg>
    <span className="leading-none">
      <span className="block font-display text-xl whitespace-nowrap sm:text-2xl">{SITE.name}</span>
      <span className="mt-1 hidden text-[8px] tracking-[0.25em] whitespace-nowrap text-foreground/70 uppercase sm:block">{SITE.tagline}</span>
    </span>
  </Link>
)

/** Nav links with active state: reads ?category, so it lives inside Suspense */
const NavLinks = ({
  className,
  linkClassName,
  onNavigate,
}: {
  className: string
  linkClassName: (active: boolean) => string
  onNavigate: (e: MouseEvent<HTMLAnchorElement>, link: NavLink) => void
}) => {
  const pathname = usePathname()
  const category = useSearchParams().get('category')

  const isActive = (link: NavLink) => {
    if (link.hash) return false
    if (!link.href.startsWith('/products')) return pathname === link.href
    if (link.category) return pathname === '/products' && category === link.category
    // "Shop" covers the full listing and every product page
    return pathname.startsWith('/products') && (pathname !== '/products' || !category)
  }

  return (
    <ul className={className}>
      {LINKS.map((link) => {
        const active = isActive(link)
        return (
          <li key={link.label}>
            <Link
              href={link.href}
              onClick={(e) => onNavigate(e, link)}
              aria-current={active ? 'page' : undefined}
              className={linkClassName(active)}
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

const Header = () => {
  const pathname = usePathname()
  const lenis = useLenis()
  const store = useStore()
  const count = cartCount(store)

  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [drawer, setDrawer] = useState<DrawerTab | null>(null)

  const overlayOpen = searchOpen || drawer !== null || menuOpen

  // Hide on scroll down, reveal on scroll up
  useLenis(({ scroll, direction }) => {
    setScrolled(scroll > 8)
    if (!overlayOpen) setHidden(direction === 1 && scroll > 160)
  })

  // Freeze page scrolling while an overlay is open
  useEffect(() => {
    if (!lenis) return
    if (searchOpen || drawer !== null) lenis.stop()
    else lenis.start()
  }, [lenis, searchOpen, drawer])

  // ⌘K / Ctrl+K or "/" opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && e.target.closest('input, textarea, select, [contenteditable]')
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Same-page section links scroll smoothly instead of jumping
  const onNavigate = (e: MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    setMenuOpen(false)
    if (link.hash && pathname === '/' && lenis) {
      e.preventDefault()
      lenis.scrollTo(`#${link.hash}`, { offset: -72 })
      history.replaceState(null, '', `/#${link.hash}`)
    }
  }

  const iconButton = 'relative grid size-10 cursor-pointer place-items-center rounded-full transition-colors hover:bg-neutral/70'

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full text-foreground transition-[transform,background-color,box-shadow] duration-500 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${scrolled || menuOpen ? 'bg-background/90 shadow-[0_8px_30px_-20px_rgba(95,75,62,0.5)] backdrop-blur-md' : 'bg-background'}`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-8 lg:px-10 xl:px-16">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <Suspense fallback={null}>
              <NavLinks
                onNavigate={onNavigate}
                className="flex items-center gap-5 xl:gap-9"
                linkClassName={(active) =>
                  `relative py-2 text-sm whitespace-nowrap transition-colors xl:text-[15px] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-foreground after:transition-transform after:duration-300 ${
                    active
                      ? 'font-medium text-foreground after:scale-x-100'
                      : 'text-foreground/80 after:scale-x-0 hover:text-foreground hover:after:scale-x-100'
                  }`
                }
              />
            </Suspense>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search (⌘K)" className={iconButton}>
              <Search strokeWidth={1.4} className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setDrawer('wishlist')}
              aria-label={`Wishlist, ${store.wishlist.length} items`}
              className={iconButton}
            >
              <Heart strokeWidth={1.4} className="size-5" />
              {store.wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-accent" aria-hidden />
              )}
            </button>
            <button type="button" onClick={() => setDrawer('cart')} aria-label={`Cart, ${count} items`} className={iconButton}>
              <ShoppingBag strokeWidth={1.4} className="size-5" />
              {count > 0 && (
                <span
                  key={count}
                  className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 animate-in place-items-center rounded-full bg-foreground px-1 text-[10px] text-clean zoom-in-50"
                  aria-hidden
                >
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`${iconButton} lg:hidden`}
            >
              {menuOpen ? <X strokeWidth={1.4} className="size-5" /> : <Menu strokeWidth={1.4} className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav id="mobile-menu" aria-label="Main" className="border-t border-foreground/10 px-4 pb-6 sm:px-8 lg:hidden">
            <Suspense fallback={null}>
              <NavLinks
                onNavigate={onNavigate}
                className="flex flex-col"
                linkClassName={(active) =>
                  `block border-b border-foreground/10 py-4 font-display text-xl ${active ? 'text-foreground' : 'text-foreground/75'}`
                }
              />
            </Suspense>
          </nav>
        )}
      </header>

      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
      {drawer && <CartDrawer tab={drawer} onTabChange={setDrawer} onClose={() => setDrawer(null)} />}
    </>
  )
}

export default Header
