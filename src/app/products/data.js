// Single product catalogue for the whole site:
// homepage Stage section, /products listing and /products/[slug] detail pages.
// Images live in /public/assets/product-images.

/* ---------- Types (JSDoc so TS understands this JS file) ---------- */

/**
 * @typedef {'pink' | 'rose' | 'red' | 'cream' | 'sage' | 'yellow' | 'lilac' | 'blue' | 'peach' | 'brown'} ColorKey
 * @typedef {'top-picks' | 'best-sellers' | 'collections' | 'new-arrivals' | 'gifts'} StageTag
 * @typedef {{ name: string, key: ColorKey, image?: string }} ColorVariant
 * @typedef {{ label: string, values: { label: string, price: number }[] }} ProductOption
 * @typedef {{ author: string, rating: number, title: string, body: string }} RawReview
 * @typedef {{
 *   key: string,
 *   name: string,
 *   subtitle: string,
 *   category: string,
 *   price: number,
 *   badge?: 'Bestseller' | 'New' | 'Low Stock',
 *   tags: StageTag[],
 *   cover: string,
 *   images: string[],
 *   colors: ColorVariant[],
 *   options?: ProductOption,
 *   material: string,
 *   occasions: string[],
 *   features: string[],
 *   dimensions: string,
 *   weight: string,
 *   care: string,
 *   description: string,
 *   longDescription: string,
 *   pairsWith: string[],
 *   rating: number,
 *   reviewCount: number,
 *   reviews: RawReview[],
 * }} RawProduct
 */

/* ---------- Helpers ---------- */

/** Public path for a product image file name (without extension) */
export const productImage = (file) => `/assets/product-images/${file}.png`

const seq = (key, from, to) => Array.from({ length: to - from + 1 }, (_, i) => `${key}${from + i}`)

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/* ---------- Filter vocab ---------- */

export const CATEGORIES = [
  'Bags',
  'Hair Accessories',
  'Keychains',
  'Home Decor',
  'Table & Kitchen',
  'Flowers & Bouquets',
  'Wearables',
  'Toys',
]

export const OCCASIONS = ['Gifting', 'Everyday', 'Home Styling', 'Weddings & Festive', 'Kids']

export const MATERIALS = ['Milk Cotton', 'Cotton', 'Acrylic', 'Wool Blend']

export const FEATURES = ['Gift Wrapped', 'Ready to Ship', 'Made to Order', 'Customisable']

/** Swatch colours used for filtering and colour pickers (product colours, not theme colours) */
export const COLORS = {
  pink: { label: 'Pink', hex: '#e9a6b4' },
  rose: { label: 'Rose', hex: '#b5475b' },
  red: { label: 'Red', hex: '#b3262f' },
  cream: { label: 'Cream', hex: '#f1e6d3' },
  sage: { label: 'Sage', hex: '#8fa37a' },
  yellow: { label: 'Yellow', hex: '#e8b634' },
  lilac: { label: 'Lilac', hex: '#b39ad0' },
  blue: { label: 'Blue', hex: '#7f9fc9' },
  peach: { label: 'Peach', hex: '#efa487' },
  brown: { label: 'Brown', hex: '#7a4e33' },
}

export const PRICE_MIN = 0
export const PRICE_MAX = 5000

/* ---------- Catalogue ---------- */

