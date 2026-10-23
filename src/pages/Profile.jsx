import profile from '../data/profile.js'
import Reveal from '../components/Reveal.jsx'
import TiltCard from '../components/TiltCard.jsx'
import ReflectiveCard from '../components/ReflectiveCard.jsx'
import weeks from '../data/weeks.js'

export default function Profile() {
  const totalHours = weeks.reduce((sum, w) => sum + w.hours, 0)
  const initials = profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
  const details = [
    ['Company', profile.company],
    ['Role', profile.role],
    ['Duration', profile.duration],
    ['Required hours', `${profile.targetHours} hours`],
    ['Supervisor', profile.supervisor],
    ['School', profile.school],
  ]

  return (
    <>
      <div className="profile-head">
        <div className="avatar-wrap">
          <div className="avatar">
            {profile.photo ? (
              <img
                src={`${import.meta.env.BASE_URL}${profile.photo.replace(/^\//, '')}`}
                alt={profile.name}
              />
            ) : (
              initials
            )}
          </div>
        </div>
        <div>
          <span className="eyebrow"><i /> {profile.role}</span>
          <h1 className="gradient-text profile-name">{profile.name}</h1>
          <p className="muted">{profile.course} · {profile.school}</p>
        </div>
        <div className="profile-card">
          <ReflectiveCard
            name={profile.name}
            role={profile.role}
            badge="OJT Trainee"
            status="Active"
            idLabel="Hours rendered"
            idValue={`${totalHours} / ${profile.targetHours}`}
            theme="dark"
            tint="#8bbb92"
            width={300}
            height={190}
            radius={20}
          />
        </div>
      </div>

      <Reveal><p className="lead">{profile.about}</p></Reveal>

      <Reveal>
        <h2>OJT details</h2>
        <div className="detail-grid">
          {details.map(([k, v]) => (
            <TiltCard key={k}>
              <div className="card detail">
                <span className="muted">{k}</span>
                <strong>{v}</strong>
              </div>
            </TiltCard>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <h2>Skills</h2>
        <div className="chips">
          {profile.skills.map((s, i) => (
            <span className="tag chip" style={{ '--i': i }} key={s}>{s}</span>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <h2>Contact</h2>
        <div className="actions">
          {profile.links.map((l) => (
            <a className="btn btn-ghost" key={l.label} href={l.href}>{l.label}</a>
          ))}
        </div>
      </Reveal>
    </>
  )
}
