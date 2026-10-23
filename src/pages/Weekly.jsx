import { Link } from 'react-router-dom'
import weeks from '../data/weeks.js'
import Reveal from '../components/Reveal.jsx'
import FlexCarousel from '../components/FlexCarousel.jsx'

export default function Weekly() {
  return (
    <>
      <span className="eyebrow"><i /> Timeline</span>
      <h1 className="page-title">Weekly Reports</h1>
      <p className="lead">A running log of my tasks and learnings, week by week.</p>

      <div className="week-list">
        {weeks.map((w) => (
          <Reveal key={w.week} as="section" className="week-block">
            <header className="week-head">
              <h2>Week {w.week}</h2>
              <span className="muted">{w.dateRange}</span>
            </header>
            {w.images?.length > 0 && (
              <div className="week-carousel">
                <FlexCarousel
                  items={w.images}
                  preset="liquid"
                  intro="rise"
                  cardHeight={0.55}
                  gap={12}
                  squeeze={0.2}
                  focusOnClick
                  captions
                  captureWheel={false}
                />
              </div>
            )}
            <div className="week-info">
              <p className="week-summary">{w.summary}</p>
              <div className="meta">
                <span>{w.hours} hrs</span>
                <span>{w.tasks.length} tasks</span>
              </div>
              <Link to={`/weekly/${w.week}`}>Read full report →</Link>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  )
}
