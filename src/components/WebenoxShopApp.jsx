import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  SHOP_CATEGORIES,
  SHOP_PRODUCTS,
  SHIPPING_FLAT,
  SORT_OPTIONS,
  WEBENOX_LOGO_SRC
} from '../data/webenoxShopData'
import { COMBO_QUAD, OUTFITS } from '../data/webenoxShopOutfits'

const STORAGE_CART = 'webenoxshop_cart_v1'
const STORAGE_FAVS = 'webenoxshop_favs_v1'
const STORAGE_ORDERS = 'webenoxshop_orders_v1'
const STORAGE_ADDR = 'webenoxshop_address_v1'
const STORAGE_SETTINGS = 'webenoxshop_settings_v1'

/** Fixed media box heights for sneakers (side shots); tweak in one place. */
const SNEAKER_MEDIA = {
  shop: 'h-[8.25rem]',
  home: 'h-[8.25rem]',
  fav: 'h-[7.75rem]',
  detail: 'h-[13.25rem]',
  imgScale: 'scale-[1.16]'
}

const MOCK_ORDERS_SEED = [
  {
    id: 'WBNX-1001',
    date: '2026-04-12',
    itemsCount: 3,
    total: 214.99,
    status: 'Delivered'
  },
  {
    id: 'WBNX-1002',
    date: '2026-04-22',
    itemsCount: 2,
    total: 156.5,
    status: 'Shipped'
  }
]

function dedupeGalleryUrls(product) {
  if (!product?.images) return []
  const order = [product.images.front, product.images.back, product.images.detail].filter(Boolean)
  const seen = new Set()
  const out = []
  for (const url of order) {
    if (!seen.has(url)) {
      seen.add(url)
      out.push(url)
    }
  }
  return out
}

function formatMoney(amount, currency) {
  const n = typeof amount === 'number' ? amount : 0
  if (currency === 'EUR') return `€${n.toFixed(2)}`
  return `$${n.toFixed(2)}`
}

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json)
    return v ?? fallback
  } catch {
    return fallback
  }
}

function normalizeCartLines(raw) {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((l) => l && typeof l.productId === 'string' && l.size != null && String(l.color).length)
    .map((l) => ({
      ...l,
      qty: Math.max(1, Number(l.qty) || 1),
      price: Number(l.price) || 0,
      key: `${l.productId}|${l.size}|${l.color}`
    }))
    .reduce((acc, l) => {
      const i = acc.findIndex((x) => x.key === l.key)
      if (i >= 0) acc[i] = { ...acc[i], qty: acc[i].qty + l.qty }
      else acc.push(l)
      return acc
    }, [])
}

/** Navy / Sand PNGs: transparent edges read as dark pillars under `object-cover`; studio fill on `<img>` only (no `contain`; that caused top/bottom bars in 4:5 tiles). */
const SHORTS_LOOSE_FRAMING_IDS = new Set(['wbnx-core-shorts-navy', 'wbnx-core-shorts-sand'])
const SHORTS_PACKSHOT_FILL = '#babec5'

function shortsLooseFraming(productId) {
  return Boolean(productId && SHORTS_LOOSE_FRAMING_IDS.has(productId))
}

function shortsPackshotImgStyle(productId) {
  if (!shortsLooseFraming(productId)) return undefined
  /**
   * Navy/Sand packshots are vertically centered higher than other shorts.
   * Nudge the crop up (object-position) so the garment sits consistently.
   */
  return { backgroundColor: SHORTS_PACKSHOT_FILL, objectPosition: '50% 40%' }
}

/** Sneakers: compact media height + contained image; cards can be shorter than other categories. */
function catalogMediaBoxClass(category, mode) {
  const sn = category === 'Sneakers'
  const bg = mode === 'home' || mode === 'fav' ? 'bg-black/40' : 'bg-black/50'
  if (!sn) {
    if (mode === 'shop') return `relative w-full ${bg} aspect-[4/5] overflow-hidden`
    if (mode === 'home' || mode === 'fav') return `relative w-full ${bg} aspect-square overflow-hidden`
    return `relative w-full ${bg} aspect-square overflow-hidden`
  }
  if (mode === 'shop') return `relative flex ${SNEAKER_MEDIA.shop} w-full items-center justify-center overflow-hidden ${bg}`
  if (mode === 'home') return `relative flex ${SNEAKER_MEDIA.home} w-full items-center justify-center overflow-hidden ${bg}`
  if (mode === 'fav') return `relative flex ${SNEAKER_MEDIA.fav} w-full items-center justify-center overflow-hidden ${bg}`
  return `relative flex ${SNEAKER_MEDIA.detail} w-full items-center justify-center overflow-hidden ${bg}`
}

function catalogThumbImgClass(category) {
  if (category === 'Sneakers') {
    return `block h-full w-full origin-center object-contain ${SNEAKER_MEDIA.imgScale}`
  }
  return 'block h-full w-full object-cover object-center'
}

const pill =
  'rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-white/80 whitespace-nowrap transition-all duration-200 hover:scale-[1.04] hover:border-white/18 hover:bg-white/[0.08] active:scale-[0.97]'
const pillActive =
  'rounded-full border border-accent/35 bg-accent/15 px-3 py-1.5 text-[11px] font-bold text-accent shadow-[0_0_16px_rgba(0,201,255,0.15)] whitespace-nowrap transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]'
const btnPrimary =
  'rounded-full bg-gradient-to-r from-accent to-purple px-4 py-3 text-xs font-extrabold text-background shadow-lg transition-all duration-200 hover:brightness-110 hover:shadow-[0_12px_32px_-8px_rgba(0,201,255,0.35)] active:scale-[0.98]'
const btnGhost =
  'rounded-full border border-white/12 bg-white/5 px-4 py-3 text-xs font-extrabold text-white/85 transition-all duration-200 hover:bg-white/12 hover:border-white/20 active:scale-[0.98]'
const card = 'rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm overflow-hidden shadow-[0_12px_40px_-20px_rgba(0,0,0,0.65)]'

