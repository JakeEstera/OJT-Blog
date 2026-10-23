import { useEffect, useState } from 'react'

// Animates a number from 0 to `to`.
// `delay` waits before starting; `linear` counts at a steady speed (default eases out).
export default function CountUp({ to, duration = 1400, delay = 0, linear = false }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let raf
    let begin
    const tick = (now) => {
      begin ??= now
      const p = Math.min((now - begin) / duration, 1)
      const eased = linear ? p : 1 - Math.pow(1 - p, 3)
      setValue(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    const id = setTimeout(() => {
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(id)
      cancelAnimationFrame(raf)
    }
  }, [to, duration, delay, linear])

  return <>{value}</>
}
