'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLenis } from 'lenis/react'
import { ArrowRight, AtSign, Gift, Mail, MessageCircle, Phone, Sparkles, Users } from '@/components/icons/lucide'
import { FieldSeparator } from '@/components/ui/field'
import ContactForm, { type ContactFormHandle } from '@/components/Contact/ContactForm'
import { productImage } from '@/app/products/data'
import { ENQUIRY_TYPES, type EnquiryType } from '@/lib/contact-schema'
import { SITE } from '@/lib/site'

// Shortcuts on the left pre-fill the form
const SHORTCUTS: { label: string; icon: typeof Gift; type: EnquiryType; topic: string }[] = [
  { label: 'Custom\nOrders', icon: Sparkles, type: 'custom-order', topic: 'custom-colours' },
  { label: 'Gifting\n& Bulk Orders', icon: Gift, type: 'enquiry', topic: 'gifting-bulk' },
  { label: 'Collaborations\n& Workshops', icon: Users, type: 'collaboration', topic: 'workshop' },
  { label: 'Just\nSay Hello', icon: MessageCircle, type: 'enquiry', topic: 'hello' },
]

const Contact = () => {
  const formRef = useRef<HTMLDivElement>(null)
  const formHandle = useRef<ContactFormHandle>(null)
  const lenis = useLenis()

  const startMessage = (type?: EnquiryType, topic?: string) => {
    if (type) formHandle.current?.prefill(type, topic)
    const el = formRef.current
    if (el && lenis) lenis.scrollTo(el, { offset: -96 })
    else el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // Wait for the scroll to start before moving focus
    window.setTimeout(() => formHandle.current?.focus(), 350)
  }

  // Links like /#contact-custom-order (e.g. from the footer) open the matching tab
  useEffect(() => {
    const applyHash = () => {
      const match = ENQUIRY_TYPES.find((t) => window.location.hash === `#contact-${t.value}`)
      if (match) formHandle.current?.prefill(match.value)
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  return (
    <section id="contact" className="relative isolate w-full scroll-mt-10 overflow-hidden text-foreground">
      {/* Anchors so /#contact-<type> links land on this section */}
      {ENQUIRY_TYPES.map((t) => (
        <span key={t.value} id={`contact-${t.value}`} className="absolute top-0" aria-hidden />
      ))}

      <Image
        src={productImage('lily-flowers4')}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[40%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/80 to-background/30" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-8 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-16 lg:px-16 lg:py-24">
        {/* Copy */}
        <div className="relative">
          <p className="flex items-center gap-4 text-xs tracking-[0.35em] text-foreground/70 uppercase">
            Get in Touch <span className="h-px w-10 bg-foreground/40" />
          </p>
          <h2 className="mt-6 font-display text-4xl leading-[1.1] sm:text-5xl">
            Let’s Create
            <br />
            Something Meaningful
            <br />
            Together.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 tracking-wide text-foreground/80">
            Whether it’s a custom order, a bulk enquiry, a collaboration or just a hello, we’d love to hear from you.
          </p>

          <ul className="mt-10 grid max-w-xl grid-cols-2 gap-y-6 sm:grid-cols-4">
            {SHORTCUTS.map(({ label, icon: Icon, type: t, topic }, i) => (
              <li key={label} className={i > 0 ? 'sm:border-l sm:border-foreground/20' : ''}>
                <button
                  type="button"
                  onClick={() => startMessage(t, topic)}
                  className="group flex w-full cursor-pointer flex-col items-center gap-3 text-center text-[10px] leading-snug tracking-[0.2em] whitespace-pre-line text-foreground/75 uppercase transition-colors hover:text-foreground"
                >
                  <Icon strokeWidth={1.2} className="size-8 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => startMessage()}
            className="group mt-10 inline-flex cursor-pointer items-center gap-4 rounded-full border border-foreground/70 px-8 py-3.5 text-sm tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-foreground hover:text-clean"
          >
            Send us a message
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Stacked books + tag, like the reference */}
          <div className="pointer-events-none mt-14 hidden items-end gap-6 md:flex" aria-hidden>
            <div className="flex flex-col">
              {['People', 'Planet', 'Craft', 'Always'].map((word, i) => (
                <span
                  key={word}
                  style={{ marginLeft: `${[6, 0, 10, 2][i]}px` }}
                  className="w-48 rounded-sm border border-foreground/10 bg-highlight py-1.5 text-center text-[11px] tracking-[0.3em] uppercase shadow-[0_6px_12px_-8px_rgba(95,75,62,0.6)]"
                >
                  {word}
                </span>
              ))}
            </div>
            <div className="rotate-6">
              <div className="mx-auto h-6 w-px bg-foreground/40" />
              <div className="relative flex w-28 flex-col items-center rounded-md bg-highlight px-3 pt-6 pb-4 text-center font-display text-sm leading-snug shadow-[0_12px_30px_-12px_rgba(95,75,62,0.5)] [clip-path:polygon(18%_0,82%_0,100%_12%,100%_100%,0_100%,0_12%)]">
                <span className="absolute top-2 size-2 rounded-full border border-foreground/40" />
                Handmade Conversations Always Welcome
                <span className="mt-1.5">♡</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div
          ref={formRef}
          className="relative scroll-mt-24 rounded-3xl border border-foreground/10 bg-highlight/85 p-6 shadow-[0_30px_60px_-30px_rgba(95,75,62,0.5)] backdrop-blur-md sm:p-8"
        >
          <p className="pointer-events-none absolute -top-16 -right-6 hidden rotate-12 font-accent text-3xl leading-tight text-foreground/70 xl:block">
            Different People
            <br />
            &nbsp;&nbsp;Same Love ♡
          </p>

          <ContactForm ref={formHandle} />

          <FieldSeparator className="my-6 *:data-[slot=field-separator-content]:bg-transparent *:data-[slot=field-separator-content]:text-[10px] *:data-[slot=field-separator-content]:tracking-[0.25em] *:data-[slot=field-separator-content]:uppercase">
            Or reach us directly
          </FieldSeparator>

          <ul className="flex flex-wrap justify-between gap-x-4 gap-y-3 text-xs text-foreground/80">
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-foreground">
                <Mail strokeWidth={1.4} className="size-4" />
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-foreground">
                <Phone strokeWidth={1.4} className="size-4" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={SITE.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-foreground"
              >
                <AtSign strokeWidth={1.4} className="size-4" />
                {SITE.instagramHandle.replace('@', '')}
              </a>
            </li>
          </ul>
          <p className="mt-5 text-center text-[10px] tracking-[0.25em] text-foreground/60 uppercase">{SITE.replyTime}</p>
        </div>
      </div>

      <p className="pointer-events-none absolute right-6 bottom-8 hidden -rotate-12 text-right font-accent text-3xl leading-tight text-foreground/70 2xl:block">
        More than
        <br />
        Just Crochet ♡
      </p>
    </section>
  )
}

export default Contact
