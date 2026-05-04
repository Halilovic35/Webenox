import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WebenoxFlyGame from './WebenoxFlyGame'
import ClinicFlowApp from './ClinicFlowApp'
import WebenoxShopApp from './WebenoxShopApp'

/**
 * HTML embedded SVG defaults to a viewport that clips paint to the viewBox — strokes
 * past the edge look “cut off”. Fix: overflow="visible" + padded viewBox so strokes
 * stay inside user space (still visible without relying on UA quirks).
 */
const StatusSignalIcon = () => (
  <svg
    viewBox="0 0 18 12"
    fill="none"
    overflow="visible"
    className="block h-4 w-[18px] shrink-0 text-white/55 [overflow:visible]"
    aria-hidden
  >
    <path d="M1 10V8M5 10V5M9 10V3M13 10V1" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
  </svg>
)

const StatusWifiIcon = () => (
  <svg
    viewBox="-0.75 -0.75 17.5 13.5"
    fill="none"
    overflow="visible"
    className="block h-4 w-[15px] shrink-0 text-white/55 [overflow:visible]"
    aria-hidden
  >
    {/* Lift whole fan so optical center matches signal bars (dot-heavy icon reads low otherwise). */}
    <g transform="translate(0 -1.12)">
      <path d="M8 10.35a1.05 1.05 0 1 0 0.001 0Z" fill="currentColor" />
      <path d="M4.5 7.85Q8 5.5 11.5 7.85" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M2 5.05Q8 2.35 14 5.05" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
    </g>
  </svg>
)

const StatusBatteryIcon = ({ level = 1 }) => {
  const pct = Math.max(0.12, Math.min(1, level))
  const fillW = 12 * pct
  return (
    <svg
      viewBox="-0.5 -0.5 23 12"
      fill="none"
      overflow="visible"
      className="block h-4 w-[22px] shrink-0 text-white/55 [overflow:visible]"
      aria-hidden
    >
      <rect x="0.5" y="2" width="17" height="7" rx="1.5" stroke="currentColor" strokeWidth="1" opacity="0.9" />
      <path d="M19 4v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="2" y="3.5" width={fillW} height="4" rx="0.75" className="fill-white/80" />
    </svg>
  )
}

/** OS-style top bar (mirrors PhoneSystemNav: dark strip + hairline + blur) */
const PhoneStatusBar = ({ phoneTime }) => (
  <div className="relative z-20 shrink-0 overflow-visible border-b border-white/10 bg-black/45 px-5 py-2 backdrop-blur-md">
    <div className="relative flex min-h-[36px] items-center justify-between overflow-visible">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 flex -translate-y-1/2 justify-center">
        <div className="h-5 w-36 rounded-full bg-black/50 border border-white/10" />
      </div>

      {/* Single flex row + items-center: same cross-axis as iOS status; all glyphs h-4 for one band. */}
      <div className="relative z-10 flex min-w-0 flex-nowrap items-center gap-2 pr-[5.25rem] leading-none pointer-events-none">
        <span className="inline-flex h-4 shrink-0 items-center text-[11px] font-semibold tabular-nums text-white/70">
          {phoneTime}
        </span>
        {/* Tight pair: signal + Wi‑Fi share one h-4 band, minimal gap (was gap-2 between them). */}
        <span className="inline-flex h-4 shrink-0 items-center gap-px text-white/55">
          <span className="inline-flex h-4 w-[18px] items-center justify-center">
            <StatusSignalIcon />
          </span>
          <span className="inline-flex h-4 w-[15px] items-center justify-center -translate-y-[2px]">
            <StatusWifiIcon />
          </span>
        </span>
      </div>

      <div className="relative z-10 inline-flex h-4 shrink-0 items-center pl-[5.25rem] leading-none pointer-events-none">
        <StatusBatteryIcon level={1} />
      </div>
    </div>
  </div>
)

