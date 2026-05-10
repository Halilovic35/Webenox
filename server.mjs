import http from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import crypto from 'node:crypto'
import OpenAI from 'openai'
import { PrismaClient } from '@prisma/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.join(__dirname, 'dist')
const port = Number(process.env.PORT || 4173)
const PREVIEW_PASSWORD = String(process.env.PREVIEW_PASSWORD || '1952')
const PREVIEW_COOKIE = 'webenox_preview=1'
const DISABLE_PREVIEW_AUTH =
  process.env.DISABLE_PREVIEW_AUTH === '1' ||
  process.env.DISABLE_PREVIEW_AUTH === 'true' ||
  process.env.PUBLIC_SITE === '1'
const DEBUG_ERRORS =
  process.env.DEBUG_ERRORS === '1' ||
  process.env.DEBUG_ERRORS === 'true' ||
  process.env.NODE_ENV === 'development'
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_MODEL = String(process.env.OPENAI_MODEL || 'gpt-4o-mini')
const DATABASE_URL = process.env.DATABASE_URL

const prisma = DATABASE_URL ? new PrismaClient() : null
const openai = OPENAI_API_KEY ? new OpenAI({ apiKey: OPENAI_API_KEY }) : null

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

/** Railway / reverse proxies terminate TLS; Node sees HTTP unless we read forwarded proto. */
function isHttpsRequest(req) {
  const xf = String(req.headers?.['x-forwarded-proto'] || '').split(',')[0].trim().toLowerCase()
  if (xf === 'https') return true
  if (String(req.headers?.['x-forwarded-ssl'] || '').toLowerCase() === 'on') return true
  return false
}

function previewCookieAttrs(req) {
  const secure = isHttpsRequest(req) ? '; Secure' : ''
  return `Path=/; HttpOnly; SameSite=Lax${secure}`
}

function isPublicStaticPath(pathOnly, method) {
  if (method !== 'GET') return false
  if (pathOnly === '/site.webmanifest' || pathOnly === '/manifest.json') return true
  if (pathOnly === '/favicon.ico' || pathOnly === '/robots.txt' || pathOnly === '/sitemap.xml') return true
  if (pathOnly.startsWith('/assets/') || pathOnly.startsWith('/images/')) return true
  return false
}

function tryServePublicDist(req, res, pathOnly) {
  if (!isPublicStaticPath(pathOnly, req.method || 'GET')) return false
  const candidate = safeJoin(distDir, pathOnly)
  if (candidate && existsSync(candidate) && statSync(candidate).isFile()) {
    sendFile(res, candidate)
    return true
  }
  return false
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

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(data))
}

function safeJsonParse(s) {
  try {
    return { ok: true, value: JSON.parse(s) }
  } catch (e) {
    return { ok: false, error: e }
  }
}

function getHeader(req, name) {
  const v = req.headers?.[name.toLowerCase()]
  return typeof v === 'string' ? v : ''
}

function getAnonId(req, parsedBody) {
  const fromHeader = getHeader(req, 'x-webenox-anon')
  const fromBody = parsedBody?.anonId
  const raw = String(fromHeader || fromBody || '').trim()
  if (raw) return raw.slice(0, 80)
  return `anon_${crypto.randomUUID()}`
}

async function getOrCreateUserByAnonId(anonId) {
  if (!prisma) {
    const err = new Error('DATABASE_URL not set')
    err.code = 'missing_database_url'
    throw err
  }
  const existing = await prisma.user.findUnique({ where: { anonId } })
  if (existing) return existing
  return await prisma.user.create({ data: { anonId } })
}

