import http from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.join(__dirname, 'dist')
const port = Number(process.env.PORT || 4173)
const PREVIEW_PASSWORD = String(process.env.PREVIEW_PASSWORD || '1952')
const PREVIEW_COOKIE = 'webenox_preview=1'

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
  let decoded = withoutQuery
  try {
    decoded = decodeURIComponent(withoutQuery)
  } catch {
    // keep undecoded if malformed
  }
  const rel = decoded.replace(/^\/+/, '')
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

function getCookieHeader(req) {
  const h = req.headers?.cookie
  return typeof h === 'string' ? h : ''
}

function isAuthed(req) {
  const cookie = getCookieHeader(req)
  return cookie.includes(PREVIEW_COOKIE)
}

function readBody(req, limitBytes = 10_000) {
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on('data', (c) => {
      size += c.length
      if (size > limitBytes) {
        reject(new Error('payload_too_large'))
        req.destroy()
        return
      }
      chunks.push(c)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function parseUrlEncoded(body) {
  const out = {}
  for (const part of String(body || '').split('&')) {
    if (!part) continue
    const [k, v] = part.split('=')
    const key = decodeURIComponent((k || '').replace(/\+/g, ' '))
    const val = decodeURIComponent((v || '').replace(/\+/g, ' '))
    if (key) out[key] = val
  }
  return out
}

function sendLockScreen(res, opts = {}) {
  const { error } = opts
  res.statusCode = 401
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Webenox — Private Preview</title>
    <style>
      :root { color-scheme: dark; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: radial-gradient(1200px 700px at 20% 15%, rgba(0,201,255,0.18), transparent 55%), radial-gradient(1000px 600px at 85% 85%, rgba(146,95,226,0.14), transparent 55%), #05070c; color: rgba(255,255,255,0.92); font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
      .card { width: min(420px, calc(100vw - 32px)); border-radius: 24px; border: 1px solid rgba(255,255,255,0.12); background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)); box-shadow: 0 40px 120px -60px rgba(0,0,0,0.9); padding: 22px; backdrop-filter: blur(10px); }
      .title { font-weight: 900; font-size: 18px; letter-spacing: 0.2px; }
      .sub { margin-top: 8px; font-size: 12px; line-height: 1.5; color: rgba(255,255,255,0.62); }
      .row { margin-top: 14px; display: flex; gap: 10px; }
      input { flex: 1; height: 44px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.14); background: rgba(0,0,0,0.35); color: rgba(255,255,255,0.92); padding: 0 14px; outline: none; }
      input:focus { border-color: rgba(0,201,255,0.45); box-shadow: 0 0 0 3px rgba(0,201,255,0.18); }
      button { height: 44px; padding: 0 16px; border-radius: 14px; border: 1px solid rgba(0,201,255,0.28); background: linear-gradient(90deg, rgba(0,201,255,0.9), rgba(146,95,226,0.9)); color: #06080f; font-weight: 900; cursor: pointer; }
      button:active { transform: scale(0.98); }
      .err { margin-top: 10px; font-size: 12px; color: rgba(255, 120, 120, 0.95); }
      .foot { margin-top: 14px; font-size: 11px; color: rgba(255,255,255,0.5); }
    </style>
  </head>
  <body>
    <main class="card">
      <div class="title">Private preview</div>
      <div class="sub">This website is not finished yet. Enter the password to continue.</div>
      <form class="row" method="POST" action="/__auth">
        <input name="password" type="password" placeholder="Password" autocomplete="current-password" autofocus />
        <button type="submit">Enter</button>
      </form>
      ${error ? `<div class="err">${error}</div>` : ``}
      <div class="foot">Webenox</div>
    </main>
  </body>
</html>`)
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

  // Password gate: allow login/logout endpoints without auth
  if (urlPath.startsWith('/__auth')) {
    if (req.method !== 'POST') return sendLockScreen(res)
    readBody(req)
      .then((body) => {
        const parsed = parseUrlEncoded(body)
        const pass = String(parsed.password || '')
        if (pass !== PREVIEW_PASSWORD) {
          return sendLockScreen(res, { error: 'Wrong password' })
        }
        res.statusCode = 302
        res.setHeader('Location', '/')
        // 30 days cookie, secure on https
        res.setHeader(
          'Set-Cookie',
          `${PREVIEW_COOKIE}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000; Secure`
        )
        res.end()
      })
      .catch(() => sendLockScreen(res, { error: 'Try again' }))
    return
  }

  if (urlPath.startsWith('/__logout')) {
    res.statusCode = 302
    res.setHeader('Location', '/')
    res.setHeader('Set-Cookie', `webenox_preview=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`)
    res.end()
    return
  }

  if (!isAuthed(req)) {
    return sendLockScreen(res)
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

