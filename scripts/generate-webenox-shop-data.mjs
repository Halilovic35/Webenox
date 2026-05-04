import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'public', 'images', 'webenoxshop')
const outFile = path.join(root, 'src', 'data', 'webenoxShopData.js')

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.png')).sort()

function parseFile(name) {
  const base = name.replace(/\.png$/i, '')
  const sep = ' – '
  const idx = base.indexOf(sep)
  if (idx === -1) return null
  return { productLine: base.slice(0, idx).trim(), rest: base.slice(idx + sep.length).trim(), full: name }
}

function stripMods(rest) {
  return rest
    .replace(/\s*\(Front View\)\s*$/i, '')
    .replace(/\s*\(Back Edition\)\s*$/i, '')
    .trim()
}

function slug(s) {
  let x = s
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
  if (!x.startsWith('wbnx')) x = `wbnx-${x}`
  return x.slice(0, 80)
}

function categoryFor(line) {
  const L = line.toLowerCase()
  if (/model|campaign/.test(L)) return 'Campaign'
  if (/runner|core low|highcore|neoformal/.test(L)) return 'Sneakers'
  if (/zip hoodie|statement hoodie|hoodie/.test(L)) return 'Hoodies'
  if (/tee|split/.test(L)) return 'Tees'
  if (/sweatpants|joggers|cargo pants|tailored pants/.test(L)) return 'Pants'
  if (/shorts|mesh|utility/.test(L)) return 'Shorts'
  if (/jacket|puffer|shell|varsity/.test(L)) return 'Jackets'
  if (/slides|slip/.test(L)) return 'Slides'
  return 'Tees'
}

function priceFor(cat) {
  const map = {
    Sneakers: 118,
    Slides: 44,
    Tees: 40,
    Hoodies: 92,
    Pants: 76,
    Shorts: 50,
    Jackets: 175,
    Campaign: 24
  }
  return map[cat] ?? 42
}

/** Filename rules: back = Back Edition or (Back); front = Front View or (Front). */
function isBackImage(f) {
  if (/Back Edition/i.test(f)) return true
  if (/\(Back\)/i.test(f)) return true
  return false
}

function isFrontImage(f) {
  if (/Front View/i.test(f)) return true
  if (/\(Front\)/i.test(f)) return true
  return false
}

function pickImages(arr) {
  if (!arr.length) return null
  const backs = arr.filter(isBackImage)
  const explicitFronts = arr.filter(isFrontImage)
  const neutral = arr.filter((f) => !isBackImage(f) && !isFrontImage(f))
  const nonBack = arr.filter((f) => !isBackImage(f))

  const backExplicit = backs[0] || null

  let front
  if (nonBack.length) {
    front = explicitFronts[0] || neutral[0] || nonBack[0]
  } else {
    front = arr[0]
  }

  let back = backExplicit
  if (!back) {
    back =
      neutral.find((f) => f !== front) ||
      arr.find((f) => f !== front && !isBackImage(f)) ||
      explicitFronts.find((f) => f !== front) ||
      front
  }

  let detail =
    neutral.find((f) => f !== front && f !== back) ||
    (explicitFronts[1] && explicitFronts[1] !== front ? explicitFronts[1] : null) ||
    null
  if (detail === front || detail === back) detail = null

  return { front, back: back || front, detail }
}

function colorLabel(key) {
  if (key === 'BlackWhite') return 'Black / White'
  if (key === 'WhiteBlack') return 'White / Black'
  return key.replace(/([a-z])([A-Z])/g, '$1 $2')
}

const groups = new Map()
for (const f of files) {
  const p = parseFile(f)
  if (!p) continue
  const colorKey = stripMods(p.rest)
  const gkey = `${p.productLine}|||${colorKey}`
  if (!groups.has(gkey)) groups.set(gkey, [])
  groups.get(gkey).push(f)
}

const rows = []
for (const [gkey, flist] of groups) {
  const [productLine, colorKey] = gkey.split('|||')
  const imgs = pickImages(flist)
  const cat = categoryFor(productLine)
  const id = slug(`${productLine} ${colorKey}`.replace(/^WBNX\s+/i, ''))
  rows.push({ id, productLine, colorKey, cat, imgs })
}

