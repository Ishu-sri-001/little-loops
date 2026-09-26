'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { Play, X } from '@/components/icons/lucide'
import { productImage } from '@/app/products/data'

const AboutHero = () => {
  const [videoOpen, setVideoOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    if (!videoOpen) return
    lenis?.stop()
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setVideoOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [videoOpen, lenis])

  return (
    <section className="relative isolate grid w-full overflow-hidden bg-foreground text-clean lg:min-h-[78vh] lg:grid-cols-[0.9fr_1.1fr]">
      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col justify-center px-4 py-20 sm:px-8 lg:py-24 lg:pr-12 lg:pl-16 xl:pl-[max(4rem,calc((100vw-80rem)/2+4rem))]"
      >
        <p className="flex items-center gap-4 text-xs tracking-[0.35em] text-clean/70 uppercase">
          About Us <span className="h-px w-10 bg-clean/40" />
        </p>
        <h1 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl">
          More Than
          <br />
          Just Crochet.
        </h1>
        <p className="mt-6 max-w-sm text-base leading-7 tracking-wide text-clean/80">
          We’re a story of people, purpose and pieces that bring a little more warmth to the world.
        </p>

        <button
          type="button"
          onClick={() => setVideoOpen(true)}
          className="group mt-10 inline-flex w-fit cursor-pointer items-center gap-4 text-xs tracking-[0.3em] text-clean/85 uppercase"
        >
          <span className="grid size-12 place-items-center rounded-full border border-clean/50 transition-colors group-hover:bg-clean group-hover:text-foreground">
            <Play strokeWidth={1.4} filled className="ml-0.5 size-4" />
          </span>
          Our story in a minute
          <span className="h-px w-10 bg-clean/40 transition-all group-hover:w-16" />
        </button>
      </motion.div>

      {/* Image */}
      <div className="relative min-h-96 lg:min-h-0">
        <Image
          src={productImage('daisy-wall-hanging6')}
          alt="A crochet daisy wall hanging in a sunlit arched room"
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-foreground via-foreground/10 to-transparent lg:via-transparent" />

        <p className="pointer-events-none absolute top-[12%] left-[8%] -rotate-12 font-accent text-3xl leading-tight text-foreground/80 sm:text-4xl">
          Different
          <br />
          &nbsp;People
          <br />
          &nbsp;&nbsp;Same Love ♡
        </p>

        <motion.div
          initial={{ opacity: 0, rotate: 20 }}
          animate={{ opacity: 1, rotate: 8 }}
          transition={{ type: 'spring', stiffness: 70, damping: 8, delay: 0.6 }}
          className="absolute right-[10%] bottom-[10%] w-32 origin-top text-foreground"
        >
          <div className="mx-auto h-8 w-px bg-foreground/40" />
          <div className="relative flex flex-col items-center rounded-md bg-highlight px-3 pt-7 pb-5 text-center font-display text-lg leading-snug shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)] [clip-path:polygon(18%_0,82%_0,100%_12%,100%_100%,0_100%,0_12%)]">
            <span className="absolute top-2.5 size-2 rounded-full border border-foreground/40" />
            Small
            <br />
            Stitches
            <br />
            Bigger
            <br />
            Stories
            <span className="mt-1.5 text-base">♡</span>
          </div>
        </motion.div>
      </div>

      {/* Video modal */}
      {videoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Our story in a minute"
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4 sm:p-10"
          onClick={() => setVideoOpen(false)}
        >
          <video
            src="/assets/hero.mp4"
            className="max-h-full w-full max-w-5xl rounded-xl"
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
          <button
            ref={closeRef}
            type="button"
            onClick={() => setVideoOpen(false)}
            aria-label="Close video"
            className="absolute top-5 right-5 grid size-11 cursor-pointer place-items-center rounded-full bg-clean text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>
      )}
    </section>
  )
}

export default AboutHero