/** Glass chevron control; avoids generic “← Back” copy on every screen. */
function ShopBackButton({ onClick, ariaLabel = 'Go back' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="group inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/14 bg-gradient-to-br from-white/[0.11] to-white/[0.03] text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_6px_22px_-10px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all duration-200 hover:border-accent/45 hover:text-accent hover:shadow-[0_0_32px_-8px_rgba(0,201,255,0.32)] active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[1.15rem] w-[1.15rem] -translate-x-px transition-transform duration-200 group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  )
}

const ProductImage = ({ src, alt = '', className, loading = 'lazy', style }) => {
  const [err, setErr] = useState(false)
  return (
    <img
      src={err ? WEBENOX_LOGO_SRC : src}
      alt={alt || 'Product'}
      loading={loading}
      decoding="async"
      onError={() => setErr(true)}
      className={className}
      style={style}
      draggable={false}
    />
  )
}

function ShopGridProductTile({ product: p, card, favorites, currency, onOpen, onToggleFav, onQuickAdd, showCategoryLabel, tileIndex = 0 }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.34,
        delay: Math.min(tileIndex * 0.042, 0.42),
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{
        y: -5,
        transition: { type: 'spring', stiffness: 420, damping: 24 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`group flex flex-col border border-transparent transition-[box-shadow,border-color] duration-300 hover:border-accent/28 hover:shadow-[0_20px_48px_-24px_rgba(0,201,255,0.2)] ${card}`}
    >
      <button type="button" onClick={() => onOpen(p.id)} className="flex h-full flex-col text-left">
        <div className={`${catalogMediaBoxClass(p.category, 'shop')} shrink-0 transition-colors duration-300 group-hover:bg-white/[0.07]`}>
          <ProductImage
            src={p.images.front}
            alt={p.name}
            style={shortsPackshotImgStyle(p.id)}
            className={`${catalogThumbImgClass(p.category)}${
              p.category === 'Sneakers' ? '' : ' transition-transform duration-300 group-hover:scale-[1.04]'
            }`}
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col p-3">
          {showCategoryLabel ? (
            <div className="text-[10px] font-bold uppercase tracking-wide text-white/40">{p.category}</div>
          ) : null}
          <div className="min-h-[2.6rem] line-clamp-2 text-[11px] font-extrabold leading-snug transition-colors group-hover:text-white">
            {p.name}
          </div>
          <div className="mt-auto pt-2">
            <div className="text-[10px] text-white/45">{p.color}</div>
            <div className="mt-1 text-xs font-extrabold text-accent">{formatMoney(p.price, currency)}</div>
          </div>
        </div>
      </button>
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/10 px-3 py-2">
        <button
          type="button"
          onClick={() => onToggleFav(p.id)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors duration-200 hover:border-accent/25 hover:bg-white/10 hover:text-accent"
          aria-label="Favorite"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill={favorites.has(p.id) ? 'currentColor' : 'none'}>
            <path
              d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 7-3 4.5 4.5 0 0 1 7 3c0 5.65-7 10-7 10Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onQuickAdd(p)
          }}
          className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-[10px] font-extrabold text-accent transition-all duration-200 hover:border-accent/55 hover:bg-accent/20 hover:shadow-[0_0_20px_-4px_rgba(0,201,255,0.35)]"
        >
          Quick add
        </button>
      </div>
    </motion.div>
  )
}

