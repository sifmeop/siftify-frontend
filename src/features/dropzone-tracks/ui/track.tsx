import { SelectArtists } from '#/entities/select-artists'
import { useUploadTrackStore } from '#/shared/store'
import { IUploadTrack } from '#/shared/store/upload-tracks'
import { UiInput } from '#/shared/ui/UiInput'
import { Equalizer } from '#/shared/ui/equliazer'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { BsList } from 'react-icons/bs'
import { HiPlay } from 'react-icons/hi2'
import { IoIosPause } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

interface Props {
  data: IUploadTrack
  trackIndex: number
}

export const Track = ({ data, trackIndex }: Props) => {
  const [isHover, setIsHover] = useState(false)
  const setChangeTitle = useUploadTrackStore((state) => state.setChangeTitle)

  const {
    isPlaying,
    deleteTrack,
    playingTrack,
    setPlayingTrack,
    setPlay,
    setPause
  } = useUploadTrackStore()

  const handlePlay = () => {
    setPlayingTrack(data)
  }

  //! трек на паузе
  const trackIsPaused =
    !isHover &&
    (data.track.name !== playingTrack?.track.name ||
      (!isPlaying && data.track.name === playingTrack?.track.name))

  //! трек играет
  const trackIsPlayed =
    !isHover && isPlaying && data.track.name === playingTrack?.track.name

  //! включить следующий трек
  const playNextTrack = isHover && data.track.name !== playingTrack?.track.name

  //! возобновить трек
  const resumeTrack =
    isHover && data.track.name === playingTrack?.track.name && !isPlaying

  //! поставить на паузу трек
  const pauseTrack =
    isHover && data.track.name === playingTrack?.track.name && isPlaying

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setChangeTitle(data.id, value)
    },
    [data.id]
  )

  return (
    <div className='flex flex-col gap-2 mb-2 bg-black p-4 rounded-md border border-white'>
      <UiInput
        // value={titleValue}
        onChange={handleChangeTitle}
        placeholder='Название песни'
      />
      <SelectArtists trackId={data.id} />
      <div
        className='flex items-center gap-2 justify-between p-4 border border-white rounded-md'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>
        <div className='flex items-center gap-2'>
          <BsList className='cursor-move' size='25px' />
          <div>
            {trackIsPaused && (
              <span
                className={clsx('block w-[25px]', {
                  'text-primary': data.track.name === playingTrack?.track.name
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
          {data.track.name}
        </div>
        <button onClick={() => deleteTrack(data.id)}>
          <MdDelete fill='white' size='25px' />
        </button>
      </div>
    </div>
  )
}
