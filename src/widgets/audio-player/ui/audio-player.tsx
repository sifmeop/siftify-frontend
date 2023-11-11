import { useAudioPlayerStore } from '#/shared/store'
import { AudioPlayerClose } from './audio-player-close'
import { AudioPlayerInfo } from './audio-player-info'
import { AudioPlayerVolume } from './audio-player-volume'

export const AudioPlayer = () => {
  const currentTrack = useAudioPlayerStore((state) => state.currentTrack)

  if (!currentTrack) return null

  return (
    <div className='fixed bottom-0 h-28 w-screen bg-[#000] flex items-center gap-2'>
      <AudioPlayerInfo />
      <div></div>
      <AudioPlayerVolume />
      <AudioPlayerClose />
    </div>
  )
}
