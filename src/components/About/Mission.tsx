'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check } from '@/components/icons/lucide'

const HEART_IMAGE =
  'https://images.unsplash.com/photo-1739251203750-a655f60a9eed?auto=format&fit=crop&w=1400&q=75'

// Grounded in what the shop actually promises elsewhere (packaging, returns, small batches)
const COMMITMENTS = [
  'Fair, on-time pay for every maker in our circle',
  'Plastic-free packaging, packed by hand',
  'Small batches and made-to-order to avoid waste',
  'We fix any fault in our making, always',
]

const Mission = () => {
  const [open, setOpen] = useState(false)

  return (
    <section className="relative isolate w-full overflow-hidden bg-neutral/60 text-foreground">
      <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[58%]">
        <Image
          src={HEART_IMAGE}
          alt="A hand holding a crocheted heart against the sky"
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-neutral via-neutral/70 to-transparent lg:via-neutral/10" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-8 lg:grid-cols-[1.3fr_0.7fr_auto] lg:px-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="flex items-center gap-4 text-xs tracking-[0.35em] text-foreground/70 uppercase">
            Our Mission <span className="h-px w-10 bg-foreground/40" />
          </p>
          <h2 className="mt-6 font-display text-4xl leading-[1.1] sm:text-5xl lg:text-[2.75rem] xl:text-5xl">
            To Make the World
            <br />a Kinder, Cozier Place.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 tracking-wide text-foreground/80">
            We create timeless, handcrafted pieces that bring warmth, joy and a sense of belonging, while supporting
            people and the planet.
          </p>

          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                id="our-commitment"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-md space-y-3 overflow-hidden"
              >
                {COMMITMENTS.map((c, i) => (
                  <li key={c} className={`flex gap-3 text-sm leading-6 text-foreground/80 ${i === 0 ? 'pt-6' : ''}`}>
                    <Check strokeWidth={1.6} className="mt-1 size-4 shrink-0 text-secondary" />
                    {c}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="our-commitment"
            className="group mt-8 inline-flex cursor-pointer items-center gap-4 rounded-full border border-foreground/70 bg-background/40 px-8 py-3.5 text-xs tracking-[0.25em] uppercase backdrop-blur-sm transition-colors duration-300 hover:bg-foreground hover:text-clean"
          >
            {open ? 'Show Less' : 'Our Commitment'}
            <ArrowRight
              className={`size-4 transition-transform duration-300 ${open ? '-rotate-90' : 'group-hover:translate-x-1'}`}
            />
          </button>
        </motion.div>

        <p className="pointer-events-none hidden -rotate-12 self-start justify-self-center font-accent text-4xl leading-tight text-foreground/80 lg:block">
          A Kinder
          <br />
          &nbsp;&nbsp;Tomorrow ♡
        </p>

        <div className="hidden flex-col items-center gap-2 text-[11px] tracking-[0.35em] text-foreground/80 uppercase lg:flex">
          <span>Slower</span>
          <span>Days</span>
          <span>Brighter</span>
          <span>Tomorrows</span>
          <span className="mt-6 h-px w-8 bg-foreground/50" />
        </div>
      </div>
    </section>
  )
}

export default Mission
