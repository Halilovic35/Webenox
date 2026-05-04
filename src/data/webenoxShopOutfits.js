import { SHOP_IMG } from './webenoxShopData'

/** Home “Shop the Look” — four vertical zones (model / campaign frames). */
export const COMBO_QUAD = [
  { outfitId: 'skyline', image: SHOP_IMG('WBNX Model – Skyline.png'), label: 'Skyline' },
  { outfitId: 'street-stack', image: SHOP_IMG('WBNX Model – Street Contrast.png'), label: 'Street' },
  { outfitId: 'urban-minimal', image: SHOP_IMG('WBNX Model – Urban Minimal.png'), label: 'Urban' },
  { outfitId: 'stone-run', image: SHOP_IMG('WBNX Campaign Model – Minimal Stone Edition.png'), label: 'Stone' }
]

/**
 * Curated outfits — productIds must exist in SHOP_PRODUCTS.
 * Prices / totals are derived live from catalog in the app.
 */
export const OUTFITS = [
  {
    id: 'urban-minimal',
    name: 'Urban Minimal',
    tagline: 'Crisp whites, mesh motion, signature runners.',
    heroImage: SHOP_IMG('WBNX Model – Urban Minimal.png'),
    items: [
      { productId: 'wbnx-core-tee-white', label: 'WBNX Core Tee – White' },
      { productId: 'wbnx-mesh-shorts-blackwhite', label: 'WBNX Mesh Shorts – Black / White' },
      { productId: 'wbnx-runner-x-whiteblack', label: 'WBNX Runner X – White / Black' }
    ]
  },
  {
    id: 'skyline',
    name: 'Skyline Run',
    tagline: 'Tech layers built for elevation and night miles.',
    heroImage: SHOP_IMG('WBNX Model – Skyline.png'),
    items: [
      { productId: 'wbnx-tech-shell-jacket-gray', label: 'WBNX Tech Shell – Gray' },
      { productId: 'wbnx-tech-joggers-black', label: 'WBNX Tech Joggers – Black' },
      { productId: 'wbnx-neoformal-navy', label: 'WBNX NeoFormal – Navy' }
    ]
  },
  {
    id: 'street-stack',
    name: 'Street Stack',
    tagline: 'Volume outerwear with core essentials.',
    heroImage: SHOP_IMG('WBNX Model – Street Contrast.png'),
    items: [
      { productId: 'wbnx-puffer-jacket-black', label: 'WBNX Puffer Jacket – Black' },
      { productId: 'wbnx-essential-tee-pure-white', label: 'WBNX Essential Tee – Pure White' },
      { productId: 'wbnx-cargo-pants-olive-green', label: 'WBNX Cargo Pants – Olive Green' }
    ]
  },
  {
    id: 'stone-run',
    name: 'Stone Run',
    tagline: 'Soft gray story with tailored motion.',
    heroImage: SHOP_IMG('WBNX Campaign Model – Minimal Stone Edition.png'),
    items: [
      { productId: 'wbnx-core-hoodie-washed-gray', label: 'WBNX Core Hoodie – Washed Gray' },
      { productId: 'wbnx-tailored-pants-charcoal-gray', label: 'WBNX Tailored Pants – Charcoal Gray' },
      { productId: 'wbnx-studio-tee-washed-gray', label: 'WBNX Studio Tee – Washed Gray' }
    ]
  }
]
