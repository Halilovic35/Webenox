import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'spa',
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  plugins: [
    react(),
    {
      name: 'webenox-ai-dev-api',
      configureServer(server) {
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY
        const OPENAI_MODEL = String(process.env.OPENAI_MODEL || 'gpt-4o-mini')

        const sendJson = (res, status, data) => {
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify(data))
        }

        const readBody = (req, limit = 120_000) =>
          new Promise((resolve, reject) => {
            let size = 0
            const chunks = []
            req.on('data', (c) => {
              size += c.length
              if (size > limit) {
                reject(new Error('payload_too_large'))
                req.destroy()
                return
              }
              chunks.push(c)
            })
            req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
            req.on('error', reject)
          })

        const safeJsonParse = (s) => {
          try {
            return { ok: true, value: JSON.parse(s) }
          } catch (e) {
            return { ok: false, error: e }
          }
        }

        const extractFirstJsonObject = (text) => {
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

        const callOpenAI = async ({ prompt, system, jsonSchemaHint }) => {
          if (!OPENAI_API_KEY) {
            const err = new Error('OPENAI_API_KEY not set')
            err.code = 'missing_openai_key'
            throw err
          }

          const inputText = [system, prompt].filter(Boolean).join('\n\n')
          const body = { model: OPENAI_MODEL, input: inputText, temperature: 0.4 }
          if (jsonSchemaHint) body.response_format = { type: 'json_object' }

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
            const err = new Error(`OpenAI error ${r.status}`)
            err.code = 'openai_error'
            err.detail = text.slice(0, 2000)
            throw err
          }

          const parsed = safeJsonParse(text)
          if (!parsed.ok) return { raw: text, outputText: text }
          const json = parsed.value
          const outputText =
            json?.output_text ||
            json?.output?.map((o) => o?.content?.map((c) => c?.text).filter(Boolean).join('')).filter(Boolean).join('\n\n') ||
            ''
          return { raw: json, outputText }
        }

        server.middlewares.use('/api/ai', async (req, res, next) => {
          try {
            if (req.method !== 'POST') return sendJson(res, 405, { error: 'method_not_allowed' })
            const body = await readBody(req)
            const parsed = safeJsonParse(body)
            if (!parsed.ok) return sendJson(res, 400, { error: 'invalid_json' })
            const data = parsed.value || {}

            const url = req.url || '/'
            if (url.startsWith('/chat')) {
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

            if (url.startsWith('/generate-website')) {
              const idea = String(data.prompt || '').slice(0, 2400)
              const system = 'You are WebenoxAI. Generate premium website concept outputs for a digital agency demo. Return ONLY valid JSON. No markdown.'
              const prompt =
                `Generate a website concept for this idea:\n"${idea}"\n\nReturn JSON with keys:\n` +
                `title (string), tagline (string), sections (string[]), features (string[]), ctas (string[]), ` +
                `palette (string[3]), ux (string[]), stack (string), notes (string).`

              const result = await callOpenAI({ prompt, system, jsonSchemaHint: true })
              const candidate = extractFirstJsonObject(result.outputText) || extractFirstJsonObject(JSON.stringify(result.raw))
              if (!candidate) return sendJson(res, 200, { text: result.outputText })
              return sendJson(res, 200, { concept: candidate })
            }

            if (url.startsWith('/create-logo')) {
              const idea = String(data.prompt || '').slice(0, 2400)
              const system = 'You are WebenoxAI. Provide premium logo direction. Return ONLY valid JSON. No markdown.'
              const prompt =
                `Brand prompt: "${idea}"\n\nReturn JSON with keys: title, keywords (string[]), typography (string), ` +
                `palette (string[3]), directions (string[]), doDont (string[]).`
              const result = await callOpenAI({ prompt, system, jsonSchemaHint: true })
              const candidate = extractFirstJsonObject(result.outputText) || extractFirstJsonObject(JSON.stringify(result.raw))
              if (!candidate) return sendJson(res, 200, { text: result.outputText })
              return sendJson(res, 200, { logo: candidate })
            }

            return sendJson(res, 404, { error: 'unknown_ai_route' })
          } catch (err) {
            if (err?.code === 'missing_openai_key') return sendJson(res, 500, { error: 'missing_openai_key' })
            return sendJson(res, 500, { error: 'server_error', detail: String(err?.detail || err?.message || err) })
          }
        })
      }
    }
  ],
}) 