rows.sort((a, b) => {
  if (a.cat !== b.cat) return a.cat.localeCompare(b.cat)
  if (a.productLine !== b.productLine) return a.productLine.localeCompare(b.productLine)
  return a.colorKey.localeCompare(b.colorKey)
})

const lines = []
lines.push(`/** Built from all PNGs in public/images/webenoxshop (regenerate: node scripts/generate-webenox-shop-data.mjs). */`)
lines.push(`export const SHOP_IMG = (filename) => \`/images/webenoxshop/\${encodeURIComponent(filename)}\``)
lines.push('')
lines.push(`export const WEBENOX_LOGO_SRC = '/images/wlogo.png'`)
lines.push('')
lines.push(`export const SHOP_HERO_SRC = SHOP_IMG('WBNX Model – Street Contrast.png')`)
lines.push('')
lines.push(
  `export const SHOP_CATEGORY_ORDER = ['Sneakers', 'Tees', 'Hoodies', 'Pants', 'Shorts', 'Jackets', 'Slides']`
)
lines.push('')
lines.push(`export const SHOP_PRODUCTS = [`)

let popular = 130
rows.forEach((r, idx) => {
  const displayName = `${r.productLine} – ${colorLabel(r.colorKey)}`
  const color = colorLabel(r.colorKey)
  const desc =
    r.cat === 'Campaign'
      ? 'Editorial campaign frame — premium WBNX mood.'
      : `Premium WBNX piece. ${color} edition.`
  const price = priceFor(r.cat) + (r.cat === 'Campaign' ? 0 : idx % 5) * 2
  const featured = r.cat !== 'Campaign' && idx < 12
  const rating = (4.55 + (idx % 9) * 0.05).toFixed(2)
  popular -= 1
  const img = (fn) => `SHOP_IMG(${JSON.stringify(fn)})`
  lines.push(`  {`)
  lines.push(`    id: ${JSON.stringify(r.id)},`)
  lines.push(`    name: ${JSON.stringify(displayName)},`)
  lines.push(`    category: ${JSON.stringify(r.cat)},`)
  lines.push(`    price: ${price},`)
  lines.push(`    color: ${JSON.stringify(color)},`)
  lines.push(`    images: {`)
  lines.push(`      front: ${img(r.imgs.front)},`)
  lines.push(`      back: ${img(r.imgs.back)}${r.imgs.detail ? `,\n      detail: ${img(r.imgs.detail)}` : ''}`)
  lines.push(`    },`)
  lines.push(`    description: ${JSON.stringify(desc)},`)
  lines.push(`    sizes: ['XS', 'S', 'M', 'L', 'XL'],`)
  lines.push(`    featured: ${featured},`)
  lines.push(`    rating: ${rating},`)
  lines.push(`    popular: ${popular}`)
  lines.push(`  }${idx < rows.length - 1 ? ',' : ''}`)
})

lines.push(`]`)
lines.push('')
lines.push(`/** All + only categories that have at least one product in SHOP_PRODUCTS. */`)
lines.push(`export const SHOP_CATEGORIES = [`)
lines.push(`  'All',`)
lines.push(`  ...SHOP_CATEGORY_ORDER.filter((c) => SHOP_PRODUCTS.some((p) => p.category === c))`)
lines.push(`]`)
lines.push('')
lines.push(`export const SORT_OPTIONS = [`)
lines.push(`  { id: 'popular', label: 'Popular' },`)
lines.push(`  { id: 'newest', label: 'Newest' },`)
lines.push(`  { id: 'price_low', label: 'Price Low' },`)
lines.push(`  { id: 'price_high', label: 'Price High' }`)
lines.push(`]`)
lines.push('')
lines.push(`export const SHIPPING_FLAT = 6.99`)
lines.push('')

fs.writeFileSync(outFile, lines.join('\n'), 'utf8')
console.log('Wrote', rows.length, 'products to', outFile)
