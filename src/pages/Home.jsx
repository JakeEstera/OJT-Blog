import { Link } from 'react-router-dom'
import profile from '../data/profile.js'
import weeks from '../data/weeks.js'
import Reveal from '../components/Reveal.jsx'
import CountUp from '../components/CountUp.jsx'
import TiltCard from '../components/TiltCard.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import DriftWall from '../components/DriftWall.jsx'
import TiltedCard, { TiltedCardLayer } from '../components/TiltedCard.jsx'
import RefineFrame from '../components/RefineFrame.jsx'
import usePhotoStatus, { PHOTO_LABELS, PHOTO_START, PHOTO_DURATION } from '../lib/usePhotoStatus.js'

const heroPhoto = `${import.meta.env.BASE_URL}${profile.photo.replace(/^\//, '')}`

import members from '../data/members.js'

// Every training photo, from every week (defined once so the wall doesn't restart on re-render).
const wallItems = weeks.flatMap((w) =>
  (w.images ?? []).map((img) => ({
    image: `${import.meta.env.BASE_URL}${img.src.replace(/^\//, '')}`,
    title: `Week ${w.week} · ${img.title}`,
  })),
)

export default function Home() {
  const photoStatus = usePhotoStatus()
  const latest = weeks[weeks.length - 1]
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
          <ProgressRing
            value={totalHours}
            max={profile.targetHours}
            size={240}
            delay={PHOTO_START}
            duration={PHOTO_DURATION / 1000}
            linear
          >
            <RefineFrame
              status={photoStatus}
              aspectRatio="1 / 1"
              width={204}
              radius={0}
              background="#092328"
              color="#eaf4ec"
              showStatus={false}
              labels={PHOTO_LABELS}
            >
              <img src={heroPhoto} alt={profile.name} draggable={false} />
            </RefineFrame>
          </ProgressRing>
          <div className="ring-percent">
            <strong><CountUp
              to={Math.round(Math.min(totalHours / profile.targetHours, 1) * 100)}
              delay={PHOTO_START}
              duration={PHOTO_DURATION}
              linear
            />%</strong>
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

      <Reveal className="gallery">
        <div className="section-head">
          <h2>Our OJT in pictures</h2>
        </div>
        <p className="gallery-summary">
          A look back at {weeks.length} weeks of training at {profile.company}: {totalDays} days
          and {totalHours} hours of learning, working with the team and building real projects.
          Hover over a picture to bring it forward.
        </p>
        <div className="gallery-wall">
          <DriftWall
            items={wallItems}
            columns={5}
            tileWidth={200}
            tileHeight={132}
            gap={18}
            radius={14}
            tilt={16}
            turn={-14}
            speed={42}
            direction="up"
            parallax={0.6}
            dim={0.55}
            overlayColor="#092328"
          />
        </div>
      </Reveal>


      <Reveal className="building">
        <header className="building-head">
          <h2>{profile.company}</h2>
          <p>OJT Venue</p>
        </header>
        <figure className="building-frame">
          <img
            src={`${import.meta.env.BASE_URL}${profile.buildingPhoto.replace(/^\//, '')}`}
            alt={`${profile.company} building`}
            loading="lazy"
          />
          <img
            className="building-logo"
            src={`${import.meta.env.BASE_URL}${profile.logo.replace(/^\//, '')}`}
            alt={`${profile.company} seal`}
          />
        </figure>
      </Reveal>

      <Reveal className="ojt-section">
        <div className="section-head">
          <h2>My fellow OJT trainees</h2>
        </div>
        <p className="gallery-summary">
          We train together at {profile.company}. Click or tap a card to flip it and see their
          details.
        </p>
        <div className="member-grid">
          {members.map((m) => (
            <TiltedCard
              key={m.name}
              imageSrc={`${import.meta.env.BASE_URL}${m.photo.replace(/^\//, '')}`}
              altText={`${m.name} photo`}
              captionText="Click to flip"
              containerHeight="330px"
              containerWidth="230px"
              imageHeight="310px"
              imageWidth="230px"
              scaleOnHover={1.04}
              rotateAmplitude={12}
              radius={18}
              glare={0.45}
              glareColor="#8bbb92"
              shadow={0.6}
              floating
              backContent={
                <div className="ojt-back">
                  <span className="eyebrow">OJT details</span>
                  <h3>{m.name}</h3>
                  <dl>
                    <dt>Role</dt><dd>{m.role}</dd>
                    <dt>Company</dt><dd>{m.company}</dd>
                    <dt>Supervisor</dt><dd>{m.supervisor}</dd>
                    <dt>School</dt><dd>{m.school}</dd>
                    <dt>Course</dt><dd>{m.course}</dd>
                    <dt>Duration</dt><dd>{m.duration}</dd>
                    <dt>Total hours</dt><dd>{m.totalHours}</dd>
                  </dl>
                  <small>Click to flip back</small>
                </div>
              }
            >
              <TiltedCardLayer depth={26}>
                <div className="ojt-front">
                  <strong>{m.name}</strong>
                  <span>{m.role} · {m.company}</span>
                </div>
              </TiltedCardLayer>
            </TiltedCard>
          ))}
        </div>
      </Reveal>


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
