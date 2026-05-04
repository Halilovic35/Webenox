import http from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.join(__dirname, 'dist')
const port = Number(process.env.PORT || 4173)

if (!existsSync(distDir) || !statSync(distDir).isDirectory()) {
  console.error('[server] dist/ not found. Did the build run?')
  process.exit(1)
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.glb': 'model/gltf-binary',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json; charset=utf-8'
}

function safeJoin(base, urlPath) {
  const cleaned = urlPath.replace(/\0/g, '')
  const withoutQuery = cleaned.split('?')[0].split('#')[0]
  const rel = withoutQuery.replace(/^\/+/, '')
  const full = path.join(base, rel)
  if (!full.startsWith(base)) return null
  return full
}

function sendFile(res, absPath) {
  const ext = path.extname(absPath).toLowerCase()
  res.statusCode = 200
  res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream')
  // Cache assets aggressively; keep HTML short-lived.
  if (ext === '.html') res.setHeader('Cache-Control', 'no-cache')
  else res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  createReadStream(absPath).pipe(res)
}

const server = http.createServer((req, res) => {
  const urlPath = req.url || '/'

  // Healthcheck
  if (urlPath === '/health' || urlPath === '/healthz') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('ok')
    return
  }

  const candidate = safeJoin(distDir, urlPath)
  if (candidate && existsSync(candidate) && statSync(candidate).isFile()) {
    return sendFile(res, candidate)
  }

  // SPA fallback to index.html
  const indexPath = path.join(distDir, 'index.html')
  if (existsSync(indexPath)) return sendFile(res, indexPath)

  res.statusCode = 500
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('dist/index.html not found')
})

server.listen(port, '0.0.0.0', () => {
  console.log(`[server] serving ${distDir}`)
  console.log(`[server] listening on 0.0.0.0:${port}`)
})

