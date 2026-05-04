/** Built from all PNGs in public/images/webenoxshop (regenerate: node scripts/generate-webenox-shop-data.mjs). */
export const SHOP_IMG = (filename) => `/images/webenoxshop/${encodeURIComponent(filename)}`

export const WEBENOX_LOGO_SRC = '/images/wlogo.png'

export const SHOP_HERO_SRC = SHOP_IMG('WBNX Model – Street Contrast.png')

/** Pill order on Home / Shop; only categories with products are included in SHOP_CATEGORIES. */
export const SHOP_CATEGORY_ORDER = ['Sneakers', 'Tees', 'Hoodies', 'Pants', 'Shorts', 'Jackets', 'Slides']

export const SHOP_PRODUCTS = [
  {
    id: "wbnx-campaign-model-minimal-stone-edition",
    name: "WBNX Campaign Model – Minimal Stone Edition",
    category: "Campaign",
    price: 24,
    color: "Minimal Stone Edition",
    images: {
      front: SHOP_IMG("WBNX Campaign Model – Minimal Stone Edition.png"),
      back: SHOP_IMG("WBNX Campaign Model – Minimal Stone Edition.png")
    },
    description: "Editorial campaign frame — premium WBNX mood.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.55,
    popular: 129
  },
  {
    id: "wbnx-model-skyline",
    name: "WBNX Model – Skyline",
    category: "Campaign",
    price: 24,
    color: "Skyline",
    images: {
      front: SHOP_IMG("WBNX Model – Skyline.png"),
      back: SHOP_IMG("WBNX Model – Skyline.png")
    },
    description: "Editorial campaign frame — premium WBNX mood.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.60,
    popular: 128
  },
  {
    id: "wbnx-model-street-contrast",
    name: "WBNX Model – Street Contrast",
    category: "Campaign",
    price: 24,
    color: "Street Contrast",
    images: {
      front: SHOP_IMG("WBNX Model – Street Contrast.png"),
      back: SHOP_IMG("WBNX Model – Street Contrast.png")
    },
    description: "Editorial campaign frame — premium WBNX mood.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.65,
    popular: 127
  },
  {
    id: "wbnx-model-urban-minimal",
    name: "WBNX Model – Urban Minimal",
    category: "Campaign",
    price: 24,
    color: "Urban Minimal",
    images: {
      front: SHOP_IMG("WBNX Model – Urban Minimal.png"),
      back: SHOP_IMG("WBNX Model – Urban Minimal.png")
    },
    description: "Editorial campaign frame — premium WBNX mood.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.70,
    popular: 126
  },
  {
    id: "wbnx-core-hoodie-black",
    name: "WBNX Core Hoodie – Black",
    category: "Hoodies",
    price: 100,
    color: "Black",
    images: {
      front: SHOP_IMG("WBNX Core Hoodie – Black.png"),
      back: SHOP_IMG("WBNX Core Hoodie – Black (Back Edition).png")
    },
    description: "Premium WBNX piece. Black edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: true,
    rating: 4.75,
    popular: 125
  },
  {
    id: "wbnx-core-hoodie-jet-black",
    name: "WBNX Core Hoodie – Jet Black",
    category: "Hoodies",
    price: 92,
    color: "Jet Black",
    images: {
      front: SHOP_IMG("WBNX Core Hoodie – Jet Black.png"),
      back: SHOP_IMG("WBNX Core Hoodie – Jet Black (Back Edition).png")
    },
    description: "Premium WBNX piece. Jet Black edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: true,
    rating: 4.80,
    popular: 124
  },
  {
    id: "wbnx-core-hoodie-washed-gray",
    name: "WBNX Core Hoodie – Washed Gray",
    category: "Hoodies",
    price: 94,
    color: "Washed Gray",
    images: {
      front: SHOP_IMG("WBNX Core Hoodie – Washed Gray.png"),
      back: SHOP_IMG("WBNX Statement Hoodie – Washed Gray (Back Edition).png")
    },
    description: "Premium WBNX piece. Washed Gray — core front, statement W graphic on back.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: true,
    rating: 4.85,
    popular: 123
  },
  {
    id: "wbnx-tech-hoodie-dark-gray",
    name: "WBNX Tech Hoodie – Dark Gray",
    category: "Hoodies",
    price: 98,
    color: "Dark Gray",
    images: {
      front: SHOP_IMG("WBNX Tech Hoodie – Dark Gray.png"),
      back: SHOP_IMG("WBNX Tech Hoodie – Dark Gray (Back Edition).png")
    },
    description: "Premium WBNX piece. Dark Gray edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: true,
    rating: 4.95,
    popular: 121
  },
  {
    id: "wbnx-zip-hoodie-navy",
    name: "WBNX Zip Hoodie – Navy",
    category: "Hoodies",
    price: 100,
    color: "Navy",
    images: {
      front: SHOP_IMG("WBNX Zip Hoodie – Navy.png"),
      back: SHOP_IMG("WBNX Zip Hoodie – Navy (Back Edition).png")
    },
    description: "Premium WBNX piece. Navy edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: true,
    rating: 4.55,
    popular: 120
  },
  {
    id: "wbnx-puffer-jacket-black",
    name: "WBNX Puffer Jacket – Black",
    category: "Jackets",
    price: 175,
    color: "Black",
    images: {
      front: SHOP_IMG("WBNX Puffer Jacket – Black.png"),
      back: SHOP_IMG("WBNX Puffer Jacket – Black (Back Edition).png")
    },
    description: "Premium WBNX piece. Black edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: true,
    rating: 4.60,
    popular: 119
  },
  {
    id: "wbnx-tech-shell-jacket-gray",
    name: "WBNX Tech Shell Jacket – Gray",
    category: "Jackets",
    price: 177,
    color: "Gray",
    images: {
      front: SHOP_IMG("WBNX Tech Shell Jacket – Gray.png"),
      back: SHOP_IMG("WBNX Tech Shell Jacket – Gray (Back Edition).png")
    },
    description: "Premium WBNX piece. Gray edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: true,
    rating: 4.65,
    popular: 118
  },
  {
    id: "wbnx-varsity-jacket-blackwhite",
    name: "WBNX Varsity Jacket – Black / White",
    category: "Jackets",
    price: 179,
    color: "Black / White",
    images: {
      front: SHOP_IMG("WBNX Varsity Jacket – BlackWhite.png"),
      back: SHOP_IMG("WBNX Varsity Jacket – BlackWhite (Back Edition).png")
    },
    description: "Premium WBNX piece. Black / White edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.70,
    popular: 117
  },
  {
    id: "wbnx-cargo-pants-olive-green",
    name: "WBNX Cargo Pants – Olive Green",
    category: "Pants",
    price: 82,
    color: "Olive Green",
    images: {
      front: SHOP_IMG("WBNX Cargo Pants – Olive Green.png"),
      back: SHOP_IMG("WBNX Cargo Pants – Olive Green (Back Edition).png")
    },
    description: "Premium WBNX piece. Olive Green edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.75,
    popular: 116
  },
  {
    id: "wbnx-core-sweatpants-black",
    name: "WBNX Core Sweatpants – Black",
    category: "Pants",
    price: 84,
    color: "Black",
    images: {
      front: SHOP_IMG("WBNX Core Sweatpants – Black.png"),
      back: SHOP_IMG("WBNX Core Sweatpants – Black (Back Edition).png")
    },
    description: "Premium WBNX piece. Black edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.80,
    popular: 115
  },
  {
    id: "wbnx-core-sweatpants-gray",
    name: "WBNX Core Sweatpants – Gray",
    category: "Pants",
    price: 76,
    color: "Gray",
    images: {
      front: SHOP_IMG("WBNX Core Sweatpants – Gray.png"),
      back: SHOP_IMG("WBNX Core Sweatpants – Gray (Back Edition).png")
    },
    description: "Premium WBNX piece. Gray edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.85,
    popular: 114
  },
  {
    id: "wbnx-tailored-pants-charcoal-gray",
    name: "WBNX Tailored Pants – Charcoal Gray",
    category: "Pants",
    price: 78,
    color: "Charcoal Gray",
    images: {
      front: SHOP_IMG("WBNX Tailored Pants – Charcoal Gray.png"),
      back: SHOP_IMG("WBNX Tailored Pants – Charcoal Gray (Back Edition).png")
    },
    description: "Premium WBNX piece. Charcoal Gray edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.90,
    popular: 113
  },
  {
    id: "wbnx-tech-joggers-black",
    name: "WBNX Tech Joggers – Black",
    category: "Pants",
    price: 80,
    color: "Black",
    images: {
      front: SHOP_IMG("WBNX Tech Joggers – Black.png"),
      back: SHOP_IMG("WBNX Tech Joggers – Black (Back Edition).png")
    },
    description: "Premium WBNX piece. Black edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.95,
    popular: 112
  },
  {
    id: "wbnx-core-shorts-light-gray",
    name: "WBNX Core Shorts – Light Gray",
    category: "Shorts",
    price: 56,
    color: "Light Gray",
    images: {
      front: SHOP_IMG("WBNX Core Shorts – Light Gray.png"),
      back: SHOP_IMG("WBNX Core Shorts – Light Gray (Back Edition).png")
    },
    description: "Premium WBNX piece. Light Gray edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.55,
    popular: 111
  },
  {
    id: "wbnx-core-shorts-navy",
    name: "WBNX Core Shorts – Navy Blue",
    category: "Shorts",
    price: 58,
    color: "Navy",
    images: {
      front: SHOP_IMG("WBNX Core Shorts – Navy.png"),
      back: SHOP_IMG("WBNX Core Shorts – Navy (Back Edition).png")
    },
    description: "Premium WBNX piece. Navy edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.60,
    popular: 110
  },
  {
    id: "wbnx-core-shorts-sand",
    name: "WBNX Core Shorts – Sand Light",
    category: "Shorts",
    price: 50,
    color: "Sand",
    images: {
      front: SHOP_IMG("WBNX Core Shorts – Sand.png"),
      back: SHOP_IMG("WBNX Core Shorts – Sand (Back Edition).png")
    },
    description: "Premium WBNX piece. Sand edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.65,
    popular: 109
  },
  {
    id: "wbnx-mesh-shorts-blackwhite",
    name: "WBNX Mesh Shorts – Black / White",
    category: "Shorts",
    price: 52,
    color: "Black / White",
    images: {
      front: SHOP_IMG("WBNX Mesh Shorts – BlackWhite.png"),
      back: SHOP_IMG("WBNX Mesh Shorts – BlackWhite (Back Edition).png")
    },
    description: "Premium WBNX piece. Black / White edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.70,
    popular: 108
  },
  {
    id: "wbnx-utility-shorts-black",
    name: "WBNX Utility Shorts – Black",
    category: "Shorts",
    price: 54,
    color: "Black",
    images: {
      front: SHOP_IMG("WBNX Utility Shorts – Black.png"),
      back: SHOP_IMG("WBNX Utility Shorts – Black (Back Edition).png")
    },
    description: "Premium WBNX piece. Black edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.75,
    popular: 107
  },
  {
    id: "wbnx-core-slides-black",
    name: "WBNX Core Slides – Black",
    category: "Slides",
    price: 50,
    color: "Black",
    images: {
      front: SHOP_IMG("WBNX Core Slides – Black (Front View).png"),
      back: SHOP_IMG("WBNX Core Slides – Black.png")
    },
    description: "Premium WBNX piece. Black edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.80,
    popular: 106
  },
  {
    id: "wbnx-tech-slides-sand",
    name: "WBNX Tech Slides – Sand",
    category: "Slides",
    price: 52,
    color: "Sand",
    images: {
      front: SHOP_IMG("WBNX Tech Slides – Sand (Front View).png"),
      back: SHOP_IMG("WBNX Tech Slides – Sand.png")
    },
    description: "Premium WBNX piece. Sand edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.85,
    popular: 105
  },
  {
    id: "wbnx-tech-slip-sand",
    name: "WBNX Tech Slip – Sand",
    category: "Slides",
    price: 44,
    color: "Sand",
    images: {
      front: SHOP_IMG("WBNX Tech Slip – Sand (Front View).png"),
      back: SHOP_IMG("WBNX Tech Slip – Sand.png")
    },
    description: "Premium WBNX piece. Sand edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.90,
    popular: 104
  },
  {
    id: "wbnx-core-low-black",
    name: "WBNX Core Low – Black and White",
    category: "Sneakers",
    price: 120,
    color: "Black",
    images: {
      front: SHOP_IMG("WBNX Core Low – Black.png"),
      back: SHOP_IMG("WBNX Core Low – Black (Front View).png")
    },
    description: "Premium WBNX piece. Black edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.95,
    popular: 103
  },
  {
    id: "wbnx-core-low-off-white",
    name: "WBNX Core Low – Off White",
    category: "Sneakers",
    price: 122,
    color: "Off White",
    images: {
      front: SHOP_IMG("WBNX Core Low – Off White.png"),
      back: SHOP_IMG("WBNX Core Low – Off White (Front View).png")
    },
    description: "Premium WBNX piece. Off White edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.55,
    popular: 102
  },
  {
    id: "wbnx-highcore-black",
    name: "WBNX HighCore – Black",
    category: "Sneakers",
    price: 124,
    color: "Black",
    images: {
      front: SHOP_IMG("WBNX HighCore – Black.png"),
      back: SHOP_IMG("WBNX HighCore – Black (Front View).png")
    },
    description: "Premium WBNX piece. Black edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.60,
    popular: 101
  },
  {
    id: "wbnx-neoformal-navy",
    name: "WBNX NeoFormal – Navy",
    category: "Sneakers",
    price: 126,
    color: "Navy",
    images: {
      front: SHOP_IMG("WBNX NeoFormal – Navy.png"),
      back: SHOP_IMG("WBNX NeoFormal – Navy (Front View).png")
    },
    description: "Premium WBNX piece. Navy edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.65,
    popular: 100
  },
  {
    id: "wbnx-runner-x-whiteblack",
    name: "WBNX Runner X – White / Black",
    category: "Sneakers",
    price: 118,
    color: "White / Black",
    images: {
      front: SHOP_IMG("WBNX Runner X – WhiteBlack.png"),
      back: SHOP_IMG("WBNX Runner X – WhiteBlack (Front View).png")
    },
    description: "Premium WBNX piece. White / Black edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.70,
    popular: 99
  },
  {
    id: "wbnx-core-tee-black",
    name: "WBNX Core Tee – Black",
    category: "Tees",
    price: 42,
    color: "Black",
    images: {
      front: SHOP_IMG("WBNX Core Tee – Black.png"),
      back: SHOP_IMG("WBNX Core Tee – Black (Back Edition).png")
    },
    description: "Premium WBNX piece. Black edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.75,
    popular: 98
  },
  {
    id: "wbnx-core-tee-jet-black",
    name: "WBNX Core Tee – Jet Black",
    category: "Tees",
    price: 44,
    color: "Jet Black",
    images: {
      front: SHOP_IMG("WBNX Core Tee – Jet Black.png"),
      back: SHOP_IMG("WBNX Core Tee – Jet Black (Back Edition).png")
    },
    description: "Premium WBNX piece. Jet Black edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.80,
    popular: 97
  },
  {
    id: "wbnx-core-tee-navy",
    name: "WBNX Core Tee – Navy Blue",
    category: "Tees",
    price: 46,
    color: "Navy",
    images: {
      front: SHOP_IMG("WBNX Core Tee – Navy.png"),
      back: SHOP_IMG("WBNX Core Tee – Navy (Back Edition).png")
    },
    description: "Premium WBNX piece. Navy edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.85,
    popular: 96
  },
  {
    id: "wbnx-core-tee-off-white",
    name: "WBNX Core Tee – Off White",
    category: "Tees",
    price: 48,
    color: "Off White",
    images: {
      front: SHOP_IMG("WBNX Core Tee – Off White.png"),
      back: SHOP_IMG("WBNX Core Tee – Off White (Back Edition).png")
    },
    description: "Premium WBNX piece. Off White edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.90,
    popular: 95
  },
  {
    id: "wbnx-core-tee-white",
    name: "WBNX Core Tee – White Special",
    category: "Tees",
    price: 40,
    color: "White",
    images: {
      front: SHOP_IMG("WBNX Core Tee – White.png"),
      back: SHOP_IMG("WBNX Core Tee – White (Back Edition).png")
    },
    description: "Premium WBNX piece. White edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.95,
    popular: 94
  },
  {
    id: "wbnx-essential-tee-pure-white",
    name: "WBNX Essential Tee – Pure White",
    category: "Tees",
    price: 42,
    color: "Pure White",
    images: {
      front: SHOP_IMG("WBNX Essential Tee – Pure White.png"),
      back: SHOP_IMG("WBNX Essential Tee – Pure White (Back Edition).png")
    },
    description: "Premium WBNX piece. Pure White edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.55,
    popular: 93
  },
  {
    id: "wbnx-split-tee-blackwhite",
    name: "WBNX Split Tee – Black / White",
    category: "Tees",
    price: 44,
    color: "Black / White",
    images: {
      front: SHOP_IMG("WBNX Split Tee – BlackWhite.png"),
      back: SHOP_IMG("WBNX Split Tee – BlackWhite (Back Edition).png")
    },
    description: "Premium WBNX piece. Black / White edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.60,
    popular: 92
  },
  {
    id: "wbnx-studio-tee-dark-washed",
    name: "WBNX Studio Tee – Dark Washed",
    category: "Tees",
    price: 46,
    color: "Dark Washed",
    images: {
      front: SHOP_IMG("WBNX Studio Tee – Dark Washed.png"),
      back: SHOP_IMG("WBNX Studio Tee – Dark Washed (Back Edition).png")
    },
    description: "Premium WBNX piece. Dark Washed edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.65,
    popular: 91
  },
  {
    id: "wbnx-studio-tee-washed-gray",
    name: "WBNX Studio Tee – Washed Gray",
    category: "Tees",
    price: 48,
    color: "Washed Gray",
    images: {
      front: SHOP_IMG("WBNX Studio Tee – Washed Gray.png"),
      back: SHOP_IMG("WBNX Studio Tee – Washed Gray (Back Edition).png")
    },
    description: "Premium WBNX piece. Washed Gray edition.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    rating: 4.70,
    popular: 90
  }
]

/** All + only categories that have at least one product in SHOP_PRODUCTS. */
export const SHOP_CATEGORIES = [
  'All',
  ...SHOP_CATEGORY_ORDER.filter((c) => SHOP_PRODUCTS.some((p) => p.category === c))
]

export const SORT_OPTIONS = [
  { id: 'popular', label: 'Popular' },
  { id: 'newest', label: 'Newest' },
  { id: 'price_low', label: 'Price Low' },
  { id: 'price_high', label: 'Price High' }
]

export const SHIPPING_FLAT = 6.99
