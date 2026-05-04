import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })

const WebenoxFlyGame = forwardRef(function WebenoxFlyGame({ onExit }, ref) {
  const canvasRef = useRef(null)
  const engineRef = useRef(null)
  const rafRef = useRef(null)
  const lastRef = useRef(0)
  const runningRef = useRef(false)
  const phaseRef = useRef('idle')
  const scoreRef = useRef(0)
  const audioRef = useRef(null)
  const audioReadyRef = useRef(false)

  const [phase, setPhase] = useState('idle') // idle | running | gameover
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [bgChoice, setBgChoice] = useState('Background9')
  const [volume, setVolume] = useState(70) // 0..100
  const BG_OPTIONS = useMemo(
    () => [
      { id: 'Background1', label: 'Sunrise City' },
      { id: 'Background2', label: 'Sky Breeze' },
      { id: 'Background6', label: 'Cloud Parade' },
      { id: 'Background9', label: 'Canyon Run' }
    ],
    []
  )

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    scoreRef.current = score
  }, [score])

  const ensureAudio = () => {
    if (typeof window === 'undefined') return
    if (audioReadyRef.current && audioRef.current) return
    const base = '/images/webenox-fly/Flappy%20Bird%20Assets/Sound%20Efects'
    const mk = (name) => {
      const a = new Audio(`${base}/${name}.ogg`)
      a.preload = 'auto'
      a.volume = clamp(volume / 100, 0, 1)
      return a
    }
    audioRef.current = {
      wing: mk('wing'),
      point: mk('point'),
      hit: mk('hit'),
      die: mk('die'),
      swoosh: mk('swoosh')
    }
    audioReadyRef.current = true
  }

  const playSfx = (key) => {
    if (!audioReadyRef.current || !audioRef.current) return
    const a = audioRef.current[key]
    if (!a) return
    try {
      a.currentTime = 0
      // ignore autoplay rejections; first user flap initializes audio
      a.play().catch(() => {})
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    if (!audioReadyRef.current || !audioRef.current) return
    const v = clamp(volume / 100, 0, 1)
    Object.values(audioRef.current).forEach((a) => {
      if (a) a.volume = v
    })
  }, [volume])

  const assets = useMemo(() => {
    const base = '/images/webenox-fly/Flappy%20Bird%20Assets'
    return {
      bg: `${base}/Background/${bgChoice}.png`,
      ground: `${base}/Background/ground.png`,
      pipe: `${base}/Tiles/pipe.png`,
      birdNormal: `${base}/Player/flappy04.png`,
      birdBlink: `${base}/Player/flappy05.png`
    }
  }, [bgChoice])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let mounted = true
    let imgs = { bg: null, ground: null, pipe: null, birdNormal: null, birdBlink: null }

    const state = {
      w: 0,
      h: 0,
      dpr: 1,
      birdY: 0,
      birdV: 0,
      birdX: 0,
      gravity: 1200,
      flap: -420,
      pipes: [],
      pipeSpeed: 220,
      pipeGap: 158,
      pipeW: 70,
      groundH: 78,
      blinkUntil: 0,
      groundOffset: 0,
      t: 0,
      frame: 0
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = Math.max(1, Math.floor(rect.width))
      const h = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = false
      state.w = w
      state.h = h
      state.dpr = dpr
      state.birdX = Math.round(w * 0.33)
      if (phaseRef.current === 'idle') state.birdY = Math.round(h * 0.46)
    }

    const reset = () => {
      state.birdY = Math.round(state.h * 0.46)
      state.birdV = 0
      state.pipes = []
      state.t = 0
      state.frame = 0
      state.groundOffset = 0
      setScore(0)
    }

    const spawnPipe = () => {
      const margin = 70
      const groundY = state.h - state.groundH
      const maxTop = groundY - state.pipeGap - margin
      const topH = Math.floor(margin + Math.random() * Math.max(1, maxTop - margin))
      state.pipes.push({
        x: state.w + 40,
        topH,
        passed: false
      })
    }

    const birdRect = () => {
      const bw = 34
      const bh = 26
      return { x: state.birdX - bw / 2, y: state.birdY - bh / 2, w: bw, h: bh }
    }

    const intersects = (a, b) =>
      a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y

    const endGame = () => {
      runningRef.current = false
      playSfx('hit')
      window.setTimeout(() => playSfx('die'), 120)
      setPhase('gameover')
      setBest((prev) => Math.max(prev, scoreRef.current))
    }

    const tick = (ts) => {
      if (!mounted) return
      if (!runningRef.current) return

      const dt = clamp((ts - (lastRef.current || ts)) / 1000, 0, 0.033)
      lastRef.current = ts
      state.t += dt
      state.frame += dt * 10

      // physics
      state.birdV += state.gravity * dt
      state.birdY += state.birdV * dt

      // pipes
      const shouldSpawn = state.pipes.length === 0 || state.pipes[state.pipes.length - 1].x < state.w - 220
      if (shouldSpawn) spawnPipe()

      for (const p of state.pipes) p.x -= state.pipeSpeed * dt
      state.pipes = state.pipes.filter((p) => p.x > -120)
      state.groundOffset = (state.groundOffset + state.pipeSpeed * dt) % 1024

      // scoring
      for (const p of state.pipes) {
        if (!p.passed && p.x + state.pipeW < state.birdX) {
          p.passed = true
          playSfx('point')
          setScore((s) => s + 1)
        }
      }

      // collisions
      const b = birdRect()
      const groundY = state.h - state.groundH
      if (b.y < 10 || b.y + b.h > groundY) endGame()

      for (const p of state.pipes) {
        const top = { x: p.x, y: 0, w: state.pipeW, h: p.topH }
        const botY = p.topH + state.pipeGap
        const bottom = { x: p.x, y: botY, w: state.pipeW, h: groundY - botY }
        if (intersects(b, top) || intersects(b, bottom)) {
          endGame()
          break
        }
      }

      draw()
      rafRef.current = requestAnimationFrame(tick)
    }

    const drawBg = () => {
      ctx.clearRect(0, 0, state.w, state.h)
      if (imgs.bg) {
        // tile background to fill
        const iw = imgs.bg.width
        const ih = imgs.bg.height
        const scale = Math.max(state.w / iw, state.h / ih)
        const dw = iw * scale
        const dh = ih * scale
        ctx.drawImage(imgs.bg, (state.w - dw) / 2, (state.h - dh) / 2, dw, dh)
      } else {
        const g = ctx.createLinearGradient(0, 0, 0, state.h)
        g.addColorStop(0, '#0b1220')
        g.addColorStop(1, '#05070c')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, state.w, state.h)
      }
    }

    const drawPipes = () => {
      ctx.save()
      for (const p of state.pipes) {
        const x = Math.round(p.x)
        const topH = p.topH
        const botY = topH + state.pipeGap
        const groundY = state.h - state.groundH

        if (imgs.pipe) {
          const pipeH = Math.max(240, state.h)
          // top pipe (flip vertically)
          ctx.save()
          ctx.translate(x + state.pipeW / 2, topH)
          ctx.scale(1, -1)
          ctx.drawImage(imgs.pipe, -state.pipeW / 2, 0, state.pipeW, pipeH)
          ctx.restore()

          // bottom pipe
          ctx.drawImage(imgs.pipe, x, botY, state.pipeW, pipeH)
        } else {
          ctx.fillStyle = 'rgba(34,211,238,0.35)'
          ctx.fillRect(x, 0, state.pipeW, topH)
          ctx.fillRect(x, botY, state.pipeW, groundY - botY)
        }
      }
      ctx.restore()
    }

    const drawGround = () => {
      const y = Math.round(state.h - state.groundH)
      if (imgs.ground) {
        // Use integer alignment + tiny overlap to avoid hairline seams.
        const rawTileW = (imgs.ground.width / imgs.ground.height) * state.groundH
        const tileW = Math.max(1, Math.ceil(rawTileW))
        const offset = state.groundOffset % tileW
        const startX = -offset - tileW
        for (let x = startX; x < state.w + tileW; x += tileW) {
          const xi = Math.round(x)
          ctx.drawImage(imgs.ground, xi - 1, y, tileW + 2, state.groundH)
        }
      } else {
        ctx.fillStyle = 'rgba(0,0,0,0.35)'
        ctx.fillRect(0, y, state.w, state.groundH)
      }
    }

    const drawBird = () => {
      const b = birdRect()
      const rot = clamp(state.birdV / 900, -0.25, 0.9)
      ctx.save()
      ctx.translate(b.x + b.w / 2, b.y + b.h / 2)
      ctx.rotate(rot)

      const now = performance.now()
      const img = now < state.blinkUntil ? imgs.birdBlink : imgs.birdNormal
      if (img) {
        ctx.drawImage(img, -b.w / 2, -b.h / 2, b.w, b.h)
      } else {
        ctx.fillStyle = 'rgba(0,201,255,0.9)'
        ctx.beginPath()
        ctx.ellipse(0, 0, b.w / 2, b.h / 2, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    const drawHud = () => {
      ctx.save()
      ctx.fillStyle = '#e2e8f0'
      ctx.font = 'bold 18px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif'
      ctx.shadowColor = 'rgba(0,0,0,0.55)'
      ctx.shadowBlur = 10
      ctx.shadowOffsetY = 2
      ctx.fillText(String(scoreRef.current), 16, 34)
      ctx.restore()
    }

    const draw = () => {
      drawBg()
      drawPipes()
      drawGround()
      drawBird()
      drawHud()
    }

    const flap = () => {
      ensureAudio()
      playSfx('wing')
      state.blinkUntil = performance.now() + 500
      if (phaseRef.current === 'idle') {
        reset()
        setPhase('running')
        phaseRef.current = 'running'
        runningRef.current = true
        lastRef.current = performance.now()
        rafRef.current = requestAnimationFrame(tick)
        state.birdV = state.flap
        return
      }
      if (phaseRef.current !== 'running') return
      state.birdV = state.flap
    }

    const onKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        flap()
      }
    }

    const onPointerDown = (e) => {
      e.preventDefault()
      flap()
    }

    const load = async () => {
      const [bg, ground, pipe, birdNormal, birdBlink] = await Promise.all([
        loadImage(assets.bg),
        loadImage(assets.ground),
        loadImage(assets.pipe),
        loadImage(assets.birdNormal),
        loadImage(assets.birdBlink)
      ])
      imgs = { bg, ground, pipe, birdNormal, birdBlink }
      resize()
      draw()
    }

    const freezeToIdle = () => {
      runningRef.current = false
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      phaseRef.current = 'idle'
      reset()
      draw()
    }

    engineRef.current = { freezeToIdle }

    load()
    window.addEventListener('resize', resize)
    window.addEventListener('keydown', onKeyDown, { passive: false })
    canvas.addEventListener('pointerdown', onPointerDown, { passive: false })

    return () => {
      mounted = false
      runningRef.current = false
      engineRef.current = null
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', onKeyDown)
      canvas.removeEventListener('pointerdown', onPointerDown)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets])

  useEffect(() => {
    if (phase !== 'gameover') return
    setBest((prev) => Math.max(prev, score))
  }, [phase, score])

  useImperativeHandle(
    ref,
    () => ({
      osBack() {
        const ph = phaseRef.current
        if (ph === 'running' || ph === 'gameover') {
          engineRef.current?.freezeToIdle?.()
          setPhase('idle')
          return true
        }
        return false
      }
    }),
    []
  )

  return (
    <div className="h-full w-full min-h-0 flex flex-col overflow-hidden">
      <div className="relative flex-1 min-h-0 rounded-none border-0 bg-black/30 overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none" />

          {/* sound control */}
          <div className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm px-3 py-2">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white/75">
              <path
                d="M11 6 8.5 8.2H6a2 2 0 0 0-2 2v3.6a2 2 0 0 0 2 2h2.5L11 18V6Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              {volume === 0 ? (
                <path d="M14.5 9.5 19 14M19 9.5 14.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M14.5 9.2c1.2 1.2 1.2 4.4 0 5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => {
                ensureAudio()
                setVolume(Number(e.target.value))
              }}
              className="w-24"
            />
            <div className="w-8 text-right text-[10px] text-white/70 tabular-nums">{volume}</div>
          </div>

          {phase === 'idle' && (
            <div className="absolute inset-0 flex items-center justify-center rounded-none overflow-hidden">
              <div className="text-center px-6">
                <div className="text-2xl font-extrabold text-text">WebenoxFly</div>
                <div className="text-secondary text-sm mt-2">Tap to fly, or press Space.</div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  {BG_OPTIONS.map((bg) => (
                    <button
                      key={bg.id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        setBgChoice(bg.id)
                      }}
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                        bgChoice === bg.id ? 'bg-white/15 text-text border border-white/15' : 'bg-white/5 text-secondary border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    // start is handled by first flap
                    const ev = new Event('pointerdown')
                    canvasRef.current?.dispatchEvent(ev)
                  }}
                  className="mt-5 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-accent to-purple px-5 py-3 text-sm font-bold text-background shadow-lg hover:from-accent/90 hover:to-purple/90 transition-all"
                >
                  Start
                </button>
              </div>
            </div>
          )}

          {phase === 'gameover' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-sm rounded-none overflow-hidden">
              <div className="text-center px-6">
                <div className="text-xl font-extrabold text-text">Game Over</div>
                <div className="text-secondary text-sm mt-2">Score: {score} · Best: {best}</div>
                <div className="mt-5 flex gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setPhase('idle')
                      setScore(0)
                    }}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-text hover:bg-white/10 transition-colors"
                  >
                    Restart
                  </button>
                  <button
                    type="button"
                    onClick={onExit}
                    className="rounded-2xl bg-gradient-to-r from-accent to-purple px-4 py-2 text-sm font-bold text-background hover:from-accent/90 hover:to-purple/90 transition-all"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
})

export default WebenoxFlyGame

