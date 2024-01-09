import { useAudioPlayerStore, useQueueStore } from '#/shared/store'
import { useRepeatStore } from '#/shared/store/repeat'
import { useEffect } from 'react'

export const useAudioPlayer = () => {
  const audioRef = useAudioPlayerStore((state) => state.audioRef)!
  const setPause = useAudioPlayerStore((state) => state.setPause)
  const nextTrack = useQueueStore((state) => state.nextTrack)
  const repeat = useRepeatStore((state) => state.repeat)

  useEffect(() => {
    const handleEnded = () => {
      if (repeat === 'one') {
        audioRef.currentTime = 0
        audioRef.play()
      } else if (repeat === 'all') {
        nextTrack()
      } else {
        setPause()
      }
    }

    audioRef.addEventListener('ended', handleEnded)

    return () => audioRef.removeEventListener('ended', handleEnded)
  }, [repeat, audioRef])
}
