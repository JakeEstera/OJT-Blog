import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Lanyard from '../components/Lanyard.jsx'
import profile from '../data/profile.js'
import { makeBack, makeFront, makeStrap } from '../lib/idCard.js'

const AUTO_SECONDS = 60
const EXIT_MS = 750
const BLOG_PATH = '/home'

export default function Landing() {
  const navigate = useNavigate()
  const [art, setArt] = useState(null)
  const [left, setLeft] = useState(AUTO_SECONDS)
  const [leaving, setLeaving] = useState(false)
  const leavingRef = useRef(false)

  const enter = useCallback(() => {
    if (leavingRef.current) return
    leavingRef.current = true
    setLeaving(true)
    window.setTimeout(() => navigate(BLOG_PATH), EXIT_MS)
  }, [navigate])

  // Draw the card faces + strap once (needs the fonts and the profile photo).
  useEffect(() => {
    let cancelled = false
    const photo = `${import.meta.env.BASE_URL}${profile.photo.replace(/^\//, '')}`
    Promise.all([makeFront(profile, photo), makeBack(profile)]).then(([front, back]) => {
      if (cancelled) return
      setArt({ front, back, strap: makeStrap('OJT JOURNAL  ·  ' + profile.company.toUpperCase()) })
    })
    return () => {
      cancelled = true
    }
  }, [])

  // 30-second auto redirect with a visible countdown.
  useEffect(() => {
    const startedAt = Date.now()
    const id = window.setInterval(() => {
      const remaining = AUTO_SECONDS - Math.floor((Date.now() - startedAt) / 1000)
      setLeft(Math.max(0, remaining))
      if (remaining <= 0) {
        window.clearInterval(id)
        enter()
      }
    }, 250)
    return () => window.clearInterval(id)
  }, [enter])

  return (
    <div className={`landing ${leaving ? 'is-leaving' : ''}`}>
      <div className="bg" aria-hidden="true">
        <span className="aurora a1" />
        <span className="aurora a2" />
        <span className="aurora a3" />
        <span className="grid-overlay" />
        <span className="noise" />
      </div>

      <div className="landing-stage">
        {art && (
          <Lanyard
            frontImage={art.front}
            backImage={art.back}
            strapImage={art.strap}
            cardColor="#092328"
            orientation="portrait"
            finish="glossy"
            cornerRadius={0.3}
            size={0.58}
            anchor="center"
            strapLength={0.3}
            strapWidth={0.65}
            metal="silver"
            onSelect={enter}
          />
        )}
      </div>

      <div className="landing-foot">
        <div className="landing-copy">
          <span className="eyebrow landing-welcome">Welcome</span>
          <p className="landing-hint">Tap the ID card to open my OJT blog</p>
        </div>
        <span className="landing-bar" aria-hidden="true">
          <i style={{ transform: `scaleX(${left / AUTO_SECONDS})` }} />
        </span>
      </div>
    </div>
  )
}
