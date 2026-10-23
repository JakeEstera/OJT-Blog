// One object per week, listed in order: Week 1 is shown at the top.
//
// hours / days: estimated at 8 hours per day from the date range. Edit them to match your real DTR.
// summary / tasks / learnings: placeholders — replace with what you actually did.
//
// Pictures: copy your photos into /public/images and list them in `images`
// as '/images/<file>'. Until then, `placeholders(n)` gives three labelled stand-ins
// for week n (public/images/week<n>-1.svg ... week<n>-3.svg).
const placeholders = (n) => [
  { src: `/images/week${n}-1.svg`, alt: `Week ${n} photo 1`, title: 'At the office', subtitle: `Week ${n} · placeholder` },
  { src: `/images/week${n}-2.svg`, alt: `Week ${n} photo 2`, title: 'Working on tasks', subtitle: `Week ${n} · placeholder` },
  { src: `/images/week${n}-3.svg`, alt: `Week ${n} photo 3`, title: 'With the team', subtitle: `Week ${n} · placeholder` },
]

const placeholderText = (n) => ({
  summary: `Add a short summary of what you did in Week ${n}.`,
  tasks: ['Task 1', 'Task 2', 'Task 3'],
  learnings: `Write what you learned in Week ${n}.`,
})

const weeks = [
  { week: 1, dateRange: 'August 24 – 28, 2026', days: 5, hours: 40 },
  { week: 2, dateRange: 'September 1 – 5, 2026', days: 5, hours: 40 },
  { week: 3, dateRange: 'September 7 – 11, 2026', days: 5, hours: 40 },
  { week: 4, dateRange: 'September 14 – 18, 2026', days: 5, hours: 40 },
  { week: 5, dateRange: 'September 21 – 26, 2026', days: 6, hours: 48 },
  { week: 6, dateRange: 'September 28 – October 1, 2026', days: 4, hours: 32 },
  { week: 7, dateRange: 'October 5 – 8, 2026', days: 4, hours: 32 },
  { week: 8, dateRange: 'October 12 – 17, 2026', days: 6, hours: 48 },
  { week: 9, dateRange: 'October 19 – 23, 2026', days: 5, hours: 40 },
].map((w) => ({ ...placeholderText(w.week), images: placeholders(w.week), ...w }))

export default [...weeks].sort((a, b) => a.week - b.week)