const WebenoxShopApp = forwardRef(function WebenoxShopApp(_props, ref) {
  const [tab, setTab] = useState('home')
  const [view, setView] = useState('main')
  const [detailId, setDetailId] = useState(null)
  const [orderNumber, setOrderNumber] = useState(null)
  const [orderTotal, setOrderTotal] = useState(0)

  const [category, setCategory] = useState('All')
  const [homeCategory, setHomeCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sortId, setSortId] = useState('popular')

  const [cart, setCart] = useState(() =>
    normalizeCartLines(safeParse(typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_CART) : null, []))
  )
  const [favorites, setFavorites] = useState(() => new Set(safeParse(typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_FAVS) : null, [])))

  const [toast, setToast] = useState(null)
  const [cartBump, setCartBump] = useState(false)

  const [checkout, setCheckout] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postal: '',
    payment: 'card'
  })
  const [checkoutErrors, setCheckoutErrors] = useState({})
  const [checkoutPhase, setCheckoutPhase] = useState(1)

  const [homeVisibleCount, setHomeVisibleCount] = useState(8)

  const [cartModal, setCartModal] = useState(null)
  /** Bumped when add-to-cart sheet closes so detail view resets its CTA animation. */
  const [detailCartUiNonce, setDetailCartUiNonce] = useState(0)
  const [outfitModal, setOutfitModal] = useState(null)
  const [quickAddProduct, setQuickAddProduct] = useState(null)

  const [outfitId, setOutfitId] = useState(null)

  const [profilePanel, setProfilePanel] = useState(null)

  const [orders, setOrders] = useState(() => {
    const raw = safeParse(typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_ORDERS) : null, null)
    return Array.isArray(raw) && raw.length ? raw : MOCK_ORDERS_SEED
  })
  const [address, setAddress] = useState(() =>
    safeParse(typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_ADDR) : null, {
      name: 'Demo Customer',
      line1: 'Torstrasse 12',
      city: 'Berlin',
      postal: '10115',
      country: 'Germany'
    })
  )
  const [settings, setSettings] = useState(() =>
    safeParse(typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_SETTINGS) : null, {
      notifications: true,
      currency: 'EUR'
    })
  )
  const [addrDraft, setAddrDraft] = useState(null)
  const [clearConfirm, setClearConfirm] = useState(false)

  useEffect(() => {
    setHomeVisibleCount(8)
  }, [homeCategory])

  useEffect(() => {
    if (!SHOP_CATEGORIES.includes(category)) setCategory('All')
  }, [category])

  useEffect(() => {
    if (!SHOP_CATEGORIES.includes(homeCategory)) setHomeCategory('All')
  }, [homeCategory])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_CART, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_FAVS, JSON.stringify([...favorites]))
  }, [favorites])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_ORDERS, JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_ADDR, JSON.stringify(address))
  }, [address])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(settings))
  }, [settings])

  const showToast = useCallback((msg) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2200)
  }, [])

  const cartCount = useMemo(() => cart.reduce((n, l) => n + Number(l.qty || 0), 0), [cart])

  const bumpCart = () => {
    setCartBump(true)
    window.setTimeout(() => setCartBump(false), 450)
  }

  const productById = useCallback((id) => SHOP_PRODUCTS.find((p) => p.id === id), [])

  const filteredProducts = useMemo(() => {
    let list = [...SHOP_PRODUCTS]
    if (category !== 'All') list = list.filter((p) => p.category === category)
    else list = list.filter((p) => p.category !== 'Campaign')
    const q = search.trim().toLowerCase()
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q) || p.color.toLowerCase().includes(q))
    if (sortId === 'price_low') list.sort((a, b) => a.price - b.price)
    else if (sortId === 'price_high') list.sort((a, b) => b.price - a.price)
    else if (sortId === 'newest') list = [...list].reverse()
    else list.sort((a, b) => (b.popular || 0) - (a.popular || 0))
    return list
  }, [category, search, sortId])

  /** When browsing All without search, show products in category sections (same order as pills). */
  const shopGroupedByCategory = useMemo(() => {
    if (category !== 'All' || search.trim()) return null
    const order = SHOP_CATEGORIES.filter((c) => c !== 'All' && c !== 'Campaign')
    const buckets = Object.fromEntries(order.map((c) => [c, []]))
    for (const p of filteredProducts) {
      const b = buckets[p.category]
      if (b) b.push(p)
    }
    return order.map((c) => ({ category: c, products: buckets[c] })).filter((block) => block.products.length > 0)
  }, [category, search, filteredProducts])

  const featuredBase = useMemo(() => SHOP_PRODUCTS.filter((p) => p.featured && p.category !== 'Campaign'), [])
  /** Home grid: All = featured only; other pills = full catalog in that category (so Sneakers etc. are never empty). */
  const homeGridProducts = useMemo(() => {
    if (homeCategory === 'All') return featuredBase
    return SHOP_PRODUCTS.filter((p) => p.category === homeCategory)
  }, [homeCategory, featuredBase])

  const openProduct = (id) => {
    setOutfitId(null)
    setDetailId(id)
    setView('detail')
  }

  const goCheckout = () => {
    if (!cart.length) {
      showToast('Cart is empty')
      return
    }
    setCheckoutErrors({})
    setCheckoutPhase(1)
    setView('checkout')
  }

  const validateCheckout = () => {
    const e = {}
    if (!checkout.name.trim()) e.name = 'Required'
    if (!checkout.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkout.email)) e.email = 'Valid email required'
    if (!checkout.address.trim()) e.address = 'Required'
    if (!checkout.city.trim()) e.city = 'Required'
    if (!checkout.postal.trim()) e.postal = 'Required'
    setCheckoutErrors(e)
    return Object.keys(e).length === 0
  }

  const validateShippingOnly = useCallback(() => {
    const e = {}
    if (!checkout.name.trim()) e.name = 'Required'
    if (!checkout.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkout.email)) e.email = 'Valid email required'
    if (!checkout.address.trim()) e.address = 'Required'
    if (!checkout.city.trim()) e.city = 'Required'
    if (!checkout.postal.trim()) e.postal = 'Required'
    setCheckoutErrors(e)
    return Object.keys(e).length === 0
  }, [checkout])

  const placeOrder = () => {
    if (!validateCheckout()) return
    const n = `WBNX-${Date.now().toString(36).toUpperCase().slice(-8)}`
    const t = subtotal + SHIPPING_FLAT
    setOrderNumber(n)
    setOrderTotal(t)
    setOrders((prev) => [
      {
        id: n,
        date: new Date().toISOString().slice(0, 10),
        itemsCount: cart.reduce((s, l) => s + l.qty, 0),
        total: t,
        status: 'Confirmed'
      },
      ...prev
    ])
    setCart([])
    setCheckoutPhase(1)
    setView('success')
    showToast('Order confirmed')
  }

  const toggleFav = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const addToCartLine = (line, opts = {}) => {
    const { silentToast, suppressModal } = opts
    const lineKey = `${line.productId}|${line.size}|${line.color}`
    setCart((prev) => {
      const i = prev.findIndex((l) => l.key === lineKey)
      if (i >= 0) {
        const next = [...prev]
        next[i] = { ...next[i], qty: next[i].qty + line.qty }
        return next
      }
      return [...prev, { ...line, key: lineKey }]
    })
    bumpCart()
    if (!suppressModal) {
      setCartModal({
        type: 'single',
        productId: line.productId,
        image: line.image,
        name: line.name,
        size: line.size,
        price: line.price * line.qty
      })
    } else if (!silentToast) {
      showToast('Added to cart')
    }
  }

  const addOutfitToCart = (outfit, size = 'M') => {
    setCart((prev) => {
      let next = [...prev]
      for (const it of outfit.items) {
        const p = SHOP_PRODUCTS.find((x) => x.id === it.productId)
        if (!p) continue
        const line = {
          productId: p.id,
          name: p.name,
          color: p.color,
          size,
          qty: 1,
          price: p.price,
          image: p.images.front
        }
        const lineKey = `${line.productId}|${line.size}|${line.color}`
        const i = next.findIndex((l) => l.key === lineKey)
        if (i >= 0) next[i] = { ...next[i], qty: next[i].qty + line.qty }
        else next.push({ ...line, key: lineKey })
      }
      return next
    })
    bumpCart()
    const total = outfit.items.reduce((s, it) => {
      const p = SHOP_PRODUCTS.find((x) => x.id === it.productId)
      return s + (p?.price || 0)
    }, 0)
    setOutfitModal({ outfitName: outfit.name, total })
  }

  const updateQty = (key, delta) => {
    setCart((prev) =>
      prev
        .map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    )
  }

  const removeLine = (key) => {
    setCart((prev) => prev.filter((l) => l.key !== key))
  }

  const subtotal = useMemo(() => cart.reduce((s, l) => s + l.price * l.qty, 0), [cart])
  const total = subtotal + (cart.length ? SHIPPING_FLAT : 0)

  useImperativeHandle(
    ref,
    () => ({
      osBack: () => {
        if (cartModal) {
          setCartModal(null)
          return true
        }
        if (outfitModal) {
          setOutfitModal(null)
          return true
        }
        if (quickAddProduct) {
          setQuickAddProduct(null)
          return true
        }
        if (clearConfirm) {
          setClearConfirm(false)
          return true
        }
        if (profilePanel) {
          setProfilePanel(null)
          return true
        }
        if (view === 'outfit') {
          setOutfitId(null)
          setView('combos')
          return true
        }
        if (view === 'combos') {
          setView('main')
          setTab('home')
          return true
        }
        if (view === 'success') {
          setView('main')
          setTab('home')
          setOrderNumber(null)
          setOrderTotal(0)
          return true
        }
        if (view === 'checkout') {
          if (checkoutPhase > 1) {
            setCheckoutPhase((p) => p - 1)
            return true
          }
          setView('main')
          setTab('cart')
          return true
        }
        if (view === 'detail') {
          setDetailId(null)
          setView('main')
          return true
        }
        return false
      }
    }),
    [cartModal, outfitModal, quickAddProduct, clearConfirm, profilePanel, view, checkoutPhase]
  )

  const bottomNav = (
    <div className="shrink-0 border-t border-white/10 bg-[#05070c]/92 backdrop-blur-lg px-2 pt-1.5 pb-[calc(0.35rem+env(safe-area-inset-bottom,0px))]">
      <div className="grid grid-cols-4 gap-0.5">
        {[
          { id: 'home', label: 'Home', icon: 'M5 10l7-6 7 6M5 10v9h5v-6h4v6h5v-9' },
          { id: 'shop', label: 'Shop', icon: 'M4 7h16M6 7v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7M9 11h6' },
          { id: 'cart', label: 'Cart', icon: 'M7 7h13l-1 9H8L7 7Zm0 0L6 3H3M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z' },
          { id: 'profile', label: 'Profile', icon: 'M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4Z' }
        ].map((t) => {
          const active = tab === t.id && view === 'main'
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setView('main')
                setTab(t.id)
                setDetailId(null)
                setProfilePanel(null)
              }}
              className={`relative flex flex-col items-center gap-0.5 rounded-xl py-1.5 transition-all duration-200 active:scale-95 ${
                active ? 'bg-white/10 text-white' : 'text-white/45 hover:scale-[1.04] hover:bg-white/5 hover:text-white/80'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                <path d={t.icon} stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[9px] font-extrabold uppercase tracking-wide">{t.label}</span>
              {t.id === 'cart' && cartCount > 0 ? (
                <span
                  className={`absolute right-2 top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent px-1 text-[9px] font-black text-background ${
                    cartBump ? 'scale-125' : ''
                  } transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="webenox-shop-app relative flex h-full w-full min-h-0 flex-col overflow-hidden bg-gradient-to-b from-[#06080f] via-[#070a12] to-[#03040a] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
            backgroundSize: '22px 22px'
          }}
        />
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {view === 'main' ? (
            <motion.div
              key={`main-${tab}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex min-h-0 flex-1 flex-col overflow-hidden"
            >
              {/* Header */}
              <header className="shrink-0 px-4 pb-2 pt-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <img src={WEBENOX_LOGO_SRC} alt="" className="h-8 w-8 shrink-0 object-contain" draggable={false} />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-extrabold tracking-tight">WebenoxShop</div>
                      <div className="truncate text-[10px] text-white/45">Premium digital streetwear</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setView('main')
                      setTab('cart')
                    }}
                    className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition-all duration-200 hover:scale-105 hover:border-accent/25 hover:bg-white/12"
                    aria-label="Cart"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path
                        d="M7 7h13l-1 9H8L7 7Zm0 0L6 3H3M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                        stroke="currentColor"
                        strokeWidth="1.45"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {cartCount > 0 ? (
                      <span
                        className={`absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-black text-background ${
                          cartBump ? 'scale-125' : ''
                        } transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
                      >
                        {cartCount > 9 ? '9+' : cartCount}
                      </span>
                    ) : null}
                  </button>
                </div>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-2">
                {tab === 'home' && (
                  <div className="space-y-5 px-4 pb-28">
                    <div>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">Shop the Look</div>
                      <motion.button
                        type="button"
                        onClick={() => setView('combos')}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                        className={`relative w-full overflow-hidden rounded-3xl text-left transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(0,201,255,0.15)] ${card}`}
                      >
                        <div className="relative flex aspect-[16/10] w-full">
                          {COMBO_QUAD.map((z, i) => (
                            <div key={z.outfitId} className={`relative min-w-0 flex-1 ${i < 3 ? 'border-r border-white/15' : ''}`}>
                              <ProductImage src={z.image} alt={z.label} className="h-full w-full object-cover" />
                              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent py-2 text-center text-[8px] font-black uppercase tracking-wide text-white/90">
                                {z.label}
                              </div>
                            </div>
                          ))}
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <span className="rounded-full border border-white/20 bg-black/55 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-sm">
                              WBNX Combos
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    </div>

                    <div>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">Categories</div>
                      <div className="wbnx-shop-pills-x -mx-1 flex gap-2 overflow-x-auto">
                        {SHOP_CATEGORIES.map((c) => (
                          <button key={c} type="button" onClick={() => setHomeCategory(c)} className={homeCategory === c ? pillActive : pill}>
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 text-xs font-extrabold text-white/90">
                        {homeCategory === 'All' ? 'Featured' : homeCategory}
                      </div>
                      {homeGridProducts.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-12 text-center"
                        >
                          <div className="text-sm font-extrabold text-white/90">Nothing in this category yet</div>
                          <p className="mt-2 text-xs text-white/45">Pick another filter or browse the full shop.</p>
                          <button
                            type="button"
                            className={`${btnPrimary} mt-5 w-full max-w-xs`}
                            onClick={() => {
                              setHomeCategory('All')
                              setTab('shop')
                              setCategory('All')
                              setSearch('')
                            }}
                          >
                            Browse shop
                          </button>
                        </motion.div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {(homeCategory === 'All' ? homeGridProducts.slice(0, homeVisibleCount) : homeGridProducts).map((p, i) => (
                            <motion.button
                              key={p.id}
                              type="button"
                              initial={{ opacity: 0, y: 16 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.32,
                                delay: Math.min(i * 0.045, 0.38),
                                ease: [0.22, 1, 0.36, 1]
                              }}
                              whileHover={{
                                y: -4,
                                transition: { type: 'spring', stiffness: 400, damping: 22 }
                              }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => openProduct(p.id)}
                              className={`group text-left ${card} border border-transparent transition-[box-shadow,border-color] duration-300 hover:border-accent/25 hover:shadow-[0_16px_44px_-22px_rgba(0,201,255,0.16)]`}
                            >
                              <div className={`${catalogMediaBoxClass(p.category, 'home')} transition-colors duration-300`}>
                                <ProductImage
                                  src={p.images.front}
                                  alt={p.name}
                                  style={shortsPackshotImgStyle(p.id)}
                                  className={catalogThumbImgClass(p.category)}
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFav(p.id)
                                  }}
                                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm transition-colors duration-200 hover:border-accent/35 hover:bg-black/55 hover:text-accent"
                                  aria-label="Favorite"
                                >
                                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill={favorites.has(p.id) ? 'currentColor' : 'none'}>
                                    <path
                                      d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 7-3 4.5 4.5 0 0 1 7 3c0 5.65-7 10-7 10Z"
                                      stroke="currentColor"
                                      strokeWidth="1.35"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <div className="space-y-1 p-3">
                                <div className="text-[10px] font-bold uppercase tracking-wide text-white/40">{p.category}</div>
                                <div className="line-clamp-2 text-[11px] font-bold leading-snug text-white/90">{p.name}</div>
                                <div className="text-xs font-extrabold text-accent">{formatMoney(p.price, settings.currency)}</div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      )}
                      {homeCategory === 'All' && homeGridProducts.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (homeGridProducts.length > homeVisibleCount) {
                              setHomeVisibleCount((n) => Math.min(n + 8, homeGridProducts.length))
                            } else {
                              setTab('shop')
                              setCategory('All')
                              setSearch('')
                            }
                          }}
                          className={`${btnGhost} mt-4 w-full border-accent/25 text-accent`}
                        >
                          See more
                        </button>
                      ) : null}
                    </div>
                  </div>
                )}

                {tab === 'shop' && (
                  <div className="space-y-4 px-4 pb-24">
                    <div className="relative">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                        aria-hidden
                      >
                        <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products…"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-xs font-semibold text-white/90 placeholder:text-white/35 outline-none transition-all duration-200 focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(0,201,255,0.12)]"
                      />
                    </div>
                    <div className="wbnx-shop-pills-x -mx-1 flex gap-2 overflow-x-auto">
                      {SHOP_CATEGORIES.map((c) => (
                        <button key={c} type="button" onClick={() => setCategory(c)} className={category === c ? pillActive : pill}>
                          {c}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-white/40">Sort</span>
                      {SORT_OPTIONS.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSortId(s.id)}
                          className={sortId === s.id ? pillActive : pill}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                    {filteredProducts.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-white/10 bg-white/5 px-5 py-14 text-center"
                      >
                        <div className="text-sm font-extrabold text-white/90">No matches</div>
                        <p className="mt-2 text-xs text-white/45">Try another search or switch category.</p>
                        <button
                          type="button"
                          className={`${btnPrimary} mt-6 w-full max-w-xs`}
                          onClick={() => {
                            setSearch('')
                            setCategory('All')
                          }}
                        >
                          Reset filters
                        </button>
                      </motion.div>
                    ) : shopGroupedByCategory && shopGroupedByCategory.length > 0 ? (
                      <div className="space-y-8">
                        {shopGroupedByCategory.map((block) => (
                          <section key={block.category} className="space-y-3">
                            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">{block.category}</div>
                            <div className="grid grid-cols-2 gap-3">
                              {block.products.map((p, pi) => (
                                <ShopGridProductTile
                                  key={p.id}
                                  tileIndex={pi}
                                  product={p}
                                  card={card}
                                  favorites={favorites}
                                  currency={settings.currency}
                                  showCategoryLabel={false}
                                  onOpen={openProduct}
                                  onToggleFav={toggleFav}
                                  onQuickAdd={setQuickAddProduct}
                                />
                              ))}
                            </div>
                          </section>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {filteredProducts.map((p, i) => (
                          <ShopGridProductTile
                            key={p.id}
                            tileIndex={i}
                            product={p}
                            card={card}
                            favorites={favorites}
                            currency={settings.currency}
                            showCategoryLabel={category === 'All' && Boolean(search.trim())}
                            onOpen={openProduct}
                            onToggleFav={toggleFav}
                            onQuickAdd={setQuickAddProduct}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {tab === 'cart' && (
                  <div className="space-y-4 px-4 pb-28">
                    {!cart.length ? (
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-white/50">Your cart is empty.</div>
                    ) : (
                      cart.map((line) => (
                        <div key={line.key} className={`flex gap-3 p-3 ${card}`}>
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-black/40">
                            <ProductImage
                              src={line.image}
                              alt={line.name}
                              style={shortsPackshotImgStyle(line.productId)}
                              className="block h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-extrabold leading-snug">{line.name}</div>
                            <div className="mt-0.5 text-[10px] text-white/45">
                              {line.color} · {line.size}
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                type="button"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-lg leading-none"
                                onClick={() => updateQty(line.key, -1)}
                              >
                                −
                              </button>
                              <span className="min-w-[1.5rem] text-center text-xs font-bold">{line.qty}</span>
                              <button
                                type="button"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-lg leading-none"
                                onClick={() => updateQty(line.key, 1)}
                              >
                                +
                              </button>
                              <button type="button" className="ml-auto text-[10px] font-bold text-rose-300" onClick={() => removeLine(line.key)}>
                                Remove
                              </button>
                            </div>
                          </div>
                          <div className="shrink-0 text-right text-xs font-extrabold">
                            {formatMoney(line.price * line.qty, settings.currency)}
                          </div>
                        </div>
                      ))
                    )}
                    {cart.length > 0 && (
                      <div className={`space-y-2 p-4 ${card}`}>
                        <div className="flex justify-between text-xs text-white/60">
                          <span>Subtotal</span>
                          <span className="font-bold text-white/90">{formatMoney(subtotal, settings.currency)}</span>
                        </div>
                        <div className="flex justify-between text-xs text-white/60">
                          <span>Shipping</span>
                          <span className="font-bold text-white/90">{formatMoney(SHIPPING_FLAT, settings.currency)}</span>
                        </div>
                        <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-extrabold">
                          <span>Total</span>
                          <span className="text-accent">{formatMoney(total, settings.currency)}</span>
                        </div>
                        <button type="button" className={`${btnPrimary} mt-2 w-full`} onClick={goCheckout}>
                          Checkout
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {tab === 'profile' && !profilePanel && (
                  <div className="space-y-4 px-4 pb-28">
                    <div className={`flex items-center gap-4 p-4 ${card}`}>
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-lg font-black text-accent">
                        DC
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold">Demo Customer</div>
                        <a href="mailto:customer@webenox.shop" className="text-[11px] font-semibold text-accent truncate block">
                          customer@webenox.shop
                        </a>
                      </div>
                    </div>
                    <div className={`${card} divide-y divide-white/10`}>
                      {[
                        { id: 'orders', label: 'Order history' },
                        { id: 'favorites', label: 'Favorites' },
                        { id: 'addresses', label: 'Addresses' },
                        { id: 'settings', label: 'Settings' },
                        { id: 'clear', label: 'Clear local data', danger: true }
                      ].map((row) => (
                        <button
                          key={row.id}
                          type="button"
                          onClick={() => {
                            if (row.id === 'clear') setClearConfirm(true)
                            else setProfilePanel(row.id)
                          }}
                          className={`flex w-full items-center justify-between px-4 py-3 text-left text-xs font-bold hover:bg-white/5 ${
                            row.danger ? 'text-rose-300' : 'text-white/80'
                          }`}
                        >
                          {row.label}
                          <span className="text-white/30">›</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {tab === 'profile' && profilePanel === 'orders' && (
                  <div className="space-y-3 px-4 pb-28">
                    <div className="flex items-center gap-3">
                      <ShopBackButton onClick={() => setProfilePanel(null)} ariaLabel="Back to profile" />
                      <div className="text-sm font-extrabold">Order history</div>
                    </div>
                    <div className="space-y-2">
                      {orders.map((o) => (
                        <div key={o.id} className={`rounded-2xl border border-white/10 bg-white/5 p-4 ${card}`}>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[11px] font-bold text-accent">{o.id}</span>
                            <span className="text-[10px] font-bold uppercase text-white/40">{o.status}</span>
                          </div>
                          <div className="mt-2 flex justify-between text-[11px] text-white/55">
                            <span>{o.date}</span>
                            <span>
                              {o.itemsCount} items · {formatMoney(o.total, settings.currency)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === 'profile' && profilePanel === 'favorites' && (
                  <div className="space-y-3 px-4 pb-28">
                    <div className="flex items-center gap-3">
                      <ShopBackButton onClick={() => setProfilePanel(null)} ariaLabel="Back to profile" />
                      <div className="text-sm font-extrabold">Favorites</div>
                    </div>
                    {SHOP_PRODUCTS.filter((p) => favorites.has(p.id)).length === 0 ? (
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-white/45">
                        No favorite products yet
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {SHOP_PRODUCTS.filter((p) => favorites.has(p.id)).map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setProfilePanel(null)
                              openProduct(p.id)
                            }}
                            className={`text-left ${card}`}
                          >
                            <div className={catalogMediaBoxClass(p.category, 'fav')}>
                              <ProductImage
                                src={p.images.front}
                                alt={p.name}
                                style={shortsPackshotImgStyle(p.id)}
                                className={catalogThumbImgClass(p.category)}
                              />
                            </div>
                            <div className="p-2">
                              <div className="line-clamp-2 text-[10px] font-bold">{p.name}</div>
                              <div className="mt-1 text-[10px] font-extrabold text-accent">{formatMoney(p.price, settings.currency)}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {tab === 'profile' && profilePanel === 'addresses' && (
                  <div className="space-y-3 px-4 pb-28">
                    <div className="flex items-center gap-3">
                      <ShopBackButton onClick={() => setProfilePanel(null)} ariaLabel="Back to profile" />
                      <div className="text-sm font-extrabold">Addresses</div>
                    </div>
                    <div className={`space-y-3 p-4 ${card}`}>
                      {addrDraft ? (
                        <>
                          {['name', 'line1', 'city', 'postal', 'country'].map((k) => (
                            <label key={k} className="block">
                              <div className="text-[10px] font-bold uppercase text-white/40">{k}</div>
                              <input
                                value={addrDraft[k] || ''}
                                onChange={(e) => setAddrDraft((d) => ({ ...d, [k]: e.target.value }))}
                                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/90 outline-none focus:border-accent/35"
                              />
                            </label>
                          ))}
                          <div className="flex gap-2 pt-2">
                            <button type="button" className={btnGhost + ' flex-1'} onClick={() => setAddrDraft(null)}>
                              Cancel
                            </button>
                            <button
                              type="button"
                              className={btnPrimary + ' flex-1'}
                              onClick={() => {
                                setAddress(addrDraft)
                                setAddrDraft(null)
                              }}
                            >
                              Save
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-xs font-bold text-white/90">{address.name}</div>
                          <div className="text-[11px] text-white/60">{address.line1}</div>
                          <div className="text-[11px] text-white/60">
                            {address.postal} {address.city}
                          </div>
                          <div className="text-[11px] text-white/60">{address.country}</div>
                          <button type="button" className={`${btnGhost} mt-2 w-full`} onClick={() => setAddrDraft({ ...address })}>
                            Edit address
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {tab === 'profile' && profilePanel === 'settings' && (
                  <div className="space-y-4 px-4 pb-28">
                    <div className="flex items-center gap-3">
                      <ShopBackButton onClick={() => setProfilePanel(null)} ariaLabel="Back to profile" />
                      <div className="text-sm font-extrabold">Settings</div>
                    </div>
                    <div className={`space-y-4 p-4 ${card}`}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold text-white/80">Push notifications</span>
                        <button
                          type="button"
                          onClick={() => setSettings((s) => ({ ...s, notifications: !s.notifications }))}
                          className={`relative h-7 w-12 rounded-full transition-colors ${settings.notifications ? 'bg-accent/40' : 'bg-white/15'}`}
                        >
                          <span
                            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                              settings.notifications ? 'left-5' : 'left-0.5'
                            }`}
                          />
                        </button>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase text-white/40">Display</div>
                        <div className="mt-1 text-xs text-white/55">Dark luxury mode (always on)</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase text-white/40">Currency (demo)</div>
                        <div className="mt-2 flex gap-2">
                          {['EUR', 'USD'].map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setSettings((s) => ({ ...s, currency: c }))}
                              className={settings.currency === c ? pillActive : pill}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : null}

          {view === 'combos' ? (
            <motion.div
              key="combos"
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.22 }}
              className="flex min-h-0 flex-1 flex-col overflow-hidden"
            >
              <div className="shrink-0 px-4 pb-2 pt-3">
                <ShopBackButton onClick={() => setView('main')} ariaLabel="Back to home" />
                <div className="mt-2 text-sm font-extrabold">WBNX Combos</div>
                <div className="mt-1 text-[10px] text-white/45">Tap a look to shop the full outfit.</div>
              </div>
              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-28">
                {OUTFITS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => {
                      setOutfitId(o.id)
                      setView('outfit')
                    }}
                    className={`flex w-full gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-left`}
                  >
                    <div className="relative h-36 w-24 shrink-0 overflow-hidden rounded-xl bg-transparent ring-1 ring-inset ring-white/10">
                      <ProductImage
                        src={o.heroImage}
                        alt=""
                        className="h-full w-full object-contain object-center"
                      />
                    </div>
                    <div className="min-w-0 flex-1 py-1">
                      <div className="text-sm font-extrabold leading-tight">{o.name}</div>
                      <div className="mt-1 line-clamp-2 text-[11px] text-white/50">{o.tagline}</div>
                      <div className="mt-2 text-[10px] font-bold uppercase tracking-wide text-accent">
                        {o.items.length} pieces ·{' '}
                        {formatMoney(
                          o.items.reduce((s, it) => s + (SHOP_PRODUCTS.find((p) => p.id === it.productId)?.price || 0), 0),
                          settings.currency
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : null}

          {view === 'outfit' && outfitId ? (
            <OutfitDetailScreen
              key="outfit"
              outfit={OUTFITS.find((o) => o.id === outfitId)}
              currency={settings.currency}
              onBack={() => {
                setOutfitId(null)
                setView('combos')
              }}
              onAddOutfit={(outfit, sz) => addOutfitToCart(outfit, sz)}
              onViewSeparately={(outfit) => {
                setView('main')
                setTab('shop')
                setOutfitId(null)
                setSearch('')
              }}
              openProduct={openProduct}
            />
          ) : null}

          {view === 'detail' && detailId ? (
            <ProductDetailView
              key="detail"
              product={productById(detailId)}
              favorites={favorites}
              onToggleFav={toggleFav}
              onBack={() => {
                setDetailId(null)
                setView('main')
              }}
              onAddLine={(line) => addToCartLine(line, { suppressModal: true, silentToast: true })}
              onShowAddedSheet={(payload) => setCartModal(payload)}
              detailCartUiNonce={detailCartUiNonce}
              currency={settings.currency}
            />
          ) : null}

          {view === 'checkout' ? (
            <CheckoutView
              key="checkout"
              phase={checkoutPhase}
              checkout={checkout}
              setCheckout={setCheckout}
              errors={checkoutErrors}
              cart={cart}
              subtotal={subtotal}
              shipping={SHIPPING_FLAT}
              total={total}
              currency={settings.currency}
              validateShipping={validateShippingOnly}
              onBack={() => {
                if (checkoutPhase > 1) setCheckoutPhase((p) => p - 1)
                else {
                  setView('main')
                  setTab('cart')
                }
              }}
              onNext={() => setCheckoutPhase((p) => Math.min(3, p + 1))}
              onPlace={placeOrder}
            />
          ) : null}

          {view === 'success' ? (
            <SuccessView
              key="success"
              orderNumber={orderNumber}
              total={orderTotal}
              currency={settings.currency}
              onContinue={() => {
                setView('main')
                setTab('home')
                setOrderNumber(null)
                setOrderTotal(0)
              }}
            />
          ) : null}
        </AnimatePresence>

        {view === 'main' && !profilePanel ? bottomNav : null}
      </div>

      <AnimatePresence>
        {(cartModal || outfitModal) && (
          <motion.div
            key="cart-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] flex items-end justify-center bg-black/55 p-3 backdrop-blur-sm"
            onClick={() => {
              setCartModal(null)
              setOutfitModal(null)
              setQuickAddProduct(null)
              setDetailCartUiNonce((n) => n + 1)
            }}
          >
            <motion.div
              initial={{ y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-[28px] border border-white/12 bg-[#080c14]/95 p-5 shadow-2xl backdrop-blur-xl"
            >
              {cartModal ? (
                <>
                  <div className="text-center text-sm font-extrabold">Added to your cart</div>
                  <div className="mt-4 flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-black/40">
                      <ProductImage
                        src={cartModal.image}
                        alt={cartModal.name}
                        style={shortsPackshotImgStyle(cartModal.productId)}
                        className="block h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-2 text-xs font-extrabold leading-snug">{cartModal.name}</div>
                      <div className="mt-1 text-[10px] text-white/45">Size {cartModal.size}</div>
                      <div className="mt-1 text-xs font-black text-accent">{formatMoney(cartModal.price, settings.currency)}</div>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col gap-2">
                    <button
                      type="button"
                      className={btnGhost + ' w-full'}
                      onClick={() => {
                        setCartModal(null)
                        setDetailCartUiNonce((n) => n + 1)
                      }}
                    >
                      Continue shopping
                    </button>
                    <button
                      type="button"
                      className={btnPrimary + ' w-full'}
                      onClick={() => {
                        setCartModal(null)
                        setDetailCartUiNonce((n) => n + 1)
                        goCheckout()
                      }}
                    >
                      Go to checkout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center text-sm font-extrabold">Full outfit added to cart</div>
                  <div className="mt-2 text-center text-xs text-white/50">{outfitModal?.outfitName}</div>
                  <div className="mt-3 text-center text-lg font-black text-accent">
                    {formatMoney(outfitModal?.total || 0, settings.currency)}
                  </div>
                  <div className="mt-5 flex flex-col gap-2">
                    <button type="button" className={btnGhost + ' w-full'} onClick={() => setOutfitModal(null)}>
                      Continue shopping
                    </button>
                    <button
                      type="button"
                      className={btnPrimary + ' w-full'}
                      onClick={() => {
                        setOutfitModal(null)
                        goCheckout()
                      }}
                    >
                      Go to checkout
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {quickAddProduct && (
          <motion.div
            key="quick-add-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[62] flex items-end justify-center bg-black/55 p-3 backdrop-blur-sm"
            onClick={() => setQuickAddProduct(null)}
          >
            <motion.div
              initial={{ y: 44, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-[28px] border border-white/12 bg-[#080c14]/95 p-5 shadow-2xl backdrop-blur-xl"
            >
              <div className="text-center text-sm font-extrabold">Quick add</div>
              <p className="mt-1 text-center text-[11px] text-white/50">Choose your size</p>
              <div className="mt-3 line-clamp-2 text-center text-xs font-bold leading-snug">{quickAddProduct.name}</div>
              <div className="mt-1 text-center text-[10px] font-semibold text-white/45">{quickAddProduct.color}</div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {(quickAddProduct.sizes || ['M']).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => {
                      addToCartLine({
                        productId: quickAddProduct.id,
                        name: quickAddProduct.name,
                        price: quickAddProduct.price,
                        color: quickAddProduct.color,
                        size: sz,
                        qty: 1,
                        image: quickAddProduct.images.front
                      })
                      setQuickAddProduct(null)
                    }}
                    className={`${pill} min-w-[2.75rem] border-accent/25 px-4 py-2 font-extrabold text-accent`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              <button type="button" className={`${btnGhost} mt-5 w-full`} onClick={() => setQuickAddProduct(null)}>
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {clearConfirm ? (
          <motion.div
            key="clear-confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[70] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
            onClick={() => setClearConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl border border-white/12 bg-[#0a0e18] p-6 shadow-2xl"
            >
              <div className="text-sm font-extrabold">Clear local data?</div>
              <p className="mt-2 text-xs leading-relaxed text-white/50">Removes cart, favorites, and optional order history from this device.</p>
              <div className="mt-5 flex gap-2">
                <button type="button" className={`${btnGhost} flex-1`} onClick={() => setClearConfirm(false)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className={`${btnPrimary} flex-1 border-rose-400/40 from-rose-500/80 to-rose-600/80`}
                  onClick={() => {
                    try {
                      window.localStorage.removeItem(STORAGE_CART)
                      window.localStorage.removeItem(STORAGE_FAVS)
                      window.localStorage.removeItem(STORAGE_ORDERS)
                    } catch {
                      /* ignore */
                    }
                    setCart([])
                    setFavorites(new Set())
                    setOrders(MOCK_ORDERS_SEED)
                    setClearConfirm(false)
                    setProfilePanel(null)
                  }}
                >
                  Clear
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-none absolute bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/15 bg-black/80 px-4 py-2 text-[11px] font-bold text-white shadow-xl backdrop-blur-md"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
})

function OutfitDetailScreen({ outfit, currency, onBack, onAddOutfit, onViewSeparately, openProduct }) {
  const [outfitSize, setOutfitSize] = useState('M')
  if (!outfit) return null
  const lines = outfit.items.map((it) => {
    const p = SHOP_PRODUCTS.find((x) => x.id === it.productId)
    return { ...it, product: p }
  })
  const total = lines.reduce((s, row) => s + (row.product?.price || 0), 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.22 }}
      className="flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      <div className="shrink-0 px-4 pb-2 pt-3">
        <ShopBackButton onClick={onBack} ariaLabel="Back to combos" />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-32">
        <div className={`overflow-hidden rounded-3xl ${card}`}>
          <div className="aspect-[4/5] w-full bg-black/40">
            <ProductImage src={outfit.heroImage} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
        <h1 className="mt-4 text-lg font-extrabold leading-tight">{outfit.name}</h1>
        <p className="mt-2 text-xs leading-relaxed text-white/55">{outfit.tagline}</p>
        <div className="mt-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">Outfit size (all pieces)</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setOutfitSize(s)}
                className={`min-w-[2.5rem] rounded-xl border px-3 py-2 text-xs font-extrabold ${
                  outfitSize === s ? 'border-accent/50 bg-accent/15 text-accent' : 'border-white/12 bg-white/5 text-white/75'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">Items</div>
        <ul className="mt-2 space-y-2">
          {lines.map((row) => (
            <li key={row.productId}>
              <button
                type="button"
                onClick={() => row.product && openProduct(row.product.id)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-left"
              >
                <span className="min-w-0 flex-1 text-[11px] font-bold leading-snug text-white/90">{row.label}</span>
                <span className="shrink-0 text-xs font-black text-accent">
                  {row.product ? formatMoney(row.product.price, currency) : '-'}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-xs font-bold text-white/50">Outfit total</span>
          <span className="text-lg font-black text-accent">{formatMoney(total, currency)}</span>
        </div>
        <button type="button" className={`${btnPrimary} mt-5 w-full`} onClick={() => onAddOutfit(outfit, outfitSize)}>
          Add full outfit to cart
        </button>
        <button type="button" className={`${btnGhost} mt-3 w-full`} onClick={() => onViewSeparately(outfit)}>
          View items separately
        </button>
      </div>
    </motion.div>
  )
}

function ProductDetailView({ product, favorites, onToggleFav, onBack, onAddLine, onShowAddedSheet, detailCartUiNonce, currency }) {
  const [size, setSize] = useState('')
  const [qty, setQty] = useState(1)
  const [activeGallery, setActiveGallery] = useState(0)
  const [err, setErr] = useState(null)
  /** idle | pressing | added */
  const [addPhase, setAddPhase] = useState('idle')
  const addTimersRef = useRef([])
  const addBusyRef = useRef(false)

  if (!product) return null

  const gallery = useMemo(() => {
    const urls = dedupeGalleryUrls(product)
    const labels =
      product.category === 'Sneakers' && urls.length >= 2 ? ['Side', 'Front', 'Detail'] : ['Front', 'Back', 'Detail']
    return urls.map((src, i) => ({ id: i, src, label: labels[i] || `View ${i + 1}` }))
  }, [product])

  useEffect(() => {
    setActiveGallery(0)
  }, [product.id])

  const clearAddTimers = useCallback(() => {
    addTimersRef.current.forEach((id) => window.clearTimeout(id))
    addTimersRef.current = []
  }, [])

  useEffect(() => {
    clearAddTimers()
    setAddPhase('idle')
    addBusyRef.current = false
  }, [product.id, detailCartUiNonce, clearAddTimers])

  useEffect(() => () => clearAddTimers(), [clearAddTimers])

  const mainSrc = gallery[activeGallery]?.src || product.images.front

  const handleAdd = () => {
    if (!size) {
      setErr('Select a size')
      return
    }
    if (addBusyRef.current) return
    addBusyRef.current = true
    setErr(null)
    clearAddTimers()

    const line = {
      productId: product.id,
      name: product.name,
      color: product.color,
      size,
      qty,
      price: product.price,
      image: product.images.front
    }

    const MORPH_MS = 400
    const HOLD_MS = 1000

    setAddPhase('pressing')
    addTimersRef.current.push(
      window.setTimeout(() => {
        onAddLine(line)
        setAddPhase('added')
        addTimersRef.current.push(
          window.setTimeout(() => {
            onShowAddedSheet({
              type: 'single',
              productId: line.productId,
              image: line.image,
              name: line.name,
              size: line.size,
              price: line.price * line.qty
            })
            setAddPhase('idle')
            addBusyRef.current = false
          }, MORPH_MS + HOLD_MS)
        )
      }, 100)
    )
  }

  const showIdleLabel = addPhase === 'idle' || addPhase === 'pressing'
  const addDisabled = !size || addPhase !== 'idle'

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      transition={{ duration: 0.22 }}
      className="flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      <div className="flex shrink-0 items-center justify-between px-4 pb-2 pt-3">
        <ShopBackButton onClick={onBack} ariaLabel="Back to shop" />
        <button type="button" onClick={() => onToggleFav(product.id)} className="text-white/70" aria-label="Favorite">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill={favorites.has(product.id) ? 'currentColor' : 'none'}>
            <path
              d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 7-3 4.5 4.5 0 0 1 7 3c0 5.65-7 10-7 10Z"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-28">
        <div className={`overflow-hidden rounded-3xl ${card}`}>
          <div className={catalogMediaBoxClass(product.category, 'detail')}>
            <ProductImage
              src={mainSrc}
              alt={product.name}
              style={shortsPackshotImgStyle(product.id)}
              className={catalogThumbImgClass(product.category)}
            />
          </div>
        </div>
        {gallery.length > 1 ? (
          <div className="mt-3 flex gap-2">
            {gallery.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveGallery(i)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-black/35 ${
                  activeGallery === i ? 'border-accent ring-2 ring-accent/25 ring-offset-2 ring-offset-[#070a12]' : 'border-white/10'
                }`}
              >
                <ProductImage
                  src={t.src}
                  alt={`${product.name}, ${t.label}`}
                  style={shortsPackshotImgStyle(product.id)}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        ) : null}
        <div className="mt-4">
          <h1 className="text-lg font-extrabold leading-tight">{product.name}</h1>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xl font-black text-accent">{formatMoney(product.price, currency)}</span>
            <span className="text-[11px] font-bold text-amber-200/90">★ {product.rating}</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/55">{product.description}</p>
          <div className="mt-2 text-[11px] font-semibold text-white/45">
            Color: <span className="text-white/80">{product.color}</span>
          </div>
        </div>
        <div className="mt-5">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">Size</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s)
                  setErr(null)
                }}
                className={`min-w-[2.5rem] rounded-xl border px-3 py-2 text-xs font-extrabold ${
                  size === s ? 'border-accent/50 bg-accent/15 text-accent' : 'border-white/12 bg-white/5 text-white/75'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {err ? <div className="mt-2 text-[11px] font-bold text-rose-300">{err}</div> : null}
        </div>
        <div className="mt-5 flex items-center gap-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">Qty</div>
          <div className="flex items-center gap-2">
            <button type="button" className={btnGhost + ' !px-3 !py-2'} onClick={() => setQty((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span className="w-8 text-center text-sm font-bold">{qty}</span>
            <button type="button" className={btnGhost + ' !px-3 !py-2'} onClick={() => setQty((q) => q + 1)}>
              +
            </button>
          </div>
        </div>
        <motion.button
          type="button"
          layout
          disabled={addDisabled}
          onClick={handleAdd}
          animate={{
            scale: addPhase === 'pressing' ? 0.95 : 1,
            boxShadow:
              addPhase === 'pressing'
                ? '0 6px 18px -6px rgba(0,0,0,0.55)'
                : addPhase === 'added'
                  ? '0 14px 36px -8px rgba(0,201,255,0.22), 0 8px 24px -10px rgba(0,0,0,0.5)'
                  : '0 10px 28px -10px rgba(0,0,0,0.45), 0 0 24px -8px rgba(0,201,255,0.12)'
          }}
          transition={{
            scale: { duration: 0.1, ease: [0.4, 0, 0.2, 1] },
            layout: { type: 'spring', stiffness: 380, damping: 28 },
            boxShadow: { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
          }}
          className={`relative mt-6 flex min-h-[48px] w-full items-center justify-center overflow-hidden rounded-full border px-5 py-3.5 text-xs font-extrabold transition-colors duration-300 ease-out ${
            addPhase === 'added'
              ? 'border-emerald-400/20 bg-gradient-to-r from-emerald-400/30 via-accent to-purple-600 text-background'
              : 'border-white/12 bg-gradient-to-r from-cyan-400/90 via-accent to-purple-600 text-background'
          } ${addDisabled ? 'cursor-not-allowed opacity-55' : ''}`}
        >
          <span className="pointer-events-none flex min-h-[1.25rem] w-full items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              {showIdleLabel ? (
                <motion.span
                  key="atc"
                  className="flex items-center justify-center gap-2"
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem] shrink-0" fill="none" aria-hidden>
                    <path
                      d="M6 7h15l-1.5 9H7.5L6 7Zm0 0L5 3H2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="9" cy="20" r="1.35" fill="currentColor" />
                    <circle cx="17" cy="20" r="1.35" fill="currentColor" />
                  </svg>
                  <span>Add to Cart</span>
                </motion.span>
              ) : (
                <motion.span
                  key="added"
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem] shrink-0" fill="none" aria-hidden>
                    <path
                      d="M5 13l5 5L20 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Added</span>
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}

function CheckoutView({
  phase,
  checkout,
  setCheckout,
  errors,
  cart,
  subtotal,
  shipping,
  total,
  currency,
  validateShipping,
  onBack,
  onNext,
  onPlace
}) {
  const stepTitle = phase === 1 ? 'Shipping details' : phase === 2 ? 'Payment method' : 'Review order'

  const handleContinue = () => {
    if (phase === 1) {
      if (!validateShipping()) return
    }
    onNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      <div className="shrink-0 px-4 pb-2 pt-3">
        <ShopBackButton onClick={onBack} ariaLabel="Back" />
        <div className="mt-2 text-sm font-extrabold">Checkout</div>
        <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
          Step {phase} / 3 · {stepTitle}
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-28">
        {phase === 1
          ? [
              { k: 'name', label: 'Full name', ph: 'Alex Rivera' },
              { k: 'email', label: 'Email', ph: 'you@webenox.com' },
              { k: 'address', label: 'Address', ph: 'Street & number' },
              { k: 'city', label: 'City', ph: 'Berlin' },
              { k: 'postal', label: 'Postal code', ph: '10115' }
            ].map((f) => (
              <label key={f.k} className="block">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">{f.label}</div>
                <input
                  value={checkout[f.k]}
                  onChange={(e) => setCheckout((c) => ({ ...c, [f.k]: e.target.value }))}
                  placeholder={f.ph}
                  className={`mt-1.5 w-full rounded-2xl border bg-white/5 px-3 py-2.5 text-xs font-semibold text-white/90 outline-none ${
                    errors[f.k] ? 'border-rose-400/50' : 'border-white/10 focus:border-accent/35'
                  }`}
                />
                {errors[f.k] ? <div className="mt-1 text-[10px] font-bold text-rose-300">{errors[f.k]}</div> : null}
              </label>
            ))
          : null}

        {phase === 2 ? (
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">Payment</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { id: 'card', label: 'Card' },
                { id: 'paypal', label: 'PayPal' },
                { id: 'apple', label: 'Apple Pay' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setCheckout((c) => ({ ...c, payment: p.id }))}
                  className={checkout.payment === p.id ? pillActive : pill}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {phase === 3 ? (
          <div className="space-y-3">
            <div className={`${card} space-y-2 p-3`}>
              <div className="text-[10px] font-bold uppercase text-white/40">Ship to</div>
              <div className="text-xs font-bold text-white/90">{checkout.name}</div>
              <div className="text-[11px] text-white/55">{checkout.email}</div>
              <div className="text-[11px] text-white/55">
                {checkout.address}, {checkout.postal} {checkout.city}
              </div>
            </div>
            <div className={`${card} divide-y divide-white/10`}>
              {cart.map((line) => (
                <div key={line.key} className="flex justify-between gap-2 py-2 text-[11px]">
                  <span className="min-w-0 flex-1 truncate font-semibold text-white/85">
                    {line.name} ×{line.qty}
                  </span>
                  <span className="shrink-0 font-bold text-white/80">
                    {formatMoney(line.price * line.qty, currency)}
                  </span>
                </div>
              ))}
            </div>
            <div className={`${card} space-y-2 p-4`}>
              <div className="flex justify-between text-xs text-white/60">
                <span>Subtotal</span>
                <span className="font-bold text-white/90">{formatMoney(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between text-xs text-white/60">
                <span>Shipping</span>
                <span className="font-bold text-white/90">{formatMoney(shipping, currency)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-extrabold">
                <span>Total</span>
                <span className="text-accent">{formatMoney(total, currency)}</span>
              </div>
              <div className="text-[10px] text-white/40">Payment: {checkout.payment}</div>
            </div>
          </div>
        ) : null}

        {phase < 3 ? (
          <button type="button" className={`${btnPrimary} mt-4 w-full`} onClick={handleContinue}>
            Continue
          </button>
        ) : (
          <button type="button" className={`${btnPrimary} mt-4 w-full`} onClick={onPlace}>
            Place order
          </button>
        )}
      </div>
    </motion.div>
  )
}

function SuccessView({ orderNumber, total, currency, onContinue }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400/30 to-cyan-400/25 text-3xl"
      >
        ✓
      </motion.div>
      <div className="text-lg font-extrabold">Order Confirmed</div>
      <div className="mt-2 text-xs text-white/50">Thank you. Your drop is secured.</div>
      {orderNumber ? <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-mono text-accent">{orderNumber}</div> : null}
      <div className="mt-2 text-[11px] text-white/45">
        Total charged: {typeof total === 'number' ? formatMoney(total, currency) : '-'}
      </div>
      <button type="button" className={`${btnPrimary} mt-8 w-full max-w-xs`} onClick={onContinue}>
        Continue Shopping
      </button>
    </motion.div>
  )
}

export default WebenoxShopApp
