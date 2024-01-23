import { Track } from '#/features/track'
import { useAudioPlayerStore, useQueueStore } from '#/shared/store'
import { UiSubtitle } from '#/shared/ui/ui-subtitle'
import { UiTitle } from '#/shared/ui/ui-title'
import { Stack } from '@mui/material'

export const QueuePage = () => {
  const { queueList, userQueueList, clearQueue } = useQueueStore()
  const playingTrack = useAudioPlayerStore((state) => state.playingTrack)

  const isQueueEmpty = queueList.length === 0 && userQueueList.length === 0

  return (
    <div>
      <UiTitle>Очередь</UiTitle>
      {playingTrack && (
        <>
          <UiSubtitle>Сейчас играет</UiSubtitle>
          <Track isMinimized data={playingTrack} trackIndex={1} />
        </>
      )}
      {isQueueEmpty && <UiSubtitle isCentered>Очередь пуста</UiSubtitle>}
      {!!userQueueList.length && (
        <>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <UiSubtitle>Далее в очереди</UiSubtitle>
            <button
              className='text-sm px-3 py-1 hover:scale-105 transition-transform duration-200 rounded-md border border-white'
              onClick={clearQueue}>
              Очистить очередь
            </button>
          </Stack>
          {userQueueList.map((track, index) => (
            <Track
              isMinimized
              fromUserQueue
              key={track.queueTrackId}
              data={track}
              trackIndex={index + 1}
            />
          ))}
        </>
      )}
      {!!queueList.length && (
        <>
          <UiSubtitle>Далее</UiSubtitle>
          {queueList.map((track, index) => (
            <Track
              isMinimized
              fromQueue
              key={track.id}
              data={track}
              trackIndex={index + 1}
            />
          ))}
        </>
      )}
    </div>
  )
}