const PhoneSystemNav = ({ onBack, onHome, onRecents }) => (
  <div className="shrink-0 border-t border-white/10 bg-black/45 backdrop-blur-md px-5 py-1.5">
    <div className="flex items-center justify-between">
      <button
        type="button"
        aria-label="Back"
        onClick={onBack}
        className="ml-2 h-8 w-10 rounded-xl border border-white/10 bg-white/5 text-white/75 hover:bg-white/10 transition-colors flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M14 6 8 12l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Home"
        onClick={onHome}
        className="h-8 w-12 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center"
      >
        <div className="h-3 w-3 rounded-[5px] border border-white/55 bg-white/10" />
      </button>

      <button
        type="button"
        aria-label="Quick Play"
        onClick={onRecents}
        className="mr-2 h-8 w-10 rounded-xl border border-white/10 bg-white/5 text-white/75 hover:bg-white/10 transition-colors flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M8 7v10l10-5-10-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  </div>
)

const PlaceholderApp = ({ title, items, cta }) => {
  return (
    <div className="h-full w-full min-h-0 flex flex-col overflow-hidden px-5 pt-4 pb-2">
      <div className="text-lg font-extrabold text-text">{title}</div>
      <div className="text-secondary text-xs mt-1">Concept preview</div>
      <div className="mt-5 flex-1 min-h-0 overflow-auto space-y-3">
        {items.map((line) => (
          <div key={line} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-secondary">
            {line}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-4 w-full shrink-0 rounded-2xl bg-gradient-to-r from-accent to-purple px-4 py-3 text-sm font-bold text-background shadow-lg hover:from-accent/90 hover:to-purple/90 transition-all"
      >
        {cta}
      </button>
    </div>
  )
}

const APP_META = {
  webenoxfly: {
    icon: (
      <img
        src="/images/webenox-fly/Flappy%20Bird%20Assets/Player/flappy04.png"
        alt="WebenoxFly bird"
        className="h-8 w-8 object-contain"
        draggable={false}
      />
    ),
    color: 'from-cyan-400/55 to-blue-500/45'
  },
  clinicflow: {
    icon: (
      <img
        src="/images/clinicflow.png"
        alt="ClinicFlow"
        className="h-10 w-10 object-contain"
        draggable={false}
      />
    ),
    color: 'from-emerald-400/50 to-teal-500/45'
  },
  fittrack: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path d="M7 15c2-5.5 4.3-7.8 8-9-1 4.2-2.9 7.8-6.1 11.4-1 .8-2.2 1.2-3.9 1.6.6-1.5 1.1-2.8 2-4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M15.3 8.7l2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    color: 'from-orange-400/55 to-rose-500/45'
  },
  tablebook: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path d="M7 6h10v12H7V6Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 4v4M15 4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M9 11h6M9 14h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
      </svg>
    ),
    color: 'from-purple-400/55 to-fuchsia-500/45'
  },
  webenoxshop: {
    icon: (
      <img
        src="/images/wlogo.png"
        alt="WebenoxShop"
        className="h-9 w-9 object-contain"
        draggable={false}
      />
    ),
    color: 'from-cyan-400/55 to-purple-500/50'
  }
}

const DockIcon = ({ children, active, onClick, label }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className={`h-10 w-10 rounded-2xl border flex items-center justify-center transition-all duration-200 ${
      active
        ? 'border-accent/40 bg-accent/15 text-accent shadow-[0_0_18px_rgba(0,201,255,0.18)]'
        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white/85'
    }`}
  >
    {children}
  </button>
)

/** Home launcher wallpapers (public/images). */
const LAUNCHER_BACKGROUNDS = [
  { id: 'bg1', label: 'Background 1', src: '/images/BG1.png' },
  { id: 'bg2', label: 'Background 2', src: '/images/BG2.png' },
  { id: 'bg3', label: 'Background 3', src: '/images/BG3.png' }
]

/** UI tokens tuned for text/icons over full-bleed photos + scrim. */
const getLauncherChrome = () => ({
  headerText: 'text-white',
  subText: 'text-white/75',
  labelText: 'text-white/95',
  dockBg: 'bg-black/40',
  dockBorder: 'border-white/18',
  cardBorder: 'border-white/20',
  iconBorder: 'border-white/22',
  iconText: 'text-white/95',
  glowA: 'rgba(255,255,255,0.28)',
  glowB: 'rgba(0,201,255,0.22)'
})

