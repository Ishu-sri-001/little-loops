'use client'

import { useEffect, useRef, useState, useTransition, type FormEvent } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useTransform } from 'motion/react'
import { ArrowRight, Check, Hand, Instagram, Youtube } from '@/components/icons/lucide'
import { Input } from '@/components/ui/input'
import { subscribeToNewsletter } from '@/lib/actions'
import { newsletterSchema } from '@/lib/contact-schema'
import { SITE } from '@/lib/site'

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Bags', href: '/products?category=Bags' },
      { label: 'Hair Accessories', href: '/products?category=Hair%20Accessories' },
      { label: 'Keychains', href: '/products?category=Keychains' },
      { label: 'Flowers & Bouquets', href: '/products?category=Flowers%20%26%20Bouquets' },
      { label: 'Home Decor', href: '/products?category=Home%20Decor' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Top Picks', href: '/#shop' },
      { label: 'Wearables', href: '/products?category=Wearables' },
      { label: 'FAQs', href: '/contact#faq' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Custom Orders', href: '/#contact-custom-order' },
      { label: 'Gifting & Bulk', href: '/#contact-enquiry' },
      { label: 'Collaborations', href: '/#contact-collaboration' },
      { label: 'Shipping & Returns', href: '/shipping-returns' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
]

// Instagram/YouTube are animated; Pinterest/TikTok have no animated version, so they stay hand-drawn
const SOCIALS: { label: string; href: string; animated?: typeof Instagram; icon?: React.ReactNode }[] = [
  {
    label: 'Instagram',
    href: SITE.socials.instagram,
    animated: Instagram,
  },
  {
    label: 'Pinterest',
    href: SITE.socials.pinterest,
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M10.6 20.2 12.4 12.6M11 9.6c.5-1 1.5-1.6 2.6-1.6 1.8 0 3 1.3 3 3.1 0 2.2-1.3 3.9-3.1 3.9-1.2 0-2-.8-1.8-1.9" />
      </>
    ),
  },
  {
    label: 'YouTube',
    href: SITE.socials.youtube,
    animated: Youtube,
  },
  {
    label: 'TikTok',
    href: SITE.socials.tiktok,
    icon: <path d="M14.5 4c.4 2.2 1.8 3.6 4 3.9v2.6c-1.5 0-2.9-.5-4-1.3v5.6a5 5 0 1 1-5-5v2.7a2.3 2.3 0 1 0 2.3 2.3V4h2.7Z" />,
  },
]

/* ---------- Draggable yarn ball on a string ---------- */

const BALL = 132

const YarnBall = () => (
  <svg viewBox="0 0 100 100" className="size-full drop-shadow-[0_18px_20px_rgba(0,0,0,0.35)]" aria-hidden>
    <defs>
      <clipPath id="yarn-clip">
        <circle cx="50" cy="50" r="47" />
      </clipPath>
      <radialGradient id="yarn-shade" cx="35%" cy="30%" r="75%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.28" />
        <stop offset="60%" stopColor="#fff" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="47" style={{ fill: 'var(--accent)' }} />
    <g
      clipPath="url(#yarn-clip)"
      fill="none"
      strokeWidth="1.6"
      style={{ stroke: 'color-mix(in oklab, var(--accent) 55%, black)' }}
      strokeOpacity="0.55"
    >
      {[0, 30, 60, 90, 120, 150].map((angle) => (
        <ellipse key={angle} cx="50" cy="50" rx="46" ry="18" transform={`rotate(${angle} 50 50)`} />
      ))}
      {[-24, -12, 0, 12, 24].map((offset) => (
        <path key={offset} d={`M${10 + offset} 8 Q ${60 + offset} 50 ${10 + offset} 96`} />
      ))}
    </g>
    <circle cx="50" cy="50" r="47" fill="url(#yarn-shade)" />
  </svg>
)

const YarnToy = () => {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [dragged, setDragged] = useState(false)

  // Resting spot of the ball (top-left, px) and where the string starts
  const homeX = useMotionValue(0)
  const homeY = useMotionValue(20)
  const anchorY = useMotionValue(180)
  // Offset while dragging
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, (v) => v * 0.8)
  const hintX = useTransform(homeX, (v) => v - 150)

  useEffect(() => {
    const el = sceneRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      homeX.set(Math.max(width - BALL - 24, width * 0.55))
      homeY.set(Math.max(0, height * 0.12))
      anchorY.set(height * 0.78)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [homeX, homeY, anchorY])

  // The string sags more the closer the ball gets to the anchor
  const path = useTransform(() => {
    const endX = homeX.get() + x.get() + BALL * 0.18
    const endY = homeY.get() + y.get() + BALL * 0.72
    const startY = anchorY.get()
    const distance = Math.hypot(endX, endY - startY)
    const sag = 30 + Math.max(0, 700 - distance) * 0.12
    const cx = endX * 0.5
    const cy = Math.max(startY, endY) + sag
    return `M -40 ${startY} Q ${cx} ${cy} ${endX} ${endY}`
  })

  return (
    <div ref={sceneRef} className="relative h-60 w-full select-none sm:h-64">
      <svg className="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden>
        <motion.path
          d={path}
          fill="none"
          strokeWidth={2.5}
          strokeLinecap="round"
          style={{ stroke: 'var(--accent)' }}
        />
      </svg>

      <p className="pointer-events-none absolute top-[42%] left-0 -rotate-12 font-accent text-2xl leading-tight text-clean/80 sm:top-[38%] sm:left-[4%] sm:text-4xl">
        Small Stitches
        <br />
        &nbsp;&nbsp;&nbsp;Bigger Stories ♡
      </p>

      <motion.div
        aria-hidden={dragged}
        animate={{ opacity: dragged ? 0 : 1 }}
        style={{ x: hintX, y: homeY }}
        className="pointer-events-none absolute top-16 left-0 hidden items-center gap-2 text-xs text-clean/75 sm:flex"
      >
        <Hand strokeWidth={1.3} className="size-6" />
        <span>
          Drag the yarn
          <br />
          to explore
        </span>
      </motion.div>

      <motion.div style={{ x: homeX, y: homeY }} className="absolute top-0 left-0">
        <motion.div
          drag
          dragConstraints={sceneRef}
          dragElastic={0.15}
          dragSnapToOrigin
          dragTransition={{ bounceStiffness: 180, bounceDamping: 14 }}
          onDragStart={() => setDragged(true)}
          whileHover={{ scale: 1.04 }}
          whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
          style={{ x, y, rotate, width: BALL, height: BALL }}
          className="cursor-grab touch-none"
          role="img"
          aria-label="A ball of yarn you can drag around"
        >
          <YarnBall />
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ---------- Newsletter ---------- */

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [isPending, startTransition] = useTransition()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const parsed = newsletterSchema.safeParse({ email })
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Please enter a valid email address')
      return
    }
    setError(null)
    startTransition(async () => {
      const result = await subscribeToNewsletter(parsed.data)
      if (result.ok) {
        setDone(true)
        setEmail('')
      } else {
        setError(result.error)
      }
    })
  }

  if (done) {
    return (
      <p role="status" className="mt-8 flex max-w-sm items-center gap-3 text-sm text-clean/85">
        <span className="grid size-9 place-items-center rounded-full bg-clean/15">
          <Check className="size-4" />
        </span>
        You’re on the list. Welcome to the loop! ♡
      </p>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="mt-8 max-w-sm">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex items-center rounded-full border border-clean/40 py-1.5 pr-1.5 pl-5 transition-colors focus-within:border-clean/80">
        <Input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError(null)
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'newsletter-error' : undefined}
          className="h-9 flex-1 border-0 bg-transparent px-0 text-sm text-clean shadow-none placeholder:text-clean/55 focus-visible:ring-0 aria-invalid:ring-0"
        />
        <button
          type="submit"
          disabled={isPending}
          aria-label="Subscribe"
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-clean text-foreground transition-transform hover:translate-x-0.5 disabled:cursor-wait disabled:opacity-60"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
      {error && (
        <p id="newsletter-error" role="alert" className="mt-2 pl-5 text-xs text-primary">
          {error}
        </p>
      )}
    </form>
  )
}

