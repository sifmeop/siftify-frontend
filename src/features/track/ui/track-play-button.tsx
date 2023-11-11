import { Track as ITrack } from '#/shared/api'
import { useAudioPlayerStore } from '#/shared/store'
import clsx from 'clsx'
import { useEffect } from 'react'
import { HiPlay } from 'react-icons/hi2'
import { IoIosPause } from 'react-icons/io'
import { Equalizer } from './equalizer'

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
  const { audioRef, setCurrentTrack, setIsPlaying, isPlaying } =
    useAudioPlayerStore()

  const currentTrack = useAudioPlayerStore((state) => state.currentTrack?.track)

  useEffect(() => {
    if (isPlaying) {
      void audioRef?.play()
    } else {
      void audioRef?.pause()
    }
  }, [audioRef, isPlaying])

  useEffect(() => {
    audioRef?.addEventListener('ended', () => {
      audioRef!.currentTime = 0
    })
  }, [])

  const handleSetTrack = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setCurrentTrack(data)
  }

  const handlePause = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
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
        <button className='block' onClick={handleSetTrack}>
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
