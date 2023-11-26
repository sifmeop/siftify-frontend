import { ChangeVolume } from '#/features/change-volume'
import { ProgressBar } from '#/features/progress-bar'
import { Queue } from '#/features/queue'
import { useAudioPlayerStore } from '#/shared/store'
import { AudioPlayerClose } from './audio-player-close'
import { AudioPlayerInfo } from './audio-player-info'
import styes from './audio-player.module.scss'

export const AudioPlayer = () => {
  const currentTrack = useAudioPlayerStore((state) => state.currentTrack)

  if (!currentTrack) return null

  return (
    <div className={styes.wrapper}>
      <AudioPlayerInfo />
      <ProgressBar />
      <div className='flex items-center gap-2 justify-end'>
        <Queue />
        <ChangeVolume />
      </div>
      <AudioPlayerClose />
    </div>
  )
}