/* ---------- Footer ---------- */

const Badge = () => (
  <svg viewBox="0 0 100 100" className="size-24 text-clean/80" aria-hidden>
    <defs>
      <path id="badge-circle" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" />
    </defs>
    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.6" />
    <text fill="currentColor" fontSize="8.5" letterSpacing="3">
      <textPath href="#badge-circle">HANDMADE • BRIGHTER DAYS •</textPath>
    </text>
    <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
      <circle cx="50" cy="44" r="3" />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="50" cy="37.5" rx="3" ry="4.5" transform={`rotate(${a} 50 44)`} />
      ))}
      <path d="M50 47v15M50 56c-3-1-5-3-5.5-5.5M50 58c3-1 5-3 5.5-5.5" />
    </g>
  </svg>
)

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="relative isolate w-full overflow-hidden bg-foreground text-clean">
      {/* Warm window glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_10%,color-mix(in_oklab,var(--accent)_35%,transparent),transparent_55%),radial-gradient(ellipse_at_0%_100%,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-8 lg:px-16 lg:pt-20">
        <div className="grid gap-14 xl:grid-cols-[1.1fr_1.6fr] xl:gap-10">
          {/* Newsletter */}
          <div>
            <Badge />
            <h2 className="mt-6 font-display text-4xl leading-[1.1] sm:text-5xl">
              Let’s Keep
              <br />
              Creating a Kinder
              <br />
              Tomorrow.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 tracking-wide text-clean/75">
              Join our community for new creations, stories, workshops and a little more joy in your inbox.
            </p>
            <Newsletter />
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-[repeat(3,1fr)_1.3fr] md:gap-8">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="font-display text-xl">{col.title}</h3>
                <ul className="mt-5 space-y-3 text-sm text-clean/70">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="transition-colors hover:text-clean">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="col-span-2 sm:col-span-3 md:col-span-1 md:border-l md:border-clean/20 md:pl-8">
              <h3 className="font-display text-xl">Let’s Connect</h3>
              <p className="mt-5 text-sm text-clean/70">Follow along for daily inspiration.</p>
              <ul className="mt-5 flex gap-3">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid size-10 place-items-center rounded-full border border-clean/35 transition-colors hover:bg-clean hover:text-foreground"
                    >
                      {s.animated ? (
                        <s.animated strokeWidth={1.4} className="size-4.5" />
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-4.5"
                          aria-hidden
                        >
                          {s.icon}
                        </svg>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
              <a href={`mailto:${SITE.email}`} className="mt-6 block text-sm text-clean/70 hover:text-clean">
                {SITE.email}
              </a>
            </div>
          </div>
        </div>

        <YarnToy />

        <p className="flex items-center justify-center gap-3 text-center text-[11px] tracking-[0.4em] text-clean/70 uppercase sm:text-xs">
          People • Planet • Craft • Always <span className="tracking-normal">♡</span>
        </p>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-clean/15 py-8 sm:flex-row sm:items-end sm:justify-between">
          <Link href="/" className="group">
            <span className="font-display text-4xl sm:text-5xl">
              {SITE.name}
              <sup className="ml-0.5 text-xs">™</sup>
            </span>
            <span className="mt-1 block text-[10px] tracking-[0.3em] text-clean/60 uppercase">{SITE.tagline}</span>
          </Link>
          <div className="flex flex-col gap-3 text-xs text-clean/60 sm:items-end">
            <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/privacy-policy" className="transition-colors hover:text-clean">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-clean">
                Terms &amp; Conditions
              </Link>
              <Link href="/shipping-returns" className="transition-colors hover:text-clean">
                Shipping &amp; Returns
              </Link>
            </nav>
            <p>
              © {year} {SITE.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
