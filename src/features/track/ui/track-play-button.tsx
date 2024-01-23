import { useListeningTrack } from '#/entities/track/api/listeningTrack'
import { ITrack } from '#/shared/api'
import { useAudioPlayerStore, useQueueStore } from '#/shared/store'
import { Equalizer } from '#/shared/ui/equliazer'
import clsx from 'clsx'
import { HiPlay } from 'react-icons/hi2'
import { IoIosPause } from 'react-icons/io'

interface TrackPlayButtonProps {
  data: ITrack
  trackList?: ITrack[]
  trackIndex: number
  isHover: boolean
  tableQueueListId?: string
  fromQueue?: boolean
  fromUserQueue?: boolean
}

const TrackPlayButton = ({
  data,
  trackList,
  trackIndex,
  isHover,
  tableQueueListId,
  fromQueue,
  fromUserQueue
}: TrackPlayButtonProps) => {
  const playingTrack = useAudioPlayerStore((state) => state.playingTrack)
  const isPlaying = useAudioPlayerStore((state) => state.isPlaying)
  const nextTrack = useQueueStore((state) => state.nextTrack)
  const setQueueList = useQueueStore((state) => state.setQueueList)
  const queueListId = useQueueStore((state) => state.queueListId)
  const setPlay = useAudioPlayerStore((state) => state.setPlay)
  const setPause = useAudioPlayerStore((state) => state.setPause)

  const { mutateAsync } = useListeningTrack()

  const handlePlay = () => {
    if (queueListId !== tableQueueListId && trackList) {
      setQueueList({
        queueList: trackList,
        queueListId: tableQueueListId
      })
    }

    // if (fromUserQueue) {
    //   nextTrackFromUserQueue(data)
    //   return
    // }

    // if (fromQueue) {
    //   nextTrackFromQueue(data)
    //   return
    // }

    if (fromUserQueue) {
      nextTrack(data, 'user')
    } else {
      nextTrack(data, 'queue')
    }

    if (data.id !== playingTrack?.id) {
      mutateAsync(data.id)
    }
  }

  //! трек на паузе
  const trackIsPaused =
    !isHover &&
    (data.id !== playingTrack?.id ||
      (!isPlaying && data.id === playingTrack?.id))

  //! трек играет
  const trackIsPlayed =
    // !isHover && isPlaying && data.id === data.id && !fromQueue
    !isHover && isPlaying && data.id === playingTrack?.id

  //! включить следующий трек
  const playNextTrack = isHover && data.id !== playingTrack?.id

  //! возобновить трек
  const resumeTrack = isHover && data.id === playingTrack?.id && !isPlaying

  //! поставить на паузу трек
  const pauseTrack = isHover && data.id === playingTrack?.id && isPlaying

  if (fromQueue || fromUserQueue) {
    return (
      <div>
        {!isHover ? (
          <span className='block w-[25px]'>{trackIndex}</span>
        ) : (
          <button className='block' onClick={handlePlay}>
            <HiPlay size='25' />
          </button>
        )}
      </div>
    )
  }

  return (
    <div>
      {trackIsPaused && (
        <span
          className={clsx('block w-[25px]', {
            'text-primary': data.id === playingTrack?.id
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
  )
}

export default TrackPlayButton
