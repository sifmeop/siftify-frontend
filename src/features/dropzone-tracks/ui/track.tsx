import { useUploadTrackStore } from '#/shared/store'
import { UiInput } from '#/shared/ui/UiInput'
import { Equalizer } from '#/shared/ui/equliazer'
import clsx from 'clsx'
import { useState } from 'react'
import { HiPlay } from 'react-icons/hi2'
import { IoIosPause } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

interface Props {
  file: File
  trackIndex: number
}

export const Track = ({ file, trackIndex }: Props) => {
  const [isHover, setIsHover] = useState(false)

  const {
    isPlaying,
    deleteTrack,
    playingTrack,
    setPlayingTrack,
    setPlay,
    setPause
  } = useUploadTrackStore()

  const handlePlay = () => {
    setPlayingTrack(file)
  }

  //! трек на паузе
  const trackIsPaused =
    !isHover &&
    (file.name !== playingTrack?.name ||
      (!isPlaying && file.name === playingTrack?.name))

  //! трек играет
  const trackIsPlayed =
    !isHover && isPlaying && file.name === playingTrack?.name

  //! включить следующий трек
  const playNextTrack = isHover && file.name !== playingTrack?.name

  //! возобновить трек
  const resumeTrack = isHover && file.name === playingTrack?.name && !isPlaying

  //! поставить на паузу трек
  const pauseTrack = isHover && file.name === playingTrack?.name && isPlaying

  return (
    <>
      <UiInput placeholder='Название песни' className='mb-2' />
      <div
        className='flex items-center gap-2 justify-between mb-2 p-4 border border-white rounded-lg'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>
        <div className='flex items-center gap-2'>
          <div>
            {trackIsPaused && (
              <span
                className={clsx('block w-[25px]', {
                  'text-primary': file.name === playingTrack?.name
                })}>
                {trackIndex}
              </span>
            )}
            {trackIsPlayed && <Equalizer />}
            {playNextTrack && (
              <button className='block' onClick={handlePlay}>
                <HiPlay size='25' />
              </button>
            )}
            {resumeTrack && (
              <button className='block' onClick={setPlay}>
                <HiPlay size='25' />
              </button>
            )}
            {pauseTrack && (
              <button className='block' onClick={setPause}>
                <IoIosPause size='25' />
              </button>
            )}
          </div>
          {file.name}
        </div>
        <button onClick={() => deleteTrack(file)}>
          <MdDelete fill='white' size='25px' />
        </button>
      </div>
    </>
  )
}
