export const HEADER_H = 68
let raf = 0

// Плавный скролл на JS: не зависит от CSS scroll-behavior и настроек системы
export function smoothTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  const start = window.scrollY
  const max = document.documentElement.scrollHeight - window.innerHeight
  const raw = id === 'home' ? 0 : el.getBoundingClientRect().top + start - HEADER_H - 24
  const target = Math.min(Math.max(raw, 0), max)
  const dist = target - start
  if (Math.abs(dist) < 2) return

  const duration = Math.min(1000, 450 + Math.abs(dist) * 0.25)
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
  const t0 = performance.now()

  cancelAnimationFrame(raf)
  const stop = () => cancelAnimationFrame(raf)
  window.addEventListener('wheel', stop, { passive: true, once: true })
  window.addEventListener('touchstart', stop, { passive: true, once: true })

  const step = (now) => {
    const t = Math.min((now - t0) / duration, 1)
    window.scrollTo({ top: start + dist * ease(t), behavior: 'instant' })
    if (t < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}
