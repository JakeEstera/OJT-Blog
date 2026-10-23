import { useEffect, useState } from 'react'

// Animates a number from 0 to `to`.
export default function CountUp({ to, duration = 1400 }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])

  return <>{value}</>
}
