'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Plus } from '@/components/icons/lucide'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// Answers mirror the product pages: free shipping over ₹999, 14-day returns, 7–10 days for made-to-order
const FAQS = [
  {
    q: 'Do you offer international shipping?',
    a: 'Yes! We ship to most countries. International orders usually arrive in 7–14 business days, and shipping is calculated at checkout. Customs duties, if any, are paid on delivery.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Ready-to-ship pieces are dispatched within 1–2 business days and arrive in 3–7 days across India. Made-to-order pieces need 7–10 days to be crocheted before dispatch. Shipping is free on orders above ₹999.',
  },
  {
    q: 'Can I place a custom or bulk order?',
    a: 'Absolutely! We love custom colours, personalised gifts and wedding or corporate favours. Choose “Custom Order” in the form above with your idea, quantity and date, and we’ll reply with options and a quote.',
  },
  {
    q: 'Do you offer workshops or collaboration opportunities?',
    a: 'We run beginner-friendly crochet workshops at our Bengaluru studio and online, and we collaborate with brands, stores and creators. Pick “Collaboration” in the form and tell us a little about you.',
  },
  {
    q: 'What is your return policy?',
    a: 'Unused pieces with their tag attached can be returned within 14 days for a full refund. Personalised or custom-made orders can’t be returned, but we will always fix any fault in our making.',
  },
  {
    q: 'How do I care for my crochet pieces?',
    a: 'Most pieces love a gentle hand wash in cold water with mild detergent. Reshape while damp and dry flat, away from direct sun. Bouquets and décor only need a soft brush to dust. Each product page has its own care guide.',
  },
  {
    q: 'Can you gift-wrap my order and add a note?',
    a: 'Many pieces arrive gift-wrapped by default (look for “Gift Wrapped” on the product). For anything else, mention it in your order notes and we’ll wrap it and write your message by hand.',
  },
  {
    q: 'Why do some pieces look slightly different from the photos?',
    a: 'Everything is made by hand in small batches, so tiny differences in colour, size and stitch are part of what makes your piece one of a kind. We photograph real pieces in natural light to keep things honest.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'We accept UPI, all major credit and debit cards, net banking and popular wallets. Payments are processed securely and we never store your card details.',
  },
  {
    q: 'Are your soft toys safe for babies?',
    a: 'Yes, our toys use baby-safe milk cotton and hypoallergenic fibre fill, with embroidered eyes and no small parts. We still recommend supervised play for little ones under three.',
  },
]

const INITIAL = 6

const FaqColumn = ({ items }: { items: typeof FAQS }) => (
  <Accordion className="border-t border-foreground/15">
    {items.map((item) => (
      <AccordionItem key={item.q} value={item.q} className="border-b border-foreground/15 not-last:border-b">
        <AccordionTrigger className="items-center gap-6 rounded-none py-4 text-sm font-normal hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
          {item.q}
          <Plus
            strokeWidth={1.4}
            className="size-4 shrink-0 transition-transform duration-300 group-aria-expanded/accordion-trigger:rotate-45"
            aria-hidden
          />
        </AccordionTrigger>
        <AccordionContent className="pr-10 pb-5 text-sm leading-6 text-foreground/75">{item.a}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
)

const ContactFAQ = () => {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? FAQS : FAQS.slice(0, INITIAL)
  // Fill the left column first so the two stay balanced
  const half = Math.ceil(visible.length / 2)

  return (
    <section id="faq" className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-16 text-foreground sm:px-8 lg:px-16 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-2 text-sm text-foreground/70">Quick answers to the most common queries.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          aria-expanded={showAll}
          className="group inline-flex cursor-pointer items-center gap-3 text-sm"
        >
          {showAll ? 'Show fewer FAQs' : `View all ${FAQS.length} FAQs`}
          <ArrowRight
            className={`size-4 transition-transform ${showAll ? '-rotate-90' : 'group-hover:translate-x-1'}`}
          />
        </button>
      </div>

      <div className="mt-10 grid gap-x-14 lg:grid-cols-2">
        <FaqColumn items={visible.slice(0, half)} />
        <FaqColumn items={visible.slice(half)} />
      </div>

      <p className="mt-10 text-sm text-foreground/70">
        Still curious?{' '}
        <Link href="#message" className="text-foreground underline underline-offset-4 hover:text-accent">
          Send us a message
        </Link>{' '}
        and a real person will get back to you.
      </p>
    </section>
  )
}

export default ContactFAQ
