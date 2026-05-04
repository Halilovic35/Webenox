import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'public', 'images', 'webenoxshop')

const files = new Set(fs.readdirSync(dir).filter((f) => f.endsWith('.png')))

function readRefs(p) {
  const s = fs.readFileSync(path.join(root, p), 'utf8')
  const refs = new Set()
  const re = /SHOP_IMG\(\s*["']([^"']+)["']\s*\)/g
  let m
  while ((m = re.exec(s))) refs.add(m[1])
  return refs
}

const refs = new Set([
  ...readRefs('src/data/webenoxShopData.js'),
  ...readRefs('src/data/webenoxShopOutfits.js')
])

const missing = [...refs].filter((r) => !files.has(r)).sort()
const unused = [...files].filter((f) => !refs.has(f)).sort()

console.log('Referenced:', refs.size)
console.log('PNG files on disk:', files.size)
console.log('')
if (missing.length) {
  console.log('MISSING FILES (referenced but not on disk):')
  missing.forEach((x) => console.log(' ', x))
  process.exitCode = 1
} else {
  console.log('OK: every SHOP_IMG reference has a matching file.')
}
console.log('')
if (unused.length) {
  console.log('UNUSED PNGs (on disk, not in SHOP_IMG refs):')
  unused.forEach((x) => console.log(' ', x))
} else {
  console.log('OK: every PNG is referenced.')
}
