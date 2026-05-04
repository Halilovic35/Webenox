import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..', 'src')

function walk (dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, acc)
    else if (/\.(jsx?|tsx?|css)$/.test(e.name)) acc.push(p)
  }
  return acc
}

let changed = 0
for (const file of walk(root)) {
  let s = fs.readFileSync(file, 'utf8')
  const before = s
  s = s.replace(/\u2013/g, ' ').replace(/\u2014/g, ' ')
  if (s !== before) {
    fs.writeFileSync(file, s)
    changed++
  }
}
console.log('Updated files:', changed)
