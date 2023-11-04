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
  const { audioRef, currentTrack, setCurrentTrack, setIsPlaying, isPlaying } =
    useAudioPlayerStore()

  useEffect(() => {
    if (isPlaying) {
      void audioRef?.play()
    } else {
      void audioRef?.pause()
    }
  }, [audioRef, isPlaying])

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

  return (
    <div>
      {!isHover &&
        (data.track !== currentTrack?.track ||
          (!isPlaying && data.track === currentTrack?.track)) && (
          <span
            className={clsx('block w-[25px]', {
              'text-primary': data.track === currentTrack?.track
            })}>
            {trackIndex}
          </span>
        )}
      {!isHover && isPlaying && data.track === currentTrack?.track && (
        <Equalizer />
      )}
      {isHover &&
        (data.track !== currentTrack?.track ||
          (data.track === currentTrack?.track && !isPlaying)) && (
          <button className='block' onClick={handleSetTrack}>
            <HiPlay size='25' />
          </button>
        )}
      {isHover && data.track === currentTrack?.track && isPlaying && (
        <button className='block' onClick={handlePause}>
          <IoIosPause size='25' />
        </button>
      )}
    </div>
  )
}

export default TrackPlayButton
