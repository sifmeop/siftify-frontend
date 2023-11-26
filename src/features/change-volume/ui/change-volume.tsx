import {
  getItemFromLocalStorage,
  setItemToLocalStorage
} from '#/shared/lib/localStorage'
import { useAudioPlayerStore } from '#/shared/store'
import { Slider, styled } from '@mui/material'
import { useEffect } from 'react'
import { TbVolume, TbVolume2, TbVolume3 } from 'react-icons/tb'

const CustomSlider = styled(Slider)({
  color: 'white',
  width: 120,
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

export const ChangeVolume = () => {
  const audioRef = useAudioPlayerStore((state) => state.audioRef)
  const volume = useAudioPlayerStore((state) => state.volume)
  const setVolume = useAudioPlayerStore((state) => state.setVolume)

  useEffect(() => {
    if (audioRef) {
      audioRef.volume = +volume / 100
    }
  }, [audioRef])

  const handleChange = (_: Event, value: number | number[]) => {
    const nValue = value as number
    const audioValue = nValue / 100
    audioRef!.volume = audioValue
    setVolume(String(nValue))
    setItemToLocalStorage('volume', String(nValue))
  }

  const handleMute = () => {
    setItemToLocalStorage('prevVolume', String(volume))
    setVolume('0')
    audioRef!.volume = 0
    setItemToLocalStorage('volume', '0')
  }

  const handleUnmute = () => {
    const prevVolume = getItemFromLocalStorage('prevVolume') ?? '50'
    setVolume(prevVolume)
    audioRef!.volume = +prevVolume / 100
    setItemToLocalStorage('volume', prevVolume)
    setItemToLocalStorage('prevVolume', '0')
  }

  const getVolumeIcon = () => {
    if (+volume >= 75) {
      return <TbVolume size='20px' onClick={handleMute} />
    } else if (+volume === 0) {
      return <TbVolume3 size='20px' onClick={handleUnmute} />
    } else {
      return <TbVolume2 size='20px' onClick={handleMute} />
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <button>{getVolumeIcon()}</button>
      <CustomSlider min={0} max={100} value={+volume} onChange={handleChange} />
    </div>
  )
}
