import { useAudioPlayerStore } from '#/shared/store'
import { AudioPlayerClose } from './audio-player-close'
import { AudioPlayerInfo } from './audio-player-info'

export const AudioPlayer = () => {
  const currentTrack = useAudioPlayerStore((state) => state.currentTrack)

  if (!currentTrack) return null

  return (
    <div className='fixed bottom-0 h-28 w-screen bg-white'>
      <AudioPlayerInfo />
      <div></div>
      <div></div>
      <AudioPlayerClose />
    </div>
  )
}
