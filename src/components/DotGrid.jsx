import { useRef, useEffect, useCallback, useMemo } from 'react'
import { gsap } from 'gsap'
import './DotGrid.css'

const throttle = (func, limit) => {
  let lastCall = 0
  return function throttled(...args) {
    const now = performance.now()
    if (now - lastCall >= limit) {
      lastCall = now
      func.apply(this, args)
    }
  }
}

function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!m) return { r: 0, g: 0, b: 0 }
  return {
    r: Number.parseInt(m[1], 16),
    g: Number.parseInt(m[2], 16),
    b: Number.parseInt(m[3], 16),
  }
}

function DotGrid({
  dotSize = 4,
  gap = 24,
  baseColor = '#dbeafe',
  activeColor = '#3b82f6',
  proximity = 160,
  speedTrigger = 900,
  shockRadius = 230,
  shockStrength = 0.45,
  maxSpeed = 4200,
  returnDuration = 0.85,
  className = '',
  style,
}) {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const dotsRef = useRef([])
  const pointerRef = useRef({ x: 0, y: 0, lastTime: 0, lastX: 0, lastY: 0, speed: 0 })

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor])
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor])

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null
    const p = new window.Path2D()
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2)
    return p
  }, [dotSize])

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const { width, height } = wrap.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    const cols = Math.floor((width + gap) / (dotSize + gap))
    const rows = Math.floor((height + gap) / (dotSize + gap))
    const cell = dotSize + gap

    const gridW = cell * cols - gap
    const gridH = cell * rows - gap

    const startX = (width - gridW) / 2 + dotSize / 2
    const startY = (height - gridH) / 2 + dotSize / 2

    const dots = []
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const cx = startX + x * cell
        const cy = startY + y * cell
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _active: false })
      }
    }
    dotsRef.current = dots
  }, [dotSize, gap])

  useEffect(() => {
    let rafId = 0
    const proxSq = proximity * proximity

    const draw = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      const { x: px, y: py } = pointerRef.current

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset
        const oy = dot.cy + dot.yOffset
        const dx = dot.cx - px
        const dy = dot.cy - py
        const dsq = dx * dx + dy * dy

        let styleColor = baseColor
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq)
          const t = 1 - dist / proximity
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t)
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t)
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t)
          styleColor = `rgb(${r},${g},${b})`
        }

        ctx.save()
        ctx.translate(ox, oy)
        ctx.fillStyle = styleColor
        if (circlePath) {
          ctx.fill(circlePath)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, dotSize / 2, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      rafId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafId)
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath, dotSize])

  useEffect(() => {
    buildGrid()
    let ro = null
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid)
      if (wrapperRef.current) ro.observe(wrapperRef.current)
    } else {
      window.addEventListener('resize', buildGrid)
    }

    return () => {
      if (ro) ro.disconnect()
      else window.removeEventListener('resize', buildGrid)
    }
  }, [buildGrid])

  useEffect(() => {
    const onMove = (e) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const now = performance.now()
      const pr = pointerRef.current
      const dt = pr.lastTime ? Math.max(12, now - pr.lastTime) : 16
      const dx = e.clientX - pr.lastX
      const dy = e.clientY - pr.lastY
      let speed = (Math.hypot(dx, dy) / dt) * 1000
      speed = Math.min(speed, maxSpeed)

      pr.lastTime = now
      pr.lastX = e.clientX
      pr.lastY = e.clientY
      pr.speed = speed

      const rect = canvas.getBoundingClientRect()
      pr.x = e.clientX - rect.left
      pr.y = e.clientY - rect.top

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y)
        if (speed > speedTrigger && dist < proximity && !dot._active) {
          dot._active = true
          gsap.killTweensOf(dot)

          const force = (1 - dist / proximity) * (speed / maxSpeed)
          const pushX = (dot.cx - pr.x) * force * 0.28
          const pushY = (dot.cy - pr.y) * force * 0.28

          gsap.to(dot, {
            xOffset: dot.xOffset + pushX,
            yOffset: dot.yOffset + pushY,
            duration: 0.24,
            ease: 'power2.out',
            overwrite: true,
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.72)',
                onComplete: () => {
                  dot._active = false
                },
              })
            },
          })
        }
      }
    }

    const onClick = (e) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy)
        if (dist < shockRadius && !dot._active) {
          dot._active = true
          gsap.killTweensOf(dot)

          const falloff = Math.max(0, 1 - dist / shockRadius)
          const pushX = (dot.cx - cx) * shockStrength * falloff
          const pushY = (dot.cy - cy) * shockStrength * falloff

          gsap.to(dot, {
            xOffset: pushX,
            yOffset: pushY,
            duration: 0.28,
            ease: 'power2.out',
            overwrite: true,
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.72)',
                onComplete: () => {
                  dot._active = false
                },
              })
            },
          })
        }
      }
    }

    const throttledMove = throttle(onMove, 36)
    window.addEventListener('mousemove', throttledMove, { passive: true })
    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('mousemove', throttledMove)
      window.removeEventListener('click', onClick)
      gsap.killTweensOf(dotsRef.current)
    }
  }, [maxSpeed, proximity, returnDuration, shockRadius, shockStrength, speedTrigger])

  return (
    <section className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  )
}

export default DotGrid
