import { ChangeVolume } from '#/features/change-volume'
import { NextTrack } from '#/features/next-track'
import { PlayTrack } from '#/features/play-track'
import { PrevTrack } from '#/features/prev-track'
import { ProgressBar } from '#/features/progress-bar'
import { Queue } from '#/features/queue'
import { Repeat } from '#/features/repeat'
import { Shuffle } from '#/features/shuffle'
import { useAudioPlayerStore } from '#/shared/store'
import { useAudioPlayer } from '../model/use-audio-player'
import { useAudioPlayerHeight } from '../model/use-audio-player-height'
import { AudioPlayerClose } from './audio-player-close'
import { AudioPlayerInfo } from './audio-player-info'
import styes from './audio-player.module.scss'

export const AudioPlayerWrapper = () => {
  const playingTrack = useAudioPlayerStore((state) => state.playingTrack)

  if (!playingTrack) return null

  return <AudioPlayer />
}

const AudioPlayer = () => {
  useAudioPlayer()
  const ref = useAudioPlayerHeight()

  return (
    <div ref={ref} className={styes.wrapper}>
      <AudioPlayerInfo />
      <div>
        <div className='flex justify-center gap-6'>
          <Shuffle />
          <PrevTrack />
          <PlayTrack />
          <NextTrack />
          <Repeat />
        </div>
        <ProgressBar />
      </div>
      <div className='flex items-center gap-2 justify-end'>
        <Queue />
        <ChangeVolume />
      </div>
      <AudioPlayerClose />
    </div>
  )
}
