import { Track } from '#/features/track'
import { ITrack } from '#/shared/api'
import { UiLoader } from '#/shared/ui/ui-loader'
import { UiTableTracks } from '#/shared/ui/ui-table-tracks'
import { UseQueryResult } from '@tanstack/react-query'

type Props = UseQueryResult<ITrack[] | undefined, unknown>

export const TrackTableList = ({ data, isLoading, isSuccess }: Props) => {
  return (
    <>
      <UiTableTracks />
      <UiLoader isLoading={isLoading} />
      {!isLoading &&
        isSuccess &&
        data?.map((track, index) => (
          <Track key={track.id} data={track} trackIndex={index + 1} />
        ))}
      {!isLoading && !data && (
        <h2 className='text-center text-lg'>Список пуст</h2>
      )}
    </>
  )
}
