'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { productImage } from '@/app/products/data'
import { Heart, Leaf, Users } from '@/components/icons/lucide'

const ARCH_IMAGE =
  'https://images.unsplash.com/photo-1621109246687-10ae613f2d8e?auto=format&fit=crop&w=1400&q=75'

const VALUES = [
  { label: 'A Small\nTeam', icon: Users },
  { label: 'Sustainable\nMaterials', icon: Leaf },
  { label: 'Crafted\nWith Purpose', icon: Heart },
]

// Polaroids pegged along the string, positioned in % of the scene box
const CARDS = [
  { title: 'People\nFirst', image: 'bow-band3', left: '6%', top: '13%', rotate: -6 },
  { title: 'Kinder\nChoices', image: 'daisy-wall-hanging2', left: '35%', top: '4%', rotate: 3 },
  { title: 'Brighter\nTomorrows', image: 'sunflower-keychain1', left: '64%', top: '10%', rotate: 8 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}

const About = () => {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-20 pb-10 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-6 lg:px-16 lg:pt-24">
        {/* Copy */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.12 }}
          className="relative z-10"
        >
          <motion.p
            variants={fadeUp}
            className="flex items-center gap-4 text-xs tracking-[0.35em] text-foreground/70 uppercase"
          >
            About Us <span className="h-px w-10 bg-foreground/40" />
          </motion.p>

          <motion.h2 variants={fadeUp} className="mt-6 font-display text-4xl leading-[1.1] sm:text-5xl lg:text-[3.5rem]">
            Small Stitches.
            <br />A Kinder Tomorrow.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 max-w-md text-base leading-7 tracking-wide text-foreground/80">
            We’re a small team with a big heart, creating handcrafted pieces that bring warmth, joy and a sense of
            belonging, for people and the planet.
          </motion.p>


          <motion.div variants={fadeUp}>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-4 rounded-full border border-foreground/70 px-8 py-3.5 text-sm tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-foreground hover:text-clean"
            >
              Our Story
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-12 flex max-w-md">
            {VALUES.map(({ label, icon: Icon }, i) => (
              <li
                key={label}
                data-icon-trigger
                className={`flex flex-1 flex-col items-center gap-3 text-center text-[11px] leading-snug tracking-[0.2em] whitespace-pre-line text-foreground/75 uppercase ${
                  i > 0 ? 'border-l border-foreground/20' : ''
                }`}
              >
                <Icon strokeWidth={1.2} className="size-8" />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Scene */}
        <div className="relative mx-auto aspect-square w-full max-w-160">
          {/* Multiply blends the render's white walls into the page colour */}
          <Image
            src={ARCH_IMAGE}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/5 bg-linear-to-t from-background to-transparent" />

          {/* String the cards hang from */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
            <path
              d="M-2 17 C 8 13, 14 12, 19.5 13 S 40 3, 48.5 4 S 70 12, 77.5 10 S 95 13, 102 18"
              fill="none"
              stroke="var(--accent)"
              strokeOpacity={0.6}
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {CARDS.map((card, i) => (
            <motion.figure
              key={card.title}
              initial={{ opacity: 0, y: -30, rotate: card.rotate - 12 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: card.rotate,
                transition: { type: 'spring', stiffness: 90, damping: 12, delay: 0.2 + i * 0.15 },
              }}
              whileHover={{ y: -6, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              style={{ left: card.left, top: card.top }}
              className="absolute w-[27%] origin-top rounded-md bg-clean p-2.5 pb-3 shadow-[0_18px_35px_-18px_rgba(95,75,62,0.55)]"
            >
              <span className="absolute -top-2 left-1/2 h-4 w-1.5 -translate-x-1/2 rounded-sm bg-primary" aria-hidden />
              <figcaption className="px-1 pt-1 pb-2.5 text-[9px] leading-snug tracking-[0.25em] whitespace-pre-line uppercase sm:text-[11px]">
                {card.title}
              </figcaption>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral">
                <Image src={productImage(card.image)} alt="" fill sizes="180px" className="object-cover" />
              </div>
            </motion.figure>
          ))}

          {/* Product on the podium */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[23%] left-[29%] aspect-square w-[42%]"
          >
            <Image
              src={productImage('potli-bag-transparent')}
              alt="Hand-crocheted Blossom Potli bag"
              fill
              sizes="(min-width: 1024px) 22vw, 42vw"
              className="object-contain drop-shadow-[0_22px_18px_rgba(95,75,62,0.35)]"
            />
          </motion.div>

          {/* Hang tag */}
          <motion.div
            initial={{ opacity: 0, rotate: 20 }}
            whileInView={{ opacity: 1, rotate: 8 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 70, damping: 8, delay: 0.8 }}
            className="absolute right-[10%] bottom-[22%] w-[19%] origin-top"
          >
            <div className="mx-auto h-6 w-px bg-foreground/40" />
            <div className="relative flex flex-col items-center rounded-md bg-highlight px-2 pt-6 pb-4 text-center font-display text-xs leading-snug shadow-[0_12px_30px_-12px_rgba(95,75,62,0.5)] [clip-path:polygon(18%_0,82%_0,100%_12%,100%_100%,0_100%,0_12%)] sm:text-base">
              <span className="absolute top-2 size-2 rounded-full border border-foreground/40" />
              Good
              <br />
              Things
              <br />
              Are
              <br />
              Handmade
              <span className="mt-1.5">♡</span>
            </div>
          </motion.div>

          {/* Script note */}
          <p className="pointer-events-none absolute top-[50%] left-[2%] -rotate-12 font-accent text-xl leading-tight text-foreground/75 sm:text-3xl">
            Different
            <br />
            &nbsp;People
            <br />
            &nbsp;&nbsp;Same Love
            <br />♡
          </p>
        </div>
      </div>

      {/* Footer line */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 pb-16 text-[11px] tracking-[0.35em] text-foreground/70 uppercase sm:px-8 md:flex-row lg:px-16">
        <p className="shrink-0">People &nbsp;•&nbsp; Planet &nbsp;•&nbsp; Craft &nbsp;•&nbsp; Always</p>
        <span className="hidden h-px flex-1 bg-foreground/20 md:block" />
        <p className="shrink-0">More Than Just Crochet</p>
        <span className="hidden h-px w-16 bg-foreground/20 md:block" />
      </div>
    </section>
  )
}

export default About
