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

// Card rarity shown on the back of each trainee card: 'common' | 'rare' | 'legendary'.
export const RARITY = {
  common: { label: 'Common', color: '#8bbb92' },
  rare: { label: 'Rare', color: '#5cc8ff' },
  legendary: { label: 'Legendary', color: '#ffc94a' },
}

const members = [
  {
    name: 'Ralph',
    photo: '/images/member-ralph-2.jpg',
    photoPosition: '50% 58%', // which part of the picture the card shows (x% y%)
    rarity: 'rare',
    school: 'School / University',
    course: 'Course',
  },
  {
    name: 'John Mark',
    photo: '/images/member-john-mark.jpg',
    photoPosition: '50% 22%',
    rarity: 'common',
    school: 'School / University',
    course: 'Course',
  },
  {
    name: 'Tru',
    photo: '/images/member-tru.jpg',
    photoPosition: '50% 30%',
    rarity: 'common',
    school: 'School / University',
    course: 'Course',
  },
  {
    name: 'Ronnie',
    photo: '/images/member-ronnie.jpg',
    rarity: 'legendary',
    school: 'School / University',
    course: 'Course',
  },
]

export default members.map((m) => ({ ...shared, ...m }))
