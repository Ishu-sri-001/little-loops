'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { HandHeart, Heart, Leaf } from '@/components/icons/lucide'
import { SITE } from '@/lib/site'

const HANDS_IMAGE =
  'https://images.unsplash.com/photo-1632649027900-389e810204e6?auto=format&fit=crop&w=1000&q=75'

const PILLARS = [
  { label: 'Crafted\nWith Purpose', icon: Heart },
  { label: 'Sustainable\nMaterials', icon: Leaf },
  { label: 'Supporting\nArtisans', icon: HandHeart },
]

const WhoWeAre = () => {
  return (
    <section className="w-full overflow-hidden bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-16 lg:py-24">
        {/* Arched image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -top-4 -left-4 h-full w-full rounded-t-full border border-foreground/20" aria-hidden />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-neutral shadow-[0_30px_60px_-30px_rgba(95,75,62,0.6)]">
            <Image
              src={HANDS_IMAGE}
              alt="Hands crocheting with a pastel yarn"
              fill
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-cover"
            />
          </div>
          <p className="pointer-events-none absolute top-6 -left-2 -rotate-12 font-accent text-3xl leading-tight text-foreground/75 sm:-left-16">
            People
            <br />
            &nbsp;Planet
            <br />
            &nbsp;&nbsp;Craft
            <br />
            &nbsp;&nbsp;&nbsp;Always ♡
          </p>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="flex items-center gap-4 text-xs tracking-[0.35em] text-foreground/70 uppercase">
            Who We Are <span className="h-px w-10 bg-foreground/40" />
          </p>
          <h2 className="mt-6 font-display text-4xl leading-[1.1] sm:text-5xl">
            A Small Team
            <br />
            with a Big Heart.
          </h2>
          <div className="mt-6 max-w-lg space-y-4 text-base leading-7 tracking-wide text-foreground/80">
            <p>
              {SITE.name} was born from a simple belief: that handmade things carry a special kind of magic. What
              started as a love for crochet at a kitchen table soon grew into a purpose-driven brand, creating
              thoughtful, sustainable pieces for modern, mindful living.
            </p>
            <p>
              Today we’re a close-knit circle of makers who turn soft cotton into bags, blooms and keepsakes, each
              one made slowly, by hand, to be loved for years.
            </p>
          </div>

          <ul className="mt-10 flex max-w-md">
            {PILLARS.map(({ label, icon: Icon }, i) => (
              <li
                key={label}
                data-icon-trigger
                className={`flex flex-1 flex-col items-center gap-3 text-center text-[10px] leading-snug tracking-[0.2em] whitespace-pre-line text-foreground/75 uppercase ${
                  i > 0 ? 'border-l border-foreground/20' : ''
                }`}
              >
                <Icon strokeWidth={1.2} className="size-8" />
                {label}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

export default WhoWeAre
