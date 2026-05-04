/**
 * SoftPastelLayout - Complete website preview with Soft Pastel aesthetic
 * Props: { industry, style }
 * Light pastel bg, pink/purple accents, Plus Jakarta Sans, rounded everything,
 * soft shadows, NO harsh borders. Gentle, approachable, totally different from Clinical/Luxury.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { truncateText, SERVICE_DESC_MAX, ABOUT_PARA_MAX, PREVIEW_CONTAINER_HEIGHT, scrollToSection, getPortfolioPreviewScrollRoot } from '../../utils/portfolioUtils'

const SERVICE_ICONS = {
  clinic: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  ),
  specialist: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  ),
  care: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  preventive: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  ),
  telehealth: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  ),
  lab: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
  ),
  hair: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
  ),
  skin: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  ),
  wellness: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  ),
  dining: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ),
  platform: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  default: (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
  )
}

const getServiceIcon = (iconKey) => SERVICE_ICONS[iconKey] || SERVICE_ICONS.default

// Safety stub for older HMR frames (prevents crash if any stale code still references it)
// Real rendering is handled by SoftPastelSpheresScene below.
const GlassSphereCanvas = () => null

// One shared Three.js scene for all spheres (prevents WebGL context loss + flicker).
// Each orb + label is a single unit: overlay position is synced to 3D sphere via projection each frame.
const SoftPastelSpheresScene = ({ spheres, onOrbClick }) => {
  const wrapperRef = useRef(null)
  const mountRef = useRef(null)
  const overlayRefsRef = useRef([])
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [sceneEnter, setSceneEnter] = useState(false)
  const hoveredIdxRef = useRef(null)
  const frameRef = useRef(null)
  const modelRef = useRef(null)
  const instancesRef = useRef([])

  const prefersReducedMotionScene =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)')?.matches

  const spheresStable = useMemo(() => spheres, [spheres])
  useEffect(() => { hoveredIdxRef.current = hoveredIdx }, [hoveredIdx])

  useEffect(() => {
    let cancelled = false
    setSceneEnter(false)
    const mount = mountRef.current
    const wrapper = wrapperRef.current
    if (!mount || !wrapper) return

    const getSize = () => ({
      w: Math.max(wrapper.clientWidth || 1, 1),
      h: Math.max(wrapper.clientHeight || 1, 1)
    })

    const { w, h } = getSize()

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.01, 200)
    camera.position.set(0, 0, 7)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(w, h)
    renderer.setClearColor(0x000000, 0)
    renderer.physicallyCorrectLights = true
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.95
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    // Project 3D sphere position to 2D and update overlay position (orb + label move together)
    // IMPORTANT: use translate3d() (compositor) instead of left/top (layout) for smooth motion.
    let hasSynced = false
    let sizeW = w
    let sizeH = h
    const proj = new THREE.Vector3()
    const syncOverlays = () => {
      let syncedAny = false
      instancesRef.current.forEach((inst, i) => {
        const el = overlayRefsRef.current[i]
        if (!el) return
        const spec = spheresStable[i]
        if (!spec) return

        proj.copy(inst.position).project(camera)
        const xPx = (proj.x + 1) / 2 * sizeW
        const yPx = (1 - proj.y) / 2 * sizeH
        const sz = spec.size || 110
        const tx = xPx - sz / 2
        const ty = yPx - sz / 2
        // Lock DOM overlay to the same animation frame as WebGL (no smoothing / no transitions)
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
        if (!hasSynced) el.style.opacity = '1'
        syncedAny = true
      })
      if (syncedAny) hasSynced = true
    }

    // Environment reflections (critical for glass look)
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = envRT.texture

    // Glass-friendly lights: stronger key for hotspots, darker hemisphere for depth
    scene.add(new THREE.AmbientLight(0xffffff, 0.28))
    scene.add(new THREE.HemisphereLight(0xfdf2ff, 0x1a1f35, 1.0))
    const key = new THREE.DirectionalLight(0xffffff, 2.4)
    key.position.set(7, 10, 12)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0xe8f4ff, 0.9)
    fill.position.set(-7, 3, 10)
    scene.add(fill)
    const rim = new THREE.DirectionalLight(0xffffff, 1.4)
    rim.position.set(-4, 2, -8)
    scene.add(rim)
    const front = new THREE.PointLight(0xffffff, 0.9, 60)
    front.position.set(0, 0, 10)
    scene.add(front)

    const loader = new GLTFLoader()

    const forceGlassMaterials = (root) => {
      root.traverse((child) => {
        if (!child.isMesh) return
        child.castShadow = false
        child.receiveShadow = false

        // Premium translucent glass: stronger highlights, darker depth, less milky
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#ffffff'),
          roughness: 0.04,
          metalness: 0.0,
          transmission: 1.0,
          thickness: 0.7,
          ior: 1.5,
          clearcoat: 1.0,
          clearcoatRoughness: 0.03,
          transparent: true,
          opacity: 1.0
        })

        glassMat.envMapIntensity = 3.2
        glassMat.needsUpdate = true

        child.material = glassMat
      })
    }

    // Orb center must match button center (button is positioned by top-left, so add half size)
    const posFromSpec = (spec, sizeW, sizeH) => {
      const parsePct = (v) => (typeof v === 'string' && v.endsWith('%') ? parseFloat(v) / 100 : null)
      const left = parsePct(spec.left)
      const right = parsePct(spec.right)
      const top = parsePct(spec.top)
      const bottom = parsePct(spec.bottom)
      const half = (spec.size || 110) / 2

      let xPx, yPx
      if (left != null && top != null) {
        xPx = left * sizeW + half
        yPx = top * sizeH + half
      } else if (right != null && top != null) {
        xPx = sizeW - right * sizeW - half
        yPx = top * sizeH + half
      } else if (left != null && bottom != null) {
        xPx = left * sizeW + half
        yPx = sizeH - bottom * sizeH - half
      } else if (right != null && bottom != null) {
        xPx = sizeW - right * sizeW - half
        yPx = sizeH - bottom * sizeH - half
      } else {
        xPx = left != null ? left * sizeW + half : right != null ? sizeW - right * sizeW - half : sizeW / 2
        yPx = top != null ? top * sizeH + half : bottom != null ? sizeH - bottom * sizeH - half : sizeH / 2
      }

      const x = (xPx - sizeW / 2) / 70
      const y = -(yPx - sizeH / 2) / 70
      return { x, y }
    }

    const buildInstances = (sizeW, sizeH) => {
      const base = modelRef.current
      if (!base) return

      // clear existing
      instancesRef.current.forEach((obj) => scene.remove(obj))
      instancesRef.current = []

      // scale base to desired visual size by bbox
      const box = new THREE.Box3().setFromObject(base)
      const s = new THREE.Vector3()
      box.getSize(s)
      const maxDim = Math.max(s.x, s.y, s.z) || 1
      const desired = 1.48
      const scaleFactor = desired / maxDim

      spheresStable.forEach((spec, i) => {
        const inst = base.clone(true)
        const baseScale = scaleFactor * (spec.worldScale || 1)
        inst.scale.setScalar(baseScale)
        const { x, y } = posFromSpec(spec, sizeW, sizeH)
        inst.position.set(x, y, 0)
        inst.rotation.set(0.35, 0.75 + i * 0.5, 0)
        inst.userData = { floatPhase: spec.floatOffset || 0, baseX: x, baseY: y, idx: i, baseScale, fill: 0 }
        // Clone materials per instance so we can update envMapIntensity on hover
        inst.traverse((child) => {
          if (child.isMesh && child.material) child.material = child.material.clone()
        })

        scene.add(inst)
        instancesRef.current.push(inst)
      })
    }

    loader.load(
      '/images/glass_sphere.glb',
      (gltf) => {
        modelRef.current = gltf.scene
        forceGlassMaterials(modelRef.current)
        const s = getSize()
        sizeW = s.w
        sizeH = s.h
        buildInstances(sizeW, sizeH)

        const startT = typeof performance !== 'undefined' ? performance.now() / 1000 : 0
        let lastT = startT
        const hover = () => hoveredIdxRef.current
        const clamp01 = (v) => Math.max(0, Math.min(1, v))
        const lerp = (a, b, t) => a + (b - a) * t
        const baseColor = new THREE.Color('#ffffff')
        const fillColor = new THREE.Color('#b8a9f5') // lavender (mixed pastel)
        const emissiveBase = new THREE.Color('#f472b6') // pink glow base

        // Fade in after first projected frame so orbs align with layout swap (GLB load is async).
        const revealScene = () => {
          if (cancelled) return
          if (prefersReducedMotionScene) {
            setSceneEnter(true)
            return
          }
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (cancelled) return
              syncOverlays()
              renderer.render(scene, camera)
              setSceneEnter(true)
            })
          })
        }

        const animate = () => {
          frameRef.current = requestAnimationFrame(animate)
          const now = typeof performance !== 'undefined' ? performance.now() / 1000 : 0
          const dt = Math.min(0.05, Math.max(0.001, now - lastT))
          lastT = now
          const t = now - startT
          const hov = hover()
          instancesRef.current.forEach((inst, idx) => {
            const spec = spheresStable[idx] || {}
            const isHov = hov === idx

            // Hover: "fills like water" while hovering, drains when leaving.
            // We approximate fill visually by smoothly mixing color/emissive/transmission based on fill (0..1).
            const target = isHov ? 1 : 0
            const speed = isHov ? 3.2 : 2.4 // seconds-ish (higher = faster)
            const k = 1 - Math.exp(-speed * dt) // stable across fps
            inst.userData.fill = clamp01((inst.userData.fill ?? 0) + (target - (inst.userData.fill ?? 0)) * k)
            const fill = inst.userData.fill

            // Apply fill to all meshes in the cloned instance material
            inst.traverse((child) => {
              if (!child.isMesh || !child.material) return
              const mat = child.material
              if (mat.envMapIntensity != null) mat.envMapIntensity = lerp(3.2, 4.2, fill)

              // color mix (white -> pastel blend)
              if (mat.color) mat.color.copy(baseColor).lerp(fillColor, fill)

              // emissive glow grows with fill (keeps "mixed" powerful look without popping instantly)
              mat.emissive = mat.emissive || new THREE.Color(0, 0, 0)
              mat.emissive.copy(emissiveBase).multiplyScalar(0.45 * fill)

              // more tint as it fills (lower transmission = more visible color)
              mat.transmission = lerp(1.0, 0.65, fill)
            })

            // Gentle levitation   minimal math, smooth 60fps
            const phase = inst.userData.floatPhase || 0
            const dx = Math.sin(t * 0.4 + phase) * 0.04
            const dy = Math.cos(t * 0.5 + phase * 1.3) * 0.05
            inst.position.x = inst.userData.baseX + dx
            inst.position.y = inst.userData.baseY + dy
          })
          syncOverlays()
          renderer.render(scene, camera)
        }
        animate()
        revealScene()
      },
      undefined,
      (err) => {
        if (typeof console !== 'undefined' && console.warn) console.warn('glass_sphere.glb load failed', err)
        if (!cancelled) setSceneEnter(true)
      }
    )

    const handleResize = () => {
      const s = getSize()
      sizeW = s.w
      sizeH = s.h
      renderer.setSize(sizeW, sizeH)
      camera.aspect = sizeW / sizeH
      camera.updateProjectionMatrix()
      buildInstances(sizeW, sizeH)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelled = true
      setSceneEnter(false)
      window.removeEventListener('resize', handleResize)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      instancesRef.current.forEach((obj) => scene.remove(obj))
      instancesRef.current = []
      scene.environment = null
      envRT.dispose()
      pmrem.dispose()
      renderer.dispose()
      if (typeof renderer.forceContextLoss === 'function') renderer.forceContextLoss()
      if (renderer.domElement && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [spheresStable, prefersReducedMotionScene])

  return (
    <motion.div
      ref={wrapperRef}
      initial={false}
      animate={
        prefersReducedMotionScene
          ? { opacity: sceneEnter ? 1 : 0 }
          : { opacity: sceneEnter ? 1 : 0, scale: sceneEnter ? 1 : 0.93 }
      }
      transition={{ duration: 0.48, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ position: 'absolute', inset: 0, zIndex: 1, transformOrigin: 'center center' }}
    >
      <div ref={mountRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      {spheresStable.map((spec, i) => (
        <div
          key={spec.label}
          ref={(el) => { overlayRefsRef.current[i] = el }}
          role="button"
          tabIndex={0}
          onClick={() => onOrbClick?.(spec.section)}
          onKeyDown={(e) => e.key === 'Enter' && onOrbClick?.(spec.section)}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
          style={{
            position: 'absolute',
            width: spec.size || 110,
            height: spec.size || 110,
            left: 0,
            top: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto',
            cursor: 'pointer',
            borderRadius: '999px',
            zIndex: 5,
            willChange: 'transform',
            contain: 'layout paint',
            transformStyle: 'preserve-3d',
            transition: 'opacity 0.2s ease',
            opacity: 0
          }}
        >
          <span
            style={{
              fontSize: spec.size && spec.size >= 110 ? '0.8rem' : '0.72rem',
              fontWeight: 900,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.96)',
              textShadow: '0 2px 8px rgba(0,0,0,0.35)',
              background: 'rgba(255,255,255,0.12)',
              padding: '0.3rem 0.6rem',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.22)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.18)'
            }}
          >
            {spec.label}
          </span>
        </div>
      ))}
    </motion.div>
  )
}

const SoftPastelLayout = ({ industry, style }) => {
  const p = style?.theme?.palette || {
    primary: '#f472b6',
    secondary: '#a78bfa',
    accent: '#c084fc',
    bg: '#fdf2f8',
    surface: '#ffffff',
    text: '#4c1d95',
    muted: '#7c3aed'
  }

  const cardRadius = '24px'
  const pillRadius = '9999px'

  const hero = industry?.hero || {}
  const services = industry?.services || []
  const stats = industry?.stats || []
  const team = industry?.team || []
  const testimonials = industry?.testimonials || []
  const faq = industry?.faq || []
  const pricing = industry?.pricing || []
  const contact = industry?.contact || {}
  const navLabels = industry?.navLabels || ['Services', 'About', 'Contact']
  const heroImage = '/images/pastel-hero.png' // Overridden for style
  const aboutSection = industry?.aboutSection || null
  const process = industry?.process || []
  const gallery = industry?.gallery || []
  const trustBadges = industry?.trustBadges || []
  const whyChooseUs = industry?.whyChooseUs || []
  const featuredCaseStudy = industry?.featuredCaseStudy || null
  const ctaBanner = industry?.ctaBanner || null
  const valueProps = industry?.valueProps || []
  const additionalFaq = industry?.additionalFaq || []
  const relatedResources = industry?.relatedResources || []
  const specialties = industry?.specialties || []
  const mission = industry?.mission || null

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)')?.matches

  const contactFooterGridStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr) minmax(0, 0.95fr)',
    gridTemplateRows: 'auto auto',
    columnGap: '1rem',
    rowGap: '1rem',
    alignItems: 'stretch',
    gridTemplateAreas: `
      "brand specialties glance"
      "links links glance"
    `
  }), [])

  const previewScrollRoot = useMemo(() => getPortfolioPreviewScrollRoot(), [])
  const sectionView = useMemo(
    () => ({
      once: true,
      amount: 0.15,
      margin: '0px 0px -12% 0px',
      ...(previewScrollRoot ? { root: previewScrollRoot } : {})
    }),
    [previewScrollRoot]
  )

  const sectionReveal = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.45 },
        viewport: sectionView
      }

  // Stable reference: inline array would change every render and recreate WebGL (context limit / HMR 500).
  const navSpheres = useMemo(
    () => [
      { label: 'SERVICES', section: 'Services', top: '19%', left: '20%', size: 102, worldScale: 0.9, motion: 'vertical', floatOffset: 0 },
      { label: 'TEAM', section: 'Team', top: '19%', right: '20%', size: 108, worldScale: 0.95, motion: 'horizontal', floatOffset: 0.6 },
      { label: 'CONTACT', section: 'Contact', bottom: '20%', left: '22%', size: 110, worldScale: 0.96, motion: 'orbit', floatOffset: 1.1 },
      { label: 'ABOUT', section: 'About', bottom: '18%', right: '20%', size: 124, worldScale: 1.04, motion: 'anchor', floatOffset: 1.7 }
    ],
    []
  )

  const baseStyles = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    backgroundColor: p.bg,
    color: p.text,
    minHeight: '500px',
    maxWidth: '100%'
  }

  const softShadow = '0 4px 20px rgba(244, 114, 182, 0.12)'
  const softerShadow = '0 2px 12px rgba(167, 139, 250, 0.08)'

  const cardStyle = {
    borderRadius: cardRadius,
    backgroundColor: p.surface,
    boxShadow: softerShadow,
    transition: 'all 0.35s ease'
  }

  const pillBtnPrimary = {
    borderRadius: pillRadius,
    backgroundColor: p.primary,
    color: '#ffffff',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }

  const pillBtnSecondary = {
    borderRadius: pillRadius,
    backgroundColor: 'rgba(244, 114, 182, 0.15)',
    color: p.primary,
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }

  return (
    <div style={baseStyles}>
      {/* HERO: Bold Marketing / Growth Style Gradient Hero */}
      <section
        id="hero"
        style={{
          position: 'relative',
          // Match preview container exactly so no lower content leaks
          height: PREVIEW_CONTAINER_HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '1.5rem',
          boxSizing: 'border-box',
          backgroundImage: `url('/images/pastel-hero.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundColor: 'rgba(255,255,255,0.1)' }} />

        {/* Orbs: sphere + label as single unit, synced via 3D→2D projection */}
        {!prefersReducedMotion && <SoftPastelSpheresScene spheres={navSpheres} onOrbClick={scrollToSection} />}
        {prefersReducedMotion && navSpheres.map((sphere) => (
          <motion.button
            key={sphere.label}
            type="button"
            onClick={() => scrollToSection(sphere.section)}
            style={{
              position: 'absolute',
              top: sphere.top,
              left: sphere.left,
              right: sphere.right,
              bottom: sphere.bottom,
              width: `${sphere.size || 110}px`,
              height: `${sphere.size || 110}px`,
              borderRadius: '999px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              cursor: 'pointer',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#ffffff'
            }}
          >
            {sphere.label}
          </motion.button>
        ))}

        <motion.div
          initial={!prefersReducedMotion ? { opacity: 0, y: 30 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ maxWidth: '800px', position: 'relative', zIndex: 2, flexShrink: 0 }}
        >
          <span 
            style={{ 
              display: 'inline-block', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              color: p.text, 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em', 
              marginBottom: '1rem' 
            }}
          >
            The #1 Digital Marketing Performance Agency
          </span>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1,
              marginBottom: '1rem',
              color: p.text,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              textShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
          >
            {hero.headline || 'Stop Searching Start Growing'}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <motion.button
              style={{ 
                ...pillBtnPrimary, 
                padding: '0.75rem 2rem', 
                fontSize: '0.875rem', 
                backgroundColor: '#ffffff', 
                color: p.text,
                boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
              }}
              whileHover={!prefersReducedMotion ? { scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' } : {}}
              whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
            >
              {hero.primaryCTA || 'Get Started'}
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* RESULTS: premium impact (stats + trust pills) */}
      {(stats.length > 0 || trustBadges.length > 0) && (
        <motion.section
          {...sectionReveal}
          style={{
            padding: '2.25rem 1.5rem',
            background: `linear-gradient(180deg, rgba(244, 114, 182, 0.10), rgba(167, 139, 250, 0.06) 55%, rgba(255,255,255,0) 100%)`
          }}
        >
          <div style={{ maxWidth: '1040px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center', padding: '0.4rem 0.85rem', borderRadius: pillRadius, background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(244,114,182,0.18)', boxShadow: softerShadow }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})` }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: p.text, opacity: 0.92, letterSpacing: '0.02em' }}>Results you can feel</span>
              </div>
            </div>

            {stats.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.85rem', alignItems: 'stretch' }}>
                {stats.slice(0, 3).map((stat, i) => (
                  <motion.div
                    key={i}
                    style={{
                      padding: '1.35rem 1.25rem',
                      borderRadius: '999px',
                      background: 'rgba(255, 255, 255, 0.74)',
                      border: '1px solid rgba(255,255,255,0.68)',
                      boxShadow: softerShadow,
                      backdropFilter: 'blur(6px)'
                    }}
                    whileHover={!prefersReducedMotion ? { y: -4, boxShadow: softShadow } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ fontSize: 'clamp(1.55rem, 2.6vw, 2rem)', fontWeight: 900, color: p.primary, marginBottom: '0.15rem', fontVariantNumeric: 'tabular-nums' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: p.text, opacity: 0.85, lineHeight: 1.35 }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {trustBadges.length > 0 && (
              <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem' }}>
                {trustBadges.slice(0, 4).map((badge, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      padding: '0.55rem 0.85rem',
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.62)',
                      border: '1px solid rgba(167,139,250,0.18)',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                      fontSize: '0.9rem',
                      color: p.text,
                      opacity: 0.9,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <span style={{ color: p.primary, display: 'inline-flex' }}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    {badge}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* ABOUT: story section */}
      {aboutSection && (
        <motion.section id="about" {...sectionReveal} style={{ padding: '2.75rem 1.5rem' }}>
          <div style={{ maxWidth: '980px', margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -12, borderRadius: '40px', background: `radial-gradient(circle at 30% 20%, rgba(244,114,182,0.18), transparent 55%), radial-gradient(circle at 70% 80%, rgba(167,139,250,0.18), transparent 55%)` }} />
            <div style={{ position: 'relative', padding: '2.25rem 1.5rem', borderRadius: '36px', background: 'rgba(255,255,255,0.78)', border: '1px solid rgba(255,255,255,0.7)', boxShadow: softerShadow, backdropFilter: 'blur(8px)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(1.55rem, 3.4vw, 2.05rem)', margin: 0, background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {aboutSection.title || 'About Us'}
                </h2>
                <p style={{ margin: '0.65rem auto 0', maxWidth: 720, color: p.text, opacity: 0.78, lineHeight: 1.7 }}>
                  {truncateText((Array.isArray(aboutSection.paragraphs) && aboutSection.paragraphs[0]) || '', ABOUT_PARA_MAX)}
                </p>
              </div>

              {Array.isArray(aboutSection.paragraphs) && aboutSection.paragraphs.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
                  {aboutSection.paragraphs.slice(1, 3).map((para, i) => (
                    <div key={i} style={{ padding: '1.05rem 1.1rem', borderRadius: '22px', background: i === 0 ? 'rgba(244,114,182,0.06)' : 'rgba(167,139,250,0.06)', border: '1px solid rgba(244,114,182,0.10)', boxShadow: '0 10px 26px rgba(167, 139, 250, 0.10)' }}>
                      <p style={{ margin: 0, color: p.text, opacity: 0.82, lineHeight: 1.75 }}>
                        {truncateText(para, ABOUT_PARA_MAX)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {Array.isArray(aboutSection.highlights) && aboutSection.highlights.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.65rem', marginTop: '1.6rem' }}>
                  {aboutSection.highlights.slice(0, 4).map((h, i) => (
                    <span key={i} style={{ padding: '0.55rem 0.9rem', borderRadius: pillRadius, background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.18)', color: p.text, fontSize: '0.9rem', fontWeight: 600 }}>
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* SERVICES: curated 2x2 */}
      <motion.section id="services" {...sectionReveal} style={{ padding: '2.75rem 1.5rem' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.35rem' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(1.55rem, 3.4vw, 2.05rem)', margin: 0, color: p.text }}>
              Our Services
            </h2>
            <p style={{ margin: '0.6rem auto 0', maxWidth: 720, color: p.text, opacity: 0.78, lineHeight: 1.7 }}>
              A small, curated offer built to feel premium and complete.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.9rem', alignItems: 'stretch' }}>
            {services.slice(0, 4).map((svc, i) => (
              <motion.div
                key={svc.title || i}
                style={{
                  borderRadius: '32px',
                  background: 'rgba(255,255,255,0.80)',
                  border: '1px solid rgba(255,255,255,0.72)',
                  boxShadow: softerShadow,
                  padding: '1.35rem 1.35rem 1.15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 210
                }}
                whileHover={!prefersReducedMotion ? { y: -4 } : {}}
                transition={{ duration: 0.2 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.85rem' }}>
                  <div style={{ width: 46, height: 46, borderRadius: '16px', background: `linear-gradient(135deg, rgba(244,114,182,0.18), rgba(167,139,250,0.18))`, border: '1px solid rgba(244,114,182,0.14)', color: p.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getServiceIcon(svc.icon)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 900, color: p.text, lineHeight: 1.2 }}>{svc.title}</div>
                    <div style={{ fontSize: '0.86rem', color: p.text, opacity: 0.7 }}>Curated & calm</div>
                  </div>
                </div>

                <p style={{ margin: 0, fontSize: '0.95rem', color: p.text, opacity: 0.82, lineHeight: 1.65, flex: 1 }}>
                  {truncateText(svc.desc, SERVICE_DESC_MAX)}
                </p>

                {Array.isArray(svc.featureList) && svc.featureList.length > 0 && (
                  <div style={{ marginTop: '0.9rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {svc.featureList.slice(0, 2).map((f, j) => (
                      <span key={j} style={{ padding: '0.35rem 0.65rem', borderRadius: pillRadius, background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(167,139,250,0.16)', color: p.text, opacity: 0.88, fontSize: '0.78rem', fontWeight: 800 }}>
                        {truncateText(f, 26)}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* TEAM OR TESTIMONIALS (never both) */}
      {team.length > 0 ? (
        <motion.section id="team" {...sectionReveal} style={{ padding: '2.75rem 1.5rem', background: `linear-gradient(180deg, rgba(167,139,250,0.08), rgba(244,114,182,0.06))` }}>
          <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.35rem' }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(1.55rem, 3.4vw, 2.05rem)', margin: 0, color: p.text }}>
                Our Team
              </h2>
              <p style={{ margin: '0.6rem auto 0', maxWidth: 720, color: p.text, opacity: 0.78, lineHeight: 1.7 }}>
                Human, calm, and trustworthy built around great communication.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.9rem' }}>
              {team.slice(0, 3).map((member, i) => (
                <motion.div
                  key={member.name || i}
                  style={{ borderRadius: '32px', background: 'rgba(255,255,255,0.80)', border: '1px solid rgba(255,255,255,0.72)', boxShadow: softerShadow, padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                  whileHover={!prefersReducedMotion ? { y: -4 } : {}}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ width: 96, height: 96, borderRadius: 999, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 12px 26px rgba(0,0,0,0.08)' }}>
                    <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ marginTop: '0.85rem', fontWeight: 900, color: p.text }}>{member.name}</div>
                  <div style={{ marginTop: 2, fontSize: '0.9rem', color: p.text, opacity: 0.75 }}>{member.role}</div>
                  {member.bio && (
                    <div style={{ marginTop: '0.65rem', fontSize: '0.9rem', color: p.text, opacity: 0.72, lineHeight: 1.6 }}>
                      {truncateText(member.bio, 90)}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      ) : (
        testimonials.length > 0 && (
          <motion.section {...sectionReveal} style={{ padding: '2.75rem 1.5rem', background: 'rgba(244, 114, 182, 0.05)' }}>
            <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.35rem' }}>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(1.55rem, 3.4vw, 2.05rem)', margin: 0, color: p.text }}>
                  Testimonials
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.9rem' }}>
                {testimonials.slice(0, 2).map((t, i) => (
                  <motion.div
                    key={i}
                    style={{ borderRadius: '32px', background: 'rgba(255,255,255,0.80)', border: '1px solid rgba(255,255,255,0.72)', boxShadow: softerShadow, padding: '1.35rem 1.35rem 1.25rem' }}
                    whileHover={!prefersReducedMotion ? { y: -4 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    <p style={{ margin: 0, fontSize: '1rem', color: p.text, opacity: 0.84, lineHeight: 1.75, fontStyle: 'italic' }}>
                      “{truncateText(t.quote, 200)}”
                    </p>
                    <div style={{ marginTop: '0.9rem', fontWeight: 900, color: p.text }}>{t.author}</div>
                    <div style={{ marginTop: 2, fontSize: '0.9rem', color: p.text, opacity: 0.72 }}>{t.role}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )
      )}

      {/* CONTACT + FOOTER: one final block */}
      <motion.section id="contact" {...sectionReveal} style={{ padding: '3rem 1.5rem', background: `linear-gradient(135deg, rgba(244,114,182,0.12), rgba(167,139,250,0.12))` }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <div style={{ borderRadius: '42px', background: 'rgba(255,255,255,0.78)', border: '1px solid rgba(255,255,255,0.72)', boxShadow: softerShadow, overflow: 'hidden' }}>
            <div style={{ padding: '2.1rem 1.75rem', textAlign: 'center' }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(1.65rem, 3.6vw, 2.15rem)', margin: 0, color: p.text }}>
                {contact.pitch || 'Get in Touch'}
              </h2>
              <p style={{ margin: '0.65rem auto 0', maxWidth: 760, color: p.text, opacity: 0.78, lineHeight: 1.7 }}>
                {hero.subheadline ? truncateText(hero.subheadline, 140) : 'A quick hello is enough. We’ll reply clearly, kindly, and with next steps.'}
              </p>

              <div style={{ marginTop: '1.35rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                {contact.address && <span style={{ padding: '0.55rem 0.85rem', borderRadius: 999, background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(167,139,250,0.16)', color: p.text, fontWeight: 800, opacity: 0.9 }}>{truncateText(contact.address, 40)}</span>}
                {contact.phone && <span style={{ padding: '0.55rem 0.85rem', borderRadius: 999, background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(167,139,250,0.16)', color: p.text, fontWeight: 800, opacity: 0.9 }}>{truncateText(contact.phone, 28)}</span>}
                {contact.email && <span style={{ padding: '0.55rem 0.85rem', borderRadius: 999, background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(167,139,250,0.16)', color: p.text, fontWeight: 800, opacity: 0.9 }}>{truncateText(contact.email, 34)}</span>}
              </div>

              <div style={{ marginTop: '1.35rem', display: 'flex', justifyContent: 'center' }}>
                <motion.button
                  style={{ ...pillBtnPrimary, padding: '0.9rem 2.25rem', fontSize: '1rem', fontWeight: 900, backgroundColor: '#fff', color: p.text, boxShadow: '0 15px 35px rgba(0,0,0,0.10)' }}
                  whileHover={!prefersReducedMotion ? { y: -2, boxShadow: '0 20px 40px rgba(0,0,0,0.14)' } : {}}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                >
                  {contact.ctaLabel || 'Contact Us'}
                </motion.button>
              </div>
            </div>

            <div style={{ padding: '1.35rem 1.75rem', borderTop: '1px solid rgba(244,114,182,0.14)' }}>
              <div style={contactFooterGridStyle}>
                <div style={{ gridArea: 'brand', minWidth: 0 }}>
                  <div style={{ fontWeight: 900, color: p.text }}>{industry?.brandName || 'Webenox'}</div>
                  {mission && <div style={{ marginTop: '0.55rem', color: p.text, opacity: 0.76, lineHeight: 1.7 }}>{truncateText(mission, 180)}</div>}
                </div>

                {specialties.length > 0 ? (
                  <div style={{ gridArea: 'specialties', minWidth: 0 }}>
                    <div style={{ fontWeight: 900, color: p.text, marginBottom: '0.55rem' }}>Specialties</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {specialties.slice(0, 4).map((s, i) => (
                        <span key={i} style={{ padding: '0.35rem 0.6rem', borderRadius: pillRadius, background: 'rgba(244,114,182,0.08)', border: '1px solid rgba(244,114,182,0.12)', color: p.text, opacity: 0.88, fontSize: '0.78rem', fontWeight: 800 }}>
                          {truncateText(s, 18)}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ gridArea: 'specialties', minWidth: 0 }} />
                )}

                {relatedResources.length > 0 ? (
                  <div style={{ gridArea: 'links', minWidth: 0 }}>
                    <div style={{ fontWeight: 900, color: p.text, marginBottom: '0.55rem' }}>Links</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {relatedResources.slice(0, 4).map((r, i) => (
                        <span key={i} style={{ padding: '0.35rem 0.6rem', borderRadius: pillRadius, background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.12)', fontWeight: 800, color: p.text, opacity: 0.86, fontSize: '0.78rem' }}>
                          {truncateText(r, 22)}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ gridArea: 'links', minWidth: 0 }} />
                )}

                <div
                  style={{
                    gridArea: 'glance',
                    minWidth: 0,
                    height: '100%',
                    borderRadius: '22px',
                    padding: '1rem 1rem',
                    background: 'rgba(255,255,255,0.72)',
                    border: '1px solid rgba(167,139,250,0.16)',
                    boxShadow: softerShadow,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ fontWeight: 900, color: p.text, marginBottom: '0.55rem' }}>At a glance</div>
                  <div style={{ display: 'grid', gap: '0.55rem', color: p.text, opacity: 0.78, lineHeight: 1.55, fontSize: '0.85rem', flex: 1 }}>
                    {contact.hours && (
                      <div>
                        <div style={{ fontWeight: 900, opacity: 0.92 }}>Hours</div>
                        <div>{truncateText(contact.hours, 120)}</div>
                      </div>
                    )}
                    {contact.email && (
                      <div>
                        <div style={{ fontWeight: 900, opacity: 0.92 }}>Email</div>
                        <div style={{ wordBreak: 'break-word' }}>{truncateText(contact.email, 120)}</div>
                      </div>
                    )}
                    {contact.phone && (
                      <div>
                        <div style={{ fontWeight: 900, opacity: 0.92 }}>Phone</div>
                        <div>{truncateText(contact.phone, 40)}</div>
                      </div>
                    )}
                    {trustBadges.length > 0 && (
                      <div>
                        <div style={{ fontWeight: 900, opacity: 0.92, marginBottom: '0.35rem' }}>Trust</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {trustBadges.slice(0, 3).map((b, i) => (
                            <span key={i} style={{ padding: '0.28rem 0.55rem', borderRadius: 999, background: 'rgba(244,114,182,0.08)', border: '1px solid rgba(244,114,182,0.12)', fontWeight: 900, fontSize: '0.72rem', opacity: 0.9 }}>
                              {truncateText(b, 22)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {!contact.hours && !contact.email && !contact.phone && trustBadges.length === 0 && (
                      <div style={{ fontWeight: 800, opacity: 0.86 }}>
                        Clear intake, calm communication, and a premium finish without the noise.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(167,139,250,0.14)', display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', color: p.text, opacity: 0.72, fontSize: '0.85rem' }}>
                <div>© {new Date().getFullYear()} {industry?.brandName || 'Webenox'}</div>
                <div>Minimal, calm, premium</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default SoftPastelLayout
