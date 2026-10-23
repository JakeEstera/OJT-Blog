// Draws the ID card faces and strap artwork for the landing-page lanyard.
// Palette: #092328 / #12544F / #2A835F / #8BBB92
const C1 = '#092328'
const C2 = '#12544f'
const C3 = '#2a835f'
const C4 = '#8bbb92'

const DISPLAY = "'Space Grotesk', 'Inter', system-ui, sans-serif"
const BODY = "'Inter', system-ui, sans-serif"

const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })

const fontsReady = () => (document.fonts?.ready ?? Promise.resolve()).catch(() => {})

const newCanvas = (w, h) => {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  return [canvas, canvas.getContext('2d')]
}

const background = (ctx, w, h) => {
  const g = ctx.createLinearGradient(0, 0, w, h)
  g.addColorStop(0, C2)
  g.addColorStop(1, C1)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)

  const glow = ctx.createRadialGradient(w * 0.85, h * 0.15, 10, w * 0.85, h * 0.15, w * 0.8)
  glow.addColorStop(0, 'rgba(139, 187, 146, 0.35)')
  glow.addColorStop(1, 'rgba(139, 187, 146, 0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, w, h)

  ctx.strokeStyle = 'rgba(139, 187, 146, 0.08)'
  ctx.lineWidth = 2
  for (let x = 0; x < w; x += 64) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
  }
  for (let y = 0; y < h; y += 64) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
  }
}

const fitText = (ctx, text, maxWidth, size, weight, family) => {
  let s = size
  do {
    ctx.font = `${weight} ${s}px ${family}`
    s -= 2
  } while (ctx.measureText(text).width > maxWidth && s > 20)
}

export async function makeFront(profile, photoUrl, hint = 'TAP TO ENTER') {
  await fontsReady()
  const W = 1024
  const H = 1440
  const [canvas, ctx] = newCanvas(W, H)
  background(ctx, W, H)

  // Header (kept clear of the lanyard slot near the top).
  ctx.textAlign = 'center'
  ctx.fillStyle = C4
  ctx.font = `600 34px ${BODY}`
  ctx.fillText('ON-THE-JOB TRAINING', W / 2, 190)
  ctx.fillStyle = 'rgba(234, 244, 236, 0.55)'
  ctx.font = `500 28px ${BODY}`
  ctx.fillText(profile.company.toUpperCase(), W / 2, 236)

  // Photo with ring.
  const cx = W / 2
  const cy = 520
  const r = 230
  const ring = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r)
  ring.addColorStop(0, C4)
  ring.addColorStop(1, C3)
  ctx.beginPath()
  ctx.arc(cx, cy, r + 16, 0, Math.PI * 2)
  ctx.fillStyle = ring
  ctx.fill()
  ctx.beginPath()
  ctx.arc(cx, cy, r + 4, 0, Math.PI * 2)
  ctx.fillStyle = C1
  ctx.fill()

  const photo = await loadImage(photoUrl)
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.clip()
  if (photo) {
    const scale = Math.max((r * 2) / photo.width, (r * 2) / photo.height)
    const w = photo.width * scale
    const h = photo.height * scale
    ctx.drawImage(photo, cx - w / 2, cy - r - (h - r * 2) * 0.22, w, h)
  } else {
    ctx.fillStyle = C3
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
  }
  ctx.restore()

  // Name + role.
  ctx.fillStyle = '#eaf4ec'
  fitText(ctx, profile.name, W - 140, 88, 700, DISPLAY)
  ctx.fillText(profile.name, W / 2, 878)
  ctx.fillStyle = C4
  ctx.font = `600 40px ${BODY}`
  ctx.fillText(profile.role, W / 2, 940)
  ctx.fillStyle = 'rgba(234, 244, 236, 0.6)'
  ctx.font = `500 30px ${BODY}`
  ctx.fillText(`${profile.course} · ${profile.school}`.slice(0, 48), W / 2, 996)

  // Divider + details.
  ctx.strokeStyle = 'rgba(139, 187, 146, 0.35)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(110, 1060)
  ctx.lineTo(W - 110, 1060)
  ctx.stroke()

  ctx.textAlign = 'left'
  ctx.fillStyle = 'rgba(234, 244, 236, 0.5)'
  ctx.font = `500 26px ${BODY}`
  ctx.fillText('TOTAL HOURS', 110, 1120)
  const hoursCenter = 110 + ctx.measureText('TOTAL HOURS').width / 2
  ctx.fillText('SUPERVISOR', 560, 1120)
  ctx.fillStyle = '#eaf4ec'
  ctx.font = `700 44px ${DISPLAY}`
  ctx.textAlign = 'center'
  ctx.fillText(`${profile.targetHours}`, hoursCenter, 1176)
  ctx.textAlign = 'left'
  fitText(ctx, profile.supervisor, 360, 44, 700, DISPLAY)
  ctx.fillText(profile.supervisor, 560, 1176)

  // Call to action.
  const pill = { x: 232, y: 1252, w: 560, h: 92 }
  ctx.fillStyle = C4
  ctx.beginPath()
  ctx.roundRect(pill.x, pill.y, pill.w, pill.h, 46)
  ctx.fill()
  ctx.fillStyle = C1
  ctx.textAlign = 'center'
  ctx.font = `700 38px ${DISPLAY}`
  ctx.fillText(hint, W / 2, pill.y + 60)

  return canvas.toDataURL('image/png')
}

export async function makeBack(profile) {
  await fontsReady()
  const W = 1024
  const H = 1440
  const [canvas, ctx] = newCanvas(W, H)
  background(ctx, W, H)

  ctx.textAlign = 'center'
  ctx.fillStyle = C4
  ctx.font = `700 150px ${DISPLAY}`
  ctx.fillText('OJT', W / 2, 560)
  ctx.fillStyle = '#eaf4ec'
  ctx.font = `600 52px ${DISPLAY}`
  ctx.fillText('Training Journal', W / 2, 640)

  ctx.strokeStyle = 'rgba(139, 187, 146, 0.35)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(300, 710)
  ctx.lineTo(W - 300, 710)
  ctx.stroke()

  ctx.fillStyle = 'rgba(234, 244, 236, 0.65)'
  ctx.font = `500 34px ${BODY}`
  ctx.fillText(profile.company, W / 2, 780)
  ctx.fillText(profile.duration, W / 2, 836)

  ctx.fillStyle = C4
  ctx.font = `600 34px ${BODY}`
  ctx.fillText('TAP THE CARD TO ENTER THE BLOG', W / 2, 1230)
  return canvas.toDataURL('image/png')
}

export function makeStrap(label) {
  const W = 1536
  const H = 192
  const [canvas, ctx] = newCanvas(W, H)
  ctx.fillStyle = C2
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = C3
  ctx.fillRect(0, 0, W, 10)
  ctx.fillRect(0, H - 10, W, 10)
  ctx.fillStyle = C4
  ctx.font = `700 64px ${DISPLAY}`
  ctx.textBaseline = 'middle'
  const text = `${label}   ✦   `
  const width = ctx.measureText(text).width
  const repeats = Math.max(1, Math.round(W / width))
  const step = W / repeats
  ctx.textAlign = 'left'
  for (let i = 0; i < repeats; i++) ctx.fillText(text, i * step, H / 2 + 4)
  return canvas.toDataURL('image/png')
}
