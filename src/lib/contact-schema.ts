import { z } from 'zod'

// Shared by the contact form (client validation) and the server action (server validation)

export const ENQUIRY_TYPES = [
  { value: 'enquiry', label: 'Enquiry' },
  { value: 'custom-order', label: 'Custom Order' },
  { value: 'collaboration', label: 'Collaboration' },
] as const

export type EnquiryType = (typeof ENQUIRY_TYPES)[number]['value']

export const TOPICS: Record<EnquiryType, { value: string; label: string }[]> = {
  enquiry: [
    { value: 'product-question', label: 'A question about a product' },
    { value: 'order-status', label: 'My order' },
    { value: 'gifting-bulk', label: 'Gifting & bulk orders' },
    { value: 'hello', label: 'Just saying hello' },
  ],
  'custom-order': [
    { value: 'custom-colours', label: 'A product in custom colours' },
    { value: 'personalised-gift', label: 'A personalised gift' },
    { value: 'wedding-event', label: 'Wedding or event favours' },
    { value: 'something-new', label: 'Something completely new' },
  ],
  collaboration: [
    { value: 'workshop', label: 'Workshops & classes' },
    { value: 'brand', label: 'Brand collaboration' },
    { value: 'stockist', label: 'Stocking our pieces' },
    { value: 'press', label: 'Press & features' },
  ],
}

export const contactSchema = z
  .object({
    type: z.enum(['enquiry', 'custom-order', 'collaboration']),
    name: z.string().trim().min(2, 'Please tell us your name').max(80, 'That name is a little long'),
    email: z.email('Please enter a valid email address'),
    topic: z.string().min(1, 'Please choose what you’re reaching out about'),
    neededBy: z.string().optional(),
    organisation: z.string().trim().max(120).optional(),
    message: z
      .string()
      .trim()
      .min(10, 'A few more words, please (at least 10 characters)')
      .max(2000, 'Please keep it under 2000 characters'),
    // Honeypot: real people never see or fill this: the server action silently drops filled ones
    website: z.string().optional(),
  })
  .refine((data) => TOPICS[data.type].some((t) => t.value === data.topic), {
    path: ['topic'],
    message: 'Please choose what you’re reaching out about',
  })

export type ContactValues = z.infer<typeof contactSchema>

export const newsletterSchema = z.object({
  email: z.email('Please enter a valid email address'),
})