/** Avoid dozens of threads all titled "hi" — use timestamp label for generic openers. */
function threadTitleFromFirstMessage(text) {
  const t = String(text || '')
    .trim()
    .replace(/\s+/g, ' ')
  if (!t) return 'Chat'
  const noEndPunct = t.replace(/[.!?…]+$/u, '').trim()
  const generic = /^(hi|hey|hello|hej|hola|yo|ok+|okay|yes|no|hvala|thanks?|thank you|hallo|test(ing)?)$/iu.test(noEndPunct)
  if (t.length <= 22 && generic) {
    const fmt = new Intl.DateTimeFormat('en-GB', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    return `Chat · ${fmt.format(new Date())}`
  }
  return t.length > 76 ? `${t.slice(0, 73)}…` : t
}

/** If the stored title is a short placeholder, replace from user text or first AI line. */
function improvedThreadTitle(existingTitle, userMessage, aiText) {
  const ex = String(existingTitle || '').trim()
  const exCore = ex.replace(/[.!?…]+$/u, '').trim()
  const looksPlaceholder = ex.length <= 3 || /^(hi|hey|hello|hej|yo|ok+|\.{2,}|…+)$/iu.test(exCore)
  if (!looksPlaceholder) return null
  const um = String(userMessage || '').trim().replace(/\s+/g, ' ')
  if (um.length >= 18) return um.length > 76 ? `${um.slice(0, 73)}…` : um
  const lines = String(aiText || '')
    .replace(/\*+/g, ' ')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
  const first = lines.find((l) => !/^#{1,6}\s/.test(l)) || lines[0] || ''
  const cleaned = first.replace(/^[-*]\s+/, '').replace(/^#{1,6}\s*/, '').trim()
  if (cleaned.length >= 14) return cleaned.length > 80 ? `${cleaned.slice(0, 77)}…` : cleaned
  return null
}

async function openaiText({ system, prompt, temperature = 0.4 }) {
  if (!openai) {
    const err = new Error('OPENAI_API_KEY not set')
    err.code = 'missing_openai_key'
    throw err
  }
  const input = [system, prompt].filter(Boolean).join('\n\n')
  const baseBody = { model: OPENAI_MODEL, input }
  const tryBody = temperature == null ? baseBody : { ...baseBody, temperature }
  let resp
  try {
    resp = await openai.responses.create(tryBody)
  } catch (e) {
    const msg = String(e?.message || '')
    if (String(e?.status || '') === '400' && msg.includes("Unsupported parameter: 'temperature'")) {
      resp = await openai.responses.create(baseBody)
    } else {
      throw e
    }
  }
  return String(resp.output_text || '').trim()
}

async function openaiJson({ system, prompt }) {
  if (!openai) {
    const err = new Error('OPENAI_API_KEY not set')
    err.code = 'missing_openai_key'
    throw err
  }
  const input = [system, prompt].filter(Boolean).join('\n\n')
  const baseBody = {
    model: OPENAI_MODEL,
    input,
    response_format: { type: 'json_object' }
  }
  let resp
  try {
    resp = await openai.responses.create({ ...baseBody, temperature: 0.35 })
  } catch (e) {
    const msg = String(e?.message || '')
    if (String(e?.status || '') === '400' && msg.includes("Unsupported parameter: 'temperature'")) {
      resp = await openai.responses.create(baseBody)
    } else {
      throw e
    }
  }
  const text = String(resp.output_text || '').trim()
  const parsed = safeJsonParse(text)
  if (parsed.ok) return parsed.value
  const fallback = extractFirstJsonObject(text)
  if (fallback) return fallback
  const err = new Error('invalid_json_from_openai')
  err.code = 'invalid_json_from_openai'
  err.detail = text.slice(0, 2000)
  throw err
}

function extractFirstJsonObject(text) {
  const s = String(text || '')
  const start = s.indexOf('{')
  if (start < 0) return null
  let depth = 0
  for (let i = start; i < s.length; i++) {
    const ch = s[i]
    if (ch === '{') depth++
    else if (ch === '}') depth--
    if (depth === 0) {
      const candidate = s.slice(start, i + 1)
      const parsed = safeJsonParse(candidate)
      if (parsed.ok) return parsed.value
      return null
    }
  }
  return null
}

async function callOpenAI({ prompt, system, jsonSchemaHint }) {
  if (!OPENAI_API_KEY) {
    const err = new Error('OPENAI_API_KEY not set')
    err.code = 'missing_openai_key'
    throw err
  }

  const inputText = [system, prompt].filter(Boolean).join('\n\n')
  const body = {
    model: OPENAI_MODEL,
    input: inputText,
    temperature: 0.4
  }

  if (jsonSchemaHint) {
    body.response_format = { type: 'json_object' }
  }

  const r = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const text = await r.text()
  if (!r.ok) {
    // Some models (e.g. reasoning models) reject temperature; retry once without it.
    if (r.status === 400 && String(text).includes("Unsupported parameter: 'temperature'")) {
      const body2 = { ...body }
      delete body2.temperature
      const r2 = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body2)
      })
      const text2 = await r2.text()
      if (!r2.ok) {
        const err = new Error(`OpenAI error ${r2.status}`)
        err.code = 'openai_error'
        err.status = r2.status
        err.detail = text2.slice(0, 2000)
        throw err
      }
      const parsed2 = safeJsonParse(text2)
      if (!parsed2.ok) return { raw: text2, outputText: text2 }
      const json2 = parsed2.value
      const outputText2 =
        json2?.output_text ||
        json2?.output?.map((o) => o?.content?.map((c) => c?.text).filter(Boolean).join('')).filter(Boolean).join('\n\n') ||
        ''
      return { raw: json2, outputText: outputText2 }
    }
    const err = new Error(`OpenAI error ${r.status}`)
    err.code = 'openai_error'
    err.status = r.status
    err.detail = text.slice(0, 2000)
    throw err
  }

  const parsed = safeJsonParse(text)
  if (!parsed.ok) return { raw: text, outputText: text }

  // responses API usually returns output_text in multiple places; use convenience if present.
  const json = parsed.value
  const outputText =
    json?.output_text ||
    json?.output?.map((o) => o?.content?.map((c) => c?.text).filter(Boolean).join('')).filter(Boolean).join('\n\n') ||
    ''

  return { raw: json, outputText }
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
    <title>Webenox · Private Preview</title>
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
  const pathOnly = urlPath.split('?')[0] || '/'

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
        res.setHeader('Set-Cookie', `${PREVIEW_COOKIE}; ${previewCookieAttrs(req)}; Max-Age=2592000`)
        res.end()
      })
      .catch(() => sendLockScreen(res, { error: 'Try again' }))
    return
  }

  if (urlPath.startsWith('/__logout')) {
    res.statusCode = 302
    res.setHeader('Location', '/')
    res.setHeader('Set-Cookie', `webenox_preview=; ${previewCookieAttrs(req)}; Max-Age=0`)
    res.end()
    return
  }

  // PWA / static: do not require preview cookie (no secrets in these files).
  if (tryServePublicDist(req, res, pathOnly)) return

  if (!DISABLE_PREVIEW_AUTH && !isAuthed(req)) {
    return sendLockScreen(res)
  }

  // --- WebenoxAI API (Postgres + OpenAI) ---
  if (urlPath.startsWith('/api/webenoxai/')) {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204
      res.end()
      return
    }

    const method = req.method || 'GET'
    const pathOnly = urlPath.split('?')[0]

    const fail = (err) => {
      console.error('[webenoxai]', err?.code || err?.name || 'error', err?.message || err)
      if (err?.stack) console.error(err.stack)
      if (err?.code === 'missing_openai_key') return sendJson(res, 500, { error: 'missing_openai_key' })
      if (err?.code === 'missing_database_url') return sendJson(res, 500, { error: 'missing_database_url' })
      if (err?.code === 'invalid_json_from_openai') return sendJson(res, 502, { error: 'invalid_json_from_openai', detail: err.detail })
      if (err?.code === 'openai_error')
        return sendJson(res, 502, { error: 'openai_error', status: err.status, detail: err.detail })
      const code = err?.code || err?.name
      return sendJson(res, 500, {
        error: 'server_error',
        code: code ? String(code) : undefined,
        detail: String(err?.message || err),
        stack: DEBUG_ERRORS ? String(err?.stack || '') : undefined
      })
    }

    // GET /api/webenoxai/health
    if (method === 'GET' && pathOnly === '/api/webenoxai/health') {
      return sendJson(res, 200, {
        ok: true,
        auth: DISABLE_PREVIEW_AUTH ? 'disabled' : isAuthed(req) ? 'authed' : 'locked',
        prisma: Boolean(prisma),
        openai: Boolean(openai),
        model: OPENAI_MODEL
      })
    }

    // GET /api/webenoxai/saved
    if (method === 'GET' && pathOnly === '/api/webenoxai/saved') {
      const anonId = getAnonId(req, null)
      return getOrCreateUserByAnonId(anonId)
        .then((user) =>
          prisma.savedProject.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            take: 50
          })
        )
        .then((rows) =>
          sendJson(res, 200, {
            anonId,
            items: rows.map((r) => ({
              id: r.id,
              type: r.kind,
              title: r.title,
              summary: r.summary,
              payload: r.payload,
              createdAt: r.createdAt
            }))
          })
        )
        .catch(fail)
    }

    // POST /api/webenoxai/saved
    if (method === 'POST' && pathOnly === '/api/webenoxai/saved') {
      return readBody(req, 120_000)
        .then(async (body) => {
          const parsed = safeJsonParse(body)
          if (!parsed.ok) return sendJson(res, 400, { error: 'invalid_json' })
          const data = parsed.value || {}
          const anonId = getAnonId(req, data)
          const user = await getOrCreateUserByAnonId(anonId)
          const kind = String(data.type || data.kind || 'saved').slice(0, 32)
          const title = String(data.title || 'Untitled').slice(0, 160)
          const summary = String(data.summary || '').slice(0, 800)
          const payload = data.payload ?? {}
          const row = await prisma.savedProject.create({
            data: { userId: user.id, kind, title, summary, payload }
          })
          return sendJson(res, 200, {
            anonId,
            item: { id: row.id, type: row.kind, title: row.title, summary: row.summary, payload: row.payload, createdAt: row.createdAt }
          })
        })
        .catch(fail)
    }

    // DELETE /api/webenoxai/saved/:id
    if (method === 'DELETE' && pathOnly.startsWith('/api/webenoxai/saved/')) {
      const id = pathOnly.split('/').pop()
      const anonId = getAnonId(req, null)
      return getOrCreateUserByAnonId(anonId)
        .then(async (user) => {
          const row = await prisma.savedProject.findFirst({ where: { id, userId: user.id } })
          if (!row) return sendJson(res, 404, { error: 'not_found' })
          await prisma.savedProject.delete({ where: { id: row.id } })
          return sendJson(res, 200, { ok: true, anonId })
        })
        .catch(fail)
    }

    // POST /api/webenoxai/chat
    if (method === 'POST' && pathOnly === '/api/webenoxai/chat') {
      return readBody(req, 120_000)
        .then(async (body) => {
          const parsed = safeJsonParse(body)
          if (!parsed.ok) return sendJson(res, 400, { error: 'invalid_json' })
          const data = parsed.value || {}
          const anonId = getAnonId(req, data)
          const user = await getOrCreateUserByAnonId(anonId)

          const message = String(data.message || '').trim()
          if (!message) return sendJson(res, 400, { error: 'missing_message' })

          let convoId = String(data.conversationId || '').trim()
          let convo = null
          if (convoId) {
            convo = await prisma.aIConversation.findFirst({ where: { id: convoId, userId: user.id } })
          }
          if (!convo) {
            convo = await prisma.aIConversation.create({
              data: { userId: user.id, title: threadTitleFromFirstMessage(message) }
            })
            convoId = convo.id
          }

          const prev = await prisma.aIMessage.findMany({
            where: { conversationId: convoId },
            orderBy: { createdAt: 'asc' },
            take: 18
          })

          await prisma.aIMessage.create({
            data: { userId: user.id, conversationId: convoId, role: 'user', content: message }
          })

          const system =
            'You are WebenoxAI — a premium general-purpose AI assistant. ' +
            'Answer any question (business, design, code, marketing, strategy, writing, learning, planning). ' +
            'Be concise, structured, and actionable. Use short sections, bullets, and next steps when helpful. No fluff.'

          const prompt =
            `Conversation:\n` +
            prev
              .slice(-10)
              .map((m) => `${m.role === 'user' ? 'User' : 'AI'}: ${String(m.content || '').slice(0, 1400)}`)
              .join('\n') +
            `\n\nUser:\n${message}`

          const aiText = await openaiText({ system, prompt })

          const aiRow = await prisma.aIMessage.create({
            data: { userId: user.id, conversationId: convoId, role: 'assistant', content: aiText }
          })

          // Bump thread order + fix placeholder titles (Prisma does not auto-touch parent on child rows).
          const patch = { updatedAt: new Date() }
          const nextTitle = improvedThreadTitle(convo?.title, message, aiText)
          if (nextTitle) patch.title = nextTitle
          await prisma.aIConversation.update({ where: { id: convoId }, data: patch })

          return sendJson(res, 200, {
            anonId,
            conversationId: convoId,
            message: { id: aiRow.id, role: 'assistant', text: aiText, createdAt: aiRow.createdAt }
          })
        })
        .catch(fail)
    }

    // GET /api/webenoxai/conversations
    if (method === 'GET' && pathOnly === '/api/webenoxai/conversations') {
      const anonId = getAnonId(req, null)
      return getOrCreateUserByAnonId(anonId)
        .then((user) =>
          prisma.aIConversation.findMany({
            where: { userId: user.id },
            orderBy: { updatedAt: 'desc' },
            take: 30
          })
        )
        .then((rows) =>
          sendJson(res, 200, {
            anonId,
            conversations: rows.map((r) => ({
              id: r.id,
              title: r.title,
              createdAt: r.createdAt,
              updatedAt: r.updatedAt
            }))
          })
        )
        .catch(fail)
    }

    // GET /api/webenoxai/conversations/:id/messages
    if (method === 'GET' && pathOnly.startsWith('/api/webenoxai/conversations/') && pathOnly.endsWith('/messages')) {
      const parts = pathOnly.split('/')
      const convoId = parts[parts.length - 2]
      const anonId = getAnonId(req, null)
      return getOrCreateUserByAnonId(anonId)
        .then(async (user) => {
          const convo = await prisma.aIConversation.findFirst({ where: { id: convoId, userId: user.id } })
          if (!convo) return sendJson(res, 404, { error: 'not_found' })
          const msgs = await prisma.aIMessage.findMany({
            where: { conversationId: convoId },
            orderBy: { createdAt: 'asc' },
            take: 80
          })
          return sendJson(res, 200, {
            anonId,
            conversationId: convoId,
            messages: msgs.map((m) => ({ id: m.id, role: m.role === 'assistant' ? 'ai' : 'user', text: m.content, createdAt: m.createdAt }))
          })
        })
        .catch(fail)
    }

    // POST /api/webenoxai/generate-website
    if (method === 'POST' && pathOnly === '/api/webenoxai/generate-website') {
      return readBody(req, 120_000)
        .then(async (body) => {
          const parsed = safeJsonParse(body)
          if (!parsed.ok) return sendJson(res, 400, { error: 'invalid_json' })
          const data = parsed.value || {}
          const anonId = getAnonId(req, data)
          const user = await getOrCreateUserByAnonId(anonId)
          const idea = String(data.prompt || '').slice(0, 2400)
          const system = 'You are WebenoxAI. Return ONLY valid JSON. No markdown.'
          const prompt =
            `Generate a premium website plan for:\n"${idea}"\n\nReturn JSON with keys:\n` +
            `title, tagline, targetAudience, monetization, designDirection, palette (3 strings), ` +
            `sections (string[]), features (string[]), ctas (string[]), ux (string[]), stack (string), notes (string).`

          const concept = await openaiJson({ system, prompt })

          await prisma.generatedConcept.create({
            data: {
              userId: user.id,
              type: 'website',
              title: String(concept.title || 'Website Concept').slice(0, 160),
              prompt: idea,
              data: concept
            }
          })

          return sendJson(res, 200, { anonId, concept })
        })
        .catch(fail)
    }

    // POST /api/webenoxai/create-logo
    if (method === 'POST' && pathOnly === '/api/webenoxai/create-logo') {
      return readBody(req, 120_000)
        .then(async (body) => {
          const parsed = safeJsonParse(body)
          if (!parsed.ok) return sendJson(res, 400, { error: 'invalid_json' })
          const data = parsed.value || {}
          const anonId = getAnonId(req, data)
          const user = await getOrCreateUserByAnonId(anonId)
          const idea = String(data.prompt || '').slice(0, 2400)
          const system = 'You are WebenoxAI. Return ONLY valid JSON. No markdown.'
          const prompt =
            `Brand prompt: "${idea}"\n\nReturn JSON with keys:\n` +
            `title, keywords (string[]), typography (string), palette (string[3]), directions (string[]), doDont (string[]).`

          const logo = await openaiJson({ system, prompt })

          await prisma.generatedConcept.create({
            data: {
              userId: user.id,
              type: 'logo',
              title: String(logo.title || 'Logo Direction').slice(0, 160),
              prompt: idea,
              data: logo
            }
          })

          return sendJson(res, 200, { anonId, logo })
        })
        .catch(fail)
    }

    return sendJson(res, 404, { error: 'unknown_route' })
  }

  // --- AI API (same-origin, password-gated preview) ---
  if (urlPath.startsWith('/api/ai/')) {
    if (req.method !== 'POST') return sendJson(res, 405, { error: 'method_not_allowed' })
    return readBody(req, 120_000)
      .then(async (body) => {
        const parsed = safeJsonParse(body)
        if (!parsed.ok) return sendJson(res, 400, { error: 'invalid_json' })
        const data = parsed.value || {}

        if (urlPath.startsWith('/api/ai/chat')) {
          const messages = Array.isArray(data.messages) ? data.messages : []
          const last = messages[messages.length - 1]?.content || data.prompt || ''
          const system =
            'You are WebenoxAI, a premium creation assistant. Be concise, structured, and practical. ' +
            'Prefer bullet points, short sections, and actionable next steps. Avoid generic filler.'

          const prompt = `Conversation context:\n${messages
            .slice(-10)
            .map((m) => `${m.role === 'user' ? 'User' : 'AI'}: ${String(m.content || '').slice(0, 1200)}`)
            .join('\n')}\n\nUser request:\n${String(last).slice(0, 2000)}`

          const result = await callOpenAI({ prompt, system })
          return sendJson(res, 200, { text: result.outputText })
        }

        if (urlPath.startsWith('/api/ai/generate-website')) {
          const idea = String(data.prompt || '').slice(0, 2400)
          const system =
            'You are WebenoxAI. Generate premium website concept outputs for a digital agency demo. ' +
            'Return ONLY valid JSON. No markdown.'

          const jsonSchemaHint = true
          const prompt = `Generate a website concept for this idea:\n"${idea}"\n\nReturn JSON with keys:\n` +
            `title (string), tagline (string), sections (string[]), features (string[]), ctas (string[]), ` +
            `palette (string[3]), ux (string[]), stack (string), notes (string).`

          const result = await callOpenAI({ prompt, system, jsonSchemaHint })
          const candidate = extractFirstJsonObject(result.outputText) || extractFirstJsonObject(JSON.stringify(result.raw))
          if (!candidate) return sendJson(res, 200, { text: result.outputText })
          return sendJson(res, 200, { concept: candidate })
        }

        if (urlPath.startsWith('/api/ai/create-logo')) {
          const idea = String(data.prompt || '').slice(0, 2400)
          const system =
            'You are WebenoxAI. Provide premium logo direction. Return ONLY valid JSON. No markdown.'
          const jsonSchemaHint = true
          const prompt =
            `Brand prompt: "${idea}"\n\nReturn JSON with keys: title, keywords (string[]), typography (string), ` +
            `palette (string[3]), directions (string[]), doDont (string[]).`

          const result = await callOpenAI({ prompt, system, jsonSchemaHint })
          const candidate = extractFirstJsonObject(result.outputText) || extractFirstJsonObject(JSON.stringify(result.raw))
          if (!candidate) return sendJson(res, 200, { text: result.outputText })
          return sendJson(res, 200, { logo: candidate })
        }

        return sendJson(res, 404, { error: 'unknown_ai_route' })
      })
      .catch((err) => {
        if (err?.code === 'missing_openai_key') return sendJson(res, 500, { error: 'missing_openai_key' })
        return sendJson(res, 500, { error: 'server_error', detail: String(err?.detail || err?.message || err) })
      })
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
  console.log(
    `[server] preview auth: ${DISABLE_PREVIEW_AUTH ? 'disabled (PUBLIC)' : 'enabled'} | db: ${prisma ? 'on' : 'OFF'} | openai: ${openai ? 'on' : 'OFF'}`
  )
  if (prisma) {
    prisma
      .$connect()
      .then(() => console.log('[server] prisma connected'))
      .catch((e) => console.error('[server] prisma connect failed:', e?.message || e))
  }
})