/** @type {RawProduct[]} */
const RAW_PRODUCTS = [
  /* ----- Bags ----- */
  {
    key: 'daisy-handbag',
    name: 'Daisy Meadow Shoulder Bag',
    subtitle: 'Hand-crocheted Cotton Shoulder Bag',
    category: 'Bags',
    price: 2499,
    tags: ['top-picks'],
    cover: 'daisy-handbag1',
    images: seq('daisy-handbag', 1, 5),
    colors: [{ name: 'Cream Daisy', key: 'cream' }],
    material: 'Cotton',
    occasions: ['Everyday', 'Gifting'],
    features: ['Ready to Ship', 'Gift Wrapped'],
    dimensions: '32 × 22 × 10 cm, 24 cm handle drop',
    weight: '380 g',
    care: 'Spot clean or hand wash cold, reshape and dry flat',
    description:
      'A soft cream shoulder bag scattered with hand-stitched white daisies and leafy vines. Your everyday carry, made slow.',
    longDescription:
      'Worked stitch by stitch in sturdy cotton, the Daisy Meadow bag is fully lined with an inner pocket and closes with a carved wooden button. Roomy enough for a book, a water bottle and all the little things, it softens and shapes to you with every wear.',
    pairsWith: ['mobile-pouch', 'sunflower-keychain'],
    rating: 4.8,
    reviewCount: 126,
    reviews: [
      { author: 'Aditi S.', rating: 5, title: 'Prettier in person!', body: 'The daisies are so neatly stitched and the lining feels premium. I get compliments every time.' },
      { author: 'Meera K.', rating: 5, title: 'Fits everything', body: 'My diary, bottle and makeup pouch all fit. The wooden button is such a sweet touch.' },
      { author: 'Nisha R.', rating: 4.5, title: 'Beautiful everyday bag', body: 'Sturdy and holds its shape well. Took a few days extra to arrive but worth it.' },
    ],
  },
  {
    key: 'green-white-handbag',
    name: 'Sage Granny Square Bag',
    subtitle: 'Granny Square Hobo Bag',
    category: 'Bags',
    price: 2299,
    badge: 'New',
    tags: ['new-arrivals'],
    cover: 'green-white-handbag1',
    images: [...seq('green-white-handbag', 1, 5), 'green-white-handbag-transparent'],
    colors: [{ name: 'Sage & Cream', key: 'sage' }],
    material: 'Milk Cotton',
    occasions: ['Everyday', 'Gifting'],
    features: ['Ready to Ship'],
    dimensions: '30 × 20 × 9 cm, 22 cm handle drop',
    weight: '340 g',
    care: 'Hand wash cold with mild soap, dry flat in shade',
    description:
      'Classic granny squares in sage and cream, each centred with a little white bloom and finished with a pom-pom charm.',
    longDescription:
      'Twelve granny squares are joined by hand into a slouchy hobo shape, then lined in cotton twill with a zip pocket inside. The braided handle sits comfortably on the shoulder and the pom-pom charm can be unclipped when you want a cleaner look.',
    pairsWith: ['cherry-keychain', 'scrunchies'],
    rating: 4.7,
    reviewCount: 58,
    reviews: [
      { author: 'Sana R.', rating: 5, title: 'Vintage vibes', body: 'Feels like something my nani would have made. The sage colour is so calming.' },
      { author: 'Kavya M.', rating: 4.5, title: 'Lovely and light', body: 'Very light on the shoulder. The pom-pom is the cutest detail.' },
      { author: 'Ritika J.', rating: 4.5, title: 'Great gift', body: 'Gifted it to my sister and she uses it daily. Came beautifully packed.' },
    ],
  },
  {
    key: 'potli-bag',
    name: 'Blossom Potli Bag',
    subtitle: 'Drawstring Potli with Tulip Tassels',
    category: 'Bags',
    price: 999,
    badge: 'Bestseller',
    tags: ['best-sellers', 'gifts'],
    cover: 'potli-bag1',
    images: [...seq('potli-bag', 1, 5), 'potli-bag-transparent'],
    colors: [{ name: 'Blush Blossom', key: 'pink' }],
    material: 'Milk Cotton',
    occasions: ['Weddings & Festive', 'Gifting'],
    features: ['Gift Wrapped', 'Ready to Ship'],
    dimensions: '20 × 18 cm, 12 cm base diameter',
    weight: '160 g',
    care: 'Spot clean gently, air dry away from sunlight',
    description:
      'A cream drawstring potli blooming with pink flowers, finished with rose-pink cords and little crochet tulip-bud tassels.',
    longDescription:
      'Made for mehendis, pujas and every celebration in between, the Blossom Potli holds your phone, keys and a lipstick with room to spare. The drawstring cords are double-braided so they glide smoothly, and each tulip tassel is stuffed by hand.',
    pairsWith: ['bow-band', 'hairband'],
    rating: 4.9,
    reviewCount: 212,
    reviews: [
      { author: 'Ishita G.', rating: 5, title: 'Perfect for my sangeet', body: 'Matched my pastel lehenga perfectly. Everyone asked where I got it.' },
      { author: 'Neha D.', rating: 5, title: 'Return gift hit', body: 'Ordered eight for bridesmaids. All arrived wrapped and identical. Amazing work.' },
      { author: 'Pooja T.', rating: 4.5, title: 'So cute', body: 'The tulip tassels are adorable. Fits my phone easily.' },
    ],
  },
  {
    key: 'sling-bag',
    name: 'Rosy Days Sling Bag',
    subtitle: 'Floral Crossbody Sling',
    category: 'Bags',
    price: 1999,
    badge: 'New',
    tags: ['new-arrivals'],
    cover: 'sling-bag1',
    images: seq('sling-bag', 1, 5),
    colors: [{ name: 'Cream Rose', key: 'rose' }],
    material: 'Cotton',
    occasions: ['Everyday'],
    features: ['Ready to Ship'],
    dimensions: '28 × 16 × 6 cm, adjustable 110–130 cm strap',
    weight: '290 g',
    care: 'Hand wash cold, dry flat, do not wring',
    description:
      'A half-moon crossbody in cream with a band of pink and rose flowers along the flap, on a matching patterned strap.',
    longDescription:
      'The Rosy Days sling is worked in a dense stitch that keeps its shape, lined in cotton and fastened with a hidden magnetic snap. The long floral strap is adjustable, so it sits at the hip or across the body for markets, cafés and weekend walks.',
    pairsWith: ['hairband', 'cherry-keychain'],
    rating: 4.6,
    reviewCount: 41,
    reviews: [
      { author: 'Tanvi P.', rating: 5, title: 'My weekend bag now', body: 'Hands-free and so pretty. The strap pattern matches the flap beautifully.' },
      { author: 'Aisha K.', rating: 4.5, title: 'Well made', body: 'The magnetic snap is strong and the lining is neat. Slightly smaller than expected.' },
      { author: 'Divya L.', rating: 4.5, title: 'Summer essential', body: 'Looks gorgeous with white dresses. Very happy with it.' },
    ],
  },
  {
    key: 'tote-bag',
    name: 'Pink Posy Granny Tote',
    subtitle: 'Granny Square Tote Bag',
    category: 'Bags',
    price: 2699,
    badge: 'Bestseller',
    tags: ['top-picks', 'best-sellers'],
    cover: 'tote-bag3',
    images: [...seq('tote-bag', 3, 7), 'tote-bag1', 'tote-bag2'],
    colors: [{ name: 'Pink Posy', key: 'pink' }],
    material: 'Cotton',
    occasions: ['Everyday', 'Gifting'],
    features: ['Ready to Ship', 'Gift Wrapped'],
    dimensions: '36 × 28 × 12 cm, 26 cm handle drop',
    weight: '460 g',
    care: 'Hand wash cold, dry flat and reshape while damp',
    description:
      'A roomy cream tote built from granny squares, each with a pink posy framed in sage. Sturdy enough for everyday, pretty enough for weekends.',
    longDescription:
      'Eighteen squares are joined by hand and backed with a structured cotton lining so the tote stands on its own. Inside you’ll find a zip pocket and a slip pocket for your phone, and the thick rolled handles are comfortable even when it’s full.',
    pairsWith: ['tulip-keychain', 'scrunchies'],
    rating: 4.9,
    reviewCount: 164,
    reviews: [
      { author: 'Aditi S.', rating: 5, title: 'Worth every rupee', body: 'Structured, roomy and so beautiful. I carry my laptop sleeve in it.' },
      { author: 'Rohit P.', rating: 5, title: 'Gift for my wife', body: 'She absolutely loved it. Packaging was lovely too.' },
      { author: 'Meera K.', rating: 4.5, title: 'Colours are dreamy', body: 'The pinks are soft and the stitching is very even. Handles are comfy.' },
    ],
  },
  {
    key: 'mobile-pouch',
    name: 'Daisy Phone Sling',
    subtitle: 'Crossbody Phone Pouch',
    category: 'Bags',
    price: 899,
    tags: ['gifts'],
    cover: 'mobile-pouch1',
    images: seq('mobile-pouch', 1, 6),
    colors: [{ name: 'Sage Daisy', key: 'sage' }],
    material: 'Milk Cotton',
    occasions: ['Everyday', 'Gifting'],
    features: ['Ready to Ship'],
    dimensions: '19 × 11 cm, fits phones up to 6.7", 120 cm beaded strap',
    weight: '110 g',
    care: 'Spot clean, air dry',
    description:
      'A cream phone pouch with a sage flap, white daisies, a wooden button and tiny pom-poms, on a long beaded strap.',
    longDescription:
      'Just big enough for your phone, a card and a lip balm, the Daisy Phone Sling keeps your hands free on busy days. The flap is lined to protect your screen and the beaded strap is threaded on strong nylon cord.',
    pairsWith: ['toy-keychain', 'cherry-keychain'],
    rating: 4.7,
    reviewCount: 89,
    reviews: [
      { author: 'Kavya M.', rating: 5, title: 'Fits my big phone', body: 'My iPhone Pro Max fits perfectly. The beaded strap is gorgeous.' },
      { author: 'Sneha V.', rating: 4.5, title: 'Cute and handy', body: 'Perfect for evening walks. The pom-poms make me smile.' },
      { author: 'Aarohi N.', rating: 4.5, title: 'Lovely quality', body: 'Stitching is tight and the button is secure. Would buy again.' },
    ],
  },

  /* ----- Hair Accessories ----- */
  {
    key: 'bow-band',
    name: 'Blossom Bow Hair Tie',
    subtitle: 'Embroidered Bow on Scrunchie Band',
    category: 'Hair Accessories',
    price: 449,
    badge: 'Bestseller',
    tags: ['top-picks', 'best-sellers'],
    cover: 'bow-band1',
    images: seq('bow-band', 1, 6),
    colors: [{ name: 'Blush Pink', key: 'pink' }],
    material: 'Milk Cotton',
    occasions: ['Everyday', 'Gifting'],
    features: ['Ready to Ship', 'Gift Wrapped'],
    dimensions: 'Bow 14 × 10 cm on a soft elastic band',
    weight: '35 g',
    care: 'Hand wash cold, reshape bow and dry flat',
    description:
      'A cream crochet bow edged in pink and dotted with tiny embroidered flowers, on a gentle pink scrunchie band.',
    longDescription:
      'The Blossom Bow is lightly stiffened so it holds its shape all day, and the tiny florals are embroidered by hand after crocheting. The scrunchie base is snag-free and gentle, so it won’t crease or pull your hair.',
    pairsWith: ['hairband', 'scrunchies'],
    rating: 4.8,
    reviewCount: 243,
    reviews: [
      { author: 'Ananya B.', rating: 5, title: 'Coquette dream', body: 'Exactly the soft, girly bow I wanted. Holds my ponytail securely.' },
      { author: 'Riya S.', rating: 5, title: 'So well made', body: 'The embroidery is tiny and perfect. Doesn’t flop at all.' },
      { author: 'Mahi C.', rating: 4.5, title: 'Bought two!', body: 'One for me, one for my best friend. Arrived in a sweet little box.' },
    ],
  },
  {
    key: 'hair-tie',
    name: 'Petite Bow Scrunchie',
    subtitle: 'Floral Bow Scrunchie',
    category: 'Hair Accessories',
    price: 399,
    tags: ['gifts'],
    cover: 'hair-tie2',
    images: ['hair-tie2', 'hair-tie1', 'hair-tie3'],
    colors: [
      { name: 'Blush', key: 'pink', image: 'hair-tie2' },
      { name: 'Cream Floral', key: 'cream', image: 'hair-tie3' },
      { name: 'Sage', key: 'sage', image: 'hair-tie1' },
      { name: 'Lilac', key: 'lilac', image: 'hair-tie1' },
    ],
    material: 'Milk Cotton',
    occasions: ['Everyday', 'Gifting'],
    features: ['Ready to Ship'],
    dimensions: 'Bow 12 × 9 cm, stretches to fit all hair types',
    weight: '28 g',
    care: 'Hand wash cold, dry flat',
    description:
      'A soft scrunchie topped with a floppy crochet bow and tiny embroidered florals. Choose your shade or collect them all.',
    longDescription:
      'Lighter than our Blossom Bow, the Petite Bow Scrunchie is made to be worn every day. Long bow tails give it a relaxed, romantic look for half-up styles, braids and low buns.',
    pairsWith: ['bow-band', 'scrunchies'],
    rating: 4.7,
    reviewCount: 97,
    reviews: [
      { author: 'Zoya F.', rating: 5, title: 'Softest scrunchie', body: 'Doesn’t leave a crease at all. The lilac one is my favourite.' },
      { author: 'Priya D.', rating: 4.5, title: 'Pretty details', body: 'The little embroidered flowers are adorable. Great for braids.' },
      { author: 'Tara M.', rating: 4.5, title: 'Lovely gift', body: 'Sent the cream one to my cousin and she loved it.' },
    ],
  },
  {
    key: 'hairband',
    name: 'Rosebud Padded Hairband',
    subtitle: 'Padded Floral Headband',
    category: 'Hair Accessories',
    price: 599,
    badge: 'New',
    tags: ['new-arrivals'],
    cover: 'hairband1',
    images: [...seq('hairband', 1, 5), 'hairband-transparent'],
    colors: [{ name: 'Pink Rosebud', key: 'pink' }],
    material: 'Milk Cotton',
    occasions: ['Everyday', 'Weddings & Festive'],
    features: ['Ready to Ship', 'Gift Wrapped'],
    dimensions: '3.5 cm wide padded band, one size',
    weight: '60 g',
    care: 'Spot clean only',
    description:
      'A plush padded headband covered in hand-made pink and cream rosebuds with little green leaves.',
    longDescription:
      'Each rosebud is crocheted separately and sewn onto a cushioned, fabric-wrapped band that’s flexible and comfortable for hours. It’s a finishing touch for brunches, weddings and every day you want to feel a little extra.',
    pairsWith: ['scrunchies', 'hair-tie'],
    rating: 4.8,
    reviewCount: 64,
    reviews: [
      { author: 'Kiara S.', rating: 5, title: 'Doesn’t pinch!', body: 'I usually get headaches from hairbands but this one is so comfy.' },
      { author: 'Mitali R.', rating: 5, title: 'Wedding-guest ready', body: 'Wore it to a day wedding and got so many compliments.' },
      { author: 'Ira P.', rating: 4.5, title: 'Very pretty', body: 'The rosebuds are full and neat. Came in a gift box.' },
    ],
  },
  {
    key: 'scrunchies',
    name: 'Flower Crown Scrunchies',
    subtitle: 'Flower-covered Scrunchies',
    category: 'Hair Accessories',
    price: 199,
    badge: 'Bestseller',
    tags: ['best-sellers'],
    cover: 'scrunchies1',
    images: seq('scrunchies', 1, 6),
    colors: [
      { name: 'Pink', key: 'pink' },
      { name: 'Buttercup', key: 'yellow' },
      { name: 'Sky', key: 'blue' },
      { name: 'Sage', key: 'sage' },
      { name: 'Lilac', key: 'lilac' },
    ],
    options: {
      label: 'Pack',
      values: [
        { label: 'Single', price: 199 },
        { label: 'Set of 3', price: 549 },
        { label: 'Set of 6', price: 999 },
      ],
    },
    material: 'Milk Cotton',
    occasions: ['Everyday', 'Gifting'],
    features: ['Ready to Ship', 'Gift Wrapped'],
    dimensions: 'Approx. 10 cm diameter',
    weight: '30 g each',
    care: 'Hand wash cold, dry flat',
    description:
      'Chunky scrunchies covered in dozens of tiny crochet flowers, like wearing a little garden in your hair.',
    longDescription:
      'Every scrunchie carries around twenty hand-made blossoms over a soft elastic core. Choose a single colour or a mixed set. Sets arrive in a keepsake box, perfect for gifting.',
    pairsWith: ['bow-band', 'hairband'],
    rating: 4.9,
    reviewCount: 318,
    reviews: [
      { author: 'Ananya B.', rating: 5, title: 'Obsessed!', body: 'Bought the set of 6 and wear a different one every day.' },
      { author: 'Shreya K.', rating: 5, title: 'Such a sweet gift box', body: 'The set arrived with a thank-you note. So thoughtful.' },
      { author: 'Nidhi A.', rating: 4.5, title: 'Holds well', body: 'Great grip even on my thick hair. Flowers haven’t come loose at all.' },
    ],
  },

  /* ----- Keychains ----- */
  {
    key: 'cherry-keychain',
    name: 'Cherry Cheeks Keychain',
    subtitle: 'Smiling Cherry Bag Charm',
    category: 'Keychains',
    price: 349,
    badge: 'Bestseller',
    tags: ['best-sellers'],
    cover: 'cherry-keychain3',
    images: ['cherry-keychain3', 'cherry-keychain1', 'cherry-keychain2', 'cherry-keychain5', 'cherry-keychain4', 'cherry-keychain6'],
    colors: [{ name: 'Cherry Red', key: 'red' }],
    material: 'Milk Cotton',
    occasions: ['Everyday', 'Gifting'],
    features: ['Ready to Ship'],
    dimensions: '10 cm long including gold-tone clasp',
    weight: '25 g',
    care: 'Spot clean',
    description:
      'Two smiling cherries with rosy cheeks, a leaf and a tiny white flower on a gold-tone lobster clasp.',
    longDescription:
      'Firmly stuffed and embroidered with sweet faces, the Cherry Cheeks charm brightens up keys, bags and zips. The gold-tone clasp and ring are sturdy enough for daily use.',
    pairsWith: ['tulip-keychain', 'mobile-pouch'],
    rating: 4.9,
    reviewCount: 276,
    reviews: [
      { author: 'Riya S.', rating: 5, title: 'Cutest thing ever', body: 'The little faces! It makes me happy every time I grab my keys.' },
      { author: 'Arjun V.', rating: 5, title: 'Gifted to my girlfriend', body: 'She clipped it to her bag instantly. Very good quality.' },
      { author: 'Mahi C.', rating: 4.5, title: 'Sturdy clasp', body: 'Survived months on my car keys and still looks new.' },
    ],
  },
  {
    key: 'lily-keychain',
    name: 'Stargazer Lily Keychain',
    subtitle: 'Lily Bloom Bag Charm',
    category: 'Keychains',
    price: 399,
    badge: 'New',
    tags: ['new-arrivals'],
    cover: 'lily-keychain1',
    images: seq('lily-keychain', 1, 5),
    colors: [{ name: 'Blush Stargazer', key: 'pink' }],
    material: 'Milk Cotton',
    occasions: ['Everyday', 'Gifting'],
    features: ['Ready to Ship'],
    dimensions: '13 cm long including clasp',
    weight: '30 g',
    care: 'Spot clean',
    description:
      'An open white lily with pink stripes and freckles, two closed buds and green leaves, on a gold-tone clasp.',
    longDescription:
      'Each petal is lightly wired inside so the lily stays open, and the freckles are hand-embroidered. A little bouquet you can carry everywhere.',
    pairsWith: ['tote-bag', 'tulip-keychain'],
    rating: 4.7,
    reviewCount: 38,
    reviews: [
      { author: 'Ishita G.', rating: 5, title: 'So realistic', body: 'The stripes and freckles look like a real stargazer lily.' },
      { author: 'Sneha V.', rating: 4.5, title: 'Elegant charm', body: 'Looks classy on my work tote. Petals hold their shape.' },
      { author: 'Pooja T.', rating: 4.5, title: 'Pretty!', body: 'Bigger than I expected, in a good way.' },
    ],
  },
  {
    key: 'sunflower-keychain',
    name: 'Sunshine Sunflower Keychain',
    subtitle: 'Sunflower Bag Charm',
    category: 'Keychains',
    price: 349,
    tags: ['top-picks'],
    cover: 'sunflower-keychain1',
    images: [...seq('sunflower-keychain', 1, 6), 'sunflower-keychain-transparent'],
    colors: [{ name: 'Sunflower Yellow', key: 'yellow' }],
    material: 'Milk Cotton',
    occasions: ['Everyday', 'Gifting'],
    features: ['Ready to Ship', 'Customisable'],
    dimensions: '11 cm long including clasp',
    weight: '28 g',
    care: 'Spot clean',
    description:
      'A bright sunflower with a textured brown centre, two leaves, a tiny white bud and a gold tag you can personalise.',
    longDescription:
      'The Sunshine Sunflower is our happiest charm: layered petals, a bobble-stitch seed centre and a little gold tag that we can stamp with an initial on request.',
    pairsWith: ['sunflower-jewelleryplate', 'daisy-handbag'],
    rating: 4.8,
    reviewCount: 152,
    reviews: [
      { author: 'Tanvi P.', rating: 5, title: 'Pure sunshine', body: 'Such a cheerful yellow. The centre texture is so detailed.' },
      { author: 'Rohit P.', rating: 5, title: 'Personalised tag', body: 'Asked for an initial on the tag and it came out perfect.' },
      { author: 'Divya L.', rating: 4.5, title: 'Good size', body: 'Not too big for keys, noticeable on a bag.' },
    ],
  },
  {
    key: 'toy-keychain',
    name: 'Bunny Blossom Keychain',
    subtitle: 'Bunny with Tulip Bag Charm',
    category: 'Keychains',
    price: 449,
    badge: 'New',
    tags: ['new-arrivals', 'gifts'],
    cover: 'toy-keychain2',
    images: ['toy-keychain2', 'toy-keychain1', 'toy-keychain3', 'toy-keychain5', 'toy-keychain6', 'toy-keychain4'],
    colors: [{ name: 'Bunny White', key: 'cream' }],
    material: 'Milk Cotton',
    occasions: ['Gifting', 'Kids'],
    features: ['Ready to Ship', 'Gift Wrapped'],
    dimensions: '12 cm long including clasp',
    weight: '32 g',
    care: 'Spot clean',
    description:
      'A floppy-eared white bunny hugging a pink tulip, with two tiny daisies and a pink bud on a gold ring.',
    longDescription:
      'Our smallest amigurumi bunny, stitched tightly so no stuffing peeks through and finished with embroidered eyes (no loose parts). A soft little companion for school bags and car keys.',
    pairsWith: ['soft-toy', 'mobile-pouch'],
    rating: 4.9,
    reviewCount: 74,
    reviews: [
      { author: 'Kiara S.', rating: 5, title: 'Heart melting', body: 'The bunny holding the tulip is too cute. My daughter loves it.' },
      { author: 'Aisha K.', rating: 5, title: 'Perfect little gift', body: 'Came in a mini gift box. Gave it to a colleague on her birthday.' },
      { author: 'Nisha R.', rating: 4.5, title: 'Soft and sweet', body: 'Very well made. Embroidered eyes are a nice safety touch.' },
    ],
  },
  {
    key: 'tulip-keychain',
    name: 'Tulip Bunch Keychain',
    subtitle: 'Tulip Bouquet Bag Charm',
    category: 'Keychains',
    price: 399,
    tags: ['gifts'],
    cover: 'tulip-keychain1',
    images: [...seq('tulip-keychain', 1, 5), 'tulip-keychain-transparent'],
    colors: [{ name: 'Pink Tulip', key: 'pink' }],
    material: 'Milk Cotton',
    occasions: ['Gifting', 'Everyday'],
    features: ['Ready to Ship', 'Customisable'],
    dimensions: '14 cm long including clasp',
    weight: '34 g',
    care: 'Spot clean',
    description: 'A mini bouquet of pink tulips tied with a cream bow, with a gold tag and lobster clasp.',
    longDescription:
      'Three tulips in two shades of pink are gathered with leafy stems and a crochet bow, like a bouquet that never wilts. The gold tag can carry a short name or date.',
    pairsWith: ['tote-bag', 'lily-keychain'],
    rating: 4.8,
    reviewCount: 131,
    reviews: [
      { author: 'Zoya F.', rating: 5, title: 'Tiny bouquet!', body: 'Looks like a real bunch of tulips. The bow is adorable.' },
      { author: 'Mitali R.', rating: 4.5, title: 'Lovely colours', body: 'Two shades of pink look so pretty together.' },
      { author: 'Arjun V.', rating: 5, title: 'Anniversary gift', body: 'Got our date on the tag. She loved it.' },
    ],
  },

  /* ----- Home Decor ----- */
  {
    key: 'curtain-tie',
    name: 'Floral Vine Curtain Tie-back',
    subtitle: 'Crochet Flower Curtain Holdback',
    category: 'Home Decor',
    price: 649,
    tags: ['collections'],
    cover: 'curtain-tie1',
    images: seq('curtain-tie', 1, 9),
    colors: [
      { name: 'Blush Blossom', key: 'pink', image: 'curtain-tie1' },
      { name: 'Rose Vine', key: 'rose', image: 'curtain-tie7' },
      { name: 'Sunflower', key: 'yellow', image: 'curtain-tie8' },
      { name: 'Lily of the Valley', key: 'cream', image: 'curtain-tie9' },
    ],
    options: {
      label: 'Quantity',
      values: [
        { label: 'Single', price: 649 },
        { label: 'Pair', price: 1199 },
      ],
    },
    material: 'Cotton',
    occasions: ['Home Styling', 'Gifting'],
    features: ['Made to Order'],
    dimensions: '60 cm leafy cord with 35 cm trailing buds',
    weight: '90 g',
    care: 'Hand wash cold, dry flat',
    description:
      'A big crochet bloom on a leafy cord with trailing buds and bells, to gather your curtains like a garden vine.',
    longDescription:
      'Tie it in a loose knot or a bow. The long leafy cord wraps easily around sheer and heavy curtains alike. Choose from four garden colourways, each made to order in small batches.',
    pairsWith: ['daisy-wall-hanging', 'table-mat'],
    rating: 4.7,
    reviewCount: 52,
    reviews: [
      { author: 'Neha D.', rating: 5, title: 'Room transformed', body: 'My bedroom looks like a cottage now. The pair was totally worth it.' },
      { author: 'Sana R.', rating: 4.5, title: 'Sunflower one is so bright', body: 'Cheers up my living room. Easy to tie.' },
      { author: 'Priya D.', rating: 4.5, title: 'Beautiful detail', body: 'The trailing buds sway so prettily when the window is open.' },
    ],
  },
  {
    key: 'daisy-wall-hanging',
    name: 'Daisy Rain Wall Hanging',
    subtitle: 'Daisy Garland Wall Décor',
    category: 'Home Decor',
    price: 1899,
    tags: ['top-picks', 'collections'],
    cover: 'daisy-wall-hanging1',
    images: seq('daisy-wall-hanging', 1, 6),
    colors: [{ name: 'Daisy White', key: 'cream' }],
    material: 'Cotton',
    occasions: ['Home Styling', 'Gifting'],
    features: ['Made to Order'],
    dimensions: '45 cm wide × 60 cm drop on a wooden dowel',
    weight: '240 g',
    care: 'Dust gently, spot clean if needed',
    description:
      'Strands of white daisies and green leaves falling from a natural wooden dowel, like a soft spring garden for your wall.',
    longDescription:
      'Over forty daisies and leaves are crocheted, stiffened and hand-strung at different lengths for a gentle, cascading look. It arrives ready to hang with a cotton cord.',
    pairsWith: ['curtain-tie', 'sunflower-jewelleryplate'],
    rating: 4.9,
    reviewCount: 83,
    reviews: [
      { author: 'Ira P.', rating: 5, title: 'Stunning piece', body: 'The focal point of my reading nook. So much work has gone into it.' },
      { author: 'Kavya M.', rating: 5, title: 'Housewarming hit', body: 'Gifted it to friends for their new home. They were thrilled.' },
      { author: 'Aarohi N.', rating: 4.5, title: 'Beautiful', body: 'Packed very carefully, arrived without a single tangle.' },
    ],
  },
  {
    key: 'sunflower-jewelleryplate',
    name: 'Sunflower Trinket Tray',
    subtitle: 'Crochet Jewellery Dish',
    category: 'Home Decor',
    price: 749,
    tags: ['collections'],
    cover: 'sunflower-jewelleryplate1',
    images: seq('sunflower-jewelleryplate', 1, 3),
    colors: [{ name: 'Sunflower Yellow', key: 'yellow' }],
    material: 'Cotton',
    occasions: ['Home Styling', 'Gifting'],
    features: ['Ready to Ship'],
    dimensions: '22 cm across including leaves',
    weight: '85 g',
    care: 'Shake out and spot clean',
    description: 'A sunflower-shaped tray with a deep brown centre to hold rings, earrings and little treasures.',
    longDescription:
      'Stiffened so it keeps its shape, the tray has a slightly raised brown centre that stops jewellery rolling away. Add a hanging loop and it doubles as sunny wall décor.',
    pairsWith: ['sunflower-keychain', 'daisy-wall-hanging'],
    rating: 4.6,
    reviewCount: 47,
    reviews: [
      { author: 'Shreya K.', rating: 5, title: 'Dresser upgrade', body: 'My rings finally have a home. So cheerful.' },
      { author: 'Tara M.', rating: 4.5, title: 'Sturdy', body: 'Holds its shape well, even with heavier bangles.' },
      { author: 'Nidhi A.', rating: 4.5, title: 'Cute gift', body: 'Paired it with the sunflower keychain for a friend.' },
    ],
  },

  /* ----- Table & Kitchen ----- */
  {
    key: 'coasters',
    name: 'Garden Bloom Coasters',
    subtitle: 'Flower Coaster Set',
    category: 'Table & Kitchen',
    price: 699,
    tags: ['top-picks'],
    cover: 'coasters1',
    images: seq('coasters', 1, 4),
    colors: [
      { name: 'Pink', key: 'pink' },
      { name: 'Lilac', key: 'lilac' },
      { name: 'Sky Blue', key: 'blue' },
      { name: 'Daisy White', key: 'cream' },
    ],
    options: {
      label: 'Set',
      values: [
        { label: 'Set of 4', price: 699 },
        { label: 'Set of 6', price: 999 },
      ],
    },
    material: 'Cotton',
    occasions: ['Home Styling', 'Gifting'],
    features: ['Ready to Ship', 'Gift Wrapped'],
    dimensions: '12 cm diameter each',
    weight: '25 g each',
    care: 'Machine wash cold in a laundry bag, dry flat',
    description: 'Layered flower coasters in pink, lilac, sky blue and white, each backed with a ring of green leaves.',
    longDescription:
      'Made in thick, absorbent cotton, the Garden Bloom coasters protect your table from hot chai and cold drinks alike, and look lovely stacked on a tray when not in use.',
    pairsWith: ['table-mat', 'sunflower-jewelleryplate'],
    rating: 4.8,
    reviewCount: 139,
    reviews: [
      { author: 'Meera K.', rating: 5, title: 'Tea time is prettier', body: 'They absorb spills well and look adorable on my coffee table.' },
      { author: 'Divya L.', rating: 4.5, title: 'Washes well', body: 'Put them in a laundry bag and they came out perfect.' },
      { author: 'Rohit P.', rating: 5, title: 'Housewarming gift', body: 'Set of 6 came in a lovely box. Great present.' },
    ],
  },
  {
    key: 'flower-coatsters',
    name: 'Petal Pop Coasters',
    subtitle: 'Bright Flower Coaster Set',
    category: 'Table & Kitchen',
    price: 649,
    tags: ['collections'],
    cover: 'flower-coatsters1',
    images: seq('flower-coatsters', 1, 6),
    colors: [
      { name: 'Pink', key: 'pink' },
      { name: 'Buttercup', key: 'yellow' },
      { name: 'Lilac', key: 'lilac' },
      { name: 'Poppy Red', key: 'red' },
      { name: 'Cornflower', key: 'blue' },
    ],
    options: {
      label: 'Set',
      values: [
        { label: 'Set of 4', price: 649 },
        { label: 'Set of 6', price: 899 },
      ],
    },
    material: 'Cotton',
    occasions: ['Home Styling', 'Gifting'],
    features: ['Ready to Ship'],
    dimensions: '11 cm diameter each',
    weight: '22 g each',
    care: 'Machine wash cold in a laundry bag, dry flat',
    description: 'Bold, happy flower coasters with spiral centres in pink, yellow, lilac, red and blue.',
    longDescription:
      'The spiral centre is worked in a contrasting colour for a pop-art look, and the petals are double-thick so cups sit flat. A mixed set brings instant colour to any table.',
    pairsWith: ['table-mat', 'fruits-coasters'],
    rating: 4.7,
    reviewCount: 76,
    reviews: [
      { author: 'Ananya B.', rating: 5, title: 'So colourful', body: 'My kitchen shelf looks so fun now.' },
      { author: 'Kiara S.', rating: 4.5, title: 'Thick and flat', body: 'Mugs sit perfectly flat. Great quality cotton.' },
      { author: 'Sneha V.', rating: 4.5, title: 'Good value', body: 'Set of 6 is worth it. Every guest picks a colour.' },
    ],
  },
  {
    key: 'fruits-coasters',
    name: 'Fruit Garden Coaster Set',
    subtitle: 'Watermelon, Frog & Flower Coasters',
    category: 'Table & Kitchen',
    price: 799,
    badge: 'New',
    tags: ['new-arrivals'],
    cover: 'fruits-coasters',
    images: ['fruits-coasters'],
    colors: [
      { name: 'Watermelon', key: 'red' },
      { name: 'Froggy Green', key: 'sage' },
      { name: 'Buttercup', key: 'yellow' },
      { name: 'Pink', key: 'pink' },
    ],
    material: 'Cotton',
    occasions: ['Home Styling', 'Kids', 'Gifting'],
    features: ['Ready to Ship'],
    dimensions: 'Approx. 11–13 cm each, set of 6',
    weight: '140 g (set)',
    care: 'Machine wash cold in a laundry bag, dry flat',
    description: 'A playful set of six: a watermelon slice, a smiley frog, a leaf and three flowers.',
    longDescription:
      'Mix-and-match shapes that make every cup of tea a little sillier. Worked in absorbent cotton with embroidered details on the watermelon seeds and frog face.',
    pairsWith: ['coasters', 'table-mat'],
    rating: 4.8,
    reviewCount: 22,
    reviews: [
      { author: 'Mahi C.', rating: 5, title: 'The frog!!', body: 'I fight my brother for the frog coaster every morning.' },
      { author: 'Tanvi P.', rating: 4.5, title: 'Fun set', body: 'Kids love picking their coaster at dinner.' },
      { author: 'Aditi S.', rating: 5, title: 'Quirky and cute', body: 'Perfect for my summer-themed table.' },
    ],
  },
  {
    key: 'table-mat',
    name: 'Rosette Table Mat',
    subtitle: 'Round Floral Placemat',
    category: 'Table & Kitchen',
    price: 999,
    tags: ['collections'],
    cover: 'table-mat1',
    images: seq('table-mat', 1, 4),
    colors: [{ name: 'Cream & Rose', key: 'pink' }],
    options: {
      label: 'Quantity',
      values: [
        { label: 'Single', price: 999 },
        { label: 'Set of 2', price: 1799 },
        { label: 'Set of 4', price: 3399 },
      ],
    },
    material: 'Cotton',
    occasions: ['Home Styling', 'Weddings & Festive'],
    features: ['Made to Order'],
    dimensions: '38 cm diameter',
    weight: '150 g',
    care: 'Hand wash cold, press flat while damp',
    description:
      'A round cream placemat with a spiral centre, bordered by a wreath of pink and cream flowers and green leaves.',
    longDescription:
      'Big enough for a dinner plate with cutlery, the Rosette mat turns everyday meals into a garden party. The flower border is sewn on individually so each mat is subtly unique.',
    pairsWith: ['coasters', 'flower-coatsters'],
    rating: 4.7,
    reviewCount: 35,
    reviews: [
      { author: 'Ritika J.', rating: 5, title: 'Festive table', body: 'Used a set of 4 for Diwali dinner. Everyone loved them.' },
      { author: 'Neha D.', rating: 4.5, title: 'Heirloom quality', body: 'Such detailed work. Feels like something to keep forever.' },
      { author: 'Zoya F.', rating: 4.5, title: 'Pretty', body: 'Took about a week to make, as mentioned. Worth the wait.' },
    ],
  },

  /* ----- Flowers & Bouquets ----- */
  {
    key: 'lily-flowers',
    name: 'Everlasting Lily Bouquet',
    subtitle: 'Crochet Lily Stems',
    category: 'Flowers & Bouquets',
    price: 1499,
    tags: ['collections', 'gifts'],
    cover: 'lily-flowers1',
    images: seq('lily-flowers', 1, 4),
    colors: [{ name: 'White & Gold', key: 'cream' }],
    options: {
      label: 'Style',
      values: [
        { label: 'Wrapped Bouquet', price: 1499 },
        { label: 'With Ceramic Vase', price: 1899 },
      ],
    },
    material: 'Milk Cotton',
    occasions: ['Gifting', 'Home Styling', 'Weddings & Festive'],
    features: ['Gift Wrapped', 'Made to Order'],
    dimensions: '45 cm tall, 5 blooms with buds',
    weight: '180 g',
    care: 'Dust with a soft brush, keep away from damp',
    description: 'Five white lilies with golden throats and closed buds on wired stems: flowers that stay fresh forever.',
    longDescription:
      'Each lily has six wired petals you can gently shape, embroidered stamens and a soft yellow blush. Choose it wrapped in kraft paper and ribbon, or arranged in our hand-painted ceramic vase.',
    pairsWith: ['lily-keychain', 'pink-rose-bouquet'],
    rating: 4.8,
    reviewCount: 61,
    reviews: [
      { author: 'Ishita G.', rating: 5, title: 'Better than real', body: 'Six months later they look exactly the same. So elegant.' },
      { author: 'Arjun V.', rating: 5, title: 'Mother’s Day gift', body: 'Mum keeps them on her dining table and shows them to everyone.' },
      { author: 'Aisha K.', rating: 4.5, title: 'Vase is lovely', body: 'The ceramic vase version is worth the upgrade.' },
    ],
  },
  {
    key: 'pink-rose-bouquet',
    name: 'Blush Rose Bouquet',
    subtitle: 'Pink & Cream Crochet Roses',
    category: 'Flowers & Bouquets',
    price: 1799,
    badge: 'Bestseller',
    tags: ['best-sellers', 'gifts'],
    cover: 'pink-rose-bouquet1',
    images: seq('pink-rose-bouquet', 1, 5),
    colors: [{ name: 'Blush & Cream', key: 'pink' }],
    options: {
      label: 'Stems',
      values: [
        { label: '7 Stems', price: 1799 },
        { label: '12 Stems', price: 2599 },
      ],
    },
    material: 'Milk Cotton',
    occasions: ['Gifting', 'Weddings & Festive'],
    features: ['Gift Wrapped', 'Made to Order', 'Customisable'],
    dimensions: '40 cm tall bouquet',
    weight: '220 g',
    care: 'Dust with a soft brush, keep away from damp',
    description:
      'Blush pink and cream roses with sprigs of green, wrapped in kraft paper and tied with a pink gingham bow.',
    longDescription:
      'Every rose is rolled petal by petal and set on a wired stem, so the bouquet can be arranged in a vase later. Add a handwritten note card. Just tell us the message at checkout.',
    pairsWith: ['soft-toy', 'tulip-keychain'],
    rating: 4.9,
    reviewCount: 189,
    reviews: [
      { author: 'Rohit P.', rating: 5, title: 'Forever flowers', body: 'Got these for our anniversary. She said they’re better than real roses.' },
      { author: 'Pooja T.', rating: 5, title: 'Gorgeous wrapping', body: 'The gingham bow and kraft wrap look so aesthetic.' },
      { author: 'Kiara S.', rating: 4.5, title: 'Lovely note card', body: 'They wrote my message beautifully by hand.' },
    ],
  },
  {
    key: 'rose-bouquet',
    name: 'Crimson Rose Bouquet',
    subtitle: 'Red & Blush Crochet Roses',
    category: 'Flowers & Bouquets',
    price: 2199,
    tags: ['top-picks', 'gifts'],
    cover: 'rose-bouquet1',
    images: seq('rose-bouquet', 1, 5),
    colors: [{ name: 'Crimson & Blush', key: 'rose' }],
    options: {
      label: 'Stems',
      values: [
        { label: '9 Stems', price: 2199 },
        { label: '15 Stems', price: 3299 },
      ],
    },
    material: 'Milk Cotton',
    occasions: ['Gifting', 'Weddings & Festive'],
    features: ['Gift Wrapped', 'Made to Order', 'Customisable'],
    dimensions: '42 cm tall bouquet',
    weight: '260 g',
    care: 'Dust with a soft brush, keep away from damp',
    description: 'Deep crimson and soft blush roses with green leaves, wrapped in white paper and a dusty pink ribbon.',
    longDescription:
      'A romantic, never-wilting bouquet for proposals, anniversaries and Valentine’s Day. Each stem is wired so the roses can be rearranged, and every bouquet ships in a rigid gift box.',
    pairsWith: ['soft-toy', 'potli-bag'],
    rating: 4.8,
    reviewCount: 104,
    reviews: [
      { author: 'Arjun V.', rating: 5, title: 'She said yes!', body: 'Used it for my proposal. Now it sits in our living room forever.' },
      { author: 'Nisha R.', rating: 5, title: 'Rich colour', body: 'The crimson is deep and velvety. Stunning bouquet.' },
      { author: 'Mitali R.', rating: 4.5, title: 'Well packed', body: 'Came in a sturdy box, not a single petal squashed.' },
    ],
  },

  /* ----- Wearables ----- */
  {
    key: 'bean-cap',
    name: 'Lavender Bloom Beanie',
    subtitle: 'Embroidered Pom-pom Beanie',
    category: 'Wearables',
    price: 1299,
    badge: 'New',
    tags: ['new-arrivals'],
    cover: 'bean-cap1',
    images: seq('bean-cap', 1, 4),
    colors: [{ name: 'Lavender', key: 'lilac' }],
    options: {
      label: 'Size',
      values: [
        { label: 'Adult (54–58 cm)', price: 1299 },
        { label: 'Kids (48–52 cm)', price: 1099 },
      ],
    },
    material: 'Wool Blend',
    occasions: ['Everyday', 'Gifting'],
    features: ['Ready to Ship', 'Gift Wrapped'],
    dimensions: '22 cm tall with fold-up brim',
    weight: '120 g',
    care: 'Hand wash cold, dry flat, do not tumble dry',
    description:
      'A cosy cream beanie embroidered with lilac flowers and green leaves, with a ribbed lavender brim and a fluffy pom-pom.',
    longDescription:
      'Knit-look crochet in a soft wool blend keeps you warm without itching. The ribbed brim folds up for a snug fit and the pom-pom is securely stitched on.',
    pairsWith: ['muffler', 'scarf'],
    rating: 4.8,
    reviewCount: 45,
    reviews: [
      { author: 'Tara M.', rating: 5, title: 'Warm and cute', body: 'Wore it in Manali: warm, soft and so photogenic.' },
      { author: 'Shreya K.', rating: 4.5, title: 'Not itchy', body: 'I have sensitive skin and this is really comfortable.' },
      { author: 'Riya S.', rating: 5, title: 'Matching set', body: 'Bought the kids size for my daughter too. Twinning!' },
    ],
  },
  {
    key: 'jacket',
    name: 'Wildflower Cardigan',
    subtitle: 'Hand-crocheted Floral Cardigan',
    category: 'Wearables',
    price: 4999,
    badge: 'New',
    tags: ['new-arrivals'],
    cover: 'jacket1',
    images: seq('jacket', 1, 4),
    colors: [{ name: 'Cream Wildflower', key: 'cream' }],
    options: {
      label: 'Size',
      values: [
        { label: 'S', price: 4999 },
        { label: 'M', price: 4999 },
        { label: 'L', price: 4999 },
        { label: 'XL', price: 4999 },
      ],
    },
    material: 'Milk Cotton',
    occasions: ['Everyday', 'Gifting'],
    features: ['Made to Order'],
    dimensions: 'Relaxed fit, 58 cm length (size M)',
    weight: '520 g',
    care: 'Hand wash cold, dry flat, never hang to dry',
    description:
      'A relaxed cream cardigan covered in pink wildflower squares and trailing green leaves, with wooden buttons.',
    longDescription:
      'Our most ambitious piece: each cardigan takes around three weeks to make. The squares are joined with a lace seam for breathability, and the soft milk cotton drapes beautifully over dresses and denim.',
    pairsWith: ['sling-bag', 'bean-cap'],
    rating: 4.9,
    reviewCount: 28,
    reviews: [
      { author: 'Kavya M.', rating: 5, title: 'Wearable art', body: 'The florals are breathtaking. Worth the wait.' },
      { author: 'Ira P.', rating: 5, title: 'Perfect fit', body: 'They helped me pick a size over WhatsApp. Fits like a dream.' },
      { author: 'Aarohi N.', rating: 4.5, title: 'So soft', body: 'Not heavy at all. Great for Bangalore evenings.' },
    ],
  },
  {
    key: 'muffler',
    name: 'Flower Garden Muffler',
    subtitle: 'Chunky Granny Square Muffler',
    category: 'Wearables',
    price: 1499,
    tags: ['collections'],
    cover: 'muffler1',
    images: seq('muffler', 1, 4),
    colors: [
      { name: 'Sunny Daisy', key: 'yellow', image: 'muffler1' },
      { name: 'Lavender Field', key: 'lilac', image: 'muffler2' },
      { name: 'Rose Garden', key: 'rose', image: 'muffler3' },
      { name: 'Marigold', key: 'peach', image: 'muffler4' },
    ],
    material: 'Wool Blend',
    occasions: ['Everyday', 'Gifting'],
    features: ['Ready to Ship', 'Gift Wrapped'],
    dimensions: '160 × 18 cm plus 10 cm tassels',
    weight: '260 g',
    care: 'Hand wash cold, dry flat',
    description: 'A chunky cream muffler with a column of flower granny squares, striped borders and swishy tassels.',
    longDescription:
      'Warm, squishy and just a little bit whimsical. The Flower Garden muffler comes in four colourways, each with its own flower and a matching striped edge.',
    pairsWith: ['bean-cap', 'jacket'],
    rating: 4.7,
    reviewCount: 69,
    reviews: [
      { author: 'Sana R.', rating: 5, title: 'Winter favourite', body: 'The Lavender Field one is so pretty and really warm.' },
      { author: 'Divya L.', rating: 4.5, title: 'Lovely tassels', body: 'Tassels are thick and haven’t frayed at all.' },
      { author: 'Priya D.', rating: 4.5, title: 'Great gift', body: 'Sent the Marigold one to my mom in Delhi and she loves it.' },
    ],
  },
  {
    key: 'scarf',
    name: 'Meadow Stripe Scarf',
    subtitle: 'Long Daisy Panel Scarf',
    category: 'Wearables',
    price: 1699,
    tags: ['collections'],
    cover: 'scarf1',
    images: seq('scarf', 1, 7),
    colors: [
      { name: 'Sage Meadow', key: 'sage', image: 'scarf1' },
      { name: 'Rose Meadow', key: 'rose', image: 'scarf2' },
      { name: 'Cornflower', key: 'blue', image: 'scarf6' },
      { name: 'Peach Blossom', key: 'peach', image: 'scarf7' },
    ],
    material: 'Wool Blend',
    occasions: ['Everyday', 'Gifting'],
    features: ['Ready to Ship', 'Gift Wrapped'],
    dimensions: '180 × 20 cm plus 12 cm tassels',
    weight: '300 g',
    care: 'Hand wash cold, dry flat',
    description:
      'A long, cosy scarf with daisy panels running down the centre, framed by coloured stripes and finished with tassels.',
    longDescription:
      'Long enough to wrap twice, the Meadow Stripe scarf pairs a soft cream body with daisy motifs and bold stripes in your choice of four colourways.',
    pairsWith: ['bean-cap', 'tote-bag'],
    rating: 4.8,
    reviewCount: 92,
    reviews: [
      { author: 'Zoya F.', rating: 5, title: 'So long and cosy', body: 'Wraps twice around my neck. The sage is gorgeous.' },
      { author: 'Nidhi A.', rating: 4.5, title: 'Pretty colours', body: 'Got the cornflower one. Even prettier than the photos.' },
      { author: 'Mahi C.', rating: 5, title: 'Soft, not scratchy', body: 'Wore it all day without any itch.' },
    ],
  },

  /* ----- Toys ----- */
  {
    key: 'soft-toy',
    name: 'Bella the Bunny',
    subtitle: 'Amigurumi Bunny in Floral Dress',
    category: 'Toys',
    price: 1299,
    tags: ['top-picks', 'gifts'],
    cover: 'soft-toy1',
    images: seq('soft-toy', 1, 4),
    colors: [{ name: 'Blush Bunny', key: 'pink' }],
    options: {
      label: 'Size',
      values: [
        { label: '25 cm', price: 1299 },
        { label: '35 cm', price: 1699 },
      ],
    },
    material: 'Milk Cotton',
    occasions: ['Kids', 'Gifting'],
    features: ['Gift Wrapped', 'Customisable'],
    dimensions: '25 cm tall sitting (35 cm option available)',
    weight: '180 g',
    care: 'Surface wash with mild soap, air dry',
    description: 'A cream bunny with long pink-lined ears, a pink floral dress and a flower tucked behind one ear.',
    longDescription:
      'Bella is made with baby-safe milk cotton, embroidered eyes and no small parts, so she’s safe from day one. We can stitch a name onto her dress. Just add it in the notes at checkout.',
    pairsWith: ['toy-keychain', 'pink-rose-bouquet'],
    rating: 4.9,
    reviewCount: 177,
    reviews: [
      { author: 'Neha D.', rating: 5, title: 'Baby shower star', body: 'Got her name stitched on. The mum-to-be cried happy tears.' },
      { author: 'Aisha K.', rating: 5, title: 'So soft and safe', body: 'My 1-year-old sleeps with her every night.' },
      { author: 'Rohit P.', rating: 4.5, title: 'Gift-box perfect', body: 'Arrived in a beautiful box with tissue and a card.' },
    ],
  },
]

