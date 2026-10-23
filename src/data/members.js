import profile from './profile.js'

// Your fellow OJT trainees at the same company. Add one object per person.
// Put each photo in /public/images and point `photo` at it (e.g. '/images/juan.jpg').
// Anything you leave out falls back to the shared values below (same company/supervisor/duration).
const shared = {
  role: 'OJT Trainee',
  company: profile.company,
  supervisor: profile.supervisor,
  duration: profile.duration,
  totalHours: profile.targetHours,
}

const members = [
  {
    name: 'Co-OJT Name 1',
    photo: '/images/member1.svg',
    school: 'School / University',
    course: 'Course',
  },
  {
    name: 'Co-OJT Name 2',
    photo: '/images/member2.svg',
    school: 'School / University',
    course: 'Course',
  },
  {
    name: 'Co-OJT Name 3',
    photo: '/images/member3.svg',
    school: 'School / University',
    course: 'Course',
  },
  {
    name: 'Co-OJT Name 4',
    photo: '/images/member4.svg',
    school: 'School / University',
    course: 'Course',
  },
]

export default members.map((m) => ({ ...shared, ...m }))
