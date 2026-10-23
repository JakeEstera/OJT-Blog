import { Link, useParams } from 'react-router-dom'
import weeks from '../data/weeks.js'
import Reveal from '../components/Reveal.jsx'
import FlexCarousel from '../components/FlexCarousel.jsx'
import NotFound from './NotFound.jsx'

export default function WeeklyEntry() {
  const { week } = useParams()
  const index = weeks.findIndex((w) => String(w.week) === week)
  if (index === -1) return <NotFound />

  const entry = weeks[index]
  const newer = weeks[index + 1]
  const older = weeks[index - 1]

  return (
    <article>
      <Link to="/weekly" className="back">← All weekly reports</Link>
      <span className="eyebrow"><i /> {entry.dateRange}</span>
      <h1 className="page-title">Week {entry.week}</h1>
      <div className="meta">
        <span>{entry.hours} hours</span>
        <span>{entry.tasks.length} tasks</span>
      </div>
      <p className="lead">{entry.summary}</p>

      {entry.images?.length > 0 && (
        <Reveal>
          <h2>Photos</h2>
          <div style={{ width: '100%', height: 'clamp(300px, 42vw, 380px)', position: 'relative' }}>
            <FlexCarousel
              items={entry.images}
              preset="liquid"
              intro="rise"
              cardHeight={0.55}
              gap={12}
              squeeze={0.2}
              focusOnClick
              captions
            />
          </div>
        </Reveal>
      )}

      <Reveal>
        <h2>Tasks</h2>
        <ul className="task-list">
          {entry.tasks.map((t, i) => (
            <li key={t} style={{ '--i': i }}>{t}</li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <h2>What I learned</h2>
        <blockquote className="quote">{entry.learnings}</blockquote>
      </Reveal>

      <nav className="pager">
        {older ? <Link to={`/weekly/${older.week}`}>← Week {older.week}</Link> : <span />}
        {newer ? <Link to={`/weekly/${newer.week}`}>Week {newer.week} →</Link> : <span />}
      </nav>
    </article>
  )
}
