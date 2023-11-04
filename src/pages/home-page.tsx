import { useGetAllTracks } from '#/entities/track'
import { Track } from '#/features/track'
import { UiTableTracks } from '#/shared/ui/ui-table-tracks'

export const HomePage = () => {
  const { data } = useGetAllTracks()

  return (
    <div>
      <UiTableTracks />
      {data?.map((track, index) => (
        <Track key={track.id} data={track} trackIndex={index + 1} />
      ))}
    </div>
  )
}
