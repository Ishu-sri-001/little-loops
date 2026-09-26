// Brand contact details and social links used by the contact section and footer.
// Placeholder values: replace with the real ones before launch.

export const SITE = {
  name: 'Little Loops',
  tagline: 'Handmade for a brighter tomorrow',
  email: 'hello@littleloops.in',
  phone: '+91 98765 43210',
  instagramHandle: '@littleloops',
  replyTime: 'We usually reply within 1–2 business days',
  phoneHours: 'Mon – Sat, 10:00 AM – 6:00 PM (IST)',
  address: {
    name: 'Little Loops Studio',
    lines: ['123 Greenwood Lane, Koramangala', 'Bengaluru, Karnataka 560034, India'],
    // Used for the map embed and the "Get directions" link
    mapQuery: 'Koramangala, Bengaluru, Karnataka 560034',
  },
  // Studio opening hours in IST: day 0 is Sunday. null = closed
  hours: [
    { label: 'Monday – Friday', days: [1, 2, 3, 4, 5], open: '10:00', close: '18:00' },
    { label: 'Saturday', days: [6], open: '11:00', close: '17:00' },
    { label: 'Sunday', days: [0], open: null, close: null },
  ],
  // Shown on the legal pages: replace the bracketed placeholders before launch
  legal: {
    businessName: '[Registered business name]',
    gstin: '[GSTIN]',
    grievanceOfficer: { name: '[Grievance officer name]', email: 'grievance@littleloops.in' },
    lastUpdated: 'September 2026',
    jurisdiction: 'Bengaluru, Karnataka, India',
  },
  socials: {
    instagram: 'https://www.instagram.com/littleloops',
    pinterest: 'https://www.pinterest.com/littleloops',
    youtube: 'https://www.youtube.com/@littleloops',
    tiktok: 'https://www.tiktok.com/@littleloops',
  },
} as const
