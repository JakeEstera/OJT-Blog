import { useEffect, useRef } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import profile from '../data/profile.js'
import PillNav from './PillNav.jsx'

const NAV_ITEMS = [
  { label: 'Home', href: '/home' },
  { label: 'Weekly', href: '/weekly' },
  { label: 'Profile', href: '/profile' },
]

// PillNav passes `href`; react-router wants `to`.
const RouterLink = ({ href, ...props }) => <Link to={href} {...props} />

export default function Layout() {
  const { pathname } = useLocation()
  // /weekly/3 should still highlight "Weekly".
  const activeHref =
    NAV_ITEMS.find((i) => pathname === i.href || pathname.startsWith(`${i.href}/`))?.href ?? ''
  const progressRef = useRef(null)
  const spotRef = useRef(null)

  // Scroll progress bar + cursor spotlight, throttled with rAF.
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const max = document.documentElement.scrollHeight - window.innerHeight
        const pct = max > 0 ? window.scrollY / max : 0
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${pct})`
      })
    }
    const onMove = (e) => {
      if (spotRef.current) {
        spotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <>
      <div className="bg" aria-hidden="true">
        <span className="aurora a1" />
        <span className="aurora a2" />
        <span className="aurora a3" />
        <span className="grid-overlay" />
        <span className="noise" />
      </div>
      <div className="spotlight" ref={spotRef} aria-hidden="true" />
      <div className="progress" ref={progressRef} aria-hidden="true" />

      <header className="pillbar">
        <div className="pillbar-inner">
          <PillNav
            items={NAV_ITEMS}
            activeHref={activeHref}
            linkComponent={RouterLink}
            theme="dark"
            layout="split"
            size="md"
            surface="glass"
            itemStyle="plain"
            hoverEffect="fill"
            indicator="dot"
            barColor="rgba(18, 84, 79, 0.55)"
            highlightColor="#8bbb92"
            ariaLabel="Main"
          />
        </div>
      </header>

      <main className="container">
        <div className="page" key={pathname}>
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} {profile.name}</span>
        <span>OJT at {profile.company}</span>
      </footer>
    </>
  )
}
