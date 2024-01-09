import { useAudioPlayerStore } from '#/shared/store'
import { IconType } from 'react-icons'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'

export const PlayTrack = () => {
  const isPlaying = useAudioPlayerStore((state) => state.isPlaying)
  const setPlay = useAudioPlayerStore((state) => state.setPlay)
  const setPause = useAudioPlayerStore((state) => state.setPause)

  const Icon: IconType = {
    play: FaPlayCircle,
    pause: FaPauseCircle
  }[isPlaying ? 'pause' : 'play']

  return (
    <button onClick={isPlaying ? setPause : setPlay}>
      <Icon size='40px' />
    </button>
  )
}
