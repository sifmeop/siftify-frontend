import {
  getItemFromLocalStorage,
  setItemToLocalStorage
} from '#/shared/lib/localStorage'
import { useAudioPlayerStore, useVolumeStore } from '#/shared/store'
import { UiSlider } from '#/shared/ui/ui-slider'
import { useEffect } from 'react'
import { TbVolume, TbVolume2, TbVolume3 } from 'react-icons/tb'

export const ChangeVolume = () => {
  const audioRef = useAudioPlayerStore((state) => state.audioRef)
  const { volume, setVolume } = useVolumeStore()

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
      return <TbVolume size='25px' onClick={handleMute} />
    } else if (+volume === 0) {
      return <TbVolume3 size='25px' onClick={handleUnmute} />
    } else {
      return <TbVolume2 size='25px' onClick={handleMute} />
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <button>{getVolumeIcon()}</button>
      <UiSlider
        sx={{ width: '120px' }}
        min={0}
        max={100}
        value={+volume}
        onChange={handleChange}
      />
    </div>
  )
}
