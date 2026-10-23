import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Facebook01Icon, GithubIcon, InstagramIcon, Mail01Icon, Wallet01Icon } from '@hugeicons/core-free-icons'
import BellToggle from './BellToggle.jsx'

const ICONS = {
  Email: Mail01Icon,
  Facebook: Facebook01Icon,
  Instagram: InstagramIcon,
  GitHub: GithubIcon,
  GCash: Wallet01Icon,
}

// One pill per contact. Click a pill: the icon rings and it slides open to show the account details.
// Only one is open at a time.
export default function ContactToggles({ links }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="contact-toggles">
      {links.map((l) => (
        <BellToggle
          key={l.label}
          offLabel={l.label}
          onLabel={l.account}
          label={`Show ${l.label} details`}
          icon={<HugeiconsIcon icon={ICONS[l.label] ?? Mail01Icon} size={16} strokeWidth={2} />}
          badge={false}
          waves={false}
          pressed={open === l.label}
          onChange={(on) => setOpen(on ? l.label : null)}
          color="#eaf4ec"
          background="#12544f"
          onColor="#092328"
          onBackground="#8bbb92"
          size="md"
          radius={22}
          className={l.label === 'GitHub' ? 'contact-github' : l.label === 'GCash' ? 'contact-gcash' : ''}
        />
      ))}
    </div>
  )
}
