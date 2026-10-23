import { useEffect, useState } from 'react'
import CountUp from './CountUp.jsx'

// Animated circular progress indicator (value / max).
// `delay` (ms) and `duration` (s) let the arc run on the same timeline as other animations; `linear` keeps a steady speed.
export default function ProgressRing({ value, max, label, size = 168, children, delay = 300, duration = 1.8, linear = false }) {
  const stroke = 12
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(value / max, 1)
  const [offset, setOffset] = useState(circumference)

  useEffect(() => {
    const id = setTimeout(() => setOffset(circumference * (1 - pct)), delay)
    return () => clearTimeout(id)
  }, [circumference, pct, delay])

  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8BBB92" />
            <stop offset="100%" stopColor="#2A835F" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} className="ring-track" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="ring-bar"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: `stroke-dashoffset ${duration}s ${linear ? 'linear' : 'cubic-bezier(0.22, 1, 0.36, 1)'}` }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {children ? (
        <div className="ring-photo" style={{ inset: stroke + 6 }}>{children}</div>
      ) : (
        <div className="ring-text">
          <strong><CountUp to={Math.round(pct * 100)} />%</strong>
          <span>{label}</span>
        </div>
      )}
    </div>
  )
}