const getIconGradient = (appId) => {
  const base = APP_META[appId]?.color
  return base || 'from-cyan-400/55 to-blue-500/45'
}

const AppPhonePreview = () => {
  const [activeApp, setActiveApp] = useState(null)
  const [launcherBgId, setLauncherBgId] = useState(LAUNCHER_BACKGROUNDS[0].id)
  const [isWallpaperOpen, setWallpaperOpen] = useState(false)
  const clinicNavRef = useRef(null)
  const flyNavRef = useRef(null)
  const shopNavRef = useRef(null)
  const [phoneTime, setPhoneTime] = useState(() => {
    try {
      return new Intl.DateTimeFormat('de-DE', {
        timeZone: 'Europe/Berlin',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date())
    } catch {
      return '00:00'
    }
  })

  useEffect(() => {
    let alive = true
    const fmt = new Intl.DateTimeFormat('de-DE', {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })

    const tick = () => {
      if (!alive) return
      setPhoneTime(fmt.format(new Date()))
    }

    tick()
    const id = window.setInterval(tick, 15_000)
    return () => {
      alive = false
      window.clearInterval(id)
    }
  }, [])

  const apps = useMemo(
    () => [
      { id: 'webenoxfly', name: 'WebenoxFly' },
      { id: 'clinicflow', name: 'ClinicFlow' },
      { id: 'webenoxshop', name: 'WebenoxShop' },
      { id: 'fittrack', name: 'FitTrack' },
      { id: 'tablebook', name: 'TableBook' }
    ],
    []
  )

  const screenMotion = {
    initial: { opacity: 0, y: 10, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -8, scale: 0.99 },
    transition: { duration: 0.25, ease: 'easeOut' }
  }

  const chrome = getLauncherChrome()
  const activeWallpaper = useMemo(
    () => LAUNCHER_BACKGROUNDS.find((b) => b.id === launcherBgId) || LAUNCHER_BACKGROUNDS[0],
    [launcherBgId]
  )

  const handleOsHome = () => {
    setWallpaperOpen(false)
    setActiveApp(null)
  }

  const handleOsBack = () => {
    if (activeApp === 'clinicflow') {
      const handled = clinicNavRef.current?.osBack?.()
      if (handled) return
    }
    if (activeApp === 'webenoxfly') {
      const handled = flyNavRef.current?.osBack?.()
      if (handled) return
    }
    if (activeApp === 'webenoxshop') {
      const handled = shopNavRef.current?.osBack?.()
      if (handled) return
    }
    setActiveApp(null)
  }

  const handleOsRecents = () => {
    setWallpaperOpen(false)
    setActiveApp('webenoxfly')
  }

  const renderActiveApp = () => {
    const shell = (child) => (
      <div className="h-full w-full min-h-0 flex flex-col">
        <div className="flex-1 min-h-0 overflow-hidden">{child}</div>
        <PhoneSystemNav onBack={handleOsBack} onHome={handleOsHome} onRecents={handleOsRecents} />
      </div>
    )

    if (activeApp === 'webenoxfly') return shell(<WebenoxFlyGame ref={flyNavRef} onExit={handleOsHome} />)
    if (activeApp === 'clinicflow') return shell(<ClinicFlowApp ref={clinicNavRef} />)
    if (activeApp === 'webenoxshop') return shell(<WebenoxShopApp ref={shopNavRef} />)
    if (activeApp === 'fittrack') return shell(<PlaceholderApp title="FitTrack" items={['Workout: Upper Body', 'Progress: 68% this week', 'Streak: 4 days']} cta="Start Workout" />)
    if (activeApp === 'tablebook')
      return shell(<PlaceholderApp title="TableBook" items={['Available: 6:30 PM', 'Available: 7:00 PM', 'Available: 8:15 PM']} cta="Reserve Table" />)
    return null
  }

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-[380px] sm:w-[420px]">
        {/* soft glow */}
        <div className="absolute -inset-10 bg-gradient-to-br from-accent/10 via-purple/10 to-transparent blur-3xl opacity-80 pointer-events-none" />

        {/* phone frame */}
        <div className="relative rounded-[54px] border border-white/12 bg-gradient-to-b from-[#0b0f16] to-[#05070c] shadow-[0_36px_140px_-55px_rgba(0,0,0,0.88)] p-[12px]">
          <div className="rounded-[44px] border border-white/8 bg-gradient-to-b from-[#0f1624] to-[#070a12] overflow-hidden relative">
            <div className="flex h-[720px] flex-col">
              <PhoneStatusBar phoneTime={phoneTime} />

              <div className="relative min-h-0 flex-1 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                {!activeApp ? (
                  <motion.div key="home" {...screenMotion} className="h-full w-full">
                    <div className="relative h-full w-full flex flex-col">
                      {/* Launcher wallpaper + scrim for legible chrome */}
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={launcherBgId}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className="pointer-events-none absolute inset-0"
                        >
                          <img
                            src={activeWallpaper.src}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/55" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/25" />
                        </motion.div>
                      </AnimatePresence>

                      {/* header */}
                      <div className="px-7 pt-7 pb-4">
                        <div className={`${chrome.headerText} font-extrabold text-lg tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]`}>
                          App Concepts
                        </div>
                        <div className={`${chrome.subText} text-xs mt-1 drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]`}>
                          Tap any concept to preview it.
                        </div>
                      </div>

                      {/* grid: 3 + 2 app icons (5 total) */}
                      <div className="px-7 flex-1 flex flex-col justify-center pb-4">
                        <div className="grid grid-cols-3 gap-5">
                          {apps.slice(0, 3).map((app) => {
                            const meta = APP_META[app.id]
                            const grad = getIconGradient(app.id)
                            return (
                              <motion.button
                                key={app.id}
                                type="button"
                                onClick={() => {
                                  setWallpaperOpen(false)
                                  setActiveApp(app.id)
                                }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group flex flex-col items-center gap-2"
                              >
                                <div className="relative">
                                  <div
                                    className="absolute -inset-4 rounded-[28px] blur-xl opacity-0 group-hover:opacity-90 transition-opacity"
                                    style={{
                                      background: `radial-gradient(circle at 30% 25%, ${chrome.glowA}, transparent 55%), radial-gradient(circle at 70% 80%, ${chrome.glowB}, transparent 60%)`
                                    }}
                                  />
                                  <div
                                    className={`h-[82px] w-[82px] rounded-[28px] border ${chrome.iconBorder} bg-gradient-to-br ${grad} shadow-[0_20px_60px_-30px_rgba(0,0,0,0.85)] flex items-center justify-center ${chrome.iconText}`}
                                  >
                                    <div className="drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]">{meta.icon}</div>
                                  </div>
                                </div>
                                <div className={`text-[11px] font-semibold text-center leading-tight drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)] ${chrome.labelText}`}>{app.name}</div>
                              </motion.button>
                            )
                          })}
                        </div>

                        <div className="mt-5 flex justify-center gap-10 sm:gap-12">
                          {apps.slice(3).map((app) => {
                            const meta = APP_META[app.id]
                            const grad = getIconGradient(app.id)
                            return (
                              <motion.button
                                key={app.id}
                                type="button"
                                onClick={() => {
                                  setWallpaperOpen(false)
                                  setActiveApp(app.id)
                                }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group flex flex-col items-center gap-2"
                              >
                                <div className="relative">
                                  <div
                                    className="absolute -inset-4 rounded-[28px] blur-xl opacity-0 group-hover:opacity-90 transition-opacity"
                                    style={{
                                      background: `radial-gradient(circle at 30% 25%, ${chrome.glowA}, transparent 55%), radial-gradient(circle at 70% 80%, ${chrome.glowB}, transparent 60%)`
                                    }}
                                  />
                                  <div
                                    className={`h-[82px] w-[82px] rounded-[28px] border ${chrome.iconBorder} bg-gradient-to-br ${grad} shadow-[0_20px_60px_-30px_rgba(0,0,0,0.85)] flex items-center justify-center ${chrome.iconText}`}
                                  >
                                    <div className="drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]">{meta.icon}</div>
                                  </div>
                                </div>
                                <div className={`text-[11px] font-semibold text-center leading-tight drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)] ${chrome.labelText}`}>{app.name}</div>
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>

                      {/* bottom dock */}
                      <div className="px-7 pb-5">
                        <div className={`mx-auto w-full rounded-3xl border ${chrome.dockBorder} ${chrome.dockBg} backdrop-blur-md px-5 py-3`}>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col items-center gap-1">
                              <DockIcon
                                active={!activeApp && !isWallpaperOpen}
                                label="Home"
                                onClick={() => {
                                  setWallpaperOpen(false)
                                  setActiveApp(null)
                                }}
                              >
                                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                                  <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                                </svg>
                              </DockIcon>
                              <div className="text-[10px] font-semibold text-white/75">Home</div>
                            </div>

                            <div className="flex flex-col items-center gap-1">
                              <DockIcon
                                active={isWallpaperOpen}
                                label="Background"
                                onClick={() => {
                                  setWallpaperOpen((v) => !v)
                                }}
                              >
                                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                                  <path
                                    d="M5 8h14v10H5V8Zm3-3h8v3H8V5Z"
                                    stroke="currentColor"
                                    strokeWidth="1.55"
                                    strokeLinejoin="round"
                                  />
                                  <path d="M9 11h6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" opacity="0.85" />
                                </svg>
                              </DockIcon>
                              <div className="text-[10px] font-semibold text-white/75">Wallpaper</div>
                            </div>

                            <div className="flex flex-col items-center gap-1">
                              <DockIcon
                                active={activeApp === 'webenoxfly'}
                                label="Quick Play"
                                onClick={() => {
                                  setWallpaperOpen(false)
                                  setActiveApp('webenoxfly')
                                }}
                              >
                                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                                  <path d="M8 7v10l10-5-10-5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                                </svg>
                              </DockIcon>
                              <div className="text-[10px] font-semibold text-white/75">Play</div>
                            </div>
                          </div>
                        </div>
                      </div>

                    {/* home indicator */}
                      <div className="pb-4 flex justify-center">
                        <div className="h-1 w-28 rounded-full bg-white/25" />
                      </div>

                      {/* wallpaper picker overlay */}
                      <AnimatePresence initial={false}>
                        {isWallpaperOpen && (
                          <motion.div
                            key="wallpaper-panel"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="absolute inset-0 z-30"
                          >
                            <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" />
                            <div className="absolute inset-x-0 bottom-0 p-5">
                              <div className="rounded-[28px] border border-white/12 bg-background/70 backdrop-blur-xl shadow-2xl overflow-hidden">
                                <div className="px-5 pt-5 pb-4 flex items-center justify-between">
                                  <div>
                                    <div className="text-text font-extrabold text-base">Background</div>
                                    <div className="text-secondary text-xs mt-1">Choose a home screen wallpaper.</div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setWallpaperOpen(false)}
                                    className="h-9 w-9 rounded-2xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-colors"
                                    aria-label="Close wallpaper picker"
                                  >
                                    <span className="block text-lg leading-none">×</span>
                                  </button>
                                </div>

                                <div className="px-5 pb-5 grid grid-cols-1 gap-3">
                                  {LAUNCHER_BACKGROUNDS.map((bg) => {
                                    const active = launcherBgId === bg.id
                                    return (
                                      <button
                                        key={bg.id}
                                        type="button"
                                        onClick={() => {
                                          setLauncherBgId(bg.id)
                                          setWallpaperOpen(false)
                                        }}
                                        className={`rounded-2xl border px-3 py-3 text-left transition-colors ${
                                          active ? 'border-accent/35 bg-accent/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
                                        }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-black/30">
                                            <img src={bg.src} alt="" className="h-full w-full object-cover" draggable={false} />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <div className="text-sm font-bold text-text">{bg.label}</div>
                                            <div className="text-xs text-secondary mt-0.5">Full screen behind launcher</div>
                                          </div>
                                          {active && (
                                            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
                                              Active
                                            </span>
                                          )}
                                        </div>
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key={activeApp} {...screenMotion} className="h-full w-full min-h-0">
                    {renderActiveApp()}
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppPhonePreview

