import { Link } from 'react-router-dom'
import profile from '../data/profile.js'
import weeks from '../data/weeks.js'
import Reveal from '../components/Reveal.jsx'
import CountUp from '../components/CountUp.jsx'
import TiltCard from '../components/TiltCard.jsx'
import ProgressRing from '../components/ProgressRing.jsx'

export default function Home() {
  const latest = weeks[0]
  const totalHours = weeks.reduce((sum, w) => sum + w.hours, 0)
  const totalDays = weeks.reduce((sum, w) => sum + (w.days ?? 0), 0)

  const stats = [
    { n: weeks.length, label: 'Weeks' },
    { n: totalHours, label: 'Hours rendered' },
    { n: totalDays, label: 'Days' },
  ]

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><i /> {profile.role} · {profile.company}</span>
          <h1>
            Documenting my <span className="gradient-text">on-the-job training</span> journey.
          </h1>
          <p className="lead">
            Hi, I&apos;m {profile.name}. Every week I record what I worked on, what I
            learned, and how far I&apos;ve come.
          </p>
        </div>

        <div className="hero-visual">
          <ProgressRing value={totalHours} max={profile.targetHours} size={240}>
            <img
              src={`${import.meta.env.BASE_URL}${profile.photo.replace(/^\//, '')}`}
              alt={profile.name}
            />
          </ProgressRing>
          <div className="ring-percent">
            <strong><CountUp to={Math.round(Math.min(totalHours / profile.targetHours, 1) * 100)} />%</strong>
            <span>of OJT hours completed</span>
            <small>{totalHours} / {profile.targetHours} hours</small>
          </div>
        </div>
      </section>

      <section className="stats">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 120} className="stat">
            <strong><CountUp to={s.n} /></strong>
            <span>{s.label}</span>
          </Reveal>
        ))}
      </section>

      {latest && (
        <Reveal>
          <div className="section-head">
            <h2>Latest update</h2>
            <Link to="/weekly">All reports →</Link>
          </div>
          <TiltCard>
            <article className="card">
              <div className="card-top">
                <span className="tag">Week {latest.week}</span>
                <span className="muted">{latest.dateRange}</span>
              </div>
              <h3>{latest.summary}</h3>
              <ul className="mini-list">
                {latest.tasks.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <Link to={`/weekly/${latest.week}`}>Read full report →</Link>
            </article>
          </TiltCard>
        </Reveal>
      )}
    </>
  )
}
