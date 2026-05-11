import React, { useLayoutEffect, useRef, useState } from 'react'

/** Layout width the portfolio previews are authored for; narrower viewports scale down (“zoom out”). */
export const PORTFOLIO_PREVIEW_REFERENCE_WIDTH = 1120

const supportsCssZoom = typeof CSS !== 'undefined' && CSS.supports?.('zoom', '1')

/**
 * Keeps the same desktop layout inside the mock browser, scaled to fit the column width.
 * Uses CSS `zoom` when supported (affects layout); otherwise `transform: scale` + measured height.
 */
const PortfolioPreviewDesktopScale = ({ children }) => {
  const measureRef = useRef(null)
  const canvasRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [scaledHeight, setScaledHeight] = useState(0)

  useLayoutEffect(() => {
    const el = measureRef.current
    if (!el || typeof ResizeObserver === 'undefined') return undefined

    const update = () => {
      const w = el.clientWidth
      if (!w) return
      setScale(Math.min(1, w / PORTFOLIO_PREVIEW_REFERENCE_WIDTH))
    }

    const ro = new ResizeObserver(update)
    ro.observe(el)
    update()
    return () => ro.disconnect()
  }, [])

  useLayoutEffect(() => {
    if (supportsCssZoom || scale >= 0.999) {
      setScaledHeight(0)
      return undefined
    }
    const inner = canvasRef.current
    if (!inner) return undefined
    const update = () => setScaledHeight(inner.scrollHeight * scale)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(inner)
    return () => ro.disconnect()
  }, [scale, children])

  if (supportsCssZoom || scale >= 0.999) {
    return (
      <div ref={measureRef} className="w-full min-w-0 overflow-x-clip">
        <div className="flex w-full justify-center">
          <div
            ref={canvasRef}
            className="shrink-0"
            style={{
              width: PORTFOLIO_PREVIEW_REFERENCE_WIDTH,
              ...(scale < 0.999 ? { zoom: scale } : {})
            }}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={measureRef} className="w-full min-w-0 overflow-x-clip">
      <div className="flex w-full justify-center">
        <div
          style={{
            width: PORTFOLIO_PREVIEW_REFERENCE_WIDTH * scale,
            height: scaledHeight || undefined,
            overflow: 'hidden'
          }}
        >
          <div
            ref={canvasRef}
            style={{
              width: PORTFOLIO_PREVIEW_REFERENCE_WIDTH,
              transform: `scale(${scale})`,
              transformOrigin: 'top left'
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioPreviewDesktopScale
