'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const Hero = () => {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap
        .timeline({ delay: 1.0 })
        .to('.hero-curtain-left', { xPercent: -100, duration: 1.4, ease: 'power3.inOut' }, 0)
        .to('.hero-curtain-right', { xPercent: 100, duration: 1.4, ease: 'power3.inOut' }, 0)
        .set('.hero-curtain', { display: 'none' })
    },
    { scope: container }
  )

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/assets/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="text-5xl font-sans font-semibold tracking-tight md:text-7xl">
          Little Loops
        </h1>

      </div>

      <div
        aria-hidden
        className="hero-curtain hero-curtain-left pointer-events-none absolute inset-y-0 left-0 z-20 w-[calc(50%+1px)] bg-highlight"
      />
      <div
        aria-hidden
        className="hero-curtain hero-curtain-right pointer-events-none absolute inset-y-0 right-0 z-20 w-[calc(50%+1px)] bg-highlight"
      />
    </section>
  )
}

export default Hero
