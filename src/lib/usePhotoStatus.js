import { useEffect, useState } from 'react'

export const PHOTO_LABELS = {
  queued: 'Loading',
  generating: 'Developing',
  refining: 'Sharpening',
  complete: 'Ready',
}

// Shared timeline (ms). The photo sharpens at a steady pace from PHOTO_START to PHOTO_START + PHOTO_DURATION
// (8 sharpening levels x 400ms). The percentage ring + counter use the same two numbers so everything stops together.
export const PHOTO_START = 400
export const PHOTO_DURATION = 3200

// Drives <RefineFrame>: the photo starts pixelated and sharpens in stages each time the page opens.
export default function usePhotoStatus() {
  const [status, setStatus] = useState('queued')
  useEffect(() => {
    const steps = [
      ['generating', PHOTO_START],
      ['refining', PHOTO_START + PHOTO_DURATION * 0.5],
      ['complete', PHOTO_START + PHOTO_DURATION * 0.875 + 0],
    ]
    const timers = steps.map(([next, at]) => window.setTimeout(() => setStatus(next), at))
    return () => timers.forEach(window.clearTimeout)
  }, [])
  return status
}
