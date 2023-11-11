import { useAudioPlayerStore } from '#/shared/store'
import { Slider, styled } from '@mui/material'

export const AudioPlayerVolume = () => {
  const audioRef = useAudioPlayerStore((state) => state.audioRef)

  const CustomSlider = styled(Slider)({
    color: 'white',
    width: 180,
    height: 8,
    '& .MuiSlider-root:hover': {
      backgroundColor: 'var(--color-primary)'
    },
    '& .MuiSlider-track': {
      border: 'none'
    },
    '& .MuiSlider-thumb': {
      width: 20,
      height: 20,
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit'
      }
    }
  })

  const handleChange = (_: Event, value: number | number[]) => {
    const getValue = (value as number) / 100
    audioRef!.volume = getValue
    localStorage.setItem('volume', String(getValue))
  }

  return <CustomSlider min={0} max={100} onChange={handleChange} />
}
