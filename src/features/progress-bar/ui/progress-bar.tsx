import { useAudioPlayerStore } from '#/shared/store'
import { UiSlider } from '#/shared/ui/ui-slider'
import { useEffect, useState } from 'react'

export const ProgressBar = () => {
  const audioRef = useAudioPlayerStore((state) => state.audioRef!)

  const [trackProgress, setTrackProgress] = useState({
    currentTime: 0,
    duration: 0
  })

  useEffect(() => {
    const handleTimeUpdate = () => {
      setTrackProgress({
        currentTime: audioRef.currentTime,
        duration: audioRef.duration
      })
    }
    audioRef.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audioRef.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audioRef])

  const handleChange = (
    _: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    const nValue = value as number
    audioRef!.currentTime = nValue
  }

  const formatDuration = (seconds: number) => {
    if (seconds === 0) {
      return '00:00'
    }

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(remainingSeconds).padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}`
  }

  return (
    <div className='flex items-center gap-4 justify-center'>
      {formatDuration(trackProgress.currentTime)}
      <UiSlider
        sx={{ width: '500px' }}
        min={0}
        max={trackProgress.duration}
        value={trackProgress.currentTime}
        onChangeCommitted={handleChange}
      />
      {formatDuration(trackProgress.duration)}
    </div>
  )
}
