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
  fromQueue: boolean
  fromUserQueue: boolean
  tableQueueListId?: string
}

const TrackPlayButton = ({
  data,
  trackList,
  trackIndex,
  isHover,
  fromQueue,
  fromUserQueue,
  tableQueueListId
}: TrackPlayButtonProps) => {
  const currentTrack = useAudioPlayerStore((state) => state.currentTrack?.track)
  const isPlaying = useAudioPlayerStore((state) => state.isPlaying)
  const setCurrentTrack = useAudioPlayerStore((state) => state.setCurrentTrack)
  const setQueueList = useQueueStore((state) => state.setQueueList)
  const queueListId = useQueueStore((state) => state.queueListId)
  const nextTrack = useQueueStore((state) => state.nextTrack)
  const nextTrackFromQueue = useQueueStore((state) => state.nextTrackFromQueue)
  const nextTrackFromUserQueue = useQueueStore(
    (state) => state.nextTrackFromUserQueue
  )
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
    // nextTrackFromUserQueue(data)
    // return
    // }

    // if (fromQueue) {
    // nextTrackFromQueue(data)
    // return
    // }

    setCurrentTrack(data)

    if (data.track !== currentTrack) {
      mutateAsync(data.id)
    }
  }

  //! трек на паузе
  const trackIsPaused =
    !isHover &&
    (data.track !== currentTrack || (!isPlaying && data.track === currentTrack))

  //! трек играет
  const trackIsPlayed =
    !isHover && isPlaying && data.track === currentTrack && !fromQueue

  //! включить следующий трек
  const playNextTrack = isHover && data.track !== currentTrack

  //! возобновить трек
  const resumeTrack = isHover && data.track === currentTrack && !isPlaying

  //! поставить на паузу трек
  const pauseTrack = isHover && data.track === currentTrack && isPlaying

  //

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
            'text-primary': data.track === currentTrack
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
