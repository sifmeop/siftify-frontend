import { useListeningTrack } from '#/entities/track/api/listeningTrack'
import { ITrack } from '#/shared/api'
import { useAudioPlayerStore } from '#/shared/store'
import { Equalizer } from '#/shared/ui/equliazer'
import clsx from 'clsx'
import { useEffect } from 'react'
import { HiPlay } from 'react-icons/hi2'
import { IoIosPause } from 'react-icons/io'

interface TrackPlayButtonProps {
  data: ITrack
  trackIndex: number
  isHover: boolean
}

const TrackPlayButton = ({
  data,
  trackIndex,
  isHover
}: TrackPlayButtonProps) => {
  const currentTrack = useAudioPlayerStore((state) => state.currentTrack?.track)
  const audioRef = useAudioPlayerStore((state) => state.audioRef)
  const isPlaying = useAudioPlayerStore((state) => state.isPlaying)
  const setIsPlaying = useAudioPlayerStore((state) => state.setIsPlaying)
  const setCurrentTrack = useAudioPlayerStore((state) => state.setCurrentTrack)

  const { mutateAsync } = useListeningTrack()

  useEffect(() => {
    if (isPlaying) {
      void audioRef?.play()
    } else {
      void audioRef?.pause()
    }
  }, [audioRef, isPlaying])

  const handlePlay = () => {
    setCurrentTrack(data)

    if (data.track !== currentTrack) {
      mutateAsync(data.id)
    }
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const isPlayingCurrentTrack =
    !isHover && isPlaying && data.track === currentTrack
  const isHoverPauseCurrentTrack =
    !isHover &&
    (data.track !== currentTrack || (!isPlaying && data.track === currentTrack))
  const pauseCurrentTrack = isHover && data.track === currentTrack && isPlaying
  const playNextTrack =
    isHover &&
    (data.track !== currentTrack || (data.track === currentTrack && !isPlaying))

  return (
    <div>
      {isHoverPauseCurrentTrack && (
        <span
          className={clsx('block w-[25px]', {
            'text-primary': data.track === currentTrack
          })}>
          {trackIndex}
        </span>
      )}
      {isPlayingCurrentTrack && <Equalizer />}
      {playNextTrack && (
        <button className='block' onClick={handlePlay}>
          <HiPlay size='25' />
        </button>
      )}
      {pauseCurrentTrack && (
        <button className='block' onClick={handlePause}>
          <IoIosPause size='25' />
        </button>
      )}
    </div>
  )
}

export default TrackPlayButton
