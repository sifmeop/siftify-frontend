import { Track } from '#/features/track'
import { ITrack } from '#/shared/api'
import { generateRandomId } from '#/shared/lib'
import { UiLoader } from '#/shared/ui/ui-loader'
import { UiSubtitle } from '#/shared/ui/ui-subtitle'
import { UiTableTracks } from '#/shared/ui/ui-table-tracks'
import { useMemo } from 'react'

interface Props {
  tracks?: ITrack[]
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  isTrackPage?: boolean
}

export const TrackTableList = ({
  tracks,
  isLoading,
  isSuccess,
  isError,
  error,
  isTrackPage = false
}: Props) => {
  const errorMessage =
    error?.response?.data?.message ??
    error?.message ??
    'Ошибка получения треков'

  const tableQueueListId = useMemo(generateRandomId, [])

  return (
    <>
      <UiTableTracks isTrackPage={isTrackPage} />
      <UiLoader isLoading={isLoading} />
      {!isLoading &&
        isSuccess &&
        tracks?.map((track, index) => (
          <Track
            isTrackPage={isTrackPage}
            tableQueueListId={tableQueueListId}
            key={track.id}
            data={track}
            trackList={tracks}
            trackIndex={index + 1}
          />
        ))}
      {!isLoading && isError && <UiSubtitle>{errorMessage}</UiSubtitle>}
      {!isLoading && isSuccess && !tracks?.length && (
        <UiSubtitle isCentered>Список пуст</UiSubtitle>
      )}
    </>
  )
}
