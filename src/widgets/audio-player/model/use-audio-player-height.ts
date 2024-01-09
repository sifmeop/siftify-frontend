import { useEffect, useRef } from 'react'

export const useAudioPlayerHeight = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  const updateHeight = () => {
    if (ref.current) {
      const doc = document.documentElement
      doc.style.setProperty(
        '--audio-player-height',
        `${ref.current.offsetHeight}px`
      )
    }
  }

  useEffect(() => {
    if (!ref.current) return
    const resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(ref.current)
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return ref
}