/* ---------- Derived product data ---------- */

const specsFor = (raw) => [
  ['Material', `${raw.material}${raw.category === 'Toys' ? ', hypoallergenic fibre fill' : ''}`],
  ['Dimensions', raw.dimensions],
  ['Weight', raw.weight],
  ['Colours', raw.colors.map((c) => c.name).join(', ')],
  ['Care', raw.care],
  ['Making Time', raw.features.includes('Made to Order') ? 'Made to order, ships in 7–10 days' : 'Ready to ship in 1–2 days'],
  ['Origin', 'Handmade in India'],
]

const highlightsFor = (raw) => [
  { icon: 'hands', label: '100% Handmade\nwith Love' },
  { icon: 'leaf', label: `Soft ${raw.material}\nYarn` },
  { icon: 'cloud', label: raw.category === 'Toys' ? 'Baby-safe\n& Hypoallergenic' : 'Light &\nComfortable' },
  { icon: 'globe', label: 'Small-batch\nProduction' },
  { icon: 'infinity', label: 'Made for\nLasting Memories' },
]

export const PRODUCTS = RAW_PRODUCTS.map((raw, i) => ({
  ...raw,
  slug: slugify(raw.name),
  price: raw.options?.values[0].price ?? raw.price,
  fromPrice: raw.options ? Math.min(...raw.options.values.map((v) => v.price)) : raw.price,
  colorKeys: [...new Set(raw.colors.map((c) => c.key))],
  specs: specsFor(raw),
  highlights: highlightsFor(raw),
  careGuide: [
    `${raw.care}.`,
    'Use a mild, pH-neutral detergent and never bleach.',
    'Reshape gently while damp and keep away from direct sunlight to protect the colours.',
    'Store folded in a breathable cotton bag and avoid plastic, which traps moisture.',
  ],
  // Deterministic "date added" so the Newest sort differs from Featured
  addedAt: RAW_PRODUCTS.length - ((i * 11) % RAW_PRODUCTS.length),
  popularity: raw.reviewCount * raw.rating,
  reviews: raw.reviews.map((r, n) => ({
    ...r,
    id: `${raw.key}-review-${n}`,
    image: raw.images[n % raw.images.length],
  })),
}))

/* ---------- Lookups ---------- */

const byKey = new Map(PRODUCTS.map((p) => [p.key, p]))

export const getProductBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug)

export const getAllSlugs = () => PRODUCTS.map((p) => p.slug)

/** Products listed in `pairsWith`: used by Frequently Bought Together */
export const getPairedProducts = (product) =>
  product.pairsWith.map((k) => byKey.get(k)).filter((p) => p !== undefined)

/** Same category first, then the rest of the catalogue by popularity */
export const getRelatedProducts = (product, limit = 10) =>
  [
    ...PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug),
    ...PRODUCTS.filter((p) => p.category !== product.category).sort((a, b) => b.popularity - a.popularity),
  ].slice(0, limit)

/** Image for each category circle on the listing page */
export const CATEGORY_COVERS = {
  All: 'daisy-handbag1',
  Bags: 'potli-bag-transparent',
  'Hair Accessories': 'hairband-transparent',
  Keychains: 'tulip-keychain-transparent',
  'Home Decor': 'daisy-wall-hanging6',
  'Table & Kitchen': 'coasters2',
  'Flowers & Bouquets': 'pink-rose-bouquet1',
  Wearables: 'scarf6',
  Toys: 'soft-toy1',
}
