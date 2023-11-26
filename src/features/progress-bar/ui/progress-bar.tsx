import { useAudioPlayerStore } from '#/shared/store'
import { Slider, styled } from '@mui/material'
import { useEffect, useState } from 'react'

const CustomSlider = styled(Slider)({
  color: 'white',
  width: 500,
  height: 5,
  '& .MuiSlider-thumb': {
    display: 'none',
    width: 20,
    height: 20,
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    }
  },
  '& .MuiSlider-track': {
    border: 'none'
  },
  '&:hover': {
    '& .MuiSlider-thumb': {
      display: 'block'
    },
    '& .MuiSlider-track': {
      backgroundColor: 'var(--color-primary)'
    }
  }
})

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

      if (audioRef.currentTime === audioRef.duration) {
        audioRef.currentTime = 0
        audioRef.play()
      }
    }
    audioRef.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audioRef.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audioRef])

  const handleChange = (_: Event, value: number | number[]) => {
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
      <CustomSlider
        min={0}
        max={trackProgress.duration}
        value={trackProgress.currentTime}
        onChange={handleChange}
      />
      {formatDuration(trackProgress.duration)}
    </div>
  )
}
