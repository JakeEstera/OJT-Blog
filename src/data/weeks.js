// Add a new object for each week. Newest week is shown first.
//
// Pictures: copy your photos into /public/images and list them in `images`
// as '/images/<file>'. The first picture is also the card cover on the Weekly page.
// Until then, `placeholders(n)` gives three labelled stand-ins for week n
// (public/images/week<n>-1.svg ... week<n>-3.svg).
const placeholders = (n) => [
  { src: `/images/week${n}-1.svg`, alt: `Week ${n} photo 1`, title: 'At the office', subtitle: `Week ${n} · placeholder` },
  { src: `/images/week${n}-2.svg`, alt: `Week ${n} photo 2`, title: 'Working on tasks', subtitle: `Week ${n} · placeholder` },
  { src: `/images/week${n}-3.svg`, alt: `Week ${n} photo 3`, title: 'With the team', subtitle: `Week ${n} · placeholder` },
]

const weeks = [
  {
    week: 1,
    dateRange: 'June 1 – June 5, 2026',
    hours: 40,
    days: 5,
    summary: 'Orientation, office tour and development environment setup.',
    tasks: [
      'Attended company orientation',
      'Met the team and my supervisor',
      'Set up the development environment',
    ],
    learnings:
      'I learned how the team organizes its work and which tools they use every day.',
    images: placeholders(1),
  },
  {
    week: 2,
    dateRange: 'June 8 – June 12, 2026',
    hours: 40,
    days: 5,
    summary: 'Started on my first small task using the company codebase.',
    tasks: [
      'Read through the project documentation',
      'Fixed a minor UI bug',
      'Joined the daily stand-up meetings',
    ],
    learnings:
      'Reading existing code carefully before changing it saves a lot of time.',
    images: placeholders(2),
  },
  {
    week: 3,
    dateRange: 'June 15 – June 19, 2026',
    hours: 40,
    days: 5,
    summary: 'Built a new feature with guidance from my supervisor.',
    tasks: [
      'Built a reusable component',
      'Submitted my first code review',
      'Wrote notes on feedback received',
    ],
    learnings: 'Code reviews are a great way to learn better practices.',
    images: placeholders(3),
  },
]

export default [...weeks].sort((a, b) => b.week - a.week)